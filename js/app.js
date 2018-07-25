/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
var moves = 0;
var correctlyGuessed = 0;             // how many have been guess correctly
var stars = 3;
var seconds = 0;


function add() {
  seconds++;
  $('#timer').text("seconds past: " + seconds)
  timer();
}

function timer() {
    t = setTimeout(add, 1000);
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var cardsSelected = 0;
var cardType;
var startTimer = false;
var startTimerOnce = true;

function eventCreator(){

    $(".card").on('click', function(){


      if (cardsSelected == 0) {
        startTimer = true

        if (startTimer && startTimerOnce) {     //starts the timer on first tap
          timer();
          startTimerOnce = false;
        }

        cardsSelected = 1;           //checks if a card is selected
        $(this).attr('class','card open show');
        $(this).children(":first").attr('id','sCard')
        cardType = $(this).children(":first").attr('class');  //creates a variable for the icon

      } else {

         if ($(this).children(":first").attr("id") != "sCard"){    // statement that checks if you don't click the same card

           moves++;
           checkStars(moves);
           $('.moves').text(moves);

           if ($(this).children(":first").attr('class') == cardType) { // checks if the icons match

            correctlyGuessed++;
            $('#sCard').parent().attr('class','card match');  //makes the css so they match
            $('#sCard').parent().off('click');
            $(this).attr('class','card match');  //makes the css so they match
            $(this).off('click');

            if (correctlyGuessed == 8){
                          // end game screen
              clearTimeout(t);
              $(".timer").css("text-align","center")
              $(".timer").css("font-size","3em")
              $(".container").hide();
              $(".winRepeat").show();
              $("body").append('<h1 id="winTitle"></h1>');
              $("#winTitle").text("You won in " + moves + " moves!");
              $('<div class="winRepeat" id="removeAbleDiv"><ul class="endStars"></ul></div>').insertAfter('.winRepeat');
              for(var i=0; i<stars; i++){
                $('.endStars').append('<li><i class="fa fa-star"></i></li>')
              }

            }

          } else {


          //     this is where the wrong animation is supposed to happen
            $(this).attr('class','card open show');
            const xcard = $(this);
            const xcard2 = $('#sCard').parent();
          //  $('#sCard').parents().attr('class','card');
            setTimeout(function(){
              xcard2.attr('class','card');
              xcard.attr('class','card');
            }, 300);

          }

          cardsSelected = 0;
          $('#sCard').removeAttr('id');
        }
      }
    });

}

var happenOnce12 = true;
var happenOnce20 = true;

function checkStars(moves){

  if (moves == 12 && happenOnce12){
    $('.stars').children(":first").hide();
    stars--;
    console.log('12 moves');
    happenOnce12 = false;
  }

  if (moves == 20  && happenOnce20){
    $('.stars').children(":nth-child(2)").hide();
    stars--;
    console.log("20 moves");
    happenOnce20 = false;
  }

}


function refresh() {
  startTimerOnce = true;             //command that starts / restarts the game
  startTimer = false;
  seconds = 0;
  $(".timer").css("text-align","left")
  $(".timer").css("font-size","1em")
  $("#timer").text('seconds past: 0');

  cardsSelected = 0;

// to remove end game stuff
  $(".winRepeat").hide();
  $("#winTitle").remove();

  const cardArray = shuffle([
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bomb",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle"
  ]);

  stars = 3;
  moves = 0;
  correctlyGuessed = 0;
  happenOnce12 = true;
  happenOnce20 = true;

  $(".card").remove();
  $("li").show();
  $("#removeAbleDiv").remove();
  for(var i=0;i<16;i++){
    $(".deck").append('<li class="new"></li>');
    $(".new").append('<i class="subnew"></i>');
    $(".new").attr('class','card');
    $(".subnew").attr('class',cardArray[i]);
    $(".moves").text(0);
  }

}


refresh();
eventCreator();

$(".fa-repeat").on('click', function(){    // repeat function
  refresh();
  eventCreator();
  $(".container").show();
});




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
