<?php
//trae la informacion desde la base d datos para los select regiones y candidatos
require 'cargarSelect.php';

?>

<!DOCTYPE html>
<html>
  <head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <link href="style.css" rel="stylesheet"> 
    <script type="text/javascript" src="script.js"></script>
    <link href="style.css" rel="stylesheet"> 
  </head>
  <body>
    <form name="form">
      <h3>FORMULARIO DE VOTACIÓN</h3>
      <div class="form-group">
        <label class="texto">Nombre y apellido :</label> 
        <input class="respuesta" type="text" name="vot_nombre" id="vot_nombre" />
      </div>

      <div class="form-group">
        <label class="texto">Alias :</label> 
        <input class="respuesta" type="text" name="vot_alias" id="vot_alias" />
      </div>

      <div class="form-group">
        <label class="texto">Rut :</label> 
        <input class="respuesta" type="text" name="vot_rut" id="vot_rut" />
      </div>

      <div class="form-group">
        <label class="texto">Email :</label> 
        <input class="respuesta" type="email" name="vot_email" id="vot_email" />
      </div>

      <div class="form-group">

        <label class="texto">Región :</label> 

        <select name="vot_region" id="vot_region">

          <?php
            //muestra lo obtenido en cargarSelect.php
            while($obj=mysqli_fetch_row($result)){ 
          ?>
            <option value="<?php echo $obj[0] ?>"><?php echo $obj[1];?></option>
          <?php
            }
          ?>

        </select>
      </div>

      <div id="div_comuna" class="form-group"></div>

      <div class="form-group">

        <label class="texto">Candidato :</label> 

        <select name="vot_candidato" id="vot_candidato">


          <?php
            //muestra lo obtenido en cargarSelect.php
            while($obj2=mysqli_fetch_row($result2)){ 
          ?>
            <option value="<?php echo $obj2[0] ?>"><?php echo $obj2[1];?></option>
          <?php
            }
          ?>

        </select>
      </div>

      <div class="form-group">

        <label class="texto">Como se entero de Nosotros :</label> 
        
          <input type="checkbox" id="canal1" name="vot_canales[]" value="Web">
          <label for="canal1"> Web</label>
          <input type="checkbox" id="canal2" name="vot_canales[]" value="TV">
          <label for="canal2"> TV</label>
          <input type="checkbox" id="canal3" name="vot_canales[]" value="Redes sociales">
          <label for="canal3"> Redes Sociales</label>
          <input type="checkbox" id="canal4" name="vot_canales[]" value="Amigo">
          <label for="canal4">Amigo</label>
        
      </div>

      <input id="submit" class="submit" onclick="enviar()" type="button" value="Votar">

    </form>
  </body>
</html>

<script type="text/javascript">
  //script para cargar la comunas en base a la región seleccionada
  $(document).ready(function(){
    $('#vot_region').val(1);
    recargarLista();

    $('#vot_region').change(function(){
      recargarLista();
    });
  })
</script>
<script type="text/javascript">
  function recargarLista(){
    $.ajax({
      type:"POST",
      url:"cargarComunas.php",
      data:"region=" + $('#vot_region').val(),
      success:function(r){
        $('#div_comuna').html(r);
      }
    });
  }
</script>