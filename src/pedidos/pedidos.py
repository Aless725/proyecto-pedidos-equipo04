import sqlite3
from datetime import datetime
from pathlib import Path

DB_NAME = Path(__file__).parent / "pedidos.db"


def conectar():
    return sqlite3.connect(DB_NAME)


def crear_tabla():
    with conectar() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS pedidos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cliente TEXT NOT NULL,
                producto TEXT NOT NULL,
                cantidad INTEGER NOT NULL,
                total REAL NOT NULL,
                fecha TEXT NOT NULL,
                estado TEXT DEFAULT 'Pendiente'
            )
        """)


def registrar_pedido():
    print("\n=== REGISTRAR PEDIDO ===")
    cliente = input("Nombre del cliente: ").strip()
    producto = input("Producto: ").strip()

    try:
        cantidad = int(input("Cantidad: "))
        precio = float(input("Precio unitario: "))
    except ValueError:
        print("❌ Cantidad y precio deben ser números.")
        return

    total = cantidad * precio
    fecha = datetime.now().strftime("%Y-%m-%d %H:%M")

    with conectar() as conn:
        conn.execute(
            "INSERT INTO pedidos (cliente, producto, cantidad, total, fecha) VALUES (?, ?, ?, ?, ?)",
            (cliente, producto, cantidad, total, fecha)
        )
    print(f"✅ Pedido registrado. Total: S/ {total:.2f}")


def consultar_pedidos():
    print("\n=== LISTA DE PEDIDOS ===")
    with conectar() as conn:
        cursor = conn.execute("SELECT id, cliente, producto, cantidad, total, fecha, estado FROM pedidos")
        filas = cursor.fetchall()

    if not filas:
        print("📭 No hay pedidos registrados.")
        return

    print(f"{'ID':<4}{'Cliente':<15}{'Producto':<15}{'Cant':<6}{'Total':<10}{'Fecha':<18}{'Estado'}")
    print("-" * 80)
    for f in filas:
        print(f"{f[0]:<4}{f[1]:<15}{f[2]:<15}{f[3]:<6}{f[4]:<10.2f}{f[5]:<18}{f[6]}")


def menu_pedidos():
    crear_tabla()
    while True:
        print("\n--- MÓDULO PEDIDOS ---")
        print("1. Registrar pedido")
        print("2. Consultar pedidos")
        print("0. Volver")
        op = input("Opción: ").strip()

        if op == "1":
            registrar_pedido()
        elif op == "2":
            consultar_pedidos()
        elif op == "0":
            break
        else:
            print("❌ Opción inválida")


if __name__ == "__main__":
    menu_pedidos()