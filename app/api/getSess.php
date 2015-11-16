<?php 
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "db_qbila";
	try {
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $all = array();
	    if(isset($_SESSION['admin'])){
		    $city = $_SESSION['city_id'];
		    if($_SESSION['admin'] == 1) {
		    	$stmt = $conn->prepare("SELECT * FROM city");
			    $stmt->execute();
		        $result = json_encode($stmt->fetchAll());
	        	array_push($all, $result);
		    }
	        array_push($all, $city);
	        array_push($all, $_SESSION['admin']);
        }
        print_r(json_encode($all));
	}
	catch(PDOException $e)
    {
    	echo "Error: " . $e->getMessage();
    }
?>