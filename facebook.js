const facebook_clickbait = function(node) {
	//const blocks = [...node.getElementsByClassName('_4-u2 mbm _5jmm _5pat _5v3q _4-u8')]; 
	const blocks = [...node.getElementsByClassName('userContentWrapper _5pcr')];     //for transparency
	//const links = [...node.getElementsByClassName('mbs _6m6 _2cnj _5s6c')];
	
	blocks.forEach(extract_headline);
	
    var extract_headline = function(el) {
    	var link = el.getElementsByClassName('mbs _6m6 _2cnj _5s6c');
    	var headline = link[0].innerText;
    	var clickbait  = mark_clickbait(headline);
  		if(clickbait > 20){
    		
   			//var style = el.createElement('script');    //this is a script type object
			// style.rel = 'stylesheet';  //import a stylesheet
			// style.type = 'text/css';
			// style.href = chrome.extension.getURL('styles.css'); //this stylesheet

    		let html = "<ul style='position:relative;width:100%;height=100%;background-color:#F27935;color:#fff'> Clickbait</ul>";
			el.insertAdjacentHTML('afterbegin', html);
  		}
    }

    var mark_clickbait = function(desc) {
    	var fbURL = location.href;
    	var request = new XMLHttpRequest();
   	    xmlhttp.onreadystatechange = function() {
  			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
  				var result = JSON.parse(request.responseText);
  				return result.clickbait_percent;
 			}
		};
	};  
  request.open("GET", "https://cryptic-scrubland-18258.herokuapp.com/?headline="+desc , true);
  request.send();
};


const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // ELEMENT_NODE
                facebook_clickbait(node);
            }
        });
    });
});

const config = { attributes: false, childList: true, characterData: false, subtree: true }

observer.observe(document.body, config);

facebook_clickbait(document.body);

