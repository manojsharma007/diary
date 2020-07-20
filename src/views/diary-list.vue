<template>
  <div>
    <div class="main-wrapper diarylist">
      <section class="blog-list px-3 py-5 p-md-5">
        <div style="margin: 6px 0 15px 108px;">
          <b-button variant="info" style="width: 130px" @click="addjournal">Add journal</b-button>
        </div>
        <div class="allentries">
          <ul>
            <li class="allentriesul">
              {{totalRecords}}
              <br />Entries
            </li>
            <li class="allentriesul">
              {{currentMonthRecords}}
              <br />Month
            </li>
            <li class="allentriesul">
              {{currentWeekRecords}}
              <br />Week
            </li>
          </ul>
        </div>
        <div class="monthname">
          <h4>{{currentMonth}}</h4>
        </div>
        <!-- <b-spinner
          style="width: 3rem; height: 3rem;margin: 52px 0 23px 141px;"
          v-if="showLoder"
          variant="primary"
          label="Large Spinner"
        >Loading...</b-spinner> -->
        <!-- <div class="visiblescroll">
        <div v-observe-visibility="visibilityChanged">
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
        </div>
        </div> -->

    <virtual-list style="height: 360px; overflow-y: auto;"
  :data-key="'id'"
  :data-sources="items"
  :data-component="itemComponent"
  :estimate-size="20"
  v-on:tobottom="onScrollToBottom"
>
  <div slot="footer" class="loading-spinner">Loading ...</div>
</virtual-list>


      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
  import VirtualList from 'vue-virtual-scroll-list'
import moment from "moment";
import Item from './Item'
export default {
  data() {
    return {
      listItems: [],
      itemComponent: Item,
      showLoder: true,
      totalRecords: "",
      currentMonth: "",
      currentMonthRecords: "",
      currentWeekRecords: "",
      limitStartPageNo: 0,
      limitEndPageNo: 20,
      page: 1,
      page_size: 10,
      lastpage: 1,
      items: []

    };
  },
  components: { 'virtual-list': VirtualList },
  mounted() {
    this.getTask();
    const submitDate = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long"
    });
    const [{ value: month }, , { value: year }] = dateTimeFormat.formatToParts(
      submitDate
    );
    this.currentMonth = `${month} , ${year}`;
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
        let parms = {
          limitStartPageNo: this.limitStartPageNo,
          limitEndPageNo: this.limitEndPageNo
        };
        await this.commitJournals(parms);
        this.showLoder = false;
      } else {
        this.showLoder = false;
      }
      this.listItems = this.JournalsData.data;
      this.items = this.JournalsData.data;
      this.totalRecords = this.JournalsData.data.length;

      let format = "YYYY-MM-DD";
      var curr_date = moment(moment(), format);
      var in_month = this.JournalsData.data.filter(
        item =>
          moment(item.createddate, format).month() == curr_date.month() &&
          moment(item.createddate, format).year() == curr_date.year()
      );
      this.currentMonthRecords = in_month.length;

      const today = moment();
      const from_date = today.startOf("week").format(format);
      const to_date = today.endOf("week").format(format);

      var in_week = this.JournalsData.data.filter(item =>
        moment(item.createddate).isBetween(from_date, to_date)
      );
      this.currentWeekRecords = in_week.length;
      // todo 
      this.lastpage=5
    },
    onScrollToBottom() {
    
     // this.getTask();
      console.log("StartPage :");
          this.limitStartPageNo+10;
           this.limitEndPageNo+20;
             let parms = {
          limitStartPageNo: this.limitStartPageNo,
          limitEndPageNo: this.limitEndPageNo
        };
         this.commitJournals(parms);
      //console.log("Endpage",this.limitEndPageNo);
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
.visiblescroll{
height: 300px;
  overflow: auto;
}
</style>
