<template>
  <div class="app-container">
    <el-form :inline="true" :model="formSearch" label-width="110px">
      <el-form-item label="状态">
        <el-select v-model="formSearch.region" placeholder="请选择" clearable>
          <el-option label="close-submit" value="0"></el-option>
          <el-option label="release-open" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据库名称">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="缺陷系统名称">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="缺陷大版本号">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="最少release缺陷数" label-width="180px">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="CQ">
        <el-select v-model="formSearch.region" placeholder="请选择" clearable>
          <el-option label="CQ去重" value="0"></el-option>
          <el-option label="CQ不去重" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Release时间" label-width="180px">
        <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <div class="mb20">
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        <el-button type="success" size="small" @click="onSearch">重置</el-button>
        <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
      </div>
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
      <el-table-column label="数据库名称" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="系统名称" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="缺陷大版本号" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="release数目" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="操作最早时间" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="操作最晚时间" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="onDetail(scope.row)">查看release缺陷</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt20"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTestList } from '@/api/local'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      autoHeight: 200,
      currentPage: 1,
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
      this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
    })
  },
  methods: {
    onDetail(row) {
      console.log(row)
    },
    // 每页条数选择
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 当前页选择
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
