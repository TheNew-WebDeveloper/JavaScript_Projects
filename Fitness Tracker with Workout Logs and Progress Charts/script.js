const ctx = document.getElementById("progressChart").getContext("2d");

let chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Calories",
        data: [],
        backgroundColor: "orange",
      },
      {
        label: "Duration",
        data: [],
        backgroundColor: "blue",
      },
    ],
  },
});

let form = document.querySelector("#workout-form");
let list = document.querySelector("#workout-list");
let workoutName = document.querySelector("#workout-name");
let workoutDuration = document.querySelector("#workout-duration");
let workoutCalories = document.querySelector("#workout-calories");

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let editedId = null;

updateUI(workouts);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (editedId !== null) {
    workouts = workouts.map((workout) => {
      if (workout.id == editedId) {
        return {
          ...workout,
          name: workoutName.value,
          duration: Number(workoutDuration.value),
          calories: Number(workoutCalories.value),
        };
      }
      return workout;
    });
    editedId = null;
  } else {
    let newWorkout = {
      id: Date.now(),
      name: workoutName.value,
      duration: workoutDuration.value,
      calories: workoutCalories.value,
    };
    workouts.push(newWorkout);
  }

  save(workouts);
  updateUI(workouts);

  form.reset();
});

function save(data) {
  localStorage.setItem("workouts", JSON.stringify(data));
}

function updateUI(data) {
  list.innerHTML = "";

  data.forEach((item) => {
    let li = document.createElement("li");

    li.innerHTML = `
        <div><Strong>Workout Name :</strong> ${item.name}</div>
        <div><Strong>Duration (mins) :</strong> ${item.duration}</div>
        <div><Strong>Calories Burned :</strong> ${item.calories}</div>
        <button class="edit-btn" data-id="${item.id}">Edit</button>
        <button class="delete-btn" data-id="${item.id}">Delete</button>
        `;

    list.append(li);
  });

  updateChart(data);
}

list.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    let editId = event.target.dataset.id;
    editBtn(editId);
  } else if (event.target.classList.contains("delete-btn")) {
    let deleteId = event.target.dataset.id;
    deleteBtn(deleteId);
  }
});

function editBtn(val) {
  let workout = workouts.find((workout) => workout.id == val);

  if (!workout) return; // safety check

  editedId = val;

  workoutName.value = workout.name;
  workoutDuration.value = workout.duration;
  workoutCalories.value = workout.calories;
}

function deleteBtn(val) {
  workouts = [...workouts].filter((workout) => workout.id != val);
  save(workouts);
  updateUI(workouts);
}

function updateChart(data) {
  chart.data.labels = data.map((item) => item.name);

  chart.data.datasets[0].data = data.map((item) => Number(item.calories));
  chart.data.datasets[1].data = data.map((item) => Number(item.duration));

  chart.update();
}
