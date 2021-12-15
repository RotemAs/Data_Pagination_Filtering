/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//insert the search field with JavaScript
const header = document.querySelector(".header");
header.insertAdjacentHTML(
  "beforeend",
  `<label for="search" class="student-search">
 <span>Search by name</span>
 <input id="search" placeholder="Search by name...">
 <button type="button" id='btn-search'><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`
);


//selecting elements in HTML
const studentsPerPage = 9;
const ULStudentList = document.querySelector(".student-list");
const ULLinkList = document.querySelector(".link-list");
const btnSearch = document.querySelector("#btn-search");
const inputSearch = document.querySelector("#search");

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  //declare start and end index
  let startIndex = page * studentsPerPage - studentsPerPage;
  let endIndex = page * studentsPerPage;
  //clear the current data from the list
  ULStudentList.innerHTML = "";

  //loop the student list
  for (let i = 0; i < list.length; i++) {
    //declare a currentStudent variable to hold the current iterate student
    let currentStudent = list[i];
    if (
      list.indexOf(currentStudent) >= startIndex &&
      list.indexOf(currentStudent) < endIndex
    ) {
      //if the condition above is true
      //declare a li variable and create an 'li' HTML element, adding class to it and than make the currentStudent card.
      const li = document.createElement("LI");
      li.className = "student-item cf";
      li.innerHTML = `
                  <div class="student-details">
                     <img class="avatar" src=${currentStudent.picture.large} alt="Profile Picture">
                     <h3>${currentStudent.name.title} ${currentStudent.name.first} ${currentStudent.name.last}</h3>
                     <span class="email">${currentStudent.email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${currentStudent.registered.date}</span>
                  </div>
                  `;
      //insert the li into the list
      ULStudentList.append(li);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  //summing the total pages buttons
  const totalPagination = Math.ceil(list.length / studentsPerPage);

  //clear the current button list
  ULLinkList.innerHTML = "";

  for (let i = 1; i <= totalPagination; i++) {
    //loop the total page to create to create a 'li' HTML element with button to hold the current i as a text.
    let li = document.createElement("LI");
    li.innerHTML = `<button type="button">${i}</button>`;

    //insert the li into the list
    ULLinkList.append(li);
  }

  //declare a varible to hold the currentButton that display and set it to the firschild of the list(first page)
  let currentButton = ULLinkList.firstChild?.firstChild;
  currentButton.className = "active";
  ULLinkList.addEventListener("click", (e) => {
    if (e.target.type === "button") {
      //reseting the currentButton class
      currentButton.className = "";
      //changing the currentButton variable to hold the click element target
      currentButton = e.target;
      //add a class to the currentButton
      currentButton.className = "active";
      //calling the showPage function with the list parameter and the currentbutton
      showPage(list, +e.target.innerHTML);
    }
  });
}

//serchByName an event listener function

function searchByName(inputValue, students) {
  //set new empty array
  let newStudents = [];
  for (let i = 0; i < students.length; i++) {
    //set current student variable to hold the current student iteration
    let currentStudent = students[i];
    if (currentStudent.name.first.toLowerCase().includes(inputValue.toLowerCase()) ||
      currentStudent.name.last.toLowerCase().includes(inputValue.toLowerCase()) ||
      currentStudent.name.title.toLowerCase().includes(inputValue.toLowerCase()) 
    ) {
      //if the search input matches to one of the name of current student, adding current student to new array
      newStudents.push(currentStudent);
      addPagination(newStudents);
    }else{
       let errorMessage = 'No results found'
       document.querySelector(".no-res-message").innerHTML = errorMessage
       document.querySelector(".pagination").innerHTML = ''
      
    }
   
  }
  showPage(newStudents, 1);
}

let searchStr = "";
//event for clicking the button
btnSearch.addEventListener("click", (e) => {
  //set the searchSring to the input value
  searchStr = inputSearch.value;
  searchByName(searchStr, data);
});

//event for keypress the input field
inputSearch.addEventListener("keyup", (e) => {
  //set the current searchStr to the current input value
  searchStr = e.target.value;
  searchByName(searchStr, data);
});
searchStr = "";
// Call functions
console.log('btnSearch secund',btnSearch)
showPage(data, 1);

addPagination(data);