<template>
  <div>
    <div class="submitbutton">
      <b-row class="text-center">
        <b-col>
          <b-button variant="info" style="width: 130px" @click="addjournal">Add journal</b-button>
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
              <a class="more-link" @click="viewjournal(item.id)">
                <div class="intro" v-html="formatText(item.textitem)"></div>
              </a>
              <div class="time">
                <span class="date">
                  <b-icon icon="clock-history"></b-icon>
                  <!-- <router-link to='viewjournal/"+" ' tag="li" class="navContent" for="navContent">
              <a href="javascript:void(0)">{{item.submitdate}}</a>
            </router-link>  -->
            {{item.submitdate}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
//import { eventBus } from "../main.js";
import axios from "axios";
export default {
  data() {
    return {
      listItems: [],
      apiURL: "https://diary.manojksharma.in/"
    };
  },
  mounted() {
    this.getTask();
  },
  methods: {
    addjournal() {
      this.$router.push({ name: "addjournal" });
    },
    viewjournal(id) {
      this.$router.push({ name: 'viewjournal', params: { id: id } })

    },
    formatText(text) {
      return text.substr(0, 110);
    },
    async getTask() {
      await axios
        .get(this.apiURL + "database.php", {
          headers: {}
        })
        .then(res => {
          this.listItems = res.data;
        })
        .catch(err => {
          console.log(err);
        });
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
</style>
