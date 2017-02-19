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
xmlhttp.open('POST', 'http://my.server.url:8801/', true);
xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xmlhttp.send('url=' + encodeURIComponent(youtubeURL));