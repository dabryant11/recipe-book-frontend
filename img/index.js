const url = 'http://localhost:3000/dishes'
const picture = document.querySelector('.detail-image')
const name = document.querySelector('.name')
const createForm = document.querySelector('#create-form')
const updateForm = document.querySelector('#update-form')
const dishBlock = document.querySelector(`.dish-info-block`)

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

            dishImage.dataset.id = dish.id 
            dishImage.src = dish.image
            dishImage.style.height = '100px'
            dishImage.style.width = 'auto'
            dishImage.className = "image-class"

            // console.log(dishImage)

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
            // console.log(dishInfo)
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
            dishImage.dataset.id = dish.id 
            dishImage.className = "image-class"
            // console.log(dishImage.dataset.id)

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
            })
              .then(res => res.json())
              .then(updatedDishData => {



                let selectedDiv = document.querySelector(`div[data-id="${dishId}"]`)

                let selectedDivImg = selectedDiv.querySelector('img')
                let selectedDivName = selectedDiv.querySelector('p')


                selectedDivImg.src = updatedDishImage
                selectedDivName.innerText = updatedDishName

            })
        }


        dishDiv.addEventListener('click', toggleImageInfo)

        function toggleImageInfo(e){
            e.preventDefault()
            
        
            let dishId = e.target.dataset.id
            
            if(e.target.className == "image-class"){

                fetch(`${url}/${dishId}`)
    
                .then(res => res.json())
                .then(dishInfo => displayDishInfo(dishInfo))
            }
            
        }
        
        function displayDishInfo(dishInfo){
            
            detailDiv = document.createElement('div')
            detailDiv.className = ("dish-info")
            
            
            let li = document.createElement('li')
            let li2 = document.createElement('li')
            let li3 = document.createElement('li')
            let br = document.createElement('br')

            li.className = ("dish-elements")

            let dishHistory = `Food history: ${dishInfo.food_history} `       
            let dishCategory = `Category: ${dishInfo.category}`
            let dishInstuctions = `Instructions: ${dishInfo.instructions}`
            let dishIngredients = dishInfo.ingredients
            
            
            dishIngredients.forEach(ingObj => {
                let li4 = document.createElement('li')
                ingName = `Ingredients: ${ingObj.name}`
                li4.append(ingName)
                detailDiv.append(li4)
            })

            li.append(dishHistory)
            li2.append(dishCategory)
            li3.append(dishInstuctions)
            detailDiv.append(li, br, li2,li3)
            dishBlock.append(detailDiv)
        }







getAllDishes()
