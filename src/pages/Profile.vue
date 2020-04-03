<template>
  <div>
    <h3>Ucet, </h3>
    <div>Email: {{user.attributes.email}}</div>
    <div>S3 jmeno bucketu: {{$S3bucketname}}</div>
    <div>S3 connection: {{$S3conn}}</div>
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
