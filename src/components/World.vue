<template>
  <main>
    <section>
      <h1 class="display-1" align="center">Worlds statistic</h1>
      <v-row align="center" justify="center">
        <Card
          v-for="card in totalCardsData"
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
          v-for="visual in visuals"
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
  name: 'World',

  components: {
    Card,
    LineChart
  },

  data() {
      return{
        cards: [],
        visuals: [],
        continents: null,
        allData: null
      }
  },

  computed: {
    totalCardsData() {

      let totalStatData = this.$store.getters.totalStat
      console.log('totalStatData = ', totalStatData.cases)

      let card =[]

      card.push({title: 'Total', color: 'blue accent-1', icon: 'mdi-emoticon-sick-outline', amount: totalStatData.cases})
      card.push({title : 'Recoveries', color:'teal darken-1', icon: 'mdi-hospital-box-outline', amount: totalStatData.recoveries})
      card.push({title : 'Deaths', color:'red accent-2', icon:'mdi-skull-scan-outline', amount: totalStatData.deaths})

      return card
    }
  },

  mounted() {
    this.axios
      .get('https://corona.lmao.ninja/v2/continents')
      .then(response => { this.continents = response; this.updateStats()})
      .catch(error => {console.error(error);})

    this.axios
      .get('https://corona.lmao.ninja/v2/historical/all')
      .then(response => { this.allData = response; this.updateVisuals() })
  },

  methods: {
    updateStats() {
      let data = this.continents.data

      let cases = 0
      let deaths = 0
      let recoveries = 0

      for(let elem of data) {
        cases += elem.cases
        deaths += elem.deaths
        recoveries += elem.recovered
      }

      this.cards[0].amount += cases
      this.cards[1].amount += deaths
      this.cards[2].amount += recoveries
    },

    updateVisuals() {
      let dataCases = this.allData.data.cases
      let dataRecoveries = this.allData.data.recovered
      let dataDeaths = this.allData.data.deaths

      let lablesCases = []
      let casesPerDay = []

      let lablesRecoveries = []
      let recoveriesPerDay = []

      let lablesDeaths = []
      let deathsPerDay = []

      for(let key in dataCases) {
        lablesCases.push(key)
        casesPerDay.push(dataCases[key])
      }

      for(let key in dataRecoveries) {
        lablesRecoveries.push(key)
        recoveriesPerDay.push(dataRecoveries[key])
      }

      for(let key in dataDeaths) {
        lablesDeaths.push(key)
        deathsPerDay.push(dataDeaths[key])
      }



      this.visuals.push({
        id: 1,
        chartData: {
        labels: lablesCases,
        datasets: [{
          label: 'Total cases',
          backgroundColor: '#82b1ff',
          data: casesPerDay
        }]},
        options: { responsive: true, maintainAspectRatio: false }
      })

      this.visuals.push({
        id: 2,
        chartData: {
        labels: lablesRecoveries,
        datasets: [{
          label: 'Recovered',
          backgroundColor: '#00897b',
          data: recoveriesPerDay
        }]},
        options: { responsive: true, maintainAspectRatio: false }
      })

      this.visuals.push({
        id: 3,
        chartData: {
        labels: lablesDeaths,
        datasets: [{
          label: 'Deaths',
          backgroundColor: '#ff5252',
          data: deathsPerDay
        }]},
        options: { responsive: true, maintainAspectRatio: false }
      })



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
