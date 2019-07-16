<template>
  <div class="app-container">
    <el-button class="add" type="info" size="small" @click="onOperate('add')">新增</el-button>
    <el-form ref="formSearch" :inline="true" :model="formSearch" label-width="100px">
      <el-form-item label="编号">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="提交人">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="一级菜单">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="二级菜单">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="缺陷标题">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formSearch.region" placeholder="请选择" clearable>
          <el-option label="Commit" value="0"></el-option>
          <el-option label="locking" value="1"></el-option>
          <el-option label="test" value="2"></el-option>
          <el-option label="close" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级">
        <el-select v-model="formSearch.region" placeholder="请选择" clearable>
          <el-option label="高" value="0"></el-option>
          <el-option label="中" value="1"></el-option>
          <el-option label="低" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker v-model="formSearch.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <div class="mb20">
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        <!-- <el-button type="success" size="small" @click="onSearch">重置</el-button>
        <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button> -->
      </div>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight">
      <el-table-column label="编号" min-width="180" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="缺陷标题" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="一级菜单" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级菜单" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="提交人" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="优先级" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间" min-width="120" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column label="状态变更时间" min-width="120" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="onOperate('edit', scope.row)">修改</el-button>
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
    <el-dialog :title="dialogObj.title" :visible.sync="dialogObj.visible" top="5vh" width="800px">
      <el-form :model="dialogObj.form" label-width="110px">
        <el-form-item label="编号">
          <el-input v-model="dialogObj.form.title" placeholder="请输入" clearable readonly></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提交人">
              <el-input v-model="dialogObj.form.type" placeholder="请输入" clearable readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="优先级">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="高" value="0"></el-option>
                <el-option label="中" value="1"></el-option>
                <el-option label="低" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="Commit" value="0"></el-option>
                <el-option label="locking" value="1"></el-option>
                <el-option label="test" value="2"></el-option>
                <el-option label="close" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="一级菜单">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="高" value="0"></el-option>
                <el-option label="中" value="1"></el-option>
                <el-option label="低" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二级菜单">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="高" value="0"></el-option>
                <el-option label="中" value="1"></el-option>
                <el-option label="低" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="标题">
          <el-input v-model="dialogObj.form.title" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dialogObj.form.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="dialogObj.form.title" placeholder="请输入" clearable readonly></el-input>
        </el-form-item>
        <el-form-item v-if="dialogObj.type === 'edit'" label="状态变更时间">
          <el-input v-model="dialogObj.form.title" placeholder="请输入" clearable readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogObj.visible = false">确 定</el-button>
      </div>
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
      dialogObj: {
        type: null,
        title: '',
        visible: false,
        list: [],
        form: {}
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
     * 操作
     * @method onOperate
     * @param {String} type add:新增;edit:修改
     * @param {Object} row 当前行数据
     * @return 无
     */
    onOperate(type, row) {
      this.dialogObj.type = type
      this.dialogObj.title = `${type === 'add' ? '新增' : '修改'}缺陷`
      this.dialogObj.visible = true
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
