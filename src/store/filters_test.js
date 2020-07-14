import axios from "axios";
let apiURL ="https://diary.manojksharma.in/";
export default {
  namespaced: true,
  state: {
   
    journalsData:[],
    updateJournalsData:[]
  },
  getters: {
    getJournalsData(state) {
      return state.journalsData;
    },
    getUpdateJournalsData(state) {
      return state.updateJournalsData;
    }
  },
  mutations: {
    setJournalsData(state, payload) {
      state.journalsData = payload;
    },
    setUpdateJournalsData(state, payload) {
      state.updateJournalsData = payload;
    }
  },
  actions: {
    async getJournals({ commit }) {  
     return await axios.get(apiURL+"database_test.php")
     .then((response)=>{
      commit("setJournalsData", response);
     })
     .catch((error)=>{     
        console.log(error);
     })     
    },
    async addJournals({ commit }, params) {  
      return await axios.get(apiURL + "database_test.php?type=add&text=" + params.content+ "&time="+params.time)
      .then((response)=>{
        commit("setJournalsData", response);
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async updateJournals({ commit }, params) {  
      return await axios.get(apiURL + "database_test.php?type=update&text=" + params.content+ "&id="+params.id)
      .then((response)=>{
        commit("setJournalsData", response);
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async deleteJournals({ commit }, params) {
     return await axios.get(apiURL + "database_test.php?type=delete&id=" + params.id)
     .then((response)=>{
       commit("setJournalsData", response);
     })
     .catch((error)=>{     
        console.log(error);
     })     
    },
     commitUpdateJournal({ commit }, params) {  
     commit("setUpdateJournalsData", params);          
     }
  }
}
