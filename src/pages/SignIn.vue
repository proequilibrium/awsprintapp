<template>
  <div class="auth">
    <h2>Prihlaseni</h2>
    <form @submit.prevent="signIn">
      <q-input square filled color="teal" label="Jmeno" v-model="form.username"/>
      <q-input square filled color="teal" label="Heslo" type="password" v-model="form.password"/>
      <div class="row">
        <q-btn type="submit" label="Prihlasit" class="authButton">
          <template v-slot:loading>
            <q-spinner-facebook/>
          </template>
        </q-btn>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'SignIn',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      returnObject: ''
    }
  },
  methods: {
    showNotif (notifyText) {
      this.$q.notify({
        message: notifyText,
        color: 'purple'
      })
    },
    signInTst () {
      console.log('signIntst')
    },
    async signIn () {
      const { username, password } = this.form
      console.log('PRIHLASUJI')
      await this.$Auth.signIn(username, password)
        .then(
          (returnObject) => {
            this.showNotif('Prihlaseno: ' + returnObject.attributes.email)
            this.$AmplifyEventBus.$emit('authState', 'signedIn')
            console.log('Prihlaseno')
            this.$router.push({ name: 'todo' })
          },
          (reason) => {
            this.showNotif('Prihlaseni se nezdarilo')
            this.$AmplifyEventBus.$emit('authState', 'signedOut')
            console.log('Prihlaseno')
            parent.signedIn = false
            console.log(reason)
          }
        )
        .catch((err) => console.log('chycena chyba: ', err))
    }
  }
}
</script>
<style>
.authButton {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: green;
  border: none;
  color: white;
  outline: none;
}
.auth {
  margin: 0 auto;
  width: 460px;
}
</style>
