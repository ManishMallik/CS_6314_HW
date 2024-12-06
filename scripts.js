// const { response } = require("express");

let loggedInUser = null;

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

    if(!loggedInUser.loggedIn){
        document.getElementById("contact-output").innerHTML = "Please login to submit a contact form.";
        document.getElementById("contact-output").style.color = "red";
        return;
    }
    // const fname = document.getElementById("fname").value;
    // const lname = document.getElementById("lname").value;
    // const phone = document.getElementById("phone").value;
    // const email = document.getElementById("email").value;
    // const gender = document.querySelector('input[name=gender]:checked').value;
    const comment = document.getElementById("comment").value;

    var alertMessage = "";
    // var alphabeticRegex = /^[a-zA-Z]+$/;
    // var capitalizedRegex = /^[A-Z]/;
    // var phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    var commentRegex = /^.{10,}$/;

    // // email address must contain @ and . They cannot be starting or ending characters. use regex for this
    // var emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    // // check if first name is empty
    // if(fname == ""){
    //     alertMessage += "First name is required.<br>";
    // }
    // // check if first name is not alphabetic only
    // else if(!alphabeticRegex.test(fname)){
    //     alertMessage += "First name must be alphabetic only.<br>";
    // }
    // // check if first letter of first name is capitalized
    // else if(!capitalizedRegex.test(fname[0])){
    //     alertMessage += "First name must be capitalized.<br>";
    // }

    // // check if last name is empty
    // if(lname == ""){
    //     alertMessage += "Last name is required.<br>";
    // }
    // // check if last name is not alphabetic only
    // else if(!alphabeticRegex.test(lname)){
    //     alertMessage += "Last name must be alphabetic only.<br>";
    // }
    // // check if first letter of last name is capitalized
    // else if(!capitalizedRegex.test(lname[0])){
    //     alertMessage += "Last name must be capitalized.<br>";
    // }

    // // check if first name and last name are the same (ignore case)
    // if(fname.toLowerCase() == lname.toLowerCase()){
    //     alertMessage += "First name and last name cannot be the same.<br>";
    // }

    // // check if phone number is empty
    // if(phone == ""){
    //     alertMessage += "Phone number is required.<br>";
    // }
    // // check if phone number is in the correct format
    // else if(!phoneRegex.test(phone)){
    //     alertMessage += "Phone number must be in the format (xxx) xxx-xxxx. Note that there is a space between ) and x. Each x must be a single digit.<br>";
    // }

    // // check if email is empty
    // if(email == ""){
    //     alertMessage += "Email is required.<br>";
    // }
    // // check if email is in the correct format
    // else if(!emailRegex.test(email)){
    //     alertMessage += "Email must be in correct format. Make sure you have an \"@\" and \".\" in your input (neither as first nor last characters).<br>";
    // }

    // if(gender == undefined){
    //     alertMessage += "Gender is required.<br>";
    // }

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

        const fname = loggedInUser.firstName;
        const lname = loggedInUser.lastName;
        const phone = loggedInUser.phone;
        const email = loggedInUser.email;
        const dob = loggedInUser.dob;
        const gender = loggedInUser.gender;
        document.getElementById("contact-output").innerHTML = "<h3>Thank you for your submission! Here are your submission details:</h3>" + 
        "<strong>First Name:</strong> " + fname + 
        "<br><strong>Last Name:</strong> " + lname + 
        "<br><strong>Phone:</strong> " + phone + 
        "<br><strong>DOB:</strong> " + dob +
        "<br><strong>Email:</strong> " + email + 
        "<br><strong>Gender:</strong> " + gender + 
        "<br><strong>Comment:</strong> " + comment;
        document.getElementById("contact-output").style.color = "green";

        const data = new URLSearchParams();
        data.append("fname", fname);
        data.append("lname", lname);
        data.append("phone", phone);
        data.append("dob", dob);
        data.append("email", email);
        data.append("gender", gender);
        data.append("comment", comment);

        fetch('submit-contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then(response => response.text())
        .then(responseText => {
            if(responseText == "success"){
                document.getElementById("contact-output").innerHTML += "<br>Inserted Successfully!";
                document.getElementById("contact-output").style.color = "green";
            } else {
                document.getElementById("contact-output").innerHTML += "<br>Error submitting form";
                document.getElementById("contact-output").style.color = "red";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("contact-output").innerHTML += "<br>Error submitting form";
            document.getElementById("contact-output").style.color = "red";
        });
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

        arrival.value = ""; // Hide arrival date for one-way
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

    if(!loggedInUser.loggedIn){
        document.getElementById('tripDetails').innerHTML = "Please login to book a trip.";
        document.getElementById('tripDetails').style.color = "red";
        return;
    }

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
        errors += "Make sure the number of passengers in each category (adults, children, infants) are not negative and cannot exceed 4. Also, make sure there is at least 1 adult.<br>";
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

    let returnDate = arrival ? arrival : null;

    // Read from the availableFlights.xml file
    searchAvailableFlights(origin, destination, departure, arrival, parseInt(adults) + parseInt(children) + parseInt(infants), adults, children, infants);
}
function searchAvailableFlights(origin, destination, departureDate, returnDate = null, seatsNeeded, adults, children, infants) {
    // fetch('./availableFlights.xml')
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.text();
    //     })
    console.log(returnDate);
    fetch('flights.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            origin: origin,
            destination: destination,
            departure: departureDate,
            return: returnDate,
            total_passengers: parseInt(adults) + parseInt(children) + parseInt(infants)
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        // .then(text => {
        //     console.log(text); // Log the raw response to identify the issue
        //     return JSON.parse(text); // Parse the JSON if it's valid
        // })
        .then(data => {
            // const parser = new DOMParser();
            // const xmlDoc = parser.parseFromString(data, "text/xml");
            // const flights = xmlDoc.getElementsByTagName("flight");
            // const availableFlightsExact = Array.from(flights).filter(flight => {
            //     // Make sure the origin, destination, and available seats match the user's input
            //     const flightOrigin = flight.getElementsByTagName("origin")[0].textContent;
            //     const flightDestination = flight.getElementsByTagName("destination")[0].textContent;
            //     const flightSeats = parseInt(flight.getElementsByTagName("availableseats")[0].textContent);
            //     const departureDateObj = new Date(flight.getElementsByTagName("departuredate")[0].textContent);
            //     const inputDepartureDateObj = new Date(departureDate);
            //     // const returnDateObj = returnDate ? new Date(flight.getElementsByTagName("returnDate")[0].textContent) : null;

            //     return (
            //         flightOrigin === origin &&
            //         flightDestination === destination &&
            //         flightSeats >= seatsNeeded &&
            //         departureDateObj.getTime() === inputDepartureDateObj.getTime() //&&
            //         // (!returnDate || returnDateObj.getTime() === returnDate.getTime())
            //     );

            // });

            let availableFlights = data.departureFlights;
            console.log(data);

            // If no exact match is found, consider 1, 2, or 3 days before and/or after the departure date
            // if (availableFlights.length === 0) {
            //     const departureDateObj = new Date(departureDate);
            //     const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            //     const twoDays = 2 * oneDay;
            //     const threeDays = 3 * oneDay;
            //     const possibleDates = [departureDateObj, new Date(departureDateObj.getTime() + oneDay), new Date(departureDateObj.getTime() + twoDays), new Date(departureDateObj.getTime() + threeDays), new Date(departureDateObj.getTime() - oneDay), new Date(departureDateObj.getTime() - twoDays), new Date(departureDateObj.getTime() - threeDays)];
            //     const availableFlightsClose = Array.from(flights).filter(flight => {
            //         const flightOrigin = flight.getElementsByTagName("origin")[0].textContent;
            //         const flightDestination = flight.getElementsByTagName("destination")[0].textContent;
            //         const flightSeats = parseInt(flight.getElementsByTagName("availableseats")[0].textContent);
            //         const departureDateObj = new Date(flight.getElementsByTagName("departuredate")[0].textContent);
            //         const inputDepartureDateObj = new Date(departureDate);
            //         // const returnDateObj = returnDate ? new Date(flight.getElementsByTagName("returnDate")[0].textContent) : null;

            //         return (
            //             flightOrigin === origin &&
            //             flightDestination === destination &&
            //             flightSeats >= seatsNeeded &&
            //             possibleDates.some(date => date.getTime() === departureDateObj.getTime()) //&&
            //             // (!returnDate || returnDateObj.getTime() === returnDate.getTime())
            //         );
            //     });
            //     availableFlights = availableFlightsClose;
            // }

            let availableReturnFlights = [];
            
            // If there is a return date, check if there are flights available for the return date. Destination becomes origin and vice versa
            if (returnDate) {
                // const availableReturn = Array.from(flights).filter(flight => {
                //     const flightOrigin = flight.getElementsByTagName("origin")[0].textContent;
                //     const flightDestination = flight.getElementsByTagName("destination")[0].textContent;
                //     const flightSeats = parseInt(flight.getElementsByTagName("availableseats")[0].textContent);
                //     const departureDateObj = new Date(flight.getElementsByTagName("departuredate")[0].textContent);
                //     const inputDepartureDateObj = new Date(returnDate);
                //     // const returnDateObj = returnDate ? new Date(flight.getElementsByTagName("returnDate")[0].textContent) : null;

                //     return (
                //         flightOrigin === destination &&
                //         flightDestination === origin &&
                //         flightSeats >= seatsNeeded &&
                //         departureDateObj.getTime() === inputDepartureDateObj.getTime() //&&
                //         // (!returnDate || returnDateObj.getTime() === returnDate.getTime())
                //     );
                // });
                availableReturnFlights = data.returnFlights;

                // if (availableReturnFlights.length === 0) {
                //     const departureDateObj = new Date(returnDate);
                //     const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                //     const twoDays = 2 * oneDay;
                //     const threeDays = 3 * oneDay;
                //     const possibleDates = [departureDateObj, new Date(departureDateObj.getTime() + oneDay), new Date(departureDateObj.getTime() + twoDays), new Date(departureDateObj.getTime() + threeDays), new Date(departureDateObj.getTime() - oneDay), new Date(departureDateObj.getTime() - twoDays), new Date(departureDateObj.getTime() - threeDays)];
                //     const availableReturnClose = Array.from(flights).filter(flight => {
                //         const flightOrigin = flight.getElementsByTagName("origin")[0].textContent;
                //         const flightDestination = flight.getElementsByTagName("destination")[0].textContent;
                //         const flightSeats = parseInt(flight.getElementsByTagName("availableseats")[0].textContent);
                //         const departureDateObj = new Date(flight.getElementsByTagName("departuredate")[0].textContent);
                //         const inputDepartureDateObj = new Date(returnDate);
                //         // const returnDateObj = returnDate ? new Date(flight.getElementsByTagName("returnDate")[0].textContent) : null;

                //         return (
                //             flightOrigin === destination &&
                //             flightDestination === origin &&
                //             flightSeats >= seatsNeeded &&
                //             possibleDates.some(date => date.getTime() === departureDateObj.getTime()) //&&
                //             // (!returnDate || returnDateObj.getTime() === returnDate.getTime())
                //         );
                //     });
                //     availableReturnFlights = availableReturnClose;
                // }
            }

            let flightDetails = "<h3>Available Flights:</h3>";
            if (availableFlights.length > 0) {
                if(returnDate) {
                    if(availableReturnFlights.length > 0){
                        availableFlights.forEach(flight => {
                            availableReturnFlights.forEach(returnFlight => {
                                // const flightId = flight.getElementsByTagName("flightid")[0].textContent;
                                // const origin = flight.getElementsByTagName("origin")[0].textContent;
                                // const destination = flight.getElementsByTagName("destination")[0].textContent;
                                // const departureDate = flight.getElementsByTagName("departuredate")[0].textContent;
                                // const arrivalDate = flight.getElementsByTagName("arrivaldate")[0].textContent;
                                // const departureTime = flight.getElementsByTagName("departuretime")[0].textContent;
                                // const arrivalTime = flight.getElementsByTagName("arrivaltime")[0].textContent;
                                // const availableSeats = parseInt(flight.getElementsByTagName("availableseats")[0].textContent);
                                // const price = parseFloat(flight.getElementsByTagName("price")[0].textContent);
                                // const totalPrice = price * adults + price * 0.7 * children + price * 0.1 * infants;
                                // const returnFlightId = returnFlight.getElementsByTagName("flightid")[0].textContent;
                                // const returnDepartureDate = returnFlight.getElementsByTagName("departuredate")[0].textContent;
                                // const returnArrivalDate = returnFlight.getElementsByTagName("arrivaldate")[0].textContent;
                                // const returnDepartureTime = returnFlight.getElementsByTagName("departuretime")[0].textContent;
                                // const returnArrivalTime = returnFlight.getElementsByTagName("arrivaltime")[0].textContent;
                                // const returnAvailableSeats = parseInt(returnFlight.getElementsByTagName("availableseats")[0].textContent);
                                // const returnPrice = parseFloat(returnFlight.getElementsByTagName("price")[0].textContent);
                                const flightId = flight.flight_id;
                                const origin = flight.origin;
                                const destination = flight.destination;
                                const departureDate = flight.departure_date;
                                const arrivalDate = flight.arrival_date;
                                const departureTime = flight.departure_time;
                                const arrivalTime = flight.arrival_time;
                                const availableSeats = flight.available_seats;
                                const price = flight.price;
                                const totalPrice = price * adults + price * 0.7 * children + price * 0.1 * infants;
                                const returnFlightId = returnFlight.flight_id;
                                const returnDepartureDate = returnFlight.departure_date;
                                const returnArrivalDate = returnFlight.arrival_date;
                                const returnDepartureTime = returnFlight.departure_time;
                                const returnArrivalTime = returnFlight.arrival_time;
                                const returnAvailableSeats = returnFlight.available_seats;
                                const returnPrice = returnFlight.price;
                                const totalReturnPrice = returnPrice * adults + returnPrice * 0.7 * children + returnPrice * 0.1 * infants;
                                flightDetails += `
                                    <h4>Departing Flight:</h4>
                                    <strong>Departing Flight ID:</strong> ${flightId}<br>
                                    <strong>Origin:</strong> ${origin}<br>
                                    <strong>Destination:</strong> ${origin}<br>
                                    <strong>Departure Date:</strong> ${departureDate}<br>
                                    <strong>Arrival Date:</strong> ${arrivalDate}<br>
                                    <strong>Departure Time:</strong> ${departureTime}<br>
                                    <strong>Arrival Time:</strong> ${arrivalTime}<br>
                                    <strong>Available Seats:</strong> ${availableSeats}<br>
                                    <strong>Price Per Seat:</strong> $${price}<br>
                                    <strong>Total Price (Computed):</strong> $${totalPrice}<br>
                                    <h4>Returning Flight:</h4>
                                    <strong>Returning Flight ID:</strong> ${returnFlightId}<br>
                                    <strong>Origin:</strong> ${destination}<br>
                                    <strong>Destination:</strong> ${origin}<br>
                                    <strong>Departure Date:</strong> ${returnDepartureDate}<br>
                                    <strong>Arrival Date:</strong> ${returnArrivalDate}<br>
                                    <strong>Departure Time:</strong> ${returnDepartureTime}<br>
                                    <strong>Arrival Time:</strong> ${returnArrivalTime}<br>
                                    <strong>Available Seats:</strong> ${returnAvailableSeats}<br>
                                    <strong>Price Per Seat:</strong> $${returnPrice}<br>
                                    <strong>Total Price (Computed):</strong> $${totalReturnPrice}<br>
                                    <button type="submit" onclick="addRoundTripToCart('${flightId}', '${returnFlightId}', '${origin}', '${destination}', '${departureDate}', '${arrivalDate}', '${departureTime}', '${arrivalTime}', ${totalPrice}, '${returnDepartureDate}', '${returnArrivalDate}', '${returnDepartureTime}', '${returnArrivalTime}', ${seatsNeeded}, ${price}, ${returnPrice}, ${totalReturnPrice}, ${adults}, ${children}, ${infants})">Add to Cart</button>
                                    <br><br>
                                `;
                            });
                        });
                    } else {
                        flightDetails += "<p>No round trip flights available matching your criteria.</p>";
                    }
                }
                else{
                    availableFlights.forEach(flight => {
                        // const flightId = flight.getElementsByTagName("flightid")[0].textContent;
                        // const origin = flight.getElementsByTagName("origin")[0].textContent;
                        // const destination = flight.getElementsByTagName("destination")[0].textContent;
                        // const departureDate = flight.getElementsByTagName("departuredate")[0].textContent;
                        // const arrivalDate = flight.getElementsByTagName("arrivaldate")[0].textContent;
                        // const departureTime = flight.getElementsByTagName("departuretime")[0].textContent;
                        // const arrivalTime = flight.getElementsByTagName("arrivaltime")[0].textContent;
                        // const availableSeats = parseInt(flight.getElementsByTagName("availableseats")[0].textContent);
                        // const price = parseFloat(flight.getElementsByTagName("price")[0].textContent);
                        // const totalPrice = price * adults + price * 0.7 * children + price * 0.1 * infants;
                        const flightId = flight.flight_id;
                        const origin = flight.origin;
                        const destination = flight.destination;
                        const departureDate = flight.departure_date;
                        const arrivalDate = flight.arrival_date;
                        const departureTime = flight.departure_time;
                        const arrivalTime = flight.arrival_time;
                        const availableSeats = flight.available_seats;
                        const price = flight.price;
                        const totalPrice = price * adults + price * 0.7 * children + price * 0.1 * infants;
                        flightDetails += `
                            <strong>Flight ID:</strong> ${flightId}<br>
                            <strong>Origin:</strong> ${origin}<br>
                            <strong>Destination:</strong> ${destination}<br>
                            <strong>Departure Date:</strong> ${departureDate}<br>
                            <strong>Arrival Date:</strong> ${arrivalDate}<br>
                            <strong>Departure Time:</strong> ${departureTime}<br>
                            <strong>Arrival Time:</strong> ${arrivalTime}<br>
                            <strong>Available Seats:</strong> ${availableSeats}<br>
                            <strong>Price Per Seat:</strong> $${price}<br>
                            <strong>Total Price (Computed):</strong> $${totalPrice}<br>
                            <button type="submit" onclick="addFlightToCart('${flightId}', '${origin}', '${destination}', '${departureDate}', '${arrivalDate}', '${departureTime}', '${arrivalTime}', ${seatsNeeded}, ${price}, ${totalPrice}, ${adults}, ${children}, ${infants})">Add to Cart</button>
                            <br><br>
                        `;
                    });
                }
            } else {
                flightDetails += "<p>No flights available matching your criteria.</p>";
            }

            document.getElementById('flightDetails').innerHTML = flightDetails;
            document.getElementById('flightDetails').style.color = "green";
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('flightDetails').innerHTML = "Error fetching flight data";
            document.getElementById('flightDetails').style.color = "red";
        });
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

    if(!loggedInUser.loggedIn){
        document.getElementById('stayDetails').innerHTML = "Please login to book a stay.";
        document.getElementById('stayDetails').style.color = "red";
        return;
    }

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

    // if (!city || adults < 1) {
    //     errors += "Please fill in all of the fields.<br>";
    // }

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

    // Read from the availableHotels.json file
    // fetch('./availableHotels.json')
    //     .then(response =>  {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    fetch('stays.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            city: city,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok at all');
        }
        return response.json();
    })
    // .then(text => {
    //     console.log(text); // Log the raw response to identify the issue
    //     return JSON.parse(text); // Parse the JSON if it's valid
    // })
        .then(data => {
            const availableHotels = data.hotels;
            console.log(data);
            console.log(availableHotels);
            // let availableHotels = hotels.filter(hotel => hotel.city == city);

            // If available hotels is not empty, then filter by availability, checking if any of the dates are within range
            // if (availableHotels.length > 0) {
            //     availableHotels = availableHotels.filter(hotel => {
            //         if(hotel.availableRooms >= roomsNeeded)
            //         {
            //             return hotel.availability.some(availability => {
            //                 const startDate = new Date(availability.startDate);
            //                 const endDate = new Date(availability.endDate);
            //                 const checkInDate = new Date(checkIn);
            //                 const checkOutDate = new Date(checkOut);
            //                 return checkInDate >= startDate && checkOutDate <= endDate;
            //             });
            //         }
            //     });
            // }

            let hotelDetails = "<h3>Available Hotels:</h3>";
            if (availableHotels.length === 0) {
                hotelDetails += "<p>No hotels available matching your criteria.</p>";
            } else {
                availableHotels.forEach(hotel => {
                    // calculate the number of days between check-in and check-out dates
                    const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
                    hotelDetails += `
                        <strong>Hotel ID:</strong> ${hotel.hotel_id}<br>
                        <strong>Name:</strong> ${hotel.hotel_name}<br>
                        <strong>City:</strong> ${hotel.city}<br>
                        <strong>Check-In Date:</strong> ${checkIn}<br>
                        <strong>Check-Out Date:</strong> ${checkOut}<br>
                        <strong>Price Per Night For Each Room:</strong> $${hotel.price}<br>
                        <strong>Total Price (Computed):</strong> $${hotel.price * diffTime * roomsNeeded}<br>
                    `;
                    // hotelDetails += `
                    //     <strong>Hotel ID:</strong> ${hotel.hotelId}<br>
                    //     <strong>Name:</strong> ${hotel.name}<br>
                    //     <strong>City:</strong> ${hotel.city}<br>
                    //     <strong>Rooms Available:</strong> ${hotel.availableRooms}<br>
                    //     <strong>Check-In Date:</strong> ${checkIn}<br>
                    //     <strong>Check-Out Date:</strong> ${checkOut}<br>
                    //     <strong>Price Per Night For Each Room:</strong> $${hotel.pricePerNight}<br>
                    //     <strong>Total Price (Computed):</strong> $${hotel.pricePerNight * diffTime * roomsNeeded}<br>
                    // `;
                    hotelDetails += `<button type="submit" onclick="addHotelToCart('${hotel.hotel_id}', '${hotel.hotel_name}', '${hotel.city}', ${adults}, ${children}, ${infants}, '${checkIn}', '${checkOut}', ${roomsNeeded}, ${hotel.price}, ${hotel.price * diffTime * roomsNeeded})">Add to Cart</button>`;
                    hotelDetails += "<br>";
                });
            }
            document.getElementById('hotelDetails').innerHTML = hotelDetails;
            document.getElementById('hotelDetails').style.color = "green";
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('hotelDetails').innerHTML = "Error fetching hotel data";
            document.getElementById('hotelDetails').style.color = "red";
        });
}

