<template>
  <main>
    <section>
      <h1 class="display-1" align="center">
        {{ queryName }}
      </h1>
      <v-row align="center" justify="center">
        <Card
          v-for="card in countryDataCards"
          :key="card.id"
          :title="card.title"
          :color="card.color"
          :icon="card.icon"
          :amount="card.amount"
        />
      </v-row>
    </section>
    <section>
      <v-row align="center" justify="center">
        <LineChart
          class="ma-1"
          v-for="visual in countryDataVisuals"
          :key="visual.index"
          :chart-data="visual.chartData"
          :options="visual.option"
        ></LineChart>
      </v-row>
    </section>
  </main>
</template>

<script>
import Card from '@/components/Card'
import LineChart from './lineChart'

export default {
  name: 'Country',

  components: {
    Card,
    LineChart
  },
  props: ['queryName'],
  data() {
      return{
        cards: [],
        visuals: []
      }
  },

  computed: {
    countryDataCards() {
      let countryData = this.$store.getters.country

      let card =[]

      card.push({title: 'Total', color: 'blue accent-1', icon: 'mdi-emoticon-sick-outline', amount: countryData.cases})
      card.push({title : 'Recoveries', color:'teal darken-1', icon: 'mdi-hospital-box-outline', amount: countryData.recoveries})
      card.push({title : 'Deaths', color:'red accent-2', icon:'mdi-skull-scan-outline', amount: countryData.deaths})

      return card
    },

    countryDataVisuals() {
      let countryData = this.$store.getters.country
      let visuals = []

      visuals.push({
        id: 1,
        chartData: {
        labels: countryData.visualLabels,
        datasets: [{
          label: 'Total cases',
          backgroundColor: '#82b1ff',
          data: countryData.visualData.cases
        }]},
        options: { responsive: true, maintainAspectRatio: false }
      })

      visuals.push({
        id: 2,
        chartData: {
        labels: countryData.visualLabels,
        datasets: [{
          label: 'Recovered',
          backgroundColor: '#00897b',
          data: countryData.visualData.recoveries
        }]},
        options: { responsive: true, maintainAspectRatio: false }
      })

      visuals.push({
        id: 3,
        chartData: {
        labels: countryData.visualLabels,
        datasets: [{
          label: 'Deaths',
          backgroundColor: '#ff5252',
          data: countryData.visualData.deaths
        }]},
        options: { responsive: true, maintainAspectRatio: false }
      })

      return visuals
    }

  }
}
</script>

<style lang="scss" scoped>
.small {
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
