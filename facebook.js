const facebook_clickbait = function(node) {
	const blocks = [...node.getElementsByClassName('_4-u2 mbm _5jmm _5pat _5v3q _4-u8')]; //for transparency
	//const links = [...node.getElementsByClassName('mbs _6m6 _2cnj _5s6c')];

	blocks.forEach(extract_headline);
	
    var extract_headline = function(el) {
    	var link = el.getElementsByClassName('mbs _6m6 _2cnj _5s6c');
    	var headline = link.innerText;
    	console.log(link.innerText);
    	mark_clickbait(el);
    }

    var mark_clickbait = function(el) {
    	var URL = location.href;
    	var request = new XMLHttpRequest();
   	    xmlhttp.onreadystatechange = function() {
  			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
  				var headline = JSON.parse(request.responseText);
  				var clickbait = headline.clickbait_percent;
  				if(clickbait < 60){
        			let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#2ecc71;color:#fff;border-radius:5px'>👍 Not Clickbait</ul>";
        			el.insertAdjacentHTML('afterend', html);
  				}
  				else if(clickbait > 90){
    				let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>💁 This is Clickbait</ul>";
    				el.insertAdjacentHTML('afterend', html);
  				}
  				else {
    				let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#e67e22;color:#fff;border-radius:5px'>👻 "+clickbait+"% clickbait</ul>";
    				el.insertAdjacentHTML('afterend', html);
  				}
			}
		};
	};
request.open("GET", "https://clickbait-detector.herokuapp.com/detect?headline="+link , true);
  request.send();
  };
}