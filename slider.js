let slideIndex = 1;
const slider = document.querySelector('.slider');

// Link slide index to slider value
const slideValues = [0, 25, 50, 75, 100]; // Adjust this based on # of slides

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  // Show only the selected slide
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("show");
  }
  slides[slideIndex - 1].classList.add("show");

  // Animate slider to match slide
  animateSliderTo(slideValues[slideIndex - 1]);
}

function animateSliderTo(targetValue) {
  const startValue = parseFloat(slider.value);
  const duration = 600; // ms
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const newValue = startValue + (targetValue - startValue) * easeInOutQuad(progress);
    slider.value = newValue;
    updateSliderBackground(slider);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function updateSliderBackground(slider) {
  const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${val}%, transparent ${val}%, transparent 100%)`;
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}