<template>
  <div class="app-container">
    <el-form :inline="true" :model="formSearch" label-width="100px">
      <el-form-item label="系统名称">
        <el-select v-model="formSearch.region" placeholder="请选择" clearable>
          <el-option label="本币交易直通式处理系统" value="0"></el-option>
          <el-option label="中国货币网" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :max-height="autoHeight"
    >
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column label="系统名称" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="版本号" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="项目状态" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代码行数" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="结项功能点" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="计划开始日期" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="实际开始日期" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="计划上线日期" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="实际上线日期" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="onShowDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="table" width="1200px" :visible.sync="isShowDialog">
    </el-dialog>
  </div>
</template>

<script>
import { getTestList } from '@/api/local'

export default {
  data() {
    return {
      isShowDialog: false,
      autoHeight: 200,
      formSearch: {
        date: '',
        user: '',
        region: ''
      },
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 50
    })
  },
  methods: {
    onShowDetail(row) {
      console.log(row)
      this.isShowDialog = true
    },
    // 查询
    onSearch() {
      console.log('submit!')
    },
    fetchData() {
      this.listLoading = true
      getTestList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
