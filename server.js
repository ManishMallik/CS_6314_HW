const express = require('express');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize parser and builder for XML. Preserve the case of the tags. Do not make it all lowercase
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

// Middleware to serve static files and parse form data
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.xml({
    limit: '1MB',
    xmlParseOptions: {
        normalize: true,
        normalizeTags: true,
        explicitArray: false
    }
}));

// Navigating to home page. Redirect to index.html by doing a GET request to /index.html
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// POST route to handle form submission
app.post('/submit-form', (req, res) => {
    const { fname, lname, phone, email, gender, comment } = req.body;

    // Define new contact structure
    const newContact = {
        fname,
        lname,
        phone,
        email,
        gender,
        comment
    };

    const xmlFilePath = 'contacts.xml';

    // Check if XML file exists
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        let xmlContent = { contacts: { contact: [] } }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            // Parse existing XML data
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    console.error('Error parsing XML:', parseErr);
                    res.status(500).send('Error parsing XML file');
                    return;
                }
                xmlContent = result; // Use existing structure if file data is available

                // Ensure xmlContent.contacts.contact is an array
                if (!Array.isArray(xmlContent.contacts.contact)) {
                    xmlContent.contacts.contact = [];
                }

                // Add new contact to the array
                xmlContent.contacts.contact.push(newContact);

                // Save the updated XML
                saveXMLFile(xmlFilePath, xmlContent, res);
            });
        } else {
            // If the file does not exist, create a new structure
            xmlContent.contacts.contact.push(newContact);

            // Save the XML with the new structure
            saveXMLFile(xmlFilePath, xmlContent, res);
        }
    });
});

app.post('/book-hotel-to-cart', (req, res) => {
    
    const { hotelId, name, city, adultGuests, childGuests, infantGuests, checkIn, checkOut, rooms, pricePerNight, totalPrice } = req.body;

    // Define new hotel structure in XML format
    const newHotel = {
        hotelId,
        name,
        city,
        adultGuests,
        childGuests,
        infantGuests,
        checkIn,
        checkOut,
        rooms,
        pricePerNight,
        totalPrice
    };

    const xmlFilePath = 'hotelCart.xml';

    // Check if XML file exists
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        let xmlContent = { hotelBookings: { hotel: [] } }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            // Parse existing XML data
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    console.error('Error parsing XML:', parseErr);
                    res.status(500).send('Error parsing XML file');
                    return;
                }
                xmlContent = result; // Use existing structure if file data is available

                if (!xmlContent.hotelBookings) {
                    xmlContent.hotelBookings = { hotel: [] };
                } else if (!Array.isArray(xmlContent.hotelBookings.hotel)) {
                    xmlContent.hotelBookings.hotel = [];
                }

                // Add new hotel to the array
                xmlContent.hotelBookings.hotel.push(newHotel);

                // Save the updated XML
                saveXMLFile(xmlFilePath, xmlContent, res);
            });
        } else {
            // If the file does not exist, create a new structure
            xmlContent.hotelBookings.hotel.push(newHotel);

            // Save the XML with the new structure
            saveXMLFile(xmlFilePath, xmlContent, res);
        }
    });

});

// This is where we reduce the number of available rooms in the available hotels JSON file
app.post('/update-available-hotels', (req, res) => {
    console.log('Parsed Request Body:', req.body);
    const updatedData = req.body;
    fs.writeFile('./availableHotels.json', JSON.stringify(updatedData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to JSON file:', err);
            res.status(500).send('Error updating hotels data');
        } else {
            res.send('Available hotels data updated successfully');
        }
    });
});

