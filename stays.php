<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
// error_log("stays.php");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$city = $_POST['city'];
if(empty($city)){
    echo json_encode(["error" => "City cannot be empty"]);
    exit;
}

$sql = "SELECT * FROM TravelingDB.Hotel WHERE city = '$city'";

$result = $conn->query($sql);

if($result->num_rows > 0){
    $hotels = [];
    while($row = $result->fetch_assoc()){
        $hotels[] = $row;
    }
} else {
    $hotels = [];
}

echo json_encode(["hotels" => $hotels]);

// Query database for hotels in the specified city
// $stmt = $conn->prepare("SELECT hotel_id, hotel_name AS name, city, price AS pricePerNight, availableRooms FROM Hotel WHERE city = ?");
// $stmt->bind_param("s", $city);
// $stmt->execute();
// $result = $stmt->get_result();

// $hotels = [];
// while ($row = $result->fetch_assoc()) {
//     $hotels[] = $row;
// }

// // Return hotels as JSON
// echo json_encode(["hotels" => $hotels]);

$conn->close();

?>