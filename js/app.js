//Global Variables
let employees = []; // empty array that will hold values from the API
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US` //string literal that stores the url of the API, complete with desired options
const gridContainer = document.querySelector(".grid-container"); //stores the DOM element that is the container for the employees
const overlay = document.querySelector(".overlay"); //stores the DOM element that acts as an overlay for the modal
const modalContainer = document.querySelector(".modal-content"); //stores the DOM element that is a container for the modal info
const modalClose = document.querySelector(".modal-close"); //stores the DOM element that is the modal’s close button
///////Search for User EC////////
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchField');


////////fetch data from API///////////
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


////////////////////////////////Displays a list of employees on the page//////////////////////////////
function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    // template literals make this so much cleaner!
    employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}
///////////////////////////Displays selected employee in detail///////////////////////
function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        <button id="arrow_back">&lt; Back</button>  
        <button id="arrow_next">Next &gt;</button> 
        `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////Extra Credit -> Make back/Forward arrows work/////////////////////////////////////

let arrowBack = document.getElementById('arrow_back');
let arrowNext = document.getElementById('arrow_next');

//////Hides the arrow back at the begining////
    if (parseInt(index) === 0) {
        arrowBack.classList.add('hidden');
        arrowBack.disabled = false;
    }
///////Moves to the next slide///////////
    arrowNext.addEventListener('click', e => {
        displayModal(parseInt(index)+1);
    });
/////Moves to the previous slide/////////
    arrowBack.addEventListener('click', e => {
        displayModal(parseInt(index)-1);
    });
/////Hides the arrow forward/////////
    if (parseInt(index) === 11) {
        arrowNext.classList.add('hidden');
        arrowNext.disabled = true;
    }

/////////////////////////////////////////////////////////////////////////////////////////////

    }
//////////////Listens for a card(employee)to be clicked on before opening the modal
    gridContainer.addEventListener('click', e => {
        // make sure the click is not on the gridContainer itself
        if (e.target !== gridContainer) {
        // select the card element based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
        }
        });
      
        
        modalClose.addEventListener('click', () => {
            overlay.classList.add("hidden");
            });

////////////////////////////////////////////////////////////////

//EC
//////////////////////////Search////////////////////////////////
// Add a way to filter the directory by name. 
// To do this, you’ll need to request a random user nationality that will only return data in the English alphabet. 
// Note: you don't have to rely on the API to return search results. 
// You'll need to write functionality that filters out the results once they are on the page.
////////////////
searchInput.addEventListener('input', e => {
    let searchText = e.target.value.toLowerCase();
    let allNames = document.getElementsByClassName("name");
      
      for (let i = 0; i < allNames.length; i++) {
          let allNamesFilter = allNames[i].textContent.toLowerCase();
          if (allNamesFilter.includes(searchText)) {
              allNames[i].parentNode.parentNode.style.display = '';
          } else {
              allNames[i].parentNode.parentNode.style.display = 'none';
          }
      }
  });






