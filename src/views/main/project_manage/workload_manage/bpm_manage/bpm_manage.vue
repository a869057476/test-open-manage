<template>
  <div class="app-container">
    <el-collapse value="1">
      <el-collapse-item title="展开/收起搜索条件" name="1">
        <el-form :inline="true" :model="formSearch" label-width="100px">
          <el-form-item label="数据库">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子系统名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测试环境">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺陷状态">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提交人">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测试阶段">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子系统版本">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺陷编号">
            <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="原子系统名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原子系统版本">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子系统名称或版本号存在差异" label-width="200px">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <div class="mb20">
            <el-button type="primary" size="small" @click="onSearch">查询</el-button>
            <!-- <el-button type="success" size="small" @click="onSearch">重置</el-button> -->
            <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit stripe highlight-current-row :max-height="autoHeight">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column label="编号" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="子系统名称" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="子系统版本号" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="原子系统名称" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="原子系统版本号" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="缺陷等级" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="缺陷原因" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="测试环境" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="测试阶段" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="提交人" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="模板一" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="模板二" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="最近状态变更时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
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
      autoHeight: 280,
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
        this.list = response.data.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
