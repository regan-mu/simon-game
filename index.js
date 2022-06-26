let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;


// Start Game by pressing Any Key.
$(document).on('keydown', function(){
    if (!started){
        $('#level-title').text('level '+level);
        newSequence();
        started = true;
    }
})


 // Detect the Clicked Button. Add the clicked ID to user patterns as well call the playSound function with the ID
 $('.btn').on('click', function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


// Check for the clicked button matches the pattern generated
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        console.log('Success');
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                newSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log('Wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);
        playSound('wrong');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver()
    }
}

function newSequence(){
    // Increase the level by one everytime
    userClickedPattern = [];
    level++;
    $('#level-title').text('level ' + level);
    let randomNumber = Math.floor(Math.round(Math.random() * 3));
    // Get the chosen color and append it to the gamePattern Array.
    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // Play the sound
    playSound(randomChosenColor);

}
// Play the sound associated with each ID.
function playSound(name){
    audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}
// Animate the clicked Button.
function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    }, 100);
}


// Start Over.
function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}
