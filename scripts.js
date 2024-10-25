function changeFontSize() {
    //Change font size back and forth
    var body = document.getElementsByTagName('body')[0];
    var currentSize = body.style.fontSize;
    if (currentSize == "20px") {
        body.style.fontSize = "16px";
    }
    else {
        body.style.fontSize = "20px";
    }
}

function changeBackgroundColor() {
    var body = document.getElementsByTagName('body')[0];
    var header = document.getElementsByTagName('header')[0];
    var navList = document.getElementsByTagName('ul')[0];
    var sidebar = document.getElementsByClassName('sidebar')[0];

    // Get computed background color for body
    var bodyColor = window.getComputedStyle(body).backgroundColor;
    if (bodyColor == "rgb(255, 255, 0)") { // Yellow
        body.style.backgroundColor = "white";
    } else {
        body.style.backgroundColor = "yellow";
    }

    // Get computed background color for header
    var headerColor = window.getComputedStyle(header).backgroundColor;
    if (headerColor == "rgb(0, 0, 0)") { // Black
        header.style.color = "black";
        header.style.backgroundColor = "white";
    } else {
        header.style.color = "white";
        header.style.backgroundColor = "black";
    }

    // Get computed background color for navbar ul
    var navListColor = window.getComputedStyle(navList).backgroundColor;
    if (navListColor == "rgb(255, 158, 214)") { // Pink
        navList.style.backgroundColor = "rgb(0, 255, 0)";
    } else {
        navList.style.backgroundColor = "rgb(255, 158, 214)";
    }

    // Get computed background color for sidebar
    var sidebarColor = window.getComputedStyle(sidebar).backgroundColor;
    if (sidebarColor == "rgb(0, 0, 255)") { // Blue
        sidebar.style.backgroundColor = "red";
    } else {
        sidebar.style.backgroundColor = "blue";
    }

    // Get computed background color for footer
    var footer = document.getElementsByTagName('footer')[0];
    var footerColor = window.getComputedStyle(footer).backgroundColor;
    if (footerColor == "rgb(0, 255, 0)") { // Green
        footer.style.backgroundColor = "cyan";
        footer.style.color = "black";
    } else {
        footer.style.backgroundColor = "rgb(0, 255, 0)";
        footer.style.color = "white";
    }
}

function updateFooter() {
    const footerText = document.getElementsByTagName('footer')[0];
    // display current local date and time in the footer. Make sure time is updated every minute
    var today = new Date();
    const dateTime = today.toLocaleString();
    footerText.innerHTML = dateTime + "<br>Manish Mallik<br>mkm200004<br>Sameer Islam<br>sdi200000<br>Section 002";
}

function updateFooterJQuery() {
    const footerText = $('footer');
    // display current local date and time in the footer. Make sure time is updated every minute
    var today = new Date();
    const dateTime = today.toLocaleString();
    footerText.html(dateTime + "<br>Manish Mallik<br>mkm200004<br>Sameer Islam<br>sdi200000<br>Section 002");
}

