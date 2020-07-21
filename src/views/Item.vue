<template>

  <div>
    <div class="container">
      <div class="row">        
        <div class="col-12">
          <a class="more-link" @click="viewjournal(source.id)">
            <div class="intro" v-html="formatText(source.textitem)"></div>
          </a>
          <div class="time">
            <span class="date">
              <b-icon icon="clock-history"></b-icon>
              {{source.submitdate}} , Place : Hydrabad
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "infinite-loading-item",
  props: {
    source: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    formatText(text) {
      if (text) {
        return text.substr(0, 110);
      }
    },
    viewjournal(id) {
      this.$router.push({ name: "viewjournal", params: { id: id } });
    }
  }
};
</script>

<style lang="less" scoped>
.item-inner {
  .head {
    font-weight: 500;
  }
  .index {
    margin-right: 1em;
  }
  .name {
    margin-left: 1em;
  }
  .desc {
    padding-top: 0.5em;
    text-align: justify;
  }
}
</style>