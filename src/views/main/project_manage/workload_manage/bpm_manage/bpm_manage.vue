<template>
  <div class="app-container">
    <div class="mb20">
      <span>数据最近同步时间: 2019-08-19 16:00:52</span>
      <el-button class="ml20" type="primary" size="small" @click="onSearch">查看实时工作量</el-button>
    </div>
    <el-collapse value="1">
      <el-collapse-item title="展开/收起搜索条件" name="1">
        <el-form :inline="true" :model="bpmFormSearch" label-width="140px">
          <el-form-item label="项目名">
            <el-input v-model="bpmFormSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="系统名">
            <el-input v-model="bpmFormSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="系统版本号">
            <el-input v-model="bpmFormSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="启动签报号">
            <el-input v-model="bpmFormSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="申请单号">
            <el-input v-model="bpmFormSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="测试占比">
            <el-select v-model="bpmFormSearch.region" placeholder="请选择" clearable>
              <el-option label="本币交易直通式处理系统" value="0"></el-option>
              <el-option label="中国货币网" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划上线时间" prop="planTime">
            <el-date-picker v-model="bpmFormSearch.planTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="启动签报批准时间" prop="planTime">
            <el-date-picker v-model="bpmFormSearch.planTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="BPM数据来源">
            <el-select v-model="bpmFormSearch.region" placeholder="请选择" clearable>
              <el-option label="电子需求单" value="电子需求单"></el-option>
              <el-option label="应用需求设计" value="应用需求设计"></el-option>
              <el-option label="老BPM数据" value="老BPM数据"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统状态">
            <el-select v-model="bpmFormSearch.region" placeholder="请选择" clearable>
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="开发未反馈" value="开发未反馈"></el-option>
              <el-option label="测试未反馈" value="测试未反馈"></el-option>
              <el-option label="空" value="空"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前环节">
            <el-select v-model="bpmFormSearch.region" placeholder="请选择" clearable>
              <el-option label="PMO校对" value="PMO校对"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
              <el-option label="待负责人确认" value="待负责人确认"></el-option>
              <el-option label="结束" value="结束"></el-option>
              <el-option label="填写签报信息" value="填写签报信息"></el-option>
              <el-option label="完成" value="完成"></el-option>
              <el-option label="条目拆分" value="条目拆分"></el-option>
              <el-option label="工作量评估" value="工作量评估"></el-option>
              <el-option label="回填签报信息" value="回填签报信息"></el-option>
              <el-option label="实施" value="实施"></el-option>
              <el-option label="需求提出" value="需求提出"></el-option>
              <el-option label="设计部门项目负责人评审" value="设计部门项目负责人评审"></el-option>
              <el-option label="部门领导评审" value="部门领导评审"></el-option>
              <el-option label="采购确认" value="采购确认"></el-option>
              <el-option label="项目负责人评审" value="项目负责人评审"></el-option>
              <el-option label="调整需求信息" value="调整需求信息"></el-option>
              <el-option label="需求部门领导评审" value="需求部门领导评审"></el-option>
              <el-option label="中心领导评审" value="中心领导评审"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测试负责人">
            <el-select v-model="bpmFormSearch.region" placeholder="请选择" clearable>
              <el-option label="徐慧鹏" value="徐慧鹏"></el-option>
              <el-option label="孔伟哲" value="孔伟哲"></el-option>
              <el-option label="赵丹" value="赵丹"></el-option>
              <el-option label="王嘉俊" value="王嘉俊"></el-option>
            </el-select>
          </el-form-item>
          <div class="mb20">
            <el-button type="primary" size="small" @click="onSearch">查询</el-button>
            <el-button type="success" size="small" @click="onSearch">重置</el-button>
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
      bpmFormSearch: {
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
