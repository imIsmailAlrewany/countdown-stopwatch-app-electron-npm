//toggle between options
const countdown = document.getElementById('option1');
const form = document.querySelector('form');
const stopwatch = document.getElementById('option2');
const section = document.querySelector('section');

const toggleActive = (button, ...toggle) => {
  button.onclick = function () {
    //remove active from all
    toggle.forEach(t => {
      t.classList.remove('active');
    });
    //set active to the first element only
    toggle[0].classList.add('active');
  };
};

//hide section display form
toggleActive(countdown, section, form);
//hide form display section
toggleActive(stopwatch, form, section);


//setIntervals variable to clear them
let stop;
let x;

//setTime (days, hours, minutes, seconds) function
let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

const setTime = (now) => {
  // Calculate days, hours, minutes and seconds
  days = Math.floor(now / (1000 * 60 * 60 * 24));
  hours = Math.floor((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((now % (1000 * 60)) / 1000);
};


//stopwatch counter each second
const start = document.getElementById('start-stopwatch');

start.addEventListener('click', () => {
  //clear x interval to not affect each others
  clearInterval(x);
  days = hours = minutes = seconds = 0;

  //change the innerText to stop and do stop
  start.classList.toggle('active');
  const lastTime = document.querySelector(".timer").innerHTML;
  document.querySelector(".timer").innerHTML = '';

  if (start.classList.contains('active')) {
    start.innerHTML = 'Stop';
    const startsAt = new Date().getTime();

    stop = setInterval(() => {
      // Display the stopwatch timer
      document.querySelector(".timer").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      // Calculate the time remaining
      const now = new Date().getTime();
      setTime(now - startsAt);
    }, 1000);
  } else {
    start.innerHTML = 'Start';
    clearInterval(stop);
    document.querySelector(".timer").innerHTML = lastTime;
  }

});


// Set the date to count down
const input = document.getElementById('countdown');
const startCountdown = document.querySelector('form #countdown + button');
const audio = document.getElementById('audio');
let value = 0;

startCountdown.addEventListener('click', (e) => {

  //clear stop interval to not affect each others
  clearInterval(stop);

  // clear everything first
  document.querySelector(".timer").innerHTML = '';
  clearInterval(x);

  if (+input.value > 0) value = +input.value;
  else value = 0;
  input.value = '';

  // Update the count down every 1 second
  x = setInterval(function () {
    // Calculate the time remaining
    let distance = value * 3.6e+6;
    setTime(distance);

    // Display the countdown timer
    document.querySelector(".timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    // decrease the timer
    distance = distance - 1000;
    value = distance / 3.6e+6;

    // If the countdown is finished, display a message
    if (distance <= 0) {
      clearInterval();
      document.querySelector(".timer").innerHTML = "EXPIRED";
      audio.play();
    }
  }, 1000);
});

if (value === 0) document.querySelector(".timer").innerHTML = "EXPIRED";
