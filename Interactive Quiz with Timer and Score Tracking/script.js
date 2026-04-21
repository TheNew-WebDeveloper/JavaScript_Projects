let timer = document.querySelector("#timer");
let score = document.querySelector("#score");
let question = document.querySelector("#question");
let options = document.querySelectorAll(".option");
let nextBtn = document.querySelector("#next-btn");

let data = [
    {
      "question": "The file hosting service, \"Google Drive\" was launched on what day?",
      "options": ["April 24, 2012", "January 12, 2014", "November 14, 2008","January 20, 2010"],
      "answer": "April 24, 2012",
      visited: false
    },
    {
      "question": "In the English language, what is the name of the \"&\" character?",
      "options": [
        "Eightslash",
        "Ampersand",
        "And Sign",
        "Obelus"
      ],
      "answer": "Ampersand",
      visited: false
    },
    {
      "question": "What is the French word for \"hat\"?",
      "options": [
        "Bonnet",
        "Écharpe",
        "Chapeau",
        "Casque"
      ],
      "answer": "Chapeau",
      visited: false
    },
    {
      "question": "On a dartboard, what number is directly opposite No. 1?",
      "options": [
        "20",
        "12",
        "15",
        "19"
      ],
      "answer": "19",
      visited: false
    },
    {
      "question": "What is the closest planet to our solar system's sun?",
      "options": [
        "Mars",
        "Jupiter",
        "Earth",
        "Mercury"
      ],
      "answer": "Mercury",
      visited: false
    },
    {
      "question": "What is the first book of the Old Testament?",
      "options": [
        "Exodus",
        "Leviticus",
        "Genesis",
        "Numbers"
      ],
      "answer": "Genesis",
      visited: false
    },
    {
      "question": "Who is considered the \"Father of Modern Philosophy\"?",
      "options": [
        "Plato",
        "René Descartes",
        "Albert Einstein",
        "Antoine Lavoisier"
      ],
      "answer": "René Descartes",
      visited: false
    },
    {
      "question": "What is the French word for \"fish\"?",
      "options": [
        "poisson",
        "fiche",
        "escargot",
        "mer"
      ],
      "answer": "poisson",
      visited: false
    },
    {
      "question": "Which of the following is the IATA code for Manchester Airport?",
      "options": [
        "EGLL",
        "MAN",
        "LHR",
        "EGCC"
      ],
      "answer": "MAN",
      visited: false
    },
    {
      "question": "What does the 'S' stand for in the abbreviation SIM, as in SIM card?",
      "options": [
        "Single",
        "Secure",
        "Subscriber",
        "Solid"
      ],
      "answer": "Subscriber",
      visited: false
    }
]

let index = data.length - 1;
let marks = 0;

window.addEventListener("load", updateUI);

options.forEach(option => option.addEventListener("click", function(event) {
    event.preventDefault();

    if(option.textContent === data[index].answer) {
        option.classList.add("correct");
        updateScore();
    } else {
        option.classList.add("wrong");
    }

    if (index === 0) {
        clearInterval(timerInterval);
        nextBtn.textContent = "Completed";
        nextBtn.classList.add("correct");
        nextBtn.setAttribute("onclick", "end()");
        nextBtn.removeAttribute("disabled");
        return;
    } else {
        options.forEach(option => option.setAttribute("disabled", true));
        nextBtn.removeAttribute("disabled");
    }
}))

nextBtn.setAttribute("onclick", "next()");

function next() {
    index--;
    updateUI();
}


function updateUI() {
    
    question.textContent = data[index].question;
    options.forEach((option, ind) => {
        option.textContent = data[index].options[ind];
        option.removeAttribute("disabled");
        option.classList.remove("correct");
        option.classList.remove("wrong");
    });
    data[index].visited = true;

    setTimer();
    score.textContent = `Score: ${marks}`;
    nextBtn.setAttribute("disabled", true);
}

function updateScore() {
    marks += 10;
    score.textContent = `Score: ${marks}`;
}

let timerInterval;  // Declare a variable to hold the interval ID globally

function setTimer() {
    let time = 30;

    // Clear any existing timer before starting a new one
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timer.textContent = `Time: ${time}s`;

    timerInterval = setInterval(() => {
        time--;
        if (time < 0) {
            clearInterval(timerInterval);
            next();
            // Optionally, you can disable options or auto-move to next question here
            return;
        }
        timer.textContent = `Time: ${time}s`;
    }, 1000);
}

function end() {
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".quiz-result").style.display= "initial";
    document.querySelector("#marks").textContent = marks;
}
