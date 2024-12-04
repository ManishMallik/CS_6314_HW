<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $db = "TravelingDB";

    $conn = new mysqli($servername, $username, $password, $db);
    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $phone = $_POST["phone"];
    $passwd = $_POST["password"];

    $sql = "SELECT * FROM Users WHERE phoneNumber = '$phone'";
    $result = $conn->query($sql);
    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        if(password_verify($passwd, $row["passwd"])) {
            session_start();
            $_SESSION["phone"] = $phone;
            $_SESSION["firstName"] = $row["firstName"];
            $_SESSION["lastName"] = $row["lastName"];
            $_SESSION["dob"] = $row["dateOfBirth"];
            $_SESSION["email"] = $row["email"];
            $_SESSION["gender"] = $row["gender"];
        }
    }

    $conn->close();
    // Check if session works

    // header("Location: login.html");
    // exit();
?>