<?php 
	error_reporting(E_ERROR);
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

	header("Content-Type: text/html; charset=UTF-8",true);

    include_once("connect.php");
	
    $data = date("Y-m-d");
	
	$id_get = $_GET["id"]; 
	
	if (($id_get != null) && ($id_get != 0)) {
		$filtro = " where id = ".$id_get;
	} else {
		$filtro = "";
	}
	
	$queryString = "  select id
							,nome
							,nascimento
							,foto
							,curriculo
							,status
						from professor ".$filtro;
	
	$stmt = $pdo->query($queryString);
	
	$professorList = array();
	
    while ($professor = $stmt->fetch(PDO::FETCH_OBJ)){

		$professorList[] = array(
			"id"    => $professor->id,
			"nome" => $professor->nome,
			"nascimento" => $professor->nascimento,
			"foto" => $professor->foto,
			"curriculo" => $professor->curriculo,
			"status" => $professor->status
		);        
	}	

	echo json_encode($professorList);
?>