var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userResponsePattern = [];
var level = 0;
var gameStatus = false;



// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");
  userResponsePattern.push(userChosenColor);
  console.log("User Pattern: " + userResponsePattern);

  $("#" + userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userResponsePattern.length-1);
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  console.log("Game Pattern: " + gamePattern);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  makeSound(randomChosenColor);
  userResponsePattern = [];
}

// function to play sound
// function makeSound(key) {
//   switch (key) {
//     case "green":
//       var audio = new Audio("./sounds/green.mp3");
//       audio.play();
//       break;
//     case "red":
//       var audio = new Audio("./sounds/red.mp3");
//       audio.play();
//       break;
//     case "yellow":
//       var audio = new Audio("./sounds/yellow.mp3");
//       audio.play();
//       break;
//     case "blue":
//       var audio = new Audio("./sounds/blue.mp3");
//       audio.play();
//       break;
//     default:
//       console.log("No sound for this button");
//   }
// }

// function to play sound - Method 2
function makeSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

 if (gameStatus == false) {
  // Code for keyboard press
  $(document).keypress(function(){
    if (gameStatus == false) {
      nextSequence();
    }
    gameStatus = true;
    
  });
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userResponsePattern[currentLevel]) {
    console.log("success");
    if (userResponsePattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStatus = false;
}
