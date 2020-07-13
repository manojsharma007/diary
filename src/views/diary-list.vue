<template>
  <div>
    <div class="main-wrapper diarylist">
      <section class="blog-list px-3 py-5 p-md-5">
            <div style="margin: 6px 0 15px 108px;">        
          <b-button variant="info" style="width: 130px" @click="addjournal">Add journal</b-button>      
      </div>
      <div class="allentries">
        <ul>
        <li  class="allentriesul">65 <br/>Entries</li>
        <li class="allentriesul">26 <br/>Month</li>
        <li  class="allentriesul">5 <br/>Week</li>
      </ul>
      </div>
        <div class="monthname">
          <h4>July 2020</h4>
        </div>
         <b-spinner style="width: 3rem; height: 3rem;margin: 52px 0 23px 141px;" v-if="showLoder" variant="primary"  label="Large Spinner">
           Loading...</b-spinner>
        <div class="container" v-for="(item) in this.listItems" :key="item.id">
          <div class="row">
            <div class="col-12">
              <a class="more-link" @click="viewjournal(item.id)">
                <div class="intro" v-html="formatText(item.textitem)"></div>
              </a>
              <div class="time">
                <span class="date">
                  <b-icon icon="clock-history"></b-icon>
                   {{item.submitdate}} , Place : Hydrabad
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
import { mapActions, mapGetters } from "vuex";
//import moment from "moment";
export default {
  data() {
    return {
      listItems: [],
      showLoder: true
    };
  },
  mounted() {
    this.getTask();
  },
  computed: {
    // GET THE ALL TABLES DATA FROM GETTER
    ...mapGetters({
      JournalsData: "filters/getJournalsData"
    })
  },
  methods: {
    ...mapActions({
      commitJournals: "filters/getJournals",
      commitUpdateJournals: "filters/commitUpdateJournal"
    }),
    addjournal() {
      this.commitUpdateJournals([]);
      this.$router.push({ name: "addjournal" });
    },
    viewjournal(id) {
      this.$router.push({ name: "viewjournal", params: { id: id } });
    },
    formatText(text) {
      if (text) {
        return text.substr(0, 110);
      }
    },
    async getTask() {
      if (Object.keys(this.JournalsData).length === 0) {
        await this.commitJournals();
        this.showLoder = false;
      } else {
        this.showLoder = false;
      }
      this.listItems = this.JournalsData.data;

      // console.log(this.JournalsData)
      //moment(value.createddate).isBetween("02-01-2020", "02-29-2020")
      //console.log(data);

      //  switch (activeTab) {
      //     case "articles":
      //       this.setTableData("article");
      //       break;
      //     case "sections":
      //       this.setTableData("section");
      //       break;
      //     case "otherproduct":
      //       this.setTableData("otherproduct");
      //       break;
      //     case "newsletters":
      //       this.setTableData("newsletter");
      //       break;
      //     default:
      //       this.setTableData("article");
      //   }
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
  text-align: justify;
  margin-bottom: 10px;
  border-bottom: 1px grey solid;
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
.allentries ul {
  display: flex;
  list-style: none;
  padding: 8px 0 10px 21px;
}
.allentriesul {
  padding-right: 20px;
}
.allentries {
  background: lightsteelblue;
}
</style>
