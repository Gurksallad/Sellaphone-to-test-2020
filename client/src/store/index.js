import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phone: {price:0},
    phones:[],
    contract: {price:0},
    contracts:[],
    data: 0,
    extras: {
      airyFlayphones:{checked:false},
      boomyBassBox:{checked:false},
      cloudyInsurance:{checked:false},
      recognizeFace:{checked:false},
    },
    total: 0
  },
  mutations: {
    setPhone(state, phone){
      state.phone = phone
    },
    setPhones(state, phones){
      state.phones = phones
    },
    setContract(state, id){
      if(!id||id<1){return}
      let byId = {}
      for(let c of state.contracts){
        byId[c.id] = c
      }
      state.contract = byId[id]
    },
    setContracts(state, contracts){
      state.contracts = contracts
    },
    setData(state, value){
      state.data = parseInt(value)||0
    },
    toggleExtra(state, name){
      state.extras[name].checked = !state.extras[name].checked
    },
    updateTotal(state){ // @bug state.contract.price
      state.total = state.phone.price + 0 + state.data
    },
    updateDiscounts(state){ // @bug  && state.contract.name === '18 mån Silver'
      if(state.phone.name === 'iPhone Z'){
        state.total = state.total * 0.9
      }
    }
  },
  actions: {
    async fetchPhones({commit}){
      let response = await fetch('api/phones')
      let phones = await response.json()
      commit('setPhones', phones)
    },
    async fetchContracts({commit}){
      let response = await fetch('api/contracts')
      let contracts = await response.json()
      commit('setContracts', contracts)
    }
  }
})
