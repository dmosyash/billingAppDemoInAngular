<?php 
	session_start();
	$bill = json_decode(file_get_contents('php://input'));
	$action = $bill->action;
	$city = $_SESSION["city_id"];
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "db_qbila";
	try {
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    if($action == "save")
	    {
			$bill_no = $bill->bill_no;
			$bdate = $bill->bdate;
			$parts = json_encode($bill->particulars);
			$subtotal = $bill->subtotal;
			$extra = $bill->extra;
			$total = $bill->total;
			$parts = json_decode($parts,true);
			if($bill_no == '' || $bdate == '') {
				echo "Error: Invalid input ";
			}
			else {
		    	$stmt = $conn->prepare("INSERT INTO sales VALUES(:bill_no, :bdate, :quant, :subtotal, :extra, :total, :city)");
		    	$stmt->bindParam(':bill_no', $bill_no);
		    	$stmt->bindParam(':bdate', $bdate);
		    	$stmt->bindParam(':quant', $parts[0]['quantity']);
		    	$stmt->bindParam(':subtotal', $subtotal);
		    	$stmt->bindParam(':extra', $extra);
		    	$stmt->bindParam(':total', $total);
		    	$stmt->bindParam(':city', $city);
		    	$stmt->execute();
		    }

	    	/*$stmt = $conn->prepare("INSERT INTO sale_details VALUES(:bill_no, :city, :pname, :pquant, :amount)");
	    	for($i=0;$i<sizeof($parts);$i++) {
		    	$stmt->bindParam(':bill_no', $bill_no);
		    	$stmt->bindParam(':city', $city);
		    	$stmt->bindParam(':pname', $parts[$i]['pname']);
		    	$stmt->bindParam(':pquant', $parts[$i]['quantity']);
		    	$stmt->bindParam(':amount', $parts[$i]['amount']);
		    	$stmt->execute();
	    	}*/
    		$conn = null;
	    }
	    if($action == "delete") {
	    	$bill_no = $bill->bill_no;
	    	$stmt = $conn->prepare("DELETE FROM sales where bill_no=:id AND city_id=:city");
	    	$stmt->bindParam(':id', $bill_no);
	    	$stmt->bindParam(':city', $city);
	    	$stmt->execute();
	    	$conn = null;
	    }
	}
	catch(PDOException $e)
    {
    	echo "Error: " . $e->getMessage();
    }
?>