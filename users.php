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
    phoneNumber VARCHAR(15) PRIMARY KEY NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    dateOfBirth DATE NOT NULL,
    gender ENUM('Male', 'Female') DEFAULT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
)";
if ($conn->query($sql) === TRUE) {
    echo "Users Table successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

// $sql = "INSERT INTO Users (phoneNumber, passwd, firstName, lastName, dateOfBirth, gender, email) VALUES ('123-456-7890', 'password', 'John', 'Doe', '01/01/2001', 'Male', 'doe@gmail.com')";

// if ($conn->query($sql) === TRUE) {
//     echo "New record created successfully";
// } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
// }

$conn->close();
?>