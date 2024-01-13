//Global Variables
let employees = []; // empty array that will hold values from the API
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US` //string literal that stores the url of the API, complete with desired options
const gridContainer = document.querySelector(".grid-container"); //stores the DOM element that is the container for the employees
const overlay = document.querySelector(".overlay"); //stores the DOM element that acts as an overlay for the modal
const modalContainer = document.querySelector(".modal-content"); //stores the DOM element that is a container for the modal info
const modalClose = document.querySelector(".modal-close"); //stores the DOM element that is the modal’s close button
