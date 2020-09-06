<template>
  <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <p class="todoname">{{ Task.name }}</p>
      <p class="text">{{ Task.description }}</p>
      <p class="text">format: {{ Task.format }}</p>
      <p class="text">termin: {{ Task.date }}</p>
      <p class="number">cena: {{ Task.price }}</p>
      <q-btn
        @click="toggleComplete(Task)"
        class="text button"
      >{{ Task.completed ? 'hotovo' : 'rozdelano' }}</q-btn>
          <q-btn style="background: pinkbtn; color: white" label="Smazat zaznam"  @click="deleteTodo(Task)" class="text button delete" />
  </q-card>
</template>

<script>
import gql from 'graphql-tag'
import { listTodos } from '../graphql/queries'
import { deleteTodo, updateTodo } from '../graphql/mutations'

export default {
  name: 'Task',
  props: ['Task', 'indexTask'],
  data () {
    return {
    }
  },
  methods: {
    deleteTodo (Task) {
      this.$apollo.mutate({
        mutation: gql(deleteTodo),
        variables: {
          input: { id: Task.id }
        },
        update: (store, { data: { deleteTodo } }) => {
          const data = store.readQuery({ query: gql(listTodos) })
          data.listTodos.items = data.listTodos.items.filter(Task => Task.id !== deleteTodo.id)
          store.writeQuery({ query: gql(listTodos), data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteTodo: {
            __typename: 'Todo',
            ...Task
          }
        }
      })
        .then(data => this.$emit('deleted-task', this.indexTask))
        .catch(error => console.error('Deletion ERROR: ', error))
    },
    toggleComplete (Task) {
      const updatedTodo = {
        ...Task,
        completed: !Task.completed
      }
      // graphql layers dont like __typename in our object
      delete updatedTodo.__typename

      this.$apollo.mutate({
        mutation: gql(updateTodo),
        variables: { input: updatedTodo },
        update: (store, { data: { updateTodo } }) => {
          const data = store.readQuery({ query: gql(listTodos) })
          const index = data.listTodos.items.findIndex(item => item.id === updateTodo.id)
          data.listTodos.items[index] = updateTodo
          store.writeQuery({ query: gql(listTodos), data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateTodo: {
            __typename: 'Todo',
            ...updatedTodo
          }
        }
      })
        .then(data => console.log('Toggle_complete: ', data))
        .catch(error => console.error('Toggle Problem: ', error))
    }
  }
}
</script>