function addHotelToCart(hotelId, name, city, adultGuests, childGuests, infantGuests, checkIn, checkOut, rooms, pricePerNight, totalPrice) {
    if (confirm("Are you sure you want to book this hotel with the following details:\n" + "Hotel ID: " + hotelId + "\nName: " + name + "\nCity: " + city + "\nAdults: " + adultGuests + "\nChildren: " + childGuests + "\nInfants: " + infantGuests + "\nCheck-In Date: " + checkIn + "\nCheck-Out Date: " + checkOut + "\nRooms: " + rooms + "\nPrice Per Night: $" + pricePerNight + "\nTotal Price: $" + totalPrice + "\n\nPress OK to confirm.")) {
        
        const data = new URLSearchParams();
        data.append("hotelId", hotelId);
        data.append("name", name);
        data.append("city", city);
        data.append("adultGuests", adultGuests);
        data.append("childGuests", childGuests);
        data.append("infantGuests", infantGuests);
        data.append("checkIn", checkIn);
        data.append("checkOut", checkOut);
        data.append("rooms", rooms);
        data.append("pricePerNight", pricePerNight);
        data.append("totalPrice", totalPrice);

        // Book the hotel
        fetch('save_hotel_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(responseText => {
                console.log(responseText);
                alert("Hotel booked successfully!");
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error booking flight!");
            });
        
        // Update the available rooms in the availableHotels.json file
        // fetch('./availableHotels.json')
        //     .then(response =>  {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         const hotels = data.hotels;
        //         let availableHotels = hotels.filter(hotel => hotel.hotelId == hotelId);
        //         availableHotels[0].availableRooms -= rooms;
        //         console.log(availableHotels[0].availableRooms);
                
        //         // Update the availableHotels.json file
        //         const updatedData = { hotels: hotels };
        //         console.log(updatedData);
        //         console.log(JSON.stringify(updatedData));
        //         fetch('/update-available-hotels', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(updatedData)
        //         })
        //             .then(response => {
        //                 if (!response.ok) {
        //                     throw new Error('Network response was not ok');
        //                 }
        //                 return response.text();
        //             })
        //             .then(responseText => {
        //                 console.log(responseText);
        //                 window.location.reload();
        //             })
        //             .catch(error => {
        //                 console.error('Error:', error);
        //             });
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
    }
}

