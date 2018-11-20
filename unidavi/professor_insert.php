<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	header("Content-Type: text/html; charset=UTF-8",true);

	include_once("connect.php");
	
	$postData = file_get_contents("php://input");
	$jsonObj = json_decode($postData);		
	$json = $jsonObj->json;
	
	foreach ( $json as $r ) {    
		$queryString = " insert into professor (id, nome, nascimento, foto, curriculo, status) values ('$r->id','$r->nome','$r->nascimento','$r->foto','$r->curriculo','$r->status') on duplicate key update id=values(id);"; 
		
		$stmt = $pdo->query($queryString);
	}
	
	$return = json_encode(array(
		"success" => true,
		"data" => $postData
    ));
	
	echo $return;
?>