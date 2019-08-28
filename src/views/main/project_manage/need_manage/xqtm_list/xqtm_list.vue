<template>
  <div class="app-container">
    <el-collapse value="1">
      <el-collapse-item title="展开/收起搜索条件" name="1">
        <el-form ref="requireFormSearch" :inline="true" :model="requireFormSearch" label-width="110px">
          <el-form-item label="系统名称" prop="item_req_realize_sys">
            <el-select v-model="requireFormSearch.item_req_realize_sys" placeholder="请选择" clearable @change="onChangeSysName">
              <el-option v-for="item in requireObj.sysNameList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子系统名称" prop="item_req_realize_sys_son">
            <el-select v-model="requireFormSearch.item_req_realize_sys_son" placeholder="请选择" clearable>
              <el-option v-for="item in requireObj.sysSonNameList" :key="item.itemAppNameSon" :label="item.itemAppNameSon" :value="item.itemAppNameSon"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划上线版本号" prop="item_plan_release_ver">
            <el-input v-model="requireFormSearch.item_plan_release_ver" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="实际上线版本号" prop="item_current_release_ver">
            <el-input v-model="requireFormSearch.item_current_release_ver" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="需求条目编号" prop="item_req_list_id">
            <el-input v-model="requireFormSearch.item_req_list_id" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="需求条目主题" prop="item_req_title">
            <el-input v-model="requireFormSearch.item_req_title" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="需求设计编号" prop="item_sj_list_id">
            <el-input v-model="requireFormSearch.item_sj_list_id" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="需求设计名称" prop="item_sj_list_title">
            <el-input v-model="requireFormSearch.item_sj_list_title" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="测试版本号" prop="test_version">
            <el-input v-model="requireFormSearch.test_version" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="BPM签报号" prop="item_proj_start_signno">
            <el-input v-model="requireFormSearch.item_proj_start_signno" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="BPM项目名" prop="item_proj_name">
            <el-input v-model="requireFormSearch.item_proj_name" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="是否可用">
            <el-switch v-model="requireFormSearch.user"></el-switch>
          </el-form-item> -->
          <div class="mb20">
            <el-button type="primary" size="small" @click="onSearchRequireList">查询</el-button>
            <el-button type="success" size="small" @click="onResetRequire('requireFormSearch')">重置</el-button>
            <el-button type="warning" size="small" @click="onExport">导出Excel</el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table v-loading="listLoading" :data="requireObj.list" element-loading-text="Loading" border fit highlight-current-row :max-height="requireObj.height">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column label="需求设计编号" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_sj_list_id }}
        </template>
      </el-table-column>
      <el-table-column label="需求设计名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_sj_list_title }}
        </template>
      </el-table-column>
      <el-table-column label="需求条目编号" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.item_req_list_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求条目主题" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_req_title }}
        </template>
      </el-table-column>
      <el-table-column label="提出部门" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_depart }}
        </template>
      </el-table-column>
      <el-table-column label="系统" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_req_realize_sys }}
        </template>
      </el-table-column>
      <el-table-column label="子系统" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_req_realize_sys_son }}
        </template>
      </el-table-column>
      <el-table-column label="计划上线版本" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_plan_release_ver }}
        </template>
      </el-table-column>
      <el-table-column label="svn实际上线版本" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_current_release_ver }}
        </template>
      </el-table-column>
      <el-table-column label="Bpm签报号" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_proj_start_signno }}
        </template>
      </el-table-column>
      <el-table-column label="Bpm项目名" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_proj_name }}
        </template>
      </el-table-column>
      <el-table-column label="计划上线时间" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_plan_finish_date }}
        </template>
      </el-table-column>
      <el-table-column label="需求部门负责人" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_req_char }}
        </template>
      </el-table-column>
      <el-table-column label="设计部门负责人" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_sj_char }}
        </template>
      </el-table-column>
      <el-table-column label="开发部门负责人" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.item_dev_char }}
        </template>
      </el-table-column>
      <el-table-column label="测试版本" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.test_version }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.redmine_project_name }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="onOperateRequire('edit', scope.row)">修改</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      class="mt20"
      :current-page="requireObj.pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="requireObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="requireObj.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog title="修改" :visible.sync="requireDialogObj.visible" width="1200px">
      <el-form ref="weekForm" :model="requireDialogObj.form" :rules="requireDialogObj.rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="测试版本" prop="test_version">
              <el-input v-model="requireDialogObj.form.test_version" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="项目名称" prop="redmine_project_id">
              <el-select v-model="requireDialogObj.form.redmine_project_id" placeholder="请选择" clearable>
                <el-option v-for="item in requireDialogObj.projectList" :key="item.id" :label="item.item_system_name + item.item_app_name_son + item.version_no" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="requireDialogObj.visible = false">取 消</el-button>
        <el-button type="primary" @click="onOperateRequire('submit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import requireManageApi from '@/api/require_manage_api'
