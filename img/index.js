const url = 'http://localhost:3000/dishes'
const picture = document.querySelector('.detail-image')
const name = document.querySelector('.name')
const createForm = document.querySelector('#create-form')
const updateForm = document.querySelector('#update-form')
const dishBlock = document.querySelector('.dish-info-block')
const dishDiv = document.querySelector('.dishes')
const updateButton = document.querySelector('#update-button')
let addDish = false
createForm.addEventListener('submit', createDish)
// dishDiv.addEventListener('click', toggleImageInfo)
updateForm.addEventListener('submit', editOneDish)


////////// FETCH REQUESTS\\\\\\\\\\

function getAllDishes(){
    fetch(url)
    .then(res => res.json())
    .then(dishes => displayAllDishes(dishes))
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


function createDish(e){
    e.preventDefault()
    const newDishName = document.querySelector('#dish-name').value
    const newDishImage = document.querySelector('#dish-image').value
    const newDishCategory = document.querySelector('#dish-category').value
    const newDishHistory = document.querySelector('#dish-history').value
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
}


function editOneDish(e){
    e.preventDefault()
    let updatedDishName = document.querySelector('#edit-dish-name').value
    let updatedDishImage = document.querySelector('#edit-dish-image').value
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
        const selectedDiv = document.querySelector(`div[data-id="${dishId}"]`)
        let selectedDivImg = selectedDiv.querySelector('img')
        let selectedDivName = selectedDiv.querySelector('p')
        selectedDivImg.src = updatedDishImage
        selectedDivName.innerText = updatedDishName
    })
}

let toggle = true

function toggleImageInfo(e){
    e.preventDefault()
    let dishId = e.target.dataset.id
    

    if( toggle){
        console.log('if', toggle)
        fetch(`${url}/${dishId}`)
        .then(res => res.json())
        .then(dishInfo => displayDishInfo(dishInfo))
        
        toggle = false
    } else {
        console.log('else', toggle)
        const dishLi = dishBlock.querySelectorAll('li')
        console.log(dishLi)
        dishLi.forEach(li => li.remove())

        const breaks = dishBlock.querySelectorAll('br')
        console.log(breaks)
        breaks.forEach(br => br.remove())
      
        
        const image = dishBlock.querySelectorAll('.dish-info-img')
        console.log(breaks)
        image.forEach(img => img.remove())
      
        
        const header = dishBlock.querySelectorAll('h7')
        console.log(breaks)
        header.forEach(h7 => h7.remove())
        toggle = true
    }
}


////////// Event Listener Functions\\\\\\\\\\

function removeDishFromDom(id){
    const dishToDelete = dishDiv.querySelector(`[data-id="${id}"]`)
    dishToDelete.remove()
}


function toggleForm(e){
    updateForm.classList.toggle("hidden")
    updateForm.dataset.id = e.target.dataset.id
}


////////// RENDER FUNCTIONS \\\\\\\\\\

function displayAllDishes(dishObject){
    console.log(dishObject)
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
            dishImage.addEventListener('click', toggleImageInfo)
            dishName.innerText = dish.name    
            dishCard.dataset.id = dish.id
            editButton.dataset.id = dish.id
            editButton.innerText = "edit"
            editButton.className = "edit-button"
            editButton.id = "edit-one-dish"
            editButton.addEventListener('click', toggleForm)
            deleteButton.innerText = "delete"
            deleteButton.className = "button"
            deleteButton.id = "delete-one-dish"
            deleteButton.addEventListener('click', deleteOneDish )
            dishCard.append(dishImage, dishName, deleteButton, editButton)
            dishDiv.append(dishCard)
        })
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
            dishImage.addEventListener('click', toggleImageInfo)
            dishName.innerText = dish.name    
            dishCard.dataset.id = dish.id
            editButton.dataset.id = dish.id
            editButton.innerText = "edit"
            editButton.className = "edit-button"
            editButton.id = "edit-one-dish"
            editButton.addEventListener('click', toggleForm)
            deleteButton.innerText = "delete"
            deleteButton.className = "button"
            deleteButton.id = "delete-one-dish"
            deleteButton.addEventListener('click', deleteOneDish)
            dishCard.append(dishImage, dishName, deleteButton, editButton)
            dishDiv.append(dishCard)
        }


function displayDishInfo(dishInfo){
        console.log("dish info", dishInfo)
            // detailDiv = document.createElement('div')
            // detailDiv.className = ("dish-info")
            let li = document.createElement('li')
            let li2 = document.createElement('li')
            let li3 = document.createElement('li')
            let br = document.createElement('br')
            let br2 = document.createElement('br')
            let br3 = document.createElement('br')
            let br4 = document.createElement('br')
            let br5 = document.createElement('br')
            let selectedDishImage = document.createElement('img')
            let selectedDishImageHeader = document.createElement('h7')

            selectedDishImage.style.height = '400px'
            selectedDishImage.style.width = 'auto'


            selectedDishImage.src = dishInfo.image
            selectedDishImage.className = 'dish-info-img'
            selectedDishImageHeader.innerText = dishInfo.name
            li.className = ("dish-elements")
            let dishHistory = `Food History: ${dishInfo.food_history} `       
            let dishCategory = `Category: ${dishInfo.category}`
            let dishInstuctions = `Instructions: ${dishInfo.instructions}`
            let dishIngredients = dishInfo.ingredients
            console.log('dish li info', dishHistory, dishCategory, dishInstuctions, dishIngredients)

            li.append(dishHistory)
            li2.append(dishCategory)
            li3.append(dishInstuctions)
            dishBlock.append( selectedDishImageHeader, br5, selectedDishImage, br, li, br2, li2, br3, li3, br4)

            dishIngredients.forEach(ingObj => {
                let li4 = document.createElement('li')
                ingName = `Ingredients: ${ingObj.name}`
                li4.append(ingName)
                dishBlock.append(li4)
            })

            
            
 }


getAllDishes()