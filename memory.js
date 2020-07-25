var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];
//alert(cards[11]);

var c = new Array(12);

shuffleArray(cards);

for (let i = 0; i < c.length; i++) {
    c[i] = document.getElementById("c" + i);
    c[i].addEventListener("click", function() { revealCard(i) });
}

var oneVisible = false;
var turnCounter = 0;
var visibleNr;
var lock = false;
var pairsLeft = 6;
var pair = new Audio("sound/pair.wav");
var winGame = new Audio("sound/winner.wav");

function revealCard(nr) {
    //alert(nr);
    var opacityValue = $('#c' + nr).css('opacity');

    if (opacityValue != 0 && lock == false) {
        lock = true;
        var obraz = "url(img/" + cards[nr] + ")";

        $('#c' + nr).css('background-image', obraz);
        $('#c' + nr).addClass('cardA');
        $('#c' + nr).removeClass('card');

        if (oneVisible == false) {
            oneVisible = true;
            visibleNr = nr;
            lock = false;
        } else {
            //second card
            if (cards[visibleNr] == cards[nr]) {
                setTimeout(function() { hide2Cards(nr, visibleNr) }, 1000);
                //para
            } else {
                setTimeout(function() { cover2Cards(nr, visibleNr) }, 750);
                //pudlo
            }

            turnCounter++;
            $('.score').html("Turn counter: " + turnCounter);
            oneVisible = false;
        }
    }
}

function hide2Cards(nr1, nr2) {
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');
    pair.play();

    pairsLeft--;

    if (pairsLeft == 0) {
        $('.board').html('<h1>You win!<br> ' + turnCounter + ' turns</h1> <br>' +
            '<input type="submit" onclick=location.reload() value="Reload game">');
        setTimeout(winGame.play(), 3000);
    };


    lock = false;
}

function cover2Cards(nr1, nr2) {
    $('#c' + nr1).css('background-image', 'url(img/karta.png)');
    $('#c' + nr1).removeClass('cardA');
    $('#c' + nr1).addClass('card');

    $('#c' + nr2).css('background-image', 'url(img/karta.png)');
    $('#c' + nr2).removeClass('cardA');
    $('#c' + nr2).addClass('card');

    lock = false;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}