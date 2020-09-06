<template>
  <div class="todos">
    <div v-if="$apollo.loading">
      <div class="text-xs-center">
        <q-circular-progress indeterminate size="50px" color="lime" class="q-ma-md"/>
      </div>
    </div>
    <form @submit.prevent.stop="onCreate" class="q-pa-md">
      <div class="q-pa-md" style="max-width: 420px">
        <q-input
          type="text"
          ref="name"
          filled
          color="teal"
          dense
          label="Kseft"
          clearable
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Neni jmeno']"
          v-model="name"
        />
        <q-input
          type="text"
          ref="description"
          filled
          color="teal"
          dense
          label="Popis"
          clearable
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Neni popis']"
          v-model="description"
        />
        <q-input
          type="text"
          ref="format"
          filled
          color="teal"
          dense
          label="Format uzitku"
          clearable
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Neni popis']"
          v-model="format"
        />
        <q-input
          type="number"
          ref="format"
          filled
          color="teal"
          dense
          label="Cena: "
          clearable
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Neni cena']"
          v-model="price"
        />
        <q-input
          type="date"
          ref="date"
          filled
          dense
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Chybi datum']"
          v-model="date"
        >
          <template v-slot:append>
            <q-icon name="event"></q-icon>
          </template>
        </q-input>

        <div class="row center">
          <q-btn type="submit" label="Novy ukol" class="todoButton">
            <template v-slot:loading>
              <q-spinner-facebook/>
            </template>
          </q-btn>
        </div>
      </div>
    </form>
    <ul>
      <li class="todo" v-for="(todo, index) in todos" :key="index">
        <oneTask :Task="todo" :indexTask="index" @deleted-task="deletedItem"></oneTask>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { listTodos } from '../graphql/queries'
import { createTodo } from '../graphql/mutations'
import uuidV4 from 'uuid/v4'
import { date } from 'quasar'

export default {
  name: 'Todo',
  computed: {
    date () {
      const timeStamp = Date.now()
      const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
      return formattedString
    }
  },
  data () {
    return {
      name: '',
      description: '',
      format: '',
      owner: 'foo', // this is just a placeholder and will get updated by AppSync resolver
      user: '',
      price: '',
      todos: []
    }
  },
  beforeCreate () {
    this.$Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user
        this.signedIn = true
      })
      .catch(() => this.$router.push({ name: 'auth' }))
  },
  methods: {
    onCreate () {
      this.$refs.name.validate()
      this.$refs.description.validate()
      this.$refs.date.validate()

      if (this.$refs.name.hasError || this.$refs.description.hasError || this.$refs.date.hasError) {
        this.formHasError = true
        this.$q.notify({
          color: 'negative',
          message: 'Chybi vyplnene hodnoty'
        })
      } else {
        this.createTodo()
      }
    },
    deletedItem (index) {
      console.log('Deleted item index:', index)
    },
    createTodo () {
      const name = this.name
      const date = this.date
      const description = this.description
      const format = this.format
      const owner = this.user.username
      const price = this.price

      const id = uuidV4()
      const todo = {
        name: name,
        id,
        date,
        owner,
        description,
        format,
        price,
        completed: false,
        invoiced: false
      }

      this.$apollo.mutate({
        mutation: gql(createTodo),
        variables: { input: todo },
        update: (store, { data: { createTodo } }) => {
          const data = store.readQuery({ query: gql(listTodos) })
          // if data push wil be there then will be displayed twice
          store.writeQuery({ query: gql(listTodos), data })
          data.listTodos.items.push(createTodo)
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createTodo: {
            __typename: 'Todo',
            ...todo
          }
        }
      })
        .then(data => console.log('Data Created: ', data))
        .catch(error => console.error('Data Creation: ', error))
    }
  },
  apollo: {
    todos: {
      query: gql(listTodos),
      update: data => data.listTodos.items
    }
  },
  components: {
    oneTask: () => import('components/Task.vue')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
.todoButton {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: pinkbtn;
  border: none;
  color: rgb(131, 88, 231);
  outline: none;
}
.button {
  cursor: pointer;
}
.button:hover {
  opacity: 0.5;
}
.todoname {
  margin-top: 4px;
  margin-bottom: 0px;
  font-weight: bold;
}
.text {
  margin-top: 4px;
  margin-bottom: 0px;
}
.delete {
  color: #f3218a;
}
.todo {
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  padding-top: 8px;
  padding-bottom: 9px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
