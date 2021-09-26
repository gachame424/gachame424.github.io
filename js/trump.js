const OVERLAY_OPEN_MS = 1000;
const OVERLAY_CLOSE_MS = 2000;

function highLow(hand, is_high) {
    disableButton();
    let draw_trump = drawTrump(hand);
    trumpOpen(draw_trump);
    overlay(judge(hand, draw_trump, is_high));
    changeTrump();
    sleep(OVERLAY_OPEN_MS + OVERLAY_CLOSE_MS, function () {
        ableButton();
    });
}

function disableButton() {
    let button_highlow = document.getElementsByClassName('button_highlow');
    for (let i = 0; i < button_highlow.length; i++) {
        button_highlow[i].disabled = true;
    }
}

function ableButton() {
    let button_highlow = document.getElementsByClassName('button_highlow');
    for (let i = 0; i < button_highlow.length; i++) {
        button_highlow[i].disabled = false;
    }
}

function drawTrump(hand = 0) {
    let rand = Math.floor(Math.random() * 52 + 1);
    while (hand === rand) {
        rand = Math.floor(Math.random() * 52 + 1);
    }

    return rand;
}

function trumpOpen(draw_trump) {
    let back = document.getElementById('trump_back');
    back.classList.remove('back');
    back.classList.add('front');
    changeBack(draw_trump);
}

function overlay(judge) {
    sleep(OVERLAY_OPEN_MS, function () {
        overlayOpen(judge);
        sleep(OVERLAY_CLOSE_MS, function () {
            overlayClose();
        });
    });
}

function changeTrump() {
    sleep(OVERLAY_OPEN_MS + OVERLAY_CLOSE_MS, function () {
        trumpClose();
        let hand = drawTrump();
        changeFront(hand);
        changeBack();
        updateButtonValue(hand);
    });
}

function sleep(ms, callbackFunc) {
    setTimeout(callbackFunc, ms);
}

function trumpClose() {
    let back = document.getElementById('trump_back');
    back.classList.remove('front');
    back.classList.add('back');
}

function overlayOpen(judge) {
    let overlay = document.getElementById('overlay');
    overlay.classList.add('overlay-open');
    let overlay_text = document.getElementById('overlay_text');
    overlay_text.textContent = convertJudge(judge);
}

function overlayClose() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('overlay-open');
    let overlay_text = document.getElementById('overlay_text');
    overlay_text.textContent = '';
}

function changeFront(hand) {
    let front_num = document.getElementById('front_num');
    front_num.textContent = convertNum(calcNum(hand));
    let front_suit = document.getElementsByClassName('front_suit');
    let suit = convertSuit(calcSuit(hand));
    for (let i = 0; i < front_suit.length; i++) {
        front_suit[i].innerHTML = suit;
    }
}

function changeBack(draw_trump = 0) {
    let back_num = document.getElementById('back_num');
    back_num.textContent = draw_trump === 0 ? '' : convertNum(calcNum(draw_trump));
    let back_suit = document.getElementsByClassName('back_suit');
    let suit = draw_trump === 0 ? '' : convertSuit(calcSuit(draw_trump));
    for (let i = 0; i < back_suit.length; i++) {
        back_suit[i].innerHTML = suit;
    }
}

const WIN = 1;
const LOSE = 2;
const DRAW = 3;
function judge(hand, draw_trump, is_high) {
    const STRONG_NUM = 99;
    let hand_num = calcNum(hand);
    hand_num = hand_num === ACE ? STRONG_NUM : hand_num;
    let draw_num = calcNum(draw_trump);
    draw_num = draw_num === ACE ? STRONG_NUM : draw_num;
    if (hand_num === draw_num) {
        return DRAW;
    }
    if ((is_high && hand_num < draw_num) || !is_high && draw_num < hand_num) {
        return WIN;
    }

    return LOSE;
}

const ACE = 1;
const JACK = 11;
const QUEEN = 12;
const KING = 13;
function convertNum(num) {
    if (num === ACE) {
        return 'A';
    }
    if (num === JACK) {
        return 'J';
    }
    if (num === QUEEN) {
        return 'Q';
    }
    if (num === KING) {
        return 'K';
    }

    return num;
}

function convertSuit(suit) {
    const SPADE = 1;
    const DIAMOND = 2;
    const HEART = 3;
    if (suit === SPADE) {
        return '&#9824;';
    }
    if (suit === DIAMOND) {
        return '&#9830;';
    }
    if (suit === HEART) {
        return '&#9829;';
    }
    return '&#9827;';
}

function convertJudge(judge) {
    if (judge === WIN) {
        return 'Win!!';
    }
    if (judge === LOSE) {
        return 'Lose...';
    }

    return 'Draw';
}

function calcNum(trump) {
    let num = trump % 13;
    if (num === 0) {
        num = KING;
    }

    return num;
}

function calcSuit(trump) {
    let num = trump % 13;
    let suit = Math.floor(trump / 13);
    if (num === 0) {
        --suit;
    }

    return suit;
}

function updateButtonValue(hand) {
    let button_highlow = document.getElementsByClassName('button_highlow');
    for (let i = 0; i < button_highlow.length; i++) {
        button_highlow[i].value = hand;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let hand = drawTrump();
    changeFront(hand);
    updateButtonValue(hand);
    document.querySelector('.flexbox').style.minHeight = 'calc(' + window.innerHeight + 'px - 48px)';
});
