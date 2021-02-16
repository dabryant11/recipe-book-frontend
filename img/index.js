const url = 'http://localhost:3000/dishes'
const picture = document.querySelector('.detail-image')
const cards = document.querySelector('.dishes')
const name = document.querySelector('.name')
const updateForm = document.querySelector('#update-form')
const deleteButton = document.querySelector('.button')

function getAllDishes(){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(dishObject => {

            const dishCard = document.createElement('div')
            const dishImage = document.createElement('img')
            const dishName = document.createElement('p')
     
            dishImage.src = dishObject.image
            dishName.innerText = dishObject.name    
            dishName.dataset.id = dishObject.id

            cards.append(dishCard)
            dishCard.append(dishImage)
            dishCard.append(dishName)
    
        })
       
    })
}


    updateForm.addEventListener('submit', createDish)
    
    function createDish(e){
        e.preventDefault()
        
        const newDishName = document.querySelector('#dish-name').value
        const newDishImage = document.querySelector('#dish-image').value
        const newDishCategory = document.querySelector('#dish-category').value
        const newDishHistory = document.querySelector('#dish-history').value
        const newDishIngredients = document.querySelector('#dish-ingredients').value
        const newDishInstructions = document.querySelector('#dish-instructions').value
    
        
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({name: newDishName, image: newDishImage, category: newDishCategory, food_history: newDishHistory, ingredients: newDishIngredients, instructions: newDishInstructions}) 
        })  .then(res => res.json())
        .then(data => renderOneDish(data)) 
    }


    function renderOneDish(data){

        const newDishCard = document.createElement('div')
        const newDishImage = document.createElement('img')
        const newDishName = document.createElement('p')
        
        newDishImage.src = data.image
        newDishName.innerText = data.name    
        newDishName.dataset.id = data.id
    
        cards.append(newDishCard)
        newDishCard.append(newDishImage)
        newDishCard.append(newDishName)
    }
    // deleteButton.addEventListener('click', deleteOneDish)
    function deleteOneDish(dish){
        fetch(`${url}/${data.id}`,{
            method: 'Delete'
        })

    }
getAllDishes()
renderOneDish()

