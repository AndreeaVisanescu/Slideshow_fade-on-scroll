//variabile globale pentru a determina viewportul, valori minime-maxime in care reclama e vizibila
let start_position=0;
let length_scroll=0;
let finish_position=0;

window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  let percent=0;
  let nr_photos=cache.children.length-1;
  let step=Math.round(100/(nr_photos));


  if(scroll>=start_position && scroll<finish_position)
  {percent=((scroll-start_position)/length_scroll)*100;

  if(percent%step==0 || (percent/step-Math.floor(percent/step)<0.3)|| (Math.ceil(percent/step)-percent/step<0.3)) 
    {
      // console.log(percent/step-Math.floor(percent/step),' cu100%');
    display_100(Math.round(percent/step));}
    else
    {
      // console.log(Math.floor(percent/step),' ',Math.ceil(percent/step) , ' cu 50%')
    display_50(Math.floor(percent/step),Math.ceil(percent/step));}
  }

});

let cache = document.getElementById('ads');

function preloadImage(url) {
    var img = new Image();
    img.src = url;
    img.style = "width:400px;height:500px;";
    cache.appendChild(img);
}

preloadImage("assets/1.jpg");
preloadImage("assets/2.jpg");
preloadImage("assets/3.jpg");
preloadImage("assets/4.jpg");
preloadImage("assets/5.jpg");
preloadImage("assets/6.jpg");
// preloadImage("assets/7.jpg");
// preloadImage("assets/8.jpg");
// preloadImage("assets/9.jpg");
// preloadImage("assets/10.jpg");
// preloadImage("assets/11.jpg");
// preloadImage("assets/12.jpg");
// preloadImage("assets/13.jpg");
// preloadImage("assets/14.jpg");
// preloadImage("assets/15.jpg");
display_100(0);


function display_50 (pos_1,pos_2){
for(i=0;i<cache.children.length;i++)
if(i==pos_1 || i==pos_2)
{ 
  cache.children[i].style = "opacity:0.5;";
}
 else {
  cache.children[i].style = "opacity:0;";
 }
}


function display_100 (pos_1){
  for(i=0;i<cache.children.length;i++)
  if(i==pos_1 )
   { 
    cache.children[i].style = "opacity:1;";
  }
   else {
    cache.children[i].style = "opacity:0;";
   }
  }


window.addEventListener("load", (event) => {
  adsElement = document.querySelector("#ads");

  createObserver();
}, false);

function createObserver() {
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(adsElement);
}

// valoarea la care mi se declanseaza observatorul pentru vizibilitatea elementului de 100%
function buildThresholdList() {
  let thresholds = [];
  thresholds.push(1);
  return thresholds;
}

// aici ma asigur ca elementul este vizibil 100% si determin si pozitiile absolute intre care se afla
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if(entry.intersectionRatio ==1 )
    {
    if(entry.intersectionRect.top>length_scroll)
    {length_scroll=entry.intersectionRect.top;
    start_position=document.documentElement.scrollTop;
    finish_position=start_position+length_scroll;}
    }
  });
}
