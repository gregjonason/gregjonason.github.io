/**
Login framework for EdITLib.
jordan@aace.org

@depends https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js

*/
window.LOGIN = (function ($) {
	var user,
		providers = null,
		settings = {},
		authenticating = false,
		authentication_started = false,
		initializing = null,
		logged_in = false,
		Providers;

	Providers = (function() {
	  function Providers() {
		this.m_names = [];
		this.m_providers = {};
	  }

	  Providers.prototype.push = function(nn, pp) {
		if (!this.m_providers[nn]) {
		  this.m_names.push(nn);
		}
		return this.m_providers[nn.toLowerCase()] = pp;
	  };

	  Providers.prototype.length = function() {
		return this.m_names.length;
	  };

	  Providers.prototype.names = function() {
		return this.m_names;
	  };

	  Providers.prototype.del = function(name) {
		var nn, _i, _len, _ref;
		_ref = this.m_names;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		  nn = _ref[_i];
		  if (nn.toLowerCase() === name.toLowerCase()) {
			delete this.m_names[nn.toLowerCase()];
		  }
		}
		delete this.m_providers[nn];
	  };

	  Providers.prototype.get = function(nn) {
	  	console.log("Getting ", nn, " from ", this, this.m_providers);
		return this.m_providers[nn.toLowerCase()];
	  };

	  Providers.prototype.providers = function() {
		return this.m_providers;
	  };


	  return Providers;

	})();
	providers = new Providers;

	function Exception(type, message, attrs) {
		if (!message) {
			message = type;
			type = "Login";
		}
		this.type = type;
		this.message = message;
		if (attrs) {
			for (var aa in attrs) {
				if (attrs.hasOwnProperty(aa)) {
					this[aa] = attrs[aa];
				}
			}
		}
	}
	Exception.prototype.toString = function () {
		return this.type + ': ' + this.message;
	}
	
	function addProvider(providerName, provider) {
		console.debug("LOGIN", "Adding provider", providerName, provider);
		providers.push(providerName, provider);
		if (provider.user) {
			login(provider, provider)
		}
		return provider;
	}
	
	function updateProvider(providerName, data) {
		provider = providers.get(providerName);
		return provider.update && provider.update(data);
	}
	
	function getProviders() {
		var result = [], pp, test_provider;
		for (pp in providers.providers()) {
			test_provider = providers.get(pp);
			console.log(pp);
			if (test_provider) {
					result.push(test_provider);
			}
		}
		return result;
	}
	
	function getProvider(providerName) {
		provider = providers.get(providerName);
		if (!provider) {
			throw new Exception("Login.Provider.DoesNotExist", "Could not find the provider " + providerName);
		} else if (!provider.authenticate) {
			throw new Exception("Login.Provider.Invalid", "Provider script for " + (provider.hasOwnProperty('toString') ? provider : providerName) + " does not implement an authentication function.");
		}
		return provider;
	}
	
	function isLoggedIn() {
		return logged_in === true;
	}
	
	function getUser() {
		return user;
	}
	
	function login(data, provider, success, failure) {
		console.log("Trying login with data ", data, " and provider ", provider);
		if (data && data.user) {
			user = data.user;
			logged_in = user.active;
			console.log("Logged in? ", logged_in)
			console.log("Calling ", success);
			console.log("settings are ", settings);
			if (settings.$menu) {
				console.log("About to trigger updated");
				settings.$menu.trigger("updated");
			}
			if (success) {
				success.call(this, data, data.message || "");
			}
			return true;
		}
		if (provider.urlParams) {
			$.extend(data, provider.urlParams);
		}
		if (settings.urlParams) {
			$.extend(data, settings.urlParams);
		}
		console.log("Right now the data is ", data);
		$.extend(data, { provider: provider.name });
		console.log("Right now the data is ", data);
		data['called_by'] = "login.js login function";
		$.ajax({
			cache: false,
			url: settings.url,
			type: "POST",
			data: data,
			dataType: 'json',
			xhrFields: {
			    withCredentials: true
			}
		}).done(function (data, textStatus, jqXHR) {
			console.log("The data returned was ", data);
			if (data.user && !data.error) {
				user = data.user;
				logged_in = user.active;
			console.log("settings are ", settings);
				if (settings.$menu) {
					console.log("About to trigger updated");
					settings.$menu.trigger("updated");
				}
				success.call(this, data, data.message);
			} else {
				user = null;
				logged_in = null;
				failure.call(this, data.error, data.message);
			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			console.error("Error", arguments);
			failure.call(this, errorThrown, textStatus);
		});
	}
	
	function prepareAuthenticationLock() {
		authenticating = false;
		authentication_started = true;
	}
	
	function lockAuthentication() {
		if (authentication_started) {
			authentication_started = false;
			authenticating = true;
		}
	}
	
	function unlockAuthentication() {
		authenticating = false;
		authentication_started = false;
	}
	
	function authenticationLocked() {
		return authenticating;
	}

	function authenticate(providerName, success, failure) {
		var provider;
		if (authenticationLocked()) {
			console.log("Currently authenticating");
			return true;
		}
		provider = getProvider(providerName);
		prepareAuthenticationLock();
		function onSuccess(data, message) {
			user = data.user;
			logged_in = user.active;
			if (success) {
				console.log("Calling success function ", success);
				success.call(this, user, logged_in, data.message);
			} else {
				console.log("No success function!");
			}
		}
		function onFailure(error, message) {
			user = null;
			logged_in = false;
			if (failure) {
				failure.call(this, error, message);
			}
		}
		function onError() {
			console.log("Error occurred: ", arguments);
		}
		provider.authenticate(
			function (data) {
				console.log("Logged in!");
				//alert("Logged in");
				unlockAuthentication();
				console.log("Unlocked!");
				console.log("Calling function ", login);
				//alert("Calling login using " + JSON.stringify(data));
				login(data, provider, onSuccess, onFailure);
			}, 
			function (error) {
				console.log("Some kind of error!");
				unlockAuthentication();
				user = null;
				logged_in = false;
				console.log("Failure function is ", failure);
				failure.call(this, error, "Unable to login using " + provider);
			}
		);
	}
	
	function showLoginForm(callback, message) {
		var that = this;
		if (settings.$dialog){
			settings.$dialog
				.data('callback', function () {
					console.log("Stored callback fired");
					if (callback) {
						callback.call(that, getUser());
					} else {
						settings.$dialog.modal('hide');
					}
				})
				.modal('show');
			if (message) {
				settings.$dialog
					.find('.modal-header')
					.append(
						$('<div>')
							.addClass('alert alert-info')
							.text(message)
					);
			}
		}
	}
	
	function checkForLogin(callback, message) {
		var that = this;
		console.log("CheckForLogin");
		if (isLoggedIn()) {
			callback.call(that, getUser());
		} else {
			showLoginForm.call(that, callback, message);
		}
	}
	
	/*
	function checkProviders() {
		var pp, done=false, checking=false, all_providers = [], test_provider;
		console.log("Checking providers.");
		for (pp in providers.providers()) {
			test_provider = providers.get(pp);
			console.log(pp);
			if (test_provider) {
				if (!(typeof test_provider.ready === "function" ? test_provider.ready() : test_provider.ready)) {
					console.log("Deleting ", pp, " because it isn't ready yet.");
					providers.del(pp);
				} else {
					console.log("Adding ", pp);
					all_providers.push(test_provider);
				}
			}
		}
		all_providers.sort(function (a, b) {
			return (b.priority || 0 ) - (a.priority || 0); // reversed because higher first
		});
		console.debug("All providers: ", all_providers);
		console.debug("Providers: ", providers.providers());
		function setUser(data) {
			console.log("Success!! Setting user to ", data.user, " with this ", this);
			user = data.user;
			logged_in = user.active;
			done = true;
		}
		function checkProvider() {
			var provider = all_providers.shift();
			console.log("Checking provider " + provider, provider);
			if (done || checking) {
				console.log("Done ", done, " checking ", checking);
				return true;
			}
			if (!provider) {
				return false;
			}
			checking = true;
			if (provider.checkLogin) {
				console.log("Calling checkLogin on " + provider);
				console.log(provider.checkLogin);
				provider.checkLogin(
					function (data) {
						checking = false;
						login.call(this, data, provider, setUser, checkProvider);
					},
					function () {
						checking = false;
						checkProvider();
					}
				);
			} else {
				checkProvider();
			}
		}
		checkProvider();
	}
	*/
	
	function init(initSettings) {
		if (initializing) {
			throw new Exception("Login.Initializing", "Already initializing.");
		}
		console.log("Initializing.");
		if (typeof initSettings === 'string') {
			initSettings = {
				url: initSettings
			};
		}
		if (!initSettings.url || !initSettings.url.length ) {
			throw new Exception("Login.Init", "You must provide the server URL.");
		}
		$.extend(settings, initSettings);
		console.log("Settings ", settings);
		// initializing = window.setTimeout(checkProviders, (settings.initTimeout || 5) * 1000);
		return {
			getUser: getUser,
			getProvider: getProvider,
			getProviders: getProviders,
			isLoggedIn: isLoggedIn,
			authenticate: authenticate,
			checkForLogin: checkForLogin,
			showLoginForm: showLoginForm
		};
	}

	return {
		init: init,
		addProvider: addProvider
	};
}(jQuery));