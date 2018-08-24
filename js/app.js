// 1-VARIABLES

// 3-Courses list variable
const courses = document.querySelector('#courses-list'),

    // 18-Variable to hold the template created in step 17
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    
    // 22-Variable for the 'clear cart button'
    clearCartBtn = document.querySelector('#clear-cart');



// 2-LISTENERS

// 4-Event listener for added courses. Here we call the function:
loadEventListeners();

// 5-Creating the 'loadEventListeners' function
function loadEventListeners() {

    // 6-When a new course is added
    courses.addEventListener('click', buyCourse);

    // 20-When the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // 23-Clear cart button
    clearCartBtn.addEventListener('click', clearCart);

    // 32-Document ready i.e. print cart content when page reloads
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}



// 3-FUNCTIONS

// 7-Creating the 'buyCourse' function
function buyCourse(e) {

    // 9-To stop the standard behaviour of the link trying to open when clicked
    e.preventDefault();

    // 8-Using delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {

        // 10-Reading the course values i.e. everything in the card
        const course = e.target.parentElement.parentElement;

        // 11-Reading and getting the values using this function below
        getCourseInfo(course);
    }
}

// 12-Creating the 'getCourseInfo' function to read the HTML information 
// of the selected course
function getCourseInfo(course) {

    // 13-Creating an object with the course data
    const getCourseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }

    // 14-Inserting the courses into the shopping cart by calling this function:
    addIntoCart(getCourseInfo);
}

// 15-Creating the addIntoCart function which will display the selected course
// into the shopping cart
function addIntoCart(course) {

    // 16-Creating a <tr> to hold the added courses
    const row = document.createElement('tr');

    // 17-Building a template from the course object that we pass into this function
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    // 19-Adding the 'shoppingCartContent' variable created above into the shoping cart
    shoppingCartContent.appendChild(row);

    // 25-Adding selected course(s) into local storage by calling the function below:
    saveIntoStorage(course);
}

// 26-Adds selected courses into local storage
function saveIntoStorage(course) {
    // 29-
    let courses = getCoursesFromStorage();

    // 30-Add course into the array
    courses.push(course);

    // 31-Sonce storage only saves strings, we need to convert JSON to string
    localStorage.setItem('courses', JSON.stringify(courses));
}

// 27-Get content from storage
function getCoursesFromStorage() {
    let courses;

    // 28-If something exists in the storage, retrieve the value, otherwise create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}


// 21-Remove course from the DOM (cart)
function removeCourse(e) {
    // 39
    let course, courseId;

    // This removes from the cart
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();

        // 40-Removing the element (course) that was clicked for deletion
        course = e.target.parentElement.parentElement;

        // 41-
        courseId = course.querySelector('a').getAttribute('data-id');
    }

    // 42-Removes from the local storage
    removeCourseLocalStorage(courseId);
}

// 43-Creating the 'removeCourseLocalStorage' function to remove from local storage     
function removeCourseLocalStorage(id) {
    // 44-Get local storage data
    let coursesLS = getCoursesFromStorage(); 

    // 45-LOOP through the array to find the index to remove
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    // 46-Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// 24-Creating the 'clearCart'function from step 23 above to clear the shopping cart list
function clearCart() {
    // shoppingCartContent.innerHTML = ''; // First method to clear the cart

    // Second method to clear the cart, THIS IS THE RECOMMENDED WAY
    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // 37-Call function that clears the local storage when clear cart button is clicked
    clearLocalStorage();
}

// 38-Clears all the content from the local storage when clear button is clicked
function clearLocalStorage() {
    localStorage.clear();
}

// 33-Creating the 'getFromLocalStorage' that loads when document is ready and 
// and prints courses into the cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // 34-LOOP through the courses and print into the cart
    coursesLS.forEach(function(course) {
        // 35-Create <tr>
        const row = document.createElement('tr');

        // 36-Print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}