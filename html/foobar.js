var isTouchDevice = "ontouchstart" in document.documentElement;
var BUTTON_DOWN   = isTouchDevice ? "touchstart" : "mousedown";
var BUTTON_UP     = isTouchDevice ? "touchend"   : "mouseup";

function Foobar() {
  Foobar.prototype.load_jquery = function() {
    var j    = document.createElement("script");
    j.type   = "text/javascript";
    j.src    = "jquery.js";
    document.getElementsByTagName("head")[0].appendChild(j);
    return j;}
  Foobar.prototype.run_on_ready = function(k) {
    this.load_jquery().onload = k;}
  Foobar.prototype.createButton =
    function(id, label, callback, callbackUp) {
      var b = $("<button type = 'button' class = 'Default'>");
      b.attr("id", id);
      b.text(label);
      if(callback)   b.bind(BUTTON_DOWN, callback);
      if(callbackUp) b.bind(BUTTON_UP,   callbackUp);
      return b;}
  Foobar.prototype.createGPIOButton = function(gpio, label) {
    var k = (function(event) {this.toggleValue(gpio);}).bind(this);
    return this.createButton("gpio" + gpio, label, k);}
  Foobar.prototype.toggleValue = function(gpio) {
    var b = $("#gpio" + gpio);
    var c = (b.attr("class") == "LOW" ? "HIGH" : "LOW");
    b.attr("class", c);};
}
