<template>
  <div class="box7">
    <div class="title">
      <p>數據統計</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <div class="charts" ref="couter"></div>
  </div>
</template>

<script setup lang="ts">
import { Bottom } from '@element-plus/icons-vue';
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const couter = ref()

onMounted(() => {
  const myChart = echarts.init(couter.value)
  const option = {
    title: {
      text: '遊客消費統計',
      textStyle: {
        color: 'white',
        fontSize: 16
      },
      left: '60%',
      top: '0'
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消費', max: 6500 },
        { name: '好感', max: 16000 },
        { name: '出行', max: 30000 },
        { name: '小吃', max: 38000 },
        { name: '愛好', max: 52000 },
        { name: '住宿', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '購物'
          },
          {
            value: [5000, 10000, 28000, 26000, 42000, 21000],
            name: '交通'
          }
        ]
      }
    ]
  };

  myChart.setOption(option)
})
</script>

<style scoped lang="scss">
.box7 {
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