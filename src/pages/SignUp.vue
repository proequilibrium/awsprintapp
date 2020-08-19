<template>
  <div class="auth">
    <h2>{{ formState === 'signUp' ? 'Registrace' : 'Potvrzeni registrace kodem z emailu' }}</h2>
    <form @submit.prevent="signUp">
      <div v-if="formState === 'signUp'">
        <q-input square filled color="teal" label="Jmeno" v-model="form.username"/>
        <q-input
          square
          filled
          color="teal"
          label="Heslo"
          type="password"
          v-model="form.password"
        />
        <q-input square filled color="teal" label="E-mail" v-model="form.email"/>
        <div class="row">
          <q-btn type="submit" label="Registrovat" class="authButton">
            <template v-slot:loading>
              <q-spinner-facebook/>
            </template>
          </q-btn>
        </div>
      </div>
      <div v-if="formState === 'confirmSignUp'">
        <q-input square filled color="teal" v-model="form.authCode"/>
        <div class="row">
          <q-btn type="submit" @click="confirmSignUp" label="Verification code" class="authButton">
            <template v-slot:loading>
              <q-spinner-facebook/>
            </template>
          </q-btn>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'home',
  props: ['toggle'],
  data () {
    return {
      formState: 'signUp',
      form: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    notifyIt (notifyTxt, notifyColor) {
      this.$q.notify({
        message: notifyTxt,
        color: notifyColor
      })
    },
    async signUp () {
      try {
        const { username, password, email } = this.form
        const { user } = await this.$Auth.signUp({
          username,
          password,
          attributes: {
            email
          }
        })
        this.notifyIt('Registrovano ' + user.username, 'blue')
        this.formState = 'confirmSignUp'
        console.log(user)
      } catch (error) {
        this.notifyIt('Chyba registrace: ' + error.message, 'red')
        console.log('Chyba registrace: ', error)
      }
    },
    async confirmSignUp () {
      const { username, authCode } = this.form
      await this.$Auth.confirmSignUp(username, authCode)
        .then(
          verifiedData =>
            this.$q.notify({
              message: 'Overovaci Kod zadan uspesne',
              color: 'purple'
            })
        )
      this.toggle()
    }
  }
}
</script>
<style>
.authButton {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #f3218a;
  border: none;
  color: white;
  outline: none;
}
.auth {
  margin: 0 auto;
  width: 460px;
}
</style>
