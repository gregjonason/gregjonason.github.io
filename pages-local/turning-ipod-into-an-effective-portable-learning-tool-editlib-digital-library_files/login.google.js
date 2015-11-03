(function ($) {
	var name = "google",
		$fbroot = $('#fb-root'),
		fbActive = false,
		checkLoginFun = null,
		authenticateFun = null,
		ready = false,
		appId;

	function windowScopedCallback(fun, name) {
		var callbackName = name, sfx;
		while (window[callbackName]) {
			sfx = callbackName.replace(/.+(?:_(\d+))?$/, "$1") || 0;
			sfx = parseInt(sfx, 10);
			callbackName = callbackName.replace(/(.+?)(?:_\d+)?$/, "$1") + '_' + sfx.toString();
		}
		window[callbackName] = fun;
		return callbackName;
	}
	
	appId = $('meta[property="google-signin-clientid"]').attr('content');

	if (!appId) {
		throw {
			type: "Login.Google.MissingApiKey",
			message: "Google Api Id not provided.",
			toString: function () { return this.type + ': ' + this.message }
		}
	}

	/*
	$.ajaxSetup({ cache: true });
	onloadCallback = windowScopedCallback(function () {
		//console.debug("Google Loaded!!!!", this, arguments);
		//console.debug("Google Loaded!!!!", "gapi is", gapi, " and gapi auth is", gapi.auth);
	}, "googleOnLoad");
	//console.log("onloadCallback is ", onloadCallback);
	window.___gcfg = {
	  lang: 'en-US',
	  parsetags: 'onload'
	};
	$.getScript("https://apis.google.com/js/client:plusone.js?onload=" + onloadCallback, function () { 
		//console.log("Loaded the script! Now gapi is ", gapi, " and auth is ", gapi.auth);
		return true;
	  }
	);
	window.___gcfg = {
	  lang: 'zh-CN',
	  parsetags: 'onload'
	};
	(function() {
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/plusone.js?onload=' + windowScopedCallback(function () {
			//console.log("GOOGLE", "async loaded so this is ", this, " and arguments are ", arguments);
			//console.log("GOOGLE", "async", "gapi", gapi);
		}, 'googleCallback');
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	  })();
	window.fooberry = function() {
		//console.log("GOOGLE", "Fooberry!", this, arguments);
		//console.debug("GOOGLE", "gapi", gapi);
	}
	
	$.getScript('https://apis.google.com/js/client.js?onload=fooberry', function () {
		//console.log("GOOGLE", "Loaded!");
		//console.debug("GOOGLE", "gapi", gapi);
		
	});
	*/
	$.getScript('//apis.google.com/js/api.js', function() {
		gapi.load('auth:client', function () {
			checkLoginFun = function (callback) {
				gapi.auth.checkSessionState({ client_id: appId }, callback);
			};
			authenticateFun = function (callback) {
				return gapi.auth.signIn(
					{
						clientid: appId,
						cookiepolicy : 'single_host_origin',
						callback : windowScopedCallback(callback, 'googleLoginCallback'),
						scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
					}
				);
			};
			gapi.auth.checkSessionState({ client_id: appId }, function (authResponse) {
				ready = true;
			});
		});
	});
	
	function checkLogin(success, failure) {
		//console.debug("GOOGLE", "checkLogin function", this, arguments);
		if (!checkLoginFun) {
			throw {
				type: "Login.Facebook.MissingCheckLoginFunction",
				message: "Can't find the function for checking login.",
				toString: function () { return this.type + ': ' + this.message }
			}
		}
		//console.debug("GOOGLE", "About to call checkLoginFun", checkLoginFun, typeof checkLoginFun);
		checkLoginFun(function (response) {
			//console.debug("GOOGLE", "Got back from google", this, arguments);
			if (response.status === 'connected') {
				success.call(this, response.authResponse);
			} else {
				//console.log("Calling failure because of ", response, " within checkLogin");
				failure.call(this, response);
			}
		});
	}

	function authenticate(success, failure) {
		//alert("Authenticating!")
		if (!authenticateFun) {
			throw {
				type: "Login.Facebook.MissingAuthenticateFunction",
				message: "Can't find the function for authenticating.",
				toString: function () { return this.type + ': ' + this.message }
			}
		}
		authenticateFun(function (data) {
			//console.debug("GOOGLE", new Date(), "called back");
			var error = {}
			if (data.error && data.error.length) {
				error.status = data.error;
				if (data.error === "immediate_failed") {
					error.message = "Sign in did not happen yet.";
				} else if (data.error === "access_denied") {
					error.message = "Because you did not accept Google login, you were not logged in.";
				} else {
					error.message = "Unknown error: " + data.error;
				}
				//console.debug("GOOGLE", new Date(), "calling failure", failure);
				failure.call(null, error);
			}
			//alert("It was successful. Data is \n" + JSON.stringify(data));
			success.call(null, data);
		});
	}
	
	LOGIN.addProvider(
		name,
		{
			name: name,
			authenticate: authenticate,
			checkLogin: checkLogin,
			ready: function () { return ready; },
			toString: function () { return name; }
		}
	);
}(jQuery));