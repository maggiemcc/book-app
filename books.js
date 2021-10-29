// SEARCH
function getBooks() {
  document.querySelector("input").innerHTML = " ";
  document.querySelector("#results").innerHTML = " ";
  document.querySelector(".total-number").innerHTML =
    "May take a minute to display results.";

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
      // data.docs.forEach((book) => addWishlist(book.key));
      document.querySelector(
        ".total-number"
      ).innerHTML = `Books found: ${data.docs.length}`;
      return data.docs[0];
    })
    .catch((error) => {
      console.error(error);
      document.querySelector(
        "#results"
      ).innerHTML += `<h3 style="margin: 2%;"> Result(s) not found.</h3>`;
    });
}

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
  removeBtn.innerHTML = "remove";

  let ratingDiv = document.createElement("div");
  ratingDiv.className = "rating__star far fa-star";

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


  //   let ratingDiv = document.createElement("div");
  //   let span = document.createElement("span");
  //   ratingDiv.className = "container";
  //   span.setAttribute("id", "rateMe1");

  // Appending
  cardBody.appendChild(ratingDiv);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardAuthor);
  cardBody.appendChild(yearDiv);
  yearDiv.appendChild(cardYearResult);
  cardBody.appendChild(buttonDiv);
  cardBody.appendChild(wantBtn);
  cardBody.appendChild(haveBtn);
  card.appendChild(cardBody);
  content.appendChild(card);


  haveBtn.addEventListener('click', () => {
    removeDiv.appendChild(removeBtn);
    cardBody.appendChild(removeDiv);

    let haveRead = document.querySelector(".readContent div");
    haveRead.appendChild(haveBtn.parentElement.parentElement);
  });

  wantBtn.addEventListener('click', () => {
    removeDiv.appendChild(removeBtn);
    cardBody.appendChild(removeDiv);

    let wishlist = document.querySelector(".wishlistContent div");
    wishlist.appendChild(wantBtn.parentElement.parentElement);
  });

  removeBtn.addEventListener('click', () => {
    let removing = document.querySelector("#results");
    removing.insertBefore(removeBtn.parentElement.parentElement.parentElement, removing.firstChild);
    removeBtn.parentElement.remove();
  });
}


// Toggling Sections
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
