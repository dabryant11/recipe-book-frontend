const url = 'http://localhost:3000/dishes'
const picture = document.querySelector('.detail-image')
const name = document.querySelector('.name')
const addForm = document.querySelector('#add-form')
// const deleteButton = document.querySelector('.button')
const dishDiv = document.querySelector('.dishes')


function getAllDishes(){
    fetch(url)
    .then(res => res.json())
    .then(displayAllDishes)
}

function displayAllDishes(dishObject){
    
    
    // dishDiv.innerHTML = ""
    dishDiv.className = "allDishes"
          dishObject.forEach(dish => {
            const dishCard = document.createElement('div')
            const dishImage = document.createElement('img')
            const dishName = document.createElement('p')
            const deleteButton = document.createElement('button')
            const editButton = document.createElement('button')

            dishImage.src = dish.image

            dishImage.style.height = '100px'
            dishImage.style.width = 'auto'
            dishName.innerText = dish.name    
            dishCard.dataset.id = dish.id


            editButton.innerText = "edit"
            editButton.className = "edit-button"
            editButton.id = "edit-one-dish"
            editButton.addEventListener('click', editOneDish )


            deleteButton.className = "button"
            deleteButton.innerText = "delete"
            deleteButton.id = "delete-one-dish"
            deleteButton.addEventListener('click', deleteOneDish )
            

            
            dishCard.append(dishImage, dishName, deleteButton,editButton)
            // dishCard.innerHTML += `<button class="button" id="delete-oneDish">Delete</button>`
            dishDiv.append(dishCard)
        })
       
}

    addForm.addEventListener('submit', createDish)
    
    function createDish(e){
        e.preventDefault()
        
        const newDishName = document.querySelector('#dish-name').value
        const newDishImage = document.querySelector('#dish-image').value
        const newDishCategory = document.querySelector('#dish-category').value
        const newDishHistory = document.querySelector('#dish-history').value
        const newDishIngredients = document.querySelector('#dish-ingredients').value
        const newDishInstructions = document.querySelector('#dish-instructions').value
        
        const newDish = {name: newDishName, image: newDishImage, category: newDishCategory, food_history: newDishHistory, ingredients: newDishIngredients, instructions: newDishInstructions}
        
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(newDish) 
        })  .then(res => res.json())
        .then(displayNewDish) 
        
        e.target.reset()
    }


    function displayNewDish(dish){
            const dishCard = document.createElement('div')
            const dishImage = document.createElement('img')
            const dishName = document.createElement('p')
            const deleteButton = document.createElement('button')
            const updateButton = document.createElement('button')

            dishImage.src = dish.image

            dishImage.style.height = '100px'
            dishImage.style.width = 'auto'
            dishName.innerText = dish.name    
            dishCard.dataset.id = dish.id


            deleteButton.innerText = "delete"
            deleteButton.className = "button"
            deleteButton.id = "delete-one-dish"
            deleteButton.addEventListener('click', deleteOneDish )

            updateButton.innerText = "update"
            updateButton.className = "update-button"
            updateButton.id = "update-one-dish"
            updateButton.addEventListener('click', updateOneDish )
            

            
            dishCard.append(dishImage, dishName, deleteButton, updateButton)
            dishDiv.append(dishCard)
    }


    

    // dishDiv.addEventListener('click', deleteOneDish)

    function deleteOneDish(e){

        let dishId = e.target.parentNode.attributes["data-id"].value
        // console.log(dishSelected)
        
            fetch(`${url}/${dishId}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(console.log)

        removeDishFromDom(dishId)

    }

    function removeDishFromDom(id){
        const dishToDelete = dishDiv.querySelector(`[data-id="${id}"]`)
        dishToDelete.remove()
    }
    

    
    
    function editOneDish(e){
        
        e.preventDefault()
        const updatedDishName = document.querySelector('#edit-dish-name').value
        const updatedDishImage = document.querySelector('#edit-dish-image').value
        const updatedDishIngredients = document.querySelector('#edit-dish-ingredients').value
        
        // const editForm = document.querySelector('#edit-form')
        // console.log(editForm)
        
        let dishId = e.target.parentNode.attributes["data-id"].value
        
        const updatedDish = {name: updatedDishName, image: updatedDishImage, ingredients: updatedDishIngredients}
        
        fetch(`${url}/${dishId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(updatedDish) 
        })  .then(res => res.json())
        .then(updatedDish => console.log(updatedDish)) 
        
    }





    getAllDishes()