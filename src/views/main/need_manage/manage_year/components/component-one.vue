<template>
  <div>
    <el-form :inline="true" :model="formSearch" label-width="100px">
      <el-form-item label="系统名称">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="TOP 数目">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目时间">
        <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        <!-- <el-button type="success" size="small" @click="onSearch">重置</el-button> -->
        <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
      </el-form-item>
    </el-form>
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    <div id="myChart2" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      formSearch: {
        date: '',
        user: '',
        region: ''
      }
    }
  },
  created() {
    console.log(111)
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('myChart'))
    // 绘制图表
    myChart.setOption({
      title: { text: '测试轮次黑榜' },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            readOnly: false
          },
          magicType: {
            type: ['line', 'bar', 'stack', 'tiled']
          },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data: ['系统测试', '验收测试', '模拟测试']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [
        {
          name: '系统测试',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: '验收测试',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '模拟测试',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    })

    // 基于准备好的dom，初始化echarts实例
    const myChart2 = echarts.init(document.getElementById('myChart2'))
    // 绘制图表
    myChart2.setOption({
      title: { text: '测试轮次红榜' },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            readOnly: false
          },
          magicType: {
            type: ['line', 'bar', 'stack', 'tiled']
          },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data: ['系统测试', '验收测试', '模拟测试']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [
        {
          name: '系统测试',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: '验收测试',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '模拟测试',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    })
  },
  methods: {
    // 查询
    onSearch() {
      console.log('submit!')
    }
  }
}
</script>
