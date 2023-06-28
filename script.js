
function enviar() {
	//recibe los valores desde los campos del fomulario
    var vot_nombre = document.getElementById('vot_nombre').value;
    var vot_alias = document.getElementById('vot_alias').value;
    var vot_rut = document.getElementById('vot_rut').value;
    var vot_email = document.getElementById('vot_email').value;
    var vot_region = document.getElementById('vot_region').value;
    var vot_comuna = document.getElementById('vot_comuna').value;
    var vot_candidato = document.getElementById('vot_candidato').value;
   	var vot_canales = document.getElementsByName('vot_canales[]');

   	//guarda los valores seleccionados en checkbox canales en un string
   	var string_canales = "";
   	string_canales = obtenerValoresCanales()

	

    //guardar todo como string.
    var formdata = 'vot_nombre=' + vot_nombre + '&vot_alias=' + vot_alias + '&vot_rut=' + vot_rut + '&vot_email=' + vot_email + '&vot_region=' + vot_region + '&vot_comuna=' + vot_comuna + '&vot_candidato=' + vot_candidato + '&vot_canales=' + string_canales ;
	
	// validación
	if (vot_nombre == '' ) {
		//valida que el campo nombre no esta vacio
		alert("Ingresar nombre");
		return false;
	}
	if (vot_alias.length < 6 ) {
		//valida que el campo alias tenga al menos 5 carcateres
		alert("Alias debe tener más de 5 caracteres");
		return false;
	}
	if (tiene_numeros(vot_alias)==0) {
		//valida que el campo alias tenga numeros
		alert("Alias debe tener numeros");
		return false;
	}
	if (tiene_letras(vot_alias)==0) {
		//valida que el campo alias tenga letras
		alert("Alias debe tener letras");
		return false;
	}
	if (formato_rut(vot_rut)==0) {
		//valida que el campo rut tenga un formato valido
		alert("Formato rut incorrecto (sin puntos y con guion(-))");
		return false;
	}
	if (valida_rut(vot_rut)==0) {
		//valida que el digito verificador del rut sea valido mediante el modulo 11
		alert("Rut inválido");
		return false;
	}
	if (valida_email(vot_email)==0) {
		//valida que el email tenga un formato valido
		alert("Email inválido");
		return false;
	}
	if (valida_canales(vot_canales)==0) {
		//valida que la cantidad de checkbox marcadas sean 2 o más
		alert("Debe elegir al menos 2 opcines en Como se entero de Nosotros ");
		return false;
	}
	else {
	// subir formulario a bd.
	$.ajax({
	 	type: "POST",
	 	url: "guardarInfo.php", //llamando el archivo
	 	data: formdata,
	 	cache: false,
	 	success: function(html) {
	  		alert(html);
	 	}
	});
	}
	return false;

}

function tiene_numeros(texto){
	//valida que la cadena 'texto' tenga numeros
	var numeros="0123456789";
   	for(i=0; i<texto.length; i++){
      	if (numeros.indexOf(texto.charAt(i),0)!=-1){
         	return 1;
      	}
   }
   return 0;
} 

function tiene_letras(texto){
	//valida que la cadena 'texto' tenga letras
	var letras="abcdefghyjklmnñopqrstuvwxyz";
   	texto = texto.toLowerCase();
   	for(i=0; i<texto.length; i++){
      	if (letras.indexOf(texto.charAt(i),0)!=-1){
         	return 1;
      	}
   	}
   	return 0;
}

function formato_rut(rut){

	//valida que la cadena 'rut' tenga al menos 9 caracateres
	if (rut.length < 9)
		return 0;

	//valida que la cadena 'rut' no tenga más de 10 caracateres
	if (rut.length > 10)
		return 0;
	//valida que la cadena 'rut' este en el formato sin punto y con guion
	if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut))
		return 0;
}

function valida_rut(rut){

	//separa el digito verificador
	arr = rut.split('-');
	numero = arr[0];
	dv = arr[1];
	//alert(arr[0]);
	//alert(arr[1]);

	//realiza el calculo matematico del Algoritmo del Módulo 11
	nuevo_numero = numero.toString().split("").reverse().join("");
    for(i=0,j=2,suma=0; i < nuevo_numero.length; i++, ((j==7) ? j=2 : j++)) {
        suma += (parseInt(nuevo_numero.charAt(i)) * j); 
    }
    n_dv = 11 - (suma % 11);
    //alert(n_dv);

    //si es 10 el digito verfificador es k
    if (n_dv == 10 ) {
    	if (dv == "k" || dv == "K"){
    		return 1;
    	}
    	else{
    		return 0;
    	}
    }

    //si es 11 el digito verfificador es 0
    if (n_dv == 11) {
    	if (dv == 0){
    		return 1;
    	}
    	else{
    		return 0;
    	}
    }
    //y para el resto es el mismo numero obtenido
    if (n_dv == dv) {
    	return 1;
    }
    else{
    	return 0;
    }
}  

function valida_email(email){

	//valida el formato del email
	// Define expresión regular valida.
	emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	
	if( emailRegex.test(email) ){
		return 1;
	}
	else{
		return 0;
	}
}

function valida_canales(canales){
	//cuenta la canitdad de checkbox seleccionadas
	var contador = 0;
    for(var i=0; i< canales.length; i++) {
        if(canales[i].checked)
            contador++
    }
    //valida que la canitdad de checkbox seleccionadas sean mas que 2
    if (contador < 2) {
    	return 0;
    }
}

function obtenerValoresCanales() {  

	//guarda las opciones selecionadas en los checkbox
  
  	var canal1 = document.getElementById("canal1");
  	var canal2 = document.getElementById("canal2");
  	var canal3 = document.getElementById("canal3");
  	var canal4 = document.getElementById("canal4");   
	
	//junta en un string las opciones selecionadas en los checkbox  
	var res=" "; 

	if (canal1.checked == true){  
		var canal1 = document.getElementById("canal1").value;  
		res = res + canal1 + "-";   
  	}
  	if (canal2.checked == true){  
		var canal2 = document.getElementById("canal2").value;  
		res = res + canal2 + "-";   
  	}
  	if (canal3.checked == true){  
		var canal3 = document.getElementById("canal3").value;  
		res = res + canal3 + "-";   
  	}
  	if (canal4.checked == true){  
		var canal4 = document.getElementById("canal4").value;  
		res = res + canal4 + "-";   
  	}

  	return res;

}
