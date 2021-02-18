const url = 'http://localhost:3000/dishes'
const picture = document.querySelector('.detail-image')
const name = document.querySelector('.name')
const createForm = document.querySelector('#create-form')
const updateForm = document.querySelector('#update-form')

const dishDiv = document.querySelector('.dishes')

let addDish = false

function getAllDishes(){
    fetch(url)
    .then(res => res.json())
    .then(dishes => displayAllDishes(dishes))
}
function displayAllDishes(dishObject){
          dishDiv.className = "allDishes"
          dishObject.forEach(dish => {
            const dishCard = document.createElement('div')
            const dishImage = document.createElement('img')
            const dishName = document.createElement('p')
            const deleteButton = document.createElement('button')
            const editButton = document.createElement('button')
            updateForm.dataset.id = dish.id

            dishImage.src = dish.image
            dishImage.style.height = '100px'
            dishImage.style.width = 'auto'
            dishName.innerText = dish.name    
            dishCard.dataset.id = dish.id
            
            editButton.dataset.id = dish.id
            editButton.innerText = "edit"
            editButton.className = "edit-button"
            editButton.id = "edit-one-dish"
            editButton.addEventListener('click', toggleForm)

            // updateButton.addEventListener('submit', editOneDish )

            deleteButton.innerText = "delete"
            deleteButton.className = "button"
            deleteButton.id = "delete-one-dish"

            deleteButton.addEventListener('click', deleteOneDish )
            dishCard.append(dishImage, dishName, deleteButton, editButton)
            dishDiv.append(dishCard)
        })
}
    createForm.addEventListener('submit', createDish)

    function createDish(e){
        e.preventDefault()
        const newDishName = document.querySelector('#dish-name').value
        const newDishImage = document.querySelector('#dish-image').value
        const newDishCategory = document.querySelector('#dish-category').value
        const newDishHistory = document.querySelector('#dish-history').value
        // const newDishIngredients = document.querySelector('#dish-ingredients').value
        const newDishInstructions = document.querySelector('#dish-instructions').value
        const newDish = {name: newDishName, image: newDishImage, category: newDishCategory, food_history: newDishHistory, instructions: newDishInstructions}
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(newDish) 
        })  
            .then(res => res.json())
            .then(dish => displayNewDish(dish)) 
            // displayNewDish(newDish)
    }
    function displayNewDish(dish){
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

            editButton.dataset.id = dish.id
            editButton.innerText = "edit"
            editButton.className = "edit-button"
            editButton.id = "edit-one-dish"
            editButton.addEventListener('click', toggleForm)

            // updateButton.addEventListener('submit', editOneDish )
            deleteButton.innerText = "delete"
            deleteButton.className = "button"
            deleteButton.id = "delete-one-dish"
            deleteButton.addEventListener('click', deleteOneDish)
            
            dishCard.append(dishImage, dishName, deleteButton, editButton)
            dishDiv.append(dishCard)
        }
        function deleteOneDish(e){
            e.preventDefault()
            let dishId = e.target.parentNode.attributes["data-id"].value
            fetch(`${url}/${dishId}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(dish => removeDishFromDom(dish.id))
        }
        function removeDishFromDom(id){
            const dishToDelete = dishDiv.querySelector(`[data-id="${id}"]`)
            dishToDelete.remove()
        }
        
        function toggleForm(e){
            updateForm.classList.toggle("hidden")
            updateForm.dataset.id = e.target.dataset.id
            
            updateForm.addEventListener('submit', editOneDish)
        }
        
        
        
        
        function editOneDish(e){
            e.preventDefault()

            

            const updateButton = document.querySelector('#update-button')
            let updatedDishName = document.querySelector('#edit-dish-name').value
            let updatedDishImage = document.querySelector('#edit-dish-image').value
            // let updatedDishIngredients = document.querySelector('#edit-dish-ingredients').value
            
            
            let dishId = e.target.dataset.id

            const updatedDish = {name: updatedDishName, image: updatedDishImage}
            fetch(`${url}/${dishId}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(updatedDish) 
            })  .then(res => res.json())
            .then(data => displayNewDish(data))
        }
        
        





getAllDishes()
