<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
        <div class="row">
          <router-link :to="{ name: 'todo' }" tag="span" style="cursor: pointer">
            <q-toolbar-title>PF APP</q-toolbar-title>
          </router-link>

          <div class="fixed-right">Deployment 22 Quasar v{{ $q.version }}</div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Dashboard</q-item-label>

        <div v-if="isLoggedIn">
          <q-item clickable :to="{name: 'todo'}">
            <q-item-section avatar>
              <q-icon name="note"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Udelat</q-item-label>
              <q-item-label caption>vytvori list uloh</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="isLoggedIn">
          <q-item clickable :to="{name: 'profile'}">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Profil</q-item-label>
              <q-item-label caption>ukaze profil</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="isLoggedIn">
          <q-item clickable :to="{name: 'calc'}">
            <q-item-section avatar>
              <q-icon name="dialpad"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Kalkulator</q-item-label>
              <q-item-label caption>pocitani nakladu</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="isLoggedIn">
          <q-item clickable :to="{name: 'fileup'}">
            <q-item-section avatar>
              <q-icon name="file_copy"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Nahravac</q-item-label>
              <q-item-label caption>Nahravani souboru</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="isLoggedIn">
          <q-item clickable :to="{name: 'CropPage'}">
            <q-item-section avatar>
              <q-icon name="picture_in_picture"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Retuse</q-item-label>
              <q-item-label caption>manipulace s obrazky</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="isLoggedIn">
          <q-item clickable @click="signOut">
            <q-item-section avatar>
              <q-icon name="stop"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Odhlaseni</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="!isLoggedIn">
          <q-item clickable :to="{name: 'auth'}">
            <q-item-section avatar>
              <q-icon name="group"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Prihlasi/Registruje</q-item-label>
              <q-item-label caption>Prihlaseni nebo Registrace</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MyLayout',
  data () {
    return {
      user: '',
      signedIn: 'false',
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    isLoggedIn () {
      return this.signedIn === 'signedIn'
    }
  },
  mounted () {
    this.$AmplifyEventBus.$on('authState', info => {
      this.signedIn = info
    })
  },
  beforeCreate () {
    this.$Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('MyLayout---', user)
        this.user = user
        this.signedIn = true
      })
      .catch(() => {
        this.signedIn = false
      })
  },
  methods: {
    openURL,
    async signOut () {
      await this.$Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log('ERROR', err))
      this.signedIn = false
      parent.signedIn = false
      this.$router.push({ name: 'auth' })
    }
  }
}
</script>

<style>
</style>
