<?php 
	session_start();
	$product = json_decode(file_get_contents('php://input'));
	$action = $product->action;
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
		    if($action == "delete")
		    {
		    	$stmt = $conn->prepare("DELETE FROM products where id=:id");
		    	$stmt->bindParam(':id', $product->pid);
		    	$stmt->execute();
		    }
		    else {
				$pname = $product->pname;
				$prate = $product->prate;
				$city = $_SESSION['city_id'];
			    if($action == "add") {
			    	$stmt = $conn->prepare("INSERT INTO products (pname, prate, city_id) VALUES (:pname, :prate, :city)");
			    	$stmt->bindParam(':city', $city);
			    }
			    else if($action == "update")
			    {
			    	$stmt = $conn->prepare("UPDATE products SET pname=:pname, prate=:prate where id=:id");
			    	$stmt->bindParam(':id', $product->pid);
			    }
			    $stmt->bindParam(':pname', $pname);
			    $stmt->bindParam(':prate', $prate);
			    $stmt->execute();
			}
		}
		catch(PDOException $e)
	    {
	    	echo "Error: " . $e->getMessage();
	    }
	}
?>