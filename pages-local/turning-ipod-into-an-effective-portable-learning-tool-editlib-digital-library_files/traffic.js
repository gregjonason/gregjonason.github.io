(function ($) {
	$(document).on("click submit", '[data-track="true"]', function (event) {
		var $this = $(this),
			category = $this.data('track-category'),
			action = $this.data('track-action'),
			label = $this.data('track-label'),
			value = $this.data('track-value') || 1,
			non_interaction = $this.data('track-noninteraction') ? true: false;
		if ($this.data('tracked') && $this.data('tracked') !== event.type) {
			console.log("Already tracked for ", $this.data('tracked'));
			return true;
		}
		$this.data('tracked', event.type);
		console.log("Trackable event ", event);	
		console.log("Google analytics object", _gaq);
		if (_gaq && _gaq.push) {
			if (window.console) {
				window.console.log(
					"Recording to Google Analytics: ",
					category,
					action,
					label,
					value,
					non_interaction
				);
			}
			_gaq.push(['_trackEvent', category, action, label, value, non_interaction]);
		}
	});
}(jQuery));
