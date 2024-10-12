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
    // var emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@utdallas.edu$/;

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
    // check if email is in the correct format
    else if(!emailRegex.test(email)){
        alertMessage += "Email must be in correct format.\n";
    }

    console.log("Contact form submitted");
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
});