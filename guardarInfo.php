<?php

//guarda en variables los valores recibidos
$vot_nombre = $_POST['vot_nombre'];
$vot_alias = $_POST['vot_alias'];
$vot_rut = $_POST['vot_rut'];
$vot_email = $_POST['vot_email'];
$vot_region = $_POST['vot_region'];
$vot_comuna = $_POST['vot_comuna'];
$vot_candidato = $_POST['vot_candidato'];
$vot_canales = $_POST['vot_canales'];

//conexión a bd
$servername = "localhost:8111";
$database = "desis";
$username = "root";
$password = "";

$conn = mysqli_connect($servername, $username, $password, $database);

// Confirma conexión
if (!$conn) {
     die("Connection failed: " . mysqli_connect_error());
}
//echo "Conexión completada";

//revisa si el rut no está registardo previamente
$sql2="SELECT * FROM votante WHERE vot_rut = '$vot_rut'";

$result=mysqli_query($conn,$sql2);
$contador=0;
while ($ver=mysqli_fetch_row($result)) {
	$contador=$contador+1;
}   
 
if($contador > 0){
	//si encuentra coincidencia no registra el voto
  	echo "EL Rut ingresado ya fue usado para votar";
}
else{
	//si no encuentra conicidencias registra el voto en la bd
	$sql = "INSERT INTO votante (vot_id, vot_nombre, vot_alias, vot_rut, vot_email, vot_region, vot_comuna, vot_candidato, vot_canales) VALUES ('', '$vot_nombre','$vot_alias','$vot_rut','$vot_email','$vot_region', '$vot_comuna', '$vot_candidato', '$vot_canales')";
	if (mysqli_query($conn, $sql)) {
    	echo "Voto registardo";
	} 
	else {
    	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	} 
}

mysqli_close($conn);
?>    