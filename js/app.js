let Player = {
    hand: [],
    counter: 0,
    bust: false
}

let Dealer = {
    hand: [],
    counter: 0,
    bust: false
}

function Card(r, s, v) {
    this.rank = r
    this.suit = s
    this.value = v
    this.cardName = `${r}_of_${s}`
    this.image = `/Users/eric/BlackJack/images/Cards/png/${r}_of_${s}.png`
}

suits = ['diamonds', 'clubs', 'hearts', 'spades']
ranks = 'A23456789TJQK'
values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
deck = new Array(suits.length * ranks.length)


// nested for loop to create deck of cards
function getDeck() {
    for (i = 0; i < suits.length; i++) {
        for (j = 0; j < ranks.length; j++)
            deck[j + i * ranks.length] = new Card(ranks[j], suits[i], values[j]);
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

let myDeck = shuffle(getDeck());
console.log(myDeck);
dealCards();


function giveCards(numberOfTimes) {
    for (i = 0; i < numberOfTimes; i++) {
        Player.hand.push(myDeck.pop());
    }
    for (i = 0; i < numberOfTimes; i++) {
        Dealer.hand.push(myDeck.pop());
    }
}

function showPlayerCards() {
    Player.hand.forEach(function (times) {
        $(`<img src="${times.image}"/>`).appendTo('.player-cards');
    })
    Dealer.hand.forEach(function (times) {
        $(`<img src="${times.image}"/>`).appendTo('.dealer-cards');
    })
}


function dealCards() {
    giveCards(2);
    showPlayerCards();
    console.log(myDeck);
}


$('.hit').click(function () {
    Player.hand.push(myDeck.pop());
    let index = Player.hand.length - 1;
    $(`<img src="${Player.hand[index].image}"/>`).appendTo('.player-cards');
    console.log(Player);
})


// GIVEN that the player is on the game page
// AND that a hand has already been dealt
// WHEN a player clicks stay
// THEN do not give a player a card

$('.stay').click(function () {
    Dealer.hand.push(myDeck.pop());
    let index = Player.hand.length - 1;
    $(`<img src="${Dealer.hand[index].image}"/>`).appendTo('.dealer-cards');
    console.log(Dealer);
})