import { download } from '@/utils'

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
    const requiredTrue = {
      required: true,
      message: '此为必填项',
      trigger: 'change'
    }
    return {
      currentRow: {},
      // 需求条目 搜索条件
      requireFormSearch: {
        item_req_realize_sys: null, // 系统名称
        item_req_realize_sys_son: null, // 子系统名称
        item_plan_release_ver: '', // 计划上线版本号
        item_current_release_ver: '', // 实际上线版本号
        item_req_list_id: '', // 需求条目编号
        item_req_title: '', // 需求条目主题
        item_sj_list_id: '', // 需求设计编号
        item_sj_list_title: '', // 需求设计名称
        test_version: '', // 测试版本号
        item_proj_start_signno: '', // BPM签报号
        item_proj_name: '' // BPM项目名
        // user: '' // 是否可用
      },
      // 需求条目 信息
      requireObj: {
        height: 280,
        list: [],
        sysNameList: [],
        sysSonNameList: [],
        pageIndex: 1,
        pageSize: 20,
        total: 0
      },
      // 需求条目 dialog
      requireDialogObj: {
        visible: false,
        height: 200,
        projectList: [],
        form: {
          test_version: '',
          redmine_project_id: ''
        },
        rules: {
          test_version: [requiredTrue]
        }
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
    // })
  },
  methods: {
    // 导出
    onExport() {
      this.listLoading = true
      // axios({
      //   method: 'post',
      //   url: 'qcp-app/requirement/download',
      //   data: this.requireFormSearch,
      //   responseType: 'blob'
      // }).then(response => {
      //   this.listLoading = false
      //   this.download(response.data)
      // }).catch(error => {
      //   this.$message({
      //     type: 'error',
      //     message: error
      //   })
      // })
      requireManageApi.downloadRequire(this.requireFormSearch).then(response => {
        download(response, '需求条目列表.xls')
        this.listLoading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 双击修改
    // cellDbclick(row, column, cell, event) {
    //   if (column.label === '测试版本') {
    //     this.currentRow = row
    //     this.requireObj.list.forEach((current, index, arr) => {
    //       if (current.item_req_list_id === row.item_req_list_id) {
    //         this.requireObj.list[index].isEditTestVersion = true
    //         return
    //       }
    //     })
    //   } else if (column.label === '测试版本') {
    //     this.currentRow = row
    //     this.requireObj.list.forEach((current, index, arr) => {
    //       if (current.item_req_list_id === row.item_req_list_id) {
    //         this.requireObj.list[index].isEditPrjName = true
    //         return
    //       }
    //     })
    //   }
    // },
    // 失去焦点 测试版本
    // blurTestVersion(event) {
    //   this.listLoading = true
    //   const params = {
    //     item_req_list_id: this.currentRow.item_req_list_id,
    //     test_version: event.target.value
    //   }
    //   requireManageApi.updateRequireVersion(params).then(response => {
    //     this.requireObj.list.forEach((current, index, arr) => {
    //       if (current.item_req_list_id === this.currentRow.item_req_list_id) {
    //         this.requireObj.list[index].isEditTestVersion = false
    //         return
    //       }
    //       this.$message({
    //         type: 'success',
    //         message: response.message
    //       })
    //     })
    //     this.listLoading = false
    //   }).catch(error => {
    //     this.$message({
    //       type: 'error',
    //       message: error
    //     })
    //   })
    // },
    /** 需求条目列表 操作
     * @method onOperateRequire
     * @param {String} type edit: 修改;submit: 提交
     * @param {Object} row 当前行数据
     * @return 无
     */
    onOperateRequire(type, row) {
      if (type === 'edit') {
        this.currentRow = row
        this.requireDialogObj.form.test_version = row.test_version || ''
        this.requireDialogObj.form.redmine_project_id = row.redmine_project_id || ''
        const params = {}
        requireManageApi.getProjectList(params).then(response => {
          this.requireDialogObj.projectList = response.data.list
          this.requireDialogObj.visible = true
        })
      } else if (type === 'submit') {
        this.$refs['weekForm'].validate((valid) => {
          if (valid) {
            const paramsTest = {
              item_req_list_id: this.currentRow.item_req_list_id,
              test_version: this.requireDialogObj.form.test_version || ''
            }
            requireManageApi.updateRequireVersion(paramsTest).then(response => {
              const paramsPrjName = {
                item_req_list_id: this.currentRow.item_req_list_id,
                redmine_project_id: this.requireDialogObj.form.redmine_project_id || ''
              }
              requireManageApi.updateRedmineProject(paramsPrjName).then(response => {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.requireDialogObj.visible = false
                this.listLoading = false
                this.initRequire()
              }).catch(error => {
                this.$message({
                  type: 'error',
                  message: error
                })
              })
            }).catch(error => {
              this.$message({
                type: 'error',
                message: error
              })
            })
          }
        })
      }
    },
    // 需求条目列表 每页条数选择
    handleSizeChange(val) {
      this.requireObj.pageSize = val
      this.initRequire()
    },
    // 需求条目列表 当前页选择
    handleCurrentChange(val) {
      this.requireObj.pageIndex = val
      this.onSearchRequireList()
    },
    // 需求条目列表 初始化
    initRequire() {
      this.requireObj.pageIndex = 1
      this.onSearchRequireList()
    },
    // 需求条目列表 重置
    onResetRequire(formName) {
      this.$refs[formName].resetFields()
      this.initRequire()
    },
    // 需求条目列表 查询
    onSearchRequireList() {
      this.listLoading = true
      const params = {
        pageIndex: this.requireObj.pageIndex,
        pageSize: this.requireObj.pageSize
      }
      Object.assign(params, this.requireFormSearch)
      requireManageApi.getRequireList(params).then(response => {
        this.requireObj.list = response.data.list
        this.requireObj.total = response.data.total
        this.listLoading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 查询 系统名称列表
    onSearchSysNameList() {
      requireManageApi.getSysNameList().then(response => {
        this.requireObj.sysNameList = response.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 查询 子系统名称列表
    onChangeSysName(val) {
      if (val === null) {
        this.requireFormSearch.item_req_realize_sys_son = null
        return
      }
      const params = {
        sysName: val
      }
      requireManageApi.getSysSonNameList(params).then(response => {
        this.requireObj.sysSonNameList = response.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    fetchData() {
      this.onSearchRequireList()
      this.onSearchSysNameList()
    }
  }
}
</script>
