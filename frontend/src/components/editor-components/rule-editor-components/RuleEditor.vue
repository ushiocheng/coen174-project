<!-- <template>
  <div id="ruleeditor">
    <p>RulesEditor/RuleEditor</p>
    <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <v-btn id="addrule">Add Rule</v-btn>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <v-btn @click="removeTodo(todo)">X</v-btn>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
  </div>
</template>

<script lang="ts">
let id = 1
export default {
  data() {
    return {
      newTodo: '',
      hideCompleted: false,
      todos: [      ]
    }
  },
  computed: {
    // ...
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
</script>

<style>
#addrule{
  background-color: #79f6fc;
}
#ruleeditor{ 
  margin: 10px;
  background-color: #f4f2f0;
  border-radius: 5px;
  padding:5px;
}
</style> -->
