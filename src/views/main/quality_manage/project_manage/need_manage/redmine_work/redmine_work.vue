<template>
  <div class="app-container">
    <el-form :inline="true" :model="formSearch" label-width="110px">
      <el-form-item label="系统名">
        <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column label="报工项目名" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="onShowNeedList(scope.row)">{{ scope.row.author }}</el-button>
        </template>
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
            <el-button type="primary" size="mini" @click="onShowPDB(scope.row)">查看</el-button>
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
    <el-dialog :title="needDialogObj.title" :visible.sync="needDialogObj.visible" :fullscreen="true">
      <el-row :gutter="20">
        <el-col :span="14">
          <h2>需求条目列表</h2>
          <el-table :data="needDialogObj.needList" :max-height="needDialogObj.height" fit border stripe>
            <el-table-column prop="author" label="行数" min-width="60"></el-table-column>
            <el-table-column prop="author" label="需求条目编号" min-width="110"></el-table-column>
            <el-table-column prop="author" label="需求条目主题" min-width="280"></el-table-column>
            <el-table-column prop="author" label="需求条目细化内容" min-width="140"></el-table-column>
            <el-table-column prop="author" label="系统测试工作量" min-width="120"></el-table-column>
            <el-table-column prop="author" label="验收测试工作量" min-width="120"></el-table-column>
            <el-table-column prop="author" label="模拟测试工作量" min-width="120"></el-table-column>
            <el-table-column prop="author" label="工作量小计" min-width="100"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="10">
          <h2>测试轮次信息表</h2>
          <el-table :data="needDialogObj.testList" :max-height="needDialogObj.height" fit border stripe>
            <el-table-column prop="author" label="行数" min-width="60"></el-table-column>
            <el-table-column prop="author" label="任务名称" min-width="140"></el-table-column>
            <el-table-column prop="author" label="任务状态" min-width="80"></el-table-column>
            <el-table-column prop="author" label="任务类型" min-width="120"></el-table-column>
            <el-table-column prop="author" label="是否准入" min-width="80"></el-table-column>
            <el-table-column prop="author" label="准入情况" min-width="80"></el-table-column>
            <el-table-column prop="author" label="是否准出" min-width="80"></el-table-column>
            <el-table-column prop="author" label="工作量小计" min-width="100"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="pdb工作量填写情况" :visible.sync="pdbDialogObj.visible" top="5vh" width="1000px">
      <el-form :style="{ maxHeight: pdbDialogObj.height + 'px', overflow: 'auto' }" :model="pdbDialogObj.form">
        <el-form-item label="UAT计划轮次">
          <el-input-number v-model="pdbDialogObj.form.uat" size="mini" :min="0" :max="100" @change="onChangeUat"></el-input-number>
        </el-form-item>
        <el-form-item v-for="(item, index) in pdbDialogObj.form.uatList" :key="`系统测试${index}`" :label="`系统测试第${index + 1}轮用例个数`">
          <el-input-number v-model="item.value" size="mini" :min="0" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item v-if="pdbDialogObj.form.uat > 0" label="系统测试每轮计划每天执行用例数">
          <el-input-number v-model="pdbDialogObj.form.uatDay" size="mini" :min="0" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item label="UAT2计划轮次">
          <el-input-number v-model="pdbDialogObj.form.uat2" size="mini" :min="0" :max="100" @change="onChangeUat2"></el-input-number>
        </el-form-item>
        <el-form-item v-for="(item, index) in pdbDialogObj.form.uat2List" :key="`验收测试${index}`" :label="`验收测试第${index + 1}轮用例个数`">
          <el-input-number v-model="item.value" size="mini" :min="0" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item v-if="pdbDialogObj.form.uat2 > 0" label="验收测试每轮计划每天执行用例数">
          <el-input-number v-model="pdbDialogObj.form.uat2Day" size="mini" :min="0" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item label="MT计划轮次">
          <el-input-number v-model="pdbDialogObj.form.mt" size="mini" :min="0" :max="100" @change="onChangeMt"></el-input-number>
        </el-form-item>
        <el-form-item v-for="(item, index) in pdbDialogObj.form.mtList" :key="`模拟测试${index}`" :label="`模拟测试第${index + 1}轮用例个数`">
          <el-input-number v-model="item.value" size="mini" :min="0" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item v-if="pdbDialogObj.form.mt > 0" label="模拟测试每轮计划每天执行用例数">
          <el-input-number v-model="pdbDialogObj.form.mtDay" size="mini" :min="0" :max="9999"></el-input-number>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="自动化工作量占比">
              <el-input-number v-model="pdbDialogObj.form.autoWork" size="mini" :min="0" :max="9999"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="管理工作量占比">
              <el-input-number v-model="pdbDialogObj.form.manageWork" size="mini" :min="0" :max="9999"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="测试准备工作量">
              <el-input-number v-model="pdbDialogObj.form.testWork" size="mini" :min="0" :max="9999"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pdbDialogObj.visible = false">取 消</el-button>
        <el-button type="primary" @click="pdbDialogObj.visible = false">确 定</el-button>
      </div>
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
      needDialogObj: {
        title: '',
        visible: false,
        height: 200,
        needList: [],
        testList: []
      },
      pdbDialogObj: {
        visible: false,
        height: 200,
        form: {
          uat: 0,
          uatList: [],
          uatDay: 0,
          uat2: 0,
          uat2List: [],
          uat2Day: 0,
          mt: 0,
          mtList: [],
          mtDay: 0,
          autoWork: 0,
          manageWork: 0,
          testWork: 0
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
      this.needDialogObj.height = this.$root.$el.clientHeight - 180
      this.pdbDialogObj.height = this.$root.$el.clientHeight - 280

      window.onresize = () => {
        this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
        this.needDialogObj.height = this.$root.$el.clientHeight - 180
        this.pdbDialogObj.height = this.$root.$el.clientHeight - 280
      }
    })
  },
  methods: {
    // 显示需求条目列表
    onShowNeedList(row) {
      console.log(row)
      this.needDialogObj.visible = true
    },
    // 显示PDB
    onShowPDB(row) {
      console.log(row)
      this.pdbDialogObj.visible = true
    },
    // uat change
    onChangeUat(event) {
      console.log(event)
      this.pdbDialogObj.form.uatList = Array.from({ length: event }, () => ({ value: 0 }))
      this.pdbDialogObj.form.uatDay = 0
    },
    // uat2 change
    onChangeUat2(event) {
      console.log(event)
      this.pdbDialogObj.form.uat2List = Array.from({ length: event }, () => ({ value: 0 }))
      this.pdbDialogObj.form.uat2Day = 0
    },
    // mt change
    onChangeMt(event) {
      console.log(event)
      this.pdbDialogObj.form.mtList = Array.from({ length: event }, () => ({ value: 0 }))
      this.pdbDialogObj.form.mtDay = 0
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
        this.needDialogObj.needList = response.data.items
        this.needDialogObj.testList = response.data.items
        this.needDialogObj.title = `需求条目工作量总计为482.2;实际执行工作量总计为0.0`
      })
    }
  }
}
</script>
