const facebook_clickbait = function(node) {
	const blocks = [...node.getElementsByClassName('userContentWrapper _5pcr')]; 

  //importing the sytle sheet
  var style = document.createElement('link');    
  style.rel = 'stylesheet';  //import a stylesheet
  style.type = 'text/css';
  style.href = chrome.extension.getURL('styles.css'); //this stylesheet
  document.getElementsByTagName("head")[0].appendChild(style)
  

  var mark_clickbait = function(el, desc, headline_block) {
    var request = new XMLHttpRequest();
    // var desc = el.innerText;
    var fbURL = location.href;

    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        console.log(result);
        var clickbait =  result.clickbait_percent;
        if(clickbait > 70) {
          el.classList.add('curtain');
          let html = "<ul style='position:relative;width:17%;height=100%;background-color:red;color:#fff'> Clickbait</ul>";
          headline_block[0].insertAdjacentHTML('afterbegin', html);
        }
      }
    };

    console.log("sending request");
    request.open("GET", "https://click-mate.herokuapp.com/?headline="+desc , true);
    request.send();
  }; 
	
  var extract_headline_block = function(el) {
    var headline_block = el.getElementsByClassName('mbs _6m6 _2cnj _5s6c');
    if (headline_block.length == 0) return;
    
    var hl = headline_block.item(0)
    var headline = hl.innerText;
    mark_clickbait(el, headline, headline_block);
  }

  blocks.forEach(extract_headline_block);
};


const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
    if (node.nodeType === 1) { // ELEMENT_NODE
      facebook_clickbait(node);
    }});
  });
});

const config = { attributes: false, childList: true, characterData: false, subtree: true }

observer.observe(document.body, config);

facebook_clickbait(document.body);

