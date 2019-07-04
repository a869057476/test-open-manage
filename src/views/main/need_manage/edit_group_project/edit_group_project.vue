<template>
  <div class="app-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="新增组-PDB系统间权限(报工量汇总相关)" name="1">
        <el-form :inline="true" :model="formSearch" label-width="140px" class="demo-form-inline">
          <el-form-item label="小组名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="close-submit" value="0"></el-option>
              <el-option label="release-open" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新老PDB系统">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="close-submit" value="0"></el-option>
              <el-option label="release-open" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="PDB系统名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="close-submit" value="0"></el-option>
              <el-option label="release-open" value="1"></el-option>
            </el-select>
          </el-form-item>
          <div class="mb20">
            <el-button type="primary" size="small" @click="onSearch">新增PDB项目权限</el-button>
            <el-button type="success" size="small" @click="onSearch">查看项目权限</el-button>
          </div>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="新增组-全流程系统间权限(需求条目相关)" name="2">
        <el-form :inline="true" :model="formSearch" label-width="140px" class="demo-form-inline">
          <el-form-item label="小组名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="close-submit" value="0"></el-option>
              <el-option label="release-open" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="全流程系统名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="close-submit" value="0"></el-option>
              <el-option label="release-open" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="全流程子系统名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="close-submit" value="0"></el-option>
              <el-option label="release-open" value="1"></el-option>
            </el-select>
          </el-form-item>
          <div class="mb20">
            <el-button type="primary" size="small" @click="onSearch">新增全流程项目权限</el-button>
            <el-button type="success" size="small" @click="onSearch">查看项目权限</el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getTestList, getTest } from '@/api/local'

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
      activeNames: ['1', '2'],
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
    handleChange(val) {
      console.log(val)
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

      // getTest().then(response => {
      //   console.log(response)
      // })
    }
  }
}
</script>
