var _jquery_available = false;

function load_jquery() {
  var cb = function() {
    alert("jquery is loaded");
    _jquery_available = true;}
  var j    = document.createElement("script");
  j.type   = "text/javascript";
  j.src    = "jquery.js";
  j.onload = cb;
  document.getElementsByTagName("head")[0].appendChild(j);}

function foo() {
  if(_jquery_available)
    alert("jquery is available");
  else
    alert("jquery is not available");}

load_jquery();