function removeHotelFromCart(hotelId, name, city, adultGuests, childGuests, infantGuests, checkIn, checkOut, rooms, pricePerNight, totalPrice){
    if (confirm("Are you sure you want to remove this hotel from your cart?")) {
        const data = new URLSearchParams();
        data.append("hotelId", hotelId);
        data.append("name", name);
        data.append("city", city);
        data.append("adultGuests", adultGuests);
        data.append("childGuests", childGuests);
        data.append("infantGuests", infantGuests);
        data.append("checkIn", checkIn);
        data.append("checkOut", checkOut);
        data.append("rooms", rooms);
        data.append("pricePerNight", pricePerNight);
        data.append("totalPrice", totalPrice);

        fetch('remove_hotel_from_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(responseText => {
                console.log(responseText);
                alert("Hotel removed successfully!");
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error removing hotel!");
            });
        

        // Update the available rooms in the availableHotels.json file
        // fetch('./availableHotels.json')
        //     .then(response =>  {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         const hotels = data.hotels;
        //         let availableHotels = hotels.filter(hotel => hotel.hotelId == hotelId);
        //         availableHotels[0].availableRooms += rooms;
        //         console.log(availableHotels[0].availableRooms);
                
        //         // Update the availableHotels.json file
        //         const updatedData = { hotels: hotels };
        //         console.log(updatedData);
        //         console.log(JSON.stringify(updatedData));
        //         fetch('/update-available-hotels', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(updatedData)
        //         })
        //             .then(response => {
        //                 if (!response.ok) {
        //                     throw new Error('Network response was not ok');
        //                 }
        //                 return response.text();
        //             })
        //             .then(responseText => {
        //                 console.log(responseText);
        //                 window.location.reload();
        //             })
        //             .catch(error => {
        //                 console.error('Error:', error);
        //             });
        //     })
    }
}

function bookAllHotelsFromCart(){
    if (confirm("Are you sure you want to book all hotels in your cart?")) {
        fetch('/confirm-booking-hotel', {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(responseText => {
            console.log(responseText);
            alert("All hotels booked successfully!");
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error booking hotels!");
        });
    }
}

function addRoundTripToCart(flightId, returnFlightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, totalPrice, returnDepartureDate, returnArrivalDate, returnDepartureTime, returnArrivalTime, seatsNeeded, pricePerSeat, pricePerSeatReturn, returnTotalPrice, adults, children, infants) {
    // Here's how this function works
    // When booking a round trip, that means we will add two flights to the cart: one for the departure and one for the return
    // The user will be prompted to confirm booking both flights
    // If the user confirms, both flights will be added to the cart
    // If the user cancels, nothing will be added to the cart
    
    // Prevent page refresh
    // event.preventDefault();

    if (confirm("Are you sure you want to book this round trip with the following details:\n" +
        "Departure Flight Details:" +
        "\nFlight ID: " + flightId +
        "\nOrigin: " + origin +
        "\nDestination: " + destination +
        "\nDeparture Date: " + departureDate +
        "\nArrival Date: " + arrivalDate +
        "\nDeparture Time: " + departureTime +
        "\nArrival Time: " + arrivalTime +
        "\nSeats Needed: " + seatsNeeded +
        "\nPrice Per Seat: $" + pricePerSeat +
        "\nTotal Price: $" + totalPrice +
        "\n\nReturn Flight Details:" +
        "\nFlight ID: " + returnFlightId +
        "\nOrigin: " + origin +
        "\nDestination: " + destination +
        "\nDeparture Date: " + returnDepartureDate +
        "\nArrival Date: " + returnArrivalDate +
        "\nDeparture Time: " + returnDepartureTime +
        "\nArrival Time: " + returnArrivalTime +
        "\nSeats Needed: " + seatsNeeded +
        "\nPrice Per Seat: $" + pricePerSeatReturn +
        "\nTotal Price: $" + returnTotalPrice +
        "\nAdults: " + adults +
        "\nChildren: " + children +
        "\nInfants: " + infants +
        "\n\nPress OK to confirm.")) {
        // Store it 2 JSON files: one for the departure flight and one for the return flight
        // Generate a random unique booking number, between 1000 and 9999
        let bookingNumber = generateBookingNumber();
        const data = {
            bookingNumber: bookingNumber,
            flightId: flightId,
            origin: origin,
            destination: destination,
            departureDate: departureDate,
            arrivalDate: arrivalDate,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            seatsNeeded: seatsNeeded,
            pricePerSeat: pricePerSeat,
            totalPrice: totalPrice,
            adults: adults,
            children: children,
            infants: infants
        };

        const returnData = {
            bookingNumber: bookingNumber,
            flightId: returnFlightId,
            origin: destination,
            destination: origin,
            departureDate: returnDepartureDate,
            arrivalDate: returnArrivalDate,
            departureTime: returnDepartureTime,
            arrivalTime: returnArrivalTime,
            seatsNeeded: seatsNeeded,
            pricePerSeat: pricePerSeatReturn,
            totalPrice: returnTotalPrice,
            adults: adults,
            children: children,
            infants: infants
        };

        // Book the departure flight
        fetch('save_flight_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(responseText => {
                console.log(responseText);
                alert("Departure flight booked successfully!");
                // Book the return flight
                fetch('save_flight_to_cart.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(returnData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(responseText => {
                        console.log(responseText);
                        alert("Return flight booked successfully!");
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert("Error booking return flight!");
                    });
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error booking departure flight!");
            });

        // fetch('/book-flight-to-cart', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.text();
        //     })
        //     .then(responseText => {
        //         console.log(responseText);
        //         alert("Departure flight booked successfully!");
        //         // Book the return flight
        //         fetch('/book-flight-to-cart', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(returnData)
        //         })
        //             .then(response => {
        //                 if (!response.ok) {
        //                     throw new Error('Network response was not ok');
        //                 }
        //                 return response.text();
        //             })
        //             .then(responseText => {
        //                 console.log(responseText);
        //                 alert("Return flight booked successfully!");
        //                 // Update available seats in the `availableFlights.xml` file
        //                 fetch('./availableFlights.xml')
        //                     .then(response => {
        //                         if (!response.ok) {
        //                             throw new Error('Network response was not ok');
        //                         }
        //                         return response.text();
        //                     })
        //                     .then(data => {
        //                         const parser = new DOMParser();
        //                         const xmlDoc = parser.parseFromString(data, "text/xml");
        //                         const flights = xmlDoc.getElementsByTagName("flight");
        //                         let selectedFlight = Array.from(flights).find(flight => flight.getElementsByTagName("flightid")[0].textContent === flightId);
        //                         if (selectedFlight) {
        //                             selectedFlight.getElementsByTagName("availableseats")[0].textContent -= seatsNeeded;
        //                             console.log(`Updated seats: ${selectedFlight.getElementsByTagName("availableseats")[0].textContent}`);
        //                         }
                                
        //                         let selectedReturnFlight = Array.from(flights).find(flight => flight.getElementsByTagName("flightid")[0].textContent === returnFlightId);
        //                         if (selectedReturnFlight) {
        //                             selectedReturnFlight.getElementsByTagName("availableseats")[0].textContent -= seatsNeeded;
        //                             console.log(`Updated seats: ${selectedReturnFlight.getElementsByTagName("availableseats")[0].textContent}`);
        //                         }

        //                         // Update the availableFlights.xml file
        //                         const updatedData = new XMLSerializer().serializeToString(xmlDoc);
        //                         fetch('/update-available-flights', {
        //                             method: 'POST',
        //                             headers: {
        //                                 'Content-Type': 'application/xml'
        //                                 // 'Content-Type': 'application/x-www-form-urlencoded'
        //                             },
        //                             body: updatedData
        //                         })
        //                         .then(response => {
        //                             if (!response.ok) {
        //                                 throw new Error('Network response was not ok');
        //                             }
        //                             return response.text();
        //                         })
        //                         .then(responseText => {
        //                             console.log(responseText);
        //                             window.location.reload();
        //                         })
        //                         .catch(error => {
        //                             console.error('Error updating flight data:', error);
        //                         });
        //                     })
        //                     .catch(error => {
        //                         console.error('Error:', error);
        //                     });

        //             })
        //             .catch(error => {
        //                 console.error('Error:', error);
        //                 alert("Error booking return flight!");
        //             });
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         alert("Error booking departure flight!");
        //     });
    }
}

