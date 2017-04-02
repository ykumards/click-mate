const facebook_clickbait = function(node) {
	const blocks = [...node.getElementsByClassName('fbUserContent _5pcr')]; 

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
      if (request.readyState == 4) {
        if (request.status == 200) {
          var result = JSON.parse(request.responseText);
          // console.log(result);
          var clickbait =  result.clickbait_percent;
          if(clickbait > 70) {
            el.classList.add('curtain');
          }
        }
      }
    };

    // console.log("sending request");
    request.open("GET", "https://clickmate.herokuapp.com/?headline="+desc , true);
    request.send();
  }; 
	
  var extract_headline_block = function(el) {
    var headline_block = el.getElementsByClassName('mbs _6m6 _2cnj _5s6c');
    if (headline_block.length == 0) return;
    
    var hl = headline_block.item(0)
    var headline = hl.innerText;
    var regex = new RegExp('/[^\x00-\x7F]/g');
    var punctuationless = headline.replace(regex,"");
    // console.log("found punct");
    mark_clickbait(el, punctuationless, headline_block);
  } 

  blocks.forEach(extract_headline_block);
};


const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
    if (node.nodeType === 1) {
      facebook_clickbait(node);
    }});
  });
});

const config = { attributes: false, childList: true, characterData: false, subtree: true }
observer.observe(document.body, config);
facebook_clickbait(document.body);

