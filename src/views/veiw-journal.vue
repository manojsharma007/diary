<template>

  <div class="viewjr">   
    <div class="main-wrapper">
      <section class="blog-list">

        <div class="monthname">
          <h4>June 2020</h4>
        </div>
        <div class="row">
          <div class="intro viewjournal" v-html=listItems[0].textitem></div>
        </div>
        <b-row class="text-center">
          <b-col>
          <b-button variant="info"  @click="addjournal">Add journal </b-button>
        </b-col>
          <b-col>
            <b-button  @click="goToDiarylist" variant="info">Back to List</b-button>
          </b-col>
        </b-row>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      listItems: [
        {
          textitem: ""
        }
      ],
      apiURL: "https://diary.manojksharma.in/"
    };
  },
  mounted() {
    axios
      .get(this.apiURL + "database.php?type=get&id=" + this.$route.params.id, {
        headers: {}
      })
      .then(res => {
        this.listItems = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    addjournal() {
      this.$router.push({ name: "addjournal" });
    },
    viewjournal() {
      this.$router.push({ name: "viewjournal" });
    },
    formatText(text) {
      return text.substr(0, 110);
    },
    goToDiarylist() {
      this.$router.push({ name: "diarylist" });
    }
  }
};
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
p {
  color: rgb(89, 89, 91);
}
.viewjournal{
         margin-left: 30px;
    margin-right: 40px;
    text-align: justify;
}
</style>
