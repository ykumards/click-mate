const facebook_clickbait = function(node) {
	//const blocks = [...node.getElementsByClassName('_4-u2 mbm _5jmm _5pat _5v3q _4-u8')]; 
	const blocks = [...node.getElementsByClassName('userContentWrapper _5pcr')];     //for transparency
	const links = [...node.getElementsByClassName('mbs _6m6 _2cnj _5s6c')];
  

      var mark_clickbait = function( el) {
      var request = new XMLHttpRequest();
      var desc = el.innerText;
      var fbURL = location.href;
        request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          var result = JSON.parse(request.responseText);
          console.log(result);
          var clickbait =  result.clickbait_percent;
          if(clickbait > 70){
        
      // var style = document.createElement('link');    //this is a script type object
      // style.rel = 'stylesheet';  //import a stylesheet
      // style.type = 'text/css';
      // style.href = chrome.extension.getURL('styles.css'); //this stylesheet
      var iDiv = document.createElement('div'); 
      iDiv.className = "curtain";
      //iDiv.setAttribute("width", "1024");

        let html = "<ul style='position:relative;width:100%;height=100%;background-color:#F27935;color:#fff'> Clickbait</ul>";
        el.insertAdjacentHTML('afterbegin', html);
        $( ".curtain" ).prepend( el );
        //el.appendChild(iDiv);
       }
      }
    };

     console.log("sending request");
    request.open("GET", "https://click-mate.herokuapp.com/?headline="+desc , true);
    request.send();
  }; 
	
    // var extract_headline = function(el) {
    // 	var link = el.getElementsByClassName('mbs _6m6 _2cnj _5s6c');
    //   //console.log(link);
    // 	var headline = link[0].innerText;
    //   mark_clickbait(headline,link);
    // }

     var extract_headline = function(el) {
     var link = el.getElementsByClassName('mbs _6m6 _2cnj _5s6c');
      //console.log(link);
     var headline = link[0].innerText;
      mark_clickbait(headline,link);
    }
    links.forEach(mark_clickbait);

    // blocks.forEach(extract_headline);
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

