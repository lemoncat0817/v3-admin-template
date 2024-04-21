<template>
  <div class="box6">
    <div class="title">
      <p>年度遊客量對比</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <div class="charts" ref="year"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const year = ref()

onMounted(() => {
  const myChart = echarts.init(year.value)
  myChart.setOption({
    title: {
      text: '散點圖',
      textStyle: {
        color: 'white',
        fontSize: 20
      },
      left: '50%'
    },
    xAxis: {
      type: 'category',
      show: false
    },
    yAxis: {
      show: false

    },
    grid: {
      left: 20,
      top: 30,
      right: 20,
      bottom: 30
    },
    series: [{
      type: 'scatter',
      data: [
        [10.0, 8.04],
        [8.07, 3.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [8.0, 8.33],
        [14.0, 1.66],
        [13.4, 6.81],
        [10.0, 6.33],
      ],
      symbol: 'diamond',
      symbolSize: 16,
      label: {
        show: true,
        position: 'top',
        color: 'white'
      },
      itemStyle: {
        color: '#00baff'
      }
    }]
  })
})


</script>

<style scoped lang="scss">
.box6 {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
  width: 100%;
  height: 100%;

  .title {
    margin-left: 20px;

    p {
      font-size: 20px;
      color: white;
      font-weight: bold;
    }

  }

  .charts {
    height: calc(100% - 40px);

  }
}
</style>