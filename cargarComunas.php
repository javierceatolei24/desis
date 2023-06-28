<?php
	

	//recibe la region seleccionada
	$region=$_POST['region'];

	//conexion a bd
	$conexion=mysqli_connect('localhost:8111','root','','desis');

	//consulta comunas de la region seleccionada
	$sql="SELECT id,comuna, region_id FROM comunas WHERE region_id = '$region'"  ;

	$result=mysqli_query($conexion,$sql);

	//imprime lo obtenido en un select
	$cadena="<label class='texto'>Comuna:</label> 
			<select id='vot_comuna' name='vot_comuna'>";

	while ($ver=mysqli_fetch_row($result)) {
		$cadena=$cadena.'<option value='.$ver[0].'>'.utf8_encode($ver[1]).'</option>';
	}

	echo  $cadena."</select>";

	
?>