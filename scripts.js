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

// function changeBackgroundColor() {
//     // //Change background color back and forth
//     var body = document.getElementsByTagName('body')[0];
//     var bodyColor = body.style.backgroundColor;
//     if (bodyColor == "yellow") {
//         body.style.backgroundColor = "white";
//     }
//     else {
//         body.style.backgroundColor = "yellow";
//     }

//     // Get color of header
//     var header = document.getElementsByTagName('header')[0];
//     var headerColor = header.style.backgroundColor;
//     if (headerColor == "black") {
//         header.style.color = "black";
//         header.style.backgroundColor = "white";
//     }
//     else {
//         header.style.color = "white";
//         header.style.backgroundColor = "black";
//     }

//     // Get backgroundcolor of navbar ul
//     var navList = document.getElementsByTagName('ul')[0];
//     var navListColor = navList.style.backgroundColor;
//     if (navListColor == "pink") {
//         navList.style.backgroundColor = "purple";
//     }
//     else {
//         navList.style.backgroundColor = "pink";
//     }

//     // Get backgroundcolor of sidebar
//     var sidebar = document.getElementsByClassName('sidebar')[0];
//     console.log(sidebar);
//     var sidebarColor = sidebar.style.backgroundColor;

//     if (sidebarColor == "blue") {
//         sidebar.style.backgroundColor = "red";
//     }
//     else {
//         sidebar.style.backgroundColor = "blue";
//     }

// }

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
    } else {
        footer.style.backgroundColor = "rgb(0, 255, 0)";
    }
}

function updateFooter() {
    const footerText = document.getElementsByTagName('footer')[0];
    // display current local date and time in the footer. Make sure time is updated every minute
    var today = new Date();
    const dateTime = today.toLocaleString();
    footerText.textContent = dateTime;
}

function updateFooterJQuery() {
    const footerText = $('footer');
    // display current local date and time in the footer. Make sure time is updated every minute
    var today = new Date();
    const dateTime = today.toLocaleString();
    footerText.text(dateTime);
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
    // var emailRegex = /^[a-zA-Z0-9._%+-]+@utdallas.edu$/;

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
        alertMessage += "Email must be in correct format.<br>";
    }

    if(gender == undefined){
        alertMessage += "Gender is required.<br>";
    }
    else {
        console.log(gender);
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
        // alert("Thank you for your submission! Here is your information:\n" + "First Name: " + fname + "\nLast Name: " + lname + "\nPhone: " + phone + "\nEmail: " + email);
        document.getElementById("contact-output").innerHTML = "Thank you for your submission! Here is your information:<br>" + 
        "<strong>First Name:</strong> " + fname + 
        "<br><strong>Last Name:</strong> " + lname + 
        "<br><strong>Phone:</strong> " + phone + 
        "<br><strong>Email:</strong> " + email + 
        "<br><strong>Gender:</strong> " + gender + 
        "<br><strong>Comment:</strong> " + comment;
        document.getElementById("contact-output").style.color = "green";
    }
}

