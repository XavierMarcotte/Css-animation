const containerSlides = document.querySelector('.container-slides')
const slides = document.querySelectorAll('.slide')
const slideSize = 500

let positionClic = 0
let positionGlissade = 0
let posInitiale
let posFinale
let limitePourDeplacer = 100

containerSlides.addEventListener('mousedown', dragStart);

function dragStart(e){
  e.preventDefault();

  posInitiale = containerSlides.offsetLeft;
  positionClic = e.clientX;

  document.addEventListener('mousemove', bougerLeContainerASlides);
  document.addEventListener('pointerup', finDuDrag);
}

function bougerLeContainerASlides(e){
  // console.log(`ANCIEN : ${positionClic}NOUVEAU : ${e.clientX}`);
  positionGlissade = positionClic - e.clientX;
  positionClic = e.clientX;

  if(containerSlides.offsetLeft - positionGlissade > 0 || containerSlides.offsetLeft - positionGlissade < -2000){
    // console.log("STOP");
    return;
  }

  containerSlides.style.left = `${containerSlides.offsetLeft - positionGlissade}px`;
}

function finDuDrag(e){

  posFinale = containerSlides.offsetLeft;

  if(posFinale - posInitiale < -limitePourDeplacer){
    bougerLesSlides(1);
  } 
  else if (posFinale - posInitiale > limitePourDeplacer){
    bougerLesSlides(-1);
  }
  else {
    containerSlides.style.left = `${posInitiale}px`;
  }


  document.removeEventListener('mousemove', bougerLeContainerASlides);
  document.removeEventListener('pointerup', finDuDrag);
}


function bougerLesSlides(direction){

  containerSlides.classList.add('glissade');

  if(direction === 1){
    containerSlides.style.left = `${posInitiale - slideSize}px`;
  }
  else if (direction === -1){
    containerSlides.style.left = `${posInitiale + slideSize}px`;
  }

}
containerSlides.addEventListener('transitionend', () => {
  containerSlides.classList.remove('glissade');
})