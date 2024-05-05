let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  ties: 0,
  losses: 0,
};

document.querySelector('.js-rock-button')
.addEventListener('click',()=>{
  comparision('rock');
})
document.querySelector('.js-paper-button')
.addEventListener('click',()=>{
  comparision('paper');
})
document.querySelector('.js-scissors-button')
.addEventListener('click',()=>{
  comparision('scissors');
})
document.querySelector('.reset-button')
.addEventListener('click',()=>{
  reset();
})
document.querySelector('.auto-play-button')
.addEventListener('click',()=>{
autoplay();

})
document.body.addEventListener('keydown',(event)=>{
if(event.key==='r')
{comparision('rock')}
else if(event.key==='s')
{comparision('scissors')}
else if(event.key==='p')
{comparision('paper')}
else if(event.key==='a')
{autoplay();}
else if(event.key ==='Backspace')
{
  reset();
}
})

function reset(){
  document.querySelector('.reset-conformation').innerHTML=`Are you sure you want to reset the score
  <button class='yes'>Yes</button>
  <button class='no'>No</button>`;
  document.querySelector('.yes')
  .addEventListener('click',()=>{
  score.losses = 0; score.ties=0; score.wins=0 ;
        localStorage.removeItem('score')
        updateScore();
        document.querySelector('.reset-conformation').innerHTML='';
  })
  document.querySelector('.no')
  .addEventListener('click',()=>{
        document.querySelector('.reset-conformation').innerHTML='';
  })
  
}



function updateScore() {
  document.querySelector(
    ".score-paragraph"
  ).innerHTML = `wins=${score.wins} losses=${score.losses} ties=${score.ties}`;
}
updateScore();
let result = "";
function pickcomputerMove() {
  const computerMove = Math.random();
  if (computerMove < 1 / 3) {
    result = "rock";
  } else if (computerMove < 2 / 3 && computerMove >= 1 / 3) result = "paper";
  else result = "scissors";
  return result;
}

let isautoplay = false;
let internval; 
const button = document.querySelector(".auto-play-button")
function autoplay() 
{if(!isautoplay){
   internval = setInterval(() => {
    let randomMove = pickcomputerMove();
    comparision(randomMove);
  }, 1000);
 
  
    button.innerHTML = "Stop"
    
   isautoplay = true;
}
   else{
    button.innerHTML = "Autoplay"
    clearInterval(internval)
    isautoplay = false;
  }
}





function comparision(mymove) {
  const result = pickcomputerMove();
  let game = "";
  if (mymove === "rock") {
    if (result === "rock") {
      game = "tie";
    } else if (result === "paper") {
      game = "lose";
    } else {
      game = "win";
    }
  } else if (mymove === "paper") {
    if (result === "rock") {
      game = "win";
    } else if (result === "paper") {
      game = "tie";
    } else {
      game = "lose";
    }
  } else {
    if (result === "rock") {
      game = "lose";
    } else if (result === "paper") {
      game = "win";
    } else {
      game = "tie";
    }
  }

  if (game === "win") {
    score.wins++;
  } else if (game === "tie") {
    score.ties++;
  } else {
    score.losses++;
  }
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".scoreMove").innerHTML = `you ${game}`;
  document.querySelector(
    ".score-info"
  ).innerHTML = `You <img class="move-image" src="images/${mymove}-emoji.png">
    <img class="move-image" src="images/${result}-emoji.png">Computer `;
  updateScore();
}
