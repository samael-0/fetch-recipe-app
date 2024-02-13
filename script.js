const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipieContainer = document.querySelector('.recipie-container');
const recipieDetailsContent = document.querySelector('.recipie-details-content');
const recipieCloseBtn = document.querySelector('.recipie-close-btn');

const fetchRecipies = async function(query){
    recipieContainer.innerHTML="<h2>Fetching Recipies</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipieContainer.innerHTML="";
    // console.log(response);
    response.meals.forEach(meal => {
        const recipieDiv = document.createElement('div');
        recipieDiv.classList.add("recipie");
        recipieDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>`
        const button = document.createElement('button');
        button.textContent ="View Recipie";
        recipieContainer.appendChild(recipieDiv);
        recipieDiv.appendChild(button)
        // console.log(meal);
        //adding eventlistener to button
        button.addEventListener('click',()=>{
            openRecipiePopup(meal);
        });
        recipieContainer.appendChild(recipieDiv);

    });

}

//functiontofectch ingredients and measurements

const fectchIngredients = (meal)=> {
    let ingredientsList = "";
    for(let i=1; i<=20 ; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}



const openRecipiePopup = (meal)=>{
    recipieDetailsContent.innerHTML = `
    <h2 class="recipieName">${meal.strMeal}</h2>
    <h3 class="ingredientList">Ingredients</h3>
    <ul>${fectchIngredients(meal)}</ul>
    <div>
     <h3 class="instructions"> Instruction</h3>
     <p class="recipieInstructions">${meal.strInstructions}</p>
    </div>
    `

    
    recipieDetailsContent.parentElement.style.display = "block";
}



recipieCloseBtn.addEventListener('click', ()=>{
    recipieDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipies(searchInput)
    // console.log("button clicked")


})
