<template>
  <div class="box">
    <div class="top">
      <p class="title">實時遊客統計</p>
      <p class="bg"></p>
      <p class="right">可預約總量<span>99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'


const charts = ref()
const people = ref('216908人')

onMounted(() => {
  // 初始化echarts实例
  const mycharts = echarts.init(charts.value)
  // 配置图表
  mycharts.setOption({
    // 標題組件
    title: {
      text: '水球圖'
    },
    // x|y軸組件
    xAxis: {},
    yAxis: {},
    series: {
      type: 'liquidFill',
      data: [0.6, 0.5, 0.4, 0.3],
      radius: '80%'
    },
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  width: 100%;
  height: 100%;
  position: relative;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-weight: bold;
      font-size: 20px
    }
  }

  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>