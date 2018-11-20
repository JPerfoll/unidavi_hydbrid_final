<?php
	$db_servidor = "localhost";
	$db_usuario = "root";
	$db_senha = "";
	$db_db = "ionic";

	$db_charset = 'utf8';
	$db_collate = 'utf8_general_ci';
		
	try {
		//$conexao = new PDO("mysql:host=$db_servidor; dbname=$db_db", $db_usuario , $db_senha);
		$pdo = new PDO("mysql:host=$db_servidor;dbname=$db_db;charset=$db_charset", $db_usuario, $db_senha,
			array(
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_PERSISTENT => false,
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES $db_charset COLLATE $db_collate"
			)
		);

	} catch (PDOException $erro) {
		echo 'Erro ao conectar com o MySQL: ' . $erro->getMessage();
	}
?>