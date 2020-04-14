<template>
  <q-page padding>
    <croppa
      v-model="myCroppa"
      :width="350"
      :height="630"
      placeholder="Yes, you can modify the text here"
      placeholder-color="#000"
      :placeholder-font-size="16"
      canvas-color="transparent"
      :show-remove-button="true"
      remove-button-color="black"
      :remove-button-size="10"
      :show-loading="true"
      :loading-size="50"
      loading-color="#060606">
    </croppa>
  </q-page>
</template>

<script>
import Vue from 'vue'
import Croppa from 'vue-croppa'

Vue.component('croppa', Croppa.component)

export default {
  name: 'CropPage',
  data () {
    return {
      myCroppa: {}
    }
  }
}
</script>

<style scoped>
.croppa-container {
   background-color: lightblue;
   border: 2px solid grey;
   border-radius: 8px;
 }

.croppa-container:hover {
  opacity: 1;
  background-color: #8ac9ef;
}
</style>
