<?php

	//conexion a la base dedatos

	$conexion=mysqli_connect('localhost:8111','root','','desis');

	//consulta para las regiones y candidatos

	$sql="SELECT id,region FROM regiones";

	$sql2="SELECT id,candidato FROM candidatos";

	//resultados de las consultas

	$result=mysqli_query($conexion,$sql);

	$result2=mysqli_query($conexion,$sql2);

	
?>