function contactSubmit(){
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name=gender]:checked').value;
    const comment = document.getElementById("comment").value;

    var alertMessage = "";
    var alphabeticRegex = /^[a-zA-Z]+$/;
    var capitalizedRegex = /^[A-Z]/;
    var phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    var commentRegex = /^.{10,}$/;

    // email address must contain @ and . They cannot be starting or ending characters. use regex for this
    var emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    // check if first name is empty
    if(fname == ""){
        alertMessage += "First name is required.<br>";
    }
    // check if first name is not alphabetic only
    else if(!alphabeticRegex.test(fname)){
        alertMessage += "First name must be alphabetic only.<br>";
    }
    // check if first letter of first name is capitalized
    else if(!capitalizedRegex.test(fname[0])){
        alertMessage += "First name must be capitalized.<br>";
    }

    // check if last name is empty
    if(lname == ""){
        alertMessage += "Last name is required.<br>";
    }
    // check if last name is not alphabetic only
    else if(!alphabeticRegex.test(lname)){
        alertMessage += "Last name must be alphabetic only.<br>";
    }
    // check if first letter of last name is capitalized
    else if(!capitalizedRegex.test(lname[0])){
        alertMessage += "Last name must be capitalized.<br>";
    }

    // check if first name and last name are the same (ignore case)
    if(fname.toLowerCase() == lname.toLowerCase()){
        alertMessage += "First name and last name cannot be the same.<br>";
    }

    // check if phone number is empty
    if(phone == ""){
        alertMessage += "Phone number is required.<br>";
    }
    // check if phone number is in the correct format
    else if(!phoneRegex.test(phone)){
        alertMessage += "Phone number must be in the format (xxx) xxx-xxxx. Note that there is a space between ) and x. Each x must be a single digit.<br>";
    }

    // check if email is empty
    if(email == ""){
        alertMessage += "Email is required.<br>";
    }
    // check if email is in the correct format
    else if(!emailRegex.test(email)){
        alertMessage += "Email must be in correct format. Make sure you have an \"@\" and \".\" in your input (neither as first nor last characters).<br>";
    }

    if(gender == undefined){
        alertMessage += "Gender is required.<br>";
    }

    // check if comments are empty
    if(comment == ""){
        alertMessage += "Comment is required.<br>";
    }
    // check if comments are at least 10 characters long
    else if(!commentRegex.test(comment)){
        alertMessage += "Comment must be at least 10 characters long.<br>";
    }

    if(alertMessage != ""){
        document.getElementById("contact-output").innerHTML = "Your input has some errors:<br>" + alertMessage;
        document.getElementById("contact-output").style.color = "red";
    } else {
        document.getElementById("contact-output").innerHTML = "<h3>Thank you for your submission! Here are your submission details:</h3>" + 
        "<strong>First Name:</strong> " + fname + 
        "<br><strong>Last Name:</strong> " + lname + 
        "<br><strong>Phone:</strong> " + phone + 
        "<br><strong>Email:</strong> " + email + 
        "<br><strong>Gender:</strong> " + gender + 
        "<br><strong>Comment:</strong> " + comment;
        document.getElementById("contact-output").style.color = "green";
    }
}

// Show and hide form fields based on the trip type
function confirmTripType() {
    let dropdown = document.getElementById("tripdropdown"); 
    let selectedValue = dropdown.value; 

    var originLabel = document.getElementById("origin-label");
    var origin = document.getElementById("origin");
    var destinationLabel = document.getElementById("destination-label");
    var destination = document.getElementById("destination");
    var departureLabel = document.getElementById("departure-label");
    var departure = document.getElementById("departure");
    var arrivalLabel = document.getElementById("arriving-label");
    var arrival = document.getElementById("arriving");
    var searchButton = document.getElementById("searchButton");

    // Reset all fields initially
    originLabel.style.display = "none";
    origin.style.display = "none";
    destinationLabel.style.display = "none";
    destination.style.display = "none";
    departureLabel.style.display = "none";
    departure.style.display = "none";
    arrivalLabel.style.display = "none";
    arrival.style.display = "none";
    searchButton.style.display = "none";

    // Show form fields based on selected option
    if (selectedValue === "one-way") {
        originLabel.style.display = "block";
        origin.style.display = "block";
        destinationLabel.style.display = "block"
        destination.style.display = "block";
        departureLabel.style.display = "block";
        departure.style.display = "block";
        searchButton.style.display = "block"; 

        arrivalLabel.value = ""; // Hide arrival date for one-way
    } else if (selectedValue === "round-trip") {
        originLabel.style.display = "block";
        origin.style.display = "block";
        destinationLabel.style.display = "block"
        destination.style.display = "block";
        departureLabel.style.display = "block";
        departure.style.display = "block";
        arrivalLabel.style.display = "block";
        arrival.style.display = "block"; // Show arrival date for round trip
        searchButton.style.display = "block";
    }
}

// Show the passenger form when the icon is clicked
function showPassengerForm() {
    var passengerForm = document.getElementById("passengerForm");
    passengerForm.style.display = passengerForm.style.display === "none" ? "block" : "none";
}

// Function to validate if the city ends with ", TX" or ", CA"
function isValidState(location) {
    const stateRegex = /,\s?(TX|CA)$/;  // Matches ", TX" or ", CA" at the end of the string
    return stateRegex.test(location);
}

