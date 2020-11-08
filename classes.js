/* This class is for creating object represeting a card deck */
class Deck {

    constructor() {
        this.deck = [];
        this.createDeck();
        this.shuffle();
    }

    createDeck() {
        const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        this.deck = [];
        for (var i = 0; i < values.length; i++) {
            for (var x = 0; x < suits.length; x++) {
                var weight = i + 2;
                const card = new Card(values[i], suits[x], weight);
                this.deck.push(card);
            }
        }
    }

    shuffle() {
        for (var i = 0; i < 1000; i++) {
            var location1 = Math.floor((Math.random() * this.deck.length));
            var location2 = Math.floor((Math.random() * this.deck.length));

            var tmp = this.deck[location1];
            this.deck[location1] = this.deck[location2];
            this.deck[location2] = tmp;
        }
    }
}

/* This class is for creating object represeting a card */
class Card {
    constructor(value, suit, weight) {
        this.value = value;
        this.suit = suit;
        this.weight = weight;
    }

    renderCard(player) {
        var hand = document.getElementById('hand-' + player);
        hand.appendChild(this.getCardUI());
    }

    getCardUI() {
        var el = document.createElement('div');
        var icon = '';
        if (this.suit == 'Hearts')
            icon = '&hearts;';
        else if (this.suit == 'Spades')
            icon = '&spades;';
        else if (this.suit == 'Diamonds')
            icon = '&diams;';
        else
            icon = '&clubs;';

        el.className = 'card';
        el.innerHTML = this.value + '<br/>' + icon;
        return el;
    }
}

/* This class is for creating object represeting a dealer for the game */
class Dealer {

    constructor() {
        this.deck = new Deck();
        this.playerScore = 0;
        this.computerScore = 0;
        this.deckCount = 52;
    }

    dealHand(player) {
        // handing cards to player and computer
        var card;
        card = this.deck.deck.pop();
        card.renderCard(player);
        if (player == 'player')
            this.playerScore += card.weight;
        else
            this.computerScore += card.weight;

        this.deckCount--;
        this.updateScore();
        this.updateDeckCount();
    }

    dealBothPlayers() {
        dealer.dealHand('player');
        dealer.dealHand('computer');
    }

    dealComputer() {
        dealer.dealHand('computer');
    }

    updateScore() {
        document.getElementById('score-computer').innerHTML = this.computerScore;
        document.getElementById('score-player').innerHTML = this.playerScore;
    }
    updateDeckCount() {
        document.getElementById('deckcount').innerHTML = this.deckCount;
    }

    checkIfEnd(isStayed) {
        var check = 'continue';
        if (this.computerScore > 21 && this.playerScore > 21)
            check = 'Draw!';
        else if (this.computerScore > 21)
            check = 'You Wins!';
        else if (this.playerScore > 21)
            check = 'You Lose!';

        if (check == 'continue' && isStayed) {
            if (this.computerScore > this.playerScore)
                check = 'You Lose!';
            else if (this.playerScore == this.computerScore)
                check = 'Draw';
        }
        this.displayResult(check);
        return check;
    }

    displayResult(check) {
        if (check != 'continue') {
            document.getElementById('result').innerHTML = check;
            document.getElementById('btn-hit').disabled = true;
            document.getElementById('btn-stay').disabled = true;
        }
    }

    cleanCards() {
        document.getElementById('hand-player').innerHTML = '';
        document.getElementById('hand-computer').innerHTML = '';
        document.getElementById('result').innerHTML = '';
    }

}