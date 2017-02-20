const facebook_clickbait = function(node) {
	const blocks = [...node.getElementsByClassName('_4-u2 mbm _5jmm _5pat _5v3q _4-u8')]; //for transparency
	//const links = [...node.getElementsByClassName('mbs _6m6 _2cnj _5s6c')];
	
	blocks.forEach(extract_headline);
	
    var extract_headline = function(el) {
    	var link = el.getElementsByClassName('mbs _6m6 _2cnj _5s6c');
    	var headline = link.innerText;
    	console.log(link.innerText);

    	var clickbait mark_clickbait(el);
  		if(clickbait > 90){
    		//let html = "<ul style='position:absolute;padding:5px;font-size:12px;line-height:1.8;background-color:blue;color:#fff;border-radius:5px'> Clickbait </ul>";
    		var style = document.createElement('div');
			style.rel = 'stylesheet';  //import a stylesheet
			style.type = 'text/css';
			style.href = chrome.extension.getURL('styles.css'); //this stylesheet
			
    		//el.insertAdjacentHTML('afterend', html);
  		}
    }

    var mark_clickbait = function(el) {
    	var fbURL = location.href;
    	var request = new XMLHttpRequest();
   	    xmlhttp.onreadystatechange = function() {
  			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
  				var headline = JSON.parse(request.responseText);
  				return headline.clickbait_percent;
 			}
		};
	};
  request.open("GET", "https://clickbait-detector.herokuapp.com/detect?headline="+link , true);
  request.send();
  };
}