// Function to validate if a date is between Sep 1, 2024, and Dec 1, 2024
function isValidDate(departure) {

    // Regex pattern to match dates between Sep 1, 2024 and Dec 1, 2024
    const dateRegex = /^(2024)-(09-(0[1-9]|[1-2][0-9]|30)|10-(0[1-9]|[1-2][0-9]|3[0-1])|11-(0[1-9]|[1-2][0-9]|30)|12-01)$/;

    return dateRegex.test(departure);
}

function isValidArrival(departure, arrival) {
    const dep = new Date(departure);
    const arr = new Date(arrival);

    return arr > dep;
}


// Function to validate if city is in valid format
function isValidCity(city) {
    
    // City name must be at least 2 characters long, can have periods, apostrophes, hypens, and spaces, start with a capital letter or number, and end with a letter or number before the comma, followed by a space and 2-letter state code.
    const cityRegex = /^[A-Z0-9][a-zA-Z0-9\s.'-]*[a-zA-Z0-9],\s[A-Z]{2}$/;
    return cityRegex.test(city);
}

function isValidPassengerCount(adults, children, infants) {
    const adultregex = /^[1-4]$/;
    const passengerRegex = /^[0-4]$/;

    // Check if adults, children, or infants exceed the allowed range (0-4)
    if (!adultregex.test(adults) || !passengerRegex.test(children) || !passengerRegex.test(infants)) {
        return false;
    }
    return true;
}

// Validate user inputs and display entered information
function validateAndSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form values
    let origin = document.getElementById('origin').value.trim();
    let destination = document.getElementById('destination').value.trim();
    let departure = document.getElementById('departure').value;
    let arrival = document.getElementById('arriving').value;
    let adults = document.getElementById('adults').value;
    let children = document.getElementById('children').value;
    let infants = document.getElementById('infants').value;

    var errors = "";

    // Validation checks
    if (!origin || !destination || !departure || adults < 1) {
        errors += "Please fill in all required fields with valid values.<br>";
    }

    // Departure date validation (between Sep 1, 2024, and Dec 1, 2024)
    if (!isValidDate(departure)) {
        errors += "Departure date must be between Sep 1, 2024, and Dec 1, 2024.<br>";
    }

    if (arrival) {
        if (!isValidDate(arrival)) {
            errors += "Return date must be between Sep 1, 2024, and Dec 1, 2024.<br>";
        }
    }

    if (!isValidCity(origin) || !isValidCity(destination)) {
        errors += "Make sure the city name (the name before the comma) for both Origin and Destination are alphanumeric (can contain a space, period, apostrophes, or dash/hyphens), at least 2 characters long, has first character be an uppercase letter or number, has last character be a number or a letter of any case, and is followed by a comma, one space character, and 2-letter state code that is capitalized.<br>";
    }
    // Origin and destination validation (must be a city in Texas or California)
    else if (!isValidState(origin) || !isValidState(destination)) {
        errors += "Origin and destination must be cities in Texas (TX) or California (CA).<br>";
    }

    if (!isValidPassengerCount(adults, children, infants)){
        errors += "The number of passengers in each category (adults, children, infants) cannot exceed 4.<br>";
    }

    if (document.getElementById('tripdropdown').value === "round-trip" && (!arrival || !isValidArrival(departure, arrival))) {
        errors += "Please provide a valid return date for a round trip. Make sure it is a date after the departure date.<br>";
    }

    if (errors != "") {
        document.getElementById('tripDetails').innerHTML = "Your input has some errors:<br>" + errors;
        document.getElementById('tripDetails').style.color = "red";
        return;
    }

    // Display entered information
    let tripDetails = `
        <h3>Trip Details:</h3>
        <strong>Origin: </strong> ${origin}<br>
            <strong>Destination: </strong> ${destination}<br>
            <strong>Departure Date: </strong> ${departure}<br>
            ${arrival ? `<strong>Return Date:</strong> ${arrival}<br>` : ""}
            <strong>Adults:</strong> ${adults}<br>
            <strong>Children:</strong> ${children}<br>
            <strong>Infants:</strong> ${infants}<br>
    `;

    // Display the trip details in the designated div
    document.getElementById('tripDetails').innerHTML = tripDetails;
    document.getElementById('tripDetails').style.color = "green";
}

