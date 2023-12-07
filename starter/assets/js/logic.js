
// start and end screens
const start = document.getElementById('start');

let startScreen = document.getElementById('start-screen');

const end = document.getElementById('end-screen');

// questions

let quezzies = document.getElementById('questions');

let questionplace = document.getElementById('question-0');

//buttons

let buttonA = document.getElementById("a");
let buttonB = document.getElementById("b");
let buttonC = document.getElementById("c");
let buttonD = document.getElementById("d");

// all buttons

let allbuttons = document.querySelectorAll(".choices");

// submitscore input

let submitScore = document.getElementById("submit");

// initials input

let highscoreInput = document.getElementById("initials");


// audio variables

const correctaudio = new Audio("starter/assets/sfx/correct.wav");

const wrongaudio = new Audio("starter/assets/sfx/incorrect.wav");

//right answer 

const rightanswer = document.getElementById('smart');

// wrong answer

const wronganswer = document.getElementById('dumb');

let questionzz = document.getElementById('question-1');

let score = 0;

// ref to highscore div and element ????



let HighscorePage = document.getElementById("highScores");

// questions and counters

let lastQuestion = Questions.length;
let currentQuestion = 0;
let correct;
let clickedanswer;

// seconds for counter - also the score!

let sec = 0;

// ref to score display

let scoreval = document.getElementById('final-score');



// generates the questions for the quiz

function QuizQuestion() {

    // if current question is the last, hide questions, get score and show end screen

    if (currentQuestion === lastQuestion) {
        quezzies.className = 'hide';
        end.className = 'show';
        //clearInterval(timer);
        scoreval.textContent = sec;

    }

    // matches answer selected to the correct answer specified in questions object

    questionplace.textContent = Questions[currentQuestion].question;
    buttonA.textContent = Questions[currentQuestion].choiceA;
    buttonB.textContent = Questions[currentQuestion].choiceB;
    buttonC.textContent = Questions[currentQuestion].choiceC;
    buttonD.textContent = Questions[currentQuestion].choiceD;
};


// on clicked, start screen is hidden and questions show

start.addEventListener('click', function () {

    startScreen.className = 'hide';
    end.className = 'hide';

    quezzies.className = 'show';


    // timer starts once start is clicked -starts at 30 seconds

    var timer = setInterval(function () {
        document.getElementById('time').innerHTML = '00:' + sec;
        sec--;
        if (sec < 0 || currentQuestion === lastQuestion) {
            clearInterval(timer);
            quezzies.className = 'hide';
            end.className = 'show';
            // accounts for latency
            scoreval.textContent = sec + 1;
        }
    }, 1000);

    sec = 30;

    // quizquestion generator function is then called

    QuizQuestion();


});

// on click event for all buttons in questions

allbuttons.forEach(item => {
    item.addEventListener('click', event => {

        // event target is the answer clicked, then gets a reference to Id

        clickedanswer = event.target;
        let state = clickedanswer.getAttribute("id");

        // if the Id matches the correct answer, then the timer is incremented and correct audio is played
        // message appears,  then the next question appears
        if (state === Questions[currentQuestion].correctAnswer) {

            rightanswer.className = 'show';
            setTimeout(() => {
                rightanswer.className = 'hide';
            }, 2000);
            currentQuestion = currentQuestion + 1;
            QuizQuestion();
            correctaudio.play();
            sec = sec + 10;
        }

        // if answer is incorrect, then wrong audio palys, message appears, and timer is decremented
        else {

            wrongaudio.play();
            sec = sec - 10;
            wronganswer.className = 'show';
            setTimeout(() => {
                wronganswer.className = 'hide';
            }, 2000);
        };
    })
});

// Replays the quiz by resetting the timer down to 0 and resetting the question incrementor
function replayQuiz() {
    sec = 0;
    currentQuestion = 0;
    startScreen.className = 'show';

};



//once button is clicked, score and initials are saved to local storage

submitScore.addEventListener("click", function highscore() {


    if (highscoreInput.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInput.value.trim();
        let currentHighscore = {
            name: currentUser,
            // accounts for latency
            score: sec + 1
        };

        //  high score is added and converted to string value

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));

        //end screen is hidden
        end.className = 'hide';
        replayQuiz();

    }
});