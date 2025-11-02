export const initialStore = () => {
  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ],
    user: null, // Para guardar el usuario logueado
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'set_hello':
      return { ...store, message: action.payload };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map(todo => todo.id === id ? { ...todo, background: color } : todo)
      };

    case 'save_user': // Guarda usuario en el store
      return { ...store, user: action.payload };

    case 'logged_out': // Limpia el store al cerrar sesión
      return { ...store, user: null };

    default:
      throw new Error('Unknown action.');
  }
}
