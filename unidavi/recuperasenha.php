<?php 
	error_reporting(E_ERROR);
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

	header("Content-Type: text/html; charset=UTF-8",true);

    include_once("connect.php");
	
	$queryString = "  select id
							,login
							,senha
							,email
							,nome
						from usuario ";
	
	$stmt = $pdo->query($queryString);
	
    $userList = array();
    
    $secret_key = 'ionic unidavi';
 
    // hash
    
	$token = "";
	
    while ($usuario = $stmt->fetch(PDO::FETCH_OBJ)){

		$token = $usuario->login.$secret_key.$usuario->id.$usuario->senha;

		$token = hash('sha256', $token);


		$userList[] = array(
			"login"    => $usuario->login,
			"senha" => $usuario->senha,
			"nome" => $usuario->nome,
	        "email" => $usuario->email
		);
        
	}	
	

	$postData = file_get_contents("php://input");

    $json_str = json_decode($postData, true);
    
    $return = json_encode(array(
        "success" => false,
        "email" => $json_str["email"],
        "data" => array(
            "usuario" => "",
            "nome" => "",
            "token" => ""
        )
    ));

	foreach($userList as $usuario){

        if (($json_str["email"] == $usuario["email"])){
            $return = json_encode(array(
                "success" => true,
                "email" => $json_str["email"],
                "data" => array(
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