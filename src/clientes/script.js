const form = document.querySelector('form');
const tableBody = document.querySelector('#tableBody');
const buttonSave = document.querySelector('button[type="submit"]');

let rowEditing = null;

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const typeDoc = document.getElementById('tipoDocumento').value;
    const numDoc = document.getElementById('numDocumento').value;
    const name = document.getElementById('nombreCliente').value;
    const email = document.getElementById('emailCliente').value;
    const direction = document.getElementById('direccionCliente').value;

    if (rowEditing) {
        rowEditing.cells[0].innerHTML = `<strong>${typeDoc}:</strong> <span class="doc-num">${numDoc}</span>`;
        rowEditing.cells[1].textContent = name;
        rowEditing.cells[2].textContent = email;
        rowEditing.cells[3].textContent = direction;

        rowEditing = null;
        buttonSave.textContent = 'Guardar Cliente';
        buttonSave.className = 'btn btn-success w-100 fw-bold';
    } else {
        const newRow = `
        <tr>
                <td><strong>${typeDoc}:</strong> <span class="doc-num">${numDoc}</span></td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${direction}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-editar">Editar</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', newRow);
    }

    form.reset();
});

tableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-editar')) {
        rowEditing = event.target.closest('tr');

        const textDocComplete = rowEditing.cells[0].textContent;
        const typeDoc = textDocComplete.split(':')[0].trim();
        const numDoc = rowEditing.cells[0].querySelector('.doc-num').textContent;
        const name = rowEditing.cells[1].textContent;
        const email = rowEditing.cells[2].textContent;
        const direction = rowEditing.cells[3].textContent;

        document.getElementById('tipoDocumento').value = typeDoc;
        document.getElementById('numDocumento').value = numDoc;
        document.getElementById('nombreCliente').value = name;
        document.getElementById('emailCliente').value = email;
        document.getElementById('direccionCliente').value = direction;

        buttonSave.textContent = 'Actualizar Cambios';
        buttonSave.className = 'btn btn-info w-100 fw-bold text-white';
    }
document.addEventListener("DOMContentLoaded", () => {
    const formCliente = document.getElementById("formCliente");
    const tablaClientes = document.getElementById("tablaClientes");

    // Función para cargar y mostrar los clientes en la tabla
    function cargarClientes() {
        tablaClientes.innerHTML = "";
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        clientes.forEach((cliente) => {
            const fila = document.createElement("tr");
            fila.className = "border-b border-neutral-800 hover:bg-neutral-800/50 transition";
            fila.innerHTML = `
                <td class="py-3 px-3 text-white">${cliente.nombre}</td>
                <td class="py-3 px-3 text-neutral-300">${cliente.email}</td>
            `;
            tablaClientes.appendChild(fila);
        });
    }

    // Evento para registrar un nuevo cliente
    formCliente.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombreCliente").value.trim();
        const email = document.getElementById("emailCliente").value.trim();

        if (nombre && email) {
            const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
            clientes.push({ nombre, email });
            localStorage.setItem("clientes", JSON.stringify(clientes));

            formCliente.reset();
            cargarClientes();
        }
    });

    // Cargar los clientes al abrir la página
    cargarClientes();
});