<template>
  <q-page padding>
     <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
    >
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === calendarMonths.length ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 0" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>

      <q-step class="todo" v-for="(monthName, monthIndex) in calendarMonths" :key="monthIndex"
        :name="monthIndex"
        :title="monthName"
        :icon="settings"
        :done="step > monthIndex"
        :header-nav="step > monthIndex">
        {{ monthName }} --- {{ monthIndex }}
        <oneMonth />
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  name: 'CropPage',
  data: () => ({
    step: 0,
    calendarMonths: [
      'Leden',
      'Únor',
      'Březen',
      'Duben',
      'Květen',
      'Červen',
      'Červenec',
      'Srpen',
      'Září',
      'Říjen',
      'Listopad',
      'Prosinec'
    ] // predelat na nacteni z $q
  }),
  methods: {
  },
  components: {
    oneMonth: () => import('components/OneMonth.vue')
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
