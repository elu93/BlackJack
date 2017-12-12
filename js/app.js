let Player = {
    hand: [],
    counter: 0,
    blackJack: false
}

let Dealer = {
    hand: [],
    counter: 0,
    blackJack: false
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
values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
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
let dealerSum = 0;
let playerSum = 0;
console.log(myDeck);
dealCards();


function giveCards(numberOfTimes) {
    for (i = 0; i < numberOfTimes; i++) {
        Player.hand.push(myDeck.pop());
        playerSum = playerSum + Player.hand[i].value;
    }
    for (i = 0; i < numberOfTimes; i++) {
        Dealer.hand.push(myDeck.pop());
        dealerSum = dealerSum + Dealer.hand[i].value;
    }
}

function showPlayerCards() {
    Player.hand.forEach(function (times) {
        $(`<img class="cardimage" src="${times.image}"/>`).appendTo('.player-cards');
    })
    Dealer.hand.forEach(function (times) {
        $(`<img class="cardimage" src="${times.image}"/>`).appendTo('.dealer-cards');

    })
}


function dealCards() {
    giveCards(2);
    showPlayerCards();
    checkforBlackJack();
    if(Player.blackJack === true || Dealer.blackJack === true) {
        checkforVictory();
    }
    
    console.log(myDeck);
    console.log(`Player's Sum: ${playerSum}`);
    console.log(`Dealer's Sum: ${dealerSum}`);
}


$('.hit').click(function () {
    Player.hand.push(myDeck.pop());
    let index = Player.hand.length - 1;
    $(`<img class="cardimage" src="${Player.hand[index].image}"/>`).appendTo('.player-cards');
    playerSum = playerSum + Player.hand[index].value;
    if (playerSum > 21) {
        alert('Player has busted!')
        checkforVictory()
        return;
    }
    console.log(`Player's Sum: ${playerSum}`);
})

$('.stay').click(function () {
    dealCardstoDealer();
    checkforVictory();
})

function dealCardstoDealer() {
    while (dealerSum < 21) {
        Dealer.hand.push(myDeck.pop());
        let index = Dealer.hand.length - 1;
        if (dealerSum < 17) {
            dealerSum = dealerSum + Dealer.hand[index].value;
            $(`<img class="cardimage" src="${Dealer.hand[index].image}"/>`).appendTo('.dealer-cards');
        } else if (dealerSum < 21 && dealerSum >= 17) {
            alert('Dealer cant go any further')
            return;
        } else if (dealerSum === 21) {
            alert('21')
            return;
        } else if (dealerSum > 21) {
            alert('Dealer has busted!')
            return;
        }
        console.log(`Dealer's Sum: ${dealerSum}`);
    }
}

function checkforVictory() {
    if (playerSum <= 21 && playerSum > dealerSum) {
        alert('Player wins!');
        Player.counter =+ 1;
        console.log(Player.counter);
    } else if (dealerSum <= 21 && dealerSum > playerSum) {
        alert('Dealer wins!');
        Dealer.counter =+ 1;
        console.log(Dealer.counter);
    } else if (dealerSum > 21) {
        alert('Player wins!');
        Player.counter =+ 1;
        console.log(Player.counter);
    } else if (playerSum > 21) {
        alert('Dealer wins!');
        Dealer.counter =+ 1;
        console.log(Dealer.counter);
    } else {
        alert('Its a tie');
    }
}

function checkforBlackJack() {
    if(playerSum === 21) {
        Player.blackJack = true;
        alert('BlackJack');
    }
    if(playerSum === 21) {
        Dealer.blackJack = true;
    }
}

function redealCards () {
    Player.blackJack = false;
    Dealer.blackJack = false;
    Player.hand = [];
    Dealer.hand = [];
    playerSum = 0;
    dealerSum = 0;
    myDeck = shuffle(getDeck());
    dealCards();
}

$('.redeal').click(function () {
    $('.cardimage').remove();
    redealCards();
    console.log(myDeck);
    console.log(Player.hand);
    console.log(Dealer.hand);
})