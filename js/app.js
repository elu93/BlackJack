
function Card(r, s) {
    this.rank = r
    this.suit = s
    this.cardName = `${r}_of_${s}`
    this.image = `/Users/eric/BlackJack/images/Cards/png/${r}_of_${s}.png`
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

let myDeck = shuffle(getDeck());
console.log(myDeck);


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

function giveCards(numberOfTimes){
    for(i = 0; i < numberOfTimes; i++){
        Player.hand.unshift(myDeck.pop());
    }
    for(i = 0; i < numberOfTimes; i++){
        Dealer.hand.unshift(myDeck.pop());
    }
}

function showPlayerCards(){
    Player.hand.forEach(function(times){
        $(`<img src="${times.image}"/>`).appendTo('.player');
    })
    Dealer.hand.forEach(function(times){
        $(`<img src="${times.image}"/>`).appendTo('.gameboard');
    })
}


function dealCards(){
    giveCards(2);
    showPlayerCards();
    console.log(myDeck);
}
