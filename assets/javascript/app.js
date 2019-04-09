// Array of objects containing my questions
questions = [
    {
        question: "What year did World War 2 start?",
        answers: [1918, 1912, 1945, 1939],
        answer: 1939,
        IMGUrl: "URL HERE"
    },
    {
        question: "What was the most produced tank of the war?",
        answers: ["M4 Sherman", "Panzer MkVI", "T34", "The Tiger"],
        answer: "T34",
        IMGUrl: "URL HERE"
    },
    {
        question: "What year did America join the war?",
        answers: [1939, 1941, 1944, 1945],
        answer: 1941,
        IMGUrl: "URL HERE"
    },
    {
        question: "What is the date for VE day? (Victory in Europe)",
        answers: ["1918", "1912", "1945", "1939"],
        answer: "May 8th, 1945",
        IMGUrl: "URL HERE"
    },
    {
        question: "What was the name of the plutonium bomb used by America?",
        answers: ["Fat Man", "Thin Man", "Big Kahuna", "Big Bang"],
        answer: "Fat Man",
        IMGUrl: "assets/images/fatman.jpg"
    },

]


// Global Variables
var gameActive = false;
var questionAnswered = false;
var outofTime = false;
var timer = 60;
var currentQuestion;
var correct = 0;
var incorrect = 0;
// var currentQuestionNumber;

// Global Functions
var loadQuestion = function (questionobject) {
    // set this question to the current question variable
    currentQuestion = questionobject;
    // uses Jquery to fill the respective DIVs on the page
    $("#question-true-false").text(questionobject.question);
    for (let i = 0; i < questionobject.answers.length; i++) {
        $("#answers").append('<button class="answerbutton" data-answer="'+ questionobject.answers[i] + '">' + questionobject.answers[i] + '</button>')
    }
    //initialize timer
    $("#timer").text(timer);
    // start the timer
    timerstart = setInterval(pageTimer, 1000);
}
var nextQuestion = function () {
    // uses Jquery to load the next question onto the page
}
var timesUp = function () {
    // stop the timer
    clearInterval(timerstart);
    // display correct answer on the page
    $("#question-true-false").text("Time's up! The correct answer is: " + currentQuestion.answer);
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');
}
var pageTimer = function () {
    timer--;
    $("#timer").html(timer);
    if (timer <= 0) {
        console.log(timerstart);
        timesUp();
    }
}

var chosenCorrectly = function (currentQuestion) {
    clearInterval(pageTimer);
    $("#question-true-false").text("Correct!");
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');

}
var chosenIncorrectly = function () {
    clearInterval(pageTimer);
    $("#question-true-false").text("Incorrect! The correct answer is: " + currentQuestion.answer);
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');
}

var gameOver = function(){
    // this will hide everything on screen and show how many were correct/incorrect etc.

}

// Game logic PsuedoCode
// High level
// document onready()
// Page loads...Only thing showing is Start button. 
// Start button on click...gameActive = true, hide start button
// load a question1 (timer starts)
// if you click


$(document).ready(function () {
    console.log("here first");
    $(".start").on("click", function () {
        console.log(gameActive);
        gameActive = true;
        console.log(gameActive);
        $(".start").hide();
        loadQuestion(questions[4]);
    })
    $(document).on("click", ".answerbutton", function (event) {
        console.log("buttonworks");
        console.log("Answer: " + currentQuestion.answer);
        if ($(event.target).data("name") =='"' + currentQuestion.answer + '"') {
            console.log("this works");
            // Right answer, load next question
            chosenCorrectly(currentQuestion);

        } else {
            console.log("this works too");
            // wrong answer, load next question
            chosenIncorrectly(currentQuestion);
        }
    })
})