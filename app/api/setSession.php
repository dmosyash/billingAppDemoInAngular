<?php
	session_start();
	$city = json_decode(file_get_contents('php://input'));
	$_SESSION['city_id'] = $city->city;
?>