import axios from "axios";
let apiURL ="http://localhost:3000/api/";
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
    // async getJournals({ commit }) {  
    //  return await axios.get(apiURL+"getJournals")
    //  .then((response)=>{
    //   commit("setJournalsData", response);
    //  })
    //  .catch((error)=>{     
    //     console.log(error);
    //  })     
    // },
    async getJournals({ commit },parms) {  
      console.log(parms)
      return await axios.post(apiURL+"getJournal",parms)
      .then((response)=>{
       commit("setJournalsData", response);
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
    async addJournals({ commit }, params) {
      return await axios.post(apiURL + "addJournal",{
        "textitem":params.content,
        "date": params.time
      })
      .then((response)=>{
        commit("setJournalsData", response);
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async updateJournals({ commit }, params) {  
       // + params.content+ "&id="+params.id
      return await axios.post(apiURL + "updateJournal",{
        "textitem":params.content,
        "id": params.id
      })
      .then((response)=>{
        commit("setJournalsData", response);
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async deleteJournals({ commit }, params) {
     return await axios.post(apiURL + "deleteJournal",{
      "id": params.id
    })
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
