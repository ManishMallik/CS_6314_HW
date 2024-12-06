<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ensure tables exist (only for first-time setup, can be removed if tables are already created)
// Create Flights Table
$sql = "CREATE TABLE IF NOT EXISTS Flights (
    flight_id VARCHAR(5) PRIMARY KEY NOT NULL,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    departure_date DATE NOT NULL,
    arrival_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    available_seats INT(3) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
)";
$conn->query($sql);

// Create Passengers Table
$sql = "CREATE TABLE IF NOT EXISTS Passengers (
    ssn VARCHAR(15) PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    dob DATE NOT NULL,
    category ENUM('adult', 'child', 'infant') NOT NULL
)";
$conn->query($sql);

// Create Flight-Booking Table
$sql = "CREATE TABLE IF NOT EXISTS Flight_Bookings (
    flight_booking_id INT(6) NOT NULL,
    flight_id VARCHAR(5) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (flight_booking_id, flight_id),
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id) ON DELETE CASCADE
)";
$conn->query($sql);

// Create Tickets Table
$sql = "CREATE TABLE IF NOT EXISTS Tickets (
    ticket_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flight_booking_id INT(6) NOT NULL,
    ssn VARCHAR(15) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (flight_booking_id) REFERENCES Flight_Bookings(flight_booking_id) ON DELETE CASCADE,
    FOREIGN KEY (ssn) REFERENCES Passengers(ssn) ON DELETE CASCADE
)";
$conn->query($sql);

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
        echo "Flight $flight_id created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// $requestMethod = $_SERVER["REQUEST_METHOD"];
// $requestUri = $_SERVER["REQUEST_URI"];

// $servername = "localhost";
// $username = "root";
// $password = "";
// $db = "TravelingDB";

// $conn = new mysqli($servername, $username, $password, $db);
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

// $sql = "CREATE TABLE IF NOT EXISTS Flights (
//     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     flightNumber VARCHAR(30) NOT NULL,
//     departure VARCHAR(30) NOT NULL,
//     arrival VARCHAR(30) NOT NULL,
//     departureTime VARCHAR(30) NOT NULL,
//     arrivalTime VARCHAR(30) NOT NULL,
//     price INT(6) NOT NULL
// )";
// if ($conn->query($sql) === TRUE) {
//     echo "Flights Table successfully";
// } else {
//     echo "Error creating database: " . $conn->error;
// }

// $conn->close();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ensure tables exist (only for first-time setup, can be removed if tables are already created)
// Create Flights Table
// $sql = "CREATE TABLE IF NOT EXISTS Flights (
//     flight_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     origin VARCHAR(50) NOT NULL,
//     destination VARCHAR(50) NOT NULL,
//     departure_date DATE NOT NULL,
//     arrival_date DATE NOT NULL,
//     departure_time TIME NOT NULL,
//     arrival_time TIME NOT NULL,
//     available_seats INT(3) NOT NULL,
//     price DECIMAL(10, 2) NOT NULL
// )";
// $conn->query($sql);

// // Create Passengers Table
// $sql = "CREATE TABLE IF NOT EXISTS Passengers (
//     ssn VARCHAR(15) PRIMARY KEY,
//     first_name VARCHAR(30) NOT NULL,
//     last_name VARCHAR(30) NOT NULL,
//     dob DATE NOT NULL,
//     category ENUM('adult', 'child', 'infant') NOT NULL
// )";
// $conn->query($sql);

// // Create Flight-Booking Table
// $sql = "CREATE TABLE IF NOT EXISTS Flight_Bookings (
//     flight_booking_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     flight_id INT(6) UNSIGNED NOT NULL,
//     total_price DECIMAL(10, 2) NOT NULL,
//     FOREIGN KEY (flight_id) REFERENCES Flights(flight_id) ON DELETE CASCADE
// )";
// $conn->query($sql);

