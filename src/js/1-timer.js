import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('button[type="button"]');

const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');

const store = {
  timerInterval: null,
  selectedDate: null,
};

function addLeadingZero(value, fillString = '0') {
  return String(value).padStart(2, fillString);
}

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
};

const runTimer = selectedDate => () => {
  const { timerInterval } = store;
  const timeDifference = selectedDate - new Date();

  if (timeDifference <= 0) {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    fieldDays.textContent = '00';
    fieldHours.textContent = '00';
    fieldMinutes.textContent = '00';
    fieldSeconds.textContent = '00';

    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  fieldDays.textContent = days;
  fieldHours.textContent = hours;
  fieldMinutes.textContent = minutes;
  fieldSeconds.textContent = seconds;
};

const onCloseHandler = selectedDates => {
  const currentDate = new Date();
  store.selectedDate = selectedDates[0];

  if (store.selectedDate <= currentDate) {
    iziToast.show({
      message: 'Please choose a date in the future',
      backgroundColor: '#EF4040',
      messageColor: '#FFFFFF',
      title: 'Error',
      titleColor: '#FFFFFF',
      messageSize: '16px',
      titleSize: '16px',
      position: 'topRight',
    });
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
};

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseHandler,
});

startButton.addEventListener('click', function () {
  if (store.timerInterval) {
    clearInterval(store.timerInterval);
  }

  store.timerInterval = setInterval(runTimer(store.selectedDate), 1000);
  this.disabled = true;
});
