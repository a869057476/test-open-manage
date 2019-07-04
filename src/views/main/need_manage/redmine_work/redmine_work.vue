<template>
  <div class="app-container">
    <el-form :inline="true" :model="formSearch" label-width="110px" class="demo-form-inline">
      <el-form-item label="系统名">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
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
      <el-table-column label="报工项目名" prop="author" width="120" align="center">
      </el-table-column>
      <el-table-column label="项目状态" prop="author" width="120" align="center">
      </el-table-column>
      <el-table-column label="负责人" prop="author" width="120" align="center">
      </el-table-column>
      <el-table-column label="项目来源" prop="author" width="120" align="center">
      </el-table-column>
      <el-table-column label="预算工作量" prop="author" width="120" align="center">
        <el-table-column label="系统测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="验收测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="模拟测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="工作量汇总" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="分出工作量百分比" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="外部工作量" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="实际可用工作量" prop="author" width="120" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="PDB预估工作量" prop="author" width="120" align="center">
        <el-table-column label="系统测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="验收测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="模拟测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="工作量汇总" prop="author" width="120" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="PDB预填工作量" prop="author" width="120" align="center">
        <el-table-column label="系统测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="验收测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="模拟测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="工作量汇总" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="操作" prop="author" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain>查看</el-button>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="真实报工量" prop="author" width="120" align="center">
        <el-table-column label="系统测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="验收测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="模拟测试" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="工作量汇总" prop="author" width="120" align="center">
        </el-table-column>
        <el-table-column label="测试准备" prop="author" width="120" align="center">
        </el-table-column>
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
