
document.addEventListener('DOMContentLoaded', ()=>{
  const mapContainer = document.getElementById('map');
  const modalsSelector =  document.querySelectorAll('.modal');
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const calculatorSelects = document.querySelectorAll('.calculator-select');

  // init scripts
  svg4everybody();
  modalsSelector.forEach((element) =>{
    $(element).iziModal();
  });

  modalTriggers.forEach((trigger)=>{
    trigger.addEventListener('click', function() {
      const id = this.dataset.open
      const modal = document.querySelectorAll(`.modal[data-modal=${id}]`);
      $(modal).iziModal('open');
    });
  });
  
  calculatorSelects.forEach((select)=>{

    select.addEventListener('click', ()=>{
      select.classList.contains('active') ? 
      select.classList.remove('active') : select.classList.add('active')
    });
  
  });
  

  if(mapContainer) {
        const init = function init() {
          const myMap = new ymaps.Map("map", {
            center: [60.028979, 30.331195],
            zoom: 16,
            controls: ["zoomControl"],
          });
    
          const myPlacemark = new ymaps.Placemark(
            [60.028979, 30.331195 ],
            {
              balloonContent: "г. Санкт-Петербург, ул. Есенина 1к1, ст.м. Озерки",
            },
            {
              iconImageHref: "/img/marker.svg",
              iconLayout: "default#image",
              iconImageSize: [42, 56],
              iconImageOffset: [-21, -56],
            }
          );
          myMap.geoObjects.add(myPlacemark);
          
          mapContainer.querySelectorAll('.ymaps-2-1-77-ground-pane').forEach((element)=>{
              element.style.filter = 'grayscale(1)';
          });
        };
        ymaps.ready(init);      
      }
});

// window.addEventListener('resize', () => {
//   console.log( window.innerWidth);
// })
