//2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

var scores, roundScore, activePlayer, ended, gamePlaying, winnerScore;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
ended = 0;
winnerScore = 100;
gamePlaying = true;
document.querySelector('.dice').style.display = 'none';

document.querySelector('#score-0').textContent = '0';
document.querySelector('#score-1').textContent = '0';
document.querySelector('#current-0').textContent = '0';
document.querySelector('#current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {


        //random number
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
        //display result
        var diceDOM = document.querySelector('.dice');
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        //update the round score if the roll number is not 1
        dice !== 1 ? roundScore += dice : roundScore = 0;

        if (roundScore === 0) {
            nextPlayer();

        }

        console.log(activePlayer);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

        console.log(roundScore);
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {



        scores[activePlayer] += roundScore;
        document.querySelector('.active .player-score').textContent = scores[activePlayer];

        if (scores[activePlayer] >= winnerScore) {
            document.querySelector('.active .player-name').innerHTML = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');

            document.querySelector('.dice').style.display = 'none';
            ended = 1;
            gamePlaying = false;
        } else {
            nextPlayer();
        }

        roundScore = 0;

    }

});

document.querySelector('.btn-new').addEventListener('click', function() {
    if (ended === 1) {


        scores = [0, 0];

        resetWinner();
    } else {
        scores = [0, 0];
        reset();


    }
});

function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
};

function reset() {
    ended = 0;
    activePlayer = 0;
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    gamePlaying = true;
    winnerScore = document.querySelector('#winnerScore').value;
    console.log(winnerScore);
}

function resetWinner() {

    if (activePlayer === 1) {
        document.querySelector('#name-1').innerHTML = 'Player 2';
    } else {
        document.querySelector('#name-0').innerHTML = 'Player 1';
    }
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');

    reset();

}