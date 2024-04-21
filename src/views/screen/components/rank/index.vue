<template>
  <div class="box5">
    <div class="title">
      <p>熱門景區排行</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <div class="charts" ref="rank"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const rank = ref()

onMounted(() => {
  const myChart = echarts.init(rank.value)
  myChart.setOption({
    title: {
      text: '景區排行',
      left: '50%',
      top: '0px',
      textStyle: {
        color: 'white',
        fontSize: 20
      },
      subtext: '各大景區排行',
      subtextStyle: {
        color: 'white',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {},
    grid: {
      left: 20,
      bottom: 20,
      right: 20
    },
    series: [
      {
        type: 'bar',
        data: [30, 20, 40, 90, 20, 70, 110],
        label: {
          show: true,
          position: 'insideTop',
          color: 'white'
        },
        showBackground: true,
        itemStyle: {
          borderRadius: [15, 15, 15, 15],
          color: () => {
            const arr = ['red', 'yellowgreen', 'blue', 'green', 'purple', 'hotpink', 'orange', 'black', 'gray']
            return arr[Math.floor(Math.random() * arr.length)]
          }
        }
      },
      {
        type: 'line',
        data: [30, 20, 40, 90, 20, 70, 110],
        lineStyle: {
          color: 'white',
        },
      }
    ],
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.7)',
    }
  })
})

</script>

<style scoped lang="scss">
.box5 {
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