<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE TABLE IF NOT EXISTS Hotel(
    hotel_id VARCHAR(4) PRIMARY KEY NOT NULL,
    hotel_name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Hotel Table successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

$sql = "CREATE TABLE IF NOT EXISTS Hotel_Bookings(
    hotel_booking_id INT PRIMARY KEY NOT NULL,
    hotel_id VARCHAR(4) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    totalRooms INT NOT NULL,
    pricePerNight DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id)
)";
if ($conn->query($sql) === TRUE) {
    echo "Hotel_Bookings Table successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

$sql = "CREATE TABLE IF NOT EXISTS Guests(
    SSN VARCHAR(15) NOT NULL,
    hotel_booking_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    category ENUM('adult', 'child', 'infant') NOT NULL,
    PRIMARY KEY (SSN, hotel_booking_id),
    FOREIGN KEY (hotel_booking_id) REFERENCES Hotel_Bookings(hotel_booking_id)
)";
if ($conn->query($sql) === TRUE) {
    echo "Guests Table successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

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
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
echo "Hotels loaded successfully";
?>