// Remove a hotelID from the cart
app.post('/remove-hotel-from-cart', (req, res) => {
    const { hotelId, name, city, adultGuests, childGuests, infantGuests, checkIn, checkOut, rooms, pricePerNight, totalPrice } = req.body;
    const xmlFilePath = 'hotelCart.xml';

    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading XML file:', err);
            res.status(500).send('Error reading XML file');
            return;
        }

        // Parse existing XML data
        parser.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Error parsing XML:', parseErr);
                res.status(500).send('Error parsing XML file');
                return;
            }

            const xmlContent = result;

            // Find the hotel to remove. Just only remove one instance of the hotel containing the exact same data
            const hotelIndex = xmlContent.hotelBookings.hotel.findIndex(hotel => (
                hotel.hotelId[0] === hotelId &&
                hotel.name[0] === name &&
                hotel.city[0] === city &&
                hotel.adultGuests[0] === adultGuests &&
                hotel.childGuests[0] === childGuests &&
                hotel.infantGuests[0] === infantGuests &&
                hotel.checkIn[0] === checkIn &&
                hotel.checkOut[0] === checkOut &&
                hotel.rooms[0] === rooms &&
                hotel.pricePerNight[0] === pricePerNight &&
                hotel.totalPrice[0] === totalPrice
            ));

            if (hotelIndex === -1) {
                res.status(404).send('Hotel not found in the cart');
                return;
            }

            // Remove the hotel from the array
            xmlContent.hotelBookings.hotel.splice(hotelIndex, 1);

            // Save the updated XML
            saveXMLFile(xmlFilePath, xmlContent, res);
        });
    });
});

// After confirming on the cart page, the user can book the hotels. Add whatever is in hotelCart.xml to confirmedHotel.xml
app.post('/confirm-booking-hotel', (req, res) => {

    const hotelCartXML = "hotelCart.xml";
    const confirmedHotelXML = "confirmedHotels.xml";

    fs.readFile(hotelCartXML, 'utf-8', (err, data) => {
        //get the hotels list from the cart
        parser.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Error parsing XML:', parseErr);
                res.status(500).send('Error parsing XML file');
                return;
            }

            const xmlContent = result;
            console.log("XML Content: ", xmlContent);

            // Open up the confirmed hotels file and add all the hotels from the cart to it
            fs.readFile(confirmedHotelXML, 'utf-8', (err, data) => {
                let confirmedHotels = { confirmedHotels: { hotel: [] } }; // Default structure if file is empty or doesn't exist

                if (!err && data) {
                    // Parse existing XML data
                    parser.parseString(data, (parseErr, result) => {
                        if (parseErr) {
                            console.error('Error parsing XML:', parseErr);
                            res.status(500).send('Error parsing XML file');
                            return;
                        }
                        confirmedHotels = result; // Use existing structure if file data is available

                        if (!confirmedHotels.confirmedHotels) {
                            confirmedHotels.confirmedHotels = { hotel: [] };
                        } else if (!Array.isArray(confirmedHotels.confirmedHotels.hotel)) {
                            confirmedHotels.confirmedHotels.hotel = [];
                        }

                        // Add new hotel to the array
                        confirmedHotels.confirmedHotels.hotel.push(...xmlContent.hotelBookings.hotel);

                        // Save the updated XML
                        saveXMLFile(confirmedHotelXML, confirmedHotels, res);
                    });
                } else {
                    // If the file does not exist, create a new structure
                    confirmedHotels.confirmedHotels.hotel.push(...xmlContent.hotelBookings.hotel);

                    // Save the XML with the new structure
                    saveXMLFile(confirmedHotelXML, confirmedHotels, res);
                }
            });
        });
    });

    // Once the booking is confirmed, remove all hotels from the cart
    fs.writeFile(hotelCartXML, '', (err) => {
        if (err) {
            console.error('Error writing to XML file:', err);
            // res.status(500).send('Error updating hotels data');
        } else {
            // res.send('Hotels removed from cart successfully');
        }
    });
});

app.post('/book-flight-to-cart', (req, res) => {
    const { bookingNumber, flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice } = req.body;

    // Define new flight structure in JSON format
    const newFlight = {
        bookingNumber,
        flightId,
        origin,
        destination,
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        seatsNeeded,
        pricePerSeat,
        totalPrice
    };

    const jsonFilePath = 'flightCart.json';

    // Check if JSON file exists
    fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        let jsonData = { flights: [] }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            jsonData = JSON.parse(data); // Use existing structure if file data is available
        }

        // Add new flight to the array
        jsonData.flights.push(newFlight);

        // Save the updated JSON
        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing JSON file:', writeErr);
                res.status(500).send('Error saving data');
            } else {
                res.send('Flight added to cart successfully');
            }
        });
    });
});

