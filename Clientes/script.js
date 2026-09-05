const formulario = document.querySelector('form');
const tablaBody = document.querySelector('table tbody');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const tipoDoc = document.getElementById('tipoDocumento').value;
    const numDoc = document.getElementById('numDocumento').value;
    const nombre = document.getElementById('nombreCliente').value;
    const email = document.getElementById('emailCliente').value;
    const direccion = document.getElementById('direccionCliente').value;

    const nuevaFila = `
        <tr>
            <td><strong>${tipoDoc}:</strong> ${numDoc}</td>
            <td>${nombre}</td>
            <td>${email}</td>
            <td>${direccion}</td>
            <td>
                <button class="btn btn-sm btn-warning">Editar</button>
            </td>
        </tr>
    `;

    tablaBody.insertAdjacentHTML('beforeend', nuevaFila);

    formulario.reset();
});