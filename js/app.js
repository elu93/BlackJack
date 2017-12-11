// Create Deck
// GIVEN that the player is on the game page
// AND the game has not started
// WHEN I click play game
// THEN shuffle the deck of 52 cards

// Create deck and cards
function Card(r, s) {
    this.rank = r
    this.suit = s
    this.cardName = `${r} of ${s}`;
}

suits = ['diamonds', 'clubs', 'hearts', 'spades']
ranks = 'A23456789TJQK'
deck = new Array(suits.length * ranks.length)

function getDeck() {
    for (i = 0; i < suits.length; i++) {
        for (j = 0; j < ranks.length; j++)
            deck[j + i * ranks.length] = new Card(ranks[j], suits[i]);
    }
    return deck;
}

// Fisher-Yates Shuffle - found this algorithim online which produced the best shuffle for cards: https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    let m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

let myDeck = getDeck();

let cardImages = []