// Update the available flights XML file
app.post('/update-available-flights', (req, res) => {
    //get the updated data from the request body. it should be application/xml
    const updatedData = req.body;

    const xmlString = builder.buildObject(updatedData);
    //write the updated data to the availableFlights.xml file
    fs.writeFile('./availableFlights.xml', xmlString, (err) => {
        if (err) {
            console.error('Error writing to XML file:', err);
            res.status(500).send('Error updating flights data');
        } else {
            res.send('Available flights data updated successfully');
        }
    });
});

app.post('/remove-flight-from-cart', (req, res) => {
    
    const { bookingNumber } = req.body;
    const flightCartJson = 'flightCart.json';

    fs.readFile(flightCartJson, 'utf-8', (err, data) => {
        
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Error reading JSON file');
            return;
        }

        const jsonData = JSON.parse(data);

        // Convert booking number from string to number
        const bookingNum = parseInt(bookingNumber);

        // Find all of the flights with the booking number
        const flightsToRemove = jsonData.flights.filter(flight => flight.bookingNumber === bookingNum);
        const flightsToKeep = jsonData.flights.filter(flight => flight.bookingNumber !== bookingNum);
        if(flightsToKeep.length === jsonData.flights.length){
            res.status(404).send('Flight not found in the cart');
            return;
        }
        
        jsonData.flights = flightsToKeep;

        // Save the updated JSON
        fs.writeFile(flightCartJson, JSON.stringify(jsonData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing JSON file:', writeErr);
                res.status(500).send('Error saving data');
            } else {
                res.json({response: 'Flight removed from cart successfully', flights: flightsToRemove});
            }
        });
    });
});

app.post('/confirm-booking-flights', (req, res) => {
    const { flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice } = req.body;

    // Define new flight structure in XML format
    const newFlight = {
        flightId,
        origin,
        destination,
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        seatsNeeded,
        pricePerSeat,
        totalPrice
    };

    const xmlFilePath = 'confirmedFlights.xml';

    // Check if XML file exists
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        let xmlContent = { confirmedFlights: { flight: [] } }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            // Parse existing XML data
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    console.error('Error parsing XML:', parseErr);
                    res.status(500).send('Error parsing XML file');
                    return;
                }
                xmlContent = result; // Use existing structure if file data is available

                if (!xmlContent.confirmedFlights) {
                    xmlContent.confirmedFlights = { flight: [] };
                } else if (!Array.isArray(xmlContent.confirmedFlights.flight)) {
                    xmlContent.confirmedFlights.flight = [];
                }

                // Add new flight to the array
                xmlContent.confirmedFlights.flight.push(newFlight);

                // Save the updated XML
                saveXMLFile(xmlFilePath, xmlContent, res);
            });
        } else {
            // If the file does not exist, create a new structure
            xmlContent.confirmedFlights.flight.push(newFlight);

            // Save the XML with the new structure
            saveXMLFile(xmlFilePath, xmlContent, res);
        }
    });
});

const flightCartPath = 'flightCart.json';
const bookedFlightsPath = 'confirmedFlights.json';

// Confirm booking with passenger information
app.post('/confirm-booking-with-passengers', (req, res) => {
    const bookings = req.body;

    // Load existing booked flights
    let bookedData = { bookedFlights: [] };
    if (fs.existsSync(bookedFlightsPath)) {
        bookedData = JSON.parse(fs.readFileSync(bookedFlightsPath, 'utf-8'));
    }

    // Add new bookings with passenger information
    bookings.forEach(booking => {
        const { bookingNumber, flights, passengers } = booking;

        flights.forEach(flight => {
            const bookedFlight = {
                bookingNumber,
                ...flight,
                passengers // Attach passenger details
            };
            bookedData.bookedFlights.push(bookedFlight);
        });
    });

    // Save updated booked flights
    fs.writeFileSync(bookedFlightsPath, JSON.stringify(bookedData, null, 2), 'utf-8');

    // Empty the flight cart
    fs.writeFileSync(flightCartPath, JSON.stringify({ flights: [] }, null, 2), 'utf-8');
    res.send("Bookings confirmed with passenger details.");
});

// Save XML content
function saveXMLFile(filePath, content, res) {
    const xml = builder.buildObject(content);

    fs.writeFile(filePath, xml, (err) => {
        if (err) {
            console.error('Error writing XML file:', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('<response>Success: Data has been saved to contacts.xml</response>');
        }
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
