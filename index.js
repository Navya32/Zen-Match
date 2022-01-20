var cards = document.querySelectorAll('.card');
var countdown = document.querySelector('span');
var noofcards = 0;
var playbtns = document.querySelectorAll('.playAgain');
var lockedBoard = false;

var arr = ['https://cdn4.iconfinder.com/data/icons/emoji-18/61/2-128.png', 'https://cdn3.iconfinder.com/data/icons/emoji-1-4/64/_crying_emoji_sad-256.png', 'https://cdn4.iconfinder.com/data/icons/emoji-18/61/4-128.png', 'https://cdn4.iconfinder.com/data/icons/emoji-18/61/20-256.png', 'https://cdn4.iconfinder.com/data/icons/emoji-18/61/24-256.png', 'https://cdn4.iconfinder.com/data/icons/emoji-18/61/14-256.png'];
var boxes = [];
for (var i = 0; i < arr.length; i++) {
  boxes.push(arr[i], arr[i]);
}

function shuffle(array) {
  var currentIndex = array.length;
  var randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  for (var i = 0; i < array.length; i++) {
    document.querySelector('.card-img' + i).setAttribute('src', array[i]);
  }

  return array;
}

var mytimer;

function timerStarts() {
  mytimer = setInterval(function () {
    countdown.innerHTML = parseInt(countdown.innerHTML) - 1;
    if (countdown.innerHTML == 0) {
      cards.forEach(function (item) {
        item.classList.remove('is-flipped');
      });

      document.querySelector('.game-over-lost').style.visibility = 'visible';
      clearInterval(mytimer);
      document.querySelector('body').style.backgroundColor = 'black';
      document.querySelector('.cards').style.visibility = 'hidden';
      clearInterval(mytimer);
    }
  }, 1000);
}

function playbutton() {
  shuffle(boxes);
  document.getElementById('playAlert').style.visibility = 'hidden';
  document.querySelector('.game-over-win').style.visibility = 'hidden';
  document.querySelector('.game-over-lost').style.visibility = 'hidden';
  document.querySelector('.cards').style.visibility = 'visible';
  document.querySelector('body').style.backgroundColor = 'white';
  timerStarts();
}

var isCardFlipped = false;
var firstCard;
var secondCard;

function resetBoard() {
  [isCardFlipped, lockedBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function flip() {
  if (lockedBoard) {
    return;
  }

  if (event.currentTarget === firstCard) {
    return;
  }

  if (isCardFlipped == false) {
    firstCard = event.currentTarget;
    firstCard.style.backgroundColor = '#5C527F';
    isCardFlipped = true;
    firstCard.classList.add('is-flipped');
    console.log(firstCard);
  } else {
    secondCard = event.currentTarget;
    secondCard.style.backgroundColor = '#5C527F';
    isCardFlipped = false;
    secondCard.classList.add('is-flipped');
    var secondCardURL = secondCard.getElementsByTagName('img')[0].src;
    var firstCardURL = firstCard.getElementsByTagName('img')[0].src;
    if (firstCardURL != secondCardURL) {
      lockedBoard = true;
      setTimeout(function () {
        firstCard.style.backgroundColor = '#FF2626';
        secondCard.style.backgroundColor = '#FF2626';
      }, 600);

      setTimeout(function () {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        lockedBoard = false;
        // resetBoard();
      }, 1500);
    } else {
      // lockedBoard = true;
      console.log('green');
      setTimeout(function () {
        firstCard.style.backgroundColor = 'green';
        secondCard.style.backgroundColor = 'green';
      }, 500);

      noofcards++;

      // resetBoard();

      if (noofcards == 6) {

        setTimeout(function () {
          document.querySelector('.game-over-win').style.visibility = 'visible';
          document.querySelector('body').style.backgroundColor = 'black';
          document.querySelector('.cards').style.visibility = 'hidden';
          countdown.innerHTML = '100000000';
          cards.forEach(function (item) {
            item.classList.remove('is-flipped');
          });
        }, 1000);

        clearInterval(mytimer);
      }
      // lockedBoard = false;
    }
  }
}

function playAgain() {
  countdown.innerHTML = '30';
  noofcards = 0;
  isCardFlipped = false;
  playbutton();
}

document.getElementById('playAlert').addEventListener('click', playbutton);

cards.forEach(function (item) {
  item.addEventListener('click', flip);
});

playbtns.forEach(function (item) {
  item.addEventListener('click', playAgain);
});
