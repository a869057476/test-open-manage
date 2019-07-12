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
      <el-form-item label="最少close-submit缺陷数" label-width="180px">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="最少release-open缺陷数" label-width="180px">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <div class="mb20">
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        <el-button type="success" size="small" @click="onSearch">重置</el-button>
        <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
      </div>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight">
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
      <el-table-column label="close-submit数目" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="release-open数目" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="onShowDetail('close-submit', scope.row)">查看close-submit</el-button>
          <el-button size="mini" type="primary" plain @click="onShowDetail('release-open', scope.row)">查看release-open</el-button>
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
    <el-dialog :title="releaseDialogObj.title" :visible.sync="releaseDialogObj.visible" top="5vh" width="1200px">
      <el-table :data="releaseDialogObj.list" :max-height="releaseDialogObj.height" fit border stripe>
        <el-table-column prop="author" label="缺陷编号" min-width="100"></el-table-column>
        <el-table-column prop="author" label="系统名称" min-width="140"></el-table-column>
        <el-table-column prop="author" label="缺陷版本号" min-width="100"></el-table-column>
        <el-table-column prop="author" label="缺陷标题" min-width="200"></el-table-column>
        <el-table-column prop="author" label="提交时间" min-width="100"></el-table-column>
        <el-table-column prop="author" label="提交人" min-width="80"></el-table-column>
        <el-table-column prop="author" label="Reopen时间" min-width="110"></el-table-column>
        <el-table-column prop="author" label="操作人" min-width="80"></el-table-column>
        <el-table-column prop="author" label="缺陷等级" min-width="100"></el-table-column>
        <el-table-column prop="author" label="缺陷状态" min-width="100"></el-table-column>
      </el-table>
      <el-pagination
        class="mt20"
        :current-page="releaseDialogObj.currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { getTestList } from '@/api/local'

export default {
  data() {
    return {
      autoHeight: 200,
      currentPage: 1,
      formSearch: {
        user: '',
        region: ''
      },
      list: [],
      listLoading: true,
      releaseDialogObj: {
        currentPage: 1,
        title: '',
        visible: false,
        list: [],
        height: 200
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
      this.releaseDialogObj.height = this.$root.$el.clientHeight - 260

      window.onresize = () => {
        this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
        this.releaseDialogObj.height = this.$root.$el.clientHeight - 260
      }
    })
  },
  methods: {
    /**
     * 显示详情
     * @method onShowDetail
     * @param {String} type close-submit release-open
     * @param {Object} row 当前行数据
     * @return 无
     */
    onShowDetail(type, row) {
      console.log(row)
      this.releaseDialogObj.title = `缺陷${type}列表`
      this.releaseDialogObj.list = this.list
      this.releaseDialogObj.visible = true
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
