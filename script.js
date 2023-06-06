var startbutton = document.querySelector(".start");
var guidelines = document.querySelector(".intro");
var nextbutton = document.querySelector(".next");
let timeremaining = 90;
var countDown = document.querySelector(".countdown");
var timeout = document.querySelector(".quizsection");
var scoresheet = document.querySelector(".submitscores");
var scorehistory = document.querySelector (".leaderboard");
var attempt = 0

var theQuestions = [
    {question: "What symbol is an array inside of?",
            a:"/ /",
            b:"[ ]",
            c:"{ }",
            d:";",
            correct:"b",
        },
    
    {question: "What is the proper way to redeclare this variable? var studentCount = 3",
            a:"var student = 4",
            b:"studentCount = 4",
            c:"countStudent = 4",
            d:"count+1",
            correct:"b",
        },
    
    {question: "Which of the following is a boolean", 
            a:"9",
            b:"True",
            c:"String",
            d:"Variable",
            correct:"b",
        },
    
    {question: "How do you prevent default in a form?", 
            a:"stop",
            b:"event.preventDefault();",
            c:"return;",
            d:"event",
            correct:"b",
          },

];

var a_text = document.getElementById("a_text");
var b_text = document.getElementById("b_text");
var c_text = document.getElementById("c_text");
var d_text = document.getElementById("d_text");
var penalty = document.querySelectorAll(".option");
var questions = document.getElementById("question");
var continuequiz = document.querySelector(".submitanswer");
var connect = document.getElementById("quiz");
var score = document.querySelector("#score");
var submithighscore =document.querySelector(".submitbutton");
var initialsinput = document.getElementById("grade");


startbutton.addEventListener("click", () => {
    guidelines.style.display = "initial"
});

function beginTime() {
    var timer = setInterval(function (){
        timeremaining--;
        countDown.textContent = timeremaining;
        
        if (timeremaining === 0 || attempt === theQuestions.length) {
            clearInterval(timer);
            timeout.style.display = "none"
            scoresheet.style.display = "block"
            scorehistory.textContent = timeremaining
        } 
    }, 1000)
}

nextbutton.addEventListener("click", () => {
    timeout.style.display = 'block'
    guidelines.removeAttribute("style")
    startbutton.style.display = "none"

    beginTime()
    
});

submitanswers ();

function submitanswers() {
    wrong()
    var attemptscore = theQuestions[attempt]
    questions.innerText = attemptscore.question
    
    a_text.innerText = attemptscore.a
    b_text.innerText = attemptscore.b
    c_text.innerText = attemptscore.c
    d_text.innerText = attemptscore.d
};


function wrong(){
   penalty.forEach(penalty => penalty.checked = false);
   timeremaining--
};

function right() {
    let answer
    penalty.forEach(penalty => {
        if(penalty.checked){
            answer = penalty.id
        } 
    })
    return answer
};

continuequiz.addEventListener("click", (event) => {
    console.log ("this button works")
    event.preventDefault();
    var result = right()
    if(result) {
        if (result === theQuestions[attempt].correct)
        score++
    } 
    attempt++

    if(attempt < theQuestions.length) {
        submitanswers()
    } else {
        connect.innerHTML = `
        <h2>You have ${score}/${theQuestions.length} correct!</h2>
        `
    }
});

submithighscore.addEventListener('click', () => {

    var user ={
        initials:initialsinput.value.trim(),
    };
localStorage.setItem("user", JSON.stringify(user));
localStorage.setItem("Last Score", JSON.stringify(timeremaining));

});
