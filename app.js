const form = document.querySelector(".joke-form");
const clearBtn = document.getElementById("btnClear");
const jokeList = document.querySelector(".jokes");

form.addEventListener("submit", showJokes);
clearBtn.addEventListener("click", deleteJokes);

function showJokes(e) {
  const numberOfJokes = document.getElementById("number").value;
  // Create xhr
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      if (response.type === "success") {
        response.value.forEach(joke => {
          const li = document.createElement("li");
          li.className = "collection-item";
          li.appendChild(document.createTextNode(`${joke.joke}`));
          jokeList.appendChild(li);
        });
      } else {
        jokeList.innerHTML = `<li class="collection-item">Something went wrong</li>`;
      }
    }
  };

  xhr.send();
  e.preventDefault();
}

function deleteJokes() {
  number.value = "";
  while (jokeList.firstChild) {
    jokeList.removeChild(jokeList.firstChild);
  }
}