function addFlightToCart(flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice, adults, children, infants) {
    if (confirm("Are you sure you want to book this flight with the following details:\n" + 
                "Flight ID: " + flightId + 
                "\nOrigin: " + origin + 
                "\nDestination: " + destination + 
                "\nDeparture Date: " + departureDate + 
                "\nArrival Date: " + arrivalDate + 
                "\nDeparture Time: " + departureTime + 
                "\nArrival Time: " + arrivalTime + 
                "\nSeats Needed: " + seatsNeeded + 
                "\nPrice Per Seat: $" + pricePerSeat + 
                "\nTotal Price: $" + totalPrice + 
                "\nAdults: " + adults +
                "\nChildren: " + children +
                "\nInfants: " + infants +
                "\n\nPress OK to confirm.")) {

        // Store it in JSON format
        
        // Generate a random unique booking number, between 1000 and 9999
        let bookingNumber = generateBookingNumber();
        const data = {
            bookingNumber: bookingNumber,
            flightId: flightId,
            origin: origin,
            destination: destination,
            departureDate: departureDate,
            arrivalDate: arrivalDate,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            seatsNeeded: seatsNeeded,
            pricePerSeat: pricePerSeat,
            totalPrice: totalPrice,
            adults: adults,
            children: children,
            infants: infants
        };


        // Book the flight
        fetch('save_flight_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(responseText => {
            console.log(responseText);
            alert("Flight booked successfully!");
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error booking flight!");
        });

        // Update available seats in the `availableFlights.xml` file
        // fetch('./availableFlights.xml')
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.text();
        //     })
        //     .then(data => {
        //         const parser = new DOMParser();
        //         const xmlDoc = parser.parseFromString(data, "text/xml");
        //         const flights = xmlDoc.getElementsByTagName("flight");
        //         let selectedFlight = Array.from(flights).find(flight => flight.getElementsByTagName("flightid")[0].textContent === flightId);
        //         if (selectedFlight) {
        //             selectedFlight.getElementsByTagName("availableseats")[0].textContent -= seatsNeeded;
        //             console.log(`Updated seats: ${selectedFlight.getElementsByTagName("availableseats")[0].textContent}`);
        //         }

        //         // Update the availableFlights.xml file
        //         const updatedData = new XMLSerializer().serializeToString(xmlDoc);
        //         fetch('/update-available-flights', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/xml'
        //                 // 'Content-Type': 'application/x-www-form-urlencoded'
        //             },
        //             body: updatedData
        //         })
        //         .then(response => {
        //             if (!response.ok) {
        //                 throw new Error('Network response was not ok');
        //             }
        //             return response.text();
        //         })
        //         .then(responseText => {
        //             console.log(responseText);
        //             window.location.reload();
        //         })
        //         .catch(error => {
        //             console.error('Error updating flight data:', error);
        //         });
        //     });

    }
}

function generateBookingNumber() {
    // Generate a random unique booking number, between 1000 and 9999
    let bookingNumber = Math.floor(Math.random() * 9000) + 1000;
        
    // Read from flightCart.json
    let existingBookingNumbers = [];
    fetch('./flightCart.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const flights = data.flights;
            const existingBookNumbers = flights.map(flight => flight.bookingNumber);
            existingBookingNumbers = existingBookNumbers;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Read from confirmedFlights.json
    fetch('./confirmedFlights.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const flights = data.bookedFlights;
            const existingBookNumbers = flights.map(flight => flight.bookingNumber);
            existingBookingNumbers = existingBookingNumbers.concat(existingBookNumbers);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        while (existingBookingNumbers.includes(bookingNumber)) {
            // Check if the booking number already exists in the cart
            // If it does, generate a new booking number
            // If it doesn't, add the flight to the cart
            bookingNumber = Math.floor(Math.random() * 9000) + 1000;
        }
    
    return bookingNumber;
}

function removeFlightFromCart(bookingNumber) {
    if (confirm("Are you sure you want to remove this booking from your cart?")) {

        const data = new URLSearchParams();
        data.append("bookingNumber", bookingNumber);

        // Retrieve and remove the flights from the flightCart.json that contain the bookingNumber
        fetch('remove_flight_from_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseText => {
            console.log(responseText);
            alert("Flight(s) with the booking number removed successfully!");
            window.location.reload();
            // const removedFlights = responseText.flights;
            
            // // Update available seats in the `availableFlights.xml` file
            // fetch('./availableFlights.xml')
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('Network response was not ok');
            //         }
            //         return response.text();
            //     })
            //     .then(data => {
            //         const parser = new DOMParser();
            //         const xmlDoc = parser.parseFromString(data, "text/xml");
            //         const flights = xmlDoc.getElementsByTagName("flight");
            //         removedFlights.forEach(removedFlight => {
            //             let selectedFlight = Array.from(flights).find(flight => flight.getElementsByTagName("flightid")[0].textContent === removedFlight.flightId);
            //             if (selectedFlight) {
            //                 const availableSeatsElem = selectedFlight.getElementsByTagName("availableseats")[0];
            //                 const currAvailableSeats = parseInt(availableSeatsElem.textContent);
            //                 const seatsToAdd = parseInt(removedFlight.seatsNeeded);

            //                 availableSeatsElem.textContent = (currAvailableSeats + seatsToAdd).toString();
            //                 console.log(`Updated seats: ${selectedFlight.getElementsByTagName("availableseats")[0].textContent}`);
            //             }
            //         });

            //         // Update the availableFlights.xml file
            //         const updatedData = new XMLSerializer().serializeToString(xmlDoc);
            //         fetch('/update-available-flights', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/xml'
            //             },
            //             body: updatedData
            //         })
            //         .then(response => {
            //             if (!response.ok) {
            //                 throw new Error('Network response was not ok');
            //             }
            //             return response.text();
            //         })
            //         .then(responseText => {
            //             console.log(responseText);
            //             window.location.reload();
            //         })
            //         .catch(error => {
            //             console.error('Error updating flight data:', error);
            //         });
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });
        })
        .catch(error => {
            // console.error('Error:', error);
            // if Error starts with SyntaxError, then it's a JSON parsing error
            // This is okay because data is still updated in the flightCart.json file and database successfully
            if (error.toString().startsWith("SyntaxError")) {
                alert("Flight(s) with the booking number removed successfully!");
                window.location.reload();
            } else {
                alert("Error removing flight!");
            }
        });
    }
}

