<template>
  <div class="box4">
    <div class="title">
      <p>未來七天遊客數量趨勢</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const line = ref()

onMounted(() => {
  const mycharts = echarts.init(line.value)
  mycharts.setOption({
    title: {
      text: '訪問量',
      top: 15,
      left: 0,
      textStyle: {
        color: 'white',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    grid: {
      left: 50,
      top: 45,
      right: 20,
      bottom: 20
    },
    series: [
      {
        type: 'line',
        data: [120, 1240, 66, 2290, 350, 860, 1270],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0, color: 'rgba(255,255,255,0.5)'
              },
              {
                offset: 1, color: 'rgba(255,255,255,0)'
              }
            ]
          }
        }
      }
    ]

  })
})

</script>

<style scoped lang="scss">
.box4 {
  width: 95%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 0px 25px;

  .title {
    margin-left: 20px;
    margin-top: -10px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 50px);
  }
}
</style>
