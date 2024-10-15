<template>
  <div class="todo-container">
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add a new task..." required>
      <button type="submit">Add</button>
      <button type="button" @click="startDictation">Dictate</button>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.completed">
        <span v-if="!todo.isEditing" :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <input v-else type="text" v-model="todo.text" @keyup.enter="saveEdit(index)" @blur="saveEdit(index)">
        <button v-if="!todo.isEditing" @click="editTodo(index)">Edit</button>
        <button v-if="todo.isEditing" @click="saveEdit(index)">Save</button>
        <button @click="removeTodo(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoApp',
  data() {
    return {
      newTodo: '',
      todos: [],
      recognition: null
    };
  },
  created() {
    this.loadTodos();
    this.setupRecognition();
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === '') return;
      this.todos.push({ text: this.newTodo, completed: false, isEditing: false });
      this.newTodo = '';
      this.saveTodos();
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    editTodo(index) {
      this.todos[index].isEditing = true;
    },
    saveEdit(index) {
      this.todos[index].isEditing = false;
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    loadTodos() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    },
    setupRecognition() {
      if (!('webkitSpeechRecognition' in window)) {
        console.error('Web Speech API not supported in this browser.');
        return;
      }
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.onresult = (event) => {
        if (event.results.length > 0) {
          this.newTodo = event.results[0][0].transcript;
          this.addTodo();
        }
      };
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
      };
    },
    startDictation() {
      if (this.recognition) {
        this.recognition.start();
      }
    }
  }
};
</script>

<style>
.todo-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

form {
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 10px;
  width: calc(100% - 22px);
}

button {
  padding: 10px;
  margin-left: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.completed {
  text-decoration: line-through;
}

input[type="text"].edit-input {
  flex: 1;
  margin-right: 10px;
}
</style>
