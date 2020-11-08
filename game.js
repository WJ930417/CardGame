/* 
 * This script contains functions for the buttons.
 *
 * @Author Jing
 */

var dealer;

function enterGame() {
  var playerName = document.getElementById('name').value;
  document.getElementById('player-name').innerHTML += playerName;
  document.getElementById('game-enter').style.display = 'none';
  document.getElementById('game').style.display = 'block';
}

function startblackjack() {
  dealer = new Dealer();
  document.getElementById('btn-start').innerHTML = 'Restart';
  dealer.cleanCards();
  document.getElementById('btn-hit').disabled = false;
  document.getElementById('btn-stay').disabled = false;
  dealer.dealBothPlayers();
  dealer.checkIfEnd(false);
}

function hitMe() {
  dealer.dealBothPlayers();
  dealer.checkIfEnd(false);
}

function stay() {
  document.getElementById('btn-hit').disabled = true;
  while (dealer.checkIfEnd(true) == 'continue') {
    // move on to decision of computer
    dealer.dealComputer();
  }
}



