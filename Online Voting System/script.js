let login = document.querySelector("#login-btn");
let voterId = document.querySelector("#voter-id");
let voteBtns = document.querySelectorAll(".vote-btn");
let logout = document.querySelector("#logout-btn");

let voterList = JSON.parse(localStorage.getItem("voterList")) || [];
let result;

try {
  result = JSON.parse(localStorage.getItem("result")) || [0, 0, 0];
} catch {
  result = [0, 0, 0];
}

updateResult(result);

let [countA, countB, countC] = result;

login.addEventListener("click", function(event) {
    event.preventDefault();

    if(voterId.value.length !== 10) {
        document.querySelector("#error").style.display = "block";
        return;
    }

    let exists = voterList.some(v => v.id === voterId.value);
    if (exists) {
        alert("You have already voted!");
        return;
    }

    let newVoter = {
        id : voterId.value
    }

    voterList.push(newVoter);
    save(voterList, result);
    updateUI();

    voterId.value = "";
})

voterId.addEventListener("input", function(event) {
    event.preventDefault();
    document.querySelector("#error").style.display = "none";
})

function save(vlist, result) {
    localStorage.setItem("voterList", JSON.stringify(vlist));
    localStorage.setItem("result", JSON.stringify(result));
}

function updateUI() {
    document.querySelector("#voting-section").classList.toggle("hidden");
    document.querySelector("#login-section").classList.toggle("hidden");
}

voteBtns.forEach((btn, index) => {
    btn.addEventListener("click", function(event) {
        event.preventDefault();

        voteCounter(index);
        updateBtn();
    })
})

function updateBtn() {
    voteBtns.forEach(btn => btn.setAttribute("disabled", "true"));
}

function enableBtns() {
    voteBtns.forEach(btn => btn.removeAttribute("disabled"));
}

function voteCounter(val) {

    if(val === 0) {
        countA++;
    } else if(val === 1) {
        countB++;
    } else {
        countC++;
    }

    result = [countA, countB, countC];
    save(voterList, result);
    updateResult(result);
}

function updateResult(result) {
    let canres = document.querySelectorAll(".canres");
    result.forEach((r, i) => canres[i].textContent = r);
}

logout.addEventListener("click", function() {
    updateUI();
    enableBtns();
})