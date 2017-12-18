/*
To define an image map for the web client put something like this in
your html file:

  <script type="text/javascript" src="active-image.js"></script>
  <script type="text/javascript">
    var a = new Active_Image({
      mapfile:    "house.png",
      map_width:  400,
      map_height: 700,
      p: [
        {x: 100, y: 500, label: "Label 1", tip: "here is a tip"},
        {x: 200, y: 200, label: "Label 2", tip: "here is tip 2"},
        {x: 300, y: 700, label: "Label 3", tip: "and tip 3"},
      ]});

    a.run_on_ready()
  </script>

The `mapfile' entry points to the map image file that is on your disk
and the `map_width' and `map_height' values define--in pixels--how
much space that image takes up on your browser screen.

The `p' entry describes an array of active points that get overlayed
on the map. The `x' and `y' coordinates describe the centers of the
points---horizontal and vertical---and are *not* in pixels. The
software considers the image to be 1000 units wide by 1000 units high
whether it is square or not and you place the points with these
units. So for example if you want a point to be centered at a location
1/4 of the way across the image and 3/4 of the way up you make x and y
250 and 750 respectively.

The `label' text gets displayed inside the point and the `tip' gets
displayed when you mouse over it. The label can only be a very few
characters long.
*/

function Active_Image(m) {

  m      = m || {};
  this.m = m;
  this.label_size = 14;

  // Convert user coordinates to actual.
  if(m.p != null)
    for(var i = 0; i < m.p.length; i++) {
      m.p[i].x = Math.round(m.map_width * m.p[i].x/1000);
      m.p[i].y = Math.round(m.map_height * (1 - m.p[i].y/1000));}

  Active_Image.prototype.load_jquery = function() {
    var j  = document.createElement("script");
    j.type = "text/javascript";
    j.src  = "jquery-3.2.1.min.js";
    document.getElementsByTagName("head")[0].appendChild(j);
    return j;};
  
  Active_Image.prototype.run_on_ready = function(k) {
    k = k || this.build_image_map.bind(this);
    this.load_jquery().onload = k;
    return this;};

  Active_Image.prototype.build_image_map = function() {
    this.map();
    this.svg();};
  
  Active_Image.prototype.svg = function() {
    var m  = this.m;
    var s = $("<style type = 'text/css'></style>");
    s.text(".node {\n" +
           ("fill: black; fill-opacity: .3;\n" +
            "stroke: black; stroke-opacity: 1; stroke-width: 5}\n") +
           ".label {\n" +
           ("fill: black;\n" +
            "font-family: sans-serif; font-weight: bold; " +
            "font-size: " + this.label_size + "px}\n"));
    $("head").append(s);};

  Active_Image.prototype.svg_elt = function(elt) {
    return $(document.createElementNS(
      "http://www.w3.org/2000/svg", elt));};

  Active_Image.prototype.map = function() {
    var m = this.m;
    var s = this.svg_elt("svg");
    s.css({"background-image" : ("url('" + m.mapfile + "')"),
           "background-size" : (m.map_width  + "px " +
                                m.map_height + "px")}).
      attr({"width"  : (m.map_width  + "px"),
            "height" : (m.map_height + "px")});
    for(var i = 0; i < m.p.length; i++) s.append(this.point(i));
    $("body").append(s);};

  Active_Image.prototype.point = function(i) {
    var se = this.svg_elt;
    return se("g").
      append(se("text").
             attr({
               "class" : "label",
               "x"     : this.labelx(i),
               "y"     : this.labely(i)}).
             text(this.m.p[i].label)).
      append(se("ellipse").
             attr({
               "cx" : this.m.p[i].x,
               "cy" : this.m.p[i].y,
               "rx" : 35,  "ry" : 25,
               "id" : ("ellipse" + i),
               "class"   : "node",
               "state"   : "off",
               "onclick" : ("Active_Image.prototype." +
                            "toggle_state(this)")}). 
             append(se("title").
                    text(this.m.p[i].tip)));};
    
  Active_Image.prototype.labelx = function(i) {
    return (this.m.p[i].x -
            m.p[i].label.length * (0.6 * this.label_size)/2);};

  Active_Image.prototype.labely = function(i) {
    return this.m.p[i].y + (0.8 * this.label_size)/2;};

  Active_Image.prototype.toggle_state = function(elt) {
    var s = "off", c = "black";
    if($(elt).attr("state") == "off") {
      s = "on";
      c = "red";}
    $(elt).attr("state", s);
    $(elt).css("fill", c);
    $(elt).css("stroke", c);};
}
