let start = document.getElementById("prompt")
let quiz = document.getElementById("quiztime")
let quest = document.getElementById("question")
let a1 = document.getElementById("answer1")
let a2 = document.getElementById("answer2")
let a3 = document.getElementById("answer3")
let a4 = document.getElementById("answer4")
let scorebox = document.getElementById("scorebox")
let score = 0
let right = document.getElementById("correct")
let incorrect = document.getElementById("incorrect")
let gameOver = document.getElementById("results")
let sTable = document.getElementById("score-table")
let timer = document.getElementById("timer")
let fscore = document.getElementById("scorefinal")
let seconds = 120
let initials = document.getElementById("initials")
let saveScr = document.getElementById("submit-initials")
let recentScore = localStorage.getItem("recentscore")
fscore.innerHTML = recentScore
let maxTop = 10
let test = [
    {
        question: "How do I display message 'Hello World' in an on-screen alert box using JavaScript?",
        a: "alert(Hello World)",
        b: "alert(HelloWorld)",
        c: "alert('Hello World')",
        d: "log('Hello World')",
        correct: "c"
        },
    {
        question: "let x=16; let y=8; let z=eval(x/y). What will be logged to the console for console.log(z)?",
        a: "5",
        b: "2",
        c: "24",            
        d: "8/16",
        correct: "b"
        },
    {   
        question: "Which 'if' statement is correct for x is equal to y?",
        a: "if(x===y)",
        b: "if(x=y)",
        c: "if(x,y)",
        d: "if(x!=y)",
        correct: "a"
        },
    {
        question: "What belongs between <> when calling JavaScript in HTML?",
        a: "js",
        b: "jscript",
        c: "script=",
        d: "script",
        correct: "d"
        },
    {
        question: "Which is NOT a possible syntax when creating a 'for' loop?",
        a: "for(i=0; i < x; i++)",
        b: "for(i=0; i < x; i = i+1)",
        c: "for(i=0; i || x; i++)",
        d: "for(i=1; i > x; i++)",
        correct: "c"
        },
    {
        question: "What file code is JavaScript saved under?",
        a: ".js",
        b: ".java",
        c: ".md",
        d: ".script",
        correct: "a"
        }, 
    {
        question: "How long did it take to create JavaScript?",
        a: "100 days",
        b: "10 months",
        c: "10 days",
        d: "1 year",
        correct: "c"
        },         
    {
        question: "Which is NOT a correct syntax for naming variables?",
        a: "let x = y",
        b: "which x = y",
        c: "var x = y",
        d: "const x = y",
        correct: "b"
        },
    {
        question: "How do I call id='example' from JavaScript?",
        a: "document.getElementById('h1')",
        b: "document.getElementByClass('example')",
        c: "document.getElement('example')",
        d: "document.getElementById('example')",
        correct: "d"
        },
    {
        question: "Which of the following is an array of strings?",
        a: "let x = [true, false, false]",
        b: "let x('r', 'w', 'z')",
        c: "let x = ['r', 'w', 'z']",
        d: "let x = [1, 2, 3]",
        correct: "c"
        },    
    ];

let curQ = 0
let qIndex = test.length - 1
let nextQ = curQ + 1
let qCounter = 0
let maxQ = 10

start.addEventListener("click", quizStart)

function quizStart() {
    start.style = "display:none"
    quiz.style = "display: block"
    gameOver.style = "display: none"  
    timer.style = "display:block" 
    scorebox.style = "display:block"
    quizQuestion()
}

function quizQuestion(){
    let q = test[curQ] 
    if (qCounter >= maxQ) {
        quiz.style = "display: none"
        scorebox.style = "display:none"
        gameOver.style = "display: block" 
        fscore.innerHTML = "Final Score: " + score
        localStorage.setItem("recentscore", score)
        }
    
    quest.innerHTML = "<h3>"+q.question+"</h3>"
    
    a1.innerHTML = q.a
    a2.innerHTML = q.b
    a3.innerHTML = q.c
    a4.innerHTML = q.d

    showScore()
}

function countdown() {
    let time = setInterval(function(){
    seconds--;
    timer.innerHTML = "Time Left: " + seconds
    if (seconds===0){
        clearInterval(time)
        quiz.style = "display: none"
        scorebox.style = "display:none"
        gameOver.style = "display: block" 
    } else if (qCounter >= maxQ) {
        clearInterval(time)
    }
 },1000)
}

countdown()

function checkAnswer(ans) {
    if (seconds===0){
        clearInterval(time)
        quiz.style = "display: none"
        scorebox.style = "display:none"
        gameOver.style = "display: block" 
    }else if(ans == test[curQ].correct) {
        score = score + 10
        right.style = "display: block"
        incorrect.style = "display:none"
        curQ++
        qCounter++
        quizQuestion()
    }else {
        seconds = seconds - 10
        incorrect.style = "display: block"
        right.style = "display: none"
        curQ++
        qCounter++
        quizQuestion()
    }
}  

function showScore() {
    scorebox.innerHTML = "Score: " + score
}

//GAME OVER FUNCTIONS

topScore = JSON.parse(localStorage.getItem("topScore")) || []
recentScore = JSON.parse(localStorage.getItem("recentscore"))
initials.addEventListener("keyup", function(){
    saveScr.disabled = !initials.value
})

viewHighScores = e => {
    e.preventDefault()
    let score = {
        score: recentScore,
        initials: initials.value
    }
    topScore.push(score)
    topScore.sort((a,b) => b.score - a.score)
    topScore.splice(10)

    localStorage.setItem("topScore", JSON.stringify(topScore))
    gameOver.style = "display:none"
    sTable.style = "display:block"
    timer.style = "display:none"
    scorebox.style = "display:none"
}

let sList = document.getElementById("score-list")
sList.innerHTML = topScore
.map(function(score) {
    return `<li id="table"><b>Initials:</b> ${score.initials} | <b>Score:</b> ${score.score}</li>`
})
.join("");