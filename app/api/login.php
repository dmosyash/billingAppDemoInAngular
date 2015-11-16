<?php 
	session_start();
	$user = json_decode(file_get_contents('php://input'));
	$action = $user->action;
	$uemail = $user->uemail;
	$upass = $user->upass;
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "db_qbila";
	if($uemail == '' || $upass == '') {
		echo "Error: Invalid input u".$uemail." p".$upass." a".$user;
	}
	else {
		try {
		    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		    if($action == "login")
		    {
		    	$stmt = $conn->prepare("SELECT id,uname,phone,city_id,admin FROM user where uemail=:uemail AND upass=:upass");
		    	$stmt->bindParam(':uemail', $uemail);
		    	$stmt->bindParam(':upass', $upass);
		    	$stmt->execute();
		    	$result = $stmt->fetchAll();
        		$conn = null;
        		$_SESSION["uid"] = $result[0]['id'];
        		$_SESSION["uname"] = $result[0]['uname'];
        		$_SESSION["phone"] = $result[0]['phone'];
        		$_SESSION["city_id"] = $result[0]['city_id'];
        		$_SESSION["admin"] = $result[0]['admin'];
        		echo $_SESSION['city_id'];
		    }
		}
		catch(PDOException $e)
	    {
	    	echo "Error: " . $e->getMessage();
	    }
	}
?>