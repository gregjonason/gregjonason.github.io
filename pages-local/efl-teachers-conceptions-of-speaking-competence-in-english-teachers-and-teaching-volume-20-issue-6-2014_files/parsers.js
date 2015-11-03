function evalParser(){CWParser=window[parserClass],"undefined"==typeof CWParser&&(CWParser={},setTimeout(function(){evalParser()},1e3))}var CWParser={},Callbacks={addButton:function(){},success:function(){},metaData:{}},currentParser="",prodAllowedDomains={informaworld:["tbit","csmt","rbri","pcns","gcmb","rcme","teis","terg","tcim","tcon","tetn","ggen","tprs","tsys","tlct","tmph","tppc","gsch","bfsn","tres","tfac","lmsc","lsyc","ujst","oaef","oaen","uasa","utas","ubes","ucgs","utch","usbr","ucha","uspp","uoeh","ulks","reno","fbep","ccph","rsah","rics"]},testSkippedDomains={informaworld:[]},Utility={isError:!1,base64Matcher:new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),checkHtmlTags:new RegExp("<[^>]+>"),isUndefined:function(e){return!("undefined"!=typeof e&&""!=e)},matchAuthors:function(e,r){var a=0,i=e.length;if(i>0){for(var n=0;n<r.length;n++)for(var s=0;i>s;s++)e[s]===r[n]&&a++;return Math.floor(a/i*100)}return 0},parseQueryStr:function(e){var r,a=/([^&=]+)=?([^&]*)/g,i=function(e){return decodeURIComponent(e.replace(/\+/g," "))},n={};if(e)for("?"==e.substr(0,1)&&(e=e.substr(1));r=a.exec(e);){var s=i(r[1]),o=i(r[2]);void 0!==n[s]?($.isArray(n[s])||(n[s]=[n[s]]),n[s].push(o)):n[s]=o}return n},parseHTML:function(e){var r=document.createElement("html");return r.innerHTML=e,r},filter:function(e,r,a){try{if(CWPDFReaderMode.Publisher===CWPDFReaderConfig.readerMode)return!0}catch(i){}return!0},getMetas:function(e){Utility.metatype="";var r=CwZ(e.target+" meta");if(r.length>0)for(var a=0;a<r.length;a++)try{var i=r[a].name;if(""==i||void 0==i){if(i=r[a].attributes.property,void 0==i||""==i)continue;i=i.value}if(i.indexOf("citation_")>=0){Utility.metatype="citation_";break}i.toLowerCase().indexOf("dc.")>=0?Utility.metatype="dc.":i.indexOf("eprints.")>=0&&(Utility.metatype="eprints.")}catch(n){Utility.log(n)}if("citation_"==Utility.metatype)var s={title:"citation_title",series_name:"citation_journal_title",author:"citation_author",publisher:"citation_publisher",issue:"citation_issue",volume:"citation_volume",identifier:"citation_doi",identifierType:"",page_start:"citation_firstpage",page_end:"citation_lastpage",date:"citation_publication_date",xdate:"citation_date",keywords:"citation_keywords",description:"citation_abstract",authors:"citation_authors",placeofpublication:"citation_publicationplace",number:"citation_number",pdfurl:"citation_pdf_url"};else if("eprints."==Utility.metatype)var s={title:"eprints.title",series_name:"eprints.publication",author:"eprints.creators_name",publisher:"eprints.publisher",issue:"eprints.issue",volume:"eprints.volume",number:"eprints.number",page_start:"eprints.pagerange",redif_type:"eprints.type",date:"eprints.date",placeofpublication:"eprints.publicationplace",description:"eprints.abstract",keywords:"keywords"};else if("dc."==Utility.metatype)var s={title:"dc.title",publisher:"dc.publisher",series_name:"prism.publicationname",author:"dc.creator",date:"dc.date",keywords:"dc.keywords",page_start:"prism.startingpage",page_end:"prism.endingpage",volume:"prism.volume",issue:"prism.number",placeofpublication:"prism.publicationplace",identifier:"dc.identifier",identifierType:"",description:"dc.description",number:"prism.number"};return Utility.metatype?Utility.extractMetaData(s,e):""},duplicateCheck:function(e){e.sort(function(e,r){return e.name==r.name?0:e.name>r.name?1:-1});var r=e.length,a=new Array,i=new Array;if(r>0)for(var n=0;r>n;n++){var s=CwZ(e[n]),o=s.attr("name");if(-1==CwZ.inArray(o,a))a.push(o),i.push(e[n]);else{var t=i[i.length-1];t.content=t.content+" ; "+s.attr("content"),i.pop(i.length-1),i.push(t)}}return i},extractMetaData:function(e,r){if(e){var a=new Array;try{var i=Utility.duplicateCheck(CwZ(r.target+" meta"))}catch(n){Utility.log(n)}for(var s=0,o=0;o<i.length;o++)try{var t=i[o].name,c=i[o].content;if(""==t||void 0==t){if(t=i[o].attributes.property,void 0==t||""==t)continue;t=t.value}if(t=t.toLowerCase(),t.indexOf(Utility.metatype)>=0)for(var d in e)e[d]==t&&(CwZ.inArray(d,a)>=0?e[d]+=" ;"+c:e[d]=c,CwZ.inArray(d,a)<0&&(a[s]=d,s++))}catch(n){Utility.log(n)}for(var d in e)CwZ.inArray(d,a)<0&&(e[d]="");return void 0!=e.author&&""!=e.author&&void 0!=e.authors&&e.authors.length>0&&(e.author=e.authors,e.author=e.author.replace(/,/g,";")),""==e.date&&void 0!=e.xdate&&e.xdate.length>0&&(e.date=e.xdate),void 0!=e.identifier&&""!=e.identifier&&0==e.identifier.indexOf("10.")&&(e.identifierType="doi"),e}},getPageUrl:function(e){return Utility.isUndefined(e)?window.parent.location.href:e},getPageDomain:function(e){var r="";if(Utility.isUndefined(e)){var a=window.parent.location;r=window.suggestionParser?window.suggestionParserBaseUrl:a.protocol+"//"+a.host}else{var i=document.createElement("a");i.href=e,r=i.protocol+"//"+i.host}return r},getPagePathname:function(e){var r="";if(Utility.isUndefined(e))r=window.parent.location.pathname;else{var a=document.createElement("a");a.href=e,r=a.pathname}return r},printLog:function(e){console&&console.info&&console.info(e)},log:function(e,r){var a="",i={userprompt:!1,heading:""},n="object"==typeof e,s=e instanceof Error;r&&(i=r),s&&(Utility.isError=!0),a=n&&s&&e.stack?(Utility.getPageUrl()||"")+"\n"+e.stack:n?e.message:e,CWPDFReaderConfig.debug&&Utility.printLog(a);if(s){var o="";CWPDFReaderMode.Webimporter==CWPDFReaderConfig.readerMode?o=Config.baseUrl:(CWPDFReaderMode.Chrome||CWPDFReaderMode.Publisher||CWPDFReaderMode.Library)==CWPDFReaderConfig.readerMode&&(o=CWPDFReaderConfig.cwURL);try{"string"==typeof o&&(o.indexOf(".colwiz.com")>=0||o.indexOf(".colwis.org")>=0)&&document.getElementById("errorlogs").contentWindow.postMessage({message:"sentryException",data:a},"*")}catch(t){}}},generateRis:function(e){var r=e,a="";if(a+="paper"==r.redif_type?"TY  - RPRT":"article"==r.redif_type?"TY  - JOUR":"book"==r.redif_type?"TY  - BOOK":"chapter"==r.redif_type?"TY  - CHAP":"software"==r.redif_type?"TY  - COMP":"webpage"==r.redif_type?"TY  - ONLN":"TY  - JOUR",r.title&&""!=r.title&&(a+="\nTI  - "+r.title),r.author&&""!=r.author)for(var i=r.author.split(/; /g),n=0;n<i.length;n++)i[n].length>1&&(a+=r.isedited?"\nED  - "+i[n]:"\nAU  - "+i[n]);if(r.date&&""!=r.date){var s=r.date.toString().match(/(\/)/g);if(s)var o=s.length;else var o=0;for(var n=o;3>n;n++)r.date+="/";a+="\nY1  - "+r.date}if("webpage"==r.redif_type){var t=new Date;r.date=t.getFullYear()+"/"+parseInt(t.getMonth()+1)+"/"+t.getDate()+"/",a+="\nY1  - "+r.date}if("paper"==r.redif_type)""!=r.publisher&&(a+="\nPB  - "+r.publisher),""!=r.series_name&&(a+="\nT3  - "+r.series_name),""!=r.number&&(a+="\nIS  - "+r.number);else if("article"==r.redif_type)""!=r.series_name&&(a+="\nJF  - "+r.series_name),""!=r.volume&&(a+="\nVL  - "+r.volume),""!=r.issue&&(a+="\nIS  - "+r.issue),""!=r.page_start&""!=r.page_end?a+="\nSP  - "+r.page_start+"\nEP  - "+r.page_end:""!=r.number&&(a+=",\nSP  - "+r.number);else if("book"==r.redif_type)""!=r.volume&&(a+="\nVL  - "+r.volume),""!=r.publisher&&(a+="\nPB  - "+r.publisher),""!=r.isbn&&(a+="\nSN  - "+r.isbn);else if("chapter"==r.redif_type){if(""!=r.chapter&&(a+="\nCP  - "+r.chapter),""!=r.page_start&""!=r.page_end&&(a+="\nSP  - "+r.page_start+"\nEP  - "+r.page_end),""!=r.book_title&&(a+="\nBT  - "+r.book_title),""!=r.book_editor)for(var c=r.book_editor.split(/;/),n=0;n<c.length;n++)a+="\nED  - "+c[n];""!=r.volume&&(a+="\nVL  - "+r.volume),""!=r.publisher&&(a+="\nPB  - "+r.publisher)}else"software"==r.redif_type&&""!=r.publisher&""!=r.series_name&&(a+="\nT3  - "+r.series_name+", "+r.publisher);if(r.description&&""!=r.description&&(a+="\nAB  - "+r.description),r.keywords&&""!=r.keywords)for(var d=r.keywords.split(/;/),n=0;n<d.length;n++)a+="\nKW  - "+d[n];return r.placeofpublication&&""!=r.placeofpublication&&(a+="\nCY  - "+r.placeofpublication),r.publisher&&""!=r.publisher&&(a+="\nPB  - "+r.publisher),r.identifier&&""!=r.identifier&&(a+="\nID  - "+r.identifier),r.url&&""!=r.url&&(a+="\nUR  - "+r.url),a+="\nER  - ",a+=""},validDataUrl:function(e){var r=!!e.dataUrl,a=e.dataUrl!=e.pubLink&&e.dataUrl!=e.pdfLink;return r&&a&&!Utility.validateData("dataUrl")},formatIssn:function(e){return e=void 0!=e&&e.length?Utility.trim(e).split("-").join(""):""},validateData:function(e){var r={doaj:["identifier","identifierType"],liinwww:["identifier","identifierType"],isiknowledge:["identifier","identifierType"],highwirestanford:["dataUrl"],highwire:["identifier"]};return CwZ.inArray(e,r[CWPDFReaderConfig.parser])>-1},getData:function(e){if(!Utility.validateArgs(e))return!1;var r=e.metadata,a="med"==r.type;if(r.data)e.success(r.data,r.type);else if(Utility.validDataUrl(r)){var i=!1;Utility.ajax(r.dataUrl,function(n,s,o){try{var t=o.getResponseHeader("content-type");if(""==n)throw i=!0,new Error("Empty Data Resp");if(t.indexOf("application/xml")>=0)n=window.ActiveXObject?n.xml:(new XMLSerializer).serializeToString(n);else if(0==t.indexOf("text/html")){if(n.indexOf("<pre")>=0&&(n=CwZ("<div>").html(n).find("pre").text(),!a))if("undefined"!=typeof citJSONMain){var c=citJSONMain(n,r.type);""!=c&&Object.keys(c.entries[0].Fields).length<=1&&(n="")}else n=~n.trim().indexOf("@")?n:"";n=n.replace(/<br\/?>/g,"")}else n=n.replace(/<br\/?>/g,"");if(""==n||"undefined"==typeof n||!a&&Utility.checkHtmlTags.test(n))throw i=!0,new Error("Html in data");e.success(n,r.type)}catch(d){0==i&&Utility.log(d)}finally{i&&Utility.scrapeData(r,e)}},"get",function(a){Utility.log(a),Utility.scrapeData(r,e)})}else Utility.scrapeData(r,e)},extractPubHolder:function(e){return{title:e.title,isedited:"",author:e.authors,series_name:"",publisher:"",keywords:"",handle:"",year:e.year||"",date:"",description:"",redif_type:"",volume:"",issue:"",number:"",page_start:"",page_end:"",edition:"",book_editor:"",book_title:"",chapter:"",url:e.pubLink,placeofpublication:"",identifier:e.identifier,isbn:"",doi:"doi"==e.identifierType?e.identifier:""}},extractPage:function(e,r){var a=Utility.getMetas({target:e});return a&&a.title&&a.author&&""!=a.author||(a=CWParser.extractHTML({target:e},r)),"body"!=e&&CwZ(e).html(""),a},scrapeData:function(e,r){var a=e.pubLink||"";""!=a&&a.toLowerCase().indexOf(Utility.getPageDomain())>=0?CWParser.isPubPage()?r.success(Utility.generateRis(Utility.extractPage("body",e)),"ris"):Utility.ajax(a,function(a){try{var i,n=CwZ("#CWExtractPub");i=n.length?n.html("").append(a.replace(/script/g,"noscript")):CwZ("<div></div>").attr("id","CWExtractPub").append(a.replace(/script/g,"noscript")).appendTo("body"),i.hide(),r.success(Utility.generateRis(Utility.extractPage("#"+i.attr("id"),e)),"ris")}catch(s){Utility.log(s)}},"get",function(a){Utility.log(a),r.success(Utility.generateRis(Utility.extractPubHolder(e)),"ris")}):r.success(Utility.generateRis(Utility.extractPubHolder(e)),"ris")},selectorAttributeGetter:function(e,r,a,i){try{var e=a?CwZ(a).find(e):CwZ(e),n="";return n=e.length?e.map(function(){return"text"==r?Utility.trim(CwZ(this).text()):Utility.trim(CwZ(this).attr(r))}).get().join(i||", "):""}catch(s){Utility.log(s)}},ajax:function(e,r,a,i,n,s){null==a&&(a="get"),null==r&&(r=function(e){}),null==i&&(i=function(e,r,a){Utility.log(e)});var o={url:e,type:a,success:r,error:i};"undefined"!=typeof n&&(o.data=n),"undefined"!=typeof s&&CwZ.each(s,function(e,r){o[e]=r}),CwZ.ajax(o)},trim:function(e){return e="string"==typeof e&&e&&e.length?CwZ.trim(e).replace(/^\s+|\s+$|\s+(?=\s)/g,""):""},validateArgs:function(e){return e&&"undefined"!=typeof e?"undefined"!=typeof e.success||"undefined"!=typeof e.addButton||"undefined"!=typeof e.metadata:!1},codec:function(e,r){var a="btoa"==r,i="atob"==r,n="";return n=Utility.base64Matcher.test(e)?i?Base64.decode(e):e:a?Base64.encode(e):e}},domainString=document.domain.replace(/[\.-]/g,"");Utility.analyzeParser=function(e){switch(!0){case e.indexOf("ieeexploreieeeorg")>=0:currentParser="ieee";break;case e.indexOf("dlacmorg")>=0:currentParser="acm";break;case e.indexOf("pubsacsorg")>=0:currentParser="acs";break;case e.indexOf("arxivorg")>=0:currentParser="arxiv";break;case e.indexOf("biooneorg")>=0:currentParser="bioone";break;case e.indexOf("citeseerx")>=0:currentParser="citeseerx";break;case e.indexOf("copacjiscacuk")>=0:currentParser="copac";break;case e.indexOf("citeulikeorg")>=0:currentParser="citeulike";break;case e.indexOf("liinwwwiraukade")>=0:currentParser="liinwww";break;case e.indexOf("searchcrossreforg")>=0:currentParser="crossref";break;case e.indexOf("highwirestanfordedu")>=0:currentParser="highwirestanford";break;case e.indexOf("dblporg")>=0:currentParser="dblp";break;case e.indexOf("doajorg")>=0:currentParser="doaj";break;case e.indexOf("ebscohostcom")>=0:currentParser="ebsco";break;case e.indexOf("scholargoogle")>=0:currentParser="googlescholar";break;case e.indexOf("google")>=0:currentParser="googlebooks";break;case e.indexOf("tandftestliteratumonlinecom")>=0:case e.indexOf("tandfqaliteratumonlinecom")>=0:case e.indexOf("tandfstagliteratumonlinecom")>=0:case e.indexOf("tandfonlinecom")>=0:currentParser="informaworld";break;case e.indexOf("ingentaconnectcom")>=0:currentParser="ingentaconnect";break;case e.indexOf("webofknowledgecom")>=0:currentParser="isiknowledge";break;case e.indexOf("jstororg")>=0:currentParser="jstor";break;case e.indexOf("amsorg")>=0:currentParser="mathscinet";break;case e.indexOf("adsabsharvardedu")>=0:currentParser="nasaads";break;case e.indexOf("apaorg")>=0:currentParser="psycnet";break;case e.indexOf("ncbinlmnihgov")>=0:currentParser="pubmed";break;case e.indexOf("econpapersrepecorg")>=0:currentParser="repec";break;case e.indexOf("sciencedirectcom")>=0:currentParser="sciencedirect";break;case e.indexOf("scitationaiporg")>=0:case e.indexOf("proceedingsaiporg")>=0:case e.indexOf("asadlorg")>=0:case e.indexOf("onlinemedphysorg")>=0:currentParser="aip";break;case e.indexOf("scopuscom")>=0:currentParser="scopus";break;case e.indexOf("linkspringercom")>=0:case e.indexOf("rdspringercom")>=0:currentParser="springer";break;case e.indexOf("papersssrncom")>=0:currentParser="ssrn";break;case e.indexOf("onlinelibrarywileycom")>=0:currentParser="wiley";break;case e.indexOf("worldcatorg")>=0:currentParser="worldcat";break;case e.indexOf("academicresearchmicrosoftcom")>=0:currentParser="microsoft";break;case e.indexOf("futuresciencecom")>=0:currentParser="futuresci";break;case e.indexOf("worldscientificcom")>=0:currentParser="worldsci";break;case e.indexOf("annualreviewsorg")>=0:currentParser="annualreviews";break;case e.indexOf("amsciepubcom")>=0:currentParser="amsci";break;case e.indexOf("atsjournalsorg")>=0:currentParser="atsjournal";break;case e.indexOf("ascetestliteratumonlinecom")>=0:case e.indexOf("ascestagliteratumonlinecom")>=0:currentParser="ascelibraryliterate";break;case e.indexOf("ascelibraryorg")>=0:currentParser="ascelibrary";break;case e.indexOf("ajronlineorg")>=0:currentParser="ajronline";break;case e.indexOf("ajphaphapublicationsorg")>=0:currentParser="ajph";break;case e.indexOf("ajpeorg")>=0:currentParser="ajpe";break;case e.indexOf("aiaaorg")>=0:currentParser="aiaa";break;case e.indexOf("hanserelibrarycom")>=0:currentParser="hanser";break;case e.indexOf("qsciencecom")>=0:currentParser="qscience";break;case e.indexOf("ejournalsdunckerhumblotd")>=0:currentParser="duncker";break;case e.indexOf("crcnetbasecom")>=0:currentParser="crcnetbase";break;case e.indexOf("cfapubsorg")>=0:currentParser="cfapubs";break;case e.indexOf("jgicamhnet")>=0:currentParser="jgi";break;case e.indexOf("euppublishingcom")>=0:currentParser="eupublish";break;case e.indexOf("gahmjcom")>=0:currentParser="gahmj";break;case e.indexOf("futuremedicinecom")>=0:currentParser="futuremedicine";break;case e.indexOf("informahealthcarecom")>=0:currentParser="informahealthcare";break;case e.indexOf("heacademyacuk")>=0:currentParser="heacademy";break;case e.indexOf("iijournalscom")>=0:currentParser="iijournals";break;case e.indexOf("thejnsorg")>=0:currentParser="thejns";break;case e.indexOf("mitpressjournalsorg")>=0:currentParser="mitpressjournal";break;case e.indexOf("nejmorg")>=0:currentParser="nejm";break;case e.indexOf("nrcresearchpresscom")>=0:currentParser="nrcPress";break;case e.indexOf("rsnaorg")>=0:currentParser="rsna";break;case e.indexOf("epubssiamorg")>=0:currentParser="siam";break;case e.indexOf("librarysegorg")>=0:currentParser="seg";break;case e.indexOf("apsjournalsapsnetorg")>=0:currentParser="apsjournals";break;case e.indexOf("avmajournalsavmaorg")>=0:currentParser="avmajournals";break;case e.indexOf("guilfordjournalscom")>=0:currentParser="guilfordPrs";break;case e.indexOf("mlajournalsorg")>=0:currentParser="mlajournals";break;case e.indexOf("morganclaypoolcom")>=0:currentParser="mcpubs";break;case e.indexOf("joponlineorg")>=0:currentParser="joponline";break;case e.indexOf("cerealchemistryaaccnetorg")>=0:currentParser="aacc";break;case e.indexOf("maneyonlinecom")>=0:currentParser="maneyonline";break;case e.indexOf("birpublicationsorg")>=0:currentParser="birpublications";break;case e.indexOf("iopscience")>=0:currentParser="iopscience";break;case e.indexOf("spiedigitallibraryorg")>=0:currentParser="spiedigital";break;case e.indexOf("jamanetworkcom")>=0:case e.indexOf("pubsashaorg")>=0:currentParser="silverchair";break;case e.indexOf("naturecom")>=0:currentParser="nature";break;case e.indexOf("endocrineorg")>=0:currentParser="endocrine";break;case e.indexOf("journalscambridgeorg")>=0:currentParser="cambridge";break;case e.indexOf("localhost")>=0:currentParser="localhost";break;case e.indexOf("plosoneorg")>=0:case e.indexOf("plosgeneticsorg")>=0:case e.indexOf("plospathogensorg")>=0:case e.indexOf("plosbiologyorg")>=0:case e.indexOf("ploscompbiolorg")>=0:case e.indexOf("journalsplosorg")>=0:case e.indexOf("plosntdsorg")>=0:case e.indexOf("plosmedicineorg")>=0:case e.indexOf("ploscollectionsorg")>=0:case e.indexOf("plosclinicaltrialsorg")>=0:currentParser="plos";break;case e.indexOf("sagepubcom")>0:case e.indexOf("bmjcom")>=0:case e.indexOf("geoscienceworldorg")>=0:case e.indexOf("oxfordjournalsorg")>=0:case e.indexOf("contenthealthaffairsorg")>=0:case e.indexOf("imagingbirjournalsorg")>=0:case e.indexOf("sepmonlineorg")>=0:case e.indexOf("embopressorg")>=0:case e.indexOf("aappublicationsorg")>=0:case e.indexOf("alphamedpressorg")>=0:case e.indexOf("physiologyorg")>=0:case e.indexOf("royalsocietypublishingorg")>=0:case e.indexOf("highwireorg")>=0&&e.indexOf("rsif")>=0:case e.indexOf("lyellcollectionorg")>0:case e.indexOf("dukejournalsorg")>=0:case e.indexOf("aacrmeetingabstractsorg")>=0:case e.indexOf("amjaomorg")>=0:case e.indexOf("amleaomorg")>=0:case e.indexOf("ampaomorg")>=0:case e.indexOf("proceedingsaomorg")>=0:case e.indexOf("amraomorg")>=0:case e.indexOf("journalsacrlorg")>=0:case e.indexOf("advancesnutritionorg")>=0:case e.indexOf("aptrcpsychorg")>=0:case e.indexOf("aacnjournalsorg")>=0:case e.indexOf("diabetesjournalsorg")>=0:case e.indexOf("ahajournalsorg")>=0:case e.indexOf("amjbotorg")>=0:case e.indexOf("ajcnnutritionorg")>=0:case e.indexOf("ajcpascpjournalsorg")>=0:case e.indexOf("ajccaacnjournalsorg")>=0:case e.indexOf("ajevonlineorg")>=0:case e.indexOf("ajhporg")>=0:case e.indexOf("ajnrorg")>=0:case e.indexOf("ajotaotapressnet")>=0:case e.indexOf("ajsonlineorg")>=0:case e.indexOf("ajtmhorg")>=0:case e.indexOf("aojuwpressorg")>=0:case e.indexOf("journalsasmorg")>=0:case e.indexOf("ash-saphematologylibraryorg")>=0:case e.indexOf("cmeanesthesia-analgesiaorg")>=0:case e.indexOf("anesthesia-analgesiaorg")>=0:case e.indexOf("animalfrontiersorg")>=0:case e.indexOf("annclinlabsciorg")>=0:case e.indexOf("annfammedorg")>=0:case e.indexOf("theannalscom")>=0:case e.indexOf("atsctsnetjournalsorg")>=0:case e.indexOf("ariiarjournalsorg")>=0:case e.indexOf("aacasmorg")>=0:case e.indexOf("aemasmorg")>=0:case e.indexOf("aauwpressorg")>=0:case e.indexOf("abstractsiovsorg")>=0:case e.indexOf("meetingascopubsorg")>=0:case e.indexOf("abstractshematologylibraryorg")>=0:case e.indexOf("aspetjournalsorg")>=0:case e.indexOf("biolbullorg")>=0:case e.indexOf("biolreprodorg")>=0:case e.indexOf("biobiologistsorg")>=0:case e.indexOf("bloodjournalhematologylibraryorg")>=0:case e.indexOf("bj360boneandjointorguk")>=0:case e.indexOf("bjjboneandjointorguk")>=0:case e.indexOf("bjrboneandjointorguk")>=0:case e.indexOf("journalsboneandjointorguk")>=0:case e.indexOf("birjournalsorg")>=0:case e.indexOf("bjprcpsychorg")>=0:case e.indexOf("bjrbirjournalsorg")>=0:case e.indexOf("bloodjournalorg")>=0:case e.indexOf("bvapublicationscom")>=0:case e.indexOf("bssaonlineorg")>=0:case e.indexOf("cfpca")>=0:case e.indexOf("cmajca")>=0:case e.indexOf("canminorg")>=0:case e.indexOf("cgpiiarjournalsorg")>=0:case e.indexOf("aacrjournalsorg")>=0:case e.indexOf("lifesciedorg")>=0:case e.indexOf("cro3org")>=0:case e.indexOf("ccjmorg")>=0:case e.indexOf("clinchemorg")>=0:case e.indexOf("cviasmorg")>=0:case e.indexOf("clinicaldiabetesjournalsorg")>=0:case e.indexOf("cjasnasnjournalsorg")>=0:case e.indexOf("clinmedrcpjournalorg")>=0:case e.indexOf("clinmednetprintsorg")>=0:case e.indexOf("clinmedresorg")>=0:case e.indexOf("cmrasmorg")>=0:case e.indexOf("cluwpressorg")>=0:case e.indexOf("ccnaacnjournalsorg")>=0:case e.indexOf("cmajopenca")>=0:case e.indexOf("cshperspectivescshlporg")>=0:case e.indexOf("perspectivesinmedicinecshlporg")>=0:case e.indexOf("cshprotocolscshlporg")>=0:case e.indexOf("symposiumcshlporg")>=0:case e.indexOf("crlacrlorg")>=0:case e.indexOf("crlnacrlorg")>=0:case e.indexOf("cmectsnetjournalsorg")>=0:case e.indexOf("ctsnetjournalsorg")>=0:case e.indexOf("dmfrbirjournalsorg")>=0:case e.indexOf("devbiologistsorg")>=0:case e.indexOf("diabetesdiabetesjournalsorg")>=0:case e.indexOf("carediabetesjournalsorg")>=0:case e.indexOf("spectrumdiabetesjournalsorg")>=0:case e.indexOf("dmmbiologistsorg")>=0:case e.indexOf("dmdaspetjournalsorg")>=0:case e.indexOf("eruwpressorg")>=0:case e.indexOf("economicgeologyorg")>=0:case e.indexOf("eelecsdlorg")>=0:case e.indexOf("jssecsdlorg")>=0:case e.indexOf("maecsdlorg")>=0:case e.indexOf("sslecsdlorg")>=0:case e.indexOf("ecstecsdlorg")>=0:case e.indexOf("eslecsdlorg")>=0:case e.indexOf("elifeelifesciencesorg")>=0:case e.indexOf("endocrineconnectionscom")>=0:case e.indexOf("ercendocrinology-journalsorg")>=0:case e.indexOf("endoendojournalsorg")>=0:case e.indexOf("ecasmorg")>=0:case e.indexOf("eje-onlineorg")>=0:case e.indexOf("erjersjournalscom")>=0:case e.indexOf("ermersjournalscom")>=0:case e.indexOf("errersjournalscom")>=0:case e.indexOf("ersjournalscom")>=0:case e.indexOf("epphysocorg")>=0:case e.indexOf("fasebjorg")>=0:case e.indexOf("fieldguidesgsapubsorg")>=0:case e.indexOf("g3journalorg")>=0:case e.indexOf("genesdevcshlporg")>=0:case e.indexOf("geneticsorg")>=0:case e.indexOf("genomeaasmorg")>=0:case e.indexOf("genomecshlporg")>=0:case e.indexOf("gsabulletingsapubsorg")>=0:case e.indexOf("memoirsgsapubsorg")>=0:case e.indexOf("specialpapersgsapubsorg")>=0:case e.indexOf("geologygsapubsorg")>=0:case e.indexOf("geospheregsapubsorg")>=0:case e.indexOf("ghspjournalorg")>=0:case e.indexOf("guidetoptpracticeaptaorg")>=0:case e.indexOf("haematologicaorg")>=0:case e.indexOf("asheducationbookhematologylibraryorg")>=0:case e.indexOf("hortsciashspublicationsorg")>=0:case e.indexOf("horttechashspublicationsorg")>=0:case e.indexOf("iviiarjournalsorg")>=0:case e.indexOf("iaiasmorg")>=0:case e.indexOf("ijssgmjournalsorg")>=0:case e.indexOf("iovsorg")>=0:case e.indexOf("jaoaorg")>=0:case e.indexOf("jcbrupressorg")>=0:case e.indexOf("journalofanimalscienceorg")>=0:case e.indexOf("japrfassorg")>=0:case e.indexOf("jbasmorg")>=0:case e.indexOf("jbcorg")>=0:case e.indexOf("jcsbiologistsorg")>=0:case e.indexOf("jcmasmorg")>=0:case e.indexOf("jcoascopubsorg")>=0:case e.indexOf("jdentaledorg")>=0:case e.indexOf("joeendocrinology-journalsorg")>=0:case e.indexOf("jebbiologistsorg")>=0:case e.indexOf("jemrupressorg")>=0:case e.indexOf("jgprupressorg")>=0:case e.indexOf("virsgmjournalsorg")>=0:case e.indexOf("jhruwpressorg")>=0:case e.indexOf("jimmunolorg")>=0:case e.indexOf("jswconlineorg")>=0:case e.indexOf("jrheumorg")>=0:case e.indexOf("jlrorg")>=0:case e.indexOf("jleukbioorg")>=0:case e.indexOf("jmmsgmjournalsorg")>=0:case e.indexOf("jmeendocrinology-journalsorg")>=0:case e.indexOf("jneurosciorg")>=0:case e.indexOf("jnmsnmjournalsorg")>=0:case e.indexOf("techsnmjournalsorg")>=0:case e.indexOf("jnnutritionorg")>=0:case e.indexOf("jopascopubsorg")>=0:case e.indexOf("jorthodmaneyjournalsorg")>=0:case e.indexOf("jpetaspetjournalsorg")>=0:case e.indexOf("jpphysocorg")>=0:case e.indexOf("jaaosorg")>=0:case e.indexOf("jaaplorg")>=0:case e.indexOf("jaahaorg")>=0:case e.indexOf("jabfmorg")>=0:case e.indexOf("jacnorg")>=0:case e.indexOf("jadaadaorg")>=0:case e.indexOf("japmaonlineorg")>=0:case e.indexOf("journalashspublicationsorg")>=0:case e.indexOf("jasnasnjournalsorg")>=0:case e.indexOf("jesecsdlorg")>=0:case e.indexOf("jnccnorg")>=0:case e.indexOf("jtcsctsnetjournalsorg")>=0:case e.indexOf("jultrasoundmedorg")>=0:case e.indexOf("jviasmorg")>=0:case e.indexOf("journalofvisionorg")>=0:case e.indexOf("jwildlifedisorg")>=0:case e.indexOf("jwatchorg")>=0:case e.indexOf("maneyjournalsorg")>=0:case e.indexOf("biologistsorg")>=0:case e.indexOf("rcpsychorg")>=0:case e.indexOf("snmjournalsorg")>=0:case e.indexOf("journalsfassorg")>=0:case e.indexOf("labmedascpjournalsorg")>=0:case e.indexOf("leuwpressorg")>=0:case e.indexOf("ljuwpressorg")>=0:case e.indexOf("learnmemcshlporg")>=0:case e.indexOf("lithospheregsapubsorg")>=0:case e.indexOf("lbruwpressorg")>=0:case e.indexOf("mbioasmorg")>=0:case e.indexOf("micsgmjournalsorg")>=0:case e.indexOf("mmbrasmorg")>=0:case e.indexOf("mcbasmorg")>=0:case e.indexOf("mcponlineorg")>=0:case e.indexOf("molbiolcellorg")>=0:case e.indexOf("mendendojournalsorg")>=0:case e.indexOf("molpharmaspetjournalsorg")>=0:case e.indexOf("monuwpressorg")>=0:case e.indexOf("mycologiaorg")>=0:case e.indexOf("npjuwpressorg")>=0:case e.indexOf("neurologyorg")>=0:case e.indexOf("cmeneurologyorg")>=0:case e.indexOf("cpneurologyorg")>=0:case e.indexOf("bjjprocsboneandjointorguk")>=0:case e.indexOf("journalpdaorg")>=0:case e.indexOf("pdiconnectcom")>=0:case e.indexOf("pharmrevaspetjournalsorg")>=0:case e.indexOf("kappanmagazineorg")>=0:case e.indexOf("ptjournalaptaorg")>=0:case e.indexOf("physiciansfirstwatchorg")>=0:case e.indexOf("journalsphysocorg")>=0:case e.indexOf("plantcellorg")>=0:case e.indexOf("aspbjournalsorg")>=0:case e.indexOf("plantphysiolorg")>=0:case e.indexOf("pnasorg")>=0:case e.indexOf("psfassorg")>=0:case e.indexOf("pasfassorg")>=0:case e.indexOf("pbrcpsychorg")>=0:case e.indexOf("psychosomaticmedicineorg")>=0:case e.indexOf("radiologictechnologyorg")>=0:case e.indexOf("rbmacrlorg")>=0:case e.indexOf("rphrendojournalsorg")>=0:case e.indexOf("reproduction-onlineorg")>=0:case e.indexOf("rcrcjournalcom")>=0:case e.indexOf("reggsapubsorg")>=0:case e.indexOf("rorreproduction-onlineorg")>=0:case e.indexOf("rnajournalcshlporg")>=0:case e.indexOf("saejournalsorg")>0:case e.indexOf("sciencemagorg")>=0:case e.indexOf("conferencessmpteorg")>=0:case e.indexOf("journalsmpteorg")>=0:case e.indexOf("standardssmpteorg")>=0:case e.indexOf("endocrinology-journalsorg")>=0:case e.indexOf("sgmjournalsorg")>=0:case e.indexOf("jnumedmtgsnmjournalsorg")>=0:case e.indexOf("studiesinmycologyorg")>=0:case e.indexOf("subuwpressorg")>=0:case e.indexOf("journaltelospresscom")>=0:case e.indexOf("thenationshealthaphapublicationsorg")>=0:currentParser="highwire";break;default:currentParser=""}return currentParser},currentParser=Utility.analyzeParser(domainString);var isSuggestionParser="undefined"!=typeof suggestionParser&&""!=suggestionParser;if(isSuggestionParser&&(CWPDFReaderConfig.parser=suggestionParser),isSuggestionParser||"googlebooks"!=currentParser||"Books"==(CwZ(".hdtb_mitem.hdtb_msel.hdtb_imb").text()||CwZ(".hdtb-mitem.hdtb-msel.hdtb-imb").text()||CwZ(".kd-appbar .kd-appname a").text())?""!=currentParser&&(CWPDFReaderConfig.parser=currentParser):currentParser="",""!=CWPDFReaderConfig.parser){var parserClass="CWParser_"+CWPDFReaderConfig.parser;if(CWPDFReaderConfig.readerMode==CWPDFReaderMode.Chrome)chrome.extension.sendRequest({message:"getParser",data:{url:"js/extraction/"+CWPDFReaderConfig.parser+".js"}}),evalParser();else if(CWPDFReaderConfig.readerMode==CWPDFReaderMode.Publisher){var parURL="js/extraction/"+CWPDFReaderConfig.parser+".js?v="+cPDF.version;cPDF.addScript(parURL,function(){CWParser=window[parserClass]})}else if(CWPDFReaderConfig.readerMode==CWPDFReaderMode.Webimporter){var parserURL="js/extraction/"+CWPDFReaderConfig.parser+".js";Config.addScript(parserURL,function(){CWParser=window[parserClass],BmL.load(parserClass)})}else CWParser=window[parserClass]}
//# sourceMappingURL=../../../sourcemaps/js/extraction/parsers.js.map