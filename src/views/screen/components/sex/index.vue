<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <div class="sex">
      <div class="man">
        <p>男士</p>
        <img src="../../images/man.png">
      </div>
      <div class="woman">
        <p>女士</p>
        <img src="../../images/woman.png">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const charts = ref()

onMounted(() => {
  //初始化echarts实例
  let mycharts = echarts.init(charts.value);
  //设置配置项
  mycharts.setOption({
    //组件标题
    title: {
      text: '男女比例',//主标题
      textStyle: {//主标题颜色
        color: 'skyblue',
      },
      left: '40%'
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      }
      ,
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  });
})


</script>

<style scoped lang="scss">
.box1 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .sex {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .man {
      margin: 20px;
      background: url(../../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      width: 111px;
      height: 115px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      p {
        color: white;
        font-size: 15px;
      }

      img {
        margin-bottom: 20px;
      }
    }

    .woman {
      margin: 20px;
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      width: 111px;
      height: 115px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      p {
        color: white;
        font-size: 15px;
      }

      img {
        margin-bottom: 20px;
      }
    }
  }

  .rate {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: -30px;

    p {
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .charts {
    height: 80px;
    margin: 0px 50px;
  }

}
</style>