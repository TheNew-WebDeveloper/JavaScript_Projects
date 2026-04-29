let seats = document.querySelectorAll(".seat");
let selectedSeats = document.querySelector("#selected-seats");
let total = document.querySelector("#total");
let confirmBtn = document.querySelector(".confirm-btn");

let seatsData = JSON.parse(localStorage.getItem("seatsData")) || {
  selected: [],
  booked: [],
};
let totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || 0;

if (seatsData.booked.length > 11) {
  seatsData = { selected: [], booked: [] };
  totalAmount = 0;
}

console.log(seatsData.booked.length);

updateUI(seatsData);
setDate();

seats.forEach((seat) =>
  seat.addEventListener("click", function (event) {
    event.preventDefault();

    if (seatsData.selected.length > 3) {
      alert("You can select 4 seats only in single time");
      return;
    }

    let id = event.target.dataset.id;

    if (seatsData.selected.includes(id)) {
      seatsData.selected = seatsData.selected.filter((seat) => seat !== id);
    } else {
      seatsData.selected.push(id);
    }

    totalAmount = 500 * seatsData.selected.length;

    save();
    updateUI(seatsData);
  }),
);

function save() {
  localStorage.setItem("seatsData", JSON.stringify(seatsData));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
}

function updateUI(data) {
  seats.forEach((seat) => {
    if (seatsData.selected.includes(seat.dataset.id)) {
      seat.classList.add("selected");
    } else if (seatsData.booked.includes(seat.dataset.id)) {
      seat.classList.add("booked");
    } else {
      seat.classList.remove("selected");
      seat.classList.remove("booked");
    }
  });

  if (seatsData.selected && seatsData.selected.length > 0) {
    selectedSeats.textContent = seatsData.selected.join(" ");
    total.textContent = `₹${totalAmount}`;
  } else {
    selectedSeats.textContent = "None";
    total.textContent = `₹${totalAmount}`;
  }

  confirmBtn.removeAttribute("disabled");
}

confirmBtn.addEventListener("click", function (event) {
  if (totalAmount < 1) {
    confirmBtn.setAttribute("disabled", true);
    return;
  }

  window.location.href = "confirmation.html";

  let selectedData = seatsData.selected;
  seatsData.booked = [...selectedData, ...seatsData.booked];
  seatsData.selected = [];

  save();
  updateUI(seatsData);

  selectedSeats.textContent = "None";
  total.textContent = `₹0`;
});

function setDate() {
  const d = new Date();

  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();

  const monthName = d.toLocaleString("en-IN", { month: "long" });

  const formattedDate = `${day} ${monthName} ${year}`;

  document.querySelector("#date").textContent = formattedDate;
}