function bookAllFlightsFromCart() {
    if (confirm("Are you sure you want to book all flights in your cart?")) {
        fetch('/confirm-booking-flights', {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(responseText => {
            console.log(responseText);
            alert("All flights booked successfully!");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error booking flights!");
        });
    }
}

async function getUserSession(){
    try{
        const response = await fetch('get_user_session.php');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if(data.loggedIn){
            console.log("User is logged in");
            console.log(data.firstName);
            console.log(data.lastName);
        } else {
            console.log("User is not logged in");
        }

        loggedInUser = data;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function makeRequest(action, params, callback) {
    const data = new URLSearchParams(params);
    data.append("action", action);

    fetch("account_actions.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // })
    // .then(responseText => {
    //     console.log(responseText);
    // })
    .then(response => response.text()) // Use .text() to inspect the raw response
    .then(rawText => {
        console.log("Raw response:", rawText);
        return JSON.parse(rawText); // Attempt to parse JSON after inspecting
    })
    .then(data => {
        // console.log("Parsed response:", data);
        callback(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 1. Retrieve information about booked flights and hotels using booking IDs
function retrieveBookedFlights() {
    const flightBookingId = document.getElementById("flight-booking-id").value;
    const hotelBookingId = document.getElementById("hotel-booking-id").value;

    makeRequest("retrieveBookedFlightsAndHotels", { flightBookingId, hotelBookingId }, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 2. Retrieve all passengers in a booked flight using the flight booking ID
function retrievePassengerInfo() {
    const flightBookingId = document.getElementById("flight-booking-id-passenger").value;

    /**
     * [{"ssn":"111-11-1111","first_name":"Om","last_name":"Hirpara","dob":"2020-09-08","category":"infant"},{"ssn":"112-49-9876","first_name":"Rohit","last_name":"Parkar","dob":"2015-04-21","category":"child"},{"ssn":"123-45-6789","first_name":"Manish","last_name":"Mallik","dob":"2003-02-08","category":"adult"},{"ssn":"222-22-2222","first_name":"John","last_name":"Cena","dob":"2023-09-09","category":"infant"},{"ssn":"894-85-3984","first_name":"Sandeep","last_name":"Mishra","dob":"2013-11-05","category":"child"},{"ssn":"987-65-4321","first_name":"Sameer","last_name":"Islam","dob":"2003-04-05","category":"adult"}]
     */

    let formattedOutput = "Passenger Information:\n";
    data.forEach(passenger => {
        formattedOutput += `SSN: ${passenger.ssn}\nFirst Name: ${passenger.first_name}\nLast Name: ${passenger.last_name}\nDate of Birth: ${passenger.dob}\nCategory: ${passenger.category}\n\n`;
    });

    makeRequest("retrievePassengers", { flightBookingId }, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 3. Retrieve all booked flights and hotels for September 2024
function retrieveAllForMonth() {
    makeRequest("retrieveForMonth", {}, (data) => {
        console.log(data);
        // Format the output to a string
        /*
        * JSON Output{"flights":[{"flight_id":"TX102","origin":"Austin, TX","destination":"Los Angeles, CA","departure_date":"2024-09-05","arrival_date":"2024-09-05","departure_time":"12:00:00","arrival_time":"14:30:00","available_seats":"88","price":"350.00","flight_booking_id":"5873","total_price":"1260.00"}],"hotels":[{"hotel_id":"H002","hotel_booking_id":"7836","check_in":"2024-09-06","check_out":"2024-09-10","totalRooms":"1","pricePerNight":"120.00","total_price":"480.00","hotel_name":"Austin City Inn","city":"Austin, TX","price":"120.00"}]}
        */
        
        const flights = data.flights;
        const hotels = data.hotels;

        let formattedOutput = "Booked Flights:\n";
        flights.forEach(flight => {
            formattedOutput += `Flight ID: ${flight.flight_id}\nOrigin: ${flight.origin}\nDestination: ${flight.destination}\nDeparture Date: ${flight.departure_date}\nArrival Date: ${flight.arrival_date}\nDeparture Time: ${flight.departure_time}\nArrival Time: ${flight.arrival_time}\nAvailable Seats: ${flight.available_seats}\nPrice: $${flight.price}\nFlight Booking ID: ${flight.flight_booking_id}\nTotal Price: $${flight.total_price}\n\n`;
        });

        formattedOutput += "\nBooked Hotels:\n";
        hotels.forEach(hotel => {
            formattedOutput += `Hotel ID: ${hotel.hotel_id}\nHotel Booking ID: ${hotel.hotel_booking_id}\nCheck-In: ${hotel.check_in}\nCheck-Out: ${hotel.check_out}\nTotal Rooms: ${hotel.totalRooms}\nPrice Per Night: $${hotel.pricePerNight}\nTotal Price: $${hotel.total_price}\nHotel Name: ${hotel.hotel_name}\nCity: ${hotel.city}\n\n`;
        });

        document.getElementById("output").innerText = formattedOutput;
    });
}

// 4. Retrieve all booked flights for a specific person using SSN
function retrieveBySSN() {
    const ssn = document.getElementById("ssn").value;
    makeRequest("retrieveBySSN", { ssn }, (data) => {
        console.log(data);

        /**
         * [{"price":"365.00","flight_id":"CA211","flight_booking_id":"5873","ticket_id":"631210","ssn":"123-45-6789","total_price":"1314.00","origin":"Los Angeles, CA","destination":"Austin, TX","departure_date":"2024-10-20","arrival_date":"2024-10-20","departure_time":"12:00:00","arrival_time":"17:30:00","available_seats":"73"},{"price":"350.00","flight_id":"TX102","flight_booking_id":"5873","ticket_id":"968336","ssn":"123-45-6789","total_price":"1260.00","origin":"Austin, TX","destination":"Los Angeles, CA","departure_date":"2024-09-05","arrival_date":"2024-09-05","departure_time":"12:00:00","arrival_time":"14:30:00","available_seats":"88"}]
         */

        let formattedOutput = "Booked Flights for this specific passenger:\n";
        data.forEach(flight => {
            formattedOutput += `Flight ID: ${flight.flight_id}\nOrigin: ${flight.origin}\nDestination: ${flight.destination}\nDeparture Date: ${flight.departure_date}\nArrival Date: ${flight.arrival_date}\nDeparture Time: ${flight.departure_time}\nArrival Time: ${flight.arrival_time}\nAvailable Seats: ${flight.available_seats}\nPrice: $${flight.price}\nFlight Booking ID: ${flight.flight_booking_id}\nTotal Price: $${flight.total_price}\n\n`;
        });

        document.getElementById("output").innerText = formattedOutput;
    });
}

// 5. Retrieve all booked flights departing from Texas between September and October 2024
function retrieveTexasFlights() {
    makeRequest("retrieveTexasFlights", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 6. Retrieve all booked hotels in Texas between September and October 2024
function retrieveTexasHotels() {
    makeRequest("retrieveTexasHotels", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 7. Retrieve the most expensive booked hotels
function retrieveExpensiveHotels() {
    makeRequest("retrieveExpensiveHotels", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 8. Retrieve all booked flights with at least one infant passenger
function retrieveInfantFlights() {
    makeRequest("retrieveInfantFlights", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 9. Retrieve all booked flights with at least one infant and five children
function retrieveInfantAndChildrenFlights() {
    makeRequest("retrieveInfantAndChildrenFlights", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 10. Retrieve the most expensive booked flights
function retrieveExpensiveFlights() {
    makeRequest("retrieveExpensiveFlights", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 11. Retrieve all booked flights departing from Texas without infant passengers
function retrieveNoInfantFlights() {
    makeRequest("retrieveNoInfantFlights", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    });
}

// 12. Count the number of booked flights arriving in California between September and October 2024
function countCaliforniaFlights() {
    makeRequest("countCaliforniaFlights", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = `Number of flights: ${data.count}`;
    });
}

// 13. Load the flights from XML file to the flights table
function loadFlights() {
    makeRequest("loadFlights", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = "Flights loaded successfully!";
    });
}

// 14. Load the hotels from JSON file to the hotels table
function loadHotels() {
    makeRequest("loadHotels", {}, (data) => {
        console.log(data);
        document.getElementById("output").innerText = "Hotels loaded successfully!";
    });
}

// DOM Method to load and build the cars.html page
document.addEventListener('DOMContentLoaded', () => {

    getUserSession()
    .then(data => {
        if(data.loggedIn){
            const welcome = document.getElementById('welcome');
            welcome.textContent = `Hello, ${data.firstName} ${data.lastName}!`;
        } else {
            const welcome = document.getElementById('welcome');
            welcome.textContent = `Hello, Guest!`;
        }
        // Add footer text dynamically
    if(!window.location.pathname.includes('cruises.html') && !window.location.pathname.includes('login.html')){
        // Dynamically create navigation links
        if(!window.location.pathname.includes('index.html') && !window.location.pathname.includes('contact-us.html')){
            const pages = ["Home", "Register", "Login", "Stays", "Flights", "Contact Us", "Cart", "My Account"];
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

    if (window.location.pathname.includes('flights.html')) {
        const form = document.getElementById('flightForm');
        form.addEventListener('submit', validateAndSubmit);
    }
    
    if (window.location.pathname.includes('stays.html')) {
        const form = document.getElementById('stayForm');
        form.addEventListener('submit', validateAndSubmitStay);
    }

    if (window.location.pathname.includes('my-account.html')) {
        
        // Get user's phone number

        if (!data.loggedIn) {
            document.getElementById('admin-buttons').style.display = "none";
            document.getElementById('buttonContainer').style.display = "none";
            document.getElementById('output').textContent = "Please log in to view your account details";
            return;
        } else {
            document.getElementById('buttonContainer').style.display = "block";
        }

        const phone = data.phone;
        if (phone == "222-222-2222")
        {
            document.getElementById('admin-buttons').style.display = "block";
        } else {
            document.getElementById('admin-buttons').style.display = "none";
        }
    }

    if (window.location.pathname.includes('cart.html')) {
        const hotelDetailsElement = document.getElementById('selectedHotelsDetails');
        const flightDetailsElement = document.getElementById('selectedFlightDetails');
        
        if (!data.loggedIn) {
            flightDetailsElement.innerHTML = "Please log in to view your cart";
            return;
        }

        // Read the selected flight details from the flightCart.json file
        fetch('./flightCart.json', {cache: "no-cache"})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const flights = data.flights;

                console.log(data.flights);

                // Check if the flightCart.json file is empty
                if (flights.length == 0) {
                    flightDetailsElement.innerHTML = "No flights in cart";
                    return;
                }
                
                const groupFlightsByBooking = {};
                flights.forEach(flight => {
                    const bookingNumber = flight.bookingNumber;
                    if (!groupFlightsByBooking[bookingNumber]) {
                        groupFlightsByBooking[bookingNumber] = [];
                    }
                    groupFlightsByBooking[bookingNumber].push(flight);
                });

                let flightDetails = "<h3>Selected Flights:</h3>";
                
                // Go through each group of flights
                for (const [bookingNumber, flights] of Object.entries(groupFlightsByBooking)) {
                    flightDetails += `<strong>Booking Number:</strong> ${bookingNumber}<br><br>`
                    // let adultPassengers = 0;
                    // let childPassengers = 0;
                    // let infantPassengers = 0;

                    const adultPassengers = flights[0].adults;
                    const childPassengers = flights[0].children;
                    const infantPassengers = flights[0].infants;
                    flights.forEach(flight => {
                        const flightId = flight.flightId;
                        const origin = flight.origin;
                        const destination = flight.destination;
                        const departureDate = flight.departureDate;
                        const arrivalDate = flight.arrivalDate;
                        const departureTime = flight.departureTime;
                        const arrivalTime = flight.arrivalTime;
                        const seatsNeeded = flight.seatsNeeded;
                        const price = flight.pricePerSeat;
                        const totalPrice = flight.totalPrice;
                        const adults = flight.adults;
                        const children = flight.children;
                        const infants = flight.infants;

                        // adultPassengers = adults;
                        // childPassengers = children;
                        // infantPassengers = infants;
        
                        flightDetails += `
                            <strong>Flight ID:</strong> ${flightId}<br>
                            <strong>Origin:</strong> ${origin}<br>
                            <strong>Destination:</strong> ${destination}<br>
                            <strong>Departure Date:</strong> ${departureDate}<br>
                            <strong>Arrival Date:</strong> ${arrivalDate}<br>
                            <strong>Departure Time:</strong> ${departureTime}<br>
                            <strong>Arrival Time:</strong> ${arrivalTime}<br>
                            <strong>Seats Needed:</strong> ${seatsNeeded}<br>
                            <strong>Price per Seat:</strong> $${price}<br>
                            <strong>Total Price:</strong> $${totalPrice}<br><br>
                        `;
                    });
                    // Generate passenger input fields for each seat
                    // for (let i = 0; i <flights[0].seatsNeeded; i++) {
                    //     flightDetails += `
                    //         <strong>Passenger ${i + 1}:</strong><br>
                    //         <label>First Name: <input type="text" name="firstName-${bookingNumber}-${i}" required></label><br>
                    //         <label>Last Name: <input type="text" name="lastName-${bookingNumber}-${i}" required></label><br>
                    //         <label>Date of Birth: <input type="date" name="dob-${bookingNumber}-${i}" required></label><br>
                    //         <label>SSN: <input type="text" name="ssn-${bookingNumber}-${i}" required></label><br><br>
                    //     `;
                    // }
                    // Loop for adult passengers
                    for (let j = 0; j < parseInt(adultPassengers); j++) {
                        flightDetails += `
                            <strong>Adult ${j + 1}:</strong><br>
                            <label>First Name: <input type="text" name="firstName-${bookingNumber}-adult-${j}" required></label><br>
                            <label>Last Name: <input type="text" name="lastName-${bookingNumber}-adult-${j}" required></label><br>
                            <label>Date of Birth: <input type="date" name="dob-${bookingNumber}-adult-${j}" required></label><br>
                            <label>SSN: <input type="text" name="ssn-${bookingNumber}-adult-${j}" required></label><br><br>
                        `;
                    }

                    // Loop for child passengers
                    for (let j = 0; j < parseInt(childPassengers); j++) {
                        flightDetails += `
                            <strong>Child ${j + 1}:</strong><br>
                            <label>First Name: <input type="text" name="firstName-${bookingNumber}-child-${j}" required></label><br>
                            <label>Last Name: <input type="text" name="lastName-${bookingNumber}-child-${j}" required></label><br>
                            <label>Date of Birth: <input type="date" name="dob-${bookingNumber}-child-${j}" required></label><br>
                            <label>SSN: <input type="text" name="ssn-${bookingNumber}-child-${j}" required></label><br><br>
                        `;
                    } 

                    // Loop for infant passengers
                    for (let j = 0; j < parseInt(infantPassengers); j++) {
                        flightDetails += `
                            <strong>Infant ${j + 1}:</strong><br>
                            <label>First Name: <input type="text" name="firstName-${bookingNumber}-infant-${j}" required></label><br>
                            <label>Last Name: <input type="text" name="lastName-${bookingNumber}-infant-${j}" required></label><br>
                            <label>Date of Birth: <input type="date" name="dob-${bookingNumber}-infant-${j}" required></label><br>
                            <label>SSN: <input type="text" name="ssn-${bookingNumber}-infant-${j}" required></label><br><br>
                        `;
                    }
                    // Add a button for each flight to remove that flight from cart
                    flightDetails += `<button type="remove" onclick="removeFlightFromCart('${bookingNumber}')">Remove Booking From Cart</button><br><br>`;
                }

                // flightDetails += "<button onclick='bookAllFlightsFromCart()'>Book All Flights</button>";
                flightDetails += "<button type=\"submit\" id='bookAll'>Book All Flights</button>";
                flightDetailsElement.innerHTML = flightDetails;

                // Handle "Book All Flights" button click
                document.getElementById('bookAll').addEventListener('click', () => {
                    const passengerData = [];
                    let invalidInput = false;

                    // Validate passenger input fields
                    var alphabeticRegex = /^[a-zA-Z]+$/;
                    var capitalizedRegex = /^[A-Z]/;
                    var dobRegex = /^\d{4}-\d{2}-\d{2}$/;
                    var ssnRegex = /^\d{3}-\d{2}-\d{4}$/;

                    // Collect passenger and flight data
                    let alertMsg = "";
                    Object.entries(groupFlightsByBooking).forEach(([bookingNumber, flights]) => {
                        const passengers = [];
                        
                        const uniqueSSNs = new Set();
                        const uniquePassengerKeys = new Set();

                        flights.forEach(flight => {
                            const flightId = flight.flightId;
                            const adultPassengers = flight.adults;
                            const childPassengers = flight.children;
                            const infantPassengers = flight.infants;
                            // const {adultPassengers, childPassengers, infantPassengers} = flight;

                            const collectPassengerData = (category, count) => {
                            for (let i = 0; i < count; i++) {
                                const firstName = document.querySelector(`input[name="firstName-${bookingNumber}-${category}-${i}"]`).value.trim();
                                const lastName = document.querySelector(`input[name="lastName-${bookingNumber}-${category}-${i}"]`).value.trim();
                                const dob = document.querySelector(`input[name="dob-${bookingNumber}-${category}-${i}"]`).value.trim();
                                const ssn = document.querySelector(`input[name="ssn-${bookingNumber}-${category}-${i}"]`).value.trim();

                                // Test first if any input is empty
                                if (firstName === "" || lastName === "" || dob === "" || ssn === "") {
                                    alertMsg += "All fields must be filled.\n";
                                }

                                // Test if first name and last name are alphabetic
                                if (!alphabeticRegex.test(firstName) || !alphabeticRegex.test(lastName)) {
                                    alertMsg += "First name and last name must be alphabetic.\n";
                                }

                                // Test if first name and last name are capitalized
                                if (!capitalizedRegex.test(firstName[0]) || !capitalizedRegex.test(lastName[0])) {
                                    alertMsg += "First name and last name must be capitalized.\n";
                                }

                                // Test if date of birth is in the correct format
                                if (!dobRegex.test(dob)) {
                                    alertMsg += "Format for date of birth must be followed as shown in the input field, and it should be fully filled out.\n";
                                }

                                // Test if SSN is in the correct format
                                if (!ssnRegex.test(ssn)) {
                                    alertMsg += "Format for SSN must be XXX-XX-XXXX, where each X is a digit (any number between 0 and 9).\n";
                                }

                                // Check if SSN is unique across booking
                                if (uniqueSSNs.has(ssn)) {
                                    const existingPassenger = passengers.find(p => p.ssn === ssn);
                                    if (
                                        existingPassenger &&
                                        (existingPassenger.firstName !== firstName ||
                                            existingPassenger.lastName !== lastName ||
                                            existingPassenger.dob !== dob)
                                    ) {
                                        alertMsg += `SSN ${ssn} must be unique per passenger details.\n`;
                                    }
                                } else {
                                    uniqueSSNs.add(ssn);
                                }

                                // Check if the same person is added to the same flight
                                const passengerKey = `${flightId}-${firstName}-${lastName}-${dob}`;
                                if (uniquePassengerKeys.has(passengerKey)) {
                                    alertMsg += `Passenger ${firstName} ${lastName} with DOB ${dob} is already added to flight ${flightId}.\n`;
                                } else {
                                    uniquePassengerKeys.add(passengerKey);
                                }

                                if (alertMsg !== "") {
                                    invalidInput = true;
                                    break;
                                }

                                passengers.push({
                                    firstName,
                                    lastName,
                                    dob,
                                    ssn,
                                    category
                                });
                            }
                            };
                            
                            collectPassengerData("adult", adultPassengers);
                            if (invalidInput) return;
                            collectPassengerData("child", childPassengers);
                            if (invalidInput) return;
                            collectPassengerData("infant", infantPassengers);
                            if (invalidInput) return;
                        });

                        if (invalidInput) return;

                        passengerData.push({
                            bookingNumber,
                            flights,
                            passengers
                        });
                    });

                    if (invalidInput) {
                        alert(alertMsg);
                        return;
                    }

                    // If there are any duplicate objects in a flightID, remove them
                    passengerData.forEach(data => {
                        let uniquePassengers = [];
                        let uniquePassengerStrings = [];
                        data.passengers.forEach(passenger => {
                            const passengerString = `${passenger.firstName}${passenger.lastName}${passenger.dob}${passenger.ssn}`;
                            if (!uniquePassengerStrings.includes(passengerString)) {
                                uniquePassengerStrings.push(passengerString);
                                uniquePassengers.push(passenger);
                            }
                        });
                        data.passengers = uniquePassengers;
                    });

                    // Send data to the server
                    console.log(passengerData);
                    fetch('confirm_flight_booking.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(passengerData)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to book flights');
                            }
                            return response.text();
                        })
                        .then(response => {
                            alert("Flights booked successfully!");
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error);
                            alert("Error booking flights.");
                        });
                });
            })
            .catch(error => {
                console.error('Error:', error);
                flightDetailsElement.innerHTML = "Error fetching flight data";
            });

        // Read the selected hotel details from the hotelCart.xml file. Check if hotelCart.xml file is empty first. if empty, then do not display anything
        fetch('./hotelCart.xml', {cache: "no-cache"})
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'application/xml');
                
                // Check if the hotelCart.xml file is empty
                if (xmlDoc.getElementsByTagName('hotel').length == 0) {
                    hotelDetailsElement.innerHTML = "No hotels in cart";
                    return;
                }
                const hotels = xmlDoc.getElementsByTagName('hotel');
    
                let hotelDetails = "<h3>Selected Hotels:</h3>";
                for (let i = 0; i < hotels.length; i++) {
                    const hotel = hotels[i];
                    const hotelId = hotel.getElementsByTagName('hotelId')[0].textContent;
                    const name = hotel.getElementsByTagName('name')[0].textContent;
                    const city = hotel.getElementsByTagName('city')[0].textContent;
                    const adultGuests = hotel.getElementsByTagName('adultGuests')[0].textContent;
                    const childGuests = hotel.getElementsByTagName('childGuests')[0].textContent;
                    const infantGuests = hotel.getElementsByTagName('infantGuests')[0].textContent;
                    const checkIn = hotel.getElementsByTagName('checkIn')[0].textContent;
                    const checkOut = hotel.getElementsByTagName('checkOut')[0].textContent;
                    const rooms = hotel.getElementsByTagName('rooms')[0].textContent;
                    const pricePerNight = hotel.getElementsByTagName('pricePerNight')[0].textContent;
                    const totalPrice = hotel.getElementsByTagName('totalPrice')[0].textContent;

                    hotelDetails += `
                        <strong>Hotel ID:</strong> ${hotelId}<br>
                        <strong>Name:</strong> ${name}<br>
                        <strong>City:</strong> ${city}<br>
                        <strong>Adults:</strong> ${adultGuests}<br>
                        <strong>Children:</strong> ${childGuests}<br>
                        <strong>Infants:</strong> ${infantGuests}<br>
                        <strong>Check-In Date:</strong> ${checkIn}<br>
                        <strong>Check-Out Date:</strong> ${checkOut}<br>
                        <strong>Rooms:</strong> ${rooms}<br>
                        <strong>Price Per Room Per Night:</strong> $${pricePerNight}<br>
                        <strong>Total Price:</strong> $${totalPrice}<br>
                    `;

                    // for (let j = 0; j < parseInt(adultGuests) + parseInt(childGuests) + parseInt(infantGuests); j++) {
                    //     hotelDetails += `
                    //         <strong>Guest ${j + 1}:</strong><br>
                    //         <label>First Name: <input type="text" name="firstName-${hotelId}-${j}" required></label><br>
                    //         <label>Last Name: <input type="text" name="lastName-${hotelId}-${j}" required></label><br>
                    //         <label>Date of Birth: <input type="date" name="dob-${hotelId}-${j}" required></label><br>
                    //         <label>SSN: <input type="text" name="ssn-${hotelId}-${j}" required></label><br><br>
                    //     `;
                    // }
                    // Loop for adult guests
                    for (let j = 0; j < parseInt(adultGuests); j++) {
                        hotelDetails += `
                            <strong>Adult ${j + 1}:</strong><br>
                            <label>First Name: <input type="text" name="firstName-${hotelId}-adult-${j}" required></label><br>
                            <label>Last Name: <input type="text" name="lastName-${hotelId}-adult-${j}" required></label><br>
                            <label>Date of Birth: <input type="date" name="dob-${hotelId}-adult-${j}" required></label><br>
                            <label>SSN: <input type="text" name="ssn-${hotelId}-adult-${j}" required></label><br><br>
                        `;
                    }

                    // Loop for child guests
                    for (let j = 0; j < parseInt(childGuests); j++) {
                        hotelDetails += `
                            <strong>Child ${j + 1}:</strong><br>
                            <label>First Name: <input type="text" name="firstName-${hotelId}-child-${j}" required></label><br>
                            <label>Last Name: <input type="text" name="lastName-${hotelId}-child-${j}" required></label><br>
                            <label>Date of Birth: <input type="date" name="dob-${hotelId}-child-${j}" required></label><br>
                            <label>SSN: <input type="text" name="ssn-${hotelId}-child-${j}" required></label><br><br>
                        `;
                    }

                    // Loop for infant guests
                    for (let j = 0; j < parseInt(infantGuests); j++) {
                        hotelDetails += `
                            <strong>Infant ${j + 1}:</strong><br>
                            <label>First Name: <input type="text" name="firstName-${hotelId}-infant-${j}" required></label><br>
                            <label>Last Name: <input type="text" name="lastName-${hotelId}-infant-${j}" required></label><br>
                            <label>Date of Birth: <input type="date" name="dob-${hotelId}-infant-${j}" required></label><br>
                            <label>SSN: <input type="text" name="ssn-${hotelId}-infant-${j}" required></label><br><br>
                        `;
                    }

                    // Add a button for each hotel to remove that hotel from cart
                    hotelDetails += `<button type="remove" onclick="removeHotelFromCart('${hotelId}', '${name}', '${city}', ${adultGuests}, ${childGuests}, ${infantGuests}, '${checkIn}', '${checkOut}', ${rooms}, ${pricePerNight}, ${totalPrice})">Remove from Cart</button><br><br>`;
                }
                // hotelDetails += "<button type=\"submit\" onclick='bookAllHotelsFromCart()'>Book All Hotels</button>";
                hotelDetails += "<button type=\"submit\" id='bookAllHotels'>Book All Hotels</button>";
                hotelDetailsElement.innerHTML = hotelDetails;

                // Handle "Book All Hotels" button click
                document.getElementById('bookAllHotels').addEventListener('click', () => {
                    const hotelData = [];
                    let invalidInput = false;

                    // Validate passenger input fields
                    var alphabeticRegex = /^[a-zA-Z]+$/;
                    var capitalizedRegex = /^[A-Z]/;
                    var dobRegex = /^\d{4}-\d{2}-\d{2}$/;
                    var ssnRegex = /^\d{3}-\d{2}-\d{4}$/;

                    // Collect passenger and hotel data
                    let alertMsg = "";
                    for (let i = 0; i < hotels.length; i++) {
                        const hotel = hotels[i];
                        const hotelId = hotel.getElementsByTagName('hotelId')[0].textContent;
                        const name = hotel.getElementsByTagName('name')[0].textContent;
                        const city = hotel.getElementsByTagName('city')[0].textContent;
                        const adultGuests = hotel.getElementsByTagName('adultGuests')[0].textContent;
                        const childGuests = hotel.getElementsByTagName('childGuests')[0].textContent;
                        const infantGuests = hotel.getElementsByTagName('infantGuests')[0].textContent;
                        const checkIn = hotel.getElementsByTagName('checkIn')[0].textContent;
                        const checkOut = hotel.getElementsByTagName('checkOut')[0].textContent;
                        const rooms = hotel.getElementsByTagName('rooms')[0].textContent;
                        const pricePerNight = hotel.getElementsByTagName('pricePerNight')[0].textContent;
                        const totalPrice = hotel.getElementsByTagName('totalPrice')[0].textContent;

                        const guests = [];
                        const uniqueSSNs = new Set();

                        const collectGuestData = (category, count) => {
                            for (let j = 0; j < count; j++) {
                                const firstName = document.querySelector(`[name="firstName-${hotelId}-${category}-${j}"]`).value;
                                const lastName = document.querySelector(`[name="lastName-${hotelId}-${category}-${j}"]`).value;
                                const dob = document.querySelector(`[name="dob-${hotelId}-${category}-${j}"]`).value;
                                const ssn = document.querySelector(`[name="ssn-${hotelId}-${category}-${j}"]`).value;

                                // Test first if any input is empty
                                if (firstName === "" || lastName === "" || dob === "" || ssn === "") {
                                    alertMsg += "All fields must be filled.\n";
                                }

                                // Test if first name and last name are alphabetic
                                if (!alphabeticRegex.test(firstName) || !alphabeticRegex.test(lastName)) {
                                    alertMsg += "First name and last name must be alphabetic.\n";
                                }

                                // Test if first name and last name are capitalized
                                if (!capitalizedRegex.test(firstName[0]) || !capitalizedRegex.test(lastName[0])) {
                                    alertMsg += "First name and last name must be capitalized.\n";
                                }

                                // Test if date of birth is in the correct format
                                if (!dobRegex.test(dob)) {
                                    alertMsg += "Format for date of birth must be followed as shown in the input field, and it should be fully filled out.\n";
                                }

                                // Test if SSN is in the correct format
                                if (!ssnRegex.test(ssn)) {
                                    alertMsg += "Format for SSN must be XXX-XX-XXXX, where each X is a digit (any number between 0 and 9).\n";
                                }

                                // Check if SSN is unique
                                if (uniqueSSNs.has(ssn)) {
                                    alertMsg += `SSN ${ssn} must be unique per guest details.\n`;
                                } else {
                                    uniqueSSNs.add(ssn);
                                }

                                if (alertMsg !== "") {
                                    invalidInput = true;
                                    break;
                                }

                                guests.push({
                                    firstName,
                                    lastName,
                                    dob,
                                    ssn,
                                    category
                                });
                            }
                        };
                        
                        collectGuestData("adult", adultGuests);
                        if (invalidInput) break;
                        collectGuestData("child", childGuests);
                        if (invalidInput) break;
                        collectGuestData("infant", infantGuests);
                        if (invalidInput) break;
                        
                        hotelData.push({
                            hotelId,
                            name,
                            city,
                            checkIn,
                            checkOut,
                            rooms,
                            pricePerNight,
                            totalPrice,
                            guests
                        });

                    };

                    if (invalidInput) {
                        alert(alertMsg);
                        return;
                    }

                    console.log(hotelData);
                    fetch('confirm_hotel_booking.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(hotelData)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to book hotels');
                            }
                            return response.text();
                        })
                        .then(response => {
                            alert("Hotels booked successfully!");
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error);
                            alert("Error booking hotels.");
                        });

                });

            })
            .catch(error => {
                console.error('Error:', error);
                hotelDetailsElement.innerHTML = "Error fetching hotel data";
            });
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
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;

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
            if (new Date(checkIn) < minDate || new Date(checkIn) > maxDate) {
                errors.push("Check-in date must be between Sep 1, 2024 and Dec 1, 2024.");
            }
            if (new Date(checkOut) < minDate || new Date(checkOut) > maxDate) {
                errors.push("Check-out date must be between Sep 1, 2024 and Dec 1, 2024.");
            }
            if (new Date(checkIn) >= new Date(checkOut)) {
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
                    <strong>Check In:</strong> ${checkIn} <br>
                    <strong>Check Out:</strong> ${checkOut} <br>
                `;
                output.style.color = "green";
            }
        });
    }

    if (window.location.pathname.includes('register.html')) {
        const header = document.getElementById('header-title');
        header.textContent = "Register";

        const registerForm = document.getElementById('registerForm');
        const output = document.getElementById('output');

        // Add a register web page to your web application to register users. You should
        // ask each user to enter Phone number, Password , FirstName, LastName, Date
        // of birth, Email, and Gender (as radio button) . Before registering each user,
        // you should validate the user’s inputs as following
        // • User must enter Phone number, Password , FirstName, LastName, Date
        // of birth, and Email. Gender is not a required user input.
        // • Phone number is a unique number. User can not use a phone number
        // that already has been used by another user.
        // • Phone number must be formatted as ddd-ddd-dddd
        // • User must enter the same Password two times.
        // • The Password must be at least 8 characters.
        // • Date of birth must have 2 digits for month, 2 digits fore day, and four digits for year
        // • Email must contain @ and .com

        // Phone label and input field
        const phoneLabel = document.createElement('label');
        phoneLabel.setAttribute('for', 'phone');
        phoneLabel.textContent = "Phone Number:";
        const phoneInput = document.createElement('input');
        phoneInput.setAttribute('type', 'tel');
        phoneInput.setAttribute('id', 'phone');
        phoneInput.setAttribute('name', 'phone');
        phoneInput.setAttribute('pattern', "[0-9]{3}-[0-9]{3}-[0-9]{4}");
        phoneInput.setAttribute('required', true);

        // Password label and input field
        const passwordLabel = document.createElement('label');
        passwordLabel.setAttribute('for', 'password');
        passwordLabel.textContent = "Password:";
        const passwordInput = document.createElement('input');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('id', 'password');
        passwordInput.setAttribute('name', 'password');
        passwordInput.setAttribute('required', true);

        // Confirm password label and input field
        const confirmPasswordLabel = document.createElement('label');
        confirmPasswordLabel.setAttribute('for', 'confirmPassword');
        confirmPasswordLabel.textContent = "Confirm Password:";
        const confirmPasswordInput = document.createElement('input');
        confirmPasswordInput.setAttribute('type', 'password');
        confirmPasswordInput.setAttribute('id', 'confirmPassword');
        confirmPasswordInput.setAttribute('name', 'confirmPassword');
        confirmPasswordInput.setAttribute('required', true);

        // First name label and input field
        const firstNameLabel = document.createElement('label');
        firstNameLabel.setAttribute('for', 'firstName');
        firstNameLabel.textContent = "First Name:";
        const firstNameInput = document.createElement('input');
        firstNameInput.setAttribute('type', 'text');
        firstNameInput.setAttribute('id', 'firstName');
        firstNameInput.setAttribute('name', 'firstName');
        firstNameInput.setAttribute('required', true);

        // Last name label and input field
        const lastNameLabel = document.createElement('label');
        lastNameLabel.setAttribute('for', 'lastName');
        lastNameLabel.textContent = "Last Name:";
        const lastNameInput = document.createElement('input');
        lastNameInput.setAttribute('type', 'text');
        lastNameInput.setAttribute('id', 'lastName');
        lastNameInput.setAttribute('name', 'lastName');
        lastNameInput.setAttribute('required', true);
        
        // Date of birth label and input field
        const dobLabel = document.createElement('label');
        dobLabel.setAttribute('for', 'dob');
        dobLabel.textContent = "Date of Birth:";
        const dobInput = document.createElement('input');
        dobInput.setAttribute('type', 'date');
        dobInput.setAttribute('id', 'dob');
        dobInput.setAttribute('name', 'dob');
        dobInput.setAttribute('required', true);

        // Email label and input field
        const emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.textContent = "Email:";
        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('id', 'email');
        emailInput.setAttribute('name', 'email');
        emailInput.setAttribute('required', true);

        // Gender label and radio buttons
        const genderLabel = document.createElement('label');
        genderLabel.textContent = "Gender:";
        const maleLabel = document.createElement('input');
        const femaleLabel = document.createElement('input');
        maleLabel.setAttribute('type', 'radio');
        femaleLabel.setAttribute('type', 'radio');
        maleLabel.setAttribute('name', 'gender');
        femaleLabel.setAttribute('name', 'gender');
        maleLabel.setAttribute('value', 'Male');
        femaleLabel.setAttribute('value', 'Female');

        const maleText = document.createElement('label')
        maleText.textContent = "Male";

        const femaleText = document.createElement('label')
        femaleText.textContent = "Female";

        // Submit button
        const submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit');

        // Append elements to the form
        registerForm.appendChild(phoneLabel);
        registerForm.appendChild(document.createElement('br'));
        registerForm.appendChild(phoneInput);
        registerForm.appendChild(document.createElement('br'));

        registerForm.appendChild(passwordLabel);
        registerForm.appendChild(document.createElement('br'));
        registerForm.appendChild(passwordInput);
        registerForm.appendChild(document.createElement('br'));

        registerForm.appendChild(confirmPasswordLabel);
        registerForm.appendChild(document.createElement('br'));
        registerForm.appendChild(confirmPasswordInput);
        registerForm.appendChild(document.createElement('br'));

        registerForm.appendChild(firstNameLabel);
        registerForm.appendChild(document.createElement('br'));
        registerForm.appendChild(firstNameInput);
        registerForm.appendChild(document.createElement('br'));

        registerForm.appendChild(lastNameLabel);
        registerForm.appendChild(document.createElement('br'));
        registerForm.appendChild(lastNameInput);
        registerForm.appendChild(document.createElement('br'));

        registerForm.appendChild(dobLabel);
        registerForm.appendChild(document.createElement('br'));
        registerForm.appendChild(dobInput);
        registerForm.appendChild(document.createElement('br'));

        registerForm.appendChild(emailLabel);
        registerForm.appendChild(document.createElement('br'));
        registerForm.appendChild(emailInput);
        registerForm.appendChild(document.createElement('br'));

        registerForm.appendChild(genderLabel);
        registerForm.appendChild(document.createElement('br'));
        registerForm.appendChild(maleLabel);
        registerForm.appendChild(maleText);
        registerForm.appendChild(femaleLabel);
        registerForm.appendChild(femaleText);
        registerForm.appendChild(document.createElement('br'));

        registerForm.appendChild(submitButton);

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieve user input values
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const dob = document.getElementById('dob').value;
            const email = document.getElementById('email').value.trim();
            const gender = document.querySelector('input[name="gender"]:checked').value;

            // Validation rules
            // Phone number must be unique and formatted as ddd-ddd-dddd
            // Password must be at least 8 characters
            // Date of birth must have 2 digits for month, 2 digits for day, and four digits for year
            // Email must contain @ and .com
            const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
            const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let errors = [];

            // Validate phone number
            if (phone.length == 0) {
                errors.push("Phone number is required.");
            } else if (!phoneRegex.test(phone)) {
                errors.push("Phone number must be formatted as ddd-ddd-dddd.");
            }

            // Validate password
            if (password.length == 0) {
                errors.push("Password is required.");
            } else if (password.length < 8) {
                errors.push("Password must be at least 8 characters.");
            }

            // Validate confirm password
            if (confirmPassword.length == 0) {
                errors.push("Confirm password is required.");
            } else if (password != confirmPassword) {
                errors.push("Passwords do not match.");
            }

            // Validate first name
            if (firstName.length == 0) {
                errors.push("First name is required.");
            }

            // Validate last name
            if (lastName.length == 0) {
                errors.push("Last name is required.");
            }

            // Validate date of birth
            if (dob.length == 0) {
                errors.push("Date of birth is required.");
            } else if (!dobRegex.test(dob)) {
                errors.push("Date of birth must have the format YYYY-MM-DD.");
            }

            // Validate email
            if (email.length == 0) {
                errors.push("Email is required.");
            } else if (!emailRegex.test(email)) {
                errors.push("Email must be in the format");
            }

            // Check if gender is selected
            if (!gender) {
                errors.push("Please select a gender");
            }

            // Output validation results and submit to registers.php
            if (errors.length > 0) {
                output.innerHTML = "Your input has some errors to address:<br>" + errors.join('<br>');
                output.style.color = "red";
            } else {
                output.innerHTML = "Your input is valid. Registering user...";
                output.style.color = "green";

                // registerForm.action = "register.php";
                // registerForm.method = "POST";
                // registerForm.submit();

                // Submit form data to register.php
                fetch('register.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    // body: `phone=${phone}&password=${password}&firstName=${firstName}&lastName=${lastName}&dob=${dob}&email=${email}&gender=${gender}`
                    body: new URLSearchParams({
                        phone: phone,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        dob: dob,
                        email: email,
                        gender: gender
                    })    
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(responseText => {
                    console.log(responseText);
                    output.innerHTML = "User registered successfully!";
                })
                .catch(error => {
                    console.error('Error:', error);
                    output.innerHTML = "Error registering user.";
                });
            }

        });

    }
    });
});

//Method that uses jQuery to load and build the cruise.html page
$(document).ready(function(){

    getUserSession()
    .then(data => {
        if (window.location.pathname.includes('cruises.html')) {

            $('#header-title').text("Cruises");
    
            const pages = ["Home", "Stays", "Flights", "Cars", "Cruises", "Contact Us", "Cart"];
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
    
        if (window.location.pathname.includes('login.html')) {
            // The User should be able to log in to your web application
            // using her/his Phone number and the password. Phone number for the admin
            // should be 222-222-2222. 
            
            // const form = document.getElementById('loginForm');
            // form.addEventListener('submit', validateLogin);
    
            $('#header-title').text("Log In");
    
            const pages = ["Home", "Register", "Login", "Stays", "Flights", "Contact Us", "Cart", "My Account"];
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
    
            const loginForm = `<form id="loginForm">
                    <label for="phone">Phone Number:</label><br>
                    <input type="tel" id="phone" name="phone" placeholder="xxx-xxx-xxxx" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password" name="password" required><br>
                    <button type="submit" value="Submit">Submit</button>
                </form>`;
            
            const logOutDisplay = `<form id="logoutForm">
                <h3>Logged In</h3>
                <button type="submit" value="Submit">Log Out</button>
                </form>`;
            if(data.loggedIn){
                $('#formContainer').html(logOutDisplay);
            } else {
                $('#formContainer').html(loginForm);
            }
    
            updateFooterJQuery();
            setInterval(updateFooterJQuery, 1000);
    
            $('#loginForm').submit(function(event){
                event.preventDefault();
    
                const phone = $('#phone').val();
                const password = $('#password').val();
    
                $('#output').html("<h3>Login Details:</h3>" +
                    "<strong>Phone:</strong> " + phone + "<br>" +
                    "<strong>Password:</strong> " + password);
                $('#output').css('color', 'green');
                
                // connect to login.php
                fetch('login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        phone: phone,
                        password: password
                    })    
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(responseText => {
                    console.log(responseText);
                    $('#output').html("Login successful!");
                    alert("Login successful!");
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                    $('#output').html("Error logging in.");
                });
    
            });
    
            $('#logoutForm').submit(function(event){
                event.preventDefault();
    
                fetch('logout.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(responseText => {
                    console.log(responseText);
                    $('#output').html("Logged out successfully!");
                    $('#output').css('color', 'green');
                    alert("Logged out successfully!");
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                    $('#output').html("Error logging out.");
                });
            });
        }
    });
});