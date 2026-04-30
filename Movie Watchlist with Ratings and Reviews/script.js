let movies = JSON.parse(localStorage.getItem("movies")) || [];
let moviesList = document.querySelector("#movieList");

updateUI(movies);

document.querySelector("#addBtn").addEventListener("click", function (event) {
  event.preventDefault();

  let movieTitle = document.querySelector("#movieTitle");
  let movieRating = document.querySelector("#movieRating");
  let movieReview = document.querySelector("#movieReview");

  let newMovie = {
    id : Date.now(),
    title: movieTitle.value,
    rating: movieRating.value,
    review: movieReview.value,
  };

  movies.push(newMovie);
  save();
  updateUI(movies);

  movieTitle.value = "";
  movieRating.value = "";
  movieReview.value = "";
});

function save() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function updateUI(data) {
    moviesList.innerHTML = "";

  data.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("movie-card");

    div.innerHTML = `
    <h2>${item.title}</h2>
    <span class="rating">⭐ ${item.rating}/10</span>
    <p class="review">${item.review}</p>
    <div class="actions">
        <button class="edit" onclick="editMovie(${item.id})">Edit</button>
        <button class="delete" onclick="deleteMovie(${item.id})">Delete</button>
    </div>
    `
    moviesList.appendChild(div);
  });
}

function deleteMovie(id) {
    movies = [...movies.filter(movie => movie.id != id)];

    console.log(movies);
    save();
    updateUI(movies);
}

function editMovie(id) {
    window.alert("Please remember to save your recipe after making any changes")

    movies.forEach(movie => {
        if(movie.id == id) {
            document.querySelector("#movieTitle").value = movie.title;
            document.querySelector("#movieRating").value = movie.rating;
            document.querySelector("#movieReview").value = movie.review;
        }
    })
    deleteMovie(id);
}