function isValidStayCityPt1(city) {

    // Check if there is only 1 comma
    if (!city.includes(', ') || city.split(',').length != 2) {
        return "invalid";
    }

    // Trim any whitespace characters before the comma and after the state code
    const cityName = city.split(', ')[0].trim();
    const state = city.split(', ')[1].trim();

    // Concatenate the city name and state code
    return cityName + ", " + state;
}

function isValidStayCityPt2(city) {
    // Remove/strip of any white space that is right before the comma. Do not use regex
    const cityName = city.split(', ')[0].trim();
    const state = city.split(', ')[1].trim();

    // Check if city is at least 2 characters long
    if (cityName.length < 2) {
        return false;
    }

    // Check if first character of city is an uppercase letter or number
    if (!((cityName[0] >= 'A' && cityName[0] <= 'Z') || (cityName[0] >= '0' && cityName[0] <= '9'))) {
        return false;
    }

    // Check if the city name is alphanumeric (can contain a space, period, apostrophes, or dash/hyphens)
    let acceptableChars = [' ', '.', '\'', '-'];
    for (let i = 1; i < cityName.length; i++) {
        if (!((cityName[i] >= 'A' && cityName[i] <= 'Z') || (cityName[i] >= 'a' && cityName[i] <= 'z') || (cityName[i] >= '0' && cityName[i] <= '9') || acceptableChars.includes(cityName[i]))) {
            return false;
        }
    }

    // Check if last character of city is a letter or number
    const lastChar = cityName[cityName.length - 1];
    if (!((lastChar >= 'A' && lastChar <= 'Z') || (lastChar >= 'a' && lastChar <= 'z') || (lastChar >= '0' && lastChar <= '9'))) {
        return false;
    }


    // Check if the state is exactly 2 characters long and both characters are uppercase
    return state.length == 2 && state == state.toUpperCase();
}

// Helper function to check if the city is in Texas or California
function isValidStayState(city) {
    return city.endsWith('TX') || city.endsWith('CA');
}

// Helper function to check if the date is between Sep 1, 2024, and Dec 1, 2024
function isValidStayDate(date) {
    const checkInLimit = new Date("2024-09-01");
    const checkOutLimit = new Date("2024-12-01");
    const inputDate = new Date(date);
    return inputDate >= checkInLimit && inputDate <= checkOutLimit;
}

// Calculate the number of rooms based on the number of guests
function calculateRooms(adults, children) {
    const totalGuests = adults + children;
    return Math.ceil(totalGuests / 2);  // Two guests per room, infants do not count
}

// Validate user inputs and display entered information
function validateAndSubmitStay(event) {
    event.preventDefault();

    let city = document.getElementById('city').value;
    let checkIn = document.getElementById('checkIn').value;
    let checkOut = document.getElementById('checkOut').value;
    let adults = parseInt(document.getElementById('adults').value);
    let children = parseInt(document.getElementById('children').value);
    let infants = parseInt(document.getElementById('infants').value);

    var errors = "";

    // Validation
    if (!city || !checkIn || !checkOut || adults < 1) {
        errors += "Please fill in all of the fields.<br>";
    }

    // Check if city is in the correct format and is trimmed
    let trimmedCity = isValidStayCityPt1(city);
    if (trimmedCity == "invalid") {
        errors += "There can only be one comma, and make sure that comma is followed by a space and 2-letter state code that is capitalized.<br>"
    } else if(!isValidStayCityPt2(trimmedCity))
        errors += "Make sure the city name (the name before the comma) is alphanumeric (can contain a space, period, apostrophes, or dash/hyphens), at least 2 characters long, has first character be an uppercase letter or number, has last character be a number or a letter of any case, and is followed by a comma, one space character, and 2-letter state code that is capitalized.<br>";
    else {
        city = trimmedCity;
        // Check if city is in Texas or California
        if (!isValidStayState(city)) {
            errors += "The city must be in Texas (TX) or California (CA).<br>";
        }
    }

    // Validate check-in and check-out dates
    if (!isValidStayDate(checkIn) || !isValidStayDate(checkOut)) {
        errors += "Check-in and check-out dates must be between Sep 1, 2024, and Dec 1, 2024.<br>";
    } else if (new Date(checkOut) <= new Date(checkIn)) {
        errors += "Check-out date must be after the check-in date.<br>";
    }

    // Calculate the number of rooms needed
    let roomsNeeded = calculateRooms(adults, children);

    if (errors != "") {
        document.getElementById('stayDetails').innerHTML = "Your input has some errors:<br>" + errors;
        document.getElementById('stayDetails').style.color = "red";
        return;
    }
    // Display stay details
    let stayDetails = `
        <h3>Stay Details:</h3>
        
            <strong>City:</strong> ${city}<br>
            <strong>Check-In Date:</strong> ${checkIn}<br>
            <strong>Check-Out Date:</strong> ${checkOut}<br>
            <strong>Adults:</strong> ${adults}<br>
            <strong>Children:</strong> ${children}<br>
            <strong>Infants:</strong> ${infants}<br>
            <strong>Rooms Needed:</strong> ${roomsNeeded}
        
    `;

    document.getElementById('stayDetails').innerHTML = stayDetails;
    document.getElementById('stayDetails').style.color = "green";
}