// DOM Method to load and build the cars.html page
document.addEventListener('DOMContentLoaded', () => {

    // Add footer text dynamically
    if(!window.location.pathname.includes('cruises.html')){
        updateFooter();
        setInterval(updateFooter, 1000);
    }

    // Apply this only to the cars.html page
    if (window.location.pathname.includes('cars.html')) {

        const header = document.getElementById('header-title');
        header.textContent = "Cars";

        // Dynamically create navigation links
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

        // Add popular destinations dynamically
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

        // Validate and handle form submission
        const carForm = document.getElementById('carForm');
        const output = document.getElementById('output');

        carForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieve user input values
            const city = document.getElementById('city').value;
            const carType = document.getElementById('carType').value.toLowerCase();
            const checkIn = new Date(document.getElementById('checkIn').value);
            const checkOut = new Date(document.getElementById('checkOut').value);

            // Validation rules
            // City must be alphabetic, can contain a space or dash, must end with a comma followed by a space and 2-letter state code that is capitalized
            const cityRegex = /^[a-zA-Z]+[a-zA-Z\s-]+,\s[A-Z]{2}$/;
            const validCarTypes = ["economy", "suv", "compact", "midsize"];
            const minDate = new Date("2024-09-01");
            const maxDate = new Date("2024-12-01");

            let errors = [];

            // Validate city
            if (city.length == 0) {
                errors.push("City is required.");
            } else if (!cityRegex.test(city)) {
                errors.push("City must be alphabetic (can contain a space or dash), must end with a comma followed by a space and 2-letter state code that is capitalized.");
            } else if (city.slice(-2) != "TX" && city.slice(-2) != "CA") {
                errors.push("City must end with a 2-letter state code of TX or CA.");
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

            // Validate car type
            if (!validCarTypes.includes(carType)) {
                errors.push("Car type must be economy, SUV, compact, or midsize.");
            }

            // Output validation results or form data
            if (errors.length > 0) {
                output.innerHTML = "Your input has some errors:<br>" + errors.join('<br>');
                output.style.color = "red";
            } else {
                output.innerHTML = `
                    <strong>City:</strong> ${city} <br>
                    <strong>Car Type:</strong> ${carType.charAt(0).toUpperCase() + carType.slice(1)} <br>
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
        // <label for="guests">Number of Guests Total:</label>
        // <input type="number" id="guests" name="guests" min="1" required><br>
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
            <input type="number" id="minDuration" name="minDuration" min="3" max="10" required><br>

            <label for="maxDuration">Maximum Duration (3-10 days):</label>
            <input type="number" id="maxDuration" name="maxDuration" min="3" max="10" required><br>

            <label for="adults">Number of Adults Total:</label>
            <input type="number" id="adults" name="adults" min="1" required><br>

            <label for="children">Number of Children Total:</label>
            <input type="number" id="children" name="children" min="0" required><br>

            <label for="infants">Number of Infants:</label>
            <input type="number" id="infants" name="infants" min="0" required><br>

            <label for="rooms">Number of Rooms:</label>
            <input type="number" id="rooms" name="rooms" min="1" required><br>

            <input type="submit" value="Submit">
        </form>`;

        // Append the form to the form container
        $('#formContainer').html(form);

        // Add footer text dynamically
        updateFooterJQuery();
        setInterval(updateFooterJQuery, 1000);

        $('#cruiseForm').submit(function(event){
            // Validate user inputs for this page as following
            // • The destination should be Alaska, Bahamas, Europe, or Mexico
            // • For duration of cruise (minimum and maximum), minimum can not be less than
            // 3 and maximum can not be greater than 10 days
            // • Departing between can be anytime between Sep 1, 2024 to Dec 1st 2024.
            // • Number of guesses can not be more than 2 for each room. However infants
            // can stay with adults even if the number of guesses exceeds 2 
            event.preventDefault();

            const destination = $('#destination').val();
            const departBetween = $('#departBetween').val();
            const minDuration = $('#minDuration').val();
            const maxDuration = $('#maxDuration').val();
            // const guests = $('#guests').val();
            // const guests = parseInt($('#adults').val()) + parseInt($('#children').val());
            const adults = $('#adults').val();
            const children = $('#children').val();
            const infants = $('#infants').val();
            const guests = parseInt(adults) + parseInt(children) + parseInt(infants);
            const rooms = $('#rooms').val();

            var alertMessage = "";
            var today = new Date();
            var departDate = new Date(departBetween);
            var minDate = new Date("2024-09-01");
            var maxDate = new Date("2024-12-01");

            // check if destination is empty
            // if(destination == ""){
            //     alertMessage += "Destination is required.\n";
            // }
            // else if(destination != "Alaska" && destination != "Bahamas" && destination != "Europe" && destination != "Mexico"){
            //     alertMessage += "Please select a valid destination.\n";
            // }

            // check if departBetween is empty
            /* if(departBetween == ""){
            //     alertMessage += "Departure date is required.\n";
            // }
            else if(departDate < today){
                alertMessage += "Departure date must be today or in the future.\n";
            }
            else*/ if(departDate < minDate || departDate > maxDate){
                alertMessage += "Departure date must be between Sep 1, 2024 and Dec 1, 2024.\n";
            }

            // check if minDuration is empty
            /*if(minDuration == "" || maxDuration == ""){
                alertMessage += "Minimum duration and maximum duration are required.\n";
            }
            else*/ if(minDuration < 3 || minDuration > 10 || maxDuration < 3 || maxDuration > 10){
                alertMessage += "Duration must be between 3 and 10 days.\n";
            }
            else if(minDuration > maxDuration){
                alertMessage += "Minimum duration cannot be greater than maximum duration.\n";
            }

            // check if guests is empty
            /*if(guests == ""){
                alertMessage += "Number of guests is required.\n";
            }
            else*/ 
            // Check if guests / room, rounded up, is greater than 2
            if(Math.ceil(guests / rooms) > 2){
                let withoutInfants = guests - infants;
                if(Math.ceil(withoutInfants / rooms) > 2){
                    alertMessage += "Number of guests total (without infants) cannot exceed 2 per room.\n";
                }
            }

            if(alertMessage != ""){
                // alert("Your input has some errors:\n" + alertMessage);
                $('#output').html("Your input has some errors:<br>" + alertMessage);
                $('#output').css('color', 'red');
            } else {
                // alert("Thank you for your submission! Here is your information:\n" + "Destination: " + destination + "\nDeparture Date: " + departBetween + "\nDuration: " + minDuration + " - " + maxDuration + " days\nGuests: " + guests + "\nInfants: " + infants);
                $('#output').html("Thank you for your submission! Here is your information:<br>" + 
                    "<strong>Destination:</strong> " + destination + 
                    "<br><strong>Departure Date:</strong> " + departBetween + 
                    "<br><strong>Duration:</strong> " + minDuration + " - " + maxDuration + 
                    " days<br><strong>Adults:</strong> " + adults + 
                    "<br><strong>Children:</strong> " + children +
                    "<br><strong>Infants:</strong> " + infants);
                $('#output').css('color', 'green');
            }
        });
    }
});