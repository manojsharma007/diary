<template>

  <div class="addjournal">
    <div class="title">
      <b-button variant="primary">Add journal </b-button>
    </div>
    <vue-editor v-model="content"></vue-editor>
    <div class="submitbutton">

      <b-row class="text-center">
        <b-col>
          <b-button variant="primary" @click="savejournal">Save </b-button>
        </b-col>

        <b-col>
          <b-button variant="info" style="width: 130px" @click="goToDiarylist">Go to Diary </b-button>
        </b-col>
      </b-row>

    </div>
  </div>

</template>
<script>

  import { VueEditor } from 'vue2-editor'
  export default {
    data() {
      return {
        content: ''
      }
    },
    components: {
      VueEditor
    },
    methods: {
      savejournal() {
      const submitDate = new Date('2010-08-05')
      const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })
      const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(submitDate )
     const timeAdded = this.dateFormat() +" ," +`${month} ${day}, ${year}`
    //  console.log(timeAdded)


      //  const today = new Date()
      //  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        let localStorageData = []
        localStorageData = localStorage.getItem('addjournal')
        let segment = JSON.parse(localStorageData)
        if (segment != null) {
          segment.push({
            id: Math.floor(Math.random() * 100000 + 1),
            text: this.content,
            time:timeAdded
          })
          localStorageData = segment
        } else {
          segment = [
            {
              id: Math.floor(Math.random() * 100000 + 1),
              text: this.content,
              time:timeAdded
            }
          ]
        }
        localStorage.setItem('addjournal', JSON.stringify(segment))
        this.$router.push({ name: 'diarylist' })
      },
      goToDiarylist() {
        this.$router.push({ name: 'diarylist' })
      },
      dateFormat(){
        const date = new Date()
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
    }
  }

</script>

<style>

  .title {
    text-align: center;
    margin: 15px;
    color: blue;
  }
  .submitbutton {
    margin: 15px 96px 0 93px;
  }

</style>
