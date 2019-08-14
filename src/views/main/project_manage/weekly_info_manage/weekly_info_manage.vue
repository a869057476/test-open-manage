<template>
  <div class="app-container">
    <el-button v-if="activeName !== 'component-three'" class="add" type="info" size="small" @click="onOperateWeek('add')">新增</el-button>
    <el-button v-if="activeName === 'component-three'" class="add" type="info" size="small" @click="onOperateMeeting('add')">新增</el-button>
    <el-tabs v-model="activeName" type="card" @tab-click="onToggleTab">
      <el-tab-pane label="联测主系统列表" name="component-one">
        <el-form ref="sysFormSearch" :inline="true" :model="sysFormSearch">
          <el-form-item label="系统名称">
            <el-input v-model="sysFormSearch.searchStr" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="生产上线时间">
            <el-date-picker v-model="sysFormSearch.planTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" clearable>
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSearchSys">查询</el-button>
            <el-button type="warning" size="small" @click="onSearchSys">导出Excel</el-button>
          </el-form-item>
          <el-form-item label="展开">
            <el-switch v-model="sysFormSearch.isExpand" @change="onChangeExpandAll"></el-switch>
          </el-form-item>
        </el-form>
        <el-table v-loading="listLoading" :data="sysObj.list" :row-class-name="tableRowClassName" :cell-class-name="tableCellClassName" element-loading-text="Loading" border fit highlight-current-row :max-height="sysObj.height">
          <el-table-column label="" min-width="60" align="center">
            <template v-if="scope.row.isMain && scope.row.isExpand" slot-scope="scope">
              <div v-if="!scope.row.expandStatus" @click="onChangeExpandOne(true, scope.row)">
                <i class="el-icon-arrow-down"></i>
              </div>
              <div v-if="scope.row.expandStatus" @click="onChangeExpandOne(false, scope.row)">
                <i class="el-icon-arrow-up"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="生产上线日期" min-width="140" align="center">
            <template slot-scope="scope">
              {{ scope.row.planTime }}
            </template>
          </el-table-column>
          <el-table-column label="系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isMain" :style="{ color: '#409EFF', cursor: 'pointer' }" @click="onOperateWeek('tree', scope.row)">{{ scope.row.sysName + scope.row.versionNum }}</span>
              <span v-if="!scope.row.isMain">{{ scope.row.sysName + scope.row.versionNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.projectName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更类型" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.crType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目整体进度" min-width="140" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.overAllSchedule }}</span>
            </template>
          </el-table-column>
          <el-table-column label="目前项目阶段" min-width="140" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.projectStage }}</span>
            </template>
          </el-table-column>
          <el-table-column label="升级联测系统数量" min-width="140" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.upgradeNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="无升级联测系统数量" min-width="150" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.noUpgradeNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="原因说明" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.reason }}</span>
            </template>
          </el-table-column>
          <el-table-column label="测试负责人" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.writter }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="onOperateWeek('edit', scope.row)">修改</el-button>
              <el-button size="mini" type="primary" plain @click="onOperateWeek('detail', scope.row)">查看需求条目</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="测试周报信息列表" name="component-two">
        <el-collapse value="1" @change="onChangeCollapse">
          <el-collapse-item title="展开/收起搜索条件" name="1">
            <el-form ref="weekFormSearch" :inline="true" :model="weekFormSearch" label-width="100px">
              <el-form-item label="系统名称" prop="sysName">
                <el-select v-model="weekFormSearch.sysName" placeholder="请选择" clearable>
                  <el-option label="SWIFT交易中心接入系统" value="SWIFT交易中心接入系统"></el-option>
                  <el-option label="本币交易系统" value="本币交易系统"></el-option>
                  <el-option label="本币交易直通式处理系统" value="本币交易直通式处理系统"></el-option>
                  <el-option label="本币市场监测系统" value="本币市场监测系统"></el-option>
                  <el-option label="标准化外汇产品交易系统" value="标准化外汇产品交易系统"></el-option>
                  <el-option label="新一代本币交易系统" value="新一代本币交易系统"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="系统版本号" prop="versionNum">
                <el-input v-model="weekFormSearch.versionNum" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="主系统名称" prop="sysSonName">
                <el-select v-model="weekFormSearch.sysSonName" placeholder="请选择" clearable>
                  <el-option label="SWIFT交易中心接入系统" value="SWIFT交易中心接入系统"></el-option>
                  <el-option label="本币交易系统" value="本币交易系统"></el-option>
                  <el-option label="本币交易直通式处理系统" value="本币交易直通式处理系统"></el-option>
                  <el-option label="本币市场监测系统" value="本币市场监测系统"></el-option>
                  <el-option label="标准化外汇产品交易系统" value="标准化外汇产品交易系统"></el-option>
                  <el-option label="新一代本币交易系统" value="新一代本币交易系统"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="主系统版本号" prop="mainVersionNum">
                <el-input v-model="weekFormSearch.mainVersionNum" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="weekFormSearch.projectName" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="变更类型" prop="crType">
                <el-select v-model="weekFormSearch.crType" placeholder="请选择" clearable>
                  <el-option label="正常" value="正常"></el-option>
                  <el-option label="紧急" value="紧急"></el-option>
                  <el-option label="例行" value="例行"></el-option>
                  <el-option label="快捷" value="快捷"></el-option>
                  <el-option label="NA" value="NA"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联测类别" prop="testType">
                <el-select v-model="weekFormSearch.testType" placeholder="请选择" clearable>
                  <el-option label="主系统" value="主系统"></el-option>
                  <el-option label="升级联测" value="升级联测"></el-option>
                  <el-option label="无升级联测" value="无升级联测"></el-option>
                  <el-option label="未回复" value="未回复"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目阶段" prop="projectStage">
                <el-select v-model="weekFormSearch.projectStage" placeholder="请选择" clearable>
                  <el-option label="测试准备" value="测试准备"></el-option>
                  <el-option label="UAT1测试" value="UAT1测试"></el-option>
                  <el-option label="UAT1完成" value="UAT1完成"></el-option>
                  <el-option label="验收流程" value="验收流程"></el-option>
                  <el-option label="验收测试" value="验收测试"></el-option>
                  <el-option label="验收完成" value="验收完成"></el-option>
                  <el-option label="模拟流程" value="模拟流程"></el-option>
                  <el-option label="模拟测试" value="模拟测试"></el-option>
                  <el-option label="模拟完成" value="模拟完成"></el-option>
                  <el-option label="已上线" value="已上线"></el-option>
                  <el-option label="NA" value="NA"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="测试轮次" prop="testRuns">
                <el-select v-model="weekFormSearch.testRuns" placeholder="请选择" clearable>
                  <el-option v-for="item in 100" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="整体进度" prop="overAllSchedule">
                <el-select v-model="weekFormSearch.overAllSchedule" placeholder="请选择" clearable>
                  <el-option label="正常" value="正常"></el-option>
                  <el-option label="延期" value="延期"></el-option>
                  <el-option label="暂停" value="暂停"></el-option>
                  <el-option label="作废" value="作废"></el-option>
                  <el-option label="NA" value="NA"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="人力投入" prop="manPowerInput">
                <el-select v-model="weekFormSearch.manPowerInput" placeholder="请选择" clearable>
                  <el-option label="人力紧张" value="人力紧张"></el-option>
                  <el-option label="人力不足" value="人力不足"></el-option>
                  <el-option label="人力充足" value="人力充足"></el-option>
                  <el-option label="NA" value="NA"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="填写日期" prop="updateDate">
                <el-date-picker v-model="weekFormSearch.updateDate" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="版本质量" prop="versionQuality">
                <el-select v-model="weekFormSearch.versionQuality" placeholder="请选择" clearable>
                  <el-option label="质量一般" value="质量一般"></el-option>
                  <el-option label="质量较好" value="质量较好"></el-option>
                  <el-option label="质量较差" value="质量较差"></el-option>
                  <el-option label="NA" value="NA"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作量情况" prop="workload">
                <el-select v-model="weekFormSearch.workload" placeholder="请选择" clearable>
                  <el-option label="超签报" value="0"></el-option>
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="超采购" value="0"></el-option>
                  <el-option label="NA" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="负责人" prop="writter">
                <el-input v-model="weekFormSearch.writter" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="生产上线时间" prop="planTime">
                <el-date-picker v-model="weekFormSearch.planTime" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <div class="mb20">
                <el-button type="primary" size="small" @click="initWeek">查询</el-button>
                <el-button type="success" size="small" @click="resetWeek('weekFormSearch')">重置</el-button>
                <el-button type="warning" size="small" @click="initWeek">导出Excel</el-button>
                <el-button type="danger" size="small" @click="onOperateWeek('deleteMultiple')">删除</el-button>
              </div>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-table v-loading="listLoading" :data="weekObj.list" element-loading-text="Loading" border fit stripe highlight-current-row :max-height="weekObj.height" @selection-change="handleSelectionChangeWeek">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.sysName }}
            </template>
          </el-table-column>
          <el-table-column label="版本号" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.versionNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.mainSysName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主系统版本号" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.mainVersionNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.projectName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产上线日期" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.businessTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更类型" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.crType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联测类别" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.testType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="测试轮次" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.testRuns }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目整体进度" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.projectStage }}</span>
            </template>
          </el-table-column>
          <el-table-column label="原因说明" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.reason }}</span>
            </template>
          </el-table-column>
          <el-table-column label="人力投入情况" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.manPowerInput }}</span>
            </template>
          </el-table-column>
          <el-table-column label="版本质量" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.versionQuality }}</span>
            </template>
          </el-table-column>
          <el-table-column label="工作量情况" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.workload }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性能测试" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.performanceTest }}</span>
            </template>
          </el-table-column>
          <el-table-column label="测试负责人" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.writter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="填写日期" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.planTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新用户名" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.updateUserName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最后更新时间" min-width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="功能点数量" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.funcNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="代码量" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.codeNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="业务上线时间" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.businessTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更操作耗时" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.changeOperationTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否为核心系统" min-width="120" align="center">
            <template slot-scope="scope">
              <span>
                <i v-if="scope.row.isMainSystem === 1" class="el-icon-success"></i>
                <i v-if="scope.row.isMainSystem === 0" class="el-icon-error"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否影响会员" min-width="120" align="center">
            <template slot-scope="scope">
              <span>
                <i v-if="scope.row.isInfluenceMem === 1" class="el-icon-success"></i>
                <i v-if="scope.row.isInfluenceMem === 0" class="el-icon-error"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否影响外部关联机构" min-width="180" align="center">
            <template slot-scope="scope">
              <span>
                <i v-if="scope.row.isInfluenceOuter === 1" class="el-icon-success"></i>
                <i v-if="scope.row.isInfluenceOuter === 0" class="el-icon-error"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否为新业务上线或总行相关业务" min-width="240" align="center">
            <template slot-scope="scope">
              <span>
                <i v-if="scope.row.isNewOrHead === 1" class="el-icon-success"></i>
                <i v-if="scope.row.isNewOrHead === 0" class="el-icon-error"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否为技术上线" min-width="120" align="center">
            <template slot-scope="scope">
              <span>
                <i v-if="scope.row.isTechUp === 1" class="el-icon-success"></i>
                <i v-if="scope.row.isTechUp === 0" class="el-icon-error"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否为自动化部署" min-width="140" align="center">
            <template slot-scope="scope">
              <span>
                <i v-if="scope.row.isAutoDeploy === 1" class="el-icon-success"></i>
                <i v-if="scope.row.isAutoDeploy === 0" class="el-icon-error"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否包含业务操作内容" min-width="180" align="center">
            <template slot-scope="scope">
              <span>
                <i v-if="scope.row.isIncludeBusiness === 1" class="el-icon-success"></i>
                <i v-if="scope.row.isIncludeBusiness === 0" class="el-icon-error"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="onOperateWeek('edit', scope.row)">修改</el-button>
              <el-button size="mini" type="primary" plain @click="onOperateWeek('deleteSingle', scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt20"
          :current-page="weekObj.pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="weekObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="weekObj.total"
          @size-change="handleSizeChangeWeek"
          @current-change="handleCurrentChangeWeek"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="会议记录列表" name="component-three">
        <el-form ref="meetingFormSearch" :inline="true" :model="meetingFormSearch">
          <el-form-item label="会议主题">
            <el-input v-model="meetingFormSearch.theme" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="会议时间" prop="updateDate">
            <el-date-picker v-model="meetingFormSearch.meetingDate" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="initMeeting">查询</el-button>
            <el-button type="danger" size="small" @click="onOperateMeeting('deleteMultiple')">删除</el-button>
            <!-- <el-button type="warning" size="small" @click="initMeeting">导出Excel</el-button> -->
          </el-form-item>
        </el-form>
        <el-table v-loading="listLoading" :data="meetingObj.list" element-loading-text="Loading" border fit stripe highlight-current-row :max-height="meetingObj.height" @selection-change="handleSelectionChangeMeeting">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="主题" min-width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.theme }}
            </template>
          </el-table-column>
          <el-table-column label="时间" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.meetingDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地点" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.place }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主持人" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.host }}</span>
            </template>
          </el-table-column>
          <el-table-column label="记录人" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.recorder }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="onOperateMeeting('edit', scope.row)">修改</el-button>
              <el-button size="mini" type="primary" plain @click="onOperateMeeting('deleteSingle', scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt20"
          :current-page="meetingObj.pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="meetingObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="meetingObj.total"
          @size-change="handleSizeChangeMeeting"
          @current-change="handleCurrentChangeMeeting"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="weekDialogObj.title" :visible.sync="weekDialogObj.visible" top="5vh" width="1200px">
      <el-form ref="weekForm" :model="weekDialogObj.form" :rules="weekDialogObj.rules" :style="{ height: weekDialogObj.height + 'px', overflow: 'auto' }" :inline="true" label-width="100px" label-position="top">
        <el-row>
          <el-col :span="6">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="weekDialogObj.form.projectName" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产上线日期" prop="planTime">
              <el-date-picker v-model="weekDialogObj.form.planTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-card header="本系统" class="mr20">
          <el-row>
            <el-col :span="6">
              <el-form-item label="系统名称" prop="sysName">
                <el-select v-model="weekDialogObj.form.sysName" placeholder="请选择" @change="onChangeOwnMainSys">
                  <el-option v-for="item in mainSysList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="子系统名称" prop="sysSonName">
                <el-select v-model="weekDialogObj.form.ownSonSys" value-key="itemAppNameSon" placeholder="请选择" clearable @change="onChangeOwnSonSys">
                  <el-option v-for="item in ownSonSysList" :key="item.itemAppNameSon" :label="item.itemAppNameSon" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="版本号" prop="versionNum">
                <el-dropdown @command="handleCommandWeekMainOperate">
                  <el-input v-model="weekDialogObj.form.versionNum" placeholder="请输入内容">
                    <template slot="append"><i class="el-icon-arrow-down el-icon--right"></i></template>
                  </el-input>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="null">null</el-dropdown-item>
                    <el-dropdown-item command="1.0.0">1.0.0</el-dropdown-item>
                    <el-dropdown-item command="1.1.1">1.1.1</el-dropdown-item>
                    <el-dropdown-item command="1.2.1">1.2.1</el-dropdown-item>
                    <el-dropdown-item command="2.1.3">2.1.3</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card header="主系统" class="mt20 mb20 mr20">
          <el-row>
            <el-col :span="6">
              <el-form-item label="全流程名称" prop="mainSysName">
                <el-select v-model="weekDialogObj.form.mainSysName" placeholder="请选择" @change="onChangeMainMainSys">
                  <el-option v-for="item in mainSysList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="全流程子系统名称" prop="mainSysSonName">
                <el-select v-model="weekDialogObj.form.mainSonSys" value-key="itemAppNameSon" placeholder="请选择" clearable @change="onChangeMainSonSys">
                  <el-option v-for="item in mainSonSysList" :key="item.itemAppNameSon" :label="item.itemAppNameSon" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="版本号" prop="mainVersionNum">
                <el-dropdown @command="handleCommandWeekSonOperate">
                  <el-input v-model="weekDialogObj.form.mainVersionNum" placeholder="请输入内容">
                    <template slot="append"><i class="el-icon-arrow-down el-icon--right"></i></template>
                  </el-input>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="null">null</el-dropdown-item>
                    <el-dropdown-item command="1.0.0">1.0.0</el-dropdown-item>
                    <el-dropdown-item command="1.1.1">1.1.1</el-dropdown-item>
                    <el-dropdown-item command="1.2.1">1.2.1</el-dropdown-item>
                    <el-dropdown-item command="2.1.3">2.1.3</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-row>
          <el-col :span="6">
            <el-form-item label="变更类型" prop="crType">
              <el-select v-model="weekDialogObj.form.crType" placeholder="请选择" clearable>
                <el-option label="正常" value="正常"></el-option>
                <el-option label="紧急" value="紧急"></el-option>
                <el-option label="例行" value="例行"></el-option>
                <el-option label="快捷" value="快捷"></el-option>
                <el-option label="NA" value="NA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联测类别" prop="testType">
              <el-select v-model="weekDialogObj.form.testType" placeholder="请选择" clearable>
                <el-option label="主系统" value="主系统"></el-option>
                <el-option label="升级联测" value="升级联测"></el-option>
                <el-option label="无升级联测" value="无升级联测"></el-option>
                <el-option label="未回复" value="未回复"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="目前项目阶段" prop="projectStage">
              <el-select v-model="weekDialogObj.form.projectStage" placeholder="请选择" clearable>
                <el-option label="测试准备" value="测试准备"></el-option>
                <el-option label="UAT1测试" value="UAT1测试"></el-option>
                <el-option label="UAT1完成" value="UAT1完成"></el-option>
                <el-option label="验收流程" value="验收流程"></el-option>
                <el-option label="验收测试" value="验收测试"></el-option>
                <el-option label="验收完成" value="验收完成"></el-option>
                <el-option label="模拟流程" value="模拟流程"></el-option>
                <el-option label="模拟测试" value="模拟测试"></el-option>
                <el-option label="模拟完成" value="模拟完成"></el-option>
                <el-option label="已上线" value="已上线"></el-option>
                <el-option label="NA" value="NA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="测试轮次" prop="testRuns">
              <el-select v-model="weekDialogObj.form.testRuns" placeholder="请选择" clearable>
                <el-option v-for="item in 100" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="项目整体进度" prop="overAllSchedule">
              <el-select v-model="weekDialogObj.form.overAllSchedule" placeholder="请选择" clearable>
                <el-option label="正常" value="正常"></el-option>
                <el-option label="延期" value="延期"></el-option>
                <el-option label="暂停" value="暂停"></el-option>
                <el-option label="作废" value="作废"></el-option>
                <el-option label="NA" value="NA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="人力投入情况" prop="manPowerInput">
              <el-select v-model="weekDialogObj.form.manPowerInput" placeholder="请选择" clearable>
                <el-option label="人力紧张" value="人力紧张"></el-option>
                <el-option label="人力不足" value="人力不足"></el-option>
                <el-option label="人力充足" value="人力充足"></el-option>
                <el-option label="NA" value="NA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="版本质量" prop="versionQuality">
              <el-select v-model="weekDialogObj.form.versionQuality" placeholder="请选择" clearable>
                <el-option label="质量一般" value="质量一般"></el-option>
                <el-option label="质量较好" value="质量较好"></el-option>
                <el-option label="质量较差" value="质量较差"></el-option>
                <el-option label="NA" value="NA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="工作量情况" prop="workload">
              <el-select v-model="weekDialogObj.form.workload" placeholder="请选择" clearable>
                <el-option label="超签报" value="超签报"></el-option>
                <el-option label="正常" value="正常"></el-option>
                <el-option label="超采购" value="超采购"></el-option>
                <el-option label="NA" value="NA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="性能测试" prop="performanceTest">
              <el-select v-model="weekDialogObj.form.performanceTest" placeholder="请选择" clearable>
                <el-option label="有" value="有"></el-option>
                <el-option label="无" value="无"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="测试负责人" prop="writter">
              <el-input v-model="weekDialogObj.form.writter" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="功能点数量" prop="funcNum">
              <el-input v-model="weekDialogObj.form.funcNum" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="代码量" prop="codeNum">
              <el-input v-model="weekDialogObj.form.codeNum" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="业务上线时间" prop="businessTime">
              <el-date-picker v-model="weekDialogObj.form.businessTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="变更操作耗时" prop="changeOperationTime">
              <el-input v-model="weekDialogObj.form.changeOperationTime" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="填写日期" prop="updateDate">
              <el-date-picker v-model="weekDialogObj.form.updateDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="原因说明" prop="reason">
              <el-input v-model="weekDialogObj.form.reason" type="textarea" :rows="6" :style="{ width: '600px'}"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="weekDialogObj.form.isMainSystem" :true-label="1" :false-label="0">是否为核心系统</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="weekDialogObj.form.isInfluenceMem" :true-label="1" :false-label="0">是否影响会员（客户端和API更新）</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="weekDialogObj.form.isInfluenceOuter" :true-label="1" :false-label="0">是否影响外部关联机构（CDC、清算所、金交所、总行、货币经济公司、第三方平台）</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="weekDialogObj.form.isNewOrHead" :true-label="1" :false-label="0">是否为新业务上线或总行相关业务</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="weekDialogObj.form.isTechUp" :true-label="1" :false-label="0">是否为技术上线</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="weekDialogObj.form.isAutoDeploy" :true-label="1" :false-label="0">是否为自动化部署</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="weekDialogObj.form.isIncludeBusiness" :true-label="1" :false-label="0">是否包含业务操作内容</el-checkbox>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="weekDialogObj.visible = false">取 消</el-button>
        <el-button type="primary" @click="onOperateWeek('submit')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="需求条目信息" :visible.sync="requirementDialogObj.visible" width="800px">
      <el-table :data="requirementDialogObj.list" :max-height="autoHeightRequirement">
        <el-table-column property="item_req_list_id" label="需求条目编号" min-width="200"></el-table-column>
        <el-table-column property="item_req_title" label="需求条目主题" min-width="200"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="系统关系树状图" :visible.sync="treeDialogObj.visible" :fullscreen="true">
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
      <div>项目整体进度：正常----延期----暂停----作废----NA</div>
      <div id="myChart2" :style="{width: '100%', height: '580px'}"></div>
    </el-dialog>
    <el-dialog :title="meetingDialogObj.title" :visible.sync="meetingDialogObj.visible" :fullscreen="true">
      <div :style="{ height: meetingDialogObj.height + 'px', overflow: 'auto' }">
        <el-form ref="meetingForm" :model="meetingDialogObj.form" :rules="meetingDialogObj.rules" class="meeting-record">
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '200px' }">主题 Subject</div>
            <div class="meeting-record-row-col form-padding form-padding change">
              <el-form-item label="" prop="theme">
                <el-input v-model="meetingDialogObj.form.theme" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '200px' }">时间 Time</div>
            <div class="meeting-record-row-col form-padding stable" :style="{ width: '300px' }">
              <el-form-item label="" prop="meetingDate">
                <el-date-picker v-model="meetingDialogObj.form.meetingDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择"></el-date-picker>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '150px' }">地点 Place</div>
            <div class="meeting-record-row-col form-padding change">
              <el-form-item label="" prop="place">
                <el-input v-model="meetingDialogObj.form.place" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '200px' }">主持人 Moderator</div>
            <div class="meeting-record-row-col form-padding stable" :style="{ width: '300px' }">
              <el-form-item label="" prop="host">
                <el-input v-model="meetingDialogObj.form.host" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '150px' }">记录人 Recorder</div>
            <div class="meeting-record-row-col form-padding change">
              <el-form-item label="" prop="recorder">
                <el-input v-model="meetingDialogObj.form.recorder" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="meeting-record-row contain">
            <div class="meeting-record-row-col word-big">参与部门与人员</div>
            <div class="meeting-record-row-col stable" :style="{ width: '100px' }">
              <el-button type="info" size="mini" @click="onDepartmentOperate('add')">新增</el-button>
            </div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">序号</div>
            <div class="meeting-record-row-col word-big stable" :style="{ width: '200px' }">部门</div>
            <div class="meeting-record-row-col word-big change">部门人员</div>
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">操作</div>
          </div>
          <div v-for="(item, index) in meetingDialogObj.form.departmentStaff" :key="item.department" class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">{{ index + 1 }}</div>
            <div class="meeting-record-row-col form-padding stable" :style="{ width: '200px' }">
              <el-form-item label="" :prop="'departmentStaff.' + index + '.department'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.department" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding change">
              <el-form-item label="" :prop="'departmentStaff.' + index + '.value'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.value" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '100px' }">
              <el-button size="mini" type="primary" plain @click="onDepartmentOperate('delete', index)">删除</el-button>
            </div>
          </div>
          <div class="meeting-record-row contain">
            <div class="meeting-record-row-col word-big">会议讨论结果</div>
            <div class="meeting-record-row-col stable" :style="{ width: '100px' }">
              <el-button type="info" size="mini" @click="onDiscussOperate('add')">新增</el-button>
            </div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">序号</div>
            <div class="meeting-record-row-col word-big change">内容</div>
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">操作</div>
          </div>
          <div v-for="(item, index) in meetingDialogObj.form.meetResult" :key="item.index" class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">{{ index + 1 }}</div>
            <div class="meeting-record-row-col change form-padding">
              <el-form-item label="" :prop="'meetResult.' + index + '.value'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.value" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '100px' }">
              <el-button size="mini" type="primary" plain @click="onDiscussOperate('delete', index)">删除</el-button>
            </div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big">会议遗留问题或工作</div>
            <div class="meeting-record-row-col stable" :style="{ width: '100px' }">
              <el-button type="info" size="mini" @click="onOtherOperate('add')">新增</el-button>
            </div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">序号</div>
            <div class="meeting-record-row-col word-big">项目</div>
            <div class="meeting-record-row-col word-big">提出人</div>
            <div class="meeting-record-row-col word-big width2">遗留工作</div>
            <div class="meeting-record-row-col word-big width2">负责人</div>
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">操作</div>
          </div>
          <div v-for="(item, index) in meetingDialogObj.form.remainingProblem" :key="item.index" class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">{{ index + 1 }}</div>
            <div class="meeting-record-row-col form-padding">
              <el-form-item label="">
                <el-input v-model="item.project" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding">
              <el-form-item label="">
                <el-input v-model="item.exhibitor" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding width2">
              <el-form-item label="" :prop="'remainingProblem.' + index + '.work'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.work" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding width2">
              <el-form-item label="">
                <el-input v-model="item.leader" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '100px' }">
              <el-button size="mini" type="primary" plain @click="onOtherOperate('delete', index)">删除</el-button>
            </div>
          </div>
        </el-form>
        <el-form class="mt20" :inline="true" :model="meetingDialogObj.wwkSearch">
          <el-form-item label="系统名称">
            <el-input v-model="meetingDialogObj.wwkSearch.sysName" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="上线时间">
            <el-date-picker v-model="meetingDialogObj.wwkSearch.planTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSearchWeek">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table v-loading="listLoading" :data="meetingDialogObj.form.meetingWeekReportList" :row-class-name="tableRowClassName" element-loading-text="Loading" border fit highlight-current-row max-height="500">
          <el-table-column label="上线日期" min-width="120" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更类型" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主系统项目整体进度" min-width="150" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目阶段" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="升级联测系统数量" min-width="140" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="无升级联测系统数量" min-width="150" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="原因说明" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="负责人" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="目前进展" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.progress" placeholder="请输入" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="评估意见" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.opinion" placeholder="请输入" clearable></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="onOperateWeek('edit', scope.row)">修改</el-button>
              <el-button size="mini" type="primary" plain @click="onOperateWeek('detail', scope.row)">查看需求条目</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="meetingDialogObj.visible = false">取消</el-button>
        <el-button type="primary" @click="onOperateMeeting('submit')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getWeekReportList } from '@/api/local'
