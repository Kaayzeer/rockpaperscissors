const main = document.querySelector("#main-section");
const sectionTitle = document.querySelector("#section-title");
const sectionButton = document.querySelector("#section-button");
const containerButton = document.querySelector("#container-button");
const containerChosen = document.querySelector("#container-chosen");
const buttons = document.querySelectorAll("[data-selection]");
const myButton = document.querySelector("#button-my");
const pcButton = document.querySelector("#button-pc");
const scoreCounter = document.querySelector("#scoreCounter");

console.log(sectionTitle, main, sectionButton);
const HANDS = [
  {
    sign: "rock",
    beats: "scissors",
  },
  {
    sign: "paper",
    beats: "rock",
  },
  {
    sign: "scissors",
    beats: "paper",
  },
];

let myScore = 0;
let pcScore = 0;

console.log(buttons);

const styleMain = () => {
  main.style.width = "100%";
  main.style.height = "100%";
  main.style.display = "grid";
  main.style.placeItems = "center";
};

const styleSectionTitle = () => {
  sectionButton.style.width = "30%";
};

const styleSectionButton = () => {
  sectionButton.style.display = "flex";
  sectionButton.style.justifyContent = "center";
  sectionButton.style.alignItems = "center";

  sectionButton.style.width = "70%";
};

const styleContainerButton = () => {
  sectionButton.style.width = "min(476px, 100%)";
};

styleMain();
styleSectionTitle();
styleSectionButton();
styleContainerButton();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //select each data-selection
    const selection = button.dataset.selection;

    //match the selection with the handsign
    const hand = HANDS.find((hand) => hand.sign === selection);

    winnersHand(myDraw(hand), computersDraw());

    myDraw(hand);

    hideGame(containerButton);

    showHandSelection();
    showChosen(hand.sign);

    computersDraw();

    setTimeout(() => {
      showPC(computersDraw().sign);
      winnersHand(myDraw(hand), computersDraw());
    }, [500]);

    setTimeout(() => {
      showScore();
    }, [1500]);
  });
});

// target my hand selection
const myDraw = (hand) => {
  return hand;
};

// Random selection from the computer
const computersDraw = () => {
  // make a random index draw
  const draw = Math.floor(Math.random() * HANDS.length);
  console.log("PcDraw :", HANDS[draw]);

  // from the HANDS object
  return HANDS[draw];
};

// check if my hand wins over computers hand and count the points
const winnersHand = (myHand, computersHand) => {
  if (myHand === computersHand) {
    myScore++, pcScore++;
  } else if (
    (myHand.sign === "rock" && computersHand.beats === "scissors") ||
    (myHand.sign === "paper" && computersHand.beats === "rock") ||
    (myHand.sign === "scissors" && computersHand.beats === "paper")
  ) {
    myScore++;
  } else pcScore++;

  return myScore;
};

//show my chosen turn
const showChosen = (hand) => {
  let img = document.createElement("img");
  img.setAttribute("src", `/images/icon-${hand}.svg`);

  return myButton.append(img);
};

//show my computers turn
const showPC = (hand) => {
  let img = document.createElement("img");
  img.setAttribute("src", `/images/icon-${hand}.svg`);
  return pcButton.append(img);
};

const showHandSelection = () => {
  return containerChosen.setAttribute("class", "showBtnContainer");
};

const hideGame = (tag) => {
  return tag.setAttribute("class", "hideGame");
};

//show the score in the page
const showScore = () => {
  return (scoreCounter.innerHTML = `<div>${myScore}</div> `);
};

//play again
const reset = () => {};
