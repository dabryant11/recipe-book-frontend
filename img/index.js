const url = 'http://localhost:3000/dishes'
const picture = document.querySelector('.detail-image')
const name = document.querySelector('.name')
const updateForm = document.querySelector('#update-form')
const deleteButton = document.querySelector('.button')
const dishDiv = document.querySelector('.dishes')

function getAllDishes(){
    fetch(url)
    .then(res => res.json())
    .then(displayAllDishes)
}

function displayAllDishes(dishObject){
    
    dishDiv.className = "allDishes"
          dishObject.forEach(dish => {
            const dishCard = document.createElement('div')
            const dishImage = document.createElement('img')
            const dishName = document.createElement('p')
            

            dishImage.src = dish.image
            dishName.innerText = dish.name    
            dishCard.dataset.id = dish.id

            
            dishCard.append(dishImage, dishName)
            dishCard.innerHTML += `<button class="button" id="delete-oneDish">Delete</button>`
            dishDiv.append(dishCard)
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
            .then(data => displayAllDishes(data)) 
    }


    // function displayNewDish(dishData){
    //     // console.log(dishData)
    //     // const newDishCard = document.createElement('div')
    //     // const newDishImage = document.createElement('img')
    //     // const newDishName = document.createElement('p')
        
    //     // newDishImage.src = data.image
    //     // newDishName.innerText = data.name    
    //     // newDishName.dataset.id = data.id
    
    //     // cards.append(newDishCard)
    //     // newDishCard.append(newDishImage)
    //     // newDishCard.append(newDishName)
    // }


    

    dishDiv.addEventListener('click', deleteOneDish)

    function deleteOneDish(e){

        let dishId = e.target.parentNode.attributes["data-id"].value
        // console.log(dishSelected)
        
            fetch(`${url}/${dishId}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            
    }

    

getAllDishes()
displayAllDishes()


