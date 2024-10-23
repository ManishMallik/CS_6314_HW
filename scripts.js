function contactSubmit(){
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    var alertMessage = "";
    var alphabeticRegex = /^[a-zA-Z]+$/;
    var capitalizedRegex = /^[A-Z]/;
    var phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    // email address must contain @ and . They cannot be starting or ending characters. use regex for this
    var emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    
    // check if first name is empty
    if(fname == ""){
        alertMessage += "First name is required.\n";
    }
    // check if first name is not alphabetic only
    else if(!alphabeticRegex.test(fname)){
        alertMessage += "First name must be alphabetic only.\n";
    }
    // check if first letter of first name is capitalized
    else if(!capitalizedRegex.test(fname[0])){
        alertMessage += "First name must be capitalized.\n";
    }

    // check if last name is empty
    if(lname == ""){
        alertMessage += "Last name is required.\n";
    }
    // check if last name is not alphabetic only
    else if(!alphabeticRegex.test(lname)){
        alertMessage += "Last name must be alphabetic only.\n";
    }
    // check if first letter of last name is capitalized
    else if(!capitalizedRegex.test(lname[0])){
        alertMessage += "Last name must be capitalized.\n";
    }

    // check if first name and last name are the same (ignore case)
    if(fname.toLowerCase() == lname.toLowerCase()){
        alertMessage += "First name and last name cannot be the same.\n";
    }

    // check if phone number is empty
    if(phone == ""){
        alertMessage += "Phone number is required.\n";
    }
    // check if phone number is in the correct format
    else if(!phoneRegex.test(phone)){
        alertMessage += "Phone number must be in the format (xxx) xxx-xxxx. x must be a single digit\n";
    }

    // check if email is empty
    if(email == ""){
        alertMessage += "Email is required.\n";
    }

    console.log("Contact form submitted");
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
    const date = new Date(departure);
    const startDate = new Date("2024-09-01");
    const endDate = new Date("2024-12-01");

    return date >= startDate && date <= endDate;
}

function isValidArrival(departure, arrival) {
    const dep = new Date(departure);
    const arr = new Date(arrival);

    return arr > dep;
}


// Function to validate if the city is in Texas or California
function isValidCity(city) {
    return validCities.includes(city);
}
// Validate user inputs and display entered information
function validateAndSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form values
    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;
    let departure = document.getElementById('departure').value;
    let arrival = document.getElementById('arriving').value;
    let adults = document.getElementById('adults').value;
    let children = document.getElementById('children').value;
    let infants = document.getElementById('infants').value;

    // Validation checks
    if (!origin || !destination || !departure || adults < 1) {
        alert("Please fill in all required fields with valid values.");
        return;
    }

    // Departure date validation (between Sep 1, 2024, and Dec 1, 2024)
    if (!isValidDate(departure)) {
        alert("Departure date must be between Sep 1, 2024, and Dec 1, 2024.");
        return;
    }

    // Origin and destination validation (must be a city in Texas or California)
    if (!isValidState(origin) || !isValidState(destination)) {
        alert("Origin and Destination must be cities in Texas or California.");
        return;
    }

    // Passenger count validation (no more than 4 per category)
    if (adults > 4 || children > 4 || infants > 4) {
        alert("The number of passengers in each category (adults, children, infants) cannot exceed 4.");
        return;
    }

    if (document.getElementById('tripdropdown').value === "round-trip" && (!arrival || !isValidArrival(departure, arrival))) {
        alert("Please provide a valid return date for a round trip.");
        return;
    }

    // Display entered information
    let tripDetails = `
        <h3>Trip Details</h3>
        <ul>
            <li><strong>Origin: </strong> ${origin}</li><br>
            <li><strong>Destination: </strong> ${destination}</li><br>
            <li><strong>Departure Date: </strong> ${departure}</li><br>
            ${arrival ? `<li><strong>Return Date:</strong> ${arrival}</li>` : ""}<br>
            <li><strong>Adults:</strong> ${adults}</li><br>
            <li><strong>Children:</strong> ${children}</li><br>
            <li><strong>Infants:</strong> ${infants}</li><br>
        </ul>
    `;

    // Display the trip details in the designated div
    document.getElementById('tripDetails').innerHTML = tripDetails;
}

