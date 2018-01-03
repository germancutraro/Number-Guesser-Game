// GAME VALUES
let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random() * (max - min + 1) + min),
    lifes = 3;
// UI
const gameWrapper = document.getElementById('game'),
      minNumber = document.getElementById('min-num'),
      maxNumber = document.getElementById('max-num'),
      number = document.getElementById('guess-input');
// OUTPUT MESSAGE
const output = document.getElementById('message');

// ASSING MIN AND MAX VALUE
minNumber.innerText = min;
maxNumber.innerText = max;
// EVENT CLICK or ENTER (Two options)
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', game);
number.addEventListener('keyup', e => e.key === 'Enter' ? game() : false );
// PLAY AGAIN EVENT
gameWrapper.addEventListener('mousedown', e => e.target.className === 'play-again' ? location.reload() : false);

// MAIN FUNCTION
function game () {
  // USER/PLAYER NUMBER
  let guessNumber = Number(number.value);
  number.value = '';

  if (validateNumber(guessNumber)) 
    guessNumber === winningNum ? gameResult('win', winningNum) : (
      lifes -= 1,
      lifes === 0 ? gameResult('lose', winningNum) : setMessage(`${guessNumber} is Incorrect! Current Lifes: ${lifes}`, 'red')) 
  else 
    setMessage(`The number must be on between ${min} and ${max}`, 'red');
}

// MICROFUNCTIONS
// Validate if the number is between max and min
const validateNumber = num => num >= min && num <= max ? true : false;
// Set any message that will display in the message p tag
const setMessage = (msg, color) => {
  output.style.color = color; 
  output.innerText = msg;
};
// Win or Lose?
const gameResult = (state, winningNum) => {
  // Actions for both
  number.setAttribute('disabled', 'true'),   
  number.style.borderColor = state === 'win' ? 'green' : 'red';
  submitBtn.value = 'PLAY AGAIN';
  submitBtn.classList.add('play-again');
  // Message and all that other stuff
  state === 'win' ? setMessage(`${winningNum} is Correct, YOU WIN!`, 'green') : (
    setMessage(`GAME OVER! The correct number was ${winningNum}`, 'red'),
    number.value = ''
  );
};