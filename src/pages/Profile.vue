<template>
  <div>
    <h3>Ucet, </h3>
    <div>Email: {{user.attributes.email}}</div>
    <div>Code: {{user.username}}</div>
    <div>Lang: {{this.$q.lang.getLocale()}}</div>
    <div>S3 jmeno bucketu: {{$Storage}}</div>
  </div>
</template>
<script>
export default {
  name: 'Profile',
  components: {
  },
  data () {
    return {
      user: '',
      signedIn: false
    }
  },
  beforeCreate () {
    this.$Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user
        this.signedIn = true
      })
      .catch(() => console.log('not signed in...'))
  }
}
</script>
<style>
</style>
