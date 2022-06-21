const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elSelect = document.querySelector(".genres__select");
const elForm = document.querySelector(".form");
const elBookmarksList = document.querySelector(".bookmarks-list");

let localBookMark = JSON.parse(window.localStorage.getItem("bookmarks"))
const bookmarks = localBookMark || [];


elBookmarksList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookmark-delete-btn")) {
    const bookmarkDeleteId = evt.target.dataset.bookmarkDeleteId;
    const foundBookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === bookmarkDeleteId
      );
      
      
      bookmarks.splice(foundBookmarkIndex, 1);
      
      elBookmarksList.innerHTML = null;
      window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
      if (bookmarks.length === 0){
      window.localStorage.removeItem("bookmarks", JSON.stringify(bookmarks))
      

      }
      
      renderBookmarks(bookmarks, elBookmarksList);
    }
  });
  
  const renderBookmarks = function (arr, htmlElement) {
    arr.forEach((bookmark) => {
      const newItem = document.createElement("li");
      const newDeleteBtn = document.createElement("button");
      
      // ATTRIBUTES:
      newItem.setAttribute("class", "d-flex mt-3 justify-content-between border border-2 p-2 border-danger rounded rounded-2", )
      newItem.textContent = bookmark.title;
      newDeleteBtn.textContent = "Delete";
      newDeleteBtn.setAttribute(
        "class",
        "bookmark-delete-btn btn btn-danger ms-3"
        );
        
        //DATASET:
        newDeleteBtn.dataset.bookmarkDeleteId = bookmark.id;
        
        htmlElement.appendChild(newItem);
        newItem.appendChild(newDeleteBtn);
      });
    };
    
    elMovieList.addEventListener("click", function (evt) {
      if (evt.target.matches(".bookmark-btn")) {
        const bookmarkId = evt.target.dataset.bookmarkBtnId;
        const foundBookmark = films.find((film) => film.id === bookmarkId);
        
        if (!bookmarks.includes(foundBookmark)) {
          bookmarks.push(foundBookmark);
        }
        
        elBookmarksList.innerHTML = null;
        
        window.localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
        
        renderBookmarks(bookmarks, elBookmarksList);
      }
    });
    
    elResult.textContent = films.length;
    
    const renderGenres = function (arr) {
      const uniqueGenres = [];
      
      arr.forEach((film) => {
        film.genres.forEach((genre) => {
          if (!uniqueGenres.includes(genre)) {
            uniqueGenres.push(genre);
          }
        });
      });
      
      uniqueGenres.forEach((genre) => {
        const genresOption = document.createElement("option");
        
        genresOption.textContent = genre;
        genresOption.value = genre;
        
        elSelect.appendChild(genresOption);
      });
    };
    
    const renderMovies = function (arr, htmlElement) {
      arr.forEach((movie) => {
        //CREATE ELEMENT
        const newLi = document.createElement("li");
        const newImg = document.createElement("img");
        const newDiv = document.createElement("div");
        const newTitle = document.createElement("h5");
        const newLanguage = document.createElement("p");
        const newYear = document.createElement("p");
        const genresList = document.createElement("ul");
        const bookmarkBtn = document.createElement("button");
        
        //SET ATTTIBUTE
        newLi.setAttribute("class", "card mb-3");
        newLi.style.width = "18rem";
        newImg.classList.add("card-img-top");
        newImg.setAttribute("src", movie.poster);
        newDiv.classList.add("card-body");
        newTitle.classList.add("card-title");
        newLanguage.classList.add("card-text");
        newYear.classList.add("card-text");
        bookmarkBtn.setAttribute("class", "bookmark-btn btn btn-primary mt-3");
        
        //TEXT CONTENT:
        newTitle.textContent = movie.title;
        newYear.textContent = movie.year;
        bookmarkBtn.textContent = "Bookmark";
        
        // DATASET:
        bookmarkBtn.dataset.bookmarkBtnId = movie.id;
        
        movie.genres.forEach((genre) => {
          const genreItem = document.createElement("li");
          
          genreItem.textContent = genre;
          
          genresList.appendChild(genreItem);
        });
        
        //APPEND
        htmlElement.appendChild(newLi);
        newLi.appendChild(newImg);
        newLi.appendChild(newDiv);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newYear);
        newDiv.appendChild(genresList);
        newDiv.appendChild(bookmarkBtn);
      });
    };
    
    renderMovies(films, elMovieList);
    renderGenres(films);
    
    elSelect.addEventListener("change", function (evt) {
      evt.preventDefault();
      
      elMovieList.innerHTML = null;
      
      const selectedGenre = elSelect.value;
      
      const selectedFilms = [];
      
      films.forEach((film) => {
        if (selectedGenre === "all" || film.genres.includes(selectedGenre)) {
          selectedFilms.push(film);
        }
      });
      
      renderMovies(selectedFilms, elMovieList);
    });
    
    
    renderBookmarks(localBookMark, elBookmarksList)