// // Create Tickets Table
// $sql = "CREATE TABLE IF NOT EXISTS Tickets (
//     ticket_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     flight_booking_id INT(6) UNSIGNED NOT NULL,
//     ssn VARCHAR(15) NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     FOREIGN KEY (flight_booking_id) REFERENCES Flight_Bookings(flight_booking_id) ON DELETE CASCADE,
//     FOREIGN KEY (ssn) REFERENCES Passengers(ssn) ON DELETE CASCADE
// )";
// $conn->query($sql);

// Handle Flight Search
// if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $origin = $_POST['origin'] ?? null;
    $destination = $_POST['destination'] ?? null;
    $departure = $_POST['departure'] ?? null;
    $return = $_POST['return'] ?? null;
    $total_passengers = $_POST['total_passengers'] ?? 0;

    if (!$origin || !$destination || !$departure || $total_passengers < 1) {
        echo json_encode(["error" => "Invalid inputs. All fields are required."]);
        exit;
    }

    // Validate dates
    // $departure_date = DateTime::createFromFormat('Y-m-d', $departure);
    $departure_date = new DateTime($departure);
    // $return_date = $return ? DateTime::createFromFormat('Y-m-d', $return) : null;
    $return_date = null;
    $start_date = new DateTime("2024-09-01");
    $end_date = new DateTime("2024-12-01");

    if (!$departure_date || $departure_date < $start_date || $departure_date > $end_date) {
        echo json_encode(["error" => "Departure date must be between Sep 1, 2024, and Dec 1, 2024."]);
        exit;
    }

    if(!empty($return))
    {
        // $return_date = DateTime::createFromFormat('Y-m-d', $return);
        $return_date = new DateTime($return);
        if (!$return_date || $return_date < $start_date || $return_date > $end_date) {
            echo json_encode(["error" => "Return date must be between Sep 1, 2024, and Dec 1, 2024."]);
            exit;
        }
    }

    // Fetch flights matching criteria
    $stmt = $conn->prepare("SELECT * FROM Flights WHERE origin = ? AND destination = ? AND departure_date = ? AND available_seats >= ?");
    $stmt->bind_param("sssi", $origin, $destination, $departure, $total_passengers);
    $stmt->execute();
    $result = $stmt->get_result();

    $departureFlights = [];
    while ($row = $result->fetch_assoc()) {
        $departureFlights[] = $row;
    }

    // If there are no available flights, look for flights 3 days before and after the selected date
    $stmt = $conn->prepare("
        SELECT * FROM Flights
        WHERE origin = ? AND destination = ? AND departure_date BETWEEN DATE_SUB(?, INTERVAL 3 DAY) AND DATE_ADD(?, INTERVAL 3 DAY) AND available_seats >= ?
    ");
    $stmt->bind_param("sssii", $origin, $destination, $departure, $departure, $total_passengers);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $departureFlights[] = $row;
    }

    $data = ["departureFlights" => $departureFlights];

    // Handle return flights for round trip
    if ($return_date) {
        // Debugging
        // echo "Return date: $return\n";

        $stmt_return = $conn->prepare("SELECT * FROM Flights WHERE origin = ? AND destination = ? AND departure_date = ? AND available_seats >= ?");
        $stmt_return->bind_param("sssi", $destination, $origin, $return, $total_passengers);
        $stmt_return->execute();
        $result_return = $stmt_return->get_result();

        while ($row = $result_return->fetch_assoc()) {
            $returnFlights[] = $row;
        }

        // If there are no available return flights, look for flights 3 days before and after the selected date
        $stmt = $conn->prepare("
            SELECT * FROM Flights
            WHERE origin = ? AND destination = ? AND departure_date BETWEEN DATE_SUB(?, INTERVAL 3 DAY) AND DATE_ADD(?, INTERVAL 3 DAY) AND available_seats >= ?"
        );
        $stmt->bind_param("sssii", $origin, $destination, $return, $return, $total_passengers);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $returnFlights[] = $row;
        }

        $data["returnFlights"] = $returnFlights;
    }

    // Return JSON response
    // if (empty($flights)) {
    //     echo json_encode(["error" => "No flights found matching your criteria."]);
    // } else {
    //     echo json_encode($flights);
    // }
    // echo "Sending response";
    echo json_encode($data);
// }

$conn->close();
?>