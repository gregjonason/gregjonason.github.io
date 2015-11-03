/**
Collections framework for EdITLib.
jordan@aace.org

@depends https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js
@depends https://cdnjs.cloudflare.com/ajax/libs/store.js/1.3.14/store.min.js
@depends /static/login.js

*/
window.COLLECTIONS = (function ($) {
	var collections = {},
		delaySaveInterval = 2 * 1000,
		saveInterval = 30 * 1000,
		loadInterval = 60 * 1000,
		papers = {},
		login = null,
		changed = false,
		remoteLoaded = false,
		remoteConnections = 0,
		remoteLoadWatcher = null,
		remoteSaveWatcher = null,
		delaySaveWatcher = null,
		items_to_save = [],
		processing = false,
		saving = false,
		settings = {
			defaultCollectionCode: '_DEFAULT',
			defaultCollectionName: 'General',
			maxAnonAdd: 0
		},
		$collectionButton;

	function propertyCount(obj) {
		var pc = 0, pp;
		for (pp in obj) {
			if (obj.hasOwnProperty(pp)) {
				pc += 1;
			}
		}
		return pc;
	}

	function shorten(input, maxlen) {
		//console.log("Calling function shorten; this is ", this, " arguments are ", arguments, " and broken up input is ", input, maxlen);
		maxlen = maxlen ? maxlen : 50;
		if (input.length > maxlen && input.indexOf(':') !== -1) {
			input = input.split(':')[0];
		}
		if (input.length > maxlen) {
			input = input.substring(0, (maxlen-1));
			input = input.replace(/\W+$/, '');
			input += '\u2026';
		}
		return input;
	}
	
	function arrayToCommaList(input, oxford, propName, formatOptions) {
		//console("Calling function arrayToCommaList; this is ", this, " arguments are ", arguments, " and broken up input is ", input, oxford, propName, formatOptions);
		var output = "", ii, 
			il = input.length, 
			formatting = {
				delimiter: ",",
				andString: "and"
			};
		//console("Parameters were: ",  input, oxford, propName, formatOptions);
		if (typeof oxford === 'string') {
			formatOptions = propName;
			propName = oxford;
			oxford = true;
		}
		//console("After oxford=string Parameters are: ",  input, oxford, propName, formatOptions);
		if (typeof oxford === 'object') {
			formatOptions = oxford;
			propName = oxford = null;
		}
		//console("After oxford=object Parameters are: ",  input, oxford, propName, formatOptions);
		if (typeof propName === 'object') {
			formatOptions = propName;
			propName = null;
		}
		//console("After propname=object Parameters are: ",  input, oxford, propName, formatOptions);
		formatOptions = formatOptions || {};
		oxford = typeof oxford !== "boolean" ? true: oxford;
		$.extend(formatting, formatOptions);
		//console("After everything Parameters are: ",  input, oxford, propName, formatOptions);
		if (il === 1) {
			return propName ? input[0][propName] : input[0];
		}
		for (ii=0; ii < il; ii += 1) {
			if (ii > 0 && il > 2 && (oxford || (ii + 1 < il))) {
				output += formatting.delimiter + " ";
			}
			if (ii > 0 && (ii + 1 === il)) {
				output = output.replace(/\s+$/, '') + " " + formatting.andString + " ";
			}
			output += (propName ? input[ii][propName] : input[ii]).toString();
			//console("Output is now ", output)
		}
		return output;
	}
	/* MODALS */
	DIALOG_TYPES = {
		'SUCCESS': { "title": "Success", "icon": "fa-check-circle text-success", "type": "success" },
		'ERROR': { "title": "Error", "icon": "fa-times-circle text-danger", "type": "danger" },
		'WARNING': { "title": "Warning", "icon": "fa-warning text-warning", "type": "warning" }
	};
	
	function getCollectionByName(collName) {
		//console.log("Calling function getCollectionByName; this is ", this, " arguments are ", arguments, " and broken up input is ", collName);
		var cc;
		for (var cc in collections) {
			if (collections[cc].name && collections[cc].name.toLowerCase() == collName.toLowerCase()) {
				return collections[cc];
			}
		}
		return null;
	}
	
	function formatPaper(paperData) {
		//console.log("Calling function formatPaper; this is ", this, " arguments are ", arguments, " and broken up input is ", paperData);
		var $paper, $title, $source, $img;
		//console.log(paperData);
		$paper = $("<div>").addClass("collection-paper-display");
		if (paperData.sourceImage) {
			$img = $('<img>')
				.attr('src', paperData.sourceImage)
				.css('float','left')
				.css('border', '20px solid orange')
				.appendTo($paper);
		}
		$title = $("<h4>")
			.text(shorten(paperData.title, 100))
			.appendTo($paper);
		$source = $("<div>")
			.append($("<cite>").css('font-weight', 'bold').text(paperData.sourceTitle));
		if (paperData.issueVolume) {
			$source.append(" " + paperData.issueVolume.toString());
			if (paperData.issueNumber) {
				$source.append(":" + paperData.issueNumber.toString());
			}
		}
		$source.appendTo($paper);
		return $paper;
	}

	function showMessage(body, dialogType, title, id, buttons, dontFade) {
		//console.log("Calling function showMessage; this is ", this, " arguments are ", arguments, " and broken up input is ", body, dialogType, title, id, buttons, dontFade);
		var $msgDialog;
		dontFade = dontFade || false;
		id = id || '__message-dialog';
		dialogType = dialogType || "SUCCESS";
		if (typeof dialogType === 'string') {
			dialogType = DIALOG_TYPES[dialogType];
		}
		title = title || dialogType.title;
		$msgDialog = makeModal(title, body, id, buttons || [{ text: "OK", type: "primary", data: { dismiss: 'modal' } }], true, false);
		// console.log($msgDialog);
		$("<i>")
			.css({
				float: "left",
				marginRight: '10px'
			})
			.addClass('fa fa-2x')
			.addClass(dialogType.icon || 'fa-info-circle')
			.prependTo($msgDialog.find('.modal-body'));
		if (!dontFade) {
			$msgDialog
				.on('hidden.bs.modal', function () {
					$(this).remove();
				})
				.on('shown.bs.modal', function () {
					window.setTimeout(function () {
						$msgDialog.modal('hide');
					}, 10000);
				});
		}
		return $msgDialog;
	}

	function makeModal(title, body, id, buttons, showDialog, hideCloseButton) {
		//console.log("Calling function makeModal; this is ", this, " arguments are ", arguments, " and broken up input is ", title, body, id, buttons, showDialog, hideCloseButton);
		var $modal, $dialog, $content, $header, $title, $body, $footer, 
			$btn, btni, btn, btnl,
			dti;
		// console.log("Buttons are ", buttons);
		showDialog = showDialog || false;
		$modal = $("<div>")
			.addClass("modal fade")
			.prop('tabindex', -1)
			.attr("role", "dialog")
			.attr('aria-labelledby', id + '-label')
			.attr('aria-hidden', showDialog ? false : true);
		$dialog = $("<div>")
			.addClass('modal-dialog')
			.appendTo($modal);
		$content = $("<div>")
			.addClass("modal-content")
			.appendTo($dialog);
		$header = $("<div>")
			.addClass("modal-header")
			.appendTo($content);
		if (!hideCloseButton) {
			$("<button type='button'>")
				.addClass("close")
				.attr('data-dismiss', "modal")
				.attr('aria-hidden', true)
				.text('\u00D7')
				.appendTo($header);
		}
		$("<h4>")
			.addClass("modal-title")
			.attr('id', id + '-label')
			.text(title)
			.appendTo($header);
		$body = $("<div>")
			.addClass("modal-body")
			.html($("<div>").append(body).html())
			.appendTo($content);
		if (buttons) {
			$footer = $("<div>")
				.addClass("modal-footer")
				.appendTo($content);
			for (btni = 0, btnl = buttons.length; btni < btnl; btni += 1) {
				btn = buttons[btni];
				$btn = $("<button>")
					.addClass("btn")
					.addClass("btn-" + (btn.type || "default"))
					.text(btn.text);
				$btn.addClass(btn.classes || "");
				if (btn.data) {
					for (dti in btn.data) {
						if (btn.data.hasOwnProperty(dti)) {
							$btn.attr('data-' + dti, btn.data[dti]);
						}
					}
				}
				if (btn.click) {
					$btn.click(btn.click);
				}
				$btn.appendTo($footer);
			}
		}
		if (showDialog) {
			$modal.on("shown.bs.modal", function () {
				$(this).on("keyup", function (event) {
					if (event.which === 13 && event.target === event.currentTarget) {
						$(this).modal('hide');
					}
				});
			}).modal('show');
		}
		return $modal;
	}

	/* COLLECTIONS CODE */
	function isSimpleValue(obj) {
		//console.log("Calling function isSimpleValue; this is ", this, " arguments are ", arguments, " and broken up input is ", obj);
		// returns true if it is not an object, or if it is an array
		return (typeof obj !== 'object' || obj instanceof Array);
	}

	function getValues(el) {
		//console.log("Calling function getValues; this is ", this, " arguments are ", arguments, " and broken up input is ", el);
			var $el = $(el),
				pn,
				data = {},
				elData = $.extend({}, $el.data()),
				edd, edi;
			//console.log("element data for ", $el ," is ", elData);
			for (dd in elData) {
				if (!elData.hasOwnProperty(dd) || !isSimpleValue(elData[dd])) {
					delete elData[dd];
					// console.log("Deleting ", dd);
				}
			}
			//console.log("now element data is ", elData);
			$.extend(data, elData);
			$el.find('[class]').each(function () {
				//console.log("Getting data for ", $(this).attr('class'));
				var $author, fldName, fldData, val, classes = $(this).attr('class');
				if (classes && classes.indexOf('paper-') !== -1) {
					fldName = classes.replace(/(?:.+?\b|^)paper-([-\w]+)(?:\b.+)?$/g, "$1");
					//console.log("Field is", fldName);
					if (fldName.toLowerCase() === 'authors') {
						$author = $(this).find('.author');
						if (!$author.length) {
							fldData = this.title || $(this).text();
						} else {
							fldData = [];
							$(this).find('.author').each(function () {
								if ($(this).find('.last')) {
									fldData.push({
										first: $(this).find('.first').text(),
										last: $(this).find('.last').text(),
										name: 
											($(this).find('.last').text() ? $(this).find('.last').text() + ", " : "") +
											$(this).find('.first').text() || ""
									});
								} else {
									fldData.push({
										name: $(this).text()
									});
								}
							});
						}
					} else if ($(this).is('img')) {
						fldData = $(this).attr('src');
					} else if (this.title) {
						fldData = this.title;
					} else {
						fldData = $(this).text();
					}
					//console.log("Setting ", $.camelCase(fldName), " to ", fldData);
					data[$.camelCase(fldName)] = fldData;
				}
			}); 
			//console.log("paper data is ", data);
			data.id = data.id || data.paperId;
			return data;
	}

	function CreateGUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}

	function loginCheck(callback) {
		//console.log("Calling function loginCheck; this is ", this, " arguments are ", arguments, " and broken up input is ", callback);
		var message = "";
		if ( propertyCount(papers) >= settings.maxAnonAdd) {
			//console.log("Login is required, so I need to check for it!");

			if (papers && propertyCount(papers) > 0) {
				message = "You already have saved " + 
					propertyCount(papers).toString() + "."; 
			}
			message += "In order to save " +
				( settings.maxAnonAdd > 0 ? ("more than " + settings.maxAnonAdd.toString()) : "" ) + 
				" items to your collections, you must sign in to EdITLib," +
				" or create an account.";
			login.checkForLogin(callback, message);
		} else {
			//console.log("Login is NOT required", propertyCount(papers) > settings.maxAnonAdd, propertyCount(papers) , settings.maxAnonAdd);
			callback();	
		}
	}

	function savePapersToCollections(paper_list, collection_list, success, failure, silent) {
		//console.log("There are ", propertyCount(papers), " papers saved.");
		//console.log("Papers is ", papers);
		//console.log("Calling function savePapersToCollections; this is ", this, " arguments are ", arguments, " and broken up input is ", paper_list, collection_list, success, failure, silent);
		var that = this;
		silent = typeof silent !== 'boolean' ? true: silent;
		loginCheck.call(that, function () {
			var pp = cc = 0,
				pl = paper_list.length,
				coll, paper,
				added_papers = [],
				error_papers = [],
				added_collections = [],
				error_collections = [],
				cl = collection_list.length;
			console.log("Returned back from loginCheck", this, arguments);
			try {
				for (cc = 0; cc < cl; cc += 1) {
					col = collection_list[cc];
					for (pp = 0; pp < pl; pp += 1) {
						paper = paper_list[pp];
						savePaperToCollection(paper, col);
						added_papers.push(paper);
					}
					added_collections.push(col);
				}
			} catch (e) {
				console.log("Error is ", e);
				if (!(e.type && /^Collections.Adding/.test(e.type) || !silent)) {
					throw(e);
				}
				error_collections.push(col);
				error_papers.push(paper);
			}
			if (added_papers.length && added_collections.length) {
				if (added_papers.length > 1) {
					message = "A total of " + added_papers.length.toString() + " papers have been added to ";
				} else {
					message = "The paper " + shorten(added_papers[0].title) + " has been added to ";
				}
				if (added_collections.length === 1 && added_collections[0].code === settings.defaultCollectionCode) {
					message += "your default collection";
				} else {
					message += "the collection";
					if (added_collections.length > 1) {
						message += "s";
					}
					message += " ";
					message += arrayToCommaList(added_collections, "name");
				}
				message += ".";
			}
			if (error_papers.length) {
				message += " There were errors adding " + 
					(error_papers.length > 1 ? 
						(error_papers.length.toString() + " papers") : 
						error_papers[0].title
					) + " to " + 
					(error_collections.length > 1 ? 
						(error_collections.length + " collections") : 
						error_collections[0].name
					) + ".";
			}
			//console.log("About to call success! because ", added_papers.length > 0);
			success.call(that, added_papers.length > 0, added_collections, added_papers, message);
		});
	}


	function loadCollections() {
		stored_collections = store.get('collections') || {};
		$.extend(collections, stored_collections);
	}

	function loadPapers() {
		stored_papers = store.get('papers') || {};
		$.extend(papers, stored_papers); 
	}
	
	function loadRemoteCollections() {
		if (remoteLoaded || remoteConnections || !(login && login.isLoggedIn())) {
			//console.debug("LOADING", "Currently at ", remoteConnections, "remote connections");
			window.clearTimeout(remoteLoadWatcher);
			remoteLoadWatcher = window.setTimeout(loadRemoteCollections, loadInterval);
			return;
		}
		remoteLoaded = false;
		remoteConnections += 1;
		window.clearTimeout(remoteLoadWatcher);
		$.ajax({
			type: "GET",
			url: settings.url,
			dataType: "json"
		}).done(function (data) {
			if (data.collections && data.papers) {
				//console.log("Here's the data ", data);
				$.extend(true, collections, data.collections);
				$.extend(true, papers, data.papers);
			} else {
				window.clearTimeout(remoteLoadWatcher);
				remoteLoadWatcher = window.setTimeout(loadRemoteCollections, loadInterval);
			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			window.clearTimeout(remoteLoadWatcher);
			remoteLoadWatcher = window.setTimeout(loadRemoteCollections, loadInterval);
			showMessage("I encountered an error loading your collections from the server: " + textStatus + " because " + login.isLoggedIn(), "WARNING");
		}).always(function () {
			//console.log("Got to end!")
			remoteConnections -= 1;
			saveRecordsLocally();
		});
	}

	function delayedSave() {
		var item, paper, col, collection;
		//console.log("Running delayed save function.");
		if (saving) {
			return;
		}
		//console.debug("Another " + items_to_save.length + " items to save ");
		item = items_to_save.shift();
		//console.log("Saving ", item, " from ", items_to_save);
		if (!item) {
			window.clearInterval(remoteSaveWatcher);
			changed = false;
			return;
		}
		saving = true;
		paper = item.paper;
		col = item.col;
		collection = collections[col.code];
		//console.log("Storing data for ", item);
		data = {
			paper_id: paper.paperId,
			collection_code: collection.code,
			collection_name: collection.name,
			collection_is_default: (col.code === '_DEFAULT' || col.code === '_GENERAL')
		};
		if (col.note) {
			data.paper_note = col.note;
		}
		if (typeof col.public === 'boolean') {
			data.collection_public = col.public;
		} else {
			
		}
		data['called_by'] = "Delayed Save Function";
		$.ajax({
			type: 'POST',
			timeout: 1000,
			url: settings.url,
			data: data,
			dataType: 'json'
		}).done(function (data) {
			//console.log("SUCCESS.");
			//console.log("Successfully saved ", paper, " Data was ", data);
			paper.changed = false;
			col.changed = false;
			saveRecordsLocally();
		}).fail(function (jqXHR, textStatus, errorThrown) {
			//console.log("FAILURE.");
			//console.log("Failure saving ", paper, ". Error was ", textStatus, " Details: ", errorThrown);
			if (textStatus === 'timeout') {
				//console.log("Timed out", arguments);
				items_to_save.unshift(item);
				//console.log("Now items_to_save is ", items_to_save);
				window.clearInterval(delaySaveWatcher);
				window.clearTimeout(delaySaveWatcher);
				delaySaveWatcher = window.setInterval(delayedSave, saveInterval);
			} else {
				//console.log("Status was ", textStatus);
				window.clearInterval(delaySaveWatcher);
				window.clearTimeout(delaySaveWatcher);
				delaySaveWatcher = window.setTimeout(delayedSave, delaySaveInterval);
			}
		}).always(function (dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
			//console.log("I always get here.");
			remoteConnections -= 1;
			saving = false;
			//console.debug("SAVED", "Currently at ", remoteConnections, "remote connections");
		});
	}

	function savePaperRemotely(paper, callback) {
		var cc, cl, col, collection;
		//console.log("Saving paper remotely!", paper);
		for (cc = 0, cl = paper.collections.length; cc < cl; cc += 1) {
			col = paper.collections[cc];
			//console.log("col is ", col, " and collection is ", collection);
			if (col.changed) {
				items_to_save.push({
					paper: paper,
					col: col
				});
				//console.log("Now items to save is ", items_to_save);
				delayedSave();
			} else {
				//console.log(col, " is the same");
			}
		}
	}

	function saveRecordsRemotely() {
		var change_count = 0, pp;
		console.log("saveRecordsRemotely was called!");
		if (processing || !changed) {
			console.log("Exiting because processing is ", processing, " and changed is ", changed);
			return;
		}
		processing = true;
		console.log("Saving records remotely!");
		if (!(login && login.isLoggedIn())) {
			console.log("Not logged in: ", login, login.isLoggedIn());
			window.clearInterval(remoteSaveWatcher);
			window.clearTimeout(remoteSaveWatcher);
			remoteSaveWatcher = window.setInterval(saveRecordsRemotely, saveInterval);
			processing = false;
			return;
		}
		/*
		for (pp in papers) {
			//console.log(papers[pp]);
			if (papers[pp].changed) {
				//console.log(papers[pp], "was changed ");
				savePaperRemotely(papers[pp]);
				change_count += 1;
			}
		}
		if (change_count === 0) {
			changed = false;
		}
		*/
		console.log("About to save the papers");
		$.ajax({
			type: 'POST',
			timeout: 5000,
			url: settings.url,
			data: JSON.stringify({ papers: papers, collections: collections }),
			contentType: "application/json",
			processData: false,
			dataType: 'json'
		}).done(function (data) {
			if (data.success) {
				//console.log("SUCCESS.");
				//console.log("Successfully saved. Data was ", data);
				changed = false;
				for (collection in data.collections) {
					collection.changed = false;
				}
				for (paper in data.papers) {
					paper.changed = false;
				}
				saveRecordsLocally();
				window.clearInterval(remoteSaveWatcher);
				window.clearTimeout(remoteSaveWatcher);
			} else {
				//console.log("Some kind of error ", data);
			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			//console.log("FAILURE.");
			//console.log("Failure saving. Error was ", textStatus, " Details: ", errorThrown);
			if (textStatus === 'timeout') {
				//console.log("Timed out", arguments);
				window.clearInterval(remoteSaveWatcher);
				window.clearTimeout(remoteSaveWatcher);
				remoteSaveWatcher = window.setInterval(saveRecordsRemotely, saveInterval);
			} else {
				//console.log("Status was ", textStatus);
				window.clearInterval(remoteSaveWatcher);
				window.clearTimeout(remoteSaveWatcher);
				remoteSaveWatcher = window.setTimeout(saveRecordsRemotely, saveInterval * 2);
			}
		}).always(function (dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
			//console.log("I always get here.");
			remoteConnections -= 1;
			saving = false;
			processing = false;
		});
	}
	
	function saveRecordsLocally() {
		store.set("collections", collections);
		store.set("papers", papers);
		store.set("changed", changed);
		//console.log("Setting up watcher!");
		if (changed) {
			saveRecordsRemotely();
		}
	}

	function savePaperToCollection(paper, collection, callback) {
		var col;
		//console.log("There are ", propertyCount(papers), " papers saved.");
		//console.log("Papers is ", papers);
		//console.log("Calling function savePaperToCollection; this is ", this, " arguments are ", arguments, " and broken up input is ", paper, collection);
		changed = true;
		store.set("changed", true);
		//console.log("Calling function savePaperToCollection; this is ", this, " arguments are ", arguments, " and broken up input is ", paper, collection);
		var data = {};
		//console.log(collection, typeof collection, collections[collection]);
		if (typeof collection === "string") {
			collection = collections[collection];
			//console.log("Now the collection is ", collection);
		}
		if (collection.code === '_NEW') {
			collection = newCollection(collection.name);
			changed = true;
		}
		collection.isNew = false;
		collection.changed = true;
		collection.papers.push(paper.id);
		//console.log("Before papers is ", papers);
		papers[paper.id] = papers[paper.id] || paper;
		//console.log("After papers is ", papers);
		paper.collections = paper.collections || [];
		col = {
			code: collection.code,
			changed: true,
			note: paper.note
		};
		if (typeof collection.public === 'boolean') {
			col.public = collection.public;
		}
		paper.collections.push(col); 
		paper.changed = true;
		saveRecordsLocally();
		$('#debug').text(JSON.stringify(paper, null, 4));
		if (callback) {
			callback.call(this, paper, collection);
		}
	}
	
	function getBulkPapers(id) {
		//console.log("Calling function getBulkPapers; this is ", this, " arguments are ", arguments, " and broken up input is ", id);
		var $dataEl = $('#collection-record-' + id),
			papers = [];
		//console.log($dataEl, $dataEl.find('.collections-add-bulk'));
		$dataEl.find('.collections-add-bulk').each(function () {
			papers.push(getValues(this));
		});
		return papers;
	}
	
	function showCollectionDialog(event) {
		//console.log("Calling function showCollectionDialog; this is ", this, " arguments are ", arguments, " and broken up input is ", event);
		var $this = $(this),
			$dialog = settings.$dialog,
			label = $this.data('record-label') || null,
			id = $this.data('collection-add'),
			multiple = ($this.data('record-multiple') === true),
			record_type = $this.data('record-type') || 'paper',
			cc, col, selected_cols = [], existing_note,
			paper_list = [];
		event.stopPropagation();
		event.preventDefault();
		//console.log("Multiple is ", multiple);
		if (multiple) {
			//console.log("It is multiple for ", id);
			paper_list = getBulkPapers(id);
		} else if ($this.closest('[data-paper-id]')) {
			//console.log("It is just the one");
			paper_list = [getValues($this.closest('[data-paper-id]'))];
		} else {
			//console.log("Id is ", id);
			paper_list = [getValues("[data-paper-id='" + id +"']")];
		}
		if (!paper_list || paper_list.length === 0) {
			alert("ERROR: No papers to add.");
			return false;
		}
		if (paper_list.length === 1) {
			paper_record = papers[paper_list[0].paperId];
			if (paper_record) {
				for (cc=0; cc < paper_record.collections.length; cc += 1) {
					col = paper_record.collections[cc];
					if (col.note && !existing_note) {
						existing_note = col.note;
					} else {
						existing_note = true;
					}
					selected_cols.push(col.code);
				}
			}
			if (existing_note === true) {
				existing_note = null;
			}
		}
		$dialog.find('.other-collection').remove();
		$dialog.find('.rename-collection').removeClass("active");
		$dialog.find('form').data('papers', paper_list);
		$dialog.find('.show-rename').remove();
		$('.default-rename-label').removeClass("active");
		$('<button type="button">')
			.addClass('btn btn-xs btn-success show-rename')
			.text('Rename')
			.click(function (event) {
				event.preventDefault();
				event.stopPropagation();
				$(this).remove();
				$('.default-rename-label').addClass("active");
				$dialog
					.find('.rename-collection')
					.addClass('active')
					.find(':text').first()
						.val((collections['_DEFAULT'] && collections['_DEFAULT'].name) || "General")
						.select();
				$dialog.find('.default-collection-label').hide();
				$('.current-collection-name').hide();
			})
			.insertAfter($dialog.find('.rename-collection'));
		collections_to_sort = [];
		for (cc in collections) {
			if (cc === settings.defaultCollectionCode) {
				continue;
			}
			collections_to_sort.push(collections[cc]);
		}
		collections_to_sort.sort(function (a , b) {
			return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0; 
		});
		//console.log("Collections to sort", collections_to_sort);
		for (cc = 0; cc < collections_to_sort.length; cc += 1) {
			col = collections_to_sort[cc];
			$("<li>")
				.addClass("checkbox other-collection")
				.append(
					$("<label>")
						.addClass("control-label")
						.attr("for", "collection-" + col.code)
						.text(col.name)
						.append(
							$("<input type='checkbox'>")
								.attr("name", "collection")
								.attr("value", col.code)
								.attr("id", "collection-" + col.code)
						)
				)
				.appendTo($dialog.find(".choose-collection-list"));
		}
		//console.log("Got past adding other collections");
		if (collections[settings.defaultCollectionCode] && collections[settings.defaultCollectionCode].name !== 'Default') {
			$dialog.find('.default-collection-label').text(collections[settings.defaultCollectionCode].name);
		} else {
			//console.log("Collections are ", collections, "and default is ", collections[settings.defaultCollectionCode]);
			$dialog.find('.default-collection-label').text(settings.defaultCollectionName);
		}
		$dialog.find('.default-collection-label').prepend(
			$('<input type="checkbox" name="collection" value="_DEFAULT" id="default-collection">')
		);
		//console.debug("COLLECTIONS", new Date(), "Before showing");
		$dialog.on('show.bs.modal', function () {
			var $this = $(this),
				$form = $this.is('form') ? $this : $this.find('form'),
				add_description;
			//console.debug("COLLECTIONS", new Date(), "On show");
			if ($form[0].reset) {
				$form[0].reset();
			}
			//console.debug("COLLECTIONS", new Date(), "After reset");
			$dialog.find(':checkbox').prop('checked', false);
			if (existing_note && existing_note.length) {
				$dialog.find(':input[name="note"]').val(existing_note);	
			}
			//console.debug("COLLECTIONS", new Date(), "Entered existing note");
			if (selected_cols && selected_cols.length) {
				for (cc = 0; cc < selected_cols.length; cc += 1) {
					$dialog.find(':checkbox[value="' + selected_cols[cc] + '"]').prop('checked', true);
				}			
				//console.debug("COLLECTIONS", new Date(), "Selected existing collections");
			} else {
				$dialog.find(':checkbox[value="' + settings.defaultCollectionCode + '"]').prop('checked', true);
				//console.debug("COLLECTIONS", new Date(), "Checked default collection");
			}
			$(".note-for-paper").toggle(!multiple).find(':input').prop('disabled', multiple);
			if (paper_list.length > 1) {
				add_description = ' ' + paper_list.length.toString() + ' papers ';
				if (label) {
					add_description += "(" + label + ")";
				}
			} else {
				//console.log("Getting the description by formatting ", paper_list[0], " to ", formatPaper(paper_list[0]));
				add_description = formatPaper(paper_list[0]);
			}
			$dialog.find('.add-display').html(add_description);
			//console.debug("COLLECTIONS", new Date(), "Entered description");
		}).on('shown.bs.modal', function () {
			//console.debug("COLLECTIONS", new Date(), "On shown");
			$dialog.find(':checked').first().focus();
		}).modal('show');
	}

	function newCollection(name, code) {
		//console.log("Calling function newCollection; this is ", this, " arguments are ", arguments, " and broken up input is ", name, code);
		var collection;
		code = code || CreateGUID();
		collection = {
			code: code,
			name: name,
			isNew: true,
			papers: []
		};
		collections[code] = collection;
		return collection;
	}

	function enterNewCollection() {
		var collection, collName, promptMessage="";
		while (!collection) {
			collName = window.prompt(promptMessage+"Enter a name for this collection:\n\n(Click cancel to exit.)");
			//console.log("CollName is ", collName);
			if (collName === null) {
				return false;
			} else if (collName === "") {
				promptMsg = "ERROR: You cannot have a blank collection name. Please enter a name or cancel.\n\n";
				continue;
			} else if (!/^\w{2,}/.test(collName)) {
				promptMsg = "ERROR: Collection name must start with a letter or number.\n\n";
				continue;
			}
			if (getCollectionByName(collName)) {
				if (window.prompt(
					"There is already a collection named " + collName + 
					". Choose OK to use this collection, or Cancel to " +
					"enter a new name.")) {
					collection = getCollectionByName(collName);
				}
			} else {
				collection = newCollection(collName);
			}
		}
		return collection;
	}

	function checkCanAdd() {
        if (!store.enabled && !login.isLoggedIn()) {
            alert('Local storage is not supported by your browser. If you have Private Mode enabled, please visit this website in normal mode. Otherwise, you must log in before you can save collections.');
            throw({
            	type: "Collections.CantAdd",
            	message: "Can't add items because user isn't logged in and storage is disabled.",
            	toString: function () { return this.type + ': ' + this.message; }
            	});
        }
	}

	function collectionAdd(event) {
		//console.log("Calling function collectionAdd; this is ", this, " arguments are ", arguments, " and broken up input is ", event);
		var $this = $(this),
			collCode = $this.data('collection'),
			collName,
			promptMsg = '',
			$el,
			collection;
		//console.log($this, " has the data ", $this.data(), " and collCode", collCode);
		checkCanAdd();
		event.stopPropagation();
		event.preventDefault();
		if (collCode) {
			if (collCode == '_NEW') {
				collection = enterNewCollection();
				if (collection === false) {
					return false;
				}
				collCode = collection.code;
			}
			if ($this.data('collection-add') === 'paper') {
				collection = collections[collCode];
				$el = $this.closest("[data-paper-id]");
				//console.log("Extracting values from ", $el);
				savePaperToCollection(getValues($el), collection, function (paper, collection) {
					message = "The paper " + shorten(paper.title) + " has been added to ";
					message += (collection.code === settings.defaultCollectionCode ? "your default collection" : "the collection "  + collection.name);
					showMessage(message);
				});
			}
		} else {
			showCollectionDialog.call(this, event);
		}
	}
	
	function saveToCollections(event) {
		//console.log("Calling function saveToCollections; this is ", this, " arguments are ", arguments, " and broken up input is ", event);
		var $form=$(this),
			$rename_field = $form.find('[name="new_default_name"]'),
			$new_name_field = $form.find('[name="new_name"]'),
			fieldValues = [], fld, fld_idx,
			cc, col, note, paper_list,
			collection_list = [];
		event.stopPropagation();
		event.preventDefault();
		fieldValues = $form.serializeArray();
		$form.find('.form-error').remove();
		$form.find('.has-error').removeClass('has-error');
		for (fld_idx in fieldValues) {
			fld = fieldValues[fld_idx];
			//console.log("Field is ", fld);
			if (fld.name === 'note') {
				note = fld.value;
			} else if (fld.name && fld.name === 'collection') {
				if (fld.value === '_NEW') {
					if (!$new_name_field.val()) {
						$("<div>")
							.addClass('form-error help-block')
							.text("You must supply a name for the new collection")
							.appendTo($new_name_field.parent().addClass('has-error'));
						$new_name_field.focus();
						return false;
					}
					col = newCollection($new_name_field.val());
					col.public = $form.find(':input[name="new_is_public"]:checked').val();
					if (typeof col.public === 'string') {
						col.public = (col.public === 'true');
					}
				} else {
					//console.log("Looking for ", col, " in collections ", collections);
					col = collections[fld.value];
					if (fld.value === settings.defaultCollectionCode) {
						col = col || newCollection(settings.defaultCollectionName, settings.defaultCollectionCode);
						if (!$rename_field.is(':hidden') && !$rename_field.prop('disabled')) {
							if ($rename_field.val().length) {
								col.name = $rename_field.val();
								changed = true;
								col.changed = true;
							}
						}
					}
				}
				collection_list.push(col);
			}
		}
		//console.log("Collection list ", collection_list);
		if (!collection_list.length) {
			$("<div>")
				.addClass('form-error help-block')
				.text("You must choose one or more collections.")
				.appendTo($form.find('.choose-collections').addClass('has-error'));
			return false;
		}
		//console.log("Collections saved to ", collection_list);
		//console.log("Papers saved ", $form.data('papers'));
		paper_list = $form.data('papers');
		if (paper_list.length === 1 && note) {
			paper_list[0].note = note;
		}
		//console.log("Now the contents of paper list are ", paper_list);
		savePapersToCollections(paper_list, collection_list, function (success, collection, paper, message) {
				//console.log("And we're back!");
				showMessage(message);
				//console.log("Message shown!");
				$form.closest('.modal').modal('hide');
				//console.log("Dialog hid!");
				$(document).trigger("collections.added");
		}, function () {
			
		});
	}

	$(document).on("click", '[data-collection-add]', collectionAdd);
	

	function init(initSettings, callback) {
		var $form;
		
		//console.log("Calling function init; this is ", this, " arguments are ", arguments, " and broken up input is ", initSettings, callback);
		if (initSettings.getUser) {
			login = initSettings;
		} else {
			$.extend(settings, initSettings);
			login = settings.login;
		}
		loadCollections();
		loadPapers();
		
		changed = store.get("changed") || false;
		//console.log("Is it changed? ", changed);
		if (login && login.isLoggedIn()) {
			//console.log("I'm logged in, so I'll go ahead and load the remote collections.");
			loadRemoteCollections();
		} else {
			remoteLoadWatcher = window.setTimeout(function () {
				window.clearTimeout(remoteLoadWatcher);
				loadRemoteCollections();
			}, 5*1000);
		}
		if (changed) {
			//console.log("Setting interval for saving records.");
			window.clearInterval(remoteSaveWatcher);
			window.clearTimeout(remoteSaveWatcher);
			remoteSaveWatcher = window.setInterval(saveRecordsRemotely, saveInterval);
		} else {
			//console.log("Nothing changed.");
		}
		if (callback) {
			callback.call(this);
		}

		$form = settings.$dialog.is('form') ? settings.$dialog : settings.$dialog.find('form');
		$form.on('submit', saveToCollections);
		
		$(document).on('keyup', function (event) {
			//console.debug("COLLECTIONS", "pressed ", event.which, "within", event.target, event);
			return true;
		});

		$(document).on("submit", '#save-to-collection-form', saveToCollections);

	}

	return {
		init: init,
		getPapers: function () {
			return $.extend(true, {}, papers);
		},
		getCollections: function () {
			//console.log("The collections are ", collections);
			return $.extend(true, {}, collections);
		}
	};
}(jQuery));