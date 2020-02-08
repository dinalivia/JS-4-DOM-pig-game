/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, winningScore;

//winningScore = document.querySelector('.winning-score').textContent || 15;
//winningScore = document.getElementById("winning-score") || 15;


init();

// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// textContent can only set plane text
//document.querySelector('#current-' + activePlayer).textContent = dice;

// innerHTML is mmore generic, HMTL likewise
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +'</em>';

// get value from css
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

// set dice class to none to change dice image at the beginning

// css class, event, callback
document.querySelector('.btn-roll').addEventListener('click', function() {
    //(annonimous function)

    if(gamePlaying) {
        //1. Random number
        var dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        console.log(dice);

        //2. Display the result
        var dice1DOM = document.querySelector('.dice-1');
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice[0] + '.png';
        
        var dice2DOM = document.querySelector('.dice-2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice[1] + '.png';

        if(lastDice == 6 && (dice[0] == 6 || dice[1] == 6)) {
            document.querySelector('#current-' + activePlayer).textContent = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
            console.log("two sixes!");
        } 

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice[0] !== 1 && dice[1]) {
            //Add score
            roundScore += dice[0]+dice[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;        
            lastDice = dice[0] + dice[1];    

        } else {
            nextPlayer();
            lastDice = 0;  

        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        //1. Add current score to global score
        scores[activePlayer] += roundScore;

        //2. Update the UI
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        
        //3. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //4. Next player
            nextPlayer();
        }
    }
    
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    lastDice = 0;
    // Nao consegui usar o querySelector aqui
    // winningScore = document.querySelector('.winning-score').textContent || 100;

    // primeira tentativa com o getElementById usando um simples input
    // winningScore = document.getElementById("winning-score").value || 100;

    // segunda tentativa com o getElementById usando um form, esse aproach ficou mais elegante
    winningScore = document.getElementById("frm1").elements[0].value || 100;

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    gamePlaying = true;

}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. 
After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, 
so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. 
This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. 
The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/