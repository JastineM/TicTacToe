//Other features
const boxes = document.querySelectorAll('.box');
const restartbutton = document.querySelector('.restart');
const gamestate = document.getElementById('playersturn');
const nextbutton = document.getElementById('next-setting');
const previousbutton = document.getElementById('previous');
const body = document.getElementById('body');
const title = document.getElementById('title');
const main = document.getElementById('main'); 
const buttons=document.querySelector('.buttons');   
const settings = document.getElementById('settings');
const cancel = document.getElementById('cancel-btn');

let savemoves= [];
let options = [["","",""],["","",""],["","",""]];
let currentplayer = "X";
let nextplayer ="X";
let ongoinggame = false;
let savemovesproto = [];

var screen = document.getElementById('checkbox');
var loading = document.getElementById('loading-img');
var settingsdisplay = document.getElementById('settings-popup');

window.onload = function initializegame(){
    boxes.forEach(box => box.addEventListener('click',function(){
      
      const boxindex = box.dataset.row + "," + box.dataset.column;
      const row = box.dataset.row;
      const column = box.dataset.column;

        options[row][column] = currentplayer;
        box.textContent = currentplayer;

        const moverow = ["row", parseInt(box.dataset.row)];
        const movecolumn = ["column",parseInt(box.dataset.column)];
        const movemarker = ["marker", options[row][column]];
        const movesone = [moverow,movecolumn,movemarker];

        let testobject = Object.fromEntries(movesone);
        
        savemoves.push(testobject);

        changeplayers();
        checkwinner();
    }));

    gamestate.textContent = "Let's play";
    ongoinggame = true;  
}

//Restart game
restartbutton.addEventListener('click',function(){
    gamestate.classList.remove('active');
    restartbutton.classList.remove('active');
    boxes.forEach(box => 
        box.innerHTML = "")
        
    options = [["","",""],["","",""],["","",""]];
    savemoves = [];
    savemovesproto = [];
    gamestate.textContent = "Start your game!";
    setTimeout(function(){
        gamestate.textContent = "May the odds be ever in your favor!";
    },2000);
})


//Change players
function changeplayers(){
    currentplayer = (currentplayer == "X") ? "O":"X";
    nextplayer = (currentplayer == "X") ? "O":"X";
    gamestate.textContent = `${currentplayer}'s turn`;
};

//Winning game
function checkwinner() {
        // check for rows
        for (let i = 0; i < 3; i++) {
          if (options[i][0] === options[i][1] && options[i][0] === options[i][2] && options[i][0] !== '') {
            gamestate.textContent = ` ${nextplayer} wins!`;
            gamestate.classList.toggle('active');
            restartbutton.classList.toggle('active');
            return;
          }
        }
        // check for columns
        for (let i = 0; i < 3; i++) {
          if (options[0][i] === options[1][i] && options[0][i] === options[2][i] && options[0][i] !== '') {
            gamestate.textContent = ` ${nextplayer} wins!`;
            gamestate.classList.toggle('active');
            restartbutton.classList.toggle('active');
            return;
          }
        }
        // check for diagonals
        if (options[0][0] === options[1][1] && options[0][0] === options[2][2] && options[0][0] !== '') {
            gamestate.textContent = ` ${nextplayer} wins!`;
            gamestate.classList.toggle('active');
            restartbutton.classList.toggle('active');
          return;
        }
        if (options[0][2] === options[1][1] && options[0][2] === options[2][0] && options[0][2] !== '') {
            gamestate.textContent = ` ${nextplayer} wins!`;
            gamestate.classList.toggle('active');
            restartbutton.classList.toggle('active');
          return;
        }
        // check for a tie
        var count = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (options[i][j] != '') {
              count++;
            }
          }
        }
        if (count == 9) {
            gamestate.textContent = " Draw!";
            gamestate.classList.toggle('active');
            restartbutton.classList.toggle('active');
          return;
        }
      }

//Next and previous buttons
previousbutton.addEventListener('click',function(){
let previousarray = savemoves.pop();
const datarow = previousarray.row;
const datacolumn = previousarray.column;
const datamarker = previousarray.marker;

let box = document.querySelector(`[data-row="${datarow}"][data-column="${datacolumn}"]`);
box.innerHTML = "";

options[datarow][datacolumn]="";

savemovesproto.push(previousarray);
});

nextbutton.addEventListener('click',function(){

  let next = savemovesproto;
  let firstarray = next.pop();
  const datarow = firstarray.row;
  const datacolumn = firstarray.column;
  const datamarker = firstarray.marker;

  let box = document.querySelector(`[data-row="${datarow}"][data-column="${datacolumn}"]`);    
  box.innerHTML = `${datamarker}`;

  options[datarow][datacolumn]=`${datamarker}`;
  savemoves.push(firstarray);

});


//Page loading  
function init(){
    setTimeout(function() {
        title.style.display = "flex";
        main.style.display = "flex";
        buttons.style.display="flex";
        gamestate.style.visibility = "visible";
        setTimeout(function(){loading.style.visibility = "hidden"}, 50);
    }, 2000);
}
init();

//Settings pop-up
 settings.addEventListener('click', function() {
 settingsdisplay.classList.add('active');
})

 cancel.addEventListener('click', function() {
 settingsdisplay.classList.remove('active');
})

//Screen
screen.addEventListener('click',function(){
    if(screen.checked === true){
        body.style.backgroundColor = "white";
        boxes.forEach(box => {
            box.style.borderColor="#1f1f1f";
            box.style.color="#1f1f1f";
        });
      }
        
    else{
        body.style.backgroundColor = "#1f1f1f";
        boxes.forEach(box => {
            box.style.borderColor="white";
            box.style.color="white";
        });
      }
})
