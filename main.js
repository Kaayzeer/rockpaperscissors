const selectedButtons = document.querySelectorAll("[data-selection]");

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

console.log(selectedButtons);

selectedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //select each data-selection
    const selection = button.dataset.selection;

    //match the selection with the handsign
    const hand = HANDS.find((hand) => hand.sign === selection);
    myDraw(hand);
    computersDraw();
    winnersHand(myDraw(hand), computersDraw());
  });
});

// target my hand selection
const myDraw = (hand) => {
  console.log("myDraw :", hand.beats);
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

const scoreCard = () => {
  console.log(myDraw.sign);
};

const winnersHand = (myHand, computersHand) => {
  if (myHand === computersHand) {
    myScore++;
    pcScore++;
  } else if (
    (myHand.sign === "rock" && computersHand.beats === "scissors") ||
    (myHand.sign === "paper" && computersHand.beats === "rock") ||
    (myHand.sign === "scissors" && computersHand.beats === "paper")
  ) {
    myScore++;
  } else pcScore++;

  console.log({ myScore, pcScore });
  return pcScore, myScore;
};

// check if my hand wins over computers hand and count the points
