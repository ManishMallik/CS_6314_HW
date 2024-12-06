<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$action = $_POST['action'];

switch ($action) {
    case "retrieveBookedFlightsAndHotels":
        $flightBookingId = $_POST['flightBookingId'];
        $hotelBookingId = $_POST['hotelBookingId'];
        $query = "SELECT * FROM Flight_Bookings NATURAL JOIN Flights WHERE flight_booking_id = '$flightBookingId'";
        $flights = $conn->query($query)->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT * FROM Hotel_Bookings NATURAL JOIN Hotel WHERE hotel_booking_id = '$hotelBookingId'";
        $hotels = $conn->query($query)->fetch_all(MYSQLI_ASSOC);

        echo json_encode(["flights" => $flights, "hotels" => $hotels]);
        break;

    case "retrievePassengers":
        $flightBookingId = $_POST['flightBookingId'];
        $query = "SELECT DISTINCT Passengers.ssn, first_name, last_name, dob, category FROM Passengers JOIN Tickets ON Passengers.ssn = Tickets.ssn WHERE flight_booking_id = '$flightBookingId'";
        $passengers = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($passengers);
        break;

    case "retrieveForMonth":
        $query = "SELECT * FROM Flights NATURAL JOIN Flight_Bookings WHERE departure_date LIKE '2024-09%'";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);

        $query2 = "SELECT * FROM Hotel_Bookings NATURAL JOIN Hotel WHERE check_in LIKE '2024-09%'";
        $results2 = $conn->query($query2)->fetch_all(MYSQLI_ASSOC);

        $combinedResults = ["flights" => $results, "hotels" => $results2];
        echo json_encode($combinedResults);
        break;

    case "retrieveBySSN":
        $ssn = $_POST['ssn'];
        $query = "SELECT DISTINCT Flight_Bookings.flight_booking_id, Flights.flight_id, origin, destination, departure_date, arrival_date, departure_time, arrival_time, available_seats, Flights.price, total_price FROM Tickets NATURAL JOIN Flight_Bookings JOIN Flights on Flights.flight_id = Flight_Bookings.flight_id WHERE ssn = '$ssn'";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($results);
        break;

    case "retrieveTexasFlights":
        $query = "SELECT * FROM Flights NATURAL JOIN Flight_Bookings WHERE origin LIKE '%TX' AND departure_date BETWEEN '2024-09-01' AND '2024-10-31'";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($results);
        break;

    case "retrieveTexasHotels":
        $query = "SELECT * FROM Hotel_Bookings NATURAL JOIN Hotel WHERE city LIKE '%TX' AND check_in BETWEEN '2024-09-01' AND '2024-10-31'";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($results);
        break;

    case "retrieveExpensiveHotels":
        $query = "SELECT * FROM Hotel_Bookings NATURAL JOIN Hotel ORDER BY total_price DESC LIMIT 5";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($results);
        break;

    case "retrieveInfantFlights":
        // $query = "SELECT * FROM Flights NATURAL JOIN Flight_Bookings NATURAL JOIN Tickets NATURAL JOIN Passengers WHERE category = 'infant'";
        // $query = "SELECT * FROM Flight_Bookings NATURAL JOIN Tickets NATURAL JOIN Passengers WHERE category = 'infant'";
        $query = "SELECT DISTINCT Flight_Bookings.flight_booking_id, Flights.flight_id, origin, destination, departure_date, arrival_date, departure_time, arrival_time, available_seats, Flights.price, total_price
        FROM Flights 
        JOIN Flight_Bookings ON Flights.flight_id = Flight_Bookings.flight_id 
        JOIN Tickets ON Tickets.flight_booking_id = Flight_Bookings.flight_booking_id 
        JOIN Passengers ON Tickets.ssn = Passengers.ssn
        WHERE category='infant';
        ";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($results);
        break;

    case "retrieveInfantAndChildrenFlights":
        // $query = "SELECT * FROM Flights WHERE passengers LIKE '%infant%' AND passengers LIKE '%child%' HAVING COUNT(passengers) >= 2";
        $query = "SELECT DISTINCT Flight_Bookings.flight_booking_id, Flights.flight_id, origin, destination, departure_date, arrival_date, departure_time, arrival_time, available_seats, price, total_price
        FROM Flights 
        JOIN Flight_Bookings ON Flights.flight_id = Flight_Bookings.flight_id 
        WHERE Flight_Bookings.flight_booking_id IN(
            SELECT Flight_Bookings.flight_booking_id
            FROM Flight_Bookings
            JOIN Tickets ON Tickets.flight_booking_id = Flight_Bookings.flight_booking_id 
            JOIN Passengers ON Tickets.ssn = Passengers.ssn
            GROUP BY Flight_Bookings.flight_booking_id
            HAVING SUM(CASE WHEN Passengers.category = 'infant' then 1 else 0 end) >= 1 AND SUM(CASE WHEN Passengers.category = 'child' then 1 else 0 end) >= 2
        );
        ";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($results);
        break;

    case "retrieveExpensiveFlights":
        $query = "SELECT * FROM Flights NATURAL JOIN Flight_Bookings ORDER BY total_price DESC LIMIT 5";
        // $query = "SELECT * FROM Flights ORDER BY price DESC LIMIT 5";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($results);
        break;

    case "retrieveNoInfantFlights":
        $query = "SELECT DISTINCT Flight_Bookings.flight_booking_id, Flights.flight_id, origin, destination, departure_date, arrival_date, departure_time, arrival_time, available_seats, price, total_price
        FROM Flights 
        JOIN Flight_Bookings ON Flights.flight_id = Flight_Bookings.flight_id 
        WHERE origin LIKE '%TX' AND Flight_Bookings.flight_booking_id NOT IN(
            SELECT Flight_Bookings.flight_booking_id
            FROM Flight_Bookings
            JOIN Tickets ON Tickets.flight_booking_id = Flight_Bookings.flight_booking_id 
            JOIN Passengers ON Tickets.ssn = Passengers.ssn
            WHERE Passengers.category = 'infant'
        );
        ";
        $results = $conn->query($query)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($results);
        break;

    case "countCaliforniaFlights":
        $query = "SELECT COUNT(*) as count FROM Flights NATURAL JOIN Flight_Bookings WHERE destination LIKE '%CA' AND departure_date BETWEEN '2024-09-01' AND '2024-10-31'";
        $results = $conn->query($query)->fetch_assoc();
        echo json_encode($results);
        break;
    
    case "loadHotels":
        // Load from availableHotels.json
        $hotelsJson = file_get_contents("availableHotels.json");
        $hotels = json_decode($hotelsJson, true);

        if (!isset($hotels["hotels"]) || !$hotels) {
            echo "No hotels found";
            exit();
        }

        foreach ($hotels["hotels"] as $hotel) {
            $hotel_id = $hotel["hotelId"];
            $hotel_name = $hotel["name"];
            $city = $hotel["city"];
            $price = $hotel["pricePerNight"];

            $sql = "INSERT INTO Hotel (hotel_id, hotel_name, city, price) VALUES ('$hotel_id', '$hotel_name', '$city', '$price')";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => "Hotel Table successfully"]);
            } else {
                echo json_encode(["error" => "Error creating database: " . $conn->error]);
            }
        }
        break;
    
    case "loadFlights":
        // Read availableFlights.xml and insert data into Flights table
        $xml = new DOMDocument("1.0", "UTF-8");
        $xml->formatOutput = true;
        $xml->load("availableFlights.xml");

        $flights = $xml->getElementsByTagName("flight");

        foreach ($flights as $flight) {
            $flight_id = $flight->getElementsByTagName("flightid")[0]->nodeValue;
            $origin = $flight->getElementsByTagName("origin")[0]->nodeValue;
            $destination = $flight->getElementsByTagName("destination")[0]->nodeValue;
            $departure_date = $flight->getElementsByTagName("departuredate")[0]->nodeValue;
            $arrival_date = $flight->getElementsByTagName("arrivaldate")[0]->nodeValue;
            $departure_time = $flight->getElementsByTagName("departuretime")[0]->nodeValue;
            $arrival_time = $flight->getElementsByTagName("arrivaltime")[0]->nodeValue;
            $available_seats = $flight->getElementsByTagName("availableseats")[0]->nodeValue;
            $price = $flight->getElementsByTagName("price")[0]->nodeValue;

            $sql = "INSERT INTO Flights (flight_id, origin, destination, departure_date, arrival_date, departure_time, arrival_time, available_seats, price) VALUES ('$flight_id', '$origin', '$destination', '$departure_date', '$arrival_date', '$departure_time', '$arrival_time', '$available_seats', '$price')";
            
            if ($conn->query($sql)) {
                echo json_encode(["success" => "Flights Table successfully"]);
            } else {
                echo json_encode(["error" => "Error creating database: " . $conn->error]);
            }
        }
        break;

    default:
        echo json_encode(["error" => "Invalid action"]);
        break;
}

$conn->close();
?>