// Helper function to check if the city is in Texas or California
function isValidStayState(city) {
    const lowerCity = city.toLowerCase();
    return lowerCity.endsWith('tx') || lowerCity.endsWith('ca');
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

    // Validation
    if (!city || !checkIn || !checkOut || adults < 1) {
        alert("Please fill in all required fields.");
        return;
    }

    // Check if city is in Texas or California
    if (!isValidStayState(city)) {
        alert("The city must be in Texas (TX) or California (CA).");
        return;
    }

    // Validate check-in and check-out dates
    if (!isValidStayDate(checkIn) || !isValidStayDate(checkOut)) {
        alert("Check-in and check-out dates must be between Sep 1, 2024, and Dec 1, 2024.");
        return;
    }

    // Check if check-out date is after check-in date
    if (new Date(checkOut) < new Date(checkIn)) {
        alert("Check-out date must be after the check-in date.");
        return;
    }

    // Validate number of guests
    if (adults > 10 || children > 10 || infants > 5) {
        alert("Number of adults and children cannot exceed 10 each. Infants cannot exceed 5.");
        return;
    }

    // Calculate the number of rooms needed
    let roomsNeeded = calculateRooms(adults, children);

    // Display stay details
    let stayDetails = `
        <h3>Stay Details</h3>
        <ul>
            <li><strong>City:</strong> ${city}</li><br>
            <li><strong>Check-In Date:</strong> ${checkIn}</li><br>
            <li><strong>Check-Out Date:</strong> ${checkOut}</li><br>
            <li><strong>Adults:</strong> ${adults}</li><br>
            <li><strong>Children:</strong> ${children}</li><br>
            <li><strong>Infants:</strong> ${infants}</li><br>
            <li><strong>Rooms Needed:</strong> ${roomsNeeded}</li>
        </ul>
    `;

    document.getElementById('stayDetails').innerHTML = stayDetails;
}


document.addEventListener('DOMContentLoaded', () => {
    // Apply this only to the cars.html page
    if (window.location.pathname.includes('cars.html')) {
        // Dynamically create navigation links
        const pages = ["Home", "Stays", "Flights", "Cars", "Cruises", "Contact Us"];
        const navList = document.getElementById('nav-list');

        pages.forEach(page => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `${page.toLowerCase().replace(" ", "-")}.html`;
            a.textContent = page;
            li.appendChild(a);
            navList.appendChild(li);
        });

        // Add popular destinations dynamically
        const destinations = ["Dallas, TX", "Los Angeles, CA", "New York, NY"];
        const sidebar = document.getElementById('sidebar');
        const sidebarHeader = document.createElement('h2');
        sidebarHeader.textContent = "Popular Destinations";
        sidebar.appendChild(sidebarHeader);

        destinations.forEach(destination => {
            const p = document.createElement('p');
            p.textContent = destination;
            sidebar.appendChild(p);
        });

        // Add footer text dynamically
        const footerText = document.getElementById('footer-text');
        footerText.textContent = "© 2024 Traveling Inc. All rights reserved.";
    }

    if (window.location.pathname.includes('flights.html')) {
        // Dynamically create navigation links
        const pages = ["Home", "Stays", "Flights", "Cars", "Cruises", "Contact Us"];
        const navList = document.getElementById('nav-list');

        pages.forEach(page => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `${page.toLowerCase().replace(" ", "-")}.html`;
            a.textContent = page;
            li.appendChild(a);
            navList.appendChild(li);
        });

        // Add popular destinations dynamically
        const destinations = ["Dallas, TX", "Los Angeles, CA", "New York, NY"];
        const sidebar = document.getElementById('sidebar');
        const sidebarHeader = document.createElement('h2');
        sidebarHeader.textContent = "Popular Destinations";
        sidebar.appendChild(sidebarHeader);

        destinations.forEach(destination => {
            const p = document.createElement('p');
            p.textContent = destination;
            sidebar.appendChild(p);
        });

        // Add footer text dynamically
        const footerText = document.getElementById('footer-text');
        footerText.textContent = "© 2024 Traveling Inc. All rights reserved.";
    }

    if (window.location.pathname.includes('stays.html')) {
        const form = document.getElementById('stayForm');
        form.addEventListener('submit', validateAndSubmitStay);
        // Dynamically create navigation links
        const pages = ["Home", "Stays", "Flights", "Cars", "Cruises", "Contact Us"];
        const navList = document.getElementById('nav-list');

        pages.forEach(page => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `${page.toLowerCase().replace(" ", "-")}.html`;
            a.textContent = page;
            li.appendChild(a);
            navList.appendChild(li);
        });

        // Add popular destinations dynamically
        const destinations = ["Dallas, TX", "Los Angeles, CA", "New York, NY"];
        const sidebar = document.getElementById('sidebar');
        const sidebarHeader = document.createElement('h2');
        sidebarHeader.textContent = "Popular Destinations";
        sidebar.appendChild(sidebarHeader);

        destinations.forEach(destination => {
            const p = document.createElement('p');
            p.textContent = destination;
            sidebar.appendChild(p);
        });

        // Add footer text dynamically
        const footerText = document.getElementById('footer-text');
        footerText.textContent = "© 2024 Traveling Inc. All rights reserved.";
    }
});