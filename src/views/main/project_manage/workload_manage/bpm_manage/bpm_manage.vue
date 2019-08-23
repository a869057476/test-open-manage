<template>
  <div class="app-container">
    <div class="mb20">
      <span>数据最近同步时间: {{ updateTime }}</span>
      <el-button class="ml20" type="primary" size="small" @click="onShowCurrentBpm">查看实时工作量</el-button>
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
            <el-button type="info" size="small" @click="onExportBpm">导出Excel</el-button>
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
          <span :style="{ color: '#409EFF', cursor: 'pointer' }" @click="onShowDetail(scope.row)">{{ scope.row.SYS_NAME + (scope.row.SYS_SON_NAME ? scope.row.SYS_SON_NAME : '') + scope.row.VERSION }}</span>
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
    <el-dialog title="BPM系统工作量详情" :visible.sync="bpmDialogObj.visible" :fullscreen="true">
      <el-form ref="bpmFormSearch" :inline="true" :model="bpmFormSearch">
        <el-form-item label="项目名">
          <el-input v-model="bpmDialogObj.data.ITEM_PROJ_NAME" style="width: 600px;" readonly></el-input>
        </el-form-item>
        <el-form-item label="系统名">
          <el-input v-model="sysName" style="width: 600px;" readonly></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="info" size="small" @click="onExportDetail">导出Excel</el-button>
        </el-form-item>
      </el-form>
      <div id="only_sys" class="bpm-detail">
        <table cellspacing="0" cellpadding="0" border="0">
          <thead>
            <tr>
              <th colspan="2">工作量评估类别</th>
              <th colspan="3">工作量评估分类</th>
              <th>评估工作量(人天)</th>
              <th>项目名</th>
              <th>系统名</th>
              <th>申请单号</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="4">1</td>
              <td rowspan="4">系统测试、部署及用户支持工作量</td>
              <td>系统测试</td>
              <td class="active">✔功能</td>
              <td>×性能</td>
              <td>{{ bpmDialogObj.data.UAT_TEST }}</td>
              <td rowspan="4">{{ bpmDialogObj.data.ITEM_PROJ_NAME }}</td>
              <td rowspan="4">{{ sysName }}</td>
              <td rowspan="4">{{ bpmDialogObj.data.ITEM_REQ_NUM }}</td>
            </tr>
            <tr>
              <td>系统测试</td>
              <td>×功能</td>
              <td class="active">✔性能</td>
              <td>{{ bpmDialogObj.data.UAT_TEST_ADD }}</td>
            </tr>
            <tr>
              <td colspan="3">系统配置部署工作量</td>
              <td>{{ bpmDialogObj.data.SCM_DEPLOY_DAY }}</td>
            </tr>
            <tr>
              <td colspan="3">用户支持工作量</td>
              <td>{{ bpmDialogObj.data.USER_SUPPORT_DAY }}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>组织级管理工作量(高层管理、PMO&amp;QA及工具支持)</td>
              <td colspan="3">组织级管理工作量</td>
              <td>{{ bpmDialogObj.data.ORG_MANAGE_DAY }}</td>
              <td>{{ bpmDialogObj.data.ITEM_PROJ_NAME }}</td>
              <td>{{ sysName }}</td>
              <td>{{ bpmDialogObj.data.ITEM_REQ_NUM }}</td>
            </tr>
            <tr>
              <td rowspan="6">3</td>
              <td rowspan="6">验收测试部署、验收测试及模拟测试工作量</td>
              <td>验收测试</td>
              <td class="active">✔功能</td>
              <td>×性能</td>
              <td>{{ bpmDialogObj.data.CHECK_TEST }}</td>
              <td rowspan="6">{{ bpmDialogObj.data.ITEM_PROJ_NAME }}</td>
              <td rowspan="6">{{ sysName }}</td>
              <td rowspan="6">{{ bpmDialogObj.data.ITEM_REQ_NUM }}</td>
            </tr>
            <tr>
              <td>验收测试</td>
              <td>×功能</td>
              <td class="active">✔性能</td>
              <td>{{ bpmDialogObj.data.CHECK_TEST_ADD }}</td>
            </tr>
            <tr>
              <td colspan="3">系统配置及验收测试环境部署工作量</td>
              <td>{{ bpmDialogObj.data.SC_CHECK_DEPLOY_DAY }}</td>
            </tr>
            <tr>
              <td colspan="3">验收测试交付流流程工作量</td>
              <td>{{ bpmDialogObj.data.CHECK_DEPLOY_DAY }}</td>
            </tr>
            <tr>
              <td>模拟测试</td>
              <td class="active">✔功能</td>
              <td>×性能</td>
              <td>{{ bpmDialogObj.data.MOCK_TEST }}</td>
            </tr>
            <tr>
              <td>模拟测试</td>
              <td>×功能</td>
              <td class="active">✔性能</td>
              <td>{{ bpmDialogObj.data.MOCK_TEST_ADD }}</td>
            </tr>
            <tr>
              <td colspan="2">工作量总计(人天)</td>
              <td>{{ bpmDialogObj.data.ITEM_TOTAL_MAN_DAY }}</td>
              <td>工作量总计折算(人月)</td>
              <td>{{ bpmDialogObj.data.WORKS_MAN_MONTH }}</td>
              <td></td>
              <td>本币市场监测系统需求汇总2017Q4</td>
              <td>数据传输中间件V12.21.0.0</td>
              <td>XQSJ1712200001</td>
            </tr>
            <tr>
              <td colspan="2">备注</td>
              <td colspan="7">{{ bpmDialogObj.data.ITEM_REMARK }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <el-table v-loading="listLoading" :data="bpmDialogObj.list" element-loading-text="Loading" border fit :max-height="bpmDialogObj.height">
        <el-table-column label="工作量评估类别" min-width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.DATA_FROM }}
          </template>
        </el-table-column>
        <el-table-column label="工作量评估分类" min-width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.DATA_FROM }}
          </template>
        </el-table-column>
        <el-table-column label="评估工作量(人天)" min-width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.DATA_FROM }}
          </template>
        </el-table-column>
        <el-table-column label="项目名" min-width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.DATA_FROM }}
          </template>
        </el-table-column>
        <el-table-column label="系统名" min-width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.DATA_FROM }}
          </template>
        </el-table-column>
        <el-table-column label="申请单号" min-width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.DATA_FROM }}
          </template>
        </el-table-column>
      </el-table> -->
    </el-dialog>
    <el-dialog title="立项工作量占比监控" :visible.sync="currentBpmDialogObj.visible" :fullscreen="true">
      <el-form :inline="true" :model="currentBpmDialogObj.form">
        <el-form-item label="申请单号">
          <el-select v-model="currentBpmDialogObj.form.itemReqNum" placeholder="请选择" clearable @change="onChangeReqNum">
            <el-option v-for="item in currentBpmDialogObj.reqNumList" :key="item.ITEM_REQ_NUM" :label="item.ITEM_REQ_NUM" :value="item.ITEM_REQ_NUM"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="onSearchCurrentBpmList">查询</el-button>
          <el-button type="info" size="small" @click="onExportCurrentBpm">导出Excel</el-button>
          <el-button type="warning" size="small" @click="onIgnore">忽略</el-button>
          <el-button type="info" size="small" @click="onShowSeeting">配置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="currentBpmDialogObj.list" element-loading-text="Loading" border fit stripe highlight-current-row :max-height="currentBpmDialogObj.height" @selection-change="handleSelectionChangeCurrentBpm">
        <el-table-column type="selection" width="55"></el-table-column>
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
            <span>{{ scope.row.SYS_NAME + (scope.row.SYS_SON_NAME ? scope.row.SYS_SON_NAME : '') + scope.row.VERSION }}</span>
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
            {{ scope.row.ITEM_DESC }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt20"
        :current-page="currentBpmDialogObj.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="currentBpmDialogObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="currentBpmDialogObj.total"
        @size-change="handleSizeChangeCurrentBpm"
        @current-change="handleCurrentChangeCurrentBpm"
      >
      </el-pagination>
    </el-dialog>
    <el-dialog title="立项工作量占比监控配置" :visible.sync="seetingDialogObj.visible" width="1200px">
      <el-form ref="seetingForm" :model="seetingDialogObj.form" :rules="seetingDialogObj.rules" label-width="100px">
        <el-form-item label="邮件标题" prop="mailSubject">
          <el-input v-model="seetingDialogObj.form.mailSubject" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="收件人邮箱" prop="tomail">
          <el-input v-model="seetingDialogObj.form.tomail" type="textarea" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="发送时间" prop="sendtime">
          <el-time-picker v-model="seetingDialogObj.form.sendtime" value-format="HH:mm:ss" type="datetime" placeholder="请选择"></el-time-picker>
        </el-form-item>
        <el-form-item label="邮件内容" prop="mailContext">
          <el-input v-model="seetingDialogObj.form.mailContext" type="textarea" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="低于" prop="minShare">
          <el-input v-model="seetingDialogObj.form.minShare" placeholder="请输入" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="高于" prop="maxShare">
          <el-input v-model="seetingDialogObj.form.maxShare" placeholder="请输入" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="seetingDialogObj.visible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateSeeting('seetingForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bpmManageApi from '@/api/bpm_manage_api'
import { getUserInfo } from '@/utils/auth'
import { download } from '@/utils'

export default {
  data() {
    const requiredTrue = {
      required: true,
      message: '此为必填项',
      trigger: 'change'
    }
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
      // bpm实时 信息
      bpmObj: {
        height: 280,
        list: [],
        curLinkList: [],
        testRatioList: [],
        testUserNameList: [],
        pageIndex: 1,
        pageSize: 20,
        total: 0
      },
      // bpm实时 dialog
      currentBpmDialogObj: {
        visible: false,
        height: 280,
        list: [],
        checkedList: [],
        reqNumList: [],
        form: {
          itemReqNum: null
        },
        pageIndex: 1,
        pageSize: 20,
        total: 0
      },
      // bpm详情 dialog
      bpmDialogObj: {
        visible: false,
        height: 280,
        data: {
          ITEM_PROJ_NAME: '', // 项目名
          SYS_NAME: '', // 系统名
          SYS_SON_NAME: '', // 子系统名
          VERSION: '', // 版本号
          ITEM_REQ_NUM: '', // 申请单号
          UAT_TEST: '', // 系统测试功能
          UAT_TEST_ADD: '', // 系统测试性能
          SCM_DEPLOY_DAY: '', // 系统配置部署工作量
          USER_SUPPORT_DAY: '', // 用户支持工作量
          ORG_MANAGE_DAY: '', // 组织级管理工作量
          CHECK_TEST: '', // 验收测试功能
          CHECK_TEST_ADD: '', // 验收测试性能
          SC_CHECK_DEPLOY_DAY: '', // 系统配置及验收测试环境部署工作量
          CHECK_DEPLOY_DAY: '', // 验收测试交付流流程工作量
          MOCK_TEST: '', // 模拟测试功能
          MOCK_TEST_ADD: '', // 模拟测试性能
          ITEM_TOTAL_MAN_DAY: '', // 工作量总计(人天)
          WORKS_MAN_MONTH: '', // 工作量总计折算(人月)
          ITEM_REMARK: '' // 备注
        }
      },
      // bpm实时 dialog
      seetingDialogObj: {
        visible: false,
        form: {
          uuid: '', // uuid
          mailSubject: '', // 邮件标题
          tomail: '', // 收件人邮箱
          sendtime: null, // 发送时间
          mailContext: '', // 邮件内容
          minShare: 0, // 低于
          maxShare: 0 // 高于
        },
        rules: {
          mailSubject: [requiredTrue],
          tomail: [requiredTrue],
          sendtime: [requiredTrue],
          mailContext: [requiredTrue],
          minShare: [requiredTrue],
          maxShare: [requiredTrue]
        }
      },
      listLoading: true
    }
  },
  computed: {
    sysName() {
      return `${this.bpmDialogObj.data.SYS_NAME}-${this.bpmDialogObj.data.SYS_SON_NAME}${this.bpmDialogObj.data.VERSION}`
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    // 导出bpm
    onExportBpm() {
      this.listLoading = true
      bpmManageApi.downloadBpm(this.bpmFormSearch).then(response => {
        download(response, 'bpm工作量')
        this.listLoading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 导出实时bpm
    onExportCurrentBpm() {
      this.listLoading = true
      bpmManageApi.downloadCurrentBpm().then(response => {
        download(response, 'bpm实时工作量')
        this.listLoading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    onExportDetail() {
      const uri = 'data:application/vnd.ms-excel;base64,'
      const template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>'
      const base64 = s => {
        return window.btoa(unescape(encodeURIComponent(s)))
      }
      const format = (s, c) => {
        return s.replace(/{(\w+)}/g, (m, p) => {
          return c[p]
        })
      }
      const table = document.getElementById('only_sys')
      const name = null
      const ctx = {
        worksheet: name || 'Worksheet',
        table: table.innerHTML
      }
      window.location.href = uri + base64(format(template, ctx))
    },
    // 实时工作量 设置列表选中的数据
    handleSelectionChangeCurrentBpm(val) {
      this.currentBpmDialogObj.checkedList = val
    },
    // 实时工作量 忽略
    onIgnore() {
      this.$confirm('此操作将忽略所选工作量, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bpmManageApi.ignoreBpmBatch(this.currentBpmDialogObj.checkedList).then(response => {
          this.$message({
            type: 'success',
            message: '忽略成功!'
          })
          this.initCurrentBpm()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消忽略'
        })
      })
    },
    // 实时工作量 配置显示
    onShowSeeting() {
      this.onSearchTestRatioList()
      this.seetingDialogObj.visible = true
    },
    // 实时工作量 配置修改
    onUpdateSeeting(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          bpmManageApi.opdateWorkShare(this.seetingDialogObj.form).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.onSearchTestRatioList()
            this.seetingDialogObj.visible = false
          })
        }
      })
    },
    // 显示详情
    onShowDetail(row) {
      this.bpmDialogObj.visible = true
      const params = {
        cweId: row.CWEID
      }
      bpmManageApi.getBpmDetail(params).then(response => {
        console.log(response.data)
        this.bpmDialogObj.data = response.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 实时工作量 显示
    onShowCurrentBpm() {
      this.currentBpmDialogObj.visible = true
      bpmManageApi.getReqNumList().then(response => {
        console.log(response.data)
        this.currentBpmDialogObj.reqNumList = response.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
      this.onSearchCurrentBpmList()
    },
    // 实时工作量列表 申请单号选择
    onChangeReqNum(val) {
      this.currentBpmDialogObj.form.itemReqNum = val
    },
    // 实时工作量列表 每页条数选择
    handleSizeChangeCurrentBpm(val) {
      this.currentBpmDialogObj.pageSize = val
      this.initCurrentBpm()
    },
    // 实时工作量列表 当前页选择
    handleCurrentChangeCurrentBpm(val) {
      this.currentBpmDialogObj.pageIndex = val
      this.onSearchCurrentBpmList()
    },
    // 实时工作量列表 初始化
    initCurrentBpm() {
      this.currentBpmDialogObj.pageIndex = 1
      this.onSearchCurrentBpmList()
    },
    // 实时工作量列表 查询
    onSearchCurrentBpmList() {
      this.listLoading = true
      const params = {
        pageIndex: this.currentBpmDialogObj.pageIndex,
        pageSize: this.currentBpmDialogObj.pageSize
      }
      Object.assign(params, this.currentBpmDialogObj.form)
      bpmManageApi.getCurrentBpm(params).then(response => {
        this.currentBpmDialogObj.list = response.data.list
        this.currentBpmDialogObj.total = response.data.total
        this.listLoading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    // 双击说明修改
    cellDbclick(row, column, cell, event) {
      if (column.label === '说明' && this.userInfo && this.userInfo.usernameZh === row.USERNAME_ZH) {
        this.currentRow = row
        this.bpmObj.list.forEach((current, index, arr) => {
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
        this.bpmObj.list.forEach((current, index, arr) => {
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
        delete response.data.cron
        this.seetingDialogObj.form = Object.assign(this.seetingDialogObj.form, response.data)
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
<style lang="scss" scoped>
.bpm-detail {
  table {
    border: 2px solid #BED7F0;
    width: 100%;
    table-layout: fixed;
    thead {
      tr {
        th {
          padding: 5px 0;
          border-right: 2px solid #BED7F0;
          &:last-child {
            border-right: none;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 5px;
          text-align: center;
          border-top: 2px solid #BED7F0;
          border-right: 2px solid #BED7F0;
          &.active {
            background-color: #ffc8cd;
          }
        }
      }
    }
  }
}
</style>
