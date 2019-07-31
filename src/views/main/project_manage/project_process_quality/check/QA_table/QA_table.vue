<template>
  <div class="app-container">
    <el-form :inline="true" :model="formSearch" label-width="100px">
      <el-form-item label="时间">
        <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="系统名称">
        <el-select v-model="formSearch.region" placeholder="请选择" clearable>
          <el-option label="本币交易直通式处理系统" value="0"></el-option>
          <el-option label="中国货币网" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目状态">
        <el-select v-model="formSearch.region" placeholder="请选择" clearable>
          <el-option label="全部项目状态" value="0"></el-option>
          <el-option label="空" value="1"></el-option>
          <el-option label="进行中" value="2"></el-option>
          <el-option label="已上线" value="3"></el-option>
          <el-option label="取消" value="4"></el-option>
          <el-option label="完成不上线" value="5"></el-option>
          <el-option label="暂停" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审计状态">
        <el-select v-model="formSearch.region" placeholder="请选择" clearable>
          <el-option label="全部项目" value="0"></el-option>
          <el-option label="未审计" value="1"></el-option>
          <el-option label="已审计" value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class="mb20">
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        <!-- <el-button type="success" size="small" @click="onSearch">重置</el-button> -->
        <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
      </div>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight">
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
      <el-table-column label="查看检查表" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目来源" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="PDB项目编号" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="项目状态" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="计划开始时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="实际开始时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="计划上线时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="实际上线时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="onShowDetail(scope.row)">查看不通过日志</el-button>
          <el-button size="mini" type="primary" plain @click="onShowDetail(scope.row)">查看更新日志</el-button>
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
    onShowDetail(row) {
      console.log(row)
      this.isShowDialog = true
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
