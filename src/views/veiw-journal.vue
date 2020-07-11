<template>

  <div class="viewjr">
    <div class="submitbutton">
      <b-row class="text-center">
        <b-col>
          <b-button variant="info" style="width: 130px" @click="addjournal">Add journal </b-button>
        </b-col>
      </b-row>
    </div>
    
    <div class="main-wrapper">
      <section class="blog-list">

        <div class="monthname">
          <h4>June 2020</h4>
        </div>

        <div class="row">

          <div class="intro viewjournal">{{journalData}}</div>

        </div>
        <b-row class="text-center">
          <b-col>
            <b-button style="margin:5px;" @click="goToDiarylist" variant="info">Back to List</b-button>
          </b-col>
        </b-row>

      </section>

    </div>

  </div>

</template>

<script>
//import Vue from 'vue'
  import { eventBus } from '../main.js'
  import axios from "axios";
  //import diary from "./diary-list"
  export default {
    data() {
      return {
        journalData: "dfafsfa",
         apiURL: "https://diary.manojksharma.in/"
      }
    },
    components:{
     // diary
    },
    created() {
      eventBus.$off('viewjournalTest')
      eventBus.$on('viewjournalTest', id => {
       this.getJournalById(id)     
      })
    },
    methods: {
      goToDiarylist() {
        this.$router.push({ name: 'diarylist' })
      },
      addjournal() {
        this.$router.push({ name: 'addjournal' })
      },
    async getJournalById(id) {
      await axios
        .get(this.apiURL + "database.php?type=get&id="+id, {
          headers: {}
        })
        .then(res => {
          this.journalData = res.data[0].textitem;
          this.$data.journalData;
          this.$forceUpdate()
          console.log(this.journalData)
          this.$forceUpdate();
          Object.assign(this.$data,this.$options.data.call(this))
          this.$forceUpdate();

        

        })
        .catch(err => {
          console.log(err);
        });
    }
    }
  }

</script>
<style>

  .blog-list {
    margin: 10px;
  }

  .viewjr {
    text-align: justify;
    margin: 15px;
  }

</style>
