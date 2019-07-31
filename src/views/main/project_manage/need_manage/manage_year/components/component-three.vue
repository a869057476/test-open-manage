<template>
  <div>
    <el-form :inline="true" :model="formSearch" label-width="110px">
      <el-form-item label="统计时间">
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
      :data="numList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :max-height="autoHeight"
    >
      <el-table-column label="系统测试" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.num1 }}
        </template>
      </el-table-column>
      <el-table-column label="验收测试" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模拟测试" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.num3 }}
        </template>
      </el-table-column>
      <el-table-column label="系统联测" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.num4 }}
        </template>
      </el-table-column>
      <el-table-column label="模拟联测" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.num5 }}
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-loading="listLoading"
      class="mt20"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :max-height="autoHeight"
    >
      <el-table-column label="系统名" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="负责人" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="升级测试包含版本" min-width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统测试" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="验收测试" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="模拟测试" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="无升级测试包含版本" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="系统联测" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="模拟联测" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTestList } from '@/api/local'

export default {
  data() {
    return {
      autoHeight: 200,
      formSearch: {
        date: '',
        user: '',
        region: ''
      },
      numList: [],
      list: [],
      listLoading: true
    }
  },
  created() {
    console.log(333)
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$root.$el.clientHeight - 370
    })
  },
  methods: {
    // 查询
    onSearch() {
      console.log('submit!')
    },
    fetchData() {
      this.listLoading = true
      getTestList().then(response => {
        this.list = response.data.items
        this.numList = [{
          num1: 56,
          num2: 5,
          num3: 112,
          num4: 11,
          num5: 19
        }]
        this.listLoading = false
      })
    }
  }
}
</script>
