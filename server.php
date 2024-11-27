<!-- Translating whatever code is in server.js to php -->
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = $_SERVER["REQUEST_URI"];

$servername = "localhost";
$username = "root";
$password = "password";

$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE DATABASE IF NOT EXISTS TravelingDB";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->close();

// function readXML($xml) {
//     if (file_exists($xml)) {
//         $xml = simplexml_load_file($xml);
//         return $xml;
//     } else {
//         exit('Failed to open the XML file');
//     }
// }

// function writeXML($xml_file, $data) {
//     $xmlString = $data->asXML();
//     file_put_contents($xml_file, $xmlString);
// }

?>