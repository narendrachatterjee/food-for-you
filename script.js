fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(data => {
    const randomFood = data.meals[0];
    const title = randomFood.strMeal;
    const image = randomFood.strMealThumb;
    document.getElementById('random-food-title').textContent = title;
    // Do whatever you want with the random food data here

    const foodImg = document.querySelector('.food-img');
    foodImg.src = image;
    foodImg.alt = title;

  })
  .catch(error => {
    console.log('Error fetching random food:', error);
  });


const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const searchbarText = document.getElementById("searchbar").value;
    
    if (searchbarText.trim() !== "") { // Check if searchbar is not empty
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchbarText}`)
        .then(response => response.json())
        .then(data => {
            
            displayResult(data.meals);
        })
        .catch(error => {
          console.log('Error fetching search results:', error);
        });
    }
});

function displayResult(meals) {
    const searchResultsContainer = document.querySelector('.search-food');
    searchResultsContainer.innerHTML = ''; // Clear previous search results

    meals.forEach(meal => {
      const mealDiv = document.createElement('div');
      mealDiv.classList.add('meal');

      const mealImage = document.createElement('img');
      mealImage.classList.add('meal-image');
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      

      const mealTitle = document.createElement('h3');
      mealTitle.classList.add('meal-title');
      mealTitle.textContent = meal.strMeal;

      mealDiv.appendChild(mealTitle);
      mealDiv.appendChild(mealImage);

      searchResultsContainer.appendChild(mealDiv);
    });
}