// DOM Method to load and build the cars.html page
document.addEventListener('DOMContentLoaded', () => {

    // Add footer text dynamically
    if(!window.location.pathname.includes('cruises.html')){
        // Dynamically create navigation links
        if(!window.location.pathname.includes('index.html') && !window.location.pathname.includes('contact-us.html')){
            const pages = ["Home", "Stays", "Flights", "Cars", "Cruises", "Contact Us"];
            const navList = document.getElementById('nav-list');

            pages.forEach(page => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                if(page == "Home"){
                    a.href = "index.html";
                } else {
                    a.href = `${page.toLowerCase().replace(" ", "-")}.html`;
                }
                a.textContent = page;
                li.appendChild(a);
                navList.appendChild(li);
            });

            // Add actions dynamically
            const actions = ["Change Font Size", "Change Background Color"];
            const sidebar = document.getElementById('sidebar');
            const sidebarHeader = document.createElement('h2');
            sidebarHeader.textContent = "Change font size and/or background color of the webpage";
            sidebar.appendChild(sidebarHeader);

            actions.forEach(action => {
                const button = document.createElement('button');
                button.textContent = action;
                if (action == "Change Font Size") {
                    button.addEventListener('click', changeFontSize);
                }
                else if (action == "Change Background Color") {
                    button.addEventListener('click', changeBackgroundColor);
                }
                sidebar.appendChild(button);
                sidebar.appendChild(document.createElement('br'));
            });
        }
        updateFooter();
        setInterval(updateFooter, 1000);
    }

    if (window.location.pathname.includes('stays.html')) {
        const form = document.getElementById('stayForm');
        form.addEventListener('submit', validateAndSubmitStay);
    }

    // Apply this only to the cars.html page
    if (window.location.pathname.includes('cars.html')) {

        const header = document.getElementById('header-title');
        header.textContent = "Cars";

        // Validate and handle form submission
        const carForm = document.getElementById('carForm');
        const output = document.getElementById('output');

        // Create city label and input field
        const cityLabel = document.createElement('label');
        cityLabel.setAttribute('for', 'city');
        cityLabel.textContent = "City (make sure to follow the format as shown in the below example):";
        const cityInput = document.createElement('input');
        cityInput.setAttribute('type', 'text');
        cityInput.setAttribute('id', 'city');
        cityInput.setAttribute('name', 'city');
        cityInput.setAttribute('placeholder', 'Format: Dallas, TX');
        cityInput.setAttribute('required', true);

        // Create car type label and select field
        const carTypeLabel = document.createElement('label');
        carTypeLabel.setAttribute('for', 'carType');
        carTypeLabel.textContent = "Type of Car:";
        const carTypeSelect = document.createElement('select');
        carTypeSelect.setAttribute('id', 'carType');
        carTypeSelect.setAttribute('name', 'car');
        carTypeSelect.setAttribute('required', true);

        // Add options to car type select
        const carTypes = ["Select Car Type", "Economy", "SUV", "Compact", "Midsize"];
        carTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type == "Select Car Type" ? "" : type;
            option.textContent = type;
            carTypeSelect.appendChild(option);
        });

        // Create check-in and check-out date inputs
        const checkInLabel = document.createElement('label');
        checkInLabel.setAttribute('for', 'checkIn');
        checkInLabel.textContent = "Check In Date:";
        const checkInInput = document.createElement('input');
        checkInInput.setAttribute('type', 'date');
        checkInInput.setAttribute('id', 'checkIn');
        checkInInput.setAttribute('name', 'checkIn');
        checkInInput.setAttribute('required', true);

        const checkOutLabel = document.createElement('label');
        checkOutLabel.setAttribute('for', 'checkOut');
        checkOutLabel.textContent = "Check Out Date:";
        const checkOutInput = document.createElement('input');
        checkOutInput.setAttribute('type', 'date');
        checkOutInput.setAttribute('id', 'checkOut');
        checkOutInput.setAttribute('name', 'checkOut');
        checkOutInput.setAttribute('required', true);

        // Append elements to the form
        carForm.appendChild(cityLabel);
        carForm.appendChild(document.createElement('br'));
        carForm.appendChild(cityInput);
        carForm.appendChild(document.createElement('br'));

        carForm.appendChild(carTypeLabel);
        carForm.appendChild(document.createElement('br'));
        carForm.appendChild(carTypeSelect);
        carForm.appendChild(document.createElement('br'));

        carForm.appendChild(checkInLabel);
        carForm.appendChild(document.createElement('br'));
        carForm.appendChild(checkInInput);
        carForm.appendChild(document.createElement('br'));

        carForm.appendChild(checkOutLabel);
        carForm.appendChild(document.createElement('br'));
        carForm.appendChild(checkOutInput);
        carForm.appendChild(document.createElement('br'));

        // Add submit button
        const submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit');
        carForm.appendChild(submitButton);

        carForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieve user input values
            const city = document.getElementById('city').value.trim();
            const carType = document.getElementById('carType').value;
            const checkIn = new Date(document.getElementById('checkIn').value);
            const checkOut = new Date(document.getElementById('checkOut').value);

            // Validation rules
            // City must be alphabetic, can contain a space or dash, must end with a comma followed by a space and 2-letter state code that is capitalized
            const cityRegex = /^[A-Z0-9][a-zA-Z0-9\s.'-]*[a-zA-Z0-9],\s[A-Z]{2}$/;
            const validCarTypes = ["Economy", "SUV", "Compact", "Midsize"];
            const minDate = new Date("2024-09-01");
            const maxDate = new Date("2024-12-01");

            let errors = [];

            // Validate city
            if (city.length == 0) {
                errors.push("City is required.");
            } else if (!cityRegex.test(city)) {
                errors.push("Make sure the city name (the name before the comma) is alphanumeric (can contain a space, period, apostrophes, or dash/hyphens), at least 2 characters long, has first character be an uppercase letter or number, has last character be a number or a letter of any case, and is followed by a comma, one space character, and 2-letter state code that is capitalized.");
            } else if (city.slice(-2) != "TX" && city.slice(-2) != "CA") {
                errors.push("City must either be from Texas (TX) or California (CA).");
            }

            // Validate car type
            if (!validCarTypes.includes(carType)) {
                errors.push("Car type must be economy, SUV, compact, or midsize.");
            }

            // Validate check-in and check-out dates
            if (checkIn < minDate || checkIn > maxDate) {
                errors.push("Check-in date must be between Sep 1, 2024 and Dec 1, 2024.");
            }
            if (checkOut < minDate || checkOut > maxDate) {
                errors.push("Check-out date must be between Sep 1, 2024 and Dec 1, 2024.");
            }
            if (checkIn >= checkOut) {
                errors.push("Check-in date must be before the check-out date.");
            }

            // Output validation results or form data
            if (errors.length > 0) {
                output.innerHTML = "Your input has some errors:<br>" + errors.join('<br>');
                output.style.color = "red";
            } else {
                output.innerHTML = `
                    <h3>Car Details:</h3>
                    <strong>City:</strong> ${city} <br>
                    <strong>Car Type:</strong> ${carType} <br>
                    <strong>Check In:</strong> ${checkIn.toLocaleDateString()} <br>
                    <strong>Check Out:</strong> ${checkOut.toLocaleDateString()} <br>
                `;
                output.style.color = "green";
            }
        });
    }
});

