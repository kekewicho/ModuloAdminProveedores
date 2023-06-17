function filter(text) {
    const tabla=document.getElementById('contenidoTabla')

    $.ajax({
        url: '/queryProveedor',
        type: 'POST',
        data: {'rfc':text},
        success:function(response){
            if (response.status=='encontrado') {
                const data=response.data
                
                if (data.status=='pendiente') {icon='<td><i class="bi bi-hourglass"></i></td>'}
                if (data.status=='aprobado') {icon='<td><i class="bi bi-check2-all"></i></td>'}
                if (data.status=='rechazado') {icon='<td><i class="bi bi-x-lg"></i></td>'}

                const row=`
                    <tr>
                        <th scope="row"></th>
                        <td>${data.rfc}</td>
                        <td>${data.razonSocial}</td>
                        <td>${data.giro}</td>
                        <td>${data.entidad}</td>
                        ${icon}
                        <td><button class="btn btn-outline-danger" onclick="window.location.href='/editarRegistro/${data.rfc}'"><i class="bi bi-eye"></i></button></td>            
                    </tr>`
                
                tabla.innerHTML=row
            } else {
                tabla.innerHTML=
                '<tr>'+
                '    <td colspan="7" style="text-align: center;">'+
                '    <h5>Ningún registro coincide con los parametros brindados</h5>'+
                '    </td>'+
                '</tr>'
            }
        }
    })
}