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