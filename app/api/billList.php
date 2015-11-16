<?php 
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "db_qbila";
	if($_SESSION['admin'] == 0) {
		echo "Error: No Authority";
	}
	else{
		try {
		    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		    $city = $_SESSION['city_id'];
		    $stmt = $conn->prepare("SELECT * FROM sales WHERE city_id=".$city);
		    $stmt->execute();
	        $result = json_encode($stmt->fetchAll());
	        $conn = null;

	        print_r($result);
		}
		catch(PDOException $e)
	    {
	    	echo "Error: " . $e->getMessage();
	    }
	}
?>