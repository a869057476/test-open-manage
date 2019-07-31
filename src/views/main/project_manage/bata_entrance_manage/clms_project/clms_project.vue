<template>
  <div class="app-container">
    <el-form ref="formSearch" :inline="true" :model="formSearch">
      <el-form-item label="关键字">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        <el-button type="primary" size="small" @click="onSearch">查询报工单</el-button>
        <el-button type="info" size="small" @click="onSearch">新建报工单</el-button>
        <el-button type="info" size="small" @click="onSearch">查看项目报工单</el-button>
        <el-button type="warning" size="small" @click="onSearch">一键提交报工</el-button>
        <el-button type="danger" size="small" @click="onSearch">一键撤回报工</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight">
      <el-table-column label="项目代码" min-width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="系统名称" min-width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="子系统名称" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="系统版本" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="项目进度状态" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="项目所属部门" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="负责人" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="项目类别" min-width="100" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="onShowProjectInfo(scope.row)">修改</el-button>
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
    <el-dialog title="修改项目详情" :visible.sync="projectDialogObj.visible" fullscreen>
      <el-table :data="projectDialogObj.list" border fi>
        <el-table-column label="项目名称" min-width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column label="系统名称" min-width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.systemName }}
          </template>
        </el-table-column>
        <el-table-column label="子系统名称" min-width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.childSystemName }}
          </template>
        </el-table-column>
        <el-table-column label="系统版本" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.systemVersion }}
          </template>
        </el-table-column>
        <el-table-column label="计划用时(人天)" min-width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.planTimeDay }}
          </template>
        </el-table-column>
        <el-table-column label="资源排布(人月)" min-width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.resourceConfigMonth }}
          </template>
        </el-table-column>
        <el-table-column label="资源排布(人天)" min-width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.resourceConfigDay }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="onShowTaskInfo('add', scope.row)">新增任务</el-button>
            <el-button size="mini" type="primary" plain @click="onShowTaskInfo('edit', scope.row)">查看任务</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="projectDialogObj.visible = false">取消</el-button>
        <el-button type="primary" @click="projectDialogObj.visible = false">确定</el-button>
      </div>
      <el-dialog :title="taskAddDialogObj.title" :visible.sync="taskAddDialogObj.visible" width="1200px" append-to-body>
        <el-form :inline="true" :model="taskAddDialogObj.form" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="任务名">
                <el-select v-model="taskAddDialogObj.form.region" placeholder="请选择" clearable>
                  <el-option label="task1" value="0"></el-option>
                  <el-option label="task2" value="1"></el-option>
                  <el-option label="task3" value="2"></el-option>
                  <el-option label="task4" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当前轮次">
                <el-input v-model="taskAddDialogObj.form.user" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="测试小版本号">
                <el-input v-model="taskAddDialogObj.form.user" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="计划用时-天数">
                <el-input v-model="taskAddDialogObj.form.user" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划开始时间">
                <el-date-picker v-model="taskAddDialogObj.form.date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划完成时间">
                <el-date-picker v-model="taskAddDialogObj.form.date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="准入信息">
                <el-select v-model="taskAddDialogObj.form.region" placeholder="请选择" clearable>
                  <el-option label="准入通过" value="0"></el-option>
                  <el-option label="准入不通过" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="准入详情">
                <el-input v-model="taskAddDialogObj.form.user" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="准出信息">
                <el-select v-model="taskAddDialogObj.form.region" placeholder="请选择" clearable>
                  <el-option label="准出通过，测试完成" value="0"></el-option>
                  <el-option label="准出未通过，测试完成" value="1"></el-option>
                  <el-option label="评估后准出通过，测试完成" value="1"></el-option>
                  <el-option label="准出未通过，测试未完成" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="准出详情">
                <el-input v-model="taskAddDialogObj.form.user" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="任务详情(选填-200个字符以内)" label-width="300px">
            <el-input v-model="taskAddDialogObj.form.content" type="textarea" maxlength="200" style="width: 500px;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="taskAddDialogObj.visible = false">取消</el-button>
          <el-button type="primary" @click="taskAddDialogObj.visible = false">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="taskEditDialogObj.title" :visible.sync="taskEditDialogObj.visible" width="1200px" append-to-body>
        <el-button type="primary" @click="onShowTaskInfo('add', taskEditDialogObj.row)">新增</el-button>
        <el-button type="primary" @click="onDelete">删除</el-button>
        <div slot="footer" class="dialog-footer">
          <el-button @click="taskEditDialogObj.visible = false">取消</el-button>
          <el-button type="primary" @click="taskEditDialogObj.visible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
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
      listLoading: true,
      // 项目详情dialog
      projectDialogObj: {
        visible: false,
        list: [
          {
            projectName: '数据仓库系统V6.3.0',
            systemName: '数据仓库系统',
            childSystemName: '子数据仓库系统',
            systemVersion: 'V6.3.0',
            planTimeDay: '',
            resourceConfigMonth: 10.15,
            resourceConfigDay: 215.2
          }
        ],
        form: {}
      },
      // 新增任务dialog
      taskAddDialogObj: {
        visible: false,
        title: '',
        form: {}
      },
      // 任务dialog
      taskEditDialogObj: {
        visible: false,
        title: '',
        row: {}
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$el.parentNode.clientHeight - this.$refs.formSearch.$el.clientHeight - 100

      window.onresize = () => {
        this.autoHeight = this.$el.parentNode.clientHeight - this.$refs.formSearch.$el.clientHeight - 100
      }
    })
  },
  methods: {
    /**
     * 切换项目详情dialog
     * @method onShowProjectInfo
     * @param {Object} row 当前行数据
     * @return 无
     */
    onShowProjectInfo(row) {
      this.projectDialogObj.visible = true
    },
    /**
     * 切换任务详情dialog
     * @method onShowTaskInfo
     * @param {String} type add:新增;edit:修改
     * @param {Object} row 当前行数据
     * @return 无
     */
    onShowTaskInfo(type, row) {
      if (type === 'add') {
        this.taskAddDialogObj.title = `${type === 'add' ? '新增' : '修改'}任务信息：${row.projectName}`
        this.taskAddDialogObj.visible = true
      } else if (type === 'edit') {
        this.taskEditDialogObj.row = row
        this.taskEditDialogObj.title = `${type === 'add' ? '新增' : '修改'}任务信息：${row.projectName}`
        this.taskEditDialogObj.visible = true
      }
    },
    onDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除成功')
      }).catch(() => {
        console.log('取消删除')         
      })
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
