<template>
  <div>
    <el-form :inline="true" :model="formSearch" label-width="110px">
      <el-form-item label="统计筛选时间">
        <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        <!-- <el-button type="success" size="small" @click="onSearch">重置</el-button> -->
        <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      :span-method="spanMethod"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :max-height="autoHeight"
    >
      <el-table-column label="" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="排除obsoleted" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="不排除obsoleted" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.num2 }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getTestList } from '@/api/local'

export default {
  data() {
    return {
      autoHeight: 200,
      formSearch: {
        date: '',
        user: '',
        region: ''
      },
      list: [],
      listTop: [
        {
          name: '缺陷总计',
          type: '',
          num1: 1365,
          num2: 1388
        },
        {
          name: 'ST环境缺陷总计',
          type: '',
          num1: 711,
          num2: 722
        },
        {
          name: 'UAT环境缺陷总计',
          type: '',
          num1: 435,
          num2: 444
        },
        {
          name: '验收环境缺陷总计',
          type: '',
          num1: 207,
          num2: 210
        },
        {
          name: '模拟环境缺陷总计',
          type: '',
          num1: 11,
          num2: 11
        }
      ],
      listBottom: [
        {
          name: 'BENCH',
          type: 'ST环境缺陷数',
          num1: 72,
          num2: 72
        },
        {
          name: 'BENCH',
          type: 'UAT环境缺陷数',
          num1: 10,
          num2: 10
        },
        {
          name: 'BENCH',
          type: '验收环境缺陷数',
          num1: 0,
          num2: 0
        },
        {
          name: 'BENCH',
          type: '模拟环境缺陷数',
          num1: 0,
          num2: 0
        },
        {
          name: 'BENCH',
          type: '总计',
          num1: 82,
          num2: 82
        },
        {
          name: 'CBS',
          type: 'ST环境缺陷数',
          num1: 0,
          num2: 0
        },
        {
          name: 'CBS',
          type: 'UAT环境缺陷数',
          num1: 0,
          num2: 0
        },
        {
          name: 'CBS',
          type: '验收环境缺陷数',
          num1: 0,
          num2: 0
        },
        {
          name: 'CBS',
          type: '模拟环境缺陷数',
          num1: 0,
          num2: 0
        },
        {
          name: 'CBS',
          type: '总计',
          num1: 0,
          num2: 0
        }
      ],
      listLoading: true
    }
  },
  created() {
    console.log(222)
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$root.$el.clientHeight - 250
    })
  },
  methods: {
    // 合并单元格
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex < 5) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      } else if (rowIndex > 5) {
        if (columnIndex === 0) {
          if ((rowIndex - 6) % 5 === 0) {
            return {
              rowspan: 5,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    },
    // 查询
    onSearch() {
      console.log('submit!')
    },
    fetchData() {
      this.listLoading = true
      this.list = this.list.concat(this.listTop)
      this.list.push({
        name: '缺陷数据库名',
        type: '缺陷环境',
        num1: '排除obsoleted',
        num2: '不排除obsoleted'
      })
      this.list = this.list.concat(this.listBottom)

      this.listLoading = false
      // getTestList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>
