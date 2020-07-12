<template>
  <div>
    <div class="main-wrapper diarylist">
      <section class="blog-list px-3 py-5 p-md-5">
            <div style="margin: 6px 0 15px 108px;">        
          <b-button variant="info" style="width: 130px" @click="addjournal"><b-icon-plus>
            </b-icon-plus>Add journal</b-button>      
      </div>
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
import { mapActions, mapGetters } from "vuex";
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
      this.commitUpdateJournals([])
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
      }
      this.listItems = this.JournalsData.data;
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
