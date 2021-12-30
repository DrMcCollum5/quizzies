const questions = [
  {
    Question: "How many days are in a year?",
    a: [250, 365, 100],
    correct: 365,
  },
  {
    Question: "What does HTML stands for?",
    a: [
      "How to make language",
      "Hypertext Markup Language",
      "Hypotext mineral language",
    ],
    correct: "Hypertext Markup Language",
  },

  {
    Question:
      "In JavaScript, array is a single variable that us used to store differnt",
    a: ["objects", "elements", "events"],
    correct: "elements",
  },
  {
    Question: "How many minutes in an hour",
    a: [10, 30, 60],
    correct: 60,
  },
];

// Global Variables
var timer = document.getElementById("time");

var startBtn = document.getElementById("start-button");

var welcome = document.getElementById("welcome");

var quiz = document.getElementById("quiz");
var questionHeaderTitle =document.getElementById("question-header-title");

var choices= document.getElementById("choices");

var finalScore = document.getElementById("final-score");
var highScoreSection = document.getElementById("highScoreSection");

var initials = document.getElementById("itinals");

var submit = document.getElementById("submit");
var time = 20;
var timerId;
var qIndex = 0;

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// Click listener for the start button (click listeners are generally at the bottom of the page)
//initiate quiz
startBtn.onclick = startQuiz;

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});

// Start Quiz function
function startQuiz() {
  //hide the welcome div
  welcome.setAttribute("class", "hide");
  //unhide the quiz div
  quiz.removeAttribute("class", "hide");
  //start the timer
  timerId = setInterval(function () {
    time--;
    timer.textContent = time;

    if (time <= 0) {
      //call our quiz over function
      quizComplete();
    }
  }, 1000);
  // call the next function
  populateQuiz();
}







function populateQuiz() {
    //set avtive question
    var activeQuestion=questions[qIndex];
    //populate question
questionHeaderTitle.textContent=activeQuestion.Question;
activeQuestion.a.forEach(function (choice) {
    var aButton=document.createElement("button");
    aButton.setAttribute("value", choice)
    aButton.textContent=choice;
    aButton.onclick=chosenAnswer; 
    choices.append(aButton)

})



}

function quizComplete() {}

// store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);
