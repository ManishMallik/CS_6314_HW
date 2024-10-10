function contactSubmit(){
    
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