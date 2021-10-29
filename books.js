// search, fetching data using search bar input value
function getBooks() {
  document.querySelector("input").innerHTML = " ";
  document.querySelector("#results").innerHTML = " ";
  document.querySelector(".total-number").innerHTML =
    "May take a minute to display results...";

  fetch(
    "https://openlibrary.org/search.json?q=" +
      document.querySelector("input").value
  )
    .then((res) => res.json())
    .then(async (data) => {
      data.docs.forEach((author) =>
        addToList(
          author.title,
          author.author_name,
          author.first_publish_year,
          author.key
        )
      );
      document.querySelector(
        ".total-number"
      ).innerHTML = `Books found: ${data.docs.length}`;
      // console.log(data.docs)
      return data.docs[0];
    })
    .catch((error) => {
      console.error(error);
      document.querySelector(
        "#results"
      ).innerHTML += `<h3 style="margin: 2%;"> Result(s) not found.</h3>`;
    });
}

// displaying content in results div.
function addToList(bookTitle, authorName, bookYear, bookKey) {
  let content = document.querySelector("#results");
  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("id", `${bookKey}`);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let removeDiv = document.createElement("div");
  removeDiv.className = "remove-div";
  let removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = "Remove";

  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerHTML = `${bookTitle}`;

  let cardAuthor = document.createElement("h6");
  cardAuthor.className = "card-subtitle mb-2 card-author";
  cardAuthor.innerHTML = `Author(s): ${authorName}`;

  let yearDiv = document.createElement("div");
  let cardYearResult = document.createElement("h6");
  cardYearResult.className = "card-subtitle mb-2 muted-text card-year";
  cardYearResult.innerHTML = `First Published: ${bookYear}`;

  let buttonDiv = document.createElement("div");

  let haveBtn = document.createElement("button");
  haveBtn.className = "have-read";
  haveBtn.innerHTML = "Have Read";

  let wantBtn = document.createElement("button");
  wantBtn.className = "want-to-read";
  wantBtn.innerHTML = "Want to Read";

  // Appending
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardAuthor);
  cardBody.appendChild(yearDiv);
  yearDiv.appendChild(cardYearResult);
  cardBody.appendChild(buttonDiv);
  cardBody.appendChild(wantBtn);
  cardBody.appendChild(haveBtn);
  card.appendChild(cardBody);
  content.appendChild(card);

  let chosenId = card.id;

  // Appending books to categories
  // Append book to have read category.
  haveBtn.addEventListener("click", () => {
    let haveRead = document.querySelector(".readContent div");

    if (!haveRead.querySelector(`[id="${chosenId}"]`)) {
      removeDiv.appendChild(removeBtn);
      cardBody.appendChild(removeDiv);
      haveRead.appendChild(haveBtn.parentElement.parentElement);
    } else {
      haveRead.querySelector(`[id="${chosenId}"]`).remove();
      removeDiv.appendChild(removeBtn);
      cardBody.appendChild(removeDiv);
      haveRead.appendChild(haveBtn.parentElement.parentElement);
      // console.log(`book id: ${chosenId} already added to Books I've Read List.`)
    }
  });

  // Append book to want to read/wishlist.
  wantBtn.addEventListener("click", () => {
    let wishlist = document.querySelector(".wishlistContent div");

    if (!wishlist.querySelector(`[id="${chosenId}"]`)) {
      removeDiv.appendChild(removeBtn);
      cardBody.appendChild(removeDiv);
      wishlist.appendChild(haveBtn.parentElement.parentElement);
    } else {
      wishlist.querySelector(`[id="${chosenId}"]`).remove();
      removeDiv.appendChild(removeBtn);
      cardBody.appendChild(removeDiv);
      wishlist.appendChild(haveBtn.parentElement.parentElement);
      // console.log(`book id: ${chosenId} already added to Books to Read List.`)
    }
  });

  // Removing book, append back to search results.
  removeBtn.addEventListener("click", () => {
    let removing = document.querySelector("#results");
    if (!removing.querySelector(`[id="${chosenId}"]`)) {
      removing.insertBefore(
        removeBtn.parentElement.parentElement.parentElement,
        removing.firstChild
      );
      removeBtn.parentElement.remove();
    } else {
      removing.querySelector(`[id="${chosenId}"]`).remove();
      removing.insertBefore(
        removeBtn.parentElement.parentElement.parentElement,
        removing.firstChild
      );
      removeBtn.parentElement.remove();
    }
  });

  // Creating book rating system
  let form = `
    <div class="${bookKey} stars">
      <div class="star-widget">
        <a class="fas fa-star"></a>
        <a class="fas fa-star"></a>
        <a class="fas fa-star"></a>
        <a class="fas fa-star"></a>
        <a class="fas fa-star"></a>
      </div>
    </div>
  `;

  cardBody.insertAdjacentHTML("afterbegin", form);

  const ratingStars = document
    .getElementsByClassName(`${bookKey}`)[0]
    .querySelectorAll("a");
  ratingStars.forEach((star, index) => {
    star.addEventListener("click", () => {
      ratingStars.forEach((activeStar, otherIndex) => {
        if (otherIndex <= index) {
          activeStar.classList.add("active");
          activeStar.classList.remove("disabled");
          console.log("active star(s)--->", activeStar);
        } else {
          activeStar.classList.add("disabled");
          activeStar.classList.remove("active");
          console.log("disabled star(s)---->", activeStar);
        }
      });
    });
  });
}

// Toggle Sections
function toggleWishlist() {
  let content = document.querySelector(".wishlistContent");
  if (content.style.display === "none") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}

function toggleRead() {
  let content = document.querySelector(".readContent");
  if (content.style.display === "none") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}

function toggleSearch() {
  let content = document.querySelector("#results");
  if (content.style.display === "none") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}
