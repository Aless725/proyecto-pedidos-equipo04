const formPedido = document.getElementById("formPedido");
const nombreCliente = document.getElementById("nombreCliente");
const selectProducto = document.getElementById("selectProducto");
const precioProducto = document.getElementById("precioProducto");
const tableBody = document.getElementById("tableBody");
const inputBuscar = document.getElementById("inputBuscar");

const formTitle = document.getElementById("formTitle");
const buttonSave = document.getElementById("buttonSave");
const buttonCancel = document.getElementById("buttonCancel");

let pedidos = [];
let editIndex = null;

// Mostrar el precio
selectProducto.addEventListener("change", () => {
    const option = selectProducto.options[selectProducto.selectedIndex];
    precioProducto.value = option.dataset.precio;
});

// Guardar el pedido
formPedido.addEventListener("submit", (e) => {
    e.preventDefault();

    const pedido = {
        cliente: nombreCliente.value,
        hamburguesa: selectProducto.value,
        precio: parseFloat(precioProducto.value).toFixed(2)
    };

    if (editIndex === null) {
        pedidos.push(pedido);
    } else {
        pedidos[editIndex] = pedido;
        editIndex = null;

        formTitle.textContent = "Tomar Nuevo Pedido";
        buttonSave.textContent = "Guardar Pedido";
        buttonCancel.classList.add("d-none");
    }

    renderTabla();
    formPedido.reset();
    precioProducto.value = "";
});

// Mostrar tabla
function renderTabla(lista = pedidos) {
    tableBody.innerHTML = "";

    lista.forEach((pedido, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${pedido.cliente}</td>
                <td>${pedido.hamburguesa}</td>
                <td>S/. ${pedido.precio}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2"
                        onclick="editarPedido(${index})">
                        Editar
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="eliminarPedido(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

// Editar pedido
function editarPedido(index) {
    const pedido = pedidos[index];

    nombreCliente.value = pedido.cliente;
    selectProducto.value = pedido.hamburguesa;
    precioProducto.value = pedido.precio;

    editIndex = index;

    formTitle.textContent = "Editar Pedido";
    buttonSave.textContent = "Actualizar Pedido";
    buttonCancel.classList.remove("d-none");
}

// Eliminar pedido
function eliminarPedido(index) {
    if (confirm("¿Deseas eliminar este pedido?")) {
        pedidos.splice(index, 1);
        renderTabla();
    }
}

// Cancelar edición
buttonCancel.addEventListener("click", () => {
    formPedido.reset();
    precioProducto.value = "";

    editIndex = null;

    formTitle.textContent = "Tomar Nuevo Pedido";
    buttonSave.textContent = "Guardar Pedido";
    buttonCancel.classList.add("d-none");
});

// Buscar pedidos
inputBuscar.addEventListener("keyup", () => {
    const texto = inputBuscar.value.toLowerCase();

    const resultado = pedidos.filter(pedido =>
        pedido.cliente.toLowerCase().includes(texto) ||
        pedido.hamburguesa.toLowerCase().includes(texto)
    );

    renderTabla(resultado);
});