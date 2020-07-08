var fimage=null;
var bimage=null;
var fcanvas;
var bcanvas;
function upload1(){
  var file=document.getElementById("finput");
  fimage=new SimpleImage(file);
  fcanvas=document.getElementById("can1");
  fimage.drawTo(fcanvas);
}
function upload2(){
  var file= document.getElementById("binput");
  bimage=new SimpleImage(file);
  bcanvas= document.getElementById("can2");
  bimage.drawTo(bcanvas);
}
function greenscreen(){
  if(fimage==null||!fimage.complete()){
     alert("Foreground image not loaded");
  }
  else if(bimage==null||!bimage.complete()){
    alert("background image not loaded");
  }
  clearcanvas();
  var final=createcomposite();
  final.drawTo(fcanvas);
}

function createcomposite(){
  var output= new SimpleImage(fimage.getWidth(),fimage.getHeight());
  for (var pixel of fimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > 240) {
       var bgPixel = bimage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }else{
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}
function clearcanvas(){
  doClear(fcanvas);
  doClear(bcanvas);
}
function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}
