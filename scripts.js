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

        const data = new URLSearchParams();
        data.append("fname", fname);
        data.append("lname", lname);
        data.append("phone", phone);
        data.append("email", email);
        data.append("gender", gender);
        data.append("comment", comment);

        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then(response => response.text())
        .then(responseText => {
            document.getElementById("contact-output").innerHTML += "<br>" + responseText;
            document.getElementById("contact-output").style.color = "green";
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
    fetch('./availableFlights.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const flights = xmlDoc.getElementsByTagName("flight");
            const availableFlightsExact = Array.from(flights).filter(flight => {
                // Make sure the origin, destination, and available seats match the user's input
                const flightOrigin = flight.getElementsByTagName("origin")[0].textContent;
                const flightDestination = flight.getElementsByTagName("destination")[0].textContent;
                const flightSeats = parseInt(flight.getElementsByTagName("availableSeats")[0].textContent);
                const departureDateObj = new Date(flight.getElementsByTagName("departureDate")[0].textContent);
                const inputDepartureDateObj = new Date(departureDate);
                // const returnDateObj = returnDate ? new Date(flight.getElementsByTagName("returnDate")[0].textContent) : null;

                return (
                    flightOrigin === origin &&
                    flightDestination === destination &&
                    flightSeats >= seatsNeeded &&
                    departureDateObj.getTime() === inputDepartureDateObj.getTime() //&&
                    // (!returnDate || returnDateObj.getTime() === returnDate.getTime())
                );

            });

            let availableFlights = availableFlightsExact;

            // If no exact match is found, consider 1, 2, or 3 days before and/or after the departure date
            if (availableFlights.length === 0) {
                const departureDateObj = new Date(departureDate);
                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                const twoDays = 2 * oneDay;
                const threeDays = 3 * oneDay;
                const possibleDates = [departureDateObj, new Date(departureDateObj.getTime() + oneDay), new Date(departureDateObj.getTime() + twoDays), new Date(departureDateObj.getTime() + threeDays), new Date(departureDateObj.getTime() - oneDay), new Date(departureDateObj.getTime() - twoDays), new Date(departureDateObj.getTime() - threeDays)];
                const availableFlightsClose = Array.from(flights).filter(flight => {
                    const flightOrigin = flight.getElementsByTagName("origin")[0].textContent;
                    const flightDestination = flight.getElementsByTagName("destination")[0].textContent;
                    const flightSeats = parseInt(flight.getElementsByTagName("availableSeats")[0].textContent);
                    const departureDateObj = new Date(flight.getElementsByTagName("departureDate")[0].textContent);
                    const inputDepartureDateObj = new Date(departureDate);
                    // const returnDateObj = returnDate ? new Date(flight.getElementsByTagName("returnDate")[0].textContent) : null;

                    return (
                        flightOrigin === origin &&
                        flightDestination === destination &&
                        flightSeats >= seatsNeeded &&
                        possibleDates.some(date => date.getTime() === departureDateObj.getTime()) //&&
                        // (!returnDate || returnDateObj.getTime() === returnDate.getTime())
                    );
                });
                availableFlights = availableFlightsClose;
            }

            let availableReturnFlights = [];
            // If there is a return date, check if there are flights available for the return date. Destination becomes origin and vice versa
            if (returnDate) {
                const availableReturn = Array.from(flights).filter(flight => {
                    const flightOrigin = flight.getElementsByTagName("origin")[0].textContent;
                    const flightDestination = flight.getElementsByTagName("destination")[0].textContent;
                    const flightSeats = parseInt(flight.getElementsByTagName("availableSeats")[0].textContent);
                    const departureDateObj = new Date(flight.getElementsByTagName("departureDate")[0].textContent);
                    const inputDepartureDateObj = new Date(returnDate);
                    // const returnDateObj = returnDate ? new Date(flight.getElementsByTagName("returnDate")[0].textContent) : null;

                    return (
                        flightOrigin === destination &&
                        flightDestination === origin &&
                        flightSeats >= seatsNeeded &&
                        departureDateObj.getTime() === inputDepartureDateObj.getTime() //&&
                        // (!returnDate || returnDateObj.getTime() === returnDate.getTime())
                    );
                });
                availableReturnFlights = availableReturn;

                if (availableReturnFlights.length === 0) {
                    const departureDateObj = new Date(returnDate);
                    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                    const twoDays = 2 * oneDay;
                    const threeDays = 3 * oneDay;
                    const possibleDates = [departureDateObj, new Date(departureDateObj.getTime() + oneDay), new Date(departureDateObj.getTime() + twoDays), new Date(departureDateObj.getTime() + threeDays), new Date(departureDateObj.getTime() - oneDay), new Date(departureDateObj.getTime() - twoDays), new Date(departureDateObj.getTime() - threeDays)];
                    const availableReturnClose = Array.from(flights).filter(flight => {
                        const flightOrigin = flight.getElementsByTagName("origin")[0].textContent;
                        const flightDestination = flight.getElementsByTagName("destination")[0].textContent;
                        const flightSeats = parseInt(flight.getElementsByTagName("availableSeats")[0].textContent);
                        const departureDateObj = new Date(flight.getElementsByTagName("departureDate")[0].textContent);
                        const inputDepartureDateObj = new Date(returnDate);
                        // const returnDateObj = returnDate ? new Date(flight.getElementsByTagName("returnDate")[0].textContent) : null;

                        return (
                            flightOrigin === destination &&
                            flightDestination === origin &&
                            flightSeats >= seatsNeeded &&
                            possibleDates.some(date => date.getTime() === departureDateObj.getTime()) //&&
                            // (!returnDate || returnDateObj.getTime() === returnDate.getTime())
                        );
                    });
                    availableReturnFlights = availableReturnClose;
                }
            }

            let flightDetails = "<h3>Available Flights:</h3>";
            if (availableFlights.length > 0) {
                if(returnDate) {
                    if(availableReturnFlights.length > 0){
                        availableFlights.forEach(flight => {
                            availableReturnFlights.forEach(returnFlight => {
                                const flightId = flight.getElementsByTagName("flightId")[0].textContent;
                                const origin = flight.getElementsByTagName("origin")[0].textContent;
                                const destination = flight.getElementsByTagName("destination")[0].textContent;
                                const departureDate = flight.getElementsByTagName("departureDate")[0].textContent;
                                const arrivalDate = flight.getElementsByTagName("arrivalDate")[0].textContent;
                                const departureTime = flight.getElementsByTagName("departureTime")[0].textContent;
                                const arrivalTime = flight.getElementsByTagName("arrivalTime")[0].textContent;
                                const availableSeats = parseInt(flight.getElementsByTagName("availableSeats")[0].textContent);
                                const price = parseFloat(flight.getElementsByTagName("price")[0].textContent);
                                const totalPrice = price * adults + price * 0.7 * children + price * 0.1 * infants;
                                const returnFlightId = returnFlight.getElementsByTagName("flightId")[0].textContent;
                                // const origin = flight.getElementsByTagName("origin")[0].textContent;
                                // const destination = flight.getElementsByTagName("destination")[0].textContent;
                                const returnDepartureDate = returnFlight.getElementsByTagName("departureDate")[0].textContent;
                                const returnArrivalDate = returnFlight.getElementsByTagName("arrivalDate")[0].textContent;
                                const returnDepartureTime = returnFlight.getElementsByTagName("departureTime")[0].textContent;
                                const returnArrivalTime = returnFlight.getElementsByTagName("arrivalTime")[0].textContent;
                                const returnAvailableSeats = parseInt(flight.getElementsByTagName("availableSeats")[0].textContent);
                                const returnPrice = parseFloat(returnFlight.getElementsByTagName("price")[0].textContent);
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
                                    <button onclick="addRoundTripToCart('${flightId}', '${returnFlightId}', '${origin}', '${destination}', '${departureDate}', '${arrivalDate}', '${departureTime}', '${arrivalTime}', ${totalPrice}, '${returnDepartureDate}', '${returnArrivalDate}', '${returnDepartureTime}', '${returnArrivalTime}', ${seatsNeeded}, ${price}, ${returnPrice}, ${totalReturnPrice})">Add to Cart</button>
                                    <br><br>
                                `;
                                // addRoundTripToCart(flightId, returnFlightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, totalPrice, returnDepartureDate, returnArrivalDate, returnDepartureTime, returnArrivalTime, seatsNeeded, pricePerSeat, pricePerSeatReturn, returnTotalPrice)
                            });
                        });
                    } else {
                        flightDetails += "<p>No round trip flights available matching your criteria.</p>";
                    }
                }
                else{
                    availableFlights.forEach(flight => {
                        const flightId = flight.getElementsByTagName("flightId")[0].textContent;
                        const origin = flight.getElementsByTagName("origin")[0].textContent;
                        const destination = flight.getElementsByTagName("destination")[0].textContent;
                        const departureDate = flight.getElementsByTagName("departureDate")[0].textContent;
                        const arrivalDate = flight.getElementsByTagName("arrivalDate")[0].textContent;
                        const departureTime = flight.getElementsByTagName("departureTime")[0].textContent;
                        const arrivalTime = flight.getElementsByTagName("arrivalTime")[0].textContent;
                        const availableSeats = parseInt(flight.getElementsByTagName("availableSeats")[0].textContent);
                        const price = parseFloat(flight.getElementsByTagName("price")[0].textContent);
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
                            <button onclick="addFlightToCart('${flightId}', '${origin}', '${destination}', '${departureDate}', '${arrivalDate}', '${departureTime}', '${arrivalTime}', ${seatsNeeded}, ${price}, ${totalPrice})">Add to Cart</button>
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

    // Read from the availableHotels.json file
    fetch('./availableHotels.json')
        .then(response =>  {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const hotels = data.hotels;
            let availableHotels = hotels.filter(hotel => hotel.city == city);

            // If available hotels is not empty, then filter by availability, checking if any of the dates are within range
            if (availableHotels.length > 0) {
                availableHotels = availableHotels.filter(hotel => {
                    if(hotel.availableRooms >= roomsNeeded)
                    {
                        return hotel.availability.some(availability => {
                            const startDate = new Date(availability.startDate);
                            const endDate = new Date(availability.endDate);
                            const checkInDate = new Date(checkIn);
                            const checkOutDate = new Date(checkOut);
                            return checkInDate >= startDate && checkOutDate <= endDate;
                        });
                    }
                });
            }

            let hotelDetails = "<h3>Available Hotels:</h3>";
            availableHotels.forEach(hotel => {
                // calculate the number of days between check-in and check-out dates
                const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
                hotelDetails += `
                    <strong>Hotel ID:</strong> ${hotel.hotelId}<br>
                    <strong>Name:</strong> ${hotel.name}<br>
                    <strong>City:</strong> ${hotel.city}<br>
                    <strong>Rooms Available:</strong> ${hotel.availableRooms}<br>
                    <strong>Check-In Date:</strong> ${checkIn}<br>
                    <strong>Check-Out Date:</strong> ${checkOut}<br>
                    <strong>Price Per Night For Each Room:</strong> $${hotel.pricePerNight}<br>
                    <strong>Total Price (Computed):</strong> $${hotel.pricePerNight * diffTime * roomsNeeded}<br>
                `;
                // <strong>Availability Dates for this Hotel:</strong><br>
                // hotel.availability.forEach(availability => {
                //     hotelDetails += `
                //         <strong>Open Date:</strong> ${availability.startDate}<br>
                //         <strong>Close Date:</strong> ${availability.endDate}<br>
                //     `;
                // });
                // Add a button to book the hotel on that date
                hotelDetails += `<button onclick="addHotelToCart('${hotel.hotelId}', '${hotel.name}', '${hotel.city}', ${adults}, ${children}, ${infants}, '${checkIn}', '${checkOut}', ${roomsNeeded}, ${hotel.pricePerNight}, ${hotel.pricePerNight * diffTime * roomsNeeded})">Add to Cart</button>`;
                hotelDetails += "<br>";
            });
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
        fetch('/book-hotel-to-cart', {
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
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error booking flight!");
            });
        
        // Update the available rooms in the availableHotels.json file
        fetch('./availableHotels.json')
            .then(response =>  {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const hotels = data.hotels;
                let availableHotels = hotels.filter(hotel => hotel.hotelId == hotelId);
                availableHotels[0].availableRooms -= rooms;
                console.log(availableHotels[0].availableRooms);
                
                // Update the availableHotels.json file
                const updatedData = { hotels: hotels };
                console.log(updatedData);
                console.log(JSON.stringify(updatedData));
                fetch('/update-available-hotels', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(responseText => {
                        console.log(responseText);
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
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

        fetch('/remove-hotel-from-cart', {
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
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error removing hotel!");
            });
        

        // Update the available rooms in the availableHotels.json file
        fetch('./availableHotels.json')
            .then(response =>  {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const hotels = data.hotels;
                let availableHotels = hotels.filter(hotel => hotel.hotelId == hotelId);
                availableHotels[0].availableRooms += rooms;
                console.log(availableHotels[0].availableRooms);
                
                // Update the availableHotels.json file
                const updatedData = { hotels: hotels };
                console.log(updatedData);
                console.log(JSON.stringify(updatedData));
                fetch('/update-available-hotels', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(responseText => {
                        console.log(responseText);
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
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
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error booking hotels!");
        });
    }
}

function addRoundTripToCart(flightId, returnFlightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, totalPrice, returnDepartureDate, returnArrivalDate, returnDepartureTime, returnArrivalTime, seatsNeeded, pricePerSeat, pricePerSeatReturn, returnTotalPrice) {
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
            totalPrice: totalPrice
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
            totalPrice: returnTotalPrice
        };

        // Book the departure flight
        fetch('/book-flight-to-cart', {
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
                fetch('/book-flight-to-cart', {
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
    }
}

function addFlightToCart(flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice) {
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
            totalPrice: totalPrice
        };


        // Book the flight
        fetch('/book-flight-to-cart', {
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
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error booking flight!");
        });

        // Update available seats in the `availableFlights.xml` file
        fetch('./availableFlights.xml')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");
                const flights = xmlDoc.getElementsByTagName("flight");
                let selectedFlight = Array.from(flights).find(flight => flight.getElementsByTagName("flightId")[0].textContent === flightId);
                if (selectedFlight) {
                    selectedFlight.getElementsByTagName("availableSeats")[0].textContent -= seatsNeeded;
                    console.log(`Updated seats: ${selectedFlight.getElementsByTagName("availableSeats")[0].textContent}`);
                }

                // Update the availableFlights.xml file
                const updatedData = new XMLSerializer().serializeToString(xmlDoc);
                fetch('/update-available-flights', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/xml'
                        // 'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: updatedData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(responseText => {
                    console.log(responseText);
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error updating flight data:', error);
                });
            });

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
            const flights = data.flights;
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

// Added the new add flight to cart code here
// You had a bunch of things inside of a single function that were async this lead to race conditions
// in general make a scripts/ folder and then have multiple *.js files for different things 
// so like have a flights.js that handles adding and removing all the filghts just makes the code nicer
// function confirmTripType() {
//     const tripType = document.getElementById('tripdropdown').value;

//     // Display relevant fields based on trip type
//     document.getElementById('origin-label').style.display = 'block';
//     document.getElementById('origin').style.display = 'block';
//     document.getElementById('destination-label').style.display = 'block';
//     document.getElementById('destination').style.display = 'block';
//     document.getElementById('departure-label').style.display = 'block';
//     document.getElementById('departure').style.display = 'block';

//     if (tripType === 'round-trip') {
//         document.getElementById('arriving-label').style.display = 'block';
//         document.getElementById('arriving').style.display = 'block';
//     } else {
//         document.getElementById('arriving-label').style.display = 'none';
//         document.getElementById('arriving').style.display = 'none';
//     }

//     document.getElementById('searchButton').style.display = 'block';
// }

// function showPassengerForm() {
//     document.getElementById('passengerForm').style.display = 'block';
// }

// function validateAndSubmit(event) {
//     event.preventDefault();

//     const form = document.getElementById('flightForm');
//     const flightId = generateFlightId();  // Assuming there's a function to generate a unique flight ID
//     const origin = form.origin.value;
//     const destination = form.destination.value;
//     const departureDate = form.departure.value;
//     const arrivalDate = form.arriving ? form.arriving.value : '';
//     const seatsNeeded = parseInt(form.adults.value) + parseInt(form.children.value) + parseInt(form.infants.value);
//     const pricePerSeat = calculatePricePerSeat();  // Assuming there's a function to calculate price per seat
//     const totalPrice = pricePerSeat * seatsNeeded;

//     const departureTime = "09:00"; // Hardcoded for simplicity, you can modify as needed
//     const arrivalTime = "12:00"; // Hardcoded for simplicity, you can modify as needed

//     addFlightToCart(flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice);
// }

// function addFlightToCart(flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice) {
//     const flightData = confirmFlightDetails(flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice);
//     if (flightData) {
//         bookFlight(flightData)
//             .then(() => alert("Flight booked successfully!"))
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert("Error booking flight!");
//             });
//     }
// }

// function addRoundTripToCart(flightId, returnFlightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, totalPrice, returnDepartureDate, returnArrivalDate, returnDepartureTime, returnArrivalTime, seatsNeeded, pricePerSeat, pricePerSeatReturn, returnTotalPrice) {
//     if (confirmRoundTripDetails(flightId, returnFlightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, totalPrice, returnDepartureDate, returnArrivalDate, returnDepartureTime, returnArrivalTime, seatsNeeded, pricePerSeat, pricePerSeatReturn, returnTotalPrice)) {
//         bookFlight({ flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice })
//             .then(() => {
//                 alert("Departure flight booked successfully!");
//                 return bookFlight({ flightId: returnFlightId, origin: destination, destination: origin, departureDate: returnDepartureDate, arrivalDate: returnArrivalDate, departureTime: returnDepartureTime, arrivalTime: returnArrivalTime, seatsNeeded, pricePerSeat: pricePerSeatReturn, totalPrice: returnTotalPrice });
//             })
//             .then(() => alert("Return flight booked successfully!"))
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert("Error booking flight!");
//             });
//     }
// }

// function confirmRoundTripDetails(flightId, returnFlightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, totalPrice, returnDepartureDate, returnArrivalDate, returnDepartureTime, returnArrivalTime, seatsNeeded, pricePerSeat, pricePerSeatReturn, returnTotalPrice) {
//     return confirm("Are you sure you want to book this round trip with the following details:\n" +
//         "Departure Flight Details:" +
//         "\nFlight ID: " + flightId +
//         "\nOrigin: " + origin +
//         "\nDestination: " + destination +
//         "\nDeparture Date: " + departureDate +
//         "\nArrival Date: " + arrivalDate +
//         "\nDeparture Time: " + departureTime +
//         "\nArrival Time: " + arrivalTime +
//         "\nSeats Needed: " + seatsNeeded +
//         "\nPrice Per Seat: $" + pricePerSeat +
//         "\nTotal Price: $" + totalPrice +
//         "\n\nReturn Flight Details:" +
//         "\nFlight ID: " + returnFlightId +
//         "\nOrigin: " + origin +
//         "\nDestination: " + destination +
//         "\nDeparture Date: " + returnDepartureDate +
//         "\nArrival Date: " + returnArrivalDate +
//         "\nDeparture Time: " + returnDepartureTime +
//         "\nArrival Time: " + returnArrivalTime +
//         "\nSeats Needed: " + seatsNeeded +
//         "\nPrice Per Seat: $" + pricePerSeatReturn +
//         "\nTotal Price: $" + returnTotalPrice +
//         "\n\nPress OK to confirm.");
// }

// function confirmFlightDetails(flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice) {
//     if (confirm("Are you sure you want to book this flight with the following details:\n" +
//         "Flight ID: " + flightId +
//         "\nOrigin: " + origin +
//         "\nDestination: " + destination +
//         "\nDeparture Date: " + departureDate +
//         "\nArrival Date: " + arrivalDate +
//         "\nDeparture Time: " + departureTime +
//         "\nArrival Time: " + arrivalTime +
//         "\nSeats Needed: " + seatsNeeded +
//         "\nPrice Per Seat: $" + pricePerSeat +
//         "\nTotal Price: $" + totalPrice +
//         "\n\nPress OK to confirm.")) {
//         const data = {
//             flightId: flightId,
//             origin: origin,
//             destination: destination,
//             departureDate: departureDate,
//             arrivalDate: arrivalDate,
//             departureTime: departureTime,
//             arrivalTime: arrivalTime,
//             seatsNeeded: seatsNeeded,
//             pricePerSeat: pricePerSeat,
//             totalPrice: totalPrice
//         };
//         return data;
//     } else {
//         return null;
//     }
// }

// function bookFlight(data) {
//     fetch('/book-flight-to-cart', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.text();
//         })
//         .then(responseText => {
//             console.log(responseText);
//             alert("The flight is booked successfully!");
//             updateAvailableSeats(data.flightId, data.seatsNeeded);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert("Error booking flight!");
//         });
// }

function updateAvailableSeats(flightId, seatsNeeded) {
    fetch('./availableFlights.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const flights = xmlDoc.getElementsByTagName("flight");
            let selectedFlight = Array.from(flights).find(flight => flight.getElementsByTagName("flightId")[0].textContent === flightId);
            if (selectedFlight) {
                const availableSeatsElem = selectedFlight.getElementsByTagName("availableSeats")[0];
                let availableSeats = parseInt(availableSeatsElem.textContent);
                availableSeatsElem.textContent = availableSeats - seatsNeeded;
                console.log(`Updated seats: ${availableSeatsElem.textContent}`);
            }

            const updatedData = new XMLSerializer().serializeToString(xmlDoc);
            fetch('/update-available-flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml'
                },
                body: updatedData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(responseText => {
                    console.log(responseText);
                    window.location.href = "flights.html";
                })
                .catch(error => {
                    console.error('Error updating flight data:', error);
                });
        });
}

function removeFlightFromCart(flightId, seatsRemoved) {
    if (confirm("Are you sure you want to remove this flight from your cart?")) {
        

        fetch('/remove-flight-from-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
            alert("Flight removed successfully!");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error removing flight!");
        });

        // Update available seats in the `availableFlights.xml` file
        fetch('./availableFlights.xml')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const flights = data.flights;
                let selectedFlight = flights.find(flight => flight.flightId === flightId);
                if (selectedFlight) {
                    selectedFlight.availableSeats += seatsRemoved;
                    console.log(`Updated seats: ${selectedFlight.availableSeats}`);
                }

                // Update the availableFlights.xml file
                const updatedData = { flights: flights };
                fetch('/update-available-flights', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(responseText => {
                    console.log(responseText);
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error updating flight data:', error);
                });
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

function flightGroupBy(flights, key) {
    return flights.reduce((acc, flight) => {
        (acc[flight[key]] = acc[flight[key]] || []).push(flight);
        return acc;
    }, {});
}

// DOM Method to load and build the cars.html page
document.addEventListener('DOMContentLoaded', () => {

    // Add footer text dynamically
    if(!window.location.pathname.includes('cruises.html')){
        // Dynamically create navigation links
        if(!window.location.pathname.includes('index.html') && !window.location.pathname.includes('contact-us.html')){
            const pages = ["Home", "Stays", "Flights", "Cars", "Cruises", "Contact Us", "Cart"];
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

    if (window.location.pathname.includes('cart.html')) {
        const hotelDetailsElement = document.getElementById('selectedHotelsDetails');
        const flightDetailsElement = document.getElementById('selectedFlightDetails');
    
        // Read the selected flight details from the flightCart.json file
        fetch('./flightCart.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const flights = data.flights;
    
                let flightDetails = "<h3>Selected Flights:</h3>";
                // Group selected flights by booking number
                const groupedFlights = groupBy(flights, 'bookingNumber');
                console.log(groupedFlights);
                for (const bookingNumber in groupedFlights) {
                    if (groupedFlights.hasOwnProperty(bookingNumber)) {
                        const flightGroup = groupedFlights[bookingNumber];
                        console.log(flightGroup);
                        let totalPrice = 0;
                        flightGroup.forEach(flight => {
                            const flightId = flight.flightId;
                            const origin = flight.origin;
                            const destination = flight.destination;
                            const departureDate = flight.departureDate;
                            const arrivalDate = flight.arrivalDate;
                            const departureTime = flight.departureTime;
                            const arrivalTime = flight.arrivalTime;
                            const seatsNeeded = flight.seatsNeeded;
                            const price = flight.pricePerSeat;
                            totalPrice += flight.totalPrice;
    
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
                                <strong>Total Price:</strong> $${flight.totalPrice}<br><br>
                            `;
                        });
                        flightDetails += `<button onclick="removeFlightGroupFromCart('${bookingNumber}', ${flightGroup.length})">Remove from Cart</button><br><br>`;
                    }
                }
                
                // flights.forEach(flight => {
                //     const flightId = flight.flightId;
                //     const origin = flight.origin;
                //     const destination = flight.destination;
                //     const departureDate = flight.departureDate;
                //     const arrivalDate = flight.arrivalDate;
                //     const departureTime = flight.departureTime;
                //     const arrivalTime = flight.arrivalTime;
                //     const seatsNeeded = flight.seatsNeeded;
                //     const price = flight.pricePerSeat;
                //     const totalPrice = flight.totalPrice;
    
                //     // Calculate the total price for booking all available seats
                //     // const totalPrice = price * availableSeats;
    
                //     flightDetails += `
                //         <strong>Flight ID:</strong> ${flightId}<br>
                //         <strong>Origin:</strong> ${origin}<br>
                //         <strong>Destination:</strong> ${destination}<br>
                //         <strong>Departure Date:</strong> ${departureDate}<br>
                //         <strong>Arrival Date:</strong> ${arrivalDate}<br>
                //         <strong>Departure Time:</strong> ${departureTime}<br>
                //         <strong>Arrival Time:</strong> ${arrivalTime}<br>
                //         <strong>Seats Needed:</strong> ${seatsNeeded}<br>
                //         <strong>Price per Seat:</strong> $${price}<br>
                //         <strong>Total Price:</strong> $${totalPrice}<br><br>
                //     `;

                //     // Add a button for each flight to remove that flight from cart
                //     flightDetails += `<button onclick="removeFlightFromCart('${flightId}', ${seatsNeeded})">Remove from Cart</button><br><br>`;
                // });
                flightDetails += "<button onclick='bookAllFlightsFromCart()'>Book All Flights</button>";
                flightDetailsElement.innerHTML = flightDetails;
            })
            .catch(error => {
                console.error('Error:', error);
                flightDetailsElement.innerHTML = "Error fetching flight data";
            });

        // Read the selected hotel details from the hotelCart.xml file. Check if hotelCart.xml file is empty first. if empty, then do not display anything
        fetch('./hotelCart.xml')
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
                        <strong>Price Per Night:</strong> $${pricePerNight}<br>
                        <strong>Total Price:</strong> $${totalPrice}<br>
                    `;

                    // Add a button for each hotel to remove that hotel from cart
                    hotelDetails += `<button onclick="removeHotelFromCart('${hotelId}', '${name}', '${city}', ${adultGuests}, ${childGuests}, ${infantGuests}, '${checkIn}', '${checkOut}', ${rooms}, ${pricePerNight}, ${totalPrice})">Remove from Cart</button><br><br>`;
                }
                hotelDetails += "<button onclick='bookAllHotelsFromCart()'>Book All Hotels</button>";
                hotelDetailsElement.innerHTML = hotelDetails;
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
});

//Method that uses jQuery to load and build the cruise.html page
$(document).ready(function(){

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
});