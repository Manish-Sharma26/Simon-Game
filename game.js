let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started=false;
$(".bttn").css('pointer-events','none');
$(".bttn1").on("click",function(){
  if(!started){
  $(".title").text("Level "+ level);
  $(".bttn1").text("Watch");
  nextSequence();
  started=true;}
})
function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] == userClickedPattern[currentlevel]){
      if(userClickedPattern.length == gamePattern.length){
        $(".bttn").css('pointer-events','none');
        setTimeout(function(){
          $(".bttn1").text("Right");
        },500)
        setTimeout(function(){
          nextSequence();
          $(".bttn1").text("Watch");
        },1200)
      }
    }
    else{
      playSound("wrong");
      $(".title").html(`Game Over, Your score is <span id='score'>${level-1}</span>` );
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
        $(".bttn1").text("Play again");
      },200)
      startOver();
    }
}

function delay(i){
  setTimeout(() => {
    $("#" + gamePattern[i]).fadeOut(70).fadeIn(70);
  playSound(gamePattern[i]);
  $(".bttn1").text("Watch");
  }, 1000*(i+1)); 
}
function nextSequence() {
  userClickedPattern=[];
  level++;
  $(".title").text("Level "+ level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  for (let i=0;i<gamePattern.length ;i++){
    delay(i);
    
  }
  setTimeout(() => {
    $(".bttn1").text("Guess");
    $(".bttn").css('pointer-events','all');
    
  }, 1000*(gamePattern.length+1));
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");
  },80);
}

$(".bttn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  $(".bttn1").text(userClickedPattern.length);
  checkAnswer(userClickedPattern.length - 1);
})

function startOver(){
  level = 0;
  started=false;
  gamePattern=[];
}

