// ======CREATE COUNTER=====
let counter = 0;
let counterDiv = document.createElement("div");
counterDiv.id = "counter";
document.body.appendChild(counterDiv);
counterDiv.innerText = counter + " / 10";

// ======CREATE DIVS=====
let container = document.createElement("div");
container.id = "snakeField";

for (let i = 0; i < 100; i++) {
  let tile = document.createElement("div");
  tile.classList.add("item");
  container.appendChild(tile);
}

document.body.appendChild(container);

// ======CREATE TIMER=====
let timerDiv = document.createElement("div");
timerDiv.id = "timer";
document.body.appendChild(timerDiv);

let minutes = 0;
let seconds = 0;

timerDiv.innerText = minutes + ":0" + seconds;

var gameTimer = setInterval(timer, 1000);

function timer() {
  seconds++;
  timerDiv.innerText = minutes + ":0" + seconds;

  if (seconds > 9) {
    timerDiv.innerText = minutes + ":" + seconds;
  }

  if (seconds > 59) {
    minutes++;
    seconds = 0;
    timerDiv.innerText = minutes + ":0" + seconds;
  }
}

// ======RED BOX=====
let redBoxTimerInterval = 3000;

var redBoxTimer = setInterval(redBox, redBoxTimerInterval);

function redBox() {
  let redBoxIndex = Math.floor(Math.random() * 100);
  document.querySelector(
    ".item:nth-of-type(" + redBoxIndex + ")"
  ).style.backgroundColor = "red";
  setTimeout(function () {
    document.querySelector(
      ".item:nth-of-type(" + redBoxIndex + ")"
    ).style.backgroundColor = "lightblue";
  }, redBoxTimerInterval);
}

// ======MOUSEOVER EVENT=====
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    if (item.style.backgroundColor == "red" && counter < 10) {
      counter++;
      clearInterval(redBoxTimer);
      redBoxTimerInterval = redBoxTimerInterval * 0.8;
      redBoxTimer = setInterval(redBox, redBoxTimerInterval);
      counterDiv.innerText = counter + " / 10";
      if (counter == 10) {
        gameOver();
      }
    }

    item.style.backgroundColor = "orange";

    setTimeout(function () {
      item.style.backgroundColor = "lightblue";
    }, 500);
  });
});

// ======GAME OVER=====
function gameOver() {
  clearInterval(redBoxTimer);
  clearInterval(gameTimer);
  document.body.classList.add("gameOverScreen");
  document.body.innerHTML =
    "Game Over! It took you " +
    minutes +
    ":" +
    seconds +
    " to catch all red boxes! - Whoop whoop!1!!";
}
