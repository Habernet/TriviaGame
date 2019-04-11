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
        IMGUrl: "assets/images/pearlharbor.jpg"
    },
    {
        question: "What is the date for VE day? (Victory in Europe)",
        answers: ["May 7th, 1918", "March 5th, 1912", "May 8th, 1945", "October 13th, 1939"],
        answer: "May 8th, 1945",
        IMGUrl: "assets/images/VEday.jpg"
    },
    {
        question: "What was the name of the plutonium bomb used by America?",
        answers: ["Fat Man", "Thin Man", "Big Kahuna", "Big Bang"],
        answer: "Fat Man",
        IMGUrl: "assets/images/fatman.jpg"
    },
    {
        question: "What was Germany's go-to fighter aircraft for most of the war?",
        answers: ["Focke-Wulf 190", "Messerschmitt BF-109", "Heinkel HE-111", "Supermarine Spitfire"],
        answer: "Messerschmitt BF-109",
        IMGUrl: "assets/images/bf109.jpg"
    },
    {
        question: 'Which weapon was referred to as "Hitlers BuzzSaw?"',
        answers: ["MG-42", "NebelWerfer", "MP-40", "Lee-Enfield"],
        answer: "MG-42",
        IMGUrl: "assets/images/mg42.jpg"
    },
    {
        question: "Which battle was essentially Germany's last chance at changing the tide of war?",
        answers: ["The Battle of the Somme", "The Battle of the Bulge", "D-Day", "Battle of Britain"],
        answer: "The Battle of the Bulge",
        IMGUrl: "assets/images/bastogne.jpg"
    },
    {
        question: "What engine made the P51 it's great range and power?",
        answers: ["Daimler Benz DB-605", "Allison V-1710", "Rolls Royce Merlin", "Junkers Jumo 004"],
        answer: "Rolls Royce Merlin",
        IMGUrl: "assets/images/rollsroyce.jpg"
    }
]


// Global Variables
var timer = 10;
var currentQuestion;
var correct = 0;
var currentQuestionNumber = 0;

// Global Functions

var clearTestArea = function () {
    $("#answers").empty();
    $("#correct-image").empty();
    $("#question-true-false").empty();
    $("#timer").text("");
}
var pageTimer = function () {
    timer--;
    $("#timer").html(timer);
    if (timer <= 0) {
        timesUp();
    }
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
var lastQuestion = function () {
    if (currentQuestionNumber < questions.length) {
        return false;
    } else {
        return true;
    }
}


var timesUp = function () {
    clearInterval(countdown);
    timer = 10;
    currentQuestionNumber++;
    clearTestArea();
    $("#question-true-false").text("Time's up! The correct answer is: " + currentQuestion.answer);
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');
    if (!lastQuestion()) {
        setTimeout(function () {
            loadQuestion(questions[currentQuestionNumber]);
        }, 3000);
    } else {
        setTimeout(function () {
            gameOver();
        }, 3000);
    }
}

var chosenCorrectly = function () {
    currentQuestionNumber++;
    correct++;
    clearInterval(countdown);
    timer = 10;
    clearTestArea();
    $("#question-true-false").text("Correct!");
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');
    if (!lastQuestion()) {
        setTimeout(function () {
            loadQuestion(questions[currentQuestionNumber]);
        }, 3000);
    } else {
        setTimeout(function () {
            gameOver();
        }, 3000);

    }
}
var chosenIncorrectly = function () {
    currentQuestionNumber++;
    clearInterval(countdown);
    timer = 10;
    clearTestArea();
    $("#question-true-false").text("Incorrect! The correct answer is: " + currentQuestion.answer);
    $("#correct-image").html('<img src ="' + currentQuestion.IMGUrl + '">');
    if (!lastQuestion()) {
        setTimeout(function () {
            loadQuestion(questions[currentQuestionNumber]);
        }, 3000);
    } else {
        setTimeout(function () {
            gameOver();
        }, 3000);
    }
}

var gameOver = function () {
    clearTestArea();
    $("#timer").remove();
    resultstimeout = setTimeout(function () {
        var results = "Game over! You answered " + correct + "/" + 9 + " correctly!"
        // Do you only need to count the correct??
        $("#header-area").append("<h2>" + results + "</h2>");
    })

}

$(document).ready(function () {
    $(".start").on("click", function () {
        $(".start").hide();
        loadQuestion(questions[0]);
    })
    $(document).on("click", ".answerbutton", function (event) {
        if ($(event.target).data("answer") === currentQuestion.answer) {
            chosenCorrectly();
        } else {
            chosenIncorrectly();
        }
    })
})



// Look at refactoring code CORRECTLY
// Add questions!
