const facebook_clickbait = function(node) {
	const blocks = [...node.getElementsByClassName('userContentWrapper _5pcr')];     //for transparency
  const full_block = [...node.getElementsByClassName('_4-u2 _4-u8')]
	const links = [...node.getElementsByClassName('mbs _6m6 _2cnj _5s6c')];
  //importing the sytle sheet
  var style = document.createElement('link');    //this is a script type object
  style.rel = 'stylesheet';  //import a stylesheet
  style.type = 'text/css';
  style.href = chrome.extension.getURL('styles.css'); //this stylesheet
  document.getElementsByTagName("head")[0].appendChild(style)
  

  var mark_clickbait = function( el) {
    var request = new XMLHttpRequest();
    var desc = el.innerText;
    var fbURL = location.href;

    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {

        var result = JSON.parse(request.responseText);
        console.log(result);
        var clickbait =  result.clickbait_percent;
        if(clickbait > 70) {
          el.classList.add('curtain');
          let html = "<ul style='position:relative;width:100%;height=100%;background-color:red;color:#fff'> Clickbait</ul>";
          el.insertAdjacentHTML('afterbegin', html);
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
};


const observer = new MutationObserver(function(mutations) {
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

