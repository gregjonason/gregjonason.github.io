 /* Regression Issue PRN-443 */
        /* Return Key press is not working in IE */
        /* Added function for OnKeypress event */
        function checkEnter(e, isModal) {
            var characterCode;
            isModal = typeof(isModal) !== 'undefined' ? isModal : false;
            if (e && e.which) {
                e = e;
                characterCode = e.which;
            }
            else {
                e = event;
                characterCode = e.keyCode;
            }

            if (characterCode == 13) {
                return srchValidate(isModal);
            }
            else {
                return true;
            }
        }
        /* End of change */

        // JavaScript Document
        function srchValidate(isModal) {
            isModal = typeof(isModal) !== 'undefined' ? isModal : false;
            if (isModal) {
                var txt = document.getElementById("searchModaltxt").value;
                document.getElementById("searchModaltxt").value= txt.replace(/[^a-zA-Z0-9\@\#\%\/\$\!\&\-\"\.\,\'\s]/g, ''); //Remove any special characters
                var searchTxt = document.getElementById("searchModaltxt");
                var dvError = document.getElementById("dvModalError");
            }
            else {
                var txt = document.getElementById("searchtxt").value;
                document.getElementById("searchtxt").value= txt.replace(/[^a-zA-Z0-9\@\#\%\/\$\!\&\-\"\.\,\'\s]/g, ''); //Remove any special characters
                var searchTxt = document.getElementById("searchtxt");
                var dvError = document.getElementById("dvError");
            }
            
            
            
            if (txt.trim() == "") {
                //document.getElementById("dvError").style.display = "inline";
                //document.getElementById("lblError").innerHTML = "Please enter search key words";
                var errorHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>Please enter search key words</div>"
                dvError.innerHTML = errorHTML;
                searchTxt.focus();
                return false;
            }
            else {
                if (txt.length > 255) {
                    var errorHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>Search terms cannot exceed 255 characters.</div>"
                    dvError.innerHTML = errorHTML;
                    //document.getElementById("dvError").style.display = "inline";
                    //document.getElementById("lblError").innerHTML = "Search terms cannot exceed 255 characters.";
                    searchTxt.focus();
                    return false;
                }
                else {
                    /*if (location.href.indexOf("/investors/") == -1 && (location.href.indexOf("profnet/support") == -1)) {
                        var i = 0;
                        var c = 0;
                        for (i = 0; i <= 1; i++) {
                            var rad = document.forms[0].elements['sch1'][i];
                            
                            if (rad.checked == true) {
                                c++;
                            }
                        }
                        if (c == 0) {
                            //document.getElementById("dvError").style.display = "inline";
                            if (document.getElementById("rdproducts").value == "Blogposts") {
                                var errorHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>Select 'Blogger posts' or 'News Releases' to search</div>"
                                dvError.innerHTML = errorHTML;
                                //document.getElementById("lblError").innerHTML = 'Select "Blogger posts" or "News Releases" to search';
                            } else {
                                var errorHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>Select 'Products & Services' or 'News Releases' to search</div>"
                                //document.getElementById("dvError").innerHTML = errorHTML;
                                document.getElementById("lblError").innerHTML = 'Select "Products & Services" or "News Releases" to search';
                            }
                            return false;
                        }
                    }*/
                    return true;
                }
            }
        }

        function CloseError() {
            document.getElementById("dvError").style.display = "none";
        }

        // JavaScript Document
        function signUpValidate() {
            var email = document.getElementById("Email").value;
            if (email == "") {
                document.getElementById("dvSignUpError").style.display = "inline";
                document.getElementById("lblSignUpError").innerHTML = "Please enter email address";
                document.getElementById("Email").focus();
                return false;
            }
            else {
                var emailValid = /^[a-zA-Z0-9_!&=`~#%'\/\$\^\|\+\?\{\}-]+(\.[a-zA-Z0-9_!&=`~#%'\/\$\^\|\+\?\{\}-]+)*@[a-zA-Z0-9]([a-zA-Z0-9_-])*(\.[a-zA-Z0-9][a-zA-Z0-9_-]*)+$/;
                if (!emailValid.test(email)) {
                    document.getElementById("dvSignUpError").style.display = "inline";
                    document.getElementById("lblSignUpError").innerHTML = "Please enter valid email address";
                    document.getElementById("Email").focus();
                    return false;
                }
            }
            return true;
        }

        function CloseSignUpError() {
            document.getElementById("dvSignUpError").style.display = "none";
        }


        var currentSelectedState = "-1";
        function SelectRegion(regionList) {
            document.getElementById("stateList_" + currentSelectedState).style.display = "none";
            currentSelectedState = regionList.options[regionList.selectedIndex].value;
            document.getElementById("stateList_" + currentSelectedState).style.display = "inline";
        }

        function ToggleSearchCategories(parentFld, childCtrl) {
            if (parentFld.src.indexOf("open_PRN.gif") != "-1") {
                parentFld.src = "http://content.prnewswire.com/designimages/closed_PRN.gif";
                /* PRN-964 */
                document.getElementById(childCtrl).style.display = "block";
            }
            else {
                parentFld.src = "http://content.prnewswire.com/designimages/open_PRN.gif";
                document.getElementById(childCtrl).style.display = "none";
            }
        }

        function ToggleAllSelection(parentSelection, childCtrl) {
            var childUl = document.getElementById(childCtrl);
            for (var i = 0; i < childUl.childNodes.length; i++) {
                var node = childUl.childNodes[i];

                if (node.nodeName == "LI") {
                    for (var j = 0; j < node.childNodes.length; j++) {
                        var subNode = node.childNodes[j];
                        if (subNode.nodeName == "INPUT") {
                            subNode.checked = parentSelection;
                        }
                    }
                }
            }
        }

        function ResetAdvancedSearchFields() {
            document.getElementById("txtSearch").value = "";
            document.getElementById("ddldatePublished").selectedIndex = 0;

            //industries
            var counter = 0;
            for (var i = 0; i < document.forms[1].elements.length; i++) {
                if (document.forms[1].elements[i].nodeName == "INPUT")
                    document.forms[1].elements[i].checked = false;
            }

        }

        // Commented the below function related to organization search to ignore this from Cat's Eye live.
        function ValidateOrgSearch() {
            if (document.getElementById("txtOrgSearch").value == "") {
                document.getElementById("lblOrgError").style.display = "inline";
                document.getElementById("txtOrgSearch").focus();
                return false;
            }
            else {
                document.getElementById("lblOrgError").style.display = "none";
                document.orgSearch.submit();
            }
        }


        function OnAdvSearchLoad() {
            var catArr = new Array();
            catArr[0] = "Industry";
            catArr[1] = "Subject";
            catArr[2] = "Geography";

            for (var catIndex = 0; catIndex < catArr.length; catIndex++) {


                var indCount = document.getElementById("hdn" + catArr[catIndex] + "Count").value;

                for (var indCounter = 1; indCounter <= indCount; indCounter++) {
                    var chkCat = document.getElementById("chk" + catArr[catIndex] + indCounter);
                    var ulCat = document.getElementById("ul" + catArr[catIndex] + indCounter);
                    var chlCount = document.getElementById("hdn" + catArr[catIndex] + "Count" + indCounter).value;

                    if (chkCat.checked == false) {
                        var isChildChecked = false;
                        for (var chlCounter = 1; chlCounter <= chlCount; chlCounter++) {
                            if (document.getElementById("chk" + catArr[catIndex] + indCounter + "chld" + chlCounter).checked == true) {
                                isChildChecked = true;
                                ToggleSearchCategories(document.getElementById("img" + catArr[catIndex] + indCounter), "ul" + catArr[catIndex] + indCounter);
                                break;
                            }
                        }
                    }
                }
            }
            window.scroll(0, 0);
        }

        function trackSearch() {
            // Add Omniture js for tracking search button clicks.
            var s = s_gi(s_account);
            s.linkTrackVars = 'events';
            s.linkTrackEvents = 'event17';
            s.events = 'event17';
            s.tl(this, 'o', 'Search Button');
        }

        function schf_omniture_trackSearch() {
            //added Omniture js for tracking search button clicks(prnm-275)
            var cookieVal = readCookie('prncom_schF');
            var s = s_gi(s_account);
            s.linkTrackVars = 'eVar55,events';
            s.linkTrackEvents = 'event17,event55';
            s.events = 'event17,event55';
            if ((typeof(s.eVar55) !== 'undefined') && (s.eVar55 !== null)) {
                s.eVar55 = s.pageName;
            }
            s.tl(this, 'o', 'Search Button');
        }

        // Added for SEO friendly search ULRs
        function validateChangeSearchURL(isModal) {
            isModal = typeof(isModal) !== 'undefined' ? isModal : false;
            // Do validation, if validation fails then return immediately
            var validation = srchValidate(isModal);
            if (!validation) {
                return false;
            }
            var searchForm = document.forms.searchOne;
            var redirectionUrl = '/search-results/';
            var searchTxt = "";
            if (isModal) {
                searchTxt = document.getElementById("searchModaltxt").value;
            }
            else {
                searchTxt = document.getElementById("searchtxt").value;
            }
            //searchTxt = searchTxt.replace(/\s+/g, '+');
            searchTxt = encodeURIComponent(searchTxt);
            if (location.href.indexOf("/investors/") == -1 && (location.href.indexOf("profnet/support") == -1)) {
                if (document.getElementById("rdnewsreleases").checked) {
                    if (document.getElementById("rdnewsreleases").value == "bloggers") {
                        redirectionUrl += 'bloggers/' + encodeURI(searchTxt) + '-7-days-page-1';
                    } else {
                        redirectionUrl += 'news/' + encodeURI(searchTxt) + '-30-days-page-1-pagesize-20';
                    }
                } else if (document.getElementById("rdproducts").checked) {

                    if (document.getElementById("rdproducts").value == "Blogposts") {
                        redirectionUrl = '/bloggers/blogger-search/?keywords=' + escape(searchTxt) + '&page=1';
                    } else {
                        redirectionUrl += 'products-knowledge/' + escape(searchTxt) + '-page-1';
                    }
                }
            }
            if (location.href.indexOf("/investors/") > -1) {
                redirectionUrl += 'investors/' + escape(searchTxt) + '-7-days-page-1';
            }
            if (location.href.indexOf("mediawebsite.net") > -1) {
                redirectionUrl = "http://www.prnewswire.com" + redirectionUrl;
            }
            if (location.href.indexOf("profnet/support") > -1) {
                redirectionUrl = "/profnet/support" + redirectionUrl;
                redirectionUrl += searchTxt + '-page-1';
            }
            //alert("redirectionUrl >>"+redirectionUrl);
            location.href = redirectionUrl;
            return false;

        }

        function OpenPopup(url, name) {
            window.open(url, name, 'width=925,height=480,resizable=yes,scrollbars=yes');
        }
