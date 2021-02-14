const url = 'http://localhost:3000/dishes'
const picture = document.querySelector('.detail-image')
const cards = document.querySelector('.dishes')
const name = document.querySelector('.name')
const updateForm = document.querySelector('#update-form')

fetch(url)
.then(res => res.json())
.then(data => {

    data.forEach(data =>{

        const dishCard = document.createElement('div')
        const dishImage = document.createElement('img')
        const dishName = document.createElement('p')

        dishImage.src = data.image
        dishName.innerText = data.name

        dishImage.addEventListener('click', showInfo)
        
        cards.append(dishCard)
        dishCard.append(dishImage)
        dishCard.append(dishName)
    })
})


function showInfo(e){
    
    
}


updateForm.addEventListener('submit', createDish)

function createDish(e){
    e.preventDefault()

    const newDishName = document.querySelector('#dish-name').value
    const newDishImage = document.querySelector('#dish-image').value
    const newDishCategory = document.querySelector('#dish-category').value
    const newDishHistory = document.querySelector('#dish-history').value
    const newDishIngredients = document.querySelector('#dish-ingredients').value

    console.log(newDishName)

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({name: newDishName, image: newDishImage, category: newDishCategory, food_history: newDishHistory, ingredients: newDishIngredients}) 
    })  .then(res => res.json())
    .then(newDish => {

        // const ingredientsList =  document.querySelector('.ingredients-list') 
        // const li = document.createElement('li')
        // //  console.log(ingredient.name)
        // li.innerText = newIngredient 
        // ingredientsList.append(li)
cards.append(newDish)
    console.log(e)
})
}
