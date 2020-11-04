
document.addEventListener('DOMContentLoaded', ()=>{
  const mapContainer = document.getElementById('map');
  const modalsSelector =  document.querySelectorAll('.modal');
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const calculatorSelects = document.querySelectorAll('.calculator-select');
  const sliders = document.querySelectorAll('.slider');
  const timers = document.querySelectorAll('.timer');
  const accordeonButtons = document.querySelectorAll('.accordeon__title');
  const maskedPhones = document.querySelectorAll('input[data-masked="phone"]');
  const modals = document.querySelectorAll('.modal');

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
  
  
  let i = 0;
  calculatorSelects.forEach((select)=>{
    select.addEventListener('click', ()=>{
      let sum = 0;
      let sumWithoutSale = 0;
      let count = document.querySelectorAll('.calculator-select.active');
      const textCount = document.querySelector('p[data-calculator-count=""]');
      const totalPrice = document.querySelector('strong[data-calculator-total=""]');
      const totalPriceWithoutSale = document.querySelector('span[data-calculator-sale=""]');
      const price = +select.dataset.price;
      const priceWithoutSale = +select.dataset.sale;
      
      if(select.classList.contains('active')) {
        i--;
        select.classList.remove('active')
        sum -= price
        sumWithoutSale -= priceWithoutSale
        textCount.innerHTML = i
        count.forEach(current => {
          const price = +current.dataset.price;
          const priceWithoutSale = +current.dataset.sale;
          sum += price
          sumWithoutSale += priceWithoutSale
          return sum, sumWithoutSale
        });
      } else {
        i++;
        select.classList.add('active')
        sum += price
        sumWithoutSale += priceWithoutSale
        textCount.innerHTML = i;
        count.forEach(current => {
          const price = +current.dataset.price;
          const priceWithoutSale = +current.dataset.sale;
          sum += price
          sumWithoutSale += priceWithoutSale
          return sum, sumWithoutSale
        });
      }      
      totalPrice.innerHTML = sum + ' р.';
      totalPriceWithoutSale.innerHTML = sumWithoutSale + 'р.';
    });
  
  });
  
  sliders.forEach(slider => {
    const sliderInit = slider.querySelector('.slider__list');
    const count = sliderInit.getAttribute('data-count');
    const nextArrow = slider.querySelector('.arrow-next')
    const prevArrow = slider.querySelector('.arrow-prev')
    $(sliderInit).slick({
      slidesToShow:+count,
      dots: false,
      prevArrow: $(prevArrow),
      nextArrow: $(nextArrow)
    });
  });


  timers.forEach(timer => {
  const getTimeRemaining = (endtime) =>{
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
   
  const initializeClock = (endtime) => {
    const clock = timer;
    const daysSpan = clock.querySelector('.timer__day');
    const hoursSpan = clock.querySelector('.timer__hours');
    const minutesSpan = clock.querySelector('.timer__minutes');
    const secondsSpan = clock.querySelector('.timer__seconds');
   
    const updateClock = () => {
      const t = getTimeRemaining(endtime);
   
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
   
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }
    const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
    initializeClock(deadline);
  });

  accordeonButtons.forEach(accordeon => {
    accordeon.addEventListener('click', () =>{
      accordeonButtons.forEach(accordeon => {
        accordeon.classList.remove('open');
        accordeon.closest('.accordeon').classList.remove('open');
      });
      accordeon.classList.add('open');
      accordeon.closest('.accordeon').classList.add('open');
      document.querySelector('.faq').scrollIntoView({behavior: 'smooth'});
    });
  })

  
  const customOptions = {
    onKeyPress: function (val, e, field, options) {
      if (val.replace(/\D/g, "").length === 2) {
        val = val.replace("8", "");
        field.val(val);
      }
      field.mask("+7 (999) 999-99-99", options);
    },
    placeholder: "+7 (___) ___-__-__",
  };

  maskedPhones.forEach(input => {
    $(input).mask("+7 (000) 000-00-00", customOptions);
  });
  
  modals.forEach(modal => {
    const input = modal.querySelector('input[data-masked="phone"]');
    $(input).mask("+7 (000) 000-00-00", customOptions);
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
