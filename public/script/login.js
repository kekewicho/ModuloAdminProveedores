$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault(); // Evita que se envíe el formulario de forma tradicional
        
        $.ajax({
            url: 'submitLogin',
            type: 'POST',
            data: $(this).serializeArray(),
            success: function(response) {
                if (response.status=='success') {
                    window.location.href='/administracion';
                } else {
                    alert("Las credenciales ingresadas no coinciden con nignun registro");
                }
            }
        });

    });
});