let pageNum = 1;

//When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
document.addEventListener('DOMContentLoaded', function() {
  fetchMonsters()
  makeForm()
  //4. add eventListener on submit
  document.querySelector('#new-monster-form').addEventListener('submit', handleCreate)
  //6. handle back and forward clicks
  document.querySelector('#forward').addEventListener('click', handleForward)
  document.querySelector('#back').addEventListener('click', handleBack)
})

//1. fetch all monsters
function fetchMonsters() {
  fetch(`http://localhost:3000/monsters`)
  .then(response => response.json())
  .then(jsonData => {
  jsonData.forEach(monster => {render(monster)})
  })
}
//2. render all monsters
function render(monster) {
  //render 50 monsters to #monster-container
  let divElement = document.createElement('div')
  let h2Element = document.createElement('h2')
  let h4Element = document.createElement('h4')
  let pElement = document.createElement('p')
  divElement.appendChild(h2Element)
  divElement.appendChild(h4Element)
  divElement.appendChild(pElement)

  let container = document.getElementById('monster-container').appendChild(divElement)

  h2Element.innerHTML = monster.name
  h4Element.innerHTML = `Age: ${monster.age}`
  pElement.innerHTML = `Bio: ${monster.description}`
}

//3. makeform
function makeForm() {
  //create form HTML and appendChild
  let form = document.createElement('form')
  let inputName = document.createElement('input')
  let inputAge = document.createElement('input')
  let inputDescription =document.createElement('input')
  let submit = document.createElement('input')

  document.querySelector('#create-monster').appendChild(form)
  form.appendChild(inputName)
  form.appendChild(inputAge)
  form.appendChild(inputDescription)
  form.appendChild(submit)

  form.id = 'new-monster-form'
  inputName.placeholder = 'name...'
  inputName.id = 'monster-name'
  inputAge.placeholder = 'age...'
  inputAge.id = 'monster-age'
  inputDescription.placeholder = 'description...'
  inputDescription.id = 'monster-description'
  submit.type = 'submit'
  submit.value = 'Create'
 }

//5. handle submit/create
function handleCreate(event) {
  //render new monster without making a page refresh
  event.preventDefault()
  postFetch()
  event.currentTarget.reset()
}

//5. postFetch
function postFetch() {
   //get input value
  let monsterName = document.querySelector('#monster-name').value
  let monsterAge = document.querySelector('#monster-age').value
  let monsterDescription = document.querySelector('#monster-description').value

  let data = {name: monsterName, age: monsterAge, description: monsterDescription}

  fetch(`http://localhost:3000/monsters`, {
    method: 'POST',
    //with a POST you need a body to be a string
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
   })
    .then(response => response.json())
    .then(jsonData => {
      render(jsonData)
    })
 }

//6. Load next 50 monsters
function handleBack() {
  //empty out monster container
  let monsterContainer = document.querySelector('#monster-container')
  monsterContainer.innerHTML = ""

  pageNum--
  fetchFifty()
}

function handleForward() {
  //empty out monster container
  let monsterContainer = document.querySelector('#monster-container')
  monsterContainer.innerHTML = ""
  
  pageNum++
  fetchFifty()
}

function fetchFifty() {
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(monster => render(monster))
  })
}
