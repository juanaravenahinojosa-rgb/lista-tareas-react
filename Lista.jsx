import { useEffect, useState } from "react";

function Lista() {
  const [texto, setTexto] = useState("");
  const [items, setItems] = useState(() => {
    const guardados = localStorage.getItem("miLista");
    return guardados ? JSON.parse(guardados) : [];
  });

useEffect(() => {
  localStorage.setItem("miLista", JSON.stringify(items));
}, [items]);

  function agregarItem() {
  if (texto.trim() === "") return;

  setItems([...items, { texto: texto, completado: false }]);
  setTexto("");
}

  function borrarItem(index) {
    const nuevaLista = items.filter((_, i) => i !== index);
    setItems(nuevaLista);
  }
function toggleCompletado(index) {
  const nuevaLista = items.map((item, i) => {
    if (i === index) {
      return { ...item, completado: !item.completado };
    }
    return item;
  });

  setItems(nuevaLista);
}
function limpiarCompletadas() {
  const pendientes = items.filter((item) => !item.completado);
  setItems(pendientes);
}
function limpiarTodo() {
  if (confirm("¿Seguro que quieres eliminar todo?")) {
    setItems([]);
  }
}
const completadas = items.filter((item) => item.completado).length;
  return (
    <div>
      <h1>Mi lista</h1>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe algo"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            agregarItem();
          }
        }}
      />

      <button onClick={agregarItem}>Agregar</button>
<p>Tareas: {items.length}</p>
<p>Completadas: {completadas}</p>
<p>Pendientes: {items.length - completadas}</p>
<button onClick={limpiarCompletadas}>
  Limpiar completadas
</button>
<button onClick={limpiarTodo}>
  Eliminar todo
</button>
{items.length === 0 && <p>No hay tareas aún</p>}
      <ul>
{items.map((item, index) => (
  <li key={index}>
    <span
      onClick={() => toggleCompletado(index)}
      style={{
        textDecoration: item.completado ? "line-through" : "none",
        cursor: "pointer"
      }}
    >
      {item.texto}
    </span>

    <button onClick={() => borrarItem(index)}>Eliminar</button>
  </li>
))}
      </ul>
    </div>
  );
}

export default Lista;