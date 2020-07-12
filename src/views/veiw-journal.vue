<template>

  <div class="viewjr">   
    <div class="main-wrapper">
      <section class="blog-list">
        <div class="monthname">
          <h4>June 2020</h4>
        </div>
        <div class="row">
          <div class="intro viewjournal" v-html=listItems.textitem></div>
        </div>
        <b-row class="text-center footer">
          <b-col>
          <b-button variant="info" style="margin-right:-68px"  @click="editJournal">Edit journal </b-button>
        </b-col>
            <b-col>
          <b-button variant="danger" style="margin-right:0 0px 0 12px"  @click="deleteJournal">Delete </b-button>
        </b-col>
          <b-col>
            <b-button  @click="goToDiarylist" class="backbutton" variant="info">
              Back to List</b-button>
          </b-col>
        </b-row>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      listItems: [
        {
          textitem: ""
        }
      ]
    };
  },
  computed: {
    // GET THE ALL TABLES DATA FROM GETTER
    ...mapGetters({
      JournalsData: "filters/getJournalsData",
    })
  },
  created() {
    let filterData = this.JournalsData.data.find(
      item => item.id == this.$route.params.id
    );

    this.listItems = filterData;
  },
  methods: {
        ...mapActions({
      commitUpdateJournals: "filters/commitUpdateJournal",
       deleteJournals: "filters/deleteJournals"

    }),
    editJournal() {
     this.commitUpdateJournals(this.listItems)
      this.$router.push({ name: "addjournal" });
    },
   async deleteJournal(){
    await this.deleteJournals(this.listItems);
    this.$router.push({ name: "diarylist" });
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
.viewjournal {
  margin-left: 30px;
  margin-right: 40px;
  text-align: justify;
}
.footer {
  border-top: 1px solid;
  margin-top: 5px;
  padding-top: 10px;
}
.backbutton{
      margin: 1px 0 0 -21px;
    padding: 4px 8px 7px 13px;
    float: left;
}
</style>
