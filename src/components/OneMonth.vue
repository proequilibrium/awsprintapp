<template>
  <q-page padding>
    <croppa
      v-model="myCroppa"
      :width="1200"
      :height="630"
      placeholder="Klikem vlozit, nebo pretahnout obrazek"
      placeholder-color="#000"
      :placeholder-font-size="16"
      canvas-color="transparent"
      :show-remove-button="false"
      remove-button-color="black"
      :remove-button-size="20"
      :show-loading="true"
      :loading-size="50"
      :prevent-white-space="true"
    >
    </croppa>
    <q-calendar
      ref="calendar"
      :locale="czlocale"
      :value="monthToShow"
    ></q-calendar>
  </q-page>
</template>

<script>

import Croppa from 'vue-croppa'

import { QCalendar } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

export default {
  name: 'CropPage',
  props: ['thisMonth'],
  data: () => ({
    myCroppa: {},
    czlocale: 'cs',
    cislo: '1',
    monthEnd: '2020-01-31'
  }),
  computed: {
    monthToShow () {
      return '2020-' + (this.thisMonth + 1).toString() + '-01'
    }
  },
  methods: {
    getLocale () {
      return 'cs'
    }
  },
  components: {
    croppa: Croppa.component,
    QCalendar
  }
}
</script>

<style scoped>
.croppa-container {
   background-color: rgb(255, 255, 255);
   border: 1px solid rgb(231, 231, 231);
   border-radius: 2px;
 }

.croppa-container:hover {
  opacity: 1;
  background-color: #FFF;
}
</style>
