// prevent Kilauea to be defined more than once
if (typeof window.Kilauea == 'undefined') {

/**
 * Copyright � 2007 Felix Michel
 * 
 * 
 * This file is part of Kilauea.
 * 
 * Kilauea is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Kilauea is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. You can find it as a file called 'COPYING.txt'
 * in the topmost directory of Kilauea.
 * If not, see <http://www.gnu.org/licenses/>.
 */

window.Kilauea = {
	
	/************************************
	 * Class: Kilauea                   *
	 *                                  *
	 * The Global Kilauea Object        *
	 *                                  *
	 ************************************/
	
	// Group: Properties
	
	// Property: version
	// An object with properties major, minor, revision, and status. A typical use case is 
	// > alert('Current version: ' + Kilauea.version.major + '.' + Kilauea.version.minor)
	version: {
		major: 0,
		minor: 5,
		revision: '$Id: kilauea.js 153 2009-10-04 19:14:06Z felix $',
		status: 'experimental'
	},
	
	// Property: instances
	// An array of <Kilauea.Instances>. Each instance keeps its own array index in the property <Kilauea.Instance.id>.
	instances: [],
	
	// Property: scripts
	// An array of URLs for all loaded script files.
	scripts: [],
	
	// Property: scriptURL
	// The base URL of Kilauea's script directory. This property is set by <Kilauea.setScriptURL>.
	scriptURL: '',
	
	// Property: plugins
	// An object that contains all plugin classes. Plugin URIs are used as object keys. Note that while the plugin classes are stored in <Kilauea.plugins>, the actual plugin instances are stored in <Kilauea.Instance.plugins>.
	plugins: {},
	
	// Property: pluginStatus
	// Information about the status of all plugin classes. Object keys are the plugin URIs; the value is one of (loading, ok, error, incompatible)
	pluginStatus: {},
	
	// Property: pluginLocations
	// An object that contains the URLs from which the respective plugins (identified by their URI in the object keys) has been retrieved.
	pluginLocations: {},
	
	// Property: keys
	// An object of registered key events with key codes as object keys and <Kilauea.Events>  as values.
	keys: {},
	
	// Property: keyInfo
	// The info structure that is used in <Kilauea.Instance.help> and its dependents. As for <Kilauea.keys>, the object keys are the respective key codes. The values are objects with properties
	//   key - a readable string representation of the key. For instance, "A" for key code 65
	//   help - the help text
	keyInfo: {
		'80': {key: "P", help: "Previous slide in history"},
		'77': {key: "M", help: "Next slide in history"},
		'32': {key: "space", help: "Next slide (press shift to skip incrementals)"},
		'34': {key: "Pg Down", help: "Next slide (press shift to skip incrementals)"},
		'39': {key: "Right Arrow", help: "Next slide (press shift to skip incrementals)"},
		'33': {key: "Pg Up", help: "Previous slide (press shift to skip incrementals)"},
		'37': {key: "Left Arrow", help: "Previous slide (press shift to skip incrementals)"},
		'36': {key: "Home", help: "First slide of the presentation"},
		'35': {key: "End", help: "Last slide of the presentation"},
		'90': {key: "Z", help: "Last slide of the presentation"},
		'84': {key: "T", help: "Toggle table of contents"},
		'67': {key: "C", help: "Toggle table of contents"},
		'83': {key: "S", help: "Smaller font size"},
		'188': {key: "<", help: "Smaller font size"},
		'189': {key: "-", help: "Smaller font size"},
		'109': {key: "-", help: "Smaller font size"},
		'66': {key: "B", help: "Larger font size"},
		'190': {key: ">", help: "Larger font size"},
		'187': {key: "+", help: "Larger font size"},
		'191': {key: "+", help: "Larger font size"},
		'107': {key: "+", help: "Larger font size"},
		'70': {key: "F", help: "Toggle toolbar"},
		'65': {key: "A", help: "Toggle single slide view / all slides view"},
		'75': {key: "K", help: "Toggle slide advance on mouse click"},
		'72': {key: "H", help: "Toggle display of this help information"},
		'78': {key: "N", help: "Toggle slide notes"}
	},
	
	/** Property: selection
	 *  Holds possible text selections in a two-step storing object. Used in <Kilauea.Instance.handleClick>.
	 *  
	 *  Properties:
	 *
	 *  current - Stores the current selection, i.e., the one that  most recently has been fetched from the DOM
	 *  last - Stores the last selection. In case the user clicks outside a marked selection for the first time after haveng selected the text, we interpret this click as "give up the selection" rather than as "move the slide". 
	 */
	selection: {
		current: '',
		last: ''
	},
	
	/** Property: browser
	 *  A browser detection utility object. (Written a la mootools' browser detection -- not as elegantly, though.)
	 * 
	 *  Properties:
	 *    xpath - whether document.evaluate is supported, and thus evaluation of xpath expressions
	 *    ie - true, if the browser is an internet explorer
	 *    ie6 - true, if the internet explorer has version 6
	 *    ie7 - true, if the internet explorer has version 7
	 *    webkit - true, if the browser is a descendant from the webkit / KHTML family; e.g., Safari, Shiira, or Konqueror
	 *    webkit419 - true, if the webkit has version < 419. E.g., this is true for Safari 2
	 *    webkit420 - true, if the webkit has version > 420. from this version on, webkit yields xpath support. E.g., this is true for Safari 3
	 *    gecko - true, if the browser uses the gecko rendering engine. true for mozilla and most notably Firefox
	 *    opera - an alias of Opera's nice window.opera
	 */
	browser: {
		xpath: !!(document.evaluate),
		ie: !!(window.ActiveXObject),
		ie6: !!(window.ActiveXObject && !window.XMLHttpRequest),
		ie7: !!(window.ActiveXObject && window.XMLHttpRequest),
		webkit: !!(document.childNodes && !document.all && !navigator.taintEnabled),
		webkit419: !!(!document.evaluate && document.childNodes && !document.all && !navigator.taintEnabled),
		webkit420: !!(document.evaluate && document.childNodes && !document.all && !navigator.taintEnabled),
		gecko: !!(document.getBoxObjectFor != null),
		opera: !!window.opera
	},
	
	/**
	 * Property: localization
	 * 
	 * This object stores and manages everything related to localization. It is a global object with only one instance per document, which is shared by all <Kilauea.Instances>.
	 * 
	 * 
	 * Properties:
	 *   langs - The language packages which have been fetched so far. See <Kilauea.localization.langs> for more detail.
	 *   parts - The parts of the document which contain localized content. Parts have two methods, <Kilauea.localization.parts.add> and <Kilauea.localization.parts.update>.
	 * 
	 * Methods:
	 *   add - Add a new language package to <Kilauea.localization.langs>. See <Kilauea.localization.add>.
	 *   localize - Determine the ISO code of the default language of the document. See <Kilaua.localization.localize>.
	 *   fetch - Fetch a language package at runtime. See <Kilauea.localization.fetch>.
	 */
	
	
	// Group: Initialization
	
	/** 
	 * Method: init
	 * 
	 * Initializes the global Kilauea object. Kilauea.init() must be called before the page fires the load DOM event, and after kilauea.js has been included. I.e., 
	 * 
	 * > <script type="text/javascript" src="js/kilauea.js"></script>
	 * > <script type="text/javascript">
	 * >   Kilauea.init();
	 * > </script>
	 * 
	 * <Kilauea.init> registers a document.onload DOM handler, which then calls <Kilauea.create>. The parameters passed (if any) are stored in a temporary property Kilauea.params, which gets deleted once <Kilauea.create> is done.
	 * 
	 * Parameters:
	 *   a - a parameter object with 0..inf entries of the following form:
	 * 
	 * >  <ID>: {
	 * >    keyBind: <boolean:true>,
	 * >    onReady: <fn>, 
	 * >    title: <string>, 
	 * >    titleSeparator: <string:"::">
	 * >    externalTransition: <boolean:false>, 
	 * >    forceEmbeddedMode: <boolean:false>, 
	 * >    menu: {},
	 * >    settings: {
	 * >      clickAdvance: <boolean:true>, 
	 * >      showNotes: <boolean:false>, 
	 * >      useRealAnchors: <boolean:true>, 
	 * >      adaptiveTitle: <boolean:true>,
	 * >      breadcrumbsTitle: <boolean:false>, 
	 * >      useShortTitles: <boolean:true>, 
	 * >      stackBackgrounds: <boolean:false>, 
	 * >      clickAreas: <boolean:true>,
	 * >      showToolbar: <boolean:false>,
	 * >      coupleFooter: <boolean:false>
	 * >    }, 
	 * >    indicators: {
	 * >      notes: <class Indicator>, 
	 * >      incremental: <class Indicator>}
	 * >    }
	 * 
	 * Parameter object properties:
	 *   ID - must be either a valid id of an element document in this document or "'#body'" (in the latter case, the ID must appear in quotation marks, as it is not a valid javascript object identifier (which, btw, is a good thing, because it's not a legal xs:NCName either, thus avoiding collisions.))
	 * 
	 *   keyBind - specifies which instance will get the keyboard events.
	 *             if multiple instances are being set up, and multiple instances claim to get the keyboard events, the first instance to do so wins.
	 *             (right now, I can't see a sensible use case for multiple receivers.)
	 * 
	 *   indicators - have to implement the Indicator class, which is fairly simple: 1) the constructor takes one argument: a pointer to the corresponding html element, and 2) the class has to implement two argument-less methods on() and off() with the respective obvious meanings.
	 * 
	 *   title - the presentation's title. if no title is specified, the document's title tag is chosen instead, or the title of the first presentation slide.
	 * 
	 *   titleSeparator - the separator used to join parts of the title. By default, titles are concatenated through a double colon ("::"). 
	 * 
	 *   forceEmbeddedMode - if set, even full-window presentations are treated as embedded presentations.
	 * 
	 *   onReady - a function to be evaluated as soon as the instance is ready
	 * 
	 *   externalTransition - if set, <Kilauea.Instance.showSlide> does not hide / show the slides itself. this is useful if a plugin (e.g., <transition>) which listens to slideCHhange events takes care of hiding / showing slides.
	 * 
	 *   menu - a list of menu items that shall appear in the toolbar. By default, {'help': {}, 'contents': {}, 'restart': {}} are displayed. 
	 * 
	 *   settings - a setting obect of the following form
	 * 
	 * > {
	 * >   clickAdvance: <boolean:true>, 
	 * >   showNotes: <boolean:false>, 
	 * >   useRealAnchors: <boolean:true>, 
	 * >   adaptiveTitle: <boolean:true>, 
	 * >   breadcrumbsTitle: <boolean:false>,
	 * >   useShortTitles: <boolean:true>, 
	 * >   stackBackgrounds: <boolean:false>, 
	 * >   clickAreas: <boolean:true>,
	 * >   showToolbar: <boolean:false>,
	 * >   coupleFooter: <boolean:false>
	 * > }
	 * 
	 *   useRealAnchors - if set to true, existing anchors (i.e., fragment identifiers) are used. otherwise, parenthesized slide numbers are used (as in slidy).
	 *
	 *   useShortTitles - indicates that short forms of part titles should be used where present. 
	 * 
	 */
	init: function(a) {
		Kilauea.params = a || {'#body': {}};
		
		// DR: hack to hide slides while loading
		// this really boosts performance, as it keeps the browser frrom rendering evereything at once
		function hideHack() {
			if (document.body) {
				document.body.style.visibility = "hidden";
			} else {
				Kilauea.hackTimer = setTimeout(hideHack, 10);
			}
		}
		hideHack();

		Kilauea.setupLocalization();
		Kilauea.addEvent(window, 'load', Kilauea.create);
		// init Kilauea.scriptURL
		Kilauea.setScriptURL();
		// load plugins, if any
		Kilauea.loadPlugins(a);
	},
	
	/**
	 * Method: create
	 * 
	 * Builds all instances, initializes <Kilauea.localization>, and registers the document.keydown handler <Kilauea.handleKey>. This method must not be called directly; it is called on document load. Call <Kilauea.init> instead.
	 */
	create: function(e) {
		
		// init Kilauea.scripts
		Kilauea.collectScripts();
		
		// select language for L10N
		Kilauea.localization.localize();
		
		// add a onResize event handler
		Kilauea.addEvent(window, 'resize', Kilauea.redraw);
		
		Kilauea.addEvent(document, 'mouseup', Kilauea.draggable.drop);
		Kilauea.addEvent(document, 'mouseup', Kilauea.setSelection);
		
		var i, j, pl = null, id = 0;
		// iterate over the params and create all Kilauea.Instances
		for (i in Kilauea.params) {
			// bind keyboard events only once
			if (Kilauea.params[i].keyBind !== false && typeof Kilauea.keyBound == 'undefined') {
				Kilauea.keyBound = Kilauea.instances.length;
				// set up DOM handler for keyboard events
				Kilauea.addEvent(document, 'keydown', Kilauea.handleKey);
			}
			Kilauea.instances.push(new Kilauea.Instance((i == '#body') ? document.body : document.getElementById(i), Kilauea.params[i], Kilauea.instances.length));
			// initialize all plugins (has to be done after the DOM handlers have been registered, and after the instance has been pushed to Kilauea.instances)
			if (Kilauea.params[i].plugins) {
				Kilauea.instances[Kilauea.instances.length - 1].initPlugins(Kilauea.params[i].plugins);
			}
		}
		
		// clean up the DOM event handler
		Kilauea.removeEvent(window, 'load', Kilauea.create);
		
		// clean up
		delete Kilauea.params;
		
		// release the hideHack
		if (Kilauea.hackTimer) {
			clearTimeout(Kilauea.hackTimer);
			delete Kilauea.hackTimer;
		}
		document.body.style.visibility = "visible";
	},
	
	
	// font sizes
	
//	fontSizes: ["5pt", "6pt", "7pt", "8pt", "10pt", "12pt", "14pt", "16pt", "18pt", "20pt", "22pt", "24pt", "26pt", "28pt", "30pt", "32pt", "34pt", "36pt"],
	fontSizes: ["40%", "50%", "60%", "70%", "80%", "90%", "100%", "110%", "120%", "130%", "140%", "150%", "160%"],
	
	
	// Group: Keyboard Events
	
	
	/** Method: registerKey
	 *  Registers a keystroke mapping. Accepts parameters _key, fun, [thisObj, [sym, help]]_
	 *  
	 *  Parameters:
	 *    key - a key (accepts both keyCode values and ASCII chars. for non-alphabetic chars, key codes are recommended.)
	 *    fun -  a function which accepts one argument 'inst', denoting the keybound instance
	 *    thisObj - an object to be used as this pointer
	 *    sym - the keyboard symbol
	 *    help - an explaining help text
	 */
	registerKey: function(key, fun, thisObj, sym, help) {
		if (typeof fun == 'function') {
			var k = isNaN(key) ? key.toUpperCase().charCodeAt(0) : key;
			Kilauea.keys[k] = new Kilauea.Event(fun, thisObj);
			if (sym && help) {
				Kilauea.keyInfo[k] = {key: sym, help: help.localize()};
			}
		}
	},
	
	/** Method: handleKey
	 *  Handles document.keydown events. It first loops over the custom callbacks in <Kilauea.keys>, which have been registered using <Kilauea.registerKey>, then performs the built-in actions.
	 *  
	 *  Returns: Always returns true. If the event should be canceled, the callback function must explicitly call <Kilauea.cancelEvent> or <Kilauea.stopPropagation>.
	 */
	handleKey: function(e) {
		
		// cross browser stuff
		var ev = (e) ? e : window.event;
		var key = (window.event) ? window.event.keyCode : (ev.which) ?  ev.which : null;
		
		// don't interpret possible keyboard commands for the browser / OS
		if (ev.ctrlKey || ev.altKey || ev.metaKey) {
			return true;
		}
		
		// do not interpret form input
		var target = ev.target || ev.srcElement;
		do {
			if (target.nodeType == 1) {
				switch (target.nodeName) {
					case 'INPUT':
					case 'TEXTAREA':
					case 'OPTION':
					case 'SELECT':
						Kilauea.pushSelection(target.value.length ? target.value : ' ');
						return true;
					default: break;
				}
			}
		} while (target = target.parentNode);
		
		var inst = Kilauea.instances[Kilauea.keyBound];
		
		// registered keys override the built-in ones
		if (Kilauea.keys[key]) {
			Kilauea.keys[key].fire(ev, inst);
		} else {
		
			switch (key) {
			
				case 80: // P for previous in history
					inst.showSlide(inst.history.back());
					break;
				case 77: // M for mext in history (well, N was taken...)
					inst.showSlide(inst.history.forward());
					break;
				case 32: // space bar
				case 34: // page down
				case 39: // right arrow
					if (ev.shiftKey) {
						inst.nextSlide();
					} else {
						inst.next();
					}
					break;
				case 33: // page up
				case 37: // left arrow
					if (ev.shiftKey) {
						inst.previousSlide();
					} else {
						inst.previous();
					}
					break;
				case 36: // home
					inst.showSlide(0);
					break;
				case 35: // end
				case 90: // Z for last slide
					inst.showSlide(inst.slides.length - 1);
					break;
				case 84: // T for toggle table of contents
				case 67: // C for toggle table of contents
					inst.toggleToc();
					break;
				case 13: // enter
					// DR takes care of outline stuff here. Kilauea deliberately doesn't.
					
					// temporary testing stuff
					Kilauea.instances[0].lang = window.prompt("language code?", "es");
					Kilauea.localization.parts.update();
					inst.showSlide();
					
					break;
				case 83:  // S for smaller fonts
				case 188: // < for smaller fonts
				case 189: // - for smaller fonts
				case 109: // - "
					inst.fontSize.smaller();
					inst.redraw();
					break;
				case 66:  // B for larger fonts
				case 190: // > for larger fonts
				case 187: // + for larger fonts
				case 191: // + "
				case 107: // + "
					inst.fontSize.larger();
					inst.redraw();
					break;
				case 70: // F for toggle toolbar
					inst.toggleToolbar();
					break;
				case 65: // A for toggle view {single | all} slides
					inst.toggleView();
					break;
				case 75: // K for toggle klick advance
					inst.toggleClick();
					break;
				case 72: // H for help
					inst.help();
					break;
				case 78: // N for notes
					inst.toggleNotes();
					inst.showSlide();
					break;
				default:
					return true;
			}
		}
		
		// let the event live, bubble, and prosper
		return true;
	},
	
	// Group: Localization
	
	// L10N
	
	// Method: setupLocalization
	// Initializes <localization>.
	setupLocalization: function() {
		// wrap this into a function. doing so, we have at least a little bit of flexibility about when to setup localization. besides this, it provides for the nice closure around 'Part'
		Kilauea.localization = {
			/**
			 * Property: localization.langs
			 * 
			 * Keeps all the language packages fetched so far. ISO language codes are used as object keys; the object entries are pairs of an english string and its respective translation, e.g.
			 * > Kilauea.localization.langs = {
			 * >   'de': {
			 * >     "help": "Hilfe",
			 * >     "Remote Panel": "Fernsitzungssteuerungsanzeige"
			 * >    },
			 * >   'pl': {
			 * >     "help": "Pomoc"
			 * >   }
			 * > };
			 */
			langs: {},
			/**
			 * Property: localization.parts
			 * 
			 * <Kilauea.localization> not only manages language packages, but also all parts of the DOM tree that once have been localized and added to <Kilauea.localization.parts> through <Kilauea.localization.parts.add>.
			 * Besides other advantages, this permits to change languages at runtime (in fact, language packages are always fetched at runtime, because Kilauea first determines the language of the document (<Kilauea.localization.localize>) and all instances (within <Kilauea.Instance's> constructor), and then loads the localization files with <Kilauea.loadScript>.)
			 */
			parts: {
				// a private property, so to speak...
				registry: [],
				/**
				 * Method: localization.parts.add
				 * Adds a part to <localization.parts>.
				 * 
				 * Parameters:
				 *   inst - The ID of the <Kilauea.Instance> to which the inserted node belongs
				 *   node - A node with localized content. Either an element or an attribute node. in the latter case, make sure to retrieve the node through _*.getAttributeNode_ (and not _*.getAttribute_, which returns the _nodeValue_).
				 *   lang - An ISO language code.
				 */
				 // ...and its respective public setter
				add: function(inst, node, lang) {
					Kilauea.localization.parts.registry.push(new Part(inst, node, lang));
				},
				/**
				 * Method: localization.parts.update
				 * 
				 * Updates all <Kilauea.localization.parts>, or only the parts with a given language / in a given instance -- depending on the (optional) parameter.
				 * 
				 * Parameters:
				 *   x - Either a ISO language code or an <Kilauea.Instance.id>, or no argument at all.
				 * 
				 * There are two principal use cases for this method:
				 * - a language pack has been added / updated, and all parts using this language have to be updated
				 * - an instanced changed its <Kilauea.Instance.lang>, and all parts belonging to this instance have to be updated
				 * 
				 * Therefore, we do a little polymorphic magic (knowing that instance IDs are integers and language codes don't.)
				 * Furthermore, a call to this method without an argument issues updates of all parts in all instances
				 */
				update: function(x) {
					if (typeof x == 'undefined') {
						// argument omitted
						Kilauea.localization.parts.registry.forEach(function(s){ s.update(); }, Part);
						// fetch missing language packages
						Kilauea.instances.forEach(function(i){ if (i.lang && (typeof Kilauea.localization.langs[i.lang] == 'undefined')) Kilauea.localization.fetch(i.lang); }, Kilauea.Instance);
					} else if (isNaN(x)) {
						// x is a language code
						if (typeof Kilauea.localization.langs[x] == 'undefined') {
							// if the language package isn't present, updating is pointless. try fetching the package instead.
							Kilauea.localization.fetch(x);
						} else {
							Kilauea.localization.parts.registry.forEach(function(s){ if (s.lang() == x) {s.update();} }, Part);
						}
					} else {
						// x is an instance ID
						if (typeof Kilauea.instances[x] != 'undefined') {
							if (Kilauea.instances[x].lang && typeof Kilauea.localization.langs[Kilauea.instances[x].lang] == 'undefined') {
								// see above: if the language package isn't present, updating is pointless. try fetching the package instead.
								Kilauea.localization.fetch(Kilauea.instances[x].lang);
							} else {
								Kilauea.localization.parts.registry.forEach(function(s){ if (s.inst == x) {s.update(Kilauea.instances[x].lang);} }, Part);
							}
						}
					}
					Kilauea.instances.forEach(function(i){i.updaters.slideCount.fire('slideCount', i);}, Kilauea.Instance);
				}
			},
			/**
			 * Method: localization.add
			 * 
			 * Adds a new language package to <Kilauea.localization>. The language information is then stored in <Kilauea.localization.langs>. See the sample code and documentation in <Kilauea.localization.langs>.
			 * 
			 * Parameters:
			 *   lang - The ISO language code
			 *   obj - The object which contains pairs of english strings and respective translations
			 * 
			 * Note that if two language packages translate the same english string, only one translation will be kept in <Kilauea.localization.langs>. The language package which has been included after all others wins.
			 */
			add: function(lang, obj) {
				if (typeof Kilauea.localization.langs[lang] == 'undefined') {
					Kilauea.localization.langs[lang] = obj;
				} else {
					for (var i in obj) {
						Kilauea.localization.langs[lang][i] = obj[i];
					}
				}
				// update all parts which are using this language (this is a kind of "onLoad" for the language packages fetched at runtime)
				Kilauea.localization.parts.update(lang);
			},
			// Method: localization.localize
			// Initializes <Kilauea.lang>. Looks for possible language attributes on the document's element. Respects both @lang and @xml:lang.
			localize: function() {
				// DR:
				// find human language from html element for use in localizing strings
				Kilauea.lang = document.body.parentNode.getAttribute("lang") || document.body.parentNode.getAttribute("xml:lang") || navigator.language || 'en';
				Kilauea.localization.fetch(Kilauea.lang);
			},
			// Method: localization.fetch
			// Fetches a language package for Kilauea and all <Kilauea.plugins>.
			fetch: function(l) {
				Kilauea.loadScript(Kilauea.scriptURL + "localization/" + l + ".js", true);
				// iterate over active plugin directories some day
				for (var i in Kilauea.plugins) {
					Kilauea.loadScript(Kilauea.pluginLocations[i] + "localization/" + l + ".js", true);
				}
			}
		};
		
		// internal class representing registry entries
		function Part(i, n, l) {
			this.inst = i;
			this.orig = (n.nodeType == 1) ? n.firstChild.nodeValue : n.nodeValue;
			this.node = n;
			this.update();
		}
		
		Part.prototype = {
			update: function(l) {
				var lang = l || this.lang();
				switch (this.node.nodeType) {
					case 1:
						this.node.firstChild.nodeValue = this.orig.localize(lang);
						break;
					case 2:
					case 3:
						this.node.nodeValue = this.orig.localize(lang);
						break;
					default:
				}
			},
			lang: function() {
				return (typeof Kilauea.instances[this.inst] == 'undefined') ? Kilauea.lang : Kilauea.instances[this.inst].lang || Kilauea.lang;
			}
		};
	},
	
	// Group: Plugin Support
	
	/**
	 * Method: loadPlugins
	 * 
	 * Loads all plugins.
	 * 
	 * Parameters:
	 *   a - the same parameter object as for <Kilauea.create>
	 * 
	 * The method also fills <Kilauea.pluginLocations> and it loads the respective CSS file for each plugin.
	 */
	loadPlugins: function(a) {
		// p is an object with (short ID | full URI) (we cannot always know the full URI by this moment) as keys and an object {url: <url>, name: <the short ID>} as values
		// note that in case of short IDs, the object key i and p[i].name has the same value
		var i, j, idObj, p = {};
		// collect all the plugins needed
		if (typeof a == 'object') {
			for (i in a) {
				if (typeof a[i].plugins == 'object') {
					for (j in a[i].plugins) {
						idObj = Kilauea.resolvePluginID(j);
						p[idObj.id] = {url: idObj.url, name: idObj.name};
					}
				}
			}
		}
		// loop over all plugins and load the respective script and style files
		for (i in p) {
			Kilauea.pluginLocations[i] = p[i].url;
			Kilauea.pluginStatus[i] = 'loading';
			Kilauea.includeCSS(p[i].url + p[i].name + '.css');
			Kilauea.includeScript(p[i].url + p[i].name + '.js');
		}
	},
	
	/**
	 * Method: resolvePluginID
	 * 
	 * Takes a plugin ID token or an URI+URL and returns an ID object
	 * 
	 * Parameters:
	 *   id - either an ID token or a full-fledged URI + URL, separated by whitespace
	 * 
	 * Returns:
	 *   An object with properties
	 * 
	 *     id - the id -- either the ID token or the plugin URI
	 *     url - the location of the directory from which the plugin is to be retrieved (the trailing slash is included) 
	 *     name - the name of the plugin's js file, without the extension.
	 * 
	 * Two examples for input and returned object (assuming that kilauea.js resides in a directory with relative path js/
	 * > Kilauea.resolvePluginID("bigtimes")
	 * > => { id: 'bigtimes', url: 'js/plugins/bigtimes/', name: 'bigtimes'}
	 * >
	 * > Kilauea.resolvePluginID("http://sharpeleven.net/kilauea/bigtimes \\
	 * >                          http://myserver/somedirectory/bigtimes.js");
	 * > => { id: 'http://sharpeleven.net/kilauea/bigtimes',
	 * >      url: 'http://myserver/somedirectory/',
	 * >      name: 'bigtimes' }
	 */
	resolvePluginID: function(id) {
		if (Kilauea.isURI(id)) {
			// collapse whitespace
			id = id.replace(/\s+/, ' ');
			// split URI from URL
			var arr = id.split(' ');
			// split file name from URL
			var pos = arr[1].lastIndexOf('/') + 1;
			return {id: arr[0], url: arr[1].substr(0, pos), name: arr[1].substring(pos, arr[1].lastIndexOf('.'))};
		} else {
			return {id: id, url: Kilauea.scriptURL + 'plugins/' + id + '/', name: id};
		}
	},
	
	/**
	 * Method: addPlugin
	 * 
	 * Registers a plugin.
	 * 
	 * Parameters:
	 *   uri - the plugin URI
	 *   id - the plugin's ID token
	 *   pl - the plugin class itself
	 *   requireVersion - an optional version object which determines a minimal <Kilauea.version> that the plugin needs in order to work properly. The object must have the following properties
	 *
	 * > {major: <int>, minor: <int>}
	 * 
	 * The method inserts the plugin class into <Kilauea.plugins>, and makes the plugin usable for <Kilauea.Instances> to be instantiated and inserted into <Kilauea.Instance.plugins>.
	 * Besides inserting the plugin class, this method also replaces all those object keys in <Kilauea.pluginLocations>, which up to now have only been an ID token, by the plugin's full URI.
	 */
	addPlugin: function(uri, id, pl, requireVersion) {
		// well, this isn't really elegant:
		// as a consequence of not knowing the URI in case of short identifiers while initialization, we have to replace entries identified by short IDs by ones identified by URIs.
		if (typeof Kilauea.pluginLocations[id] != 'undefined') {
			var url = Kilauea.pluginLocations[id];
			delete Kilauea.pluginStatus[id];
			delete Kilauea.pluginLocations[id];
			Kilauea.pluginLocations[uri] = url;
		}
		// determine whether the plugin is compatible
		if (typeof requireVersion != 'undefined' && (Kilauea.version.major < requireVersion.major || Kilauea.version.minor < requireVersion.minor)) {
			alert("Plugin '" + id + "' (" + uri + ") is incompatible with this version of Kilauea. Kilauea version " + requireVersion.major + "." + requireVersion.minor + " is needed for this plugin to work properly.");
			delete Kilauea.pluginLocations[uri];
			Kilauea.pluginStatus[uri] = 'incompatible';
		} else {
			Kilauea.pluginStatus[uri] = 'ok';
		}
		// register the plugin object
		Kilauea.plugins[uri] = pl;
	},
	
	
	
	//////////////////////////////
	// utilities
	//////////////////////////////
	
	
	
	// Group: Style Utility Methods
	
	/**
	 * Method: hasClass
	 * 
	 * Returns true if the given element has a certain class attributed to it.
	 * 
	 * Parameters:
	 *   e - a DOM element
	 *   c - a class name
	 * 
	 * Returns:
	 *   *true*, if the element has the class assigned to it, *false* otherwise.
	 */
	hasClass: function(e, c) {
		return (e && typeof e.className != 'undefined') ? (new RegExp("\\b" + c + "\\b")).test(e.className) : false;
	},
	
	/**
	 * Method: addClass
	 * 
	 * Adds a class to a given element.
	 * 
	 * Parameters:
	 *   e - a DOM element
	 *   c - a class name
	 */
	addClass: function(e, c) {
		if (e && !Kilauea.hasClass(e, c)) {
			e.className = (e.className) ? (e.className + ' ' + c) : c;
		}
	},
	
	/**
	 * Method: removeClass
	 * 
	 * Removes a class from a given element.
	 * 
	 * Parameters:
	 *   e - a DOM element
	 *   c - a class name
	 */
	removeClass: function(e, c) {
		if (e && typeof e.className != 'undefined') {
			e.className = e.className.replace((new RegExp("\\b" + c + "\\b")), ' ');
		}
	},
	
	/**
	 * Method: getStyle
	 * 
	 * Returns an element's computed style for a given CSS property.
	 * 
	 * Parameters:
	 *   obj - a DOM element node
	 *   css - a CSS property (W3C style; i.e. _border-left-color_)
	 * 
	 * Returns:
	 *   The computed style, if possible, and *null* otherwise.
	 * 
	 * The method tries really hard to get the computed value of the desired style property. It is easily possible that it fails nevertheless, due to the quite disparate approaches to, and support of, computed styles across different browsers.
	 * Furthermore, the results may be inconsistent across differen browser families. For example, gecko translates a "border-width: thin" into a pixel value, which is parseable as integer, while IE returns the declared value "thin".
	 * You might want to postprocess the return value of <Kilauea.getStyle> using <Kilauea.toInteger>.
	 */
	getStyle: function(obj, css) {
		if (obj.currentStyle) {
			// convert W3C property-style into IE propertyStyle
			return obj.currentStyle[camelCase(css)];
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			try {
				if (document.defaultView.getComputedStyle(obj, null)) {
					return document.defaultView.getComputedStyle(obj, null).getPropertyValue(css);
				} else {
					throw "";
				}
			} catch(e) {
				return fallback();
			}
		} else {
			return fallback();
		}
		// local functions
		function fallback() {
			if (obj.style) {
				return obj.style[camelCase(css)];
			} else {
				// we REALLY have no clue
				return null;
			}
		}
		function camelCase(c) {
			var i;
			while ((i = c.indexOf('-')) != -1) {
				c = c.substr(0, i) + c.substr(i + 1, 1).toUpperCase() + c.substr(i + 2);
			}
			return c;
		}
	},
	/**
	 * Method: getByClass
	 * 
	 * Returns all child elements that exhibit a given class.
	 * 
	 * Parameters:
	 *   parent - the parent DOM element containind the child nodes to search among
	 *   c - a class name
	 * 
	 * Returns:
	 *   An array of zero or more elements.
	 * 
	 * Note that although this method sounds like the family of DOM methods such as _*.getElementByID_, the syntax of <Kilauea.getByClass> is different: This method cannot be applied as a method of the DOM element, the DOM element has rather to be passed as an argument.
	 * The reason is that <Kilauea> does not alter or extend any DOM nodes.
	 */
	getByClass: function(parent, c) {
		var res = [];
		if (parent && typeof parent.getElementsByTagName == 'function') {
			var cand = parent.getElementsByTagName('*');
			for (var i = 0; i < cand.length; i++) {
				if (Kilauea.hasClass(cand[i], c)) {
					res.push(cand[i]);
				}
			}
		}
		return res;
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getField: function(parent, cls /* chld */) {
		var f, fs = [];
		if (cls) {
			fs = Kilauea.getByClass(parent, cls);
		}
		if (fs.length) {
			f = fs[0];
		} else {
			f = document.createElement('div');
			if (cls) {
				f.className = cls;
			}
			var i, chld;
			for (i = 2; i < arguments.length; i++) {
				chld = arguments[i];
				if (typeof chld == 'string') {
					f.appendChild(document.createTextNode(chld));
				} else if (typeof chld == 'object') {
					try {
						f.appendChild(chld);
					} catch (e) {
						alert(e.toString());
						alert(chld);
						alert(chld.nodeName);
					}
				}
			}
			parent.appendChild(f);
		}
		return f;
	},
	
	// Method: redraw
	// Redraws all <Kilauea.Instances> through <Kilauea.Instance.redraw>.
	redraw: function(e) {
		Kilauea.instances.forEach(function(i){ i.redraw(); }, Kilauea.Instance);
	},
	
	/**
	 * Method: windowDimensions
	 * Yields browser-independent information about the current window's dimensions.
	 * 
	 * Returns:
	 *   An object with properties:
	 * 
	 *   width - the window's width, or *null*
	 *   height - the window's height, or *null*
	 */
	windowDimensions: function() {
		var dim = {width: 0, height: 0};
		
		if (typeof window.innerWidth == 'number') {
			// a real browser
			dim.width = window.innerWidth;
			dim.height = window.innerHeight;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			// IE compat
			dim.width = document.documentElement.clientWidth;
			dim.height = document.documentElement.clientHeight;
		} else if (document.body && document.body.clientWidth) {
			//%20IE 4
			dim.width = document.body.clientWidth;
			dim.height = document.body.clientHeight;
		} else {
			// we have no clue
			dim.width = null;
			dim.height = null;
		}
		return dim;
	},
	
	// Group: Conversion Utilities
	
	/**
	 * Method: toInteger
	 * 
	 * Converts a value to integer, if possible. <Kilauea.toInteger> is more powerful than javascript's _parseInt()_ in that it accepts two additional parameters. 
	 * 
	 * Parameters:
	 *   i - The value to convert
	 *   def - A default value that should be returned if the conversion of _i_ fails
	 *   ref - A reference value against which percentual values are computed
	 *   
	 * Returns:
	 *   - If _i_ is castable with _parseInt_ (e.g., _14px_), then parseInt(i)
	 *   - If _i_ is a percent value (e.g., _30%_), then _parseInt(i) * ref / 100_
	 *   - The default value _def_ otherwise, or *null*, if no default is specified
	 */
	toInteger: function(i, def, ref) {
		if (typeof i == 'number') {
			return i;
		} else {
			if (isNaN(parseInt(i))) {
				return (typeof def == 'undefined') ? 0 : def;
			} else {
				// we understand pixel and procentual values
				if (i.substr(i.length - 1) == '%' && !isNaN(parseInt(ref))) {
					return Math.round((parseInt(i) * ref) * 0.01);
				} else {
					return parseInt(i);
				}
			}
		}
		return null;
	},
	
	/**
	 * Method: toInteger
	 * 
	 * Converts a value to float, if possible. Similar to <Kilauea.toInteger>, but works for floating point numbers. 
	 * 
	 * Parameters:
	 *   i - The value to convert
	 *   def - A default value that should be returned if the conversion of _i_ fails
	 *   ref - A reference value against which percentual values are computed
	 *   
	 * Returns:
	 *   - If _i_ is castable with _parseFloat_ (e.g., _0.7ex_), then parseInt(i)
	 *   - If _i_ is a percent value (e.g., _49%_), then _parseInt(i) * ref / 100_
	 *   - The default value _def_ otherwise, or *null*, if no default is specified
	 */
	toFloat: function(i, def, ref) {
		if (typeof i == 'number') {
			return i;
		} else {
			if (isNaN(parseFloat(i))) {
				return (typeof def == 'undefined') ? 0 : def;
			} else {
				// we understand pixel and procentual values
				if (i.substr(i.length - 1) == '%' && !isNaN(parseFloat(ref))) {
					return (parseFloat(i) * ref) * 0.01;
				} else {
					return parseFloat(i);
				}
			}
		}
		return null;
	},
	
	// Group: Location Utilities
	
	/**
	 * Method: compareAddress
	 * 
	 * Compares to URIs without fragment identifiers. It also normalizes _file:///_ to _file:/_ and thus avoids browser-dependent confusion (e.g., in Opera). 
	 * 
	 * Parameters:
	 *   l1 - A location object -- either _window.location_ or the location property of a hyperlink element
	 *   l2 - An other (optional) location object to be compared with _l1_. If no second parameter is passed, _window.location_ is used. 
	 * 
	 * Returns:
	 *   *true*, if the locations are identical, otherwise *false*
	 */
	compareAddress: function(l1, l2) {
		// avoid the '///' confusion with 'file:' (e.g., in safari) and '/localhost/' (e.g., in opera)
		return !!(Kilauea.pageAddress(l1).replace(/^file:(\/+)/, 'file:/') == Kilauea.pageAddress(l2).replace(/^file:(\/+)/, 'file:/'));
	},
	
	/**
	 * Method: pageAddress
	 * 
	 * Retrieves an URL without fragment identifiers, URL parameters etc. 
	 * 
	 * Parameters:
	 *   l - An optional location object, Defaults to _window.location_
	 * 
	 * Returns:
	 *   The URL without fragment identifiers, URL parameters etc. 
	 * 
	 * For example, assuming that _window.location_ is "http://sharpeleven.net/some/file#part?param=value"
	 * > var me = Kilauea.pageAddress();
	 * > alert(me);
	 * > => 'http://sharpeleven.net/some/file'
	 */
	pageAddress: function(l) {
		// just do it like DR does it: plain .href -- without .protocol, .hostname, .pathname etc.
		var lo = l || window.location;
		var i = lo.href.indexOf('#');
		return (i == -1) ? lo.href : lo.href.substr(0, i);
	},
	
	/**
	 * Method: restart
	 * 
	 * Reloads the HTML page, thereby restarting all presentations. This clear the <Kilauea.Instance.histories> of all instances as well. 
	 */
	restart: function() {
		location.href = Kilauea.pageAddress();
		// safari hack
		if (Kilauea.browser.webkit) {
			setTimeout("location.href = Kilauea.pageAddress();", 100);
		}
	},
	
	// Group: DOM Event Utilities
	
	// addEvent and removeEvent are a combination of:
	// - john resig's contest-winning (http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html) functions (http://ejohn.org/projects/flexible-javascript-events/)
	// - and some code from tinyMCE (http://tinymce.moxiecode.com/tinymce/docs/tinymce_api/class_TinyMCE_Engine.htm#addEvent)
	
	
	/**
	 * Method: addEvent
	 * 
	 * Adds a DOM event handler in a fairly browser-independent way. See John Resig's similar function on <http://ejohn.org/projects/flexible-javascript-events/>, on which <Kilauea.addEvent> is partly based.
	 * 
	 * Parameters:
	 *   node - the DOM element on which the event handler should listen
	 *   type - the type of the DOM event
	 *   fn - the function to be called on DOM events. Note that fn is evaluated with the *this* pointer pointing to the element which has been passed to <Kilauea.addEvent> as first argument
	 *   capt - whether to use event capture. Defaults to *false*, because usually, one wants to have event handling during the bubble phase. IE's event model only knows event bubbling, and this parameter thus has no effect in IE.
	 * 
	 * For more information about the different DOM event models, see
	 *   - <http://www.w3.org/TR/DOM-Level-2-Events/events.html>
	 *   - <http://developer.mozilla.org/en/docs/DOM:element.addEventListener>
	 *   - <http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html>
	 */
	addEvent: function(node, type, fn, capt) {
		capt = (typeof capt == 'boolean') ? capt : false;
		// register clean up callbacks for all events (well, except for 'unload' events, of course)
		if (type != 'unload') {
			// prepare the callback function as a closure
			function cleanup() {
				try {
					// do the cleanup
					Kilauea.removeEvent(node, type, fn, capt);
					// cleanup the cleanup
					Kilauea.removeEvent(window, 'unload', cleanup);
					node = type = fn = null;
				} catch (e) {
					// tinyMCE: IE may produce access denied exception on unload
				}
			}
			// register the cleanup callback
			Kilauea.addEvent(window, 'unload', cleanup);
		}
		if (node.addEventListener) {
			node.addEventListener(type, fn, capt);
		} else if (node.attachEvent) {
			// store the function to the node (this is of arguable elegance, as we utilize Function.prototype.toString() / javascript decompilation)
			node["e" + type + fn] = fn;
			// create an anonymous function which calls fn with window.event and the correct 'this'
			node[type + fn] = function(){ node["e" + type + fn](window.event); };
			// now we can register the function 
			node.attachEvent("on" + type, node[type + fn] );
		}
	},
	
	/**
	 * Method: removeEvent
	 * 
	 * Removes a DOM event handler. This is the complementary method to <Kilauea.addEvent>. Note that this does not work reliably for anonymous functions.
	 * 
	 * Parameters:
	 *   node - the DOM element on which the event handler should listen
	 *   type - the type of the DOM event
	 *   fn - the function to be called on DOM events. Note that fn is evaluated with the *this* pointer pointing to the element which has been passed to <Kilauea.addEvent> as first argument
	 *   capt - whether to use event capture. Defaults to *false*, because usually, one wants to have event handling during the bubble phase. IE's event model only knows event bubbling, and this parameter thus has no effect in IE.
	 */
	removeEvent: function(node, type, fn, capt) {
		capt = (typeof capt == 'boolean') ? capt : false;
		if (node.removeEventListener) {
			node.removeEventListener(type, fn, capt);
		} else if (node.detachEvent) {
			// see comments in addEvent
			node.detachEvent("on"+type, node[type + fn]);
			// unset the temporary node properties (delete doesn't work on DOM nodes, so set them to 'null' and rely on GC)
			node[type + fn] = null;
			node["e" + type + fn] = null;
		}
	},
	
	/**
	 * Method: cancelEvent
	 * 
	 * Cancels a DOM event.
	 * 
	 * Parameters:
	 *   ev - a DOM event
	 * 
	 * Returns:
	 *   *false*. This is useful for writing
	 * > return cancelEvent(ev);
	 */
	cancelEvent: function(ev) {
		// DR's "cancel"
		if (ev) {
			ev.cancel = true;
			ev.returnValue = false;
			// is this really a good idea?
			// yes, in order to block the ordinary link behaviour.
			if (ev.preventDefault) {
				ev.preventDefault();
			}
		}
		return false;
	},
	
	/**
	 * Method: stopPropagation
	 * 
	 * A cross-browser implementation of <http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event-stopPropagation>.
	 * 
	 * Parameters:
	 *   e - a DOM event
	 */
	stopPropagation: function(e) {
		// DR's 'stopPropagation'
		(window.event || e).cancelBubble = true;
		if (e && e.stopPropagation) {
			e.stopPropagation();
		}
	},
	
	// Group: AJAX Utilities
	
	/**
	 * Method: getXHR
	 * 
	 * A cross-browser utility method which returns a XMLHttpRequest object.
	 *   
	 * Returns:
	 *   An XMLHttpRequest object.
	 */
	getXHR: function() {
		/* from http://www.peej.co.uk/articles/rich-user-experience.html */
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		} try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
		return null;
	},
	
	// Group: Load/Include Utilities
	
	/**
	 * Method: setScriptURL
	 * 
	 * Sets <Kilauea.scriptURL> to Kilauea's base directory.
	 */
	setScriptURL: function() {
		// set the script URL by looking at where kilauea.js resides
		var url, s = document.getElementsByTagName("script");
		for (var i = 0; i < s.length; i++) {
			if (url = s[i].getAttribute("src")) {
				if (url.search(/kilauea(\.packed)?\.js$/) != -1) {
					Kilauea.scriptURL = url.replace(/kilauea(\.packed)?\.js$/, '');
				}
			}
		}
	},
	
	/**
	 * Method: collectScripts
	 * 
	 * Collects all scripts included so far and pushes them onto <Kilauea.scripts>.
	 */
	collectScripts: function() {
		// collect imported script files
		var url, s = document.getElementsByTagName("script");
		for (var i = 0; i < s.length; i++) {
			url = s[i].getAttribute("src");
			if (url && Kilauea.scripts.indexOf(url) < 0) {
				Kilauea.scripts.push(url);
			}
		}
	},
	
	/**
	 * Method: loadScript
	 * 
	 * Loads a script at runtime. This method is different from <Kilauea.includeScript> in that it works at runtime, not during page load. As a consequence, no document.load event fires when the loading of the script completes.
	 * 
	 * Parameters:
	 *   url - the URL to the script. No expansion / modification of the URL is done; the caller has to make sure that the URL is correct.
	 *   isUTF8 - whether the file is UTF8-encoded. Defaults to *false*. For example, <Kilauea.localization.fetch> utilizes this feature, as language packages are very likely to contain special characters. 
	 */
	loadScript: function(url, isUTF8) {
		// works after DOM.documentload
		if (url && Kilauea.scripts.indexOf(url) < 0) {
			Kilauea.scripts.push(url);
			var s = document.createElement('script');
			s.setAttribute('language', 'javascript');
			s.setAttribute('type', 'text/javascript');
			if (isUTF8) {
				s.setAttribute('charset', 'utf-8');
			}
			s.setAttribute('src', url);
			document.getElementsByTagName("head")[0].appendChild(s);
		}
	},
	
	/**
	 * Method: includeScript
	 * 
	 * Includes a script during page load. As opposed to <Kilauea.loadScript>, this method inserts a script element into the document header. Th script then is loaded during page load, and the loading process of the script is taken into consideration when determining completion of document.load. 
	 * 
	 * Parameters:
	 *   url - the URL to the script. No expansion / modification of the URL is done; the caller has to make sure that the URL is correct.
	 *   isUTF8 - whether the file is UTF8-encoded. Defaults to *false*. 
	 */
	includeScript: function(url, isUTF8) {
		// works while building the page, fires onload
		if (url && Kilauea.scripts.indexOf(url) < 0) {
			Kilauea.scripts.push(url);
			document.writeln("<scri" + 'pt type="text/javascript" ' + ((isUTF8) ? 'charset="utf-8" ' : '') + 'src="' + url + '"></scr' + 'ipt>');
		}
	},
	
	/**
	 * Method: includeCSS
	 * 
	 * Includes a CSS file during page load. Similar to <Kilauea.includeScript>, but works for CSS files rather than for scripts.
	 * 
	 * Parameters:
	 *   url - the URL to the script. No expansion / modification of the URL is done; the caller has to make sure that the URL is correct.
	 */
	includeCSS: function(url) {
		// works while building the page, fires onload
		if (url) {
			document.writeln('<link rel="stylesheet" type="text/css" href="' + url + '" />');
		}
	},
	
	// Group: Drag'n'drop support
	
	draggable: {
		anchor: { x: 0, y: 0 },
		last: { x: 0, y: 0 },
		previous: null,
		current: null,
		/**
		 * Method: draggable.pick
		 * 
		 * Handles the picking up in a drag'n'drop action. As a side-effect, the *z-index* of the element which is to be dragged is set to 700 while dragging.
		 * 
		 * Parameters:
		 *   e - the mousedown event
		 */
		pick: function(e) {
			if (Kilauea.draggable.current) {
				Kilauea.draggable.drop(null);
			}
			if (Kilauea.hasClass(this, "draggable") || Kilauea.hasClass(e.originalTarget || e.srcElement, 'handle')) {
				Kilauea.draggable.current = this;
				var inst = Kilauea.draggable.getInstance(this);
				Kilauea.draggable.last.x = Kilauea.toInteger(Kilauea.getStyle(this, 'left'), 0, inst.canvas.width);
				Kilauea.draggable.last.y = Kilauea.toInteger(Kilauea.getStyle(this, 'top'), 0, inst.canvas.height);
				Kilauea.draggable.anchor.x = e.clientX ? e.clientX : e.pageX;
				Kilauea.draggable.anchor.y = e.clientY ? e.clientY : e.pageY;
				if (Kilauea.draggable.previous) {
					Kilauea.draggable.previous.style.zIndex = 300;
				}
				this.style.zIndex = 700;
			}
		},
		/**
		 * Method: draggable.drop
		 * 
		 * Performs the drop of a drag'n'drop. 
		 * 
		 * Parameters:
		 *   e - the mouseup event
		 */
		drop: function(e) {
			if (Kilauea.draggable.current) {
				Kilauea.draggable.previous = Kilauea.draggable.current;
				Kilauea.draggable.current = null;
			}
		},
		/**
		 * Method: draggable.drag
		 * 
		 * Updates the element's position while dragging. 
		 * 
		 * Parameters:
		 *   e - the mousemove event
		 */
		drag: function(e) {
			if (Kilauea.draggable.current) {
				var pos = {
					x: e.clientX ? e.clientX : e.pageX,
					y: e.clientY ? e.clientY : e.pageY
				};
				Kilauea.draggable.current.style.left = (Kilauea.draggable.last.x + pos.x - Kilauea.draggable.anchor.x) + "px";
				Kilauea.draggable.current.style.top = (Kilauea.draggable.last.y + pos.y - Kilauea.draggable.anchor.y) + "px";
				Kilauea.draggable.current.style.bottom = Kilauea.draggable.current.style.right = 'auto';
				if (window.getSelection && window.getSelection().removeAllRanges) {
					window.getSelection().removeAllRanges();
				} else if (document.selection && document.selection.empty) {
					document.selection.empty();
				}
//				return Kilauea.cancelEvent(e);
			}
		},
		
		getInstance: function(el) {
			if (el.className) {
				var res = (new RegExp("\\bkilaueaInstID:(\\d+)\\b")).exec(el.className);
				if (res.length > 1) {
					return Kilauea.instances[res[1]];
				}
			}
			return null;
		}
	},
	
	// Group: Miscellaneous Methods
	
	/**
	 * Method: isURI
	 * 
	 * Determines whether a string is an URI. Applys the following regular expression pattern to the string
	 * > /^(\w+:\/\/)/
	 * 
	 * Parameters:
	 *   n - a string
	 * Returns:
	 *   *true*, if the string is an URI, otherwise *false*. 
	 */
	isURI: function(n) {
		return /^(\w+:\/\/)/.test(n);
	},
	
	/**
	 * Method: html2text
	 * 
	 * Returns a plain-text version of a possibly HTML-formatted string. It recursively traverses all child elements, retrieves all text nodes and concats these strings.
	 * 
	 * Parameters:
	 *   el - a DOM element
	 * Returns:
	 *   A string representation of the element's content.
	 */
	html2text: function(el) {
		var txt = '';
		if (el && el.nodeType) {
			switch(el.nodeType) {
				case 1:
					if (!Kilauea.hasClass(el, 'only-media-print')) {
						if (el.nodeName.toLowerCase() == 'img') { 
							txt += el.alt;
						} else {
							for (var chld = el.firstChild; chld !== null; chld = chld.nextSibling) {
								txt += Kilauea.html2text(chld);
							}
						}
					}
					break;
				case 2:
				case 3:
					txt = el.nodeValue;
					break;
				default:
			}
		}
		return txt;
	},
	
	/**
	 * Method: getSelection
	 * 
	 * Mainly Dave Raggett's original getSelectedText() function, it provides a cross-browser proof method for returning a text selection. Cf. also http://www.quirksmode.org/dom/range_intro.html.
	 * 
	 * Returns:
	 *   The empty string
	 */
	getSelection: function() {
		// DR's getSelectedText()
		try {
			if (window.getSelection) {
				return window.getSelection().toString();
			} else if (document.getSelection) {
				return document.getSelection().toString();
			} else if (document.selection) {
				return document.selection.createRange().text;
			}
		} catch (e) {}
		return "";
	},
	
	/**
	 * Method: setSelection
	 * 
	 * Pushes the current text selection (which it gets through calling <Kilauea.getSelection>) into <Kilauea.selection>.current (after having pushed the latter's value into <Kilauea.selection>.last).
	 * 
	 * Returns:
	 *   *true* in order to enable bubbling of the event
	 */
	setSelection: function() {
		Kilauea.selection.last = Kilauea.selection.current;
		Kilauea.selection.current = Kilauea.getSelection();
		return true;
	},
	
	/**
	 * Method: pushSelection
	 * 
	 * Pushes a given string into <Kilauea.selection>.current (after having pushed the latter's value into <Kilauea.selection>.last).
	 * 
	 * Returns:
	 *   *true* in order to enable bubbling of the event
	 */
	pushSelection: function(s) {
		Kilauea.selection.last = Kilauea.selection.current;
		Kilauea.selection.current = s;
		return true;
	},
	
	// Kilauea utility classes
	
	/**
	 * Class: Kilauea.Event
	 * 
	 * A Class for Kilauea Events
	 * 
	 * A utility class that stores an event callback and a *this* pointer. 
	 * 
	 * Parameters:
	 *   fn - a function
	 *   thisObj - an optional pointer to an object that is to be used as *this* when calling the function. (Similar to the second argument in Array.forEach. See <http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach>)
	 */
	Event: function(fn, thisObj) {
		// Property: fn
		// The function to be used as callback
		this.fn = fn;
		// Property: thisObj
		// The object to be used as *this* pointer when calling <fn>.
		this.thisObj = thisObj || null;
		// Method: fire
		// Fires <fn> with *this* set to <thisObj>.
		this.fire = function(t, inst){
			if (this.thisObj) {
				this.fn.call(this.thisObj, t, inst);
			} else {
				this.fn(t, inst);
			}
		};
	},
	
	/**
	 * Class: Kilauea.Panel
	 * 
	 * A Utility Class for Panels
	 * 
	 * Constructor Parameters:
	 *   elm - The panel's DOM element
	 *   defVis - The initial default visibility -- either 'hidden' or 'visible'
	 *   embedded - Whether the panel is part of an embedded presentation
	 *   isDrag - Whether the panel should be draggable through Kilauea.draggable (default is false) 
	 */
	Panel: function(elm, defVis, embedded, isDrag) {
		// Property: ref
		// A reference to the DOM element. This can be used if for example the DOM contents of the panels are altered.
		this.ref = elm;
		// Property: status
		// The current status of the panel's visibility. 
		this.status = defVis ? defVis : 'hidden';
		Kilauea.addEvent(this.ref, 'click', Kilauea.stopPropagation);
		// should it be draggable?
		if (!!isDrag && Kilauea.hasClass(this.ref, 'nodrag') == false) {
			// make the panel draggable!
			if (Kilauea.getByClass(this.ref, 'handle').length == 0) {
				Kilauea.addClass(this.ref, 'draggable');
			}
			// store the instance ID
			Kilauea.addClass(this.ref, 'kilaueaInstID:' + 0);
			// invoke Kilauea.draggable.pick onmousedown
			Kilauea.addEvent(this.ref, 'mousedown', Kilauea.draggable.pick);
		}
		/**
		 * Method: set
		 * 
		 * Sets the visibility of the panel.
		 * 
		 * Parameters:
		 *   v - the visibility. Either 'visible' or 'hidden'. 
		 */
		this.set = function(v) {
/*			this.status = this.ref.style.visibility = v || this.status;
			// set display as well; this avoids the rendering of erratic scrollbars
			this.ref.style.display = (this.status == 'hidden') ? 'none' : 'block';
*/			// v2
			this.status = v || this.status;
			if (this.status == 'hidden') {
				Kilauea.removeClass(this.ref, 'active');
				Kilauea.addClass(this.ref, 'inactive');
			} else {
				Kilauea.removeClass(this.ref, 'inactive');
				Kilauea.addClass(this.ref, 'active');
			}
		};
		// Method: hide
		// Hides the panel.
		this.hide = function() { this.set('hidden'); };
		// Method: show
		// Shows the panel.
		this.show = function() { this.set('visible'); };
		// Method: toggle
		// Toggles the panel.
		this.toggle = function() { (this.status == 'hidden') ? this.show() : this.hide(); };
		if (Kilauea.getStyle(this.ref, 'position') == "fixed" && (embedded || Kilauea.browser.ie6)) {
			this.ref.style.position = "absolute";
		}
		// Method: quickHide
		// Temporarily hides the panel.
		this.quickHide = function() {
			if (!this._st) {
				this._st = this.status;
				this.hide();
			}
		};
		// Method: restore
		// Restores the panel after a <quickHide>. 
		this.restore = function() {
			if (typeof this._st != 'undefined') {
				this.set(this._st);
				delete this._st;
			}
		};
		
		if (Kilauea.browser.ie6) {
			// this somehow works apparently.
			this.timer = setInterval(function(){elm.style.visibility = 'hidden'; elm.style.visibility = 'visible'; }, 370);
		}
	},
	
	/**
	 * Class: Kilauea.Canvas
	 * 
	 * A Utility Canvas Class
	 * 
	 * A utility class for the canvas element which encloses Kilauea presentations in <Kilauea.embeddedMode>. 
	 * 
	 * Constructor Parameters:
	 *   el - The DOM element. 
	 *   isFull - Whether the <Canvas> is the full browser window itself.
	 */
	Canvas: function(el, isFull) {
		// Property: left
		// The absolute x-coordinate of the canvas, in pixels. 
		this.left = 0;
		// Property: top
		// The absolute y-coordinate of the canvas, in pixels. 
		this.top = 0;
		// Property: width
		// The total width of the canvas, in pixels. 
		this.width = 0;
		// Property: height
		// The total height of the canvas, in pixels. 
		this.height = 0;
		// Method: update
		// Updates the canvas' position and dimensions. For instance, this method gets called by <Kilauea.Instance.redraw> if the presentation is in <Kilauea.Instance.embeddedMode>. 
		this.update = function() {
			if (!isFull) {
				var isFixed = false, isAbsolute = false, pos = 'relative', obj = el;
				
				this.left = el.offsetLeft;
				this.top = el.offsetTop;
				this.width = el.offsetWidth - Kilauea.toInteger(Kilauea.getStyle(el, 'border-left-width')) - Kilauea.toInteger(Kilauea.getStyle(el, 'border-right-width'));
				this.height = el.offsetHeight - Kilauea.toInteger(Kilauea.getStyle(el, 'border-top-width')) - Kilauea.toInteger(Kilauea.getStyle(el, 'border-bottom-width'));
				
				while (obj.offsetParent !== null && !isAbsolute) {
					obj = obj.offsetParent;
					this.left += obj.offsetLeft - obj.scrollLeft;
					this.top += obj.offsetTop - obj.scrollTop;
					switch (Kilauea.getStyle(obj, "position")) {
						case 'fixed':
							isFixed = true;
							break;
						case 'absolute':
							isAbsolute = true;
							break;
						default:
					}
				}
				if (isFixed) {
					this.left += window.pageXOffset ? window.pageXOffset : (document.documentElement ? document.documentElement.scrollLeft : document.body.scrollLeft);
					this.top += window.pageYOffset ? window.pageYOffset : (document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop);
				}
				if (isAbsolute) {
					this.left += Kilauea.toInteger(Kilauea.getStyle(obj, 'left'));
					this.top += Kilauea.toInteger(Kilauea.getStyle(obj, 'top'));
				}
				this.left += Kilauea.toInteger(Kilauea.getStyle(el, 'border-left-width'));
				this.top += Kilauea.toInteger(Kilauea.getStyle(el, 'border-top-width'));
			} else {
				var dim = Kilauea.windowDimensions();
				this.width = dim.width;
				this.height = dim.height;
			}
		};
	},
	
	/**
	 * Class: Kilauea.Slide
	 * 
	 * The Slide Class
	 * 
	 * The slide class used for all <Kilauea.Instance.slides>. This class is only accessible within the scope of <Kilauea.Instance's> constructor.
	 * 
	 * Constructor Parameters:
	 *   s - the slide's DOM element (usually a div.slide)
	 *   id - the slide's ID, which will be the position where the slide can be found within <Kilauea.Instance.slides>
	 *   inst - the ID of the <Kilauea.Instance> to which the slide belongs
	 *   partIDs - an array of <Kilauea.Instance.parts> IDs, which denote the hierarchy of enclosing parts
	 */
	Slide: function(s, id, inst, partIDs) {
		// Property: ref
		// A pointer to the slide's DOM element, usually a div.slide.
		this.ref = s;
		// Property: id
		// The slide's ID, which is the array index of the slide within <Kilauea.Instance.slides>.
		this.id = id;
		// Property: inst
		// The <Kilauea.Instance.id> of the instance to which the slide belongs.
		this.instance = inst;
		// Property: partInfo
		// The array of IDs of enclosing <Kilauea.Instance.parts>.
		this.partInfo = [];
		// array args need deep copy
		for (var i = 0; i < partIDs.length; i++) {
			this.partInfo.push(partIDs[i]);
		}
		// Property: anchor
		// A fragment identifier for this slide (if present), or a self-assigned pseudo-identifier.
		// Pseudo-identifiers have the form "(<slide number>)".
		// Note that self-assigned anchors may confilct with other user-defined anchors.
		this.anchor = s.id || s.name || '(' + parseInt(id + 1) + ')';
		// for outline slides, try fetching the part's id
		if (Kilauea.hasClass(s, 'outline')) {
			var el;
			for (el = s.parentNode; el && el.nodeType != 1; el = el.parentNode) {}
			if (Kilauea.hasClass(el, 'part') && el.id) {
				this.anchor = s.parentNode.id;
			}
		}
		// hard-code the relevant CSS properties
		this.ref.style.position = 'absolute';
		// read out title
		var h = s.getElementsByTagName('h1') || s.getElementsByTagName('h2') || s.getElementsByTagName('h3');
		// Property: title
		// A plain text slide title - either the @title or a flattened version of the heading's contents
		this.title = h ? h[0].title ? h[0].title : Kilauea.html2text(h[0]) : '';;
		// Property: note
		// A <Kilauea.Panel> that contains the annotation, if any.
		this.note = getNote();
		/**
		 * Property: incrementals
		 * An array which contains objects for each incremental part of the slide. The object has two methods,
		 *   unveil - unveils the incremental part
		 *   cover - covers the incremental part
		 * <Slide.incrementals> are used in <Slide.unveilUpto>.
		 */
		this.incrementals = [];
		this.incrementals = getIncrementals(s);
		// Slide methods
		
		/**
		 * Method: hide
		 * Hides the slide.
		 * 
		 * Returns:
		 *   The <Slide.id>.
		 */
		this.hide = function() {
			this.set(false);
			return this.id;
		};
		/**
		 * Method: show
		 * Shows the slide. Not to be confused with <Kilauea.Instance.showSlide>, which does a lot more besides showing slides. (In fact, it doesn't even necessarily show slides: e.g., the <transition> plugin may take care of that.)
		 * 
		 * Returns:
		 *   The <Slide.id>.
		 */
		this.show = function() {
			this.set(true);
			return this.id;
		};
		/**
		 * Method: unveilUpto
		 * Unveils incrementals up to a given position. The position is the array index of the incremental part within <Slide.incrementals>.
		 * Parameters:
		 *   i - the incremental index up to which incrementals shall be unveiled.
		 *  
		 *  Returns:
		 *    The the current incremental index.
		 */
		this.unveilUpto = function(i) {
			this.incrementals.slice(0, i + 1).forEach(function(s) { s.unveil(); }, Incremental);
			this.incrementals.slice(i + 1).forEach(function(s) { s.cover(); }, Incremental);
			return i;
		};
		
		/**
		 * Method: set
		 * 
		 * Sets the slide's visibility. 
		 * 
		 * Parameters:
		 *   vis - the desired visibility. Either *true* or *false*. 
		 */
		this.set = function(vis) {
/*			if (!vis) {
				this.ref.style.display = 'none';
				this.ref.style.visibility = 'hidden';
			} else {
				this.ref.style.display = 'block';
				this.ref.style.visibility = 'visible';
			}
*/
			// v2
			if (!vis) {
				Kilauea.removeClass(this.ref, 'active');
				Kilauea.addClass(this.ref, 'inactive');
			} else {
				Kilauea.removeClass(this.ref, 'inactive');
				Kilauea.addClass(this.ref, 'active');
			}
		};
		/**
		 * Method: findBackground
		 * 
		 * Finds a matching background in <Kilauea.Instance.backgrounds> for a <Kilauea.Slide>. Backgrounds are associated to slides via the class attribute. If a slide bears the class 'xyz' in its classname and there is a background with _class="background xyz"_, then this background is the matching background for that slide. 
		 * 
		 * Parameters:
		 *   gb - An associative array of backgrounds, where the keys are the background names (i.e., 'xyz' in the above example). 
		 * 
		 * Returns:
		 *   A background name, or '#default', if no explicitly associated background can be found. 
		 */
		this.findBackground = function(bg) {
			for (var i in bg) {
				if (Kilauea.hasClass(this.ref, i)) {
					return i;
				}
			}
			return '#default';
		};
		Kilauea.addEvent(this.ref, 'scroll', new Function("e", "Kilauea.instances[" + this.instance + "].backgrounds[Kilauea.instances[" + this.instance + "].status.currentBackground].adaptScroll(parseInt(this.scrollLeft), parseInt(this.scrollTop));"));
		
		// hide yourself on startup
		this.hide();
		
		// private methods and subclasses
		
		function getNote() {
			// get the first element with class 'note'
			var elms = s.getElementsByTagName('*');
			for (var i = 0; i < elms.length; i++) {
				if (Kilauea.hasClass(elms[i], 'note')) {
					return new Kilauea.Panel(elms[i], null, false, true);
				}
			}
			return null;
		}
		
		function getIncrementals(el, isIncremental) {
			var incrementables = ["P", "PRE", "LI", "BLOCKQUOTE", "DT", "DD", "H2", "H3", "H4", "H5", "H6", "SPAN", "ADDRESS", "TABLE", "TR", "TH", "TD", "IMG", "OBJECT"];
			var incrementals = [];
			
			for (el = el.firstChild; el; el = el.nextSibling) {
				if (el.nodeType == 1) {
					if ((isIncremental || Kilauea.hasClass(el, 'incremental')) && !Kilauea.hasClass(el, 'non-incremental')) {
						if (incrementables.indexOf(el.nodeName.toUpperCase()) < 0) {
							// non-incrementable items (such as ul, ol dl, div)
							incrementals = incrementals.concat(getIncrementals(el, true));
						} else {
							// incrementable items (such as li, dd, dt, p, ...)
							incrementals.push(new Incremental(el));
							incrementals = incrementals.concat(getIncrementals(el, isIncremental));
						}
					} else {
						incrementals = incrementals.concat(getIncrementals(el, false));
					}
				}
			}
			return incrementals;
		}
		
		function Incremental(el) {
//			this.test = el.nodeName;
			this.show = function() { el.style.visibility = 'visible'; };
			this.hide = function() { el.style.visibility = 'hidden'; };
			this.cover = function() { Kilauea.addClass(el, 'covered'); };
			this.unveil = function() { Kilauea.removeClass(el, 'covered'); };
		}
	},
	
	/**
	 * Class: Kilauea.Background
	 * 
	 * The Background Class
	 * 
	 * Constructor Parameters:
	 *   s - The DOM element. 
	 */
	Background: function(s) {
		// Property: ref
		// A pointer to the backgounnd's DOM element. THis is important if the background's DOM content has to be modified. 
		this.ref = s;
		if (s) {
			this.ref.style.position = 'absolute';
			/**
			 * Method: hide
			 * 
			 * Hides the background. 
			 */
			this.hide = function() {
				this.set(false);
			};
			/**
			 * Method: show
			 * 
			 * Shows the background. 
			 */
			this.show = function() {
				this.set(true);
			};
			/**
			 * Method: set
			 * 
			 * Sets the backgound's visibility. 
			 * 
			 * Parameters:
			 *   vis - The desired visibility -- either *true* or *false*. 
			 */
			this.set = function(vis) {
				if (!vis) {
					this.ref.style.display = 'none';
					this.ref.style.visibility = 'hidden';
				} else {
					this.ref.style.display = 'block';
					this.ref.style.visibility = 'visible';
				}
			};
			// Property: left
			// The x-coordinate of the computed position, in pixels. 
			this.left = Kilauea.toInteger(Kilauea.getStyle(this.ref, 'left'), 0);
			// Property: top
			// The y-coordinate of the computed position, in pixels. 
			this.top = Kilauea.toInteger(Kilauea.getStyle(this.ref, 'top'), 0);
			/**
			 * Method: adaptScroll
			 * 
			 * Adapts the scroll position to given coordinates. This is used in order to get the same behaviour (i.e., backgrounds move together with slides while scrolling) in <Kilauea.Instance.embeddedMode> as in standalone mode.  
			 * 
			 * Parameters:
			 *   left - the x-coordinate
			 *   top - the y-coordinate 
			 */
			this.adaptScroll = function(left, top) {
				this.ref.style.left = this.left - left + 'px';
				this.ref.style.top = this.top - top + 'px';
			};
			/**
			 * Method: resetScroll
			 * 
			 * Resets the background's position to the top left corner of the canvas. 
			 */
			this.resetScroll = function() {
				this.ref.style.left = this.left + 'px';
				this.ref.style.top = this.top + 'px';
			};
		} else {
			this.left = this.top = 0;
			this.hide = this.show = this.set = this.resetScroll = this.adaptScroll = this.redraw = function() {};
		}
		this.hide();
	},
	
	
	/**
	 * Class: Kilauea.Menu
	 * 
	 * The Menu Class
	 * 
	 * Constructor Parameters:
	 *   m - The ul DOM element.
	 *   timeout - The timeout value in milliseconds, after which a submenu shall collapse when leaving the menu's hyperlink. Default is 400 milliseconds. 
	 */
	Menu: function(m, timeout) {
		if (m && m.nodeName && m.nodeName.toLowerCase() == 'ul') {
			this.ul = m;
			this.timeout = timeout || 400;
			this.timer = null;
			this.active = null;
			// Property: submenus
			// An object that contains all <Kilauea.Submenus>. The submenu objects can be accessed using their IDs, which are the object keys of this object. (See further explanations in the parameter description of <addSubmenu> below.)
			this.submenus = {};
			
			/**
			 * Method: addSubmenu
			 * 
			 * Adds a <Kilauea.Submenu> to the <Menu>. 
			 * 
			 * Parameters:
			 *   id - An ID string which identifies the submenu. If the ID string is already in use, the respective submenu will be overwritten. This ID can later be used in order to access the submenu as in _some_menuobj.submenus[id].addEntry(a)_. 
			 *   a - The DOM element to be inserted as the submenus menu entry. Usually an A element, preferably obtained through <Kilauea.Instance.getLink>. 
			 * 
			 * Returns:
			 *   The <Kilauea.Submenu> that has been created, or *NULL*. 
			 * 
			 */
			this.addSubmenu = function(id, a) {
				if (a && a.nodeType == 1) {
					var li = document.createElement('li');
					li.appendChild(a);
					li.appendChild(document.createElement('ul'));
					li.className = 'submenu';
					var sm = new Kilauea.Submenu(li, this, id);
					li.onmouseover = function(e) {
						sm.show();
					};
					li.onmouseout = function(e) {
						sm.giveup();
					};
					this.submenus[id] = sm;
					this.ul.appendChild(li);
					return sm;
				} else {
					return null;
				}
			};
			/**
			 * Method: removeSubmenu
			 * 
			 * Removes a <Kilauea.Submenu> from a <Menu>. 
			 * 
			 * Parameters:
			 *   id - An ID string which identifies the submenu.  
			 * 
			 * Returns:
			 *   *TRUE* on success, *FALSE* otherwise. 
			 * 
			 */
			this.removeSubmenu = function(id) {
				if (id && this.submenus[id]) {
					this.ul.removeChild(this.submenus[id].ref);
					delete this.submenus[id];
					return true;
				} else {
					return false;
				}
			};
		} else {
			return null;
		}
	},
	
	/**
	 * Class: Kilauea.Submenu
	 * 
	 * The Submenu Class
	 * 
	 * Constructor Parameters:
	 *   m - The li DOM element. 
	 *   parent - The parent <Kilauea.Menu>.
	 *   id - The submenu's ID, which is its key within the parent's <Kilauea.Menu.submenus> object.  
	 */
	Submenu: function(m, parent, id) {
		this.ref = m;
		this.parent = parent;
		this.id = id;
		this.show = function() {
			if (this.parent.timer) {
				window.clearTimeout(this.parent.timer);
			}
			if (this.parent.active) {
				this.parent.active.hide();
			}
			this.parent.active = this;
			this.ref.lastChild.style.display = 'inline';
			this.ref.lastChild.style.visibility = 'visible';
			Kilauea.addClass(this.ref, 'active');
		};
		this.giveup = function(e) {
			if (this.parent.timer) {
				window.clearTimeout(this.parent.timer);
			}
			var t = this;
			this.parent.timer = window.setTimeout(function(){
				t.hide();
			}, this.parent.timeout);
		};
		this.hide = function() {
			this.ref.lastChild.style.display = 'none';
			this.ref.lastChild.style.visibility = 'hidden';
			Kilauea.removeClass(this.ref, 'active');
			this.parent.active = null;
		};
		/*
		 *  Method: addEntry
		 * 
		 *  Adds a hyperlink to a given submenu.
		 * 
		 *  Parameters:
		 *    a - A hyperlink DOM element. It is recommended to generate this element by using <Kilauea.Instance.getLink>.
		 * 
		 *  Returns:
		 *    The newly appended menu entry (which is a list DOM element, and which can be used to remove or replace the entry by means of <Kilauea.Instance.removeFromSubmenu> or <Kilauea.Instance.replaceInSubmenu>, respectively), or *null*.
		 */
		this.addEntry = function(a) {
			if (a && a.nodeName && a.nodeName.toLowerCase() == 'a') {
				var li = this.ref.lastChild.appendChild(document.createElement('li'));
				li.appendChild(a);
				return li;
			} else {
				return null;
			}
		};
		/*
		 *  Method: removeEntry
		 * 
		 *  Removes a hyperlink from a given submenu.
		 * 
		 *  Parameters:
		 *    li - The submenu entry, which is a 'LI' DOM element (usually obtained from <addEntry>). 
		 * 
		 *  Returns:
		 *    The DOM element removed, or *NULL*.  
		 */
		this.removeEntry = function(li) {
			return this.ref.lastChild.removeChild(li);
		};
		/*
		 *  Method: replaceEntry
		 * 
		 *  Adds a hyperlink to a given submenu.
		 * 
		 *  Parameters:
		 *    li - The existing submenu entry, which is a 'LI' DOM element (usually obtained from <addEntry>). 
		 *    a - The menu entry which is to be inserted instead of the old entry _li_. This must be a hyperlink DOM element, preferably created through <Kilauea.Instance.getLink>. 
		 * 
		 *  Returns:
		 *    The newly appended menu entry (which is a list DOM element, and which can be used to remove or replace the entry again, or *null*.
		 */
		this.replaceEntry = function(li, a) {
			if (li && a && a.nodeName && a.nodeName.toLowerCase() == 'a') {
				var newLi = document.createElement('li');
				newLi.appendChild(a);
				this.ref.lastChild.replaceChild(newLi, li);
				return newLi;
			} else {
				return null;
			}
		};
		
	},
	
	/**************************************************
	 *  Class: Kilauea.Instance                       *
	 *                                                *
	 *  The Kilauea Instance Class                    *
	 *                                                *
	 **************************************************/
	
	Instance: function(parent, opt, id) {
		
		// Group: Poperties
		
		// Property: id
		// The instance ID. Every <Kilauea.Instance> can access itself via Kilauea.instances[this.id]
		this.id = id;
		// Property: isFullWindow
		// *true*, if the presentation instance occupies the whole window. Full-window presentations are treated differently, e.g. with regard to <Kilauea.Instance.updateLocation>: In full-window presentations, the URL in the address bar of the browser is updated. 
		this.isFullWindow = (parent == document.body);
		// Property: embeddedMode
		// *true*, if the presentation is in embedded mode. The principal difference from standalone mode is that presentations are wrapped in a special _div.kilaueaCanvas_ wich has fixed dimensions and the CSS property _overflow: hidden;_. Doing so, multiple slideshow presentations in one single XHMTL document (and in one single broser window) become possible. 
		this.embeddedMode = (opt.forceEmbeddedMode || !this.isFullWindow);
		
		// read in and set up the settings
		this.settings = {
			clickAdvance: this.getSetting(opt, 'clickAdvance', true),
			showNotes: this.getSetting(opt, 'showNotes', false),
			useRealAnchors: this.getSetting(opt, 'useRealAnchors', true),
			adaptiveTitle: this.getSetting(opt, 'adaptiveTitle', true),
			breadcrumbsTitle: this.getSetting(opt, 'breadcrumbsTitle', false),
			useShortTitles: this.getSetting(opt, 'useShortTitles', true),
			stackBackgrounds: this.getSetting(opt, 'stackBackgrounds', false),
			clickAreas: this.getSetting(opt, 'clickAreas', true),
			showToolbar: this.getSetting(opt, 'showToolbar', false),
			coupleFooter: this.getSetting(opt, 'coupleFooter', false)
		};
		
		this.isExternalTransition = !!(opt.externalTransition);
		
		this.titleSeparator = !opt.titleSeparator ? "::" : opt.titleSeparator;
		
		// set the status info
		this.status = {
			initialized: false,
			eos: false,
			currentSlide: 0,
			currentIncremental: 0,
			currentBackground: '#default',
			notes: this.settings.showNotes ? 'visible' : 'hidden',
			click: !!this.settings.clickAdvance,
			view: 'single',
			fullscreen: !this.embeddedMode
		};
		
		// Property: container
		// A pointer to the top-level DOM element that contains all <slides>. 
		if (this.embeddedMode) {
			var cs = Kilauea.getByClass(parent, 'kilaueaCanvas');
			if (cs.length) {
				this.container = cs[0];
			} else {
				// wrap slides into div.kilaueaCanvas
				this.container = document.createElement('div');
				this.container.className ="kilaueaCanvas";
				var r, ptr, c = parent.firstChild;
				while (c) {
					ptr = c;
					c = c.nextSibling;
					r = parent.removeChild(ptr);
					this.container.appendChild(r);
				}
				parent.appendChild(this.container);
			}
		} else {
			this.container = parent;
		}
		
		
		Kilauea.addEvent(this.container, 'mousemove', Kilauea.draggable.drag);
		
		// create the plugins object
		
		// Property: plugins
		// The object that contains the <Kilauea.Instance's> plugin instances. The object keys are the plugin URIs. After <initPlugins> has been invoked, the plugin instances are extended by the class properties and methods described in <extendPlugins'> documentation. 
		// 
		// Note the difference to <Kilauea.plugins>, which contains the plugin classes, not the instances.
		this.plugins = {};
		
		
		
		// set up the event registries
		
		/**
		 * Property: events
		 * 
		 * Kilauea events that are fired on appropriate occasions. External applications or Kilauea plugins can listen to these events by means of <Kilauea.Instance.registerEvent>. 
		 * 
		 * The available event types are
		 * 
		 *   slideChange - fired, if the slide changes. This is not the case if only incremental parts are unveiled or if there is a change from / to allSlideMode. 
		 *   incrementalChange - fired if incremental parts of a slide are unveiled or covered again. 
		 *   eos - fired, if the end of the slides is reached. Note that this may happen several times (in case the presentator moves back and forth to the last slide). 
		 *   ready - fired after complete initialization of the respective <Kilauea.Instance>. Registration of this particular event is different, as <registerEvent> cannot be used before complete initialization of the <Kilauea.Instance>. Instead, the function which is to be executed for this event must be passed as property *onReady* of the parameter object of <Kilauea.init>. 
		 *   singleSlideView - fired if singleSlideMode is reached after allSlideMode
		 *   allSlideView - fired if allSlideMode is reached after singleSlideMode
		 *   redraw - fired after <redraws> of the <Kilauea.Instance>. 
		 */
		this.events = {
			slideChange: [],
			incrementalChange: [],
			eos: [],
			ready: [],
			singleSlideView: [],
			allSlideView: [],
			redraw: []
		};
		if (opt && typeof opt.onReady == 'function') {
			this.registerEvent('ready', opt.onReady);
		}
		
		var elms = this.container.getElementsByTagName('*');
		
		// setup the canvas
		
		// Property: canvas
		// The instance's canvas, which is a <Kilauea.Canvas>.
		this.canvas = new Kilauea.Canvas(parent, this.isFullWindow);
		this.canvas.update();
		
		if (this.embeddedMode) {
			this.redraw();
		}
		
		
		// initialize the slides and backgrounds array
		
		// Property: slides
		// The array which contains all slides.
		this.slides = [];
		// Property: backgrounds
		// The object which contains all backgrounds. The background names are used for object keys.
		// <Kilauea.Instance.backgrounds> always contains at least one entry, which then has the key '#default' and may have a *null* value. 
		this.backgrounds = {};
		
		var i = 0, j = 0, cur = this.container.firstChild;
		
		var partTitleStatus = '';
		// determine the presentation's title (diligent check using 'typeof' in order to enable the specification of empty titles)
		if (opt && typeof opt.title == 'string') {
			// Property: title
			// The presentation's title. Either the title specified in <Kilauea.init's> parameter object, or an inferred title from the cover slide. 
			this.title = opt.title;
			// for the moment being, the top-level partTitle gets always overridden. opt.title only affects the field.title
//			partTitleStatus = 'explicit';
		} else {
			this.title = document.title;
//			partTitleStatus = 'implicit';
		}
		partTitleStatus = 'implicit';
		var curID = 0;
		var partIDs = [curID];
		var partTitles = [this.title];
		var partLinks = ['(1)'];
		/**
		 * Property: parts
		 * An array where part and subpart information for each presentation is stored.
		 * 
		 * The array contains an entry for every part and for every slide. Array indices are used for identifying the entries. In the former case, the entry is an object with properties
		 *   title - A plain text part title. It is either given by an id attribute on the part's DOM element (which usually is a div.part) or it gets inferred from a outline slide (usually a div.slide.outline).
		 *   href - A (pseudo) fragment identifier that can be used for linking to the part, equivalent to <Slide.anchor>.
		 *   children - An array with part IDs of children elements, which can be slides or parts.
		 * In the latter case, the entry has only one property,
		 *   slide - The <Slide.id> of the slide.
		 * <Kilauea.Instance.parts> is especially useful for building hierarchical tables of contents, as done in <Kilauea.Instance.getHierarchicalToc>.
		 */ 
		this.parts = [new Part(partTitles[0], partLinks[i])];
		
		function Part(title, href) {
//			this.isPart = true;
			this.title = title || "";
			this.href = href;
			this.children = [];
		}
		function SlideRef(id) {
//			this.isPart = false;
			this.slide = id;
		}
		
		while(cur) {
			// (neglect empty parts)
			if (Kilauea.hasClass(cur, 'part') && cur.childNodes.length) {
				this.parts[curID].children.push(this.parts.length);
				this.parts.push(new Part(cur.getAttribute('title'), cur.getAttribute('id')));
				partIDs.push(curID = (this.parts.length - 1));
				partTitleStatus = 'implicit';
				cur = cur.firstChild;
			} else {
				if (cur.nodeType == 1) {
					if (Kilauea.hasClass(cur, 'partTitle')) {
						if (cur.title) {
							this.parts[curID].title = cur.title;
						} else {
							this.parts[curID].title = Kilauea.html2text(cur);
						}
						partTitleStatus = 'explicit';
					}
					if (Kilauea.hasClass(cur, 'slide')) {
						this.slides.push(new Kilauea.Slide(cur, j, this.id, partIDs));
						this.parts[curID].children.push(this.parts.length);
						this.parts.push(new SlideRef(j));
						
						if (partTitleStatus == 'implicit' && (Kilauea.hasClass(cur, 'outline') || j == 0)) {
							this.parts[curID].title = this.slides[j].title;
						}
						if (!this.parts[curID].href) {
							this.parts[curID].href = this.slides[j].anchor;
						}
						j++;
					} else if (Kilauea.hasClass(cur, 'background')) {
						this.backgrounds[cur.className.replace(/\s*background\s*\s?/, '') || '#default'] = new Kilauea.Background(cur);
					} else {
						
					}
				}
				if (!cur.nextSibling) {
					for (; !cur.nextSibling && partIDs.length > 1; cur = cur.parentNode) {
						partIDs.pop();
						curID = partIDs[partIDs.length - 1];
					}
				}
				cur = cur.nextSibling;
			}
		}
		
		// we always need a default background
		if (!this.backgrounds['#default']) {
			this.backgrounds['#default'] = new Kilauea.Background(null);
		}
		
		// if there are no slides at all, just quit
		if (!this.slides.length) {
			return null;
		}
		
		// DR: suppress IE's image toolbar pop up
		if (Kilauea.browser.ie) {
			var imgs = parent.getElementsByTagName("img");
			for (i = 0; i < imgs.length; i++) {
				imgs[i].setAttribute("galleryimg", "no");
			}
		}
		
		// L10N
		
		// Property: lang
		// Stores the current language. Initially, this is either the value of the _lang_ or _xml:lang_ attribute that is encountered first when iterating over all *ancestor-or-self* elements of the <Kilauea.Instance.container>, or *NULL*. 
		for (var e = parent; e != document.body.parentNode; e = e.parentNode) {
			if (this.lang = e.getAttribute("lang") || e.getAttribute("xml:lang")) {
				Kilauea.localization.fetch(this.lang);
				break;
			}
		}
		
		// font size
		
		this.fontSize = {
			adjustment: Kilauea.toInteger(this.getMeta('font-size-adjustment', 0), 0),
			css: this.container.style,
			reference: this.container,
			current: "",
			adjust: function() {
				this.set(1 + (this.adjustment * 0.1));
			},
			/**
			 * Method: 
			 * 
			 * Description
			 * 
			 * Parameters:
			 *   
			 * Returns:
			 *   
			 */
/*			set: function(s) {
				this.current = s || this.current;
				this.css.fontSize = Kilauea.fontSizes[this.current];
				// IE-safe toolbar hacks
				// tbd... - is it really necessary still?
			},
*/			
			set: function(factor) {
				factor = (isNaN(parseFloat(factor))) ? 1 : parseFloat(factor);
//				alert(Kilauea.getStyle(this.reference, 'font-size'));
//				var current = Kilauea.getStyle(this.reference, 'font-size') || this.current;
				var current = this.current || Kilauea.getStyle(this.reference, 'font-size') || '100%';
				var parseResult = /(\d+(\.\d*)?)(.+)/.exec(current);
				if (parseResult.length > 1) {
					var newSize = factor * parseFloat(parseResult[1]);
					var unit = parseResult[parseResult.length - 1];
					if (Kilauea.browser.opera && (unit == "pt" || unit == "px")) {
						newSize = Math.round(newSize);
					}
//					alert(newSize + unit);
					this.current = this.css.fontSize = newSize + unit;
				} else {
					this.current = this.css.fontSize = (factor * 100) + "%";
				}
			},
			/**
			 * Method: 
			 * 
			 * Description
			 * 
			 * Parameters:
			 *   
			 * Returns:
			 *   
			 */
			smaller: function() {
				this.set(0.95);
//				this.set(Math.max(0, Math.min(this.current, Kilauea.fontSizes.length) - 1));
			},
			/**
			 * Method: 
			 * 
			 * Description
			 * 
			 * Parameters:
			 *   
			 * Returns:
			 *   
			 */
			larger: function() {
				this.set(1.05);
//				this.set(Math.max(0, Math.min(this.current + 1, Kilauea.fontSizes.length - 1)));
			}
		};
		// apply the default once (perhaps a fontAdjustment has been detected)
		this.fontSize.adjust();
		
		// collect panels, indicators & special fields for future use
		this.fields = {};
		this.menus = {};
		this.indicators = {};
		this.panels = {
			toc: new Kilauea.Panel(this.getToc(), 'hidden', this.embeddedMode, true),
			toolbar: new Kilauea.Panel(this.getToolbar(opt), 'hidden', this.embeddedMode),
			header: new Kilauea.Panel(this.getHeader(opt), 'visible', this.embeddedMode),
			footer: new Kilauea.Panel(this.getFooter(opt), 'visible', this.embeddedMode),
			help: new Kilauea.Panel(this.getHelp(), 'hidden', this.embeddedMode, true)
		};
		if (this.settings.showToolbar) {
			this.panels.toolbar.show();
		}
		
		
		// register default updaters
		this.updaters = {};
		this.registerUpdater('slideCount', this.updateSlideCount, this);
		this.registerUpdater('partInfo', this.updatePartInfo, this);
		this.registerUpdater('docTitle', this.updateDocTitle, this);
		
		// register custom updaters
		if (opt && opt.updaters) {
			for (var u in opt.updaters) {
				this.registerUpdater(u, opt.updaters[u]);
			}
		}
		
		// initialize support for foldable outlines, if desired
		if (typeof opt.foldableOutlines == 'undefined' || opt.foldableOutlines !== 'false') {
			this.foldables.init(this);
		}
		
		// set up DOM event handlers
		
		// if 'parent' is the document's body itself, we assume the presentation to be a full-screen one and we register the click handler on 'document'. otherwise, we assume the presentation to be contained in a div, and we register the handler on 'parent' 
		Kilauea.addEvent(this.embeddedMode ? this.container : document, 'click', new Function("e","Kilauea.instances[" + this.id + "].handleClick(e)"));
		
		var a = parent.getElementsByTagName('a');
		for (i = 0; i < a.length; i++) {
			Kilauea.addEvent(a[i], 'click', new Function("e", "Kilauea.instances[" + this.id + "].handleAnchorClick(e, this)"));
		}
		
		// initialize the click indicator
		if (!this.settings.clickAdvance) {
			this.indicators.click.off();
		} else {
			this.indicators.click.on();
		}
		
		this.anchor = '';
		// respect location.hash as good as it is possible: show the containing slide of the fragment actually addressed by location.hash
		if (location.hash) {
			this.status.currentSlide = this.getSlide(location.hash.substr(1));
		}
		
		// set up the slide history
		this.history = {
			visited: [],
			ptr: 0,
			last: null,
			/**
			 * Method: 
			 * 
			 * Description
			 * 
			 * Parameters:
			 *   
			 * Returns:
			 *   
			 */
			add: function(s) {
				if (this.current() != s) {
					this.last = this.current();
					if (++this.ptr == this.visited.length) {
						// we're in the present
						this.visited.push(s);
					} else {
						// we're in the past
						this.visited.splice(this.ptr, this.visited.length, s);
					}
				}
			},
			/**
			 * Method: 
			 * 
			 * Description
			 * 
			 * Parameters:
			 *   
			 * Returns:
			 *   
			 */
			back: function() { this.last = this.current(); return this.visited[this.ptr = Math.max(0, --this.ptr)]; },
			/**
			 * Method: 
			 * 
			 * Description
			 * 
			 * Parameters:
			 *   
			 * Returns:
			 *   
			 */
			forward: function() { this.last = this.current();return this.visited[this.ptr = Math.min(++this.ptr, this.visited.length - 1)]; },
			/**
			 * Method: 
			 * 
			 * Description
			 * 
			 * Parameters:
			 *   
			 * Returns:
			 *   
			 */
			current: function() { return this.visited[this.ptr]; }
		};
		this.history.visited[0] = this.status.currentSlide;
		
		
		// display the first slide
		this.showSlide();
		
		// update the status info
		this.status.initialized = true;
		
		// trigger onReady
		this.triggerEvent('ready');
	}	
};


Kilauea.Instance.prototype = {
	
	// Group: Auxiliary Methods
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getSetting: function(opt, n, d) {
		return (opt && opt.settings && typeof opt.settings[n] == 'boolean') ? opt.settings[n] : d;
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getIndicator: function(opt, n, el) {
		return (opt && opt.indicators && typeof opt.indicators[n] == 'function') ?  new opt.indicators[n](el) : new Indicator(el);
		// internal default indicator class
		function Indicator(e) {
			this.ref = e;
			this.on = function() { this.ref.style.visibility = 'inherit'; };
			this.off = function() { this.ref.style.visibility = 'hidden'; };
		}
	},
	
	/**
	 * Method: getMeta
	 * 
	 * Reads out a given _html:meta_ field
	 * 
	 * Parameters:
	 *   n - the field's name
	 *   d - a default value
	 *   
	 * Returns:
	 *   the value of the meta element specified, or default
	 */
	getMeta: function(n, d) {
		// n: the @name; d: a default value
		var m = document.getElementsByTagName("meta");
		for (var i = 0; i < m.length; i++) {
			if (m[i].getAttribute("name") == n) {
				return m[i].getAttribute("content");
			}
		}
		return d;
	},
	
	// Group: Slide Manipulation and Retrieval
	
	// public getter
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	current: function() {
		return (this.slides) ? this.slides[this.status.currentSlide] : null;
	},
	
	// slide manipulations
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	hideAllSlides: function() {
		for (var i = 0; i < this.slides.length; i++) {
			this.slides[i].ref.style.position = 'absolute';
			this.slides[i].hide();
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	showAllSlides: function() {
		this.backgrounds[this.status.currentBackground].hide();
		for (var i = 0; i < this.slides.length; i++) {
			this.slides[i].ref.style.position = 'relative';
			this.slides[i].unveilUpto(Infinity);
			this.slides[i].show();
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	toggleView: function() {
		if (this.status.view == 'single') {
			this.panels.header.quickHide();
			this.panels.footer.quickHide();
			this.panels.toolbar.quickHide();
			this.status.view = 'all';
			Kilauea.addClass(this.container, 'allSlideView');
			this.showAllSlides();
			this.triggerEvent('allSlideView');
		} else {
			this.panels.header.restore();
			this.panels.footer.restore();
			this.panels.toolbar.restore();
			this.status.view = 'single';
			Kilauea.removeClass(this.container, 'allSlideView');
			this.hideAllSlides();
			this.showSlide();
			this.triggerEvent('singleSlideView');
			this.redraw();
		}
	},
	
	/**
	 * Method: showSlide
	 * 
	 * Shows a given slide with the correct incrementals and notes unveiled.
	 * 
	 * <Kilauea.Instance.showSlide> should be called with legal slide indices, although it legalizes all parameters by using <Kilauea.Instance.legalSlide> and <Kilauea.Instance.legalIncremental>.
	 * The method fires the following <Kilauea.Instance.events>, if appropriate:
	 * - slideChange
	 * - incrementalChange
	 * - eos
	 *  
	 * Parameters:
	 *   sn - a slide number
	 *   inc - an incremental index
	 */
	showSlide: function(sn, inc) {
		// the whole thing only works in single slide mode
		if (this.status.view == 'single') {
			// be safe at the back end
			var s = this.legalSlide((typeof sn == 'undefined') ? this.status.currentSlide : sn);
			// temporarily store the current slide index
			var last = this.current().id;
			// hide and show the slides we have to show and hide
			if (!this.isExternalTransition) {
				this.current().hide();
				this.slides[s].show();
			}
			// write history
			this.history.add((this.status.currentSlide = s));
			// unveil the incrementals we have to unveil
			var lastInc = this.status.currentIncremental;
			this.current().unveilUpto(this.status.currentIncremental = this.legalIncremental((typeof inc == 'undefined') ? this.status.currentIncremental : inc));
			// set eos
			if (this.status.currentSlide == this.slides.length - 1 && (this.current().incrementals.length == 0 || this.status.currentIncremental == this.current().incrementals.length - 1)) {
				this.status.eos = true;
			} else {
				this.status.eos = false;
			}
			// does it has a note attached to it?
			if (this.current().note) {
				this.indicators.notes.on();
				this.current().note.set((this.status.notes == 'hidden') ? 'hidden' : 'inherit');
			} else {
				this.indicators.notes.off();
			}
			// is it an incremental slide? (with incrementals yet to be unveiled?)
			if (this.current().incrementals.length && this.status.currentIncremental < this.current().incrementals.length - 1) {
				this.indicators.incremental.on();
			} else {
				this.indicators.incremental.off();
			}
			// hide current background
			this.backgrounds[this.status.currentBackground].hide();
			// show matching background
			this.backgrounds[(this.status.currentBackground = this.current().findBackground(this.backgrounds))].show();
			if (this.settings.stackBackgrounds) {
				this.backgrounds['#default'].show();
			}
			if (this.embeddedMode) {
				if (Kilauea.browser.webkit419) {
					window.resizeBy(0,-1);
					window.resizeBy(0,1);
				}
			}
			// check whether we should suppress the header or footer
			if (Kilauea.hasClass(this.current().ref, 'noFooter')) {
				this.panels.footer.hide();
			} else {
				this.panels.footer.show();
			}
			if (Kilauea.hasClass(this.current().ref, 'noHeader')) {
				this.panels.header.hide();
			} else {
				this.panels.header.show();
			}
			// update slide count
			this.updaters.slideCount.fire('slideCount', this);
			// update part info
			this.updaters.partInfo.fire('partInfo', this);
			// why is it necessary?
			if (this.history.visited.length == 1) {
				this.scrollTop();
			}
			// is it a real slide change or merely an update?
			if (this.status.currentSlide != last) {
				// hide the table of contents
				this.panels.toc.hide();
				// update location
				this.updateLocation();
				this.anchor = '';
				this.scrollTop();
				this.triggerEvent('slideChange');
				if (this.status.eos) {
					this.triggerEvent('eos');
				}
			} else if (this.status.currentIncremental != lastInc) {
				this.triggerEvent('incrementalChange');
			}
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	nextSlide: function() {
		// be messy: showSlide takes care
		this.showSlide(this.status.currentSlide + parseInt(1), 0);
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	previousSlide: function() {
		// be messy: showSlide takes care
		this.showSlide(this.status.currentSlide - 1, Infinity);
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	nextIncremental: function() {
		// be messy: showSlide takes care
		this.showSlide(this.status.currentSlide, this.status.currentIncremental + parseInt(1));
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	previousIncremental: function() {
		// be messy: showSlide takes care
		this.showSlide(this.status.currentSlide, this.status.currentIncremental - 1);
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	next: function() {
		if (this.status.currentIncremental < this.current().incrementals.length - 1) {
			this.nextIncremental();
		} else {
			this.nextSlide();
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	previous: function() {
		if (this.status.currentIncremental > 0) {
			this.previousIncremental();
		} else {
			this.previousSlide();
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	legalSlide: function(s) {
		return Math.max(0, Math.min(s, this.slides.length - 1));
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	legalIncremental: function(s) {
		return Math.max(0, Math.min(s, this.current().incrementals.length - 1));
	},
	
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	updateLocation: function() {
		// unlike DR, we update the location even for the first slide, because otherwise, the page gets reloaded each time the user navigates to the first slide
		var uri = Kilauea.pageAddress() + '#' + ((this.anchor) ? this.anchor : ((this.settings.useRealAnchors) ? this.current().anchor : '(' + parseInt(this.status.currentSlide + 1) + ')'));
		
		if (this.isFullWindow) {
			// the following test isn't necessary anymore, because we are using 'location.href' now (well, maybe yes. it seems to make safari slightly nervous. the little wheel keeps spinning, indicating a pending page load. but at least, the page doesn't reload.):
			// if (uri != location.href && !Kilauea.browser.webkit) {
//			if (!Kilauea.browser.webkit) {
			if (Kilauea.browser.opera && parseInt(opera.version()) < 9) {
				// what can we do for old operas without breaking functionality? DR can do it, so we should be able to do it, too
//				loacation.href = uri;
			} else {
				location.replace(uri);
			}
//			}
			this.updaters.docTitle.fire('docTitle', this);
		} 
	},
	
	// Group: Updater Methods
	
	registerUpdater: function(field, fn, thisObj) {
		if (typeof fn == 'function') {
			this.updaters[field] = new Kilauea.Event(fn, thisObj);
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	updateSlideCount: function(t, inst) {
		inst.fields.slideCount.innerHTML = "slide".localize(inst.lang) + " " + parseInt(inst.status.currentSlide + 1) + "/" + inst.slides.length;
	},
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	updatePartInfo: function(t, inst) {
		var uls = inst.fields.partInfo.getElementsByTagName('ul');
		if (uls.length) {
			inst.fields.partInfo.removeChild(uls[0]);
			uls[0] = null;
		}
		var a, ul = document.createElement('ul');
		for (var i = 0; i < inst.current().partInfo.length; i++) {
			ul.appendChild(document.createElement('li'));
			ul.lastChild.appendChild(inst.getLink(inst.parts[inst.current().partInfo[i]].title, '', Kilauea.pageAddress() + '#' + inst.parts[inst.current().partInfo[i]].href));
		}
		inst.fields.partInfo.appendChild(ul);
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	updateDocTitle: function(t, inst) {
		if (inst.settings.adaptiveTitle) {
			if (inst.settings.breadcrumbsTitle) {
				var breadcrumbs = [];
				for (var i = 0; i < inst.current().partInfo.length; i++) {
					breadcrumbs.push(inst.parts[inst.current().partInfo[i]].title);
				}
				document.title = breadcrumbs.join(this.titleSeparator) + ' (' + parseInt(inst.status.currentSlide + 1) + ')';
			} else {
				var dec = [];
				for (var i = 0; i < inst.current().partInfo.length - 1; i++) {
					for (var j = 0, num = 1; inst.parts[inst.current().partInfo[i]].children[j] != inst.current().partInfo[i + 1]; j++) {
						if (inst.parts[inst.parts[inst.current().partInfo[i]].children[j]].children) {
							num++;
						}
					}
					dec.push(num);
				}
				document.title = (dec.length ? dec.join('.') + ': ': '' ) + inst.current().title + ' (' + parseInt(inst.status.currentSlide + 1) + ')';;
			}
		} else {
			document.title = inst.title + ' (' + parseInt(inst.status.currentSlide + 1) + ')';
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	scrollTop: function() {
		if (this.embeddedMode) {
			this.current().ref.scrollTop = 0;
			this.backgrounds[this.status.currentBackground].resetScroll(0,0);
		} else {
			window.scrollTo(0, 0);
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getSlide: function (id) {
		var el = document.getElementById(id);
		if (el) {
			var slide = null;
			// check whether it is a part
			if (Kilauea.hasClass(el, 'part')) {
				var ss = Kilauea.getByClass(el, 'slide');
				if (ss.length) {
					slide = ss[0];
				}
			} else {
				// see if we can find the enclosing slide
				for (; el && el != this.container; el = el.parentNode) {
					if (Kilauea.hasClass(el, 'slide')) {
						slide = el;
						break;
					}
				}
			}
			if (slide) {
				// get the slide number for the slide we've found
				for (var i = 0; i < this.slides.length; i++) {
					if (this.slides[i].ref == slide) {
						this.anchor = id;
						return i;
					}
				}
			}
		}
		// check whether it is a slide link like '(13)' or '[13]' (for compatibility, although the former writing is recommended)
		if (/[\[\(](\d+)[\]\)]/.test(id)) {
			this.anchor = '';
			return this.legalSlide(RegExp.$1 - 1);
		}
		// if we haven't found the slide: don't change the slide
		return this.status.currentSlide;
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	isContained: function(e) {
		// checks whether a given element e is contained within this.container
		for (; e != document.body.parentNode; e = e.parentNode) {
			if (e == this.container) {
				return true;
			}
		}
		return false;
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	toggleNotes: function() {
		return (this.status.notes = (this.status.notes == 'hidden') ? 'visible' : 'hidden');
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	toggleToc: function() {
		this.panels.toc.toggle();
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	toggleToolbar: function() {
		if (this.status.view == 'single') {
			this.panels.toolbar.toggle();
			if (this.settings.coupleFooter) {
				this.panels.footer.set(this.panels.toolbar.status);
//					this.panels.partInfo.toggle();
			}
		}
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	toggleClick: function() {
		if (!this.status.click) {
			this.indicators.click.on();
		} else {
			this.indicators.click.off();
		}
		return (this.status.click = !this.status.click);
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	toggleFullscreen: function() {
		if (this.embeddedMode) {
			if (!this.status.fullscreen) {
				Kilauea.addClass(this.container, 'fullscreen');
				Kilauea.addClass(document.body, 'fullscreen');
				window.scrollTo(0, 0);
				this.status.fullscreen = true;
				this.fontSize.set(Kilauea.windowDimensions().width / this.canvas.width / 1.3);
			} else {
				var body = document.getElementsByTagName('body')[0];
				Kilauea.removeClass(this.container, 'fullscreen');
				Kilauea.removeClass(body, 'fullscreen');
				body.style.width = 'auto';
				body.style.height = 'auto';
				this.status.fullscreen = false;
				this.fontSize.set(this.canvas.width / Kilauea.windowDimensions().width * 1.3);
			}
			this.redraw();
		}
	},
	
	// Group: Plugin Methods
	
	/**
	 * Method: initPlugins
	 * 
	 * Instantiates all those <Kilauea.plugins> that the current <Kilauea.Instance> requires. The plugin instances are stored into the <plugins> object. Note that this method also calls <extendPlugins>, and thus creates extended plugin instances.  
	 * 
	 * Parameters:
	 *   plugins - A list of plugins that are to be instantiated
	 */
	initPlugins: function(plugins) {
		var i, id, idObj, plObj = null;
		// iterate over the plugins and initialize all
		for (id in plugins) {
			// resolve the plugin id (which may be a short ID)
			idObj = Kilauea.resolvePluginID(id);
			// get the plugin class by comparing plugin URLs
			for (i in Kilauea.pluginLocations) {
				if (Kilauea.pluginLocations[i] == idObj.url) {
					plObj = Kilauea.plugins[i];
					break;
				}
			}
			if (plObj && Kilauea.pluginStatus[i] == 'ok') {
				this.plugins[i] = new plObj(this, plugins[id]);
			} else {
				alert('Cannot load plugin "' + i + '" for instance ' + this.id + '!');
			}
		}
		this.extendPlugins();
	},
	
	/**
	 * Method: extendPlugins
	 * 
	 * Extends <Kilauea.Instance.plugins> with a few utility properties and methods. These are
	 *  
	 *   id - A property that contains the plugin ID, which is either an ID token or a plugin URI
	 *   uri - A property that contains the plugin's URI
	 *   getInstance - A method that returns the <Kilauea.Instance> for which the plugin has been instantiated. 
	 *   thisString - A property that contains a string which validly references the current plugin instance in the global JS namespace, i.e. for instance _Kilauea.instances[0].plugins['http://my.namespace/myplugin']"_  
	 * 
	 */
	extendPlugins: function() {
		for (var i in this.plugins) {
			// the instance ID
			if (typeof this.plugins[i].id == 'undefined') {
				this.plugins[i].id = this.id;
			}
			// the plugin's own URI (for introspection)
			if (typeof this.plugins[i].uri == 'undefined') {
				this.plugins[i].uri = i;
			}
			// an auxiliary method returning the Kilauea instance for which the plugins ahs been instantiated
			if (typeof this.plugins[i].getInstance == 'undefined') {
				this.plugins[i].getInstance = function() { return Kilauea.instances[this.id]; };
			}
			// an auxiliary method returning a string which denotes the plugin globally
			if (typeof this.plugins[i].thisString == 'undefined') {
				this.plugins[i].thisString = "Kilauea.instances[" + this.id + "].plugins['" + i + "']";
			}
		}
	},
	
	// Group: DOM Event Handler
	
	/**
	 * Method: handleClick
	 * 
	 * Event-handling callback method that decides whether a click is meant to propagate the slides or not.
	 * 
	 * Parameters:
	 *   e - the current event
	 * 
	 * Returns:
	 *   *true* (although this might change some day in case we want to stop or cancel the event's propagation)
	 */
	handleClick: function(e) {
		
		// cross browser stuff
		var ev = (e) ? e : window.event;
		var target = ev.target || ev.srcElement;
		
		// DR: work around Safari bug
		if (Kilauea.browser.webkit && target.nodeType == 3) {
			target = target.parentNode;
		}
		
		// if cannot determine the mousebutton, we assume it's been a leftclick
		var leftclick = (typeof ev.which != 'undefined') ? ((ev.which == 1) ? true : false ) : (typeof ev.button != 'undefined') ? ((ev.button == 1) ? true : false) : true;
		
		// check for possible selection ranges
		if (Kilauea.selection.current.length) {
			Kilauea.pushSelection('');
			return true;
		} else if (Kilauea.selection.last.length) {
			Kilauea.selection.last = '';
			return true;
		}
		
		// handle the click
		if (this.status.click && leftclick) {
			switch (target.nodeName) {
				case "EMBED":
				case "OBJECT":
				case "INPUT":
				case "TEXTAREA":
				case "SELECT":
				case "OPTION":
					Kilauea.pushSelection(' ');
					break;
				default:
					// test whether the target element has an ancestor::html:a
					for (; !Kilauea.hasClass(target, 'slide'); target = target.parentNode) {
						if (target.nodeType == 1 && target.nodeName == 'A') {
							// cancel? stop propagation?
							return true;
						}
					}
					// if not, the click intends to propagate the slide
					if (this.settings.clickAreas) {
						if (ev.clientX < this.canvas.width / 2) {
							this.previous();
						} else {
							this.next();
						}
					} else {
						if (ev.altKey) {
							this.previous();
						} else {
							this.next();
						}
					}
			}
		}
		// cancel? stop propagation?
		return true;
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	handleAnchorClick: function(e, a) {
		// cross browser stuff
		var ev = (e) ? e : window.event;
		// give up focus
		a.blur();
		if (Kilauea.compareAddress(a, window.location)) {
			// stop propagation: use e, not ev (is it really necessary?)
			Kilauea.stopPropagation(e);
			// show the respective slide
			this.showSlide(this.getSlide(a.hash.substr(1)));
			// cancel the event and prevent the default behaviour
			return Kilauea.cancelEvent(ev);
		} else {
			return true;
		}
	},
	
	// Group: Custom Kilauea Event Methods
	
	/**
	 * Method: registerEvent
	 * 
	 * Registers a <Kilauea.Event>. See <events> and <Kilauea.Event> for a more detailed description of <Kilauea.Events>. 
	 * 
	 * Parameters:
	 *   t - The event type. See <events> for a list of event types. 
	 *   fn - A callback function. See <Kilauea.Event> for a description of the parameters of <Kilauea.Events>. 
	 *   thisObj - The object that shall be used as *THIS* pointer when firing the event. 
	 */
	registerEvent: function(t, fn, thisObj) {
		if (typeof this.events[t] == 'object') {
			this.events[t].push((new Kilauea.Event(fn, thisObj)));
		}
	},
	
	/**
	 * Method: unregisterEvent
	 * 
	 * Unregisters a <Kilauea.Event>. 
	 * 
	 * Parameters:
	 *   t - The event type.
	 *   fn - The callback function. 
	 */
	unregisterEvent: function(t, fn) {
		if (typeof this.events[t] == 'object') {
			for (var i = 0; i < this.events[t].length; i++) {
				if (this.events[t][i] && this.events[t][i].fn == fn) {
					// clean up the object
					delete this.events[t][i];
					// remove the array element
					this.events[t].splice(i, 1);
				}
			}
		}
	},
	
	/**
	 * Method: triggerEvent
	 * 
	 * Triggers a given event. All <Kilauea.Events> that have been registered for this event will be <Kilauea.Event.fire> d. 
	 * 
	 * Parameters:
	 *   t - The event type. See <events> for a list of event types. 
	 */
	triggerEvent: function(t) {
		if (typeof this.events[t] == 'object') {
			for (var i = 0; i < this.events[t].length; i++) {
				this.events[t][i].fire(t, this);
			}
		}
	},
	
	// Group: Help Panel
	
	/**
	 * Method: help
	 * 
	 * Updates and opens the help panel
	 */
	help: function() {
		if (this.panels.help.status == 'hidden') {
			this.updateHelp();
		}
		this.panels.help.toggle();
	},
	
	// setup panels
	
	/**
	 * Method: getHelp
	 * 
	 * Builds the help panel. If a help panel (i.e., a DOM element with classname _kilaueaHelp_) is present already, this element is taken as the help panel, rather than creating a new element. 
	 * 
	 * Parameters:
	 *   none
	 * 
	 * Returns:
	 *   The help panel, which is a DOM element. 
	 */
	getHelp: function() {
		var h, hs = Kilauea.getByClass(this.container, 'kilaueaHelp');
		
		if (hs.length) {
			h = hs[0];
		} else {
			h = document.createElement('div');
			h.className = "kilaueaHelp panel";
			h.appendChild(document.createElement('h3'));
			h.lastChild.className = "handle";
			h.lastChild.appendChild(document.createTextNode('Help'.localize()));
			Kilauea.localization.parts.add(this.id, h.lastChild, this.lang);
			// the empty dlist; to be filled by updateHelp
			h.appendChild(document.createElement('dl'));
			// the menu list
			var ul = document.createElement('ul');
			// the link for remote help
			ul.appendChild(document.createElement('li'));
			var remote = document.createElement('a');
//			var url = "javascript:alert('There%20is%20no%20help!%20You%20are%20lost!%20Press%20enter,%20and%20pray!')";
			var url = "http://sharpeleven.net/kilauea/help?";
			url += "v=" + Kilauea.version.major + "." + Kilauea.version.minor;
			url += "&p=";
			for (var i in Kilauea.plugins) {
				url += escape(i) + ';;';
			}
			url += "&l=" + this.lang;
//			// open the help page
//			location.href = url;
//			// or maybe in a popup?
//			window.open(url, 'Help', 'resizable=yes,scrollbars=yes');
			url = "javascript:alert('" + url + "')";
			remote.setAttribute('href', url);
			remote.appendChild(document.createTextNode('Online Help'.localize()));
			Kilauea.localization.parts.add(this.id, remote, this.lang);
			ul.lastChild.appendChild(remote);
			// the link for closing the help box
			ul.appendChild(document.createElement('li'));
			var close = document.createElement('a');
			close.setAttribute('href', 'javascript:Kilauea.instances[' + this.id + '].panels.help.hide()');
			close.appendChild(document.createTextNode('Close Help Box'.localize()));
			Kilauea.localization.parts.add(this.id, close, this.lang);
			ul.lastChild.appendChild(close);
			// append the menu list
			h.appendChild(ul);
			// append a text node. this lets IE render the margin of the menu list correctly
			h.appendChild(document.createTextNode(' ' ));
			// append the div
			this.container.appendChild(h);
		}
		return h;
	},
	
	/**
	 * Method: updateHelp
	 * 
	 * Updates the help panel. Updates are necessary because the <Kilauea.keyInfo> may change at runtime, and because the <Kilauea.Instance.lang> may change as well. 
	 */
	updateHelp: function() {
		var oldDLs = this.panels.help.ref.getElementsByTagName('dl');
		var dl = document.createElement('dl');
		for (var i in Kilauea.keyInfo) {
			// both key and help text are localized, because keys might be language-dependent (en: '<' = de: ';') or might have names ('Pg down')
			dl.appendChild(document.createElement('dt'));
			dl.lastChild.appendChild(document.createTextNode(Kilauea.keyInfo[i].key.localize(this.lang)));
			Kilauea.localization.parts.add(this.id, dl.lastChild, this.lang);
			dl.appendChild(document.createElement('dd'));
			dl.lastChild.appendChild(document.createTextNode(Kilauea.keyInfo[i].help.localize(this.lang)));
		}
		// remove existing dlist
		if (oldDLs) {
			this.panels.help.ref.replaceChild(dl, oldDLs[0]);
		} else {
			this.panels.help.ref.appendChild(dl);
		}
	},
	
	// Group: TOC Panel
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getToc: function() {
		var t, ts = Kilauea.getByClass(this.container, 'kilaueaToc');
		if (!ts.length) {
			// build the toc
			t = document.createElement('div');
			t.className = 'kilaueaToc panel';
			// build the title
			t.appendChild(document.createElement('h3'));
			t.lastChild.className = "handle";
			t.lastChild.appendChild(document.createTextNode("Table of Contents".localize(this.lang)));
			// build the ulist
			t.appendChild(this.getHierarchicalToc(0, [1]));
			this.container.appendChild(t);
		} else {
			t = ts[0];
		}
		var h = t.getElementsByTagName('h3');
		Kilauea.localization.parts.add(this.id, h[0], this.lang);
		return t;
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getHierarchicalToc: function(part, dec) {
		var i, a, ul = document.createElement('ul');
		for (i = 0; i < this.parts[part].children.length; i++) {
			ul.appendChild(document.createElement('li'));
			// do we want to insert decimal classification for all slides? if we do so, the numbering of parts and subpart becomes inconsistent wrt outline slides
//			ul.lastChild.appendChild(document.createTextNode(dec.join('.') + ': '));
			if (typeof this.parts[this.parts[part].children[i]].slide != 'undefined') {
				// it's a slide
				a = document.createElement('a');
				// IE wants full URLs, not just fragment identifiers. otherwise, Kilauea.pageAddress(a) returns ''. however, this is not a problem with relative URLs in the HTML.
				a.setAttribute('href', Kilauea.pageAddress() + '#' + this.slides[this.parts[this.parts[part].children[i]].slide].anchor);
				a.appendChild(document.createTextNode(this.slides[this.parts[this.parts[part].children[i]].slide].title));
				ul.lastChild.appendChild(a);
			} else {
				// it's a part or subpart
				ul.lastChild.className = 'partHeading';
				// append decimal classification only for parts (see comment above)
				ul.lastChild.appendChild(document.createTextNode(dec.join('.') + ': '));
				ul.lastChild.appendChild(document.createTextNode(this.parts[this.parts[part].children[i]].title));
				dec.push(1);
				ul.lastChild.appendChild(this.getHierarchicalToc(this.parts[part].children[i], dec));
				dec[dec.length - 1]++;
			}
		}
		dec.pop();
		return ul;
	},
	
	// HEADER, FOOTER
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getHeader: function(opt) {
		// build the components of the header
		this.fields.partInfo = Kilauea.getField(this.container, 'kilaueaPartInfo');
		return Kilauea.getField(this.container, 'kilaueaHeader', this.fields.partInfo);
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getFooter: function(opt) {
		// build the components of the footer
		// slide count
		this.fields.slideCount = Kilauea.getField(this.container, 'kilaueaSlideCount');
		// copyright and license
		var license = null;
		var l = document.getElementsByTagName("link");
		for (var i = 0; i < l.length; i++) {
			if (l[i].getAttribute("rel") == 'DCTERMS.license') {
				license = document.createElement('a');
				license.setAttribute('rel', 'license');
				license.setAttribute('href', l[i].getAttribute("href"));
				license.setAttribute('title', l[i].getAttribute("title"));
//				license.appendChild(document.createTextNode(this.getMeta('copyright', l[i].getAttribute("title"))));
				break;
			}
		}
//		this.fields.copyright = Kilauea.getField(this.container, 'kilaueaCopyright', license ? license : this.getMeta('copyright'));
		// presentation title
		this.fields.title = Kilauea.getField(this.container, 'kilaueaTitle', this.title);
		
		return Kilauea.getField(this.container, 'kilaueaFooter', this.fields.slideCount, this.fields.copyright, this.fields.title);
	},
	
	
	// Group: Toolbar Methods
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	getToolbar: function(opt) {
		
		// build and fill the toolbar menu
		var ul, uls = Kilauea.getByClass(this.container, 'kilaueaToolbarMenu');
		if (uls.length) {
			ul = uls[0];
		} else {
			ul = document.createElement('ul');
			ul.className = 'kilaueaToolbarMenu';
		}
		// fill the toolbar menu
		this.fields.toolbarMenu = ul;
		this.fillToolbarMenu(opt);
		
		var toolbar = Kilauea.getField(this.container, 'kilaueaToolbar');
		
		// click indicator
		this.indicators.click = this.getIndicator(opt, 'click', Kilauea.getField(toolbar, 'kilaueaClickIndicator', 'C'));
		// incremental indicator
		this.indicators.incremental = this.getIndicator(opt, 'incremental', Kilauea.getField(toolbar, 'kilaueaIncrementalIndicator', 'I'));
		// notes indicator
		this.indicators.notes = this.getIndicator(opt, 'notes', Kilauea.getField(toolbar, 'kilaueaNotesIndicator', 'N'));
		
		toolbar.appendChild(this.fields.toolbarMenu);
		
		return toolbar;
	},
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	fillToolbarMenu: function(opt) {
		// todo: perhaps we don't want to overwrite existing entries
		// if (ul.childNodes.length) ...
		
		this.menus.toolbar = new Kilauea.Menu(this.fields.toolbarMenu);
		
		this.menus.toolbar.addSubmenu('kilaueaHelp', this.getLink('Help', "Open the menu 'Help'", function(){}));
		
		var custom = (opt && typeof opt.menu != 'undefined') ? opt.menu : null;
		// help
		if (!custom || custom.help) {
			this.menus.toolbar.submenus.kilaueaHelp.addEntry(this.getLink("help?", "Navigate with mouse click, space bar, Cursor Left/Right, or Pg Up and Pg Dn. Use S and B to change font size.", this.help, this));
		}
		// toggle toc
		if (!custom || custom.toc) {
			this.menus.toolbar.submenus.kilaueaHelp.addEntry(this.getLink("contents?", "toggle table of contents", this.toggleToc, this));
		}
		// restart
		if (!custom || custom.restart) {
			this.menus.toolbar.submenus.kilaueaHelp.addEntry(this.getLink("restart?", "restart presentation", Kilauea.restart, Kilauea));
		}
		// fullscreen
		if (this.embeddedMode && (!custom || custom.fullscreen)) {
			this.menus.toolbar.submenus.kilaueaHelp.addEntry(this.getLink("fullscreen?", "toggle fullscreen mode", this.toggleFullscreen, this));
		}
	},
	
	/**
	 *  Method: getLink
	 * 
	 *  Creates a hyperlink.
	 * 
	 *  Parameters:
	 *    chld - either a string (the link text) or a DOM node (to be inserted as the link's child node)
	 *    title - a title string
	 *    href- getLink accepts either a URL as string or a pointer to a function. in the latter case, the following optional parameters are possible:
	 *    thisObj - a pointer to an object which should be used as <i>this</i>, when the function is evaluated
	 *    params - an array of arguments to be passed to the function
	 * 
	 *  The method localizes all strings and adds them as parts to <Kilauea.localization>.
	 * 
	 *  Returns:
	 *    A hyperlink DOM element
	 */
	getLink: function(chld, title, href, thisObj, params) {
		var a = document.createElement('a');
		if (title) {
			a.setAttribute('title', title);
			Kilauea.localization.parts.add(this.id, a.getAttributeNode("title"), this.lang);
		}
		if (typeof href == 'function') {
			a.setAttribute('href', 'javascript:;');
			if (typeof thisObj == 'object') {
				params = params || [];
				a.onclick = function(e){ href.apply(thisObj, params); this.blur(); return false; };
			} else {
				a.onclick = href;
			}
		} else {
			a.setAttribute('href', href);
			Kilauea.addEvent(a, 'click', new Function("e", "Kilauea.instances[" + this.id + "].handleAnchorClick(e, this)"));
		}
		if (typeof chld == 'string') {
			a.appendChild(document.createTextNode(chld.localize(this.lang)));
			Kilauea.localization.parts.add(this.id, a, this.lang);
		} else if (typeof chld == 'object') {
			a.appendChild(chld);
		}
		return a;
	},
	
	// Group: Outliner
	
	// foldable outlines a la DR
	
	/**
	 * Object: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	foldables: {
		
		blockElements: ['ul', 'ol', 'li', 'p', 'table', 'pre', 'address', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		
		/**
		 * Method: 
		 * 
		 * Description
		 * 
		 * Parameters:
		 *   
		 * Returns:
		 *   
		 */
		init: function(inst) {
			var i, lis = inst.container.getElementsByTagName('li');
			
			for (i = 0; i < lis.length; i++) {
				if (Kilauea.hasClass(lis[i].parentNode, 'foldable') || Kilauea.hasClass(lis[i].parentNode, 'outline')) {
					if (this.isFoldable(lis[i])) {
						Kilauea.addEvent(lis[i], 'click', new Function("e", "Kilauea.instances[" + inst.id + "].foldables.handleClick(e, this);"));
						// test for the attribute node, not for the value, as the value could be zero
						if (!lis[i].getAttributeNode('tabindex')) {
							lis[i].setAttribute('tabindex', "0");
						}
						if (Kilauea.hasClass(lis[i], 'expand')) {
							this.unfold(lis[i]);
						} else {
							this.fold(lis[i]);
						}
					} else {
						Kilauea.addClass(lis[i], "nofold");
					}
				}
			}
		},
		
		/**
		 * Method: 
		 * 
		 * Description
		 * 
		 * Parameters:
		 *   
		 * Returns:
		 *   
		 */
		isFoldable: function(el) {
			for (el = el.firstChild; el; el = el.nextSibling) {
				if (this.isBlock(el)) {
					return true;
				}
			}
			return false;
		},
		
		/**
		 * Method: 
		 * 
		 * Description
		 * 
		 * Parameters:
		 *   
		 * Returns:
		 *   
		 */
		isBlock: function(el) {
			return (el.nodeType == 1 && this.blockElements.indexOf(el.nodeName.toLowerCase()) != -1);
		},
		
		/**
		 * Method: 
		 * 
		 * Description
		 * 
		 * Parameters:
		 *   
		 * Returns:
		 *   
		 */
		handleClick: function(e, target) {
			// cross-browser stuff
			var ev = e? e : window.event;
			// is it a right click?
			if ((ev.which && ev.which == 3) || (ev.button && ev.button == 2)) {
				return true;
			} else {
				while (target && !Kilauea.hasClass(target, 'nofold') && !Kilauea.hasClass(target, 'folded') && !Kilauea.hasClass(target, 'unfolded')) {
					target = target.parentNode;
				}
				if (Kilauea.hasClass(target, 'folded')) {
					this.unfold(target);
					Kilauea.stopPropagation(ev);
				} else if (Kilauea.hasClass(target, 'unfolded')) {
					this.fold(target);
					Kilauea.stopPropagation(ev);
				}
				return true;
			}
		},
		
		/**
		 * Method: 
		 * 
		 * Description
		 * 
		 * Parameters:
		 *   
		 * Returns:
		 *   
		 */
		setDisplay: function(el, disp) {
			for (el = el.firstChild; el; el = el.nextSibling) {
				if (this.isBlock(el)) {
					el.style.display = disp;
				}
			}
		},
		
		/**
		 * Method: 
		 * 
		 * Description
		 * 
		 * Parameters:
		 *   
		 * Returns:
		 *   
		 */
		unfold: function(el) {
			if (el) {
				Kilauea.removeClass(el, "folded");
				Kilauea.addClass(el, "unfolded");
				this.setDisplay(el, 'block');
			}
		},
		
		/**
		 * Method: 
		 * 
		 * Description
		 * 
		 * Parameters:
		 *   
		 * Returns:
		 *   
		 */
		fold: function(el) {
			if (el) {
				Kilauea.removeClass(el, "unfolded");
				Kilauea.addClass(el, "folded");
				this.setDisplay(el, 'none');
			}
		}
	},
	
	// Group: Miscellaneous Methods
	
	// redraw for embedded presentation canvas
	
	/**
	 * Method: redraw
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	redraw: function() {
		// this is rather a hack. and garbage collection might go wrong (because of the closure).
		if (this.current()) {
			this.current().hide();
			this.panels.toolbar.quickHide();
			this.panels.footer.quickHide();
			this.panels.header.quickHide();
			var t = this;
			setTimeout(function(e) {
				t.current().show();
				t.panels.toolbar.restore();
				t.panels.footer.restore();
				t.panels.header.restore();
				t.panels.header.show();
			}, 40);
		}
		// canvas is only used in embedded mode
		if (this.embeddedMode) {
			if (this.status.fullscreen) {
				var w = Kilauea.windowDimensions();
				var body = document.getElementsByTagName('body')[0];
				body.style.width = w.width + 'px';
				body.style.height = w.height + 'px';
				this.container.style.top = "0px";
				this.container.style.left = "0px";
				this.container.style.width = w.width + "px";
				this.container.style.height = w.height + "px";
			} else {
				this.canvas.update();
				this.container.style.left = this.canvas.left + "px";
				this.container.style.top = this.canvas.top + "px";
				this.container.style.width = this.canvas.width + "px";
				this.container.style.height = this.canvas.height + "px";
			}
		}
		this.triggerEvent('redraw');
	},
	
	// cross browser utilities
	
	/**
	 * Method: 
	 * 
	 * Description
	 * 
	 * Parameters:
	 *   
	 * Returns:
	 *   
	 */
	scrollPosition: function() {
		// returns an object {x: <int>, y: <int>}
		if (this.embeddedMode) {
			return {x: this.container.scrollLeft, y: this.container.scrollTop};
		} else {
			if (typeof window.pageYOffset != 'undefined') {
				return {x: window.pageXOffset, y: window.pageYOffset};
			} else {
				if (i.document.documentElement) {
					return {x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop};
				} else {
					return {x: document.body.scrollLeft, y: document.body.scrollTop};
				}
			}
		}
	}
	
/*
,	
	// L10N
	
	localize: function(s) {
		
		var lang = this.lang || Kilauea.lang
		
		if (s == '' || typeof Kilauea.localization == 'undefined') {
			return s;
		}
		if (Kilauea.localization.langs[lang] && typeof Kilauea.localization.langs[lang][this] != 'undefined') {
			return Kilauea.localization.langs[lang][s];
		} else {
			lang = lang.substring(0, lang.indexOf('-'));
			if (Kilauea.localization.langs[lang] && typeof Kilauea.localization.langs[lang][this] != 'undefined') {
				return Kilauea.localization.langs[lang][s];
			} else {
				return s;
			}
		}
	}
	
*/
};

// L10N

if (typeof String.prototype.localize == 'undefined') {

	// DR:
	// add localize method to all strings for use
	// as in help.innerHTML = "help".localize();
	String.prototype.localize = function(l) {
		
		var lang = l || Kilauea.lang;
		
		if (this == '' || typeof Kilauea.localization == 'undefined') {
			return this.toString();
		}
		if (Kilauea.localization.langs[lang] && typeof Kilauea.localization.langs[lang][this] != 'undefined') {
			return Kilauea.localization.langs[lang][this];
		} else {
			lang = lang.substring(0, lang.indexOf('-'));
			if (Kilauea.localization.langs[lang] && typeof Kilauea.localization.langs[lang][this] != 'undefined') {
				return Kilauea.localization.langs[lang][this];
			} else {
				return this.toString();
			}
		}
	};
}


} // double define safe



// compatibility code

// from http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fun /*, thisp*/) {
		var len = this.length;
		if (typeof fun != "function") {
			throw new TypeError();
		}
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				fun.call(thisp, this[i], i, this);
			}
		}
	};
}

// from http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:indexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/) {
		var len = this.length;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len;
		}
		for (; from < len; from++) {
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}
