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

          <div class="intro viewjournal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </div>

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

  import { eventBus } from '../main.js'
  //import Vue from 'vue';
  //Vue.forceUpdate();
  export default {
    data() {
      return {
        journalData: []
      }
    },
    created() {
      eventBus.$off('viewjournalTest')
      eventBus.$on('viewjournalTest', data => {
        this.$forceUpdate();
      //  console.log('i am in viewjournal called')
        this.journalData = data
        this.$forceUpdate();
        //console.log(this.journalData)
      })
    },
    methods: {
      goToDiarylist() {
        this.$router.push({ name: 'diarylist' })
      },
      addjournal() {
        this.$router.push({ name: 'addjournal' })
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
