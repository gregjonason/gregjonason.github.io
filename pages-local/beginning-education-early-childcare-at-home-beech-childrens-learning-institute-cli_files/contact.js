$(document).ready(function() {

	$('#contact-form').submit(function() {

		var buttonWidth=$('#contact-form button').width();

		

		var buttonCopy = $('#contact-form button').html(),

			errorMessage = $('#contact-form button').data('error-message'),

			sendingMessage = $('#contact-form button').data('sending-message'),

			okMessage = $('#contact-form button').data('ok-message'),

			hasError = false;

		

		$('#contact-form button').width(buttonWidth);

		$('#contact-form .error-message').remove();

		

		$('.requiredField').each(function() {

			if($.trim($(this).val()) == '') {

				var errorText = $(this).data('error-empty');

				$(this).parent().append('<span class="error-message">'+errorText+'.</span>');

				$(this).addClass('inputError');

				hasError = true;

			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {

				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

				if(!emailReg.test($.trim($(this).val()))) {

					var invalidEmail = $(this).data('error-invalid');

					$(this).parent().append('<span class="error-message">'+invalidEmail+'.</span>');

					$(this).addClass('inputError');

					hasError = true;

				}

			}

		});

		

		if(hasError) {

			$('#contact-form button').html('<i class="icon-remove"></i>'+errorMessage);

			setTimeout(function(){

				$('#contact-form button').html(buttonCopy);

				$('#contact-form button').width('auto');

			},2000);

		}

		else {

			$('#contact-form button').html('<i class="fa fa-refresh fa-spin"></i>'+sendingMessage);

			

			var formInput = $(this).serialize();
            
            
              $.ajax({
                url: "/umbraco/api/umbcontact/post/",
                data: {
                    email: $("form input[name='email']").val(),
                    name: $("form input[name='name']").val(),
                    message: $("form textarea[name='message']").val(),
                    settingsNodeId: $("form input[name='settingsNodeId']").val()
                },
                type: "POST",
                success: function () {
                    // Clear the form fields after successful submit
                    $("form input[name='email']").val("");
                    $("form input[name='name']").val("");
                    $("form textarea[name='message']").val("");
                    
                    // Then hide the form/sending message and show the success message
                    $(".sending-message").hide("fast");
                    $("form").hide("fast");
                    $(".success-message").show("fast");
                    $('#contact-form button').html(buttonCopy);
					  $('#contact-form button').width('auto');
                },
                error: function (xhr) {
                    $('#contact-form button').html(buttonCopy);
					  $('#contact-form button').width('auto');
                }
            });
            

		}

		

		return false;	

	});

});