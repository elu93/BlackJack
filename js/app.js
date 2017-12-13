let Player = {
    name: null,
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

let dealerSum = 0;
let playerSum = 0;
let myDeck = [];



$(function () {
    //Creates Player Name
    swal("Welcome! Who's playin' BlackJack today?", {
        content: "input",
    }).then((value) => {
        swal(`Welcome, ${value}! Let's see if you can make some money today.`);
        Player.name = value;
        changePlayerName();
        dealCards();
    });

    $('.hit').click(function () {
        Player.hand.push(myDeck.pop());
        let index = Player.hand.length - 1;
        $(`<img class="cardimage" src="${Player.hand[index].image}"/>`).appendTo('.player-cards');
        playerSum = playerSum + Player.hand[index].value;
        if (playerSum > 21) {
            checkforVictory()
            $('.hit').hide();
            $('.stay').hide();
            return;
        }
        $('.player-card-sum').text(`Player's hand: ${playerSum}`);
    })

    $('.stay').click(function () {
        $('.dealer-card-sum').text(`Dealer's hand: ${dealerSum}`);
        dealCardstoDealer();
        checkforVictory();
        $('.stay').hide();
        $('.hit').hide();
    })

    $('.redeal').click(function () {
        $('.cardimage').remove();
        $('.game-text').empty();
        $('.game-text-description').empty();
        redealCards();
        $('.hit').show();
        $('.stay').show();
    })
});




function giveCards(numberOfTimes) {
    for (i = 0; i < numberOfTimes; i++) {
        Player.hand.push(myDeck.pop());
        playerSum = playerSum + Player.hand[i].value;
        Dealer.hand.push(myDeck.pop());
        dealerSum = dealerSum + Dealer.hand[i].value;
    }
}

function showPlayerCards() {
    Player.hand.forEach(function (times) {
        $(`<img class="cardimage" src="${times.image}"/>`).appendTo('.player-cards');
        $('.player-card-sum').text(`Player's hand: ${playerSum}`);
    })

    $(`<img class="cardimage" src="${Dealer.hand[0].image}"/>`).appendTo('.dealer-cards');
    $(`<img class="cardimageBack" src="./images/Cards/png/back.png"/>`).appendTo('.dealer-cards');
    $('.dealer-card-sum').text(`Dealer's hand: ${Dealer.hand[0].value}`);
}


function dealCards() {
    myDeck = shuffle(getDeck());
    giveCards(2);
    showPlayerCards();
    checkPlayerForBlackJack();
    if (Player.blackJack === true || Dealer.blackJack === true) {
        showBlackJackPlayer();
    }
}




function dealCardstoDealer() {
    $('.cardimageBack')
    $('.cardimageBack').remove();
    $(`<img class="cardimage" src="${Dealer.hand[1].image}"/>`).appendTo('.dealer-cards');
    while (dealerSum < 21) {
        Dealer.hand.push(myDeck.pop());
        let index = Dealer.hand.length - 1;
        checkDealerForBlackJack();
        if (dealerSum < 17) {
            dealerSum = dealerSum + Dealer.hand[index].value;
            $(`<img class="cardimage" src="${Dealer.hand[index].image}"/>`).appendTo('.dealer-cards');
        } else if (dealerSum < 21 && dealerSum >= 17) {
            return;
        } else if (dealerSum > 21) {
            return;
        }
        $('.dealer-card-sum').text(`Dealer's score: ${dealerSum}`);
    }
}

function checkforVictory() {
    if (playerSum <= 21 && playerSum > dealerSum) {
        playerWins();
        Player.counter = Player.counter + 1;
        $('.player-score').text(`${Player.name}'s wins: ${Player.counter}`);
        return;
    } else if (dealerSum <= 21 && dealerSum > playerSum) {
        dealerWins();
        Dealer.counter = Dealer.counter + 1;
        $('.dealer-score').text(`Dealer's wins: ${Dealer.counter}`);
        return;
    } else if (dealerSum > 21) {
        playerWins();
        Player.counter = Player.counter + 1;
        $('.player-score').text(`${Player.name}'s wins: ${Player.counter}`);
        return;
    } else if (playerSum > 21) {
        dealerWins();
        Dealer.counter = Dealer.counter + 1;
        $('.dealer-score').text(`Dealer's wins: ${Dealer.counter}`);
        return;
    } else {
        swal("TIE!", "lul did you think you were gonna win?", "warning");
    }
}

function checkPlayerForBlackJack() {
    if (playerSum === 21) {
        Player.blackJack = true;
        showBlackJackPlayer();
        $('.hit').hide();
        $('.stay').hide();
    }
}

function checkDealerForBlackJack() {
    if (dealerSum === 21) {
        Dealer.blackJack = true;
        showBlackJackDealer();
        $('.hit').hide();
        $('.stay').hide();
    }
}

function redealCards() {
    $('.cardimageBack').remove();
    Player.blackJack = false;
    Dealer.blackJack = false;
    Player.hand = [];
    Dealer.hand = [];
    playerSum = 0;
    dealerSum = 0;
    myDeck = shuffle(getDeck());
    dealCards();
}




function playerWins() {
    swal("Good Job!", "Player Wins!", "success")
};

function dealerWins() {
    swal("Dealer Wins", "Awww, the dealer took your money", "error")
};

function changePlayerName() {
    $('.playerName').text(`${Player.name}'s Scoreboard`);
}

function showBlackJackPlayer() {
    swal("BLACKJACK!", "WINNER WINNER CHICKEN DINNER", "success")
    Player.counter = Player.counter + 1;
    $('.player-score').text(`${Player.name}'s wins: ${Player.counter}`)
}

function showBlackJackDealer() {
    swal("Tough luck", "Dealer got black jack. U mad bro?", "warning")
}