import weekApi from '@/api/week_manage'
import { Calendar } from '@/utils'
import echarts from 'echarts'

export default {
  data() {
    const requiredTrue = {
      required: true,
      message: '此为必填项',
      trigger: 'change'
    }
    // const requiredDate = {
    //   type: 'date',
    //   required: true,
    //   message: '此为必填项',
    //   trigger: 'change'
    // }
    return {
      autoHeightRequirement: 200,
      activeName: 'component-one',
      // 系统 搜索条件
      sysFormSearch: {
        planTime: null, // 生产上线时间
        searchStr: '', // 系统名称和子系统名称
        isExpand: false
      },
      // 周报 搜索条件
      weekFormSearch: {
        sysName: '', // 全流程系统名称
        versionNum: '', // 版本号
        mainSysSonName: '', // 主系统全流程子系统名称
        mainVersionNum: '', // 版本号
        projectName: '', // 项目名称
        planTime: null, // 生产上线日期
        crType: '', // 变更类型
        testType: '', // 联测类别
        projectStage: '', // 目前项目阶段
        testRuns: '', // 测试轮次
        overAllSchedule: '', // 项目整体进度
        manPowerInput: '', // 人力投入情况
        versionQuality: '', // 版本质量
        workload: '', // 工作量情况
        writter: '', // 测试负责人
        updateDate: null // 填写日期
      },
      // 会议记录 搜索条件
      meetingFormSearch: {
        theme: '', // 会议主题
        meetingDate: null // 会议时间
      },
      // 系统 信息
      sysObj: {
        height: 200,
        list: [],
        originList: []
      },
      // 周报 信息
      weekObj: {
        height: 200,
        list: [],
        checkedList: [],
        pageIndex: 1,
        pageSize: 20
      },
      // 会议记录 信息
      meetingObj: {
        height: 200,
        list: [],
        checkedList: [],
        pageIndex: 1,
        pageSize: 20
      },
      mainSysList: [], // 主系统列表
      ownSonSysList: [], // 本系统的子系统列表
      mainSonSysList: [], // 主系统的子系统列表
      listLoading: true,
      // 联测主系统/周报 dialog
      weekDialogObj: {
        title: '新增',
        visible: false,
        height: 200,
        uuid: null,
        form: {
          ownSonSys: {
            itemAppNameSon: '',
            itemSystemId: ''
          },
          sysName: '', // 全流程系统名称
          itemSystemId: '', // 全流程系统id
          sysSonName: '', // 全流程子系统名称
          versionNum: '', // 版本号
          mainSonSys: {
            itemAppNameSon: '',
            itemSystemId: ''
          },
          mainSysName: '', // 主系统全流程名称
          mainItemSystemId: '', // 主系统全流程id
          mainSysSonName: '', // 主系统全流程子系统名称
          mainVersionNum: '', // 版本号
          projectName: '', // 项目名称
          planTime: '', // 生产上线日期
          crType: '', // 变更类型
          testType: '', // 联测类别
          projectStage: '', // 目前项目阶段
          testRuns: '', // 测试轮次
          overAllSchedule: '', // 项目整体进度
          manPowerInput: '', // 人力投入情况
          versionQuality: '', // 版本质量
          workload: '', // 工作量情况
          performanceTest: '', // 性能测试
          writter: '', // 测试负责人
          funcNum: '', // 功能点数量
          codeNum: '', // 代码量
          businessTime: '', // 业务上线时间
          changeOperationTime: '', // 变更操作耗时
          updateDate: '', // 填写日期
          reason: '', // 原因说明
          isMainSystem: 0, // 是否为核心系统
          isInfluenceMem: 0, // 是否影响会员（客户端和API更新）
          isInfluenceOuter: 0, // 是否影响外部关联机构（CDC、清算所、金交所、总行、货币经济公司、第三方平台）
          isNewOrHead: 0, // 是否为新业务上线或总行相关业务
          isTechUp: 0, // 是否为技术上线
          isAutoDeploy: 0, // 是否为自动化部署
          isIncludeBusiness: 0 // 是否包含业务操作内容
        },
        rules: {
          sysName: [requiredTrue],
          sysSonName: [requiredTrue],
          versionNum: [requiredTrue],
          mainSysName: [requiredTrue],
          mainSysSonName: [requiredTrue],
          mainVersionNum: [requiredTrue],
          crType: [requiredTrue],
          testType: [requiredTrue],
          projectStage: [requiredTrue],
          testRuns: [requiredTrue],
          overAllSchedule: [requiredTrue],
          manPowerInput: [requiredTrue],
          versionQuality: [requiredTrue],
          workload: [requiredTrue],
          performanceTest: [requiredTrue],
          writter: [requiredTrue],
          reason: [requiredTrue]
        }
      },
      // 需求条目 dialog
      requirementDialogObj: {
        visible: false,
        height: 200,
        list: []
      },
      // 树状图 dialog
      treeDialogObj: {
        visible: false
      },
      // 会议记录 dialog
      meetingDialogObj: {
        title: '新增',
        visible: false,
        height: 200,
        wwkSearch: {
          sysName: '',
          planTime: ''
        },
        form: {
          theme: '', // 会议主题
          meetingDate: '', // 会议时间
          place: '', // 会议地点
          host: '', // 会议主持人
          recorder: '', // 记录人
          // 参与部门与人员
          departmentStaff: [
            {
              department: '中汇公司',
              value: ''
            }
          ],
          // 会议讨论结果
          meetResult: [
            {
              value: ''
            }
          ],
          // 会议遗留问题或工作
          remainingProblem: [],
          // 周报列表
          meetingWeekReportList: []
        },
        rules: {
          theme: [requiredTrue],
          meetingDate: [requiredTrue],
          place: [requiredTrue],
          host: [requiredTrue],
          recorder: [requiredTrue]
        }
      },
      // 日期快捷选项
      pickerOptions: {
        shortcuts: [
          {
            text: '本周',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getNowWeek().startDate
              const end = calendar.getNowWeek().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '上周',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getLastWeek().startDate
              const end = calendar.getLastWeek().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '下周',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getNextWeekOther().startDate
              const end = calendar.getNextWeekOther().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '下两周',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getNextTwoWeekOther().startDate
              const end = calendar.getNextTwoWeekOther().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本月',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getNowMonth().startDate
              const end = calendar.getNowMonth().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '上月',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getLastMonth().startDate
              const end = calendar.getLastMonth().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '下月',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getNextMonth().startDate
              const end = calendar.getNextMonth().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本年',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getNowYear().startDate
              const end = calendar.getNowYear().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '全部',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getAll().startDate
              const end = calendar.getAll().endDate
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created() {
    this.fetchData()
    const permissionInfo = localStorage.getItem('permissionInfo')
    console.log(permissionInfo)
  },
  mounted() {
    this.$nextTick(() => {
      this.sysObj.height = this.$el.parentNode.clientHeight - this.$refs['sysFormSearch'].$el.clientHeight - 100
      this.autoHeightRequirement = this.$root.$el.clientHeight - 380
      this.weekDialogObj.height = this.$root.$el.clientHeight - 280
      this.meetingDialogObj.height = this.$root.$el.clientHeight - 200

      window.onresize = () => {
        this.sysObj.height = this.$el.parentNode.clientHeight - this.$refs['sysFormSearch'].$el.clientHeight - 100
        this.autoHeightRequirement = this.$root.$el.clientHeight - 380
        this.weekDialogObj.height = this.$root.$el.clientHeight - 280
        this.meetingDialogObj.height = this.$root.$el.clientHeight - 200
        this.weekObj.height = this.$el.parentNode.clientHeight - this.$refs['weekFormSearch'].$el.clientHeight - 240
        this.meetingObj.height = this.$el.parentNode.clientHeight - this.$refs['meetingFormSearch'].$el.clientHeight - 160
      }
    })
  },
  methods: {
    // 选择主系统版本号
    handleCommandWeekMainOperate(value) {
      console.log(value)
      this.weekDialogObj.form.versionNum = value
    },
    // 选择子系统版本号
    handleCommandWeekSonOperate(value) {
      console.log(value)
      this.weekDialogObj.form.mainVersionNum = value
    },
    // 获取主系统列表数据
    onSearchMainSys() {
      weekApi.getAllSysName().then(response => {
        this.mainSysList = response.data
      })
    },
    /** 获取子系统列表数据
     * @method onSearchSonSys
     * @param {String} type own: 本系统;main: 主系统
     * @return 无
     */
    onSearchSonSys(type, sysName) {
      weekApi.getSonSysNames(sysName).then(response => {
        response.data.map(e => {
          e.itemAppNameSon = e.itemAppNameSon || 'null'
        })
        if (type === 'own') {
          this.ownSonSysList = response.data
        } else if (type === 'main') {
          this.mainSonSysList = response.data
        }
      })
    },
    // 选择本系统的主系统
    onChangeOwnMainSys(val) {
      this.onSearchSonSys('own', val)
      this.weekDialogObj.form.sysSonName = ''
    },
    // 选择本系统的子系统
    onChangeOwnSonSys(val) {
      this.weekDialogObj.form.sysSonName = val.itemAppNameSon
      this.weekDialogObj.form.itemSystemId = val.itemSystemId
    },
    // 选择主系统的主系统
    onChangeMainMainSys(val) {
      this.onSearchSonSys('main', val)
      this.weekDialogObj.form.mainSysSonName = ''
    },
    // 选择主系统的子系统
    onChangeMainSonSys(val) {
      this.weekDialogObj.form.mainSysSonName = val.itemAppNameSon
      this.weekDialogObj.form.mainItemSystemId = val.itemSystemId
    },
    // 切换tab
    onToggleTab(tab, event) {
      console.log(tab, event)
      if (tab.name === 'component-one') {
        this.onSearchSys()
      }
      if (tab.name === 'component-two') {
        this.onSearchWeek()
      } else if (tab.name === 'component-three') {
        this.onSearchMeeting()
      }
      this.$nextTick(() => {
        this.weekObj.height = this.$el.parentNode.clientHeight - this.$refs['weekFormSearch'].$el.clientHeight - 240
        this.meetingObj.height = this.$el.parentNode.clientHeight - this.$refs['meetingFormSearch'].$el.clientHeight - 160
      })
    },
    // 周报 展开/收起搜索条件
    onChangeCollapse(name) {
      console.log(name)
      this.$nextTick(() => {
        if (name.length) {
          this.weekObj.height = this.$el.parentNode.clientHeight - this.$refs['weekFormSearch'].$el.clientHeight - 240
        } else {
          this.weekObj.height = this.$el.parentNode.clientHeight - 240
        }
      })
    },
    // 周报 设置列表选中的数据
    handleSelectionChangeWeek(val) {
      this.weekObj.checkedList = val
    },
    /** 会议记录 部门与人员相关操作
     * @method onDepartmentOperate
     * @param {String} type add:新增;delete:删除
     * @param {Number} index 当前行索引
     * @return 无
     */
    onDepartmentOperate(type, index) {
      if (type === 'add') {
        this.meetingDialogObj.form.departmentStaff.push({
          department: '',
          value: ''
        })
      } else if (type === 'delete') {
        this.meetingDialogObj.form.departmentStaff.splice(index, 1)
      }
    },
    /** 会议记录 会议讨论结果相关操作
     * @method onDiscussOperate
     * @param {String} type add:新增;delete:删除
     * @param {Number} index 当前行索引
     * @return 无
     */
    onDiscussOperate(type, index) {
      if (type === 'add') {
        this.meetingDialogObj.form.meetResult.push({
          value: ''
        })
      } else if (type === 'delete') {
        this.meetingDialogObj.form.meetResult.splice(index, 1)
      }
    },
    /** 会议记录 会议遗留问题或工作相关操作
     * @method onOtherOperate
     * @param {String} type add:新增;delete:删除
     * @param {Number} index 当前行索引
     * @return 无
     */
    onOtherOperate(type, index) {
      if (type === 'add') {
        this.meetingDialogObj.form.remainingProblem.push({
          project: '',
          exhibitor: '',
          work: '',
          leader: ''
        })
      } else if (type === 'delete') {
        this.meetingDialogObj.form.remainingProblem.splice(index, 1)
      }
    },
    // 会议记录 设置列表选中的数据
    handleSelectionChangeMeeting(val) {
      this.meetingObj.checkedList = val
    },
    /** 系统/周报 操作
     * @method onOperateWeek
     * @param {String} type add: 新增;edit: 修改;submit: 提交;deleteSingle: 单个删除;deleteMultiple: 批量删除;detail: 查看;tree: 系统关系树状图
     * @param {Object} row 当前行数据
     * @return 无
     */
    onOperateWeek(type, row) {
      if (type === 'add') {
        this.weekDialogObj.visible = true
        this.weekDialogObj.title = '新增'
        this.weekDialogObj.uuid = null
        this.$nextTick(() => {
          this.$refs['weekForm'].resetFields()
          this.weekDialogObj.form.sysName = ''
          this.weekDialogObj.form.itemSystemId = ''
          this.weekDialogObj.form.ownSonSys = {
            itemAppNameSon: '',
            itemSystemId: ''
          }
          this.weekDialogObj.form.mainSysName = ''
          this.weekDialogObj.form.mainItemSystemId = ''
          this.weekDialogObj.form.mainSonSys = {
            itemAppNameSon: '',
            itemSystemId: ''
          }
          Object.assign(this.weekDialogObj.form, {
            isMainSystem: 0, // 是否为核心系统
            isInfluenceMem: 0, // 是否影响会员（客户端和API更新）
            isInfluenceOuter: 0, // 是否影响外部关联机构（CDC、清算所、金交所、总行、货币经济公司、第三方平台）
            isNewOrHead: 0, // 是否为新业务上线或总行相关业务
            isTechUp: 0, // 是否为技术上线
            isAutoDeploy: 0, // 是否为自动化部署
            isIncludeBusiness: 0 // 是否包含业务操作内容
          })
        })
      } else if (type === 'edit') {
        this.weekDialogObj.visible = true
        this.weekDialogObj.title = '修改'
        this.weekDialogObj.uuid = row.uuid
        const params = row.uuid
        weekApi.getWeekReport(params).then(response => {
          this.weekDialogObj.form = response.data
          this.weekDialogObj.form.sysSonName = response.data.sysSonName || 'null'
          this.weekDialogObj.form.mainSysSonName = response.data.mainSysSonName || 'null'
          this.weekDialogObj.form.ownSonSys = {
            itemAppNameSon: this.weekDialogObj.form.sysSonName,
            itemSystemId: response.data.itemSystemId
          }
          this.weekDialogObj.form.mainSonSys = {
            itemAppNameSon: this.weekDialogObj.form.mainSysSonName,
            itemSystemId: response.data.mainItemSystemId
          }
          this.onSearchSonSys('own', response.data.sysName)
          this.onSearchSonSys('main', response.data.mainSysName)
        })
      } else if (type === 'submit') {
        this.$refs['weekForm'].validate((valid) => {
          if (valid) {
            if (this.weekDialogObj.title === '新增') {
              const params = this.weekDialogObj.form
              weekApi.addWeekReport(params).then(response => {
                this.$notify({
                  title: '成功',
                  message: '新增成功',
                  type: 'success'
                })
                if (this.activeName === 'component-one') {
                  this.onSearchSys()
                  this.weekDialogObj.visible = false
                } else if (this.activeName === 'component-two') {
                  this.initWeek()
                  this.weekDialogObj.visible = false
                }
                this.sysFormSearch.isExpand = false
              })
            } else if (this.weekDialogObj.title === '修改') {
              const params = this.weekDialogObj.form
              params.uuid = this.weekDialogObj.uuid
              weekApi.updateWeekReport(params).then(response => {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                })
                if (this.activeName === 'component-one') {
                  this.onSearchSys()
                  this.weekDialogObj.visible = false
                } else if (this.activeName === 'component-two') {
                  this.initWeek()
                  this.weekDialogObj.visible = false
                }
                this.sysFormSearch.isExpand = false
              })
            }
          }
        })
      } else if (type === 'deleteMultiple') {
        console.log(this.weekObj.checkedList)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            weekReportInfoList: this.weekObj.checkedList
          }
          weekApi.delWeekReport(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initWeek()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (type === 'deleteSingle') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            weekReportInfoList: [row]
          }
          weekApi.delWeekReport(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initWeek()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (type === 'detail') {
        this.requirementDialogObj.visible = true
        this.requirementDialogObj.list = [
          {
            'item_req_list_id': 'XQTM1808270068',
            'item_req_title': '基准系统新增一个栏目“国际货币经纪外汇期权实时报价”',
            'flag': 1
          },
          {
            'item_req_list_id': 'XQTM1808270069',
            'item_req_title': '基准通过DEP订阅货币经纪外汇期权实时报价',
            'flag': 1
          },
          {
            'item_req_list_id': 'XQTM1808270072',
            'item_req_title': '外汇期权成交明细中增加修正波动率等字段',
            'flag': 1
          }
        ]
        // getRequirementEntryInfoReq().then(response => {
        //   this.requirementDialogObj.list = response.data
        // })
      } else if (type === 'tree') {
        this.treeDialogObj.visible = true
        this.$nextTick(() => {
          // 基于准备好的dom，初始化echarts实例
          const myChart = echarts.init(document.getElementById('myChart'))
          const data = {
            'name': 'flare',
            'children': [
              {
                'name': 'data',
                'children': [
                  {
                    'name': 'converters',
                    'children': [
                      {
                        'name': 'Converters',
                        'value': 721
                      },
                      {
                        'name': 'DelimitedTextConverter',
                        'value': 4294
                      }
                    ]
                  },
                  {
                    'name': 'DataUtil',
                    'value': 3322
                  }
                ]
              },
              {
                'name': 'display',
                'children': [
                  {
                    'name': 'DirtySprite',
                    'value': 8833
                  },
                  {
                    'name': 'LineSprite',
                    'value': 1732
                  },
                  {
                    'name': 'RectSprite',
                    'value': 3623
                  }
                ]
              },
              {
                'name': 'flex',
                'children': [
                  {
                    'name': 'FlareVis',
                    'value': 4116
                  }
                ]
              }
            ]
          }
          myChart.setOption({
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: {}
              }
            },
            legend: {
              top: '2%',
              left: '3%',
              orient: 'vertical',
              borderColor: '#c23531'
            },
            series: [
              {
                type: 'tree',
                data: [data],
                top: '5%',
                left: '7%',
                bottom: '2%',
                right: '60%',
                symbolSize: 7,
                label: {
                  normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right'
                  }
                },
                leaves: {
                  label: {
                    normal: {
                      position: 'right',
                      verticalAlign: 'middle',
                      align: 'left'
                    }
                  }
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
              }
            ]
          })

          // 基于准备好的dom，初始化echarts实例
          const myChart2 = echarts.init(document.getElementById('myChart2'))
          // 绘制图表
          myChart2.setOption({
            title: { text: '项目目前阶段' },
            tooltip: {
              formatter: (params, ticket, callback) => {
                // console.log(params)
                let res = params[0].name
                for (var i = 0, l = params.length; i < l; i++) {
                  res += '<br/>' + params[i].seriesName
                  res += ' : '
                  res += ['', '测试准备', 'UAT1测试', 'UAT1完成', '验收流程', '验收测试', '验收完成', '模拟流程', '模拟测试', '模拟完成', '已上线'][parseInt(params[i].value)]
                }
                setTimeout(() => {
                  // 仅为了模拟异步回调
                  callback(ticket, res)
                }, 0)
                return 'loading'
              },
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: {}
              }
            },
            legend: {
              data: ['项目阶段']
            },
            calculable: true,
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              splitNumber: 10,
              axisTick: {
                show: true,
                interval: 0
              },
              axisLabel: {
                show: true,
                margin: 8,
                formatter: function(value, index) {
                  return ['    ', '测试准备', 'UAT1测试', 'UAT1完成', '验收流程', '验收测试', '验收完成', '模拟流程', '模拟测试', '模拟完成', '已上线'][value]
                },
                textStyle: {
                  color: 'blue',
                  fontFamily: 'sans-serif',
                  fontSize: 15,
                  fontStyle: 'italic',
                  fontWeight: 'bold'
                }
              }
            },
            yAxis: {
              show: false,
              type: 'category',
              axisTick: {
                show: false
              },
              data: ['test1V1.1.1', 'test2V2.1.1', 'test3V2.1.1', 'test4V1.3.1', 'test5V5.1.1', 'test6V1.6.1', 'test7V4.1.1']
            },
            series: [
              {
                name: '系统测试',
                type: 'bar',
                barWidth: 35,
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      position: 'insideBottom',
                      formatter: '{b} ',
                      textStyle: {
                        fontSize: 16
                      }
                    }
                  }
                },
                data: [9, 9, 9, 8, 7, 6, 9]
              }
            ]
          })
        })
      }
    },
    /** 会议记录 操作
     * @method onOperateMeeting
     * @param {String} type add: 新增;edit: 修改;submit: 提交;deleteSingle: 单个删除;deleteMultiple: 批量删除
     * @param {Object} row 当前行数据
     * @return 无
     */
    onOperateMeeting(type, row) {
      if (type === 'add') {
        this.meetingDialogObj.visible = true
        this.meetingDialogObj.title = '新增'
        this.weekDialogObj.uuid = null
        this.$nextTick(() => {
          this.$refs['meetingForm'].resetFields()
          this.meetingDialogObj.form.departmentStaff = [
            {
              department: '中汇公司',
              value: ''
            }
          ]
          this.meetingDialogObj.form.meetResult = [
            {
              value: ''
            }
          ]
          this.meetingDialogObj.form.remainingProblem = []
          this.meetingDialogObj.form.meetingWeekReportList = []
        })
      } else if (type === 'edit') {
        this.meetingDialogObj.visible = true
        this.meetingDialogObj.title = '修改'
        this.meetingDialogObj.uuid = row.uuid
        const params = row.uuid
        weekApi.getMeetingRecord(params).then(response => {
          this.meetingDialogObj.form = response.data
          this.meetingDialogObj.form.departmentStaff = JSON.parse(response.data.departmentStaff)
          this.meetingDialogObj.form.meetResult = JSON.parse(response.data.meetResult)
          this.meetingDialogObj.form.remainingProblem = JSON.parse(response.data.remainingProblem)
        })
      } else if (type === 'submit') {
        this.$refs['meetingForm'].validate((valid) => {
          if (valid) {
            console.log(this.meetingDialogObj)
            const params = JSON.parse(JSON.stringify(this.meetingDialogObj.form))
            params.departmentStaff = JSON.stringify(params.departmentStaff)
            params.meetResult = JSON.stringify(params.meetResult)
            params.remainingProblem = JSON.stringify(params.remainingProblem)
            if (this.meetingDialogObj.title === '新增') {
              weekApi.addMeetingRecord(params).then(response => {
                this.$notify({
                  title: '成功',
                  message: '新增成功',
                  type: 'success'
                })
                this.initMeeting()
                this.meetingDialogObj.visible = false
              })
            } else if (this.meetingDialogObj.title === '修改') {
              params.uuid = this.meetingDialogObj.uuid
              weekApi.updateMeetingRecord(params).then(response => {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                })
                this.initMeeting()
                this.meetingDialogObj.visible = false
              })
            }
          }
        })
      } else if (type === 'deleteMultiple') {
        console.log(this.meetingObj.checkedList)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            idList: this.meetingObj.checkedList.map(e => { return e.uuid })
          }
          weekApi.delMeetingRecord(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initMeeting()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (type === 'deleteSingle') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            idList: [row.uuid]
          }
          weekApi.delMeetingRecord(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initMeeting()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 系统 设置table行的class
    tableRowClassName({ row, rowIndex }) {
      if (row.isMain) {
        switch(row.overAllSchedule) {
          case '正常':
            return 'normal'
            break
          case '延期':
            return 'delay'
            break
          case '暂停':
            return 'pause'
            break
          case '作废':
            return 'obsolete'
            break
          default:
            return ''
        } 
      }
      return ''
    },
    // 系统 设置table单元格的class
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 && !row.isMain) {
        return row.differentTime ? 'redCell' : ''
      } else if (columnIndex === 5 && !row.isMain) {
        return row.overAllSchedule === '延期' ? 'delayCell' : ''
      } else if (columnIndex === 10) {
        return row.writter === '' ? 'emptyCell' : ''
      }
    },
    /** 系统 单个展开/收起
     * @method onChangeExpandOne
     * @param {Boolean} status false: 收起;true: 展开
     * @param {Object} row 当前行数据
     * @return 无
     */
    onChangeExpandOne(status, row) {
      console.log(status)
      console.log(row)
      // 获取当前主系统的index
      let currentIndex = 0
      this.sysObj.list.some((e, i) => {
        if (e.uuid === row.uuid) {
          currentIndex = i
          return true
        }
        return false
      })
      // 把当前的expandStatus反转过来
      this.sysObj.list[currentIndex].expandStatus = status
      if (status) {
        // 获取当前主系统下面的子系统
        let tempArr = []
        // this.sysObj.originList.some((e, i) => {
        //   if (i > row.index) {
        //     if (e.status !== '主系统') {
        //       tempArr.push(e)
        //       return false
        //     }
        //     return true
        //   }
        //   return false
        // })
        tempArr = this.sysObj.list[currentIndex].sonSys.map(e => {
          e.isMain = false
          e.isExpand = false
          e.expandStatus = false
          if (e.planTime === row.planTime) {
            e.differentTime = false
          } else {
            e.differentTime = true
          }
          return e
        })
        console.log(tempArr)
        this.sysObj.list.splice(currentIndex + 1, 0, ...tempArr)
        console.log(this.sysObj.list)
      } else {
        // 获取当前主系统下的子系统个数
        let childLength = 0
        // this.sysObj.list.some((e, i) => {
        //   if (i > currentIndex) {
        //     if (e.status !== '主系统') {
        //       childLength++
        //       return false
        //     }
        //     return true
        //   }
        //   return false
        // })
        childLength = this.sysObj.list[currentIndex].sonSys.length
        this.sysObj.list.splice(currentIndex + 1, childLength)
        console.log(this.sysObj.list)
      }
    },
    /** 系统 全部展开/收起
     * @method onChangeExpandAll
     * @param {Boolean} type false:收起;true:展开
     * @return 无
     */
    onChangeExpandAll(type) {
      console.log(type)
      // const originList = JSON.parse(JSON.stringify(this.sysObj.originList))
      // if (type) {
      //   this.sysObj.list = originList
      // } else {
      //   this.sysObj.list = originList.filter(e => {
      //     return e.status === '主系统'
      //   })
      // }
      // // 能展开的行expand变化
      // this.sysObj.list.map(e => {
      //   if (e.isExpand) {
      //     e.isExpand = type
      //   }
      // })
      if (type) {
        const originList = JSON.parse(JSON.stringify(this.sysObj.list)).filter(e => {
          if (e.isMain && e.sonSys.length > 0) {
            e.isExpand = true
            e.expandStatus = true
          } else {
            e.isExpand = false
            e.expandStatus = false
          }
          return e.isMain
        })
        this.sysObj.list = []
        originList.forEach((current, index, arr) => {
          this.sysObj.list.push(current)
          if (current.sonSys.length > 0) {
            current.sonSys.map(e => {
              e.isMain = false
              e.isExpand = false
              e.expandStatus = false
              if (e.planTime === current.planTime) {
                e.differentTime = false
              } else {
                e.differentTime = true
              }
            })
            this.sysObj.list.push(...current.sonSys)
          }
        })
      } else {
        this.sysObj.list = this.sysObj.list.filter(e => {
          if (e.isMain) {
            e.expandStatus = false
          }
          return e.isMain
        })
      }
    },
    // 周报列表 每页条数选择
    handleSizeChangeWeek(val) {
      this.weekObj.pageSize = val
      this.initWeek()
    },
    // 周报列表 当前页选择
    handleCurrentChangeWeek(val) {
      this.weekObj.pageIndex = val
      this.onSearchWeek()
    },
    // 周报列表 查询
    onSearchWeek() {
      const params = {
        pageIndex: this.weekObj.pageIndex,
        pageSize: this.weekObj.pageSize,
        planTimeStart: this.weekFormSearch.planTime === null ? this.weekFormSearch.planTime : this.weekFormSearch.planTime[0],
        planTimeEnd: this.weekFormSearch.planTime === null ? this.weekFormSearch.planTime : this.weekFormSearch.planTime[1],
        updateDateStart: this.weekFormSearch.updateDate === null ? this.weekFormSearch.updateDate : this.weekFormSearch.updateDate[0],
        updateDateEnd: this.weekFormSearch.updateDate === null ? this.weekFormSearch.updateDate : this.weekFormSearch.updateDate[1]
      }
      Object.assign(params, this.weekFormSearch)
      delete params.planTime
      delete params.updateDate
      weekApi.getWeekReportList(params).then(response => {
        this.weekObj.list = response.data.list
        this.weekObj.total = response.data.total
        this.listLoading = false
      })
    },
    // 周报列表 初始化
    initWeek() {
      this.weekObj.pageIndex = 1
      this.onSearchWeek()
    },
    // 周报列表 重置
    resetWeek(formName) {
      this.$refs[formName].resetFields()
      this.initWeek()
    },
    // 会议记录列表 每页条数选择
    handleSizeChangeMeeting(val) {
      this.meetingObj.pageSize = val
      this.initMeeting()
    },
    // 会议记录列表 当前页选择
    handleCurrentChangeMeeting(val) {
      this.meetingObj.pageIndex = val
      this.onSearchMeeting()
    },
    // 会议记录列表 查询
    onSearchMeeting() {
      const params = {
        pageIndex: this.meetingObj.pageIndex,
        pageSize: this.meetingObj.pageSize,
        theme: this.meetingFormSearch.theme,
        meetingDateStart: this.meetingFormSearch.meetingDate === null ? this.meetingFormSearch.meetingDate : this.meetingFormSearch.meetingDate[0],
        meetingDateEnd: this.meetingFormSearch.meetingDate === null ? this.meetingFormSearch.meetingDate : this.meetingFormSearch.meetingDate[1]
      }
      weekApi.getMeetingRecordList(params).then(response => {
        this.meetingObj.list = response.data.list
        this.meetingObj.total = response.data.total
        this.listLoading = false
      })
    },
    // 会议记录列表 初始化
    initMeeting() {
      this.meetingObj.pageIndex = 1
      this.onSearchMeeting()
    },
    // 系统列表 查询
    onSearchSys() {
      const params = {
        searchStr: this.sysFormSearch.searchStr,
        planTimeStart: this.sysFormSearch.planTime === null ? this.sysFormSearch.planTime : this.sysFormSearch.planTime[0],
        planTimeEnd: this.sysFormSearch.planTime === null ? this.sysFormSearch.planTime : this.sysFormSearch.planTime[1]
      }
      weekApi.getWeekReportRelationList(params).then(response => {
        console.log(response)
        this.sysObj.list = response.data.relationSysList.map(e => {
          Object.assign(e, e.mainSys)
          e.isMain = true
          e.expandStatus = false
          e.differentTime = false
          if (e.sonSys.length === 0) {
            e.isExpand = false
          } else {
            e.isExpand = true
          }
          return e
        })
        this.listLoading = false
      })
    },
    fetchData() {
      this.onSearchSys()
      this.onSearchMainSys()
      // getWeekReportList().then(response => {
      //   console.log(response.data.items)
      //   this.sysObj.originList = response.data.items
      //   // 设置能展开的行
      //   this.sysObj.originList.forEach((e, i) => {
      //     if (e.status !== '主系统') {
      //       if (this.sysObj.originList[i - 1].status === '主系统') {
      //         this.sysObj.originList[i - 1].isExpand = true
      //       }
      //     }
      //   })
      //   // this.sysObj.list = response.data.items
      //   this.sysObj.list = this.sysObj.originList.filter(e => {
      //     return e.status === '主系统'
      //   })
      //   this.listLoading = false
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollDialog {
  height: 50%;
}
.meeting-record {
  overflow: auto;
  width: 100%;
  border: 1px solid #cdcdcd;
  margin-top: 20px;
  .border-right {
    border-right: 1px solid #cdcdcd;
  }
  .word-big {
    font-size: 14px;
    font-weight: bold;
  }
  .form-padding {
    padding: 20px 10px 0;
  }
  &-row {
    display: flex;
    flex-flow: row;
    border-bottom: 1px solid #cdcdcd;
    &:last-child {
      border-bottom: none;
    }
    &-col {
      flex: 1;
      padding: 10px;
      border-right: 1px solid #cdcdcd;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &:last-child {
        border-right: none;
      }
      &.stable {
        flex: 0 0 auto;
      }
      &.change {
        flex: 1;
      }
      &.width2 {
        flex-grow: 2;
      }
    }
    &.contain {
      position: relative;
    }
  }
  &-operate {
    margin: 20px;
    float: right;
  }
}
</style>
