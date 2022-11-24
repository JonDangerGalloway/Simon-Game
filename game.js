var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
userClickPattern = [];
started = false;
level = 0;

$(document).keypress(function() {
    if(!started) {
        nextSequence();
        started = true;
        $("h1").html("Level " + level);
    }
});

$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});


function nextSequence() {
    userClickPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").html("Level " + level);
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

function playSound(input) {
    var sound = new Audio("sounds/" + input + ".mp3");
    sound.play();
};

function checkAnswer(currentLevel) {
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").html("Game Over, Press A Key");
        startOver();
    };
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};