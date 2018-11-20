<?php 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	header("Content-Type: text/html; charset=UTF-8",true);

    include_once("connect.php");
	
    $data = date("Y-m-d");
	
	$queryString = "  select id
							 , login
							 , senha
							 , email
							 , nome
						from usuario ";
	
	$stmt = $pdo->query($queryString);
	
	$userList = array();
	$secret_key = 'ionic unidavi';    
	$token = "";
	
    while ($usuario = $stmt->fetch(PDO::FETCH_OBJ)){
		$token = $usuario->login.$secret_key.$usuario->id.$usuario->senha;
		$token = hash('sha256', $token);

		$userList[] = array(
			"id" => $usuario->id,
			"login"    => $usuario->login,
			"senha" => $usuario->senha,
			"nome" => $usuario->nome,
	        "email" => $usuario->email,
			"token" => $token
		);        
	}	


	$return = json_encode(array(
				"success" => false,
				"data" => array(
					"id" => "",
					"usuario" => "",
					"nome" => "",
					"token" => ""
				)
			));

	$postData = file_get_contents("php://input");

	$json_str = json_decode($postData, true);
	$itens = $json_str['usuario'];

	//echo $itens;

	foreach($userList as $usuario){
		if (($json_str["usuario"] == $usuario["login"]) && ($json_str["senha"] == $usuario["senha"])){
			$return = json_encode(array(
					"success" => true,
					"data" => array(
						"id" => $usuario["id"],
						"usuario" => $usuario["login"],
						"nome" => $usuario["nome"],
						"token" => $token
					)
			));
			
			break;
		}
	}

	echo $return;
?>