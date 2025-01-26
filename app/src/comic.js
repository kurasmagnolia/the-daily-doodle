import {
  handlePrevClick,
  handleInputChange,
  handleNextClick,
  handleRandomClick,
} from './handle-funcs';

const main = () => {
  const prevButton = document.querySelector('#prev-btn');
  console.log('test');
  console.log(prevButton);
  prevButton.addEventListener('click', handlePrevClick);

  document
    .getElementById('random-btn')
    .addEventListener('click', handleRandomClick);
  console.log('random test');

  document
    .getElementById('next-btn')
    .addEventListener('click', handleNextClick);

  // event listener for the input field
  document.getElementById('input').addEventListener('input', handleInputChange);
};

main();
