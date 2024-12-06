<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

// ini_set('display_errors', 0);
// ini_set('display_startup_errors', 0);
// error_reporting(0);

$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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

if($return != null)
{
    // $return_date = DateTime::createFromFormat('Y-m-d', $return);
    $return_date = new DateTime($return);
    if (!$return_date || $return_date < $start_date || $return_date > $end_date) {
        echo json_encode(["error" => "Return date must be between Sep 1, 2024, and Dec 1, 2024."]);
        exit;
    }
}

// Fetch flights matching criteria
// $stmt = $conn->prepare("SELECT * FROM Flights WHERE origin = ? AND destination = ? AND departure_date = ? AND available_seats >= ?");
// $stmt->bind_param("sssi", $origin, $destination, $departure, $total_passengers);
// $stmt->execute();
// $result = $stmt->get_result();
$result = $conn->query("SELECT * FROM Flights WHERE origin = '$origin' AND destination = '$destination' AND departure_date BETWEEN DATE_SUB('$departure', INTERVAL 3 DAY) AND DATE_ADD('$departure', INTERVAL 3 DAY) AND available_seats >= $total_passengers");

if($result->num_rows > 0)
{
    $departureFlights = [];
    while ($row = $result->fetch_assoc()) {
        $departureFlights[] = $row;
    }
} else {
    $result = $conn->query("SELECT * FROM Flights WHERE origin = '$origin' AND destination = '$destination' AND departure_date BETWEEN DATE_SUB('$departure', INTERVAL 3 DAY) AND DATE_ADD('$departure', INTERVAL 3 DAY) AND available_seats >= $total_passengers");

    if($result->num_rows > 0)
    {
        while ($row = $result->fetch_assoc()) {
            $departureFlights[] = $row;
        }
    } else {
        $departureFlights = [];
    }
}

// If there are no available flights, look for flights 3 days before and after the selected date
// $stmt = $conn->prepare("
//     SELECT * FROM Flights
//     WHERE origin = ? AND destination = ? AND departure_date BETWEEN DATE_SUB(?, INTERVAL 3 DAY) AND DATE_ADD(?, INTERVAL 3 DAY) AND available_seats >= ?
// ");
// $stmt->bind_param("sssii", $origin, $destination, $departure, $departure, $total_passengers);
// $stmt->execute();
// $result = $stmt->get_result();

$data = ["departureFlights" => $departureFlights];

// Handle return flights for round trip
if ($return) {
    // Debugging
    // echo "Return date: $return\n";

    // $return_date = new DateTime($return);
    $result_return = $conn->query("SELECT * FROM Flights WHERE origin = '$destination' AND destination = '$origin' AND departure_date BETWEEN DATE_SUB('$return', INTERVAL 3 DAY) AND DATE_ADD('$return', INTERVAL 3 DAY) AND available_seats >= $total_passengers");

    if($result_return->num_rows > 0)
    {
        $returnFlights = [];
        while ($row = $result_return->fetch_assoc()) {
            $returnFlights[] = $row;
        }
    } else {
        $result_return = $conn->query("SELECT * FROM Flights WHERE origin = '$destination' AND destination = '$origin' AND departure_date BETWEEN DATE_SUB('$return', INTERVAL 3 DAY) AND DATE_ADD('$return', INTERVAL 3 DAY) AND available_seats >= $total_passengers");

        if($result_return->num_rows > 0)
        {
            while ($row = $result_return->fetch_assoc()) {
                $returnFlights[] = $row;
            }
        } else {
            $returnFlights = [];
        }
    }

    $data["returnFlights"] = $returnFlights;
}
$conn->close();
// Return JSON response
// if (empty($flights)) {
//     echo json_encode(["error" => "No flights found matching your criteria."]);
// } else {
//     echo json_encode($flights);
// }
// echo "Sending response";
echo json_encode($data);
// }
?>