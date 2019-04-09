// Array of objects containing my questions
questions = [
    {
        question: "What year did World War 2 start?",
        answers: [1918, 1912, 1945, 1939],
        answer: 1939,
        IMGUrl: "assets/images/ww2map.png"
    },
    {
        question: "What was the most produced tank of the war?",
        answers: ["M4 Sherman", "Panzer MkVI", "T34", "The Tiger"],
        answer: "T34",
        IMGUrl: "assets/images/T34.jpg"
    },
    {
        question: "What year did America join the war?",
        answers: [1939, 1941, 1944, 1945],
        answer: 1941,
        IMGUrl: "assets/images/ww2map.png"
    },
    {
        question: "What is the date for VE day? (Victory in Europe)",
        answers: ["1918", "1912", "1945", "1939"],
        answer: "May 8th, 1945",
        IMGUrl: "assets/images/VEday.jpg"
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
var timer = 10;
var currentQuestion;
var correct = 0;
var incorrect = 0;
var currentQuestionNumber = 0;

// Global Functions
var clearTestArea = function () {
    $("#answers").empty();
    $("#correct-image").empty();
    $("#question-true-false").empty();
    $("#timer").text("");
}
var loadQuestion = function (questionobject) {
    currentQuestion = questionobject;
    clearTestArea();
    $("#question-true-false").text(questionobject.question);
    for (let i = 0; i < questionobject.answers.length; i++) {
        $("#answers").append('<button class="answerbutton btn btn-secondary" data-answer="' + questionobject.answers[i] + '">' + questionobject.answers[i] + '</button>')
    }
    $("#timer").text(timer);
    countdown = setInterval(pageTimer, 1000);
}

var timesUp = function () {
    clearInterval(countdown);
    timer = 10;
    currentQuestionNumber++;
    clearTestArea();
    $("#question-true-false").text("Time's up! The correct answer is: " + currentQuestion.answer);
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');
    setTimeout(function () {
        loadQuestion(questions[currentQuestionNumber]);
    }, 3000);
}

var pageTimer = function () {
    timer--;
    $("#timer").html(timer);
    if (timer <= 0) {
        console.log("times up");
        timesUp();
    }
}

var chosenCorrectly = function () {
    currentQuestionNumber++;
    correct++;
    clearInterval(countdown);
    clearTestArea();
    $("#question-true-false").text("Correct!");
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');
    setTimeout(function () {
        loadQuestion(questions[currentQuestionNumber]);
    }, 3000);
}
var chosenIncorrectly = function () {
    currentQuestionNumber++;
    incorrect++;
    clearInterval(countdown);
    clearTestArea();
    $("#question-true-false").text("Incorrect! The correct answer is: " + currentQuestion.answer);
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');
    setTimeout(function () {
        loadQuestion(questions[currentQuestionNumber]);
    }, 3000);
}

var gameOver = function () {
    clearTestArea();
    $("#timer").remove();
    var results = "Game over! You answered " + correct + "/" + incorrect + " correctly!"
    $("#header-area").append("<h2>" + results + "</h2>");
}

$(document).ready(function () {
    console.log("page loaded");
    $(".start").on("click", function () {
        gameActive = true;
        $(".start").hide();
        loadQuestion(questions[0]);
    })
    $(document).on("click", ".answerbutton", function (event) {
        console.log("buttonworks");
        console.log("Answer: " + currentQuestion.answer);
        if ($(event.target).data("name") === '"' + currentQuestion.answer + '"') {
            console.log("chose correctly!");
            chosenCorrectly();
        } else {
            console.log("chose incorrectly!");
            chosenIncorrectly();
        }
    })
})