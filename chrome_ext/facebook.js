const facebook_clickbait = function(node) {
	const blocks = [...node.getElementsByClassName('userContentWrapper _5pcr')]; 
  // console.log(icon_url);

  //importing the sytle sheet
  var style = document.createElement('link');    
  style.rel = 'stylesheet';  //import a stylesheet
  style.type = 'text/css';
  style.href = chrome.extension.getURL('styles.css'); //this stylesheet
  document.getElementsByTagName("head")[0].appendChild(style)
  

  var mark_clickbait = function(el, desc, headline_block) {
    var request = new XMLHttpRequest();
    var fbURL = location.href;

    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        console.log(result);
        var clickbait =  result.clickbait_percent;
        if(clickbait > 70) {
          el.classList.add('curtain');
          var div = el.getElementsByClassName('_42nr');
          var mate_button_span = document.createElement('span'); 
          var mate_div = document.createElement('div');
          mate_div.classList.add('matebutton');
          var mate_button = document.createElement('button');
          // mate_button.setAttribute("style", "position:absolute;float:right;width:40px;height=40px;background: url(icon_url);background-color:red;color:#fff");
          // mate_button_span.appendChild(mate_button);
          mate_div.appendChild(mate_button);
          mate_button_span.appendChild(mate_div);
          div[0].appendChild(mate_button_span);
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
const icon_url = chrome.extension.getURL('logo.png');
observer.observe(document.body, config);

facebook_clickbait(document.body);

