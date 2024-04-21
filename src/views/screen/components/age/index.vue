<template>
  <div class="box2">
    <div class="title">
      <p>年齡比例</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  const mychart = echarts.init(charts.value)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      right: 30,
      top: 40,
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 14
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'inside',
          color: 'white'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 484, name: '65歲以上' },
          { value: 1048, name: '45-65歲' },
          { value: 864, name: '30-45歲' },
          { value: 778, name: '15-30歲' },
          { value: 300, name: '15歲以下' }
        ]
      }
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 20
    }
  };
  mychart.setOption(option)
})

</script>

<style scoped lang="scss">
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: 260px;
    margin-left: -80px;
  }

}
</style>