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
        <!-- <div class="result">Items count: {{ items.length }}.</div> -->
        <virtual-list
          style="height: 360px; overflow-y: auto;"
          :data-key="'id'"
          :data-sources="items"
          :data-component="itemComponent"
          v-on:tobottom="onScrollToBottom"
           :estimate-size="100"
        >
          <div v-if="showLoder" slot="footer" class="loading-spinner">Loading ...</div>
        </virtual-list>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VirtualList from "vue-virtual-scroll-list";
import Item from "./Item";
export default {
  data() {
    return {
      itemComponent: Item,
      showLoder: true,
      totalRecords: "",
      currentMonth: "",
      currentMonthRecords: "",
      currentWeekRecords: "",
      limitStartPageNo: 0,
      limitEndPageNo: 20,
      items: []
    };
  },
  components: { "virtual-list": VirtualList },
  created() {},
  mounted() {
    this.getTask();
    this.getAllRecords();
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
      JournalsData: "filters/getJournalsData",
      recordsJournalsData: "filters/getRecordsJournals"
    })
  },
  methods: {
    ...mapActions({
      commitJournals: "filters/getJournals",
      recordsJournals: "filters/commitRecordsJournals",
      getJournalsScroll: "filters/getJournalsScroll",
      commitUpdateJournals: "filters/commitUpdateJournal"
    }),
    addjournal() {
      this.commitUpdateJournals([]);
      this.$router.push({ name: "addjournal" });
    },
    formatText(text) {
      if (text) {
        return text.substr(0, 110);
      }
    },
    async getAllRecords() {
      await this.recordsJournals();
      this.totalRecords = this.recordsJournalsData.data.totalsrecords;
      this.currentMonthRecords = this.recordsJournalsData.data.monthly;
      this.currentWeekRecords = this.recordsJournalsData.data.weekly;
    },
    async getTask() {
      if (Object.keys(this.JournalsData).length === 0) {
        let parms = {
          limitStartPageNo: this.limitStartPageNo,
          limitEndPageNo: this.limitEndPageNo
        };
        await this.commitJournals(parms);
      }
      this.items = this.JournalsData;
      this.limitStartPageNo = this.limitStartPageNo + 20;
    },
    async onScrollToBottom() {
      // if (Object.keys(this.JournalsData).length === 0) {
      if (this.limitStartPageNo <= this.totalRecords) {
        let parms = {
          limitStartPageNo: this.limitStartPageNo,
          limitEndPageNo: this.limitEndPageNo
        };
        await this.getJournalsScroll(parms);
        this.showLoder = true;
      } else {
        this.showLoder = false;
      }
      // }
      this.items = this.JournalsData;
      this.limitStartPageNo = this.limitStartPageNo + 20;
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
.visiblescroll {
  height: 300px;
  overflow: auto;
}
</style>
