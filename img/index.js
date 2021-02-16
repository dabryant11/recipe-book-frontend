const url = 'http://localhost:3000/dishes'
const picture = document.querySelector('.detail-image')
const name = document.querySelector('.name')
const updateForm = document.querySelector('#update-form')
const deleteButton = document.querySelector('.button')
// const currentId = document.querySelector('')
// const currentId = document.getElemen('p')
// console.log(currentId)
function getAllDishes(){
    fetch(url)
    .then(res => res.json())
    .then(displayAllDishes)
    // .then(data => {
    //     data.forEach(dishObject => {

    //         const dishCard = document.createElement('div')
    //         const dishImage = document.createElement('img')
    //         const dishName = document.createElement('p')
    //         const deleteDish = document.createElement('div')
    //         document.getElementById("myDIV").className = "mystyle";
    //         dishImage.src = dishObject.image
    //         dishName.innerText = dishObject.name    
    //         dishCard.dataset.id = dishObject.id

    //         cards.append(dishCard)
    //         dishCard.append(dishImage)
    //         dishCard.append(dishName)
    //         deleteDish.innerHTML = `<button class="button" id="delete-oneDish">Delete</button>`
    //         dishCard.append(deleteDish)
    //     })
       
    // })
}

function displayAllDishes(dishObject){
    console.log(dishObject)
    const dishDiv = document.querySelector('.dishes')
    dishDiv.className = "allDishes"
          dishObject.forEach(dish => {
            const dishCard = document.createElement('div')
            const dishImage = document.createElement('img')
            const dishName = document.createElement('p')
            
            // document.getElementById("myDIV").className = "";
            dishImage.src = dish.image
            dishName.innerText = dish.name    
            dishCard.dataset.id = dish.id

            dishCard.append(dishImage)
            dishCard.append(dishName)
            
            dishCard.innerHTML += `<button class="button" id="delete-oneDish">Delete</button>`
            dishDiv.append(dishCard)
        })
       
}
// var a = 1, b = 2;
// var div = document.createElement('div');
// div.setAttribute('class', 'post block bc2');
// div.innerHTML = `
//     <div class="parent">
//         <div class="child">${a}</div>
//         <div class="child">+</div>
//         <div class="child">${b}</div>
//         <div class="child">=</div>
//         <div class="child">${a + b}</div>
//     </div>
// `;
// document.getElementById('posts').appendChild(div);


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
    // cards.addEventListener('click', deleteOneDish)

    function deleteOneDish(e){

        if (e.target.id === "delete-oneDish"){
            fetch(`${url}`,{
                method: 'Delete'
            })
            .then(res => res.json())
            .then(newDishData => console.log(newDishData))
        }


    }
getAllDishes()
renderOneDish()

