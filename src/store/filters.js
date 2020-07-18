import axios from "axios";
let apiURL ="https://diary.manojksharma.in/database.php";
//let apiURL ="http://localhost/database.php";
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
     return await axios.get(apiURL)
     .then((response)=>{
      commit("setJournalsData", response);
     })
     .catch((error)=>{     
        console.log(error);
     })     
    },
    async addJournals({ commit }, params) {  
      return await axios.get(apiURL + "?type=add&text=" + params.content+ "&time="+params.time)
      .then((response)=>{
        commit("setJournalsData", response);
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async updateJournals({ commit }, params) {  
      return await axios.get(apiURL + "?type=update&text=" + params.content+ "&id="+params.id)
      .then((response)=>{
        commit("setJournalsData", response);
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async deleteJournals({ commit }, params) {
     return await axios.get(apiURL + "?type=delete&id=" + params.id)
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
