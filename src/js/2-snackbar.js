import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form-snackbar');

const iziToastOptions = {
  messageColor: '#FFFFFF',
  messageSize: '16px',
  position: 'topRight',
};

const createPromise = (delay, state) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const { state, delay } = form.elements;

  createPromise(parseInt(delay.value, 10), state.value)
    .then(delay => {
      iziToast.show({
        ...iziToastOptions,
        backgroundColor: '#59A10D',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.show({
        ...iziToastOptions,
        backgroundColor: '#EF4040',
        message: `Rejected promise in ${delay}ms`,
      });
    });

  form.reset();
});
