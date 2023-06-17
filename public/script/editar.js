$('#editarForm').submit(function (e) {
    e.preventDefault(); // Evita que se envíe el formulario de forma tradicional
  
    var submitButton = $(this).find(':submit:focus');
    var status;
  
    if (submitButton.attr('id') === 'btnSubmitAceptar') {
      status = 'activo';
    } else if (submitButton.attr('id') === 'btnSubmitRechazar') {
      status = 'rechazado';
    }
  
    var data = $(this).serializeArray();
    data.status=status
  
    $.ajax({
      url: '/updateRegistro',
      type: 'POST',
      data: data,
      success: function (response) {
        if (response.error) {
          alert('Ha ocurrido un error, verifica tu conexión a la red');
        } else if (response.success) {
          window.location.href = '/administracion'; // Redirige a '/administracion' en caso de éxito
        }
      }
    });
  });
  
