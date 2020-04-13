<template>
  <div class="con_input">
    <input
      type="text"
      :placeholder="inputData.placeholder"
      v-model="inputData.inputV"
      @input="InputChange"
    />
    <div
      class="fuzzySearch"
      v-if="isShow && inputData.placeholder !== '请输入' && inputData.searchD.length>0"
    >
      <div
        class="item"
        v-for="(item,index) in inputData.searchD"
        :key="index"
        @click.stop="searchChange(item)"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputData: {
      type: Object,
      default: function() {
        return {
          placeholder: "",
          searchD: [],
          key: "",
          inputV: ""
        };
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    InputChange() {
      this.isShow = true;
      if (!this.inputData.inputV) {
        this.isShow = false;
      }
      this.$emit("fuzzySearchChange",this.inputData.inputV);
    },
    searchChange(val) {
      this.inputData.inputV = val;
      this.isShow = false;
      this.$emit('selected',val)
    }
  }
};
</script>

<style lang="less">
.con_input {
  display: inline-block;
  height: 100%;
  width: 100%;
  position: relative;
  input {
    width: 100%;
    border: none;
    touch-action: none;
    font-size: 0.28rem;
  }
  .fuzzySearch {
    position: absolute;
    width: 100%;
    max-height: 3.04rem;
    border-radius: 0rem 0rem 0.08rem 0.08rem;
    z-index: 10;
    color: #ffff;
    background: rgba(0, 0, 0, 0.8);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    div:hover {
      color: #009fda;
    }
    div {
      border-bottom: 1PX solid rgba(255, 255, 255, 0.13);
      padding: 0 0.2rem;
      &.item {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
