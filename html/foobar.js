function Foobar() {
  Foobar.prototype.load_jquery = function() {
    var j    = document.createElement("script");
    j.type   = "text/javascript";
    j.src    = "jquery.js";
    document.getElementsByTagName("head")[0].appendChild(j);
    return j;}
  Foobar.prototype.run_on_ready = function(k) {
    this.load_jquery().onload = k;}}
