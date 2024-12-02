<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// After validating the user’s inputs,
// you should insert the user’s information into the “users” table in your database.
// Users table has 7 fields including Phone number, Password , FirstName, LastName, Date of birth, Gender, and Email. Phone number is a unique number in
// the table. After inserting the above information into the table successfully, you
// should prompt the user.

$sql = "CREATE TABLE IF NOT EXISTS Users (
    phoneNumber VARCHAR(30) PRIMARY KEY NOT NULL,
    passwd VARCHAR(30) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    dateOfBirth VARCHAR(30) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL
)";
if ($conn->query($sql) === TRUE) {
    echo "Users Table successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->close();
?>