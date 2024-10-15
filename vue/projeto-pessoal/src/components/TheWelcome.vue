<script setup>
import { ref, onMounted } from 'vue';

const newTodo = ref('');
const newTitle = ref('');
const newNotes = ref('');
const newDateTime = ref('');
const todos = ref([]);

onMounted(() => {
  loadTodos();
});

const addTodo = () => {
  if (newTodo.value.trim() === '') return;
  todos.value.push({ 
    text: newTodo.value, 
    title: newTitle.value,
    notes: newNotes.value,
    dateTime: newDateTime.value,
    completed: false 
  });
  newTodo.value = '';
  newTitle.value = '';
  newNotes.value = '';
  newDateTime.value = '';
  saveTodos();
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
  saveTodos();
};

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
};

const loadTodos = () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
};
</script>

<template>
  <div class="todo-container">
    <div class="todo-container" id="notaForm">
      <div class="form-group">
        <label for="titulo-notas">Selecionar bate-papo</label>
        <select class="form-control" id="titulo-notas">
          <option>Selecione um bate-papo</option>
          <!-- As opções serão preenchidas aqui -->
        </select>
      </div>
      <div class="form-group">
        <label for="opcao-nota-tipo">Selecionar Tipo</label>
        <select class="form-control" id="opcao-nota-tipo">
          <option>grupo</option>
          <option>individual</option>
        </select>
      </div>
      <div class="form-group">
        <label for="notas-input">Assunto</label>
        <input type="text" class="form-control" v-model="newTitle" id="notas-input" maxlength="70" required>
        <small id="assuntoHelp" class="form-text text-muted">Título *</small>
      </div>
      <div class="form-group">
        <label for="opcao-notas">Notas *</label>
        <textarea class="form-control" v-model="newNotes" id="opcao-notas" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="opcao-notas-name">Data e hora</label>
        <textarea class="form-control" v-model="newDateTime" id="opcao-notas-name" rows="3"></textarea>
      </div>
    </div>
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add a new task..." required>
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.completed">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <p>{{ todo.title }}</p>
        <p>{{ todo.notes }}</p>
        <p>{{ todo.dateTime }}</p>
        <button @click="removeTodo(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
