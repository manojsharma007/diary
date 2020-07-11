<template>

  <div>
    <div class="submitbutton">

      <b-row class="text-center">
        <b-col>
          <b-button variant="info" style="width: 130px" @click="addjournal">Add journal </b-button>
        </b-col>
      </b-row>

    </div>
    <div class="main-wrapper diarylist">
      <section class="blog-list px-3 py-5 p-md-5">

        <div class="monthname">
          <h4>June 2020</h4>
        </div>
        <div class="container" v-for="(item) in this.listItems" :key="item.id">
          <div class="row">
            <div class="col-12">
              <a class="more-link" @click="viewjournal(item)">
                <div class="intro" v-html="formatText(item.text)"> </div>
              </a>
              <div class="time">
                <span class="date"><b-icon icon="clock-history"></b-icon> {{item.time}} , {{item.date}}</span>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>

  </div>

</template>

<script>

  import { eventBus } from '../main.js'
  export default {
    data() {
      return {
        listItems: []
      }
    },
    created() {
      if (localStorage.getItem('addjournal')) {
        this.listItems = JSON.parse(localStorage.getItem('addjournal'))
      }
    },
    methods: {
      addjournal() {
        this.$router.push({ name: 'addjournal' })
      },
      viewjournal(data) {
        eventBus.$emit('viewjournalTest', data)
        this.$router.push({ name: 'viewjournal' })
      },
      formatText(text) {
        return text.substring(0, 120)
      }
    }
  }

</script>
<style>

  .container {
    display: flex;
    flex-wrap: wrap;
    margin-right: 0px;
    margin-left: -15px;
    border-bottom: 1px gray solid;
    text-align: justify;
    margin-bottom: 10px;
  }
  .time {
    font-size: 12px;
    margin: 4px 0 12px 0;
  }
  .monthname {
    color: gray;
    background: #f7f7f9;
  }
  .diarylist {
    margin: -33px 0 0 0;
  }
  p{
    color: rgb(89, 89, 91);
  }

</style>
