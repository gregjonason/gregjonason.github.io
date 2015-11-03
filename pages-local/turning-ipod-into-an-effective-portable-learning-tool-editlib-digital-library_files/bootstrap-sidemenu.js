/* =============================================================
 * bootstrap-sidemenu.js v2.1.0
 * =============================================================
 * Copyright 2012 AACE/Cannibalized from bootstrap-collapse.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

	"use strict"; // jshint ;_;


 /* SIDEMENU PUBLIC CLASS DEFINITION
	* ================================ */

	var SideMenu = function (element, options) {
		this.$element = $(element)
		this.options = $.extend({}, $.fn.sidemenu.defaults, options)

		if (this.options.parent) {
			this.$parent = $(this.options.parent)
		}

	//console.log("SideMenu Toggling!");
		this.options.toggle && this.toggle()
	//console.log("Done SideMenu Toggling!");
	}

	SideMenu.prototype = {

		constructor: SideMenu

	, show: function () {
			var scroll
				, height
				, hasData

			if (this.transitioning) return

			this.transition('addClass', $.Event('show'), 'shown')

			$("html").addClass('sidemenu-on');
			
			height = 40 + parseInt(this.$element.height(),10) + 
				parseInt(this.$element.position().top, 10) +
				parseInt(this.$element.css('padding-top'), 10) +
				parseInt(this.$element.css('padding-bottom'), 10) +
				parseInt(this.$element.css('margin-top'), 10) +
				parseInt(this.$element.css('margin-bottom'), 10);
			//console.log("Setting height of body to ", height);
			$("body").css({
				height: this.$element.height() + 'px',
				overflow: 'hidden',
			});
		}



	, hide: function () {
			if (this.transitioning) return

			this.reset()

			this.transition('removeClass', $.Event('hide'), 'hidden')

			$("html").removeClass('sidemenu-on');
		}

	, reset: function (size) {

			this.$element
				.removeClass('sidemenu')
				[0].offsetWidth

			this.$element[size !== null ? 'addClass' : 'removeClass']('sidemenu')
			$("body").css('height', 'auto');

			return this
		}

	, transition: function (method, startEvent, completeEvent) {
			//console.log("Transition!", this, arguments);
			var that = this
				, complete = function () {
					//console.log("We finished!" , this, arguments);
						if (startEvent.type == 'show') that.reset()
						that.transitioning = 0
						//console.log("About to trigger ", completeEvent);
						that.$element.trigger(completeEvent)
						//console.log("TRiggered ", completeEvent);
					}

			this.$element.trigger(startEvent)

		//console.log("About to do the actual change, but ", startEvent.isDefaultPrevented());
			if (startEvent.isDefaultPrevented()) return

			this.transitioning = 1
		//console.log("We're transitioning!");

		//console.log("About to do ", method, " to ", this.$element, " for in");
			this.$element[method]('in')
				complete()
		}

	, toggle: function () {
		//console.log("Toggle!", this, arguments, this.$element.hasClass('sidemenu-on'));
			this[$("html").hasClass('sidemenu-on') ? 'hide' : 'show']()
		}

	}


 /* COLLAPSIBLE PLUGIN DEFINITION
	* ============================== */

	$.fn.sidemenu = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('sidemenu')
				, options = typeof option == 'object' && option
			if (!data) $this.data('sidemenu', (data = new SideMenu(this, options)))
			//console.log("About to call ", option, " from ", data);
			if (typeof option == 'string') data[option]()
		})
	}

	$.fn.sidemenu.defaults = {
		toggle: true
	};

	$.fn.sidemenu.Constructor = SideMenu;


 /* COLLAPSIBLE DATA-API
	* ==================== */

	$(function () {
		$('body').on('click.sidemenu.data-api', '[data-toggle=sidemenu]', function (e) {
			//console.log("Clicked!", this, arguments);
			var $this = $(this), href
				, target = $this.attr('data-target')
					|| e.preventDefault()
					|| (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
				, option = $(target).data('sidemenu') ? 'toggle' : $this.data();
			//console.log("Calling ", option, "on ", $(target));
			$(target).sidemenu(option);
			//console.log("And I'm done.");
		});
	});

}(window.jQuery);