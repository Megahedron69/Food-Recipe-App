/*************************DOM VARIABLE****************/
const searchbar = document.querySelector("input");
const searchicon = document.querySelector("svg");
const divcont = document.querySelector(".searchresults");
/*************************VARIABLES******************/
let searchquery = "";
let appID = "2f7287e0";
let appkey = "35b2a314824b93a08ae48fe1dbcef46c";

/*************************EVENT LISTENERS***********/
searchicon.addEventListener("click", () => {
  searchquery = searchbar.value;
  if (searchquery === "") {
    alert("Please enter a valid search");
  } else {
    fetchApi();
  }
});
/*************************FUNCTIONS****************/
async function fetchApi() {
  let baseurl = `https://api.edamam.com/search?app_id=${appID}&app_key=${appkey}&q=${searchquery}&imageSize=THUMBNAIL&from=0&to=21`;
  try {
    let response = await fetch(baseurl);
    let data = await response.json();
    generateHTML(data.hits);
    console.log(data.hits);
    console.log("api connected");
  } catch {
    console.log("error");
  }
}

function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `<div class="searchres">
        <div class="recipeimage">
          <img
            src="${result.recipe.image}"
            alt="recipe image"
          />
        </div>
        <div class="recipeinfo">
          <h3>${result.recipe.label}</h3>
          <button class="viewrecipe"><a href="${
            result.recipe.url
          }" target="_blank">View Recipe</a></button>
          <p class="calories">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p>Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "No Data Found"
          }</p>
          <p>Cuisine Type: ${result.recipe.cuisineType}
          <p>Allergens: ${
            result.recipe.cautions.length > 0
              ? result.recipe.cautions
              : "No allergens"
          }
        </div>
      </div>`;
  });
  divcont.innerHTML = generatedHTML;
}
