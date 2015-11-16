<?php 
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "db_qbila";
	try {
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $city = $_SESSION['city_id'];
	    $stmt = $conn->prepare("SELECT * FROM products WHERE city_id=".$city);
	    $stmt->execute();
        $result = json_encode($stmt->fetchAll());
        $conn = null;

        print_r($result);
	}
	catch(PDOException $e)
    {
    	echo "Error: " . $e->getMessage();
    }
?>