//Method that uses jQuery to load and build the cruise.html page
$(document).ready(function(){

    if (window.location.pathname.includes('cruises.html')) {

        $('#header-title').text("Cruises");

        const pages = ["Home", "Stays", "Flights", "Cars", "Cruises", "Contact Us"];
        const actions = ["Change Font Size", "Change Background Color"];
        
        pages.forEach(page => {
            const li = $('<li></li>');
            if (page == "Home") {
                const a = $('<a></a>').attr('href', 'index.html').text(page);
                li.append(a);
            } else {
                const a = $('<a></a>').attr('href', `${page.toLowerCase().replace(" ", "-")}.html`).text(page);
                li.append(a);
            }
            $('#nav-list').append(li);
        });

        const sidebarHeader = $('<h2></h2>').text("Change font size and/or background color of the webpage");
        $('#sidebar').append(sidebarHeader);

        actions.forEach(action => {
            const button = $('<button></button>').text(action);
            if (action == "Change Font Size") {
                button.click(changeFontSize);
            }
            else if (action == "Change Background Color") {
                button.click(changeBackgroundColor);
            }
            $('#sidebar').append(button);
            $('#sidebar').append('<br>');
        });

        // Dynamically generate the cruise booking form
        const form = `
        <form id="cruiseForm">
            <label for="destination">Destination:</label>
            <select id="destination" name="destination" required>
                <option value="">Select Destination</option>
                <option value="Alaska">Alaska</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Europe">Europe</option>
                <option value="Mexico">Mexico</option>
            </select><br>

            <label for="departBetween">Departing Between (Sep 1, 2024 - Dec 1, 2024):</label>
            <input type="date" id="departBetween" name="departBetween" required><br>

            <label for="minDuration">Minimum Duration (3-10 days):</label>
            <input type="number" id="minDuration" name="minDuration" min="3" max="10" value="3" required><br>

            <label for="maxDuration">Maximum Duration (3-10 days):</label>
            <input type="number" id="maxDuration" name="maxDuration" min="3" max="10" value="10" required><br>

            <label for="adults">Number of Adults Total:</label>
            <input type="number" id="adults" name="adults" min="1" value="1" required><br>

            <label for="children">Number of Children Total:</label>
            <input type="number" id="children" name="children" min="0" value="0" required><br>

            <label for="infants">Number of Infants:</label>
            <input type="number" id="infants" name="infants" min="0" value="0" required><br>

            <input type="submit" value="Submit">
        </form>`;

        // Append the form to the form container
        $('#formContainer').html(form);

        // Add footer text dynamically
        updateFooterJQuery();
        setInterval(updateFooterJQuery, 1000);

        $('#cruiseForm').submit(function(event){
            event.preventDefault();

            const destination = $('#destination').val();
            const departBetween = $('#departBetween').val();
            const minDuration = parseInt($('#minDuration').val());
            const maxDuration = parseInt($('#maxDuration').val());
            const adults = parseInt($('#adults').val());
            const children = parseInt($('#children').val());
            const infants = parseInt($('#infants').val());

            var alertMessage = "";
            var departDate = new Date(departBetween);
            var minDate = new Date("2024-09-01");
            var maxDate = new Date("2024-12-01");

            if(departDate < minDate || departDate > maxDate){
                alertMessage += "Departure date must be between Sep 1, 2024 and Dec 1, 2024.\n";
            }

            // Validate min and max duration
            if(minDuration < 3 || minDuration > 10 || maxDuration < 3 || maxDuration > 10){
                alertMessage += "Duration must be between 3 and 10 days.\n";
            }
            else if(minDuration > maxDuration){
                alertMessage += "Minimum duration cannot be greater than maximum duration.\n";
            }

            const rooms = calculateRooms(adults, children);

            if(alertMessage != ""){
                $('#output').html("Your input has some errors:<br>" + alertMessage);
                $('#output').css('color', 'red');
            } else {
                $('#output').html("<h3>Cruise Details:</h3>" + 
                    "<strong>Destination:</strong> " + destination + 
                    "<br><strong>Departure Date:</strong> " + departBetween + 
                    "<br><strong>Duration:</strong> " + (minDuration == maxDuration ? minDuration : minDuration + " - " + maxDuration) + 
                    " days<br><strong>Adults:</strong> " + adults + 
                    "<br><strong>Children:</strong> " + children +
                    "<br><strong>Infants:</strong> " + infants +
                    "<br><strong>Rooms Needed:</strong> " + rooms);
                $('#output').css('color', 'green');
            }
        });
    }
});