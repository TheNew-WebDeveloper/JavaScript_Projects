let flashcardData = {
    id : [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()],
    front : ["What is JavaScript?",
        "What is a variable?",
        "Difference between let and var?",
        "What is const?",
        "What are JavaScript data types?",
        "What is a function?",
        "What is an arrow function?",
        "What is an array?",
        "What is an object?",
        "Difference between == and ===?",
    ],
    back : ["A programming language used to create interactive web pages.",
        "A container used to store data values.",
        "let is block-scoped, var is function-scoped.",
        "A variable that cannot be reassigned after declaration.",
        "String, Number, Boolean, Null, Undefined, Object, Symbol, BigInt.",
        "A reusable block of code that performs a task.",
        "A shorter syntax for writing functions using =>.",
        "A structure used to store multiple values in a single variable.",
        "A collection of key-value pairs.",
        "=== checks value and type, == only checks value after type conversion."
    ],
    status : []
}

let index = JSON.parse(localStorage.getItem("index")) || 0;

window.addEventListener("load", function(event) {
    event.preventDefault();

    sendData(index);
});

function sendData(idx) {
    let newData = [flashcardData.front[idx], flashcardData.back[idx]]

    updateUI(newData);
}

function updateUI(data) {
    document.querySelector("#question").textContent = data[0];
    document.querySelector("#answer").textContent = data[1];

    document.querySelector("#progress-text").textContent = `${index} / ${flashcardData.id.length} Completed`;

    document.querySelector(".progress-bar").style.width = `${(index / (flashcardData.id.length)) * 100}%`;

    document.querySelector("#next-btn").setAttribute("disabled", true);
}

document.querySelector("#flashcard").addEventListener("click", function(event) {
    event.preventDefault();

    document.querySelector("#flashcard").classList.toggle("flipped");
})

function save() {
    localStorage.setItem("index", JSON.stringify(index));
}

document.querySelector("#correct-btn").addEventListener("click", function(event) {
    document.querySelector("#next-btn").removeAttribute("disabled");
    document.querySelector("#correct-btn").setAttribute("disabled", true);
    document.querySelector("#wrong-btn").setAttribute("disabled", true);
    
    let data = document.querySelector("#question").textContent;

    flashcardData.front.forEach((val, idx) => {
        if(val === data) {
            flashcardData.status[idx] = true;
        }
    })
    console.log(flashcardData);
})

document.querySelector("#wrong-btn").addEventListener("click", function(event) {
    document.querySelector("#next-btn").removeAttribute("disabled");
    document.querySelector("#correct-btn").setAttribute("disabled", true);
    document.querySelector("#wrong-btn").setAttribute("disabled", true);

    let data = document.querySelector("#question").textContent;

    flashcardData.front.forEach((val, idx) => {
        if(val === data) {
            flashcardData.status[idx] = false;
        }
    })
    console.log(flashcardData);
})

document.querySelector("#next-btn").addEventListener("click", function(event) {
    index++;
    if(index > flashcardData.id.length - 1) {
        result();
        return;
    }
    save();
    sendData(index);

    document.querySelector("#next-btn").setAttribute("disabled", true);
    document.querySelector("#correct-btn").removeAttribute("disabled");
    document.querySelector("#wrong-btn").removeAttribute("disabled");
})

function result() {
    let correct = flashcardData.status.filter(data => data === true);

    const resultData = {
        total: flashcardData.id.length,
        correct: correct.length,
        wrong: flashcardData.id.length - correct.length,
        score: index
    };

    localStorage.setItem("quizResult", JSON.stringify(resultData));

    window.location.href = "result.html";
    index = 0;
    save();
}
