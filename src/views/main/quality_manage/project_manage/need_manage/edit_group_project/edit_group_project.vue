<template>
  <div class="app-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="新增组-PDB系统间权限(报工量汇总相关)" name="1">
        <el-form :inline="true" :model="formSearch" label-width="140px">
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
            <el-button type="success" size="small" @click="onShowDetail('work')">查看项目权限</el-button>
          </div>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="新增组-全流程系统间权限(需求条目相关)" name="2">
        <el-form :inline="true" :model="formSearch" label-width="140px">
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
            <el-button type="success" size="small" @click="onShowDetail('need')">查看项目权限</el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-dialog :title="groupDialogObj.title" :visible.sync="groupDialogObj.visible" top="5vh" width="800px">
      <el-table :data="groupDialogObj.list" :max-height="groupDialogObj.height" fit border stripe>
        <el-table-column prop="author" label="测试小组名" min-width="180"></el-table-column>
        <el-table-column v-if="groupDialogObj.type === 'work'" prop="author" label="新老PDB系统标识" min-width="180"></el-table-column>
        <el-table-column v-if="groupDialogObj.type === 'work'" prop="author" label="PDB系统名称" min-width="180"></el-table-column>
        <el-table-column v-if="groupDialogObj.type === 'need'" prop="author" label="全流程系统名称" min-width="180"></el-table-column>
        <el-table-column v-if="groupDialogObj.type === 'need'" prop="author" label="全流程子系统名称" min-width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="onShowDetail(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt20"
        :current-page="groupDialogObj.currentPage"
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
      activeNames: ['1', '2'],
      currentPage: 1,
      formSearch: {
        user: '',
        region: ''
      },
      list: [],
      listLoading: true,
      groupDialogObj: {
        type: 'work',
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
      this.groupDialogObj.height = this.$root.$el.clientHeight - 260

      window.onresize = () => {
        this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
        this.groupDialogObj.height = this.$root.$el.clientHeight - 260
      }
    })
  },
  methods: {
    /**
     * 显示详情
     * @method onShowDetail
     * @param {String} type work:报工量,need:需求条目
     * @return 无
     */
    onShowDetail(type) {
      this.groupDialogObj.type = type
      if (type === 'work') {
        this.groupDialogObj.title = '删除组-PDB系统间权限(报工量汇总相关)'
      } else if (type === 'need') {
        this.groupDialogObj.title = '删除组-全流程系统间权限(需求条目相关)'
      }
      this.groupDialogObj.list = this.list
      this.groupDialogObj.visible = true
    },
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
