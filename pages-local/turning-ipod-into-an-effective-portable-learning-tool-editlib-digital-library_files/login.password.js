(function ($) {
	var name = "password",
		contacting_server = false,
		$usernameField,
		$passwordField,
		$isNewField,
		$loginForm,
		login_url = null;
	
	/*
	function checkLogin(success, failure) {
		//console.log("About to make a request to ", login_url, " to check for user");
		$.ajax({
			type: 'POST',
			url: login_url,
			data: { check_login: true, called_by: "checkLogin Function" },
			dataType: 'json',
			xhrFields: {
			    withCredentials: true
			}

		}).done(function (data) {
			if (data.user) {
				success.call(this, data);
			} else {
				failure.call(this, data);
			}
		});
	}
	*/

	function authenticate(success, failure) {
		var current_url;
		if (contacting_server) {
			return false;
		}
		contacting_server = true;
		if (!$usernameField.length || !$passwordField.length) {
			throw {
				type: "Login.Password.MissingFields",
				message: "Both the username and password fields are required."
			};
		}
		data = {};
		data[$usernameField.attr('name')] = $usernameField.val();
		data[$passwordField.attr('name')] = $passwordField.val();
		if ($isNewField.length) {
			data['is_new'] = $isNewField.attr('type') === 'checkbox' ? 
				$isNewField.is(':checked') :
				$isNewField.val();
		}
		$.ajax({
			cache: false,
			type: 'POST',
			url: login_url,
			data: data,
			dataType: 'json',
			xhrFields: {
			    withCredentials: true
			}

		}).done(function (data) {
			//console.debug("DONE. Response from server was ", arguments);
			if (data.user && !data.error) {
				success.call(this, data, data.message);
			} else {
				failure.call(this, data.error || textStatus);
			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			//console.debug("FAILURE. Response from server was ", arguments);
			failure.call({
				'message': textStatus,
				'thrown': errorThrown
			});
		}).always(function () {
			contacting_server = false;
		});
	}
	
	//console.log("About to add ", name, " to list of providers");
	$(document).ready(function () {
		$usernameField = $('[data-login="username"]');
		$passwordField = $('[data-login="password"]');
		$isNewField = $('[data-login="is-new"]');
		$loginForm = $usernameField.closest('form');
		//console.log("Ready!");
		if (!$loginForm.length) {
			throw {
				type: "Login.Password.MissingForm",
				message: "Could not find login form.",
				toString: function () { return this.type + ': ' + this.message}
			};
		}
		//console.log("The form is ", $loginForm, " and the data is ", $loginForm.data());
		login_url = $loginForm.data('login-url') || $loginForm.attr('action');
		
		//console.log("Login url is ", login_url);
	
		LOGIN.addProvider(
			name,
			{
				ready: true,
				name: name,
				authenticate: authenticate,
//				checkLogin: checkLogin,
				toString: function () { return name }
			}
		);
	});	
}(jQuery));