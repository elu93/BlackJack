let Player = {
    hand: [],
    counter: 0,
    blackJack: false,
    checkForVictory: false
}

let Dealer = {
    hand: [],
    counter: 0,
    blackJack: false,
    checkForVictory: false
}

function Card(r, s, v) {
    this.rank = r
    this.suit = s
    this.value = v
    this.cardName = `${r}_of_${s}`
    this.image = `./images/Cards/png/${r}_of_${s}.png`
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
        $('.player-card-sum').text(`Player's score: ${playerSum}`);
    })
    Dealer.hand.forEach(function (times) {
        $(`<img class="cardimage" src="${times.image}"/>`).appendTo('.dealer-cards');
        $('.dealer-card-sum').text(`Dealer's score: ${dealerSum}`);

    })
}


function dealCards() {
    giveCards(2);
    showPlayerCards();
    checkforBlackJack();
    if (Player.blackJack === true || Dealer.blackJack === true) {
        checkforVictory();
    }
}


$('.hit').click(function () {
    Player.hand.push(myDeck.pop());
    let index = Player.hand.length - 1;
    $(`<img class="cardimage" src="${Player.hand[index].image}"/>`).appendTo('.player-cards');
    playerSum = playerSum + Player.hand[index].value;
    if (playerSum > 21) {
        $('.game-text-description').text('Player has Busted!');
        checkforVictory()
        return;
    }
    $('.player-card-sum').text(`Player's score: ${playerSum}`);
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
            $('.game-text-description').text(`Dealer stops at 17.`);
            return;
        } else if (dealerSum === 21) {
            $('.game-text-description').text(`The Dealer has gotten 21. Tough luck.`);
            return;
        } else if (dealerSum > 21) {
            $('.game-text-description').text(`The Dealer busted! Get that cash $$$`);
            return;
        }
        $('.dealer-card-sum').text(`Player's score: ${dealerSum}`);
    }
}

function checkforVictory() {
    if (playerSum <= 21 && playerSum > dealerSum) {
        $('.game-text').text('Player Wins!');
        Player.counter = Player.counter + 1;
        $('.player-score').text(`Player's wins: ${Player.counter}`);
        return;
    } else if (dealerSum <= 21 && dealerSum > playerSum) {
        $('.game-text').text('Dealer Wins!');
        Dealer.counter = Dealer.counter + 1;
        $('.dealer-score').text(`Dealer's score: ${Dealer.counter}`);
        return;
    } else if (dealerSum > 21) {
        $('.game-text').text('Player Wins!');
        Player.counter = Player.counter + 1;
        $('.player-score').text(`Player's score: ${Player.counter}`);
        return;
    } else if (playerSum > 21) {
        $('.game-text').text('Dealer Wins!');
        Dealer.counter = Dealer.counter + 1;
        $('.dealer-score').text(`Dealer's score: ${Dealer.counter}`);
        return;
    } else {
        $('.game-text').text(`It's a tie! Nothing gained nothing lost. Go big or go home next round.`);
    }
}

function checkforBlackJack() {
    if (playerSum === 21) {
        Player.blackJack = true;
        $('.game-text').text('BLACKJACK!');
    }
    if (dealerSum === 21) {
        Dealer.blackJack = true;
        $('.game-text').text('Dealer got the blackjack. You mad bro?');
    }
}

function redealCards() {
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
    $('.game-text').empty();
    $('.game-text-description').empty();
    redealCards();
})