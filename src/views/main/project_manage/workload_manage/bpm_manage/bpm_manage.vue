<template>
  <div class="app-container">
    <div class="mb20">
      <span>数据最近同步时间: {{ updateTime }}</span>
      <el-button class="ml20" type="primary" size="small" @click="onSearchBPMList">查看实时工作量</el-button>
    </div>
    <el-collapse value="1">
      <el-collapse-item title="展开/收起搜索条件" name="1">
        <el-form ref="bpmFormSearch" :inline="true" :model="bpmFormSearch" label-width="140px">
          <el-form-item label="项目名" prop="itemProjName">
            <el-input v-model="bpmFormSearch.itemProjName" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="系统名" prop="sysName">
            <el-input v-model="bpmFormSearch.sysName" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="系统版本号" prop="version">
            <el-input v-model="bpmFormSearch.version" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="启动签报号" prop="startRunno">
            <el-input v-model="bpmFormSearch.startRunno" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="申请单号" prop="itemReqNum">
            <el-input v-model="bpmFormSearch.itemReqNum" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="测试占比" prop="workShareType">
            <el-select v-model="bpmFormSearch.workShareType" placeholder="请选择" clearable>
              <el-option v-for="item in bpmObj.testRatioList" :key="item.key" :label="item.key" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划上线时间" prop="itemOnlineArrange">
            <el-date-picker v-model="bpmFormSearch.itemOnlineArrange" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="启动签报批准时间" prop="allowTime">
            <el-date-picker v-model="bpmFormSearch.allowTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="BPM数据来源" prop="dataFrom">
            <el-select v-model="bpmFormSearch.dataFrom" placeholder="请选择" clearable>
              <el-option label="电子需求单" value="电子需求单"></el-option>
              <el-option label="应用需求设计" value="应用需求设计"></el-option>
              <el-option label="老BPM数据" value="老BPM数据"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统状态" prop="fkStatus">
            <el-select v-model="bpmFormSearch.fkStatus" placeholder="请选择" clearable>
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="开发未反馈" value="开发未反馈"></el-option>
              <el-option label="测试未反馈" value="测试未反馈"></el-option>
              <el-option label="空" value="空"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前环节" prop="itemCurLink">
            <el-select v-model="bpmFormSearch.itemCurLink" placeholder="请选择" clearable>
              <el-option v-for="item in bpmObj.curLinkList" :key="item.ITEM_CUR_LINK" :label="item.ITEM_CUR_LINK" :value="item.ITEM_CUR_LINK"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测试负责人" prop="usernameZh">
            <el-select v-model="bpmFormSearch.usernameZh" placeholder="请选择" clearable>
              <el-option v-for="item in bpmObj.testUserNameList" :key="item.USERNAME" :label="item.USERNAME" :value="item.USERNAME"></el-option>
            </el-select>
          </el-form-item>
          <div class="mb20">
            <el-button type="primary" size="small" @click="onSearchBPMList">查询</el-button>
            <el-button type="success" size="small" @click="onResetBPM('bpmFormSearch')">重置</el-button>
            <el-button type="warning" size="small" @click="onSearchBPMList">导出Excel</el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table v-loading="listLoading" :data="bpmObj.list" element-loading-text="Loading" border fit stripe highlight-current-row :max-height="bpmObj.height" @cell-dblclick="cellDbclick">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column fixed="left" label="项目名" min-width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.ITEM_PROJ_NAME }}
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="数据来源" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.DATA_FROM }}
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="启动签报号" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.START_RUNNO }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="申请单号" min-width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.ITEM_REQ_NUM }}
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="当前环节" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.ITEM_CUR_LINK }}
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="系统名称" min-width="140" align="center">
        <template slot-scope="scope">
          <span :style="{ color: '#409EFF', cursor: 'pointer' }" @click="onShowDetail(scope.row)">{{ scope.row.SYS_NAME + (scope.row.SYS_SON_NAME ? scope.row.SYS_SON_NAME : '')  + scope.row.VERSION }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="测试负责人" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.USERNAME_ZH }}
        </template>
      </el-table-column>
      <el-table-column label="系统测试(人天)" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.UAT_TEST }}
        </template>
      </el-table-column>
      <el-table-column label="验收测试(人天)" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.CHECK_TEST }}
        </template>
      </el-table-column>
      <el-table-column label="模拟测试(人天)" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.MOCK_TEST }}
        </template>
      </el-table-column>
      <el-table-column label="工作总量(人天)" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.ITEM_TOTAL_MAN_DAY }}
        </template>
      </el-table-column>
      <el-table-column label="测试工作量占比" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.TEST_WORK_SHARE }}
        </template>
      </el-table-column>
      <el-table-column label="性能工作量填写状态" min-width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.XN }}
        </template>
      </el-table-column>
      <el-table-column label="系统测试部署工作量" min-width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.SCM_DEPLOY_DAY }}
        </template>
      </el-table-column>
      <el-table-column label="验收测试部署工作量" min-width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.CHECK_DEPLOY_DAY }}
        </template>
      </el-table-column>
      <el-table-column label="系统状态" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.FK_STATUS }}
        </template>
      </el-table-column>
      <el-table-column label="计划上线时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.ITEM_ONLINE_ARRANGE }}
        </template>
      </el-table-column>
      <el-table-column label="启动签报批准时间" min-width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.ALLOW_TIME }}
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.ITEM_REMARK }}
        </template>
      </el-table-column>
      <el-table-column label="说明" min-width="100" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEdit">{{ scope.row.ITEM_DESC }}</span>
          <el-input v-if="scope.row.isEdit" v-model="scope.row.ITEM_DESC" placeholder="请输入" clearable @blur="blurDesc"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt20"
      :current-page="bpmObj.pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="bpmObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="bpmObj.total"
      @size-change="handleSizeChangeBPM"
      @current-change="handleCurrentChangeBPM"
    >
    </el-pagination>
    <el-dialog title="BPM系统工作量详情" width="1200px" :visible.sync="bpmDialogObj.visible" :fullscreen="true">
      111
    </el-dialog>
  </div>
</template>

<script>
import bpmManageApi from '@/api/bpm_manage_api'
import { getUserInfo } from '@/utils/auth'

export default {
  data() {
    return {
      userInfo: JSON.parse(getUserInfo()),
      currentRow: {},
      updateTime: '', // 数据最近同步时间
      // bpm 搜索条件
      bpmFormSearch: {
        itemProjName: '', // 项目名
        sysName: '', // 系统名
        version: '', // 系统版本号
        startRunno: '', // 启动签报号
        itemReqNum: '', // 申请单号
        workShareType: null, // 测试占比
        itemOnlineArrange: null, // 计划上线时间
        allowTime: null, // 启动签报批准时间
        dataFrom: null, // BPM数据来源
        fkStatus: null, // 系统状态
        itemCurLink: null, // 当前环节
        usernameZh: null // 测试负责人
      },
      // bpm 信息
      bpmObj: {
        height: 280,
        list: [],
        checkedList: [],
        curLinkList: [],
        testRatioList: [],
        testUserNameList: [],
        pageIndex: 1,
        pageSize: 20,
        total: 0
      },
      // bpm dialog
      bpmDialogObj: {
        visible: false,
        data: {}
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    // 显示详情
    onShowDetail(row) {
      console.log(row)
      const params = {
        cweId: row.CWEID
      }
      bpmManageApi.getBpmDetail(params).then(response => {
        console.log(response.data)
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
      this.bpmDialogObj.visible = true
    },
    // 双击说明修改
    cellDbclick(row, column, cell, event) {
      if (column.label === '说明' && this.userInfo && this.userInfo.usernameZh === row.USERNAME_ZH) {
        this.currentRow = row
        this.bpmObj.list.forEach((current, index ,arr) => {
          if (current.CWEID === row.CWEID) {
            this.bpmObj.list[index].isEdit = true
            return
          }
        })
      }
    },
    // 说明失去焦点
    blurDesc(event) {
      this.listLoading = true
      const params = {
        cweId: this.currentRow.CWEID,
        itemDesc: event.target.value
      }
      bpmManageApi.updateItemDesc(params).then(response => {
        this.bpmObj.list.forEach((current, index ,arr) => {
          if (current.CWEID === this.currentRow.CWEID) {
            this.bpmObj.list[index].isEdit = false
            return
          }
          this.$message({
            type: 'success',
            message: response.message
          })
        })
        this.listLoading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // bpm工作量列表 每页条数选择
    handleSizeChangeBPM(val) {
      this.bpmObj.pageSize = val
      this.initBPM()
    },
    // bpm工作量列表 当前页选择
    handleCurrentChangeBPM(val) {
      this.bpmObj.pageIndex = val
      this.onSearchBPMList()
    },
    // bpm工作量列表 初始化
    initBPM() {
      this.bpmObj.pageIndex = 1
      this.onSearchBPMList()
    },
    // bpm工作量列表 重置
    onResetBPM(formName) {
      this.$refs[formName].resetFields()
      this.initBPM()
    },
    // bpm工作量列表 查询
    onSearchBPMList() {
      this.listLoading = true
      const params = {
        pageIndex: this.bpmObj.pageIndex,
        pageSize: this.bpmObj.pageSize
      }
      Object.assign(params, this.bpmFormSearch)
      bpmManageApi.getBpmApprovalByParam(params).then(response => {
        this.bpmObj.list = response.data.list.map(e => {
          e.isEdit = false
          return e
        })
        this.bpmObj.total = response.data.total
        this.listLoading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 查询 当前环节列表
    onSearchCurLinkList() {
      bpmManageApi.getItemCurLink().then(response => {
        this.bpmObj.curLinkList = response.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 查询 测试占比列表
    onSearchTestRatioList() {
      bpmManageApi.getWorkShare().then(response => {
        this.bpmObj.testRatioList = [
          {
            key: `0%~${response.data.minShare}%`,
            value: 1
          },
          {
            key: `${response.data.maxShare}%~100%`,
            value: 2
          },
          {
            key: `0%~${response.data.minShare}% & ${response.data.maxShare}%~100%`,
            value: 3
          },
          {
            key: `${response.data.minShare}%~${response.data.maxShare}%`,
            value: 4
          }
        ]
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 查询 测试负责人列表
    onSearchTestUserNameList() {
      bpmManageApi.getTestUserNameAll().then(response => {
        this.bpmObj.testUserNameList = response.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 查询 数据最近同步时间
    onSearchUpdateTime() {
      bpmManageApi.getUpdateTime().then(response => {
        this.updateTime = response.data.UPDATETIME
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    fetchData() {
      this.onSearchBPMList()
      this.onSearchCurLinkList()
      this.onSearchTestRatioList()
      this.onSearchTestUserNameList()
      this.onSearchUpdateTime()
    }
  }
}
</script>
