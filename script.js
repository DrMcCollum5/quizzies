const questions = [
	{
		question: "Commonly used data types DO NOT include:",
		answers: [
			'1. strings',
			'2. booleans',
			'3. alerts',
            '4. numbers'
        ],
		correctAnswer: '3. alerts'
	},
	{
		question: "The condition in an if/else statement is enclosed within _____.",
		answers: [
			'1. quotes',
			'2. curly brackets',
			'3. parentheses',
            '4. square brackets'
        ],
		correctAnswer: '3. parentheses'
	},
    {
		question: "Arrays in JavaScript can be used to store _____.",
		answers: [
			'1. numbers and strings',
			'2. other arrays',
			'3. booleans',
            '4. all of the above'
        ],
		correctAnswer: '4. all of the above'
	},
    {
		question: "String values must be enclosed within ______ when being assigned to variables.",
		answers: [
			'1. commas',
			'2. curly brackets',
			'3. quotes',
            '4. parentheses'
        ],
		correctAnswer: '3. quotes'
	},
    		
	];


// Global Variables
var timer = document.getElementById("time");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("welcome");
var startQuizBtn = document.getElementById("start-button");
var choices = document.getElementById("choices");
var questionHeaderTitle = document.getElementById("question-header-title");
var quiz = document.getElementById("quiz");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");


// Other variables
var correctAnswer = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;
var startTimer;




// WHEN I click the start button, timer starts

var totalTime = 151;
function newQuiz() {

    timer.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
//    questionDiv.style.display = "block";
    quiz.style.display = "block";
    timer.style.display = "block";
   // timesUp.style.display = "none";

    startTimer = setInterval(function() {
        totalTime--;
        timer.textContent = totalTime;
        if(totalTime <= 0) {
            totalTime = 0;

        }
    },1000);

    nextQuestion();
};



function nextQuestion() {

    console.log(questions[questionIndex].question)
    questionHeaderTitle.textContent = questions[questionIndex].question;

    choices.innerHTML = "";

    questions[questionIndex].answers.forEach(function(answer) {
        var answerElement = document.createElement("button");
        answerElement.setAttribute("value", answer);
        answerElement.textContent = answer
        answerElement.addEventListener("click", checkAnswer)
        choices.append(answerElement)


    })
    // choiceA.textContent = questions[questionIndex].choices[0];
    // choiceB.textContent = questions[questionIndex].choices[1];
    // choiceC.textContent = questions[questionIndex].choices[2];
    // choiceD.textContent = questions[questionIndex].choices[3];
}

// after question is answered, show if correct or wrong
function checkAnswer() {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (this.value === questions[questionIndex].correctAnswer) {
        // correct answer, add 1 score to final score
        correctAnswer++;
        // console.log(correctAns);
        answerCheck.textContent = "Correct!";
    } else {
        // wrong answer, deduct 10 second from timer
        totalTime -= 10;
        timer.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // repeat with the rest of questions 
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // if no more question, run game over function
        gameOver();
    }
}


// when all questions are answered or timer reaches 0, game over
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    clearInterval(startTimer);
   // timesUp.style.display = "block";

    // show final score
    finalScore.textContent = correctAnswer;
}

// enter initial and store highscore in local storage
function storeHighScores() {
   // event.preventDefault();

    // stop function is initial is blank
  
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    var allScores = JSON.parse(localStorage.getItem("allScores")) || [];
    var newScore = {
        score: correctAnswers,
        initials: initials
    }

    allScores.push(newScore);

    startDiv.style.display = "none";
    timer.style.display = "none";
  //  timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   
}
    
    // ADD EVENT LISTENERS
    
   startQuizBtn.addEventListener("click", newQuiz);

   
   submitInitialBtn.addEventListener("click", function(){ 
       storeHighScores();
   });
   
//    viewHighScore.addEventListener("click", function() { 
//        showHighScores();
//    });
   
//    goBackBtn.addEventListener("click", function() {
//        startDiv.style.display = "block";
//        highScoreSection.style.display = "none";
//    });
   
//    clearHighScoreBtn.addEventListener("click", function(){
//        window.localStorage.removeItem("high scores");
//        listOfHighScores.innerHTML = "High Scores Cleared!";
//        listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
//    });