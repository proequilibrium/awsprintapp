<template>
  <div>
    <h3>Ucet, </h3>
    <div>Email: {{user.attributes.email}}</div>
    <div>Code: {{user.username}}</div>
    <div>S3 jmeno bucketu: {{$S3storage}}</div>
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
