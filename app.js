let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // let player 0 ki turn hai
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
 
const resetGame = () => { //reset btn daba ke kya hoga 
  turnO = true; //0 wale ki turn hogi start me 
  count = 0;    //track for draw bhi 0 
  enableBoxes(); //enable i.e, saare boxes ko empty karo
  msgContainer.classList.add("hide");  //congratulations mssg hide kardia
};

boxes.forEach((box) => {   //for each box print 0 X according to turn when clicked
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO ki turn
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX ki turn 
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;  // ek baar click hogya to dubara click na ho pae
    count++;              // cnt bhi dekte raho for draw

    let isWinner = checkWinner();    // checkWinner

    if (count === 9 && !isWinner) {   //cnt 9 hogya aur aur winner nahi mila to draw
      gameDraw();
    }
  });
});

const gameDraw = () => {    //draw ka mssg
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");   //show karne ke lie msg
  disableBoxes();                 
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);