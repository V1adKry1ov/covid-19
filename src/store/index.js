import Vue from 'vue'
import Vuex from 'vuex'

import country from './country'
import common from './common'
import world from './world'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        country, 
        common,
        world
    }
})