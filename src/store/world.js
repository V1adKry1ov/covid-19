import axios from 'axios'

export default {
    state: {
        total: []
    },
    mutations: {
        setTotalStat(state, payload) {
            state.total=payload 
        }
    },
    actions: {
        setTotalStat({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            
            axios
                .get('https://corona.lmao.ninja/v2/continents')
                .then((response) => { 
                    let data = response.data
                    
                    let datasets = {}

                    let cases = 0
                    let deaths = 0
                    let recoveries = 0

                    for(let elem of data) {
                        cases += elem.cases
                        deaths += elem.deaths
                        recoveries += elem.recovered
                    }


                    datasets = {cases, deaths, recoveries}

                    console.log(datasets)
                    commit('setTotalStat', datasets)
                })
                .catch(error => {
                    commit('setLoading', false)
                    commit('setError', error.message)
                    throw error
                })
        }
    },
    getters: {
        totalStat(state) {
            return state.total
        }
    }
}