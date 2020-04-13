<template>
  <section class="idea-container">
    <div class="flex-r-bc section-header">
      <div class="flex-r-cc">
        <div class="section-img">
          <img src="@/assets/svg/resume/doctor.svg" alt />
        </div>
        <span class="section-title">医生观念</span>
      </div>
      <div class="more-inf" @click="goPage('DoctorIdea')">查看更多</div>
    </div>
    <div class="card"  v-if="doctorConceptData && doctorConceptData.productDynamicFieldList &&  doctorConceptData.productDynamicFieldList.length>0">
      <div class="card-section">
        <div
          class="flex-r-bc idea-item"
          v-for="(item,i) in this.doctorConceptData.productDynamicFieldList.filter((item,i)=> i<5)"
          :key="i"
        >
          <p class="card-item">
            <span class="item-name">{{item.dynamicFieldName}}：</span>
            <span class="card-val">{{item.dynamicFieldValue}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class=" card nodata" v-else ><NoData/></div>
    
  </section>
</template>

<script>
import NoData from '@/components/NoData'
export default {
  components:{
    NoData
  },
  props: {
    doctorDetail: {
      type: Object,
      default: () => {
        return {};
      }
    },
    productId: {
      type: Number,
      default: 0
    },
    doctorConceptData: {
      type: Object
    }
  },
  methods: {
    goPage(name) {
      const { customerCode } = this.doctorDetail;
      this.$router.push({
        name,
        query: {
          customerCode,
          productId: this.productId
        }
      });
    }
  }
};
</script>

<style lang='less'>
.idea-container {
  .idea-item:not(:last-child) {
    margin-top: 0;
    height: 0.84rem;
    line-height: 0.84rem;
    .card-item {
      margin-top: 0 !important;
    }
  }
  .idea-item:not(:last-child) {
    border-bottom: 1PX solid #f5f5f5;
  }
}
.card{
  &.nodata{
    padding: 0.4rem 0 ;
  }
}
</style>