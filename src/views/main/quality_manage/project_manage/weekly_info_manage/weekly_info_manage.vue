<template>
  <div class="app-container">
    <el-button class="add" type="info" size="small" @click="onOperate('add')">新增</el-button>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="联测主系统列表" name="component-one" :style="{ height: tabpaneHeight + 'px', overflow: 'auto' }">
        <el-form ref="component-one" :inline="true" :model="formSearch">
          <el-form-item label="系统名称">
            <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="上线时间">
            <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSearch">查询</el-button>
            <el-button type="success" size="small" @click="onToggleMeeting">{{ meetingObj.visible ? '隐藏' : '显示' }}添加会议记录</el-button>
            <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
          </el-form-item>
          <el-form-item label="展开">
            <el-switch v-model="formSearch.expand" @change="onChangeExpandAll"></el-switch>
          </el-form-item>
        </el-form>
        <el-table v-loading="listLoading" :data="weekReportList" :row-class-name="tableRowClassName" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight1">
          <el-table-column label="" min-width="60" align="center">
            <template v-if="scope.row.status === '主系统' && scope.row.isExpand" slot-scope="scope">
              <div v-if="!scope.row.expand" @click="onChangeExpandOne(true, scope.row)">
                <i class="el-icon-arrow-down"></i>
              </div>
              <div v-if="scope.row.expand" @click="onChangeExpandOne(false, scope.row)">
                <i class="el-icon-arrow-up"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上线日期" min-width="120" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status === '主系统'" type="text" size="mini" @click="onOperate('tree', scope.row)">{{ scope.row.title }}</el-button>
              <span v-if="scope.row.status !== '主系统'">{{ scope.row.title }}</span>
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
          <!-- <el-table-column label="是否为核心系统" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="负责人" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="meetingObj.visible" fixed="right" label="目前进展" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.progress" placeholder="请输入" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="meetingObj.visible" fixed="right" label="评估意见" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.opinion" placeholder="请输入" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="onOperate('edit', scope.row)">修改</el-button>
              <el-button size="mini" type="primary" plain @click="onOperate('detail', scope.row)">查看需求条目</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form v-if="meetingObj.visible" ref="meetingForm" :model="meetingForm" :rules="rules" class="meeting-record">
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '200px' }">会议主题 Subject</div>
            <div class="meeting-record-row-col form-padding form-padding change">
              <el-form-item label="" prop="subject">
                <el-input v-model="meetingForm.subject" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '200px' }">会议时间 Date</div>
            <div class="meeting-record-row-col form-padding stable" :style="{ width: '300px' }">
              <el-form-item label="" prop="time">
                <el-date-picker v-model="meetingForm.time" type="datetime" placeholder="请选择"></el-date-picker>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '150px' }">会议地点 Place</div>
            <div class="meeting-record-row-col form-padding change">
              <el-form-item label="" prop="place">
                <el-input v-model="meetingForm.place" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '200px' }">会议主持人 Moderator</div>
            <div class="meeting-record-row-col form-padding stable" :style="{ width: '300px' }">
              <el-form-item label="" prop="moderator">
                <el-input v-model="meetingForm.moderator" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '150px' }">记录人 Recorder</div>
            <div class="meeting-record-row-col form-padding change">
              <el-form-item label="" prop="recoder">
                <el-input v-model="meetingForm.recoder" placeholder="请输入" clearable></el-input>
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
          <div v-for="(item, index) in meetingForm.departmentList" :key="item.department" class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">{{ index + 1 }}</div>
            <div class="meeting-record-row-col form-padding stable" :style="{ width: '200px' }">
              <el-form-item label="" :prop="'departmentList.' + index + '.department'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.department" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding change">
              <el-form-item label="" :prop="'departmentList.' + index + '.value'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.value" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '100px' }">
              <el-button size="mini" type="primary" plain @click="onDepartmentOperate('delete', index)">删除</el-button>
            </div>
          </div>
          <!-- <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big">会议议题</div>
          </div>
          <div class="meeting-record-row">
            <div class="meeting-record-row-col word-big">序号</div>
            <div class="meeting-record-row-col word-big">上线日期</div>
            <div class="meeting-record-row-col word-big">主系统</div>
            <div class="meeting-record-row-col word-big">项目名称</div>
            <div class="meeting-record-row-col word-big">变更类型</div>
            <div class="meeting-record-row-col word-big">升级联测系统数量</div>
            <div class="meeting-record-row-col word-big">目前进展</div>
            <div class="meeting-record-row-col word-big">评估意见</div>
          </div>
          <div v-for="item in meetingForm.tableList" :key="item.key" class="meeting-record-row">
            <div class="meeting-record-row-col">{{ item.index }}</div>
            <div class="meeting-record-row-col">{{ item.date }}</div>
            <div class="meeting-record-row-col">{{ item.mainSys }}</div>
            <div class="meeting-record-row-col">{{ item.projectName }}</div>
            <div class="meeting-record-row-col">{{ item.type }}</div>
            <div class="meeting-record-row-col">{{ item.num }}</div>
            <div class="meeting-record-row-col form-padding">
              <el-form-item label="">
                <el-input v-model="item.progress" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding">
              <el-form-item label="">
                <el-input v-model="item.opinion" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
          </div> -->
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
          <div v-for="(item, index) in meetingForm.discussList" :key="item.index" class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">{{ index + 1 }}</div>
            <div class="meeting-record-row-col change form-padding">
              <el-form-item label="" :prop="'discussList.' + index + '.value'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
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
          <div v-for="(item, index) in meetingForm.otherList" :key="item.index" class="meeting-record-row">
            <div class="meeting-record-row-col word-big stable" :style="{ width: '100px' }">{{ index + 1 }}</div>
            <div class="meeting-record-row-col form-padding">
              <el-form-item label="" :prop="'otherList.' + index + '.value'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.project" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding">
              <el-form-item label="" :prop="'otherList.' + index + '.value'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.exhibitor" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding width2">
              <el-form-item label="" :prop="'otherList.' + index + '.value'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.work" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col form-padding width2">
              <el-form-item label="" :prop="'otherList.' + index + '.value'" :rules="{ required: true, message: '此为必填项', trigger: 'blur' }">
                <el-input v-model="item.leader" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </div>
            <div class="meeting-record-row-col stable" :style="{ width: '100px' }">
              <el-button size="mini" type="primary" plain @click="onOtherOperate('delete', index)">删除</el-button>
            </div>
          </div>
          <div class="meeting-record-operate">
            <el-button @click="meetingObj.visible = false">取消</el-button>
            <el-button type="success" @click="meetingObj.visible = false">重置</el-button>
            <el-button type="primary" @click="submitForm('meetingForm')">确定</el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="测试周报信息列表" name="component-two">
        <el-form ref="component-two" :inline="true" :model="formSearch" label-width="100px">
          <el-form-item label="系统名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="债券基础信息系统" value="0"></el-option>
              <el-option label="交易后处理系统" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统版本号">
            <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="主系统名称">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="系统1" value="0"></el-option>
              <el-option label="系统2" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主系统版本号">
            <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="变更类型">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="正常" value="0"></el-option>
              <el-option label="紧急" value="1"></el-option>
              <el-option label="紧例行急" value="1"></el-option>
              <el-option label="快捷" value="1"></el-option>
              <el-option label="NA" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联测类别">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="主系统" value="0"></el-option>
              <el-option label="升级联测" value="1"></el-option>
              <el-option label="无升级联测" value="1"></el-option>
              <el-option label="未回复" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目阶段">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="测试准备" value="0"></el-option>
              <el-option label="UAT1测试" value="1"></el-option>
              <el-option label="UAT1完成" value="1"></el-option>
              <el-option label="验收流程" value="1"></el-option>
              <el-option label="验收测试" value="1"></el-option>
              <el-option label="验收完成" value="1"></el-option>
              <el-option label="模拟流程" value="1"></el-option>
              <el-option label="模拟测试" value="1"></el-option>
              <el-option label="模拟完成" value="1"></el-option>
              <el-option label="已上线" value="1"></el-option>
              <el-option label="NA" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测试轮次">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option v-for="item in 100" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="整体进度">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="正常" value="0"></el-option>
              <el-option label="延期" value="1"></el-option>
              <el-option label="暂停" value="1"></el-option>
              <el-option label="作废" value="1"></el-option>
              <el-option label="NA" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人力投入">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="人力紧张" value="0"></el-option>
              <el-option label="人力充足" value="1"></el-option>
              <el-option label="人力不足" value="0"></el-option>
              <el-option label="NA" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="填写日期">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="今天" value="0"></el-option>
              <el-option label="过去7天" value="1"></el-option>
              <el-option label="本月" value="0"></el-option>
              <el-option label="今年" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本质量">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="质量一般" value="0"></el-option>
              <el-option label="质量较好" value="1"></el-option>
              <el-option label="质量较差" value="0"></el-option>
              <el-option label="NA" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作量情况">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="超签报" value="0"></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="超采购" value="0"></el-option>
              <el-option label="NA" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="生产上线日期">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="今天" value="0"></el-option>
              <el-option label="过去7天" value="1"></el-option>
              <el-option label="本月" value="0"></el-option>
              <el-option label="今年" value="1"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="生产上线时间">
            <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <div class="mb20">
            <el-button type="primary" size="small" @click="onSearch">查询</el-button>
            <el-button type="success" size="small" @click="onSearch">重置</el-button>
            <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
            <el-button type="danger" size="small" @click="onSearch">删除</el-button>
          </div>
        </el-form>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight2">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="版本号" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主系统版本号" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产上线日期" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更类型" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联测类别" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="测试轮次" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目整体进度" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="原因说明" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="人力投入情况" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="版本质量" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="工作量情况" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性能测试" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="测试负责人" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="填写日期" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新用户名" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最后更新时间" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否为核心系统" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="功能点数量" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="代码量" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否影响会员" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否影响外部关联机构" min-width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否为新业务上线或总行相关业务" min-width="240" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否为技术上线" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="业务上线时间" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更操作耗时" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否为自动化部署" min-width="140" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否包含业务操作内容" min-width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
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
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="dialogObj.title" :visible.sync="dialogObj.visible" top="5vh" width="1200px">
      <el-form :style="{ height: dialogObj.height + 'px', overflow: 'auto' }" :inline="true" :model="dialogObj.form" label-width="100px" label-position="top">
        <el-row>
          <el-col :span="6">
            <el-form-item label="全流程系统名称">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="全流程子系统名称">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="版本号(版本号/手写版本号二选一填写*)">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手写版本号(版本号/手写版本号二选一填写*)">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="主系统全流程名称">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主系统全流程子系统名称">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="版本号(版本号/手写版本号二选一填写*)">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手写版本号(版本号/手写版本号二选一填写*)">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="项目名称">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产上线日期">
              <el-date-picker v-model="dialogObj.form.date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="变更类型">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联测类别">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="目前项目阶段">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="测试轮次">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="项目整体进度">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="人力投入情况">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="版本质量">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="工作量情况">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="性能测试">
              <el-select v-model="dialogObj.form.region" placeholder="请选择" clearable>
                <el-option label="债券基础信息系统" value="0"></el-option>
                <el-option label="交易后处理系统" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="测试负责人">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="功能点数量">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="代码量">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="业务上线时间">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="变更操作耗时">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="填写日期">
              <el-date-picker v-model="dialogObj.form.date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="原因说明">
              <el-input v-model="dialogObj.form.user" type="textarea" :rows="6" :style="{ width: '600px'}"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="dialogObj.form.checked">是否为核心系统</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="dialogObj.form.checked">是否影响会员（客户端和API更新）</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="dialogObj.form.checked">是否影响外部关联机构（CDC、清算所、金交所、总行、货币经济公司、第三方平台）</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="dialogObj.form.checked">是否为新业务上线或总行相关业务</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="dialogObj.form.checked">是否为技术上线</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="dialogObj.form.checked">是否为自动化部署</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-checkbox v-model="dialogObj.form.checked">是否包含业务操作内容</el-checkbox>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogObj.visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="需求条目信息" :visible.sync="dialogObj2.visible" width="800px">
      <el-table :data="dialogObj2.list" :max-height="autoHeight3">
        <el-table-column property="item_req_list_id" label="需求条目编号" min-width="200"></el-table-column>
        <el-table-column property="item_req_title" label="需求条目主题" min-width="200"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="系统关系树状图" :visible.sync="dialogObj3.visible" :fullscreen="true">
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
      <div>项目整体进度：正常----延期----暂停----作废----NA</div>
      <div id="myChart2" :style="{width: '100%', height: '580px'}"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getWeekReportList, getTestList } from '@/api/local'
import { Calendar } from '@/utils'
import echarts from 'echarts'

export default {
  data() {
    return {
      autoHeight1: 200,
      autoHeight2: 200,
      autoHeight3: 200,
      tabpaneHeight: 200,
      currentPage: 1,
      activeName: 'component-one',
      formSearch: {
        date: '',
        user: '',
        region: '',
        type: '当月采购详情'
      },
      list: [],
      weekReportList: [],
      weekReportOriginList: [],
      listLoading: true,
      dialogObj: {
        title: '新增',
        visible: false,
        height: 200,
        form: {
          date: '',
          user: '',
          region: '',
          checked: false,
          expand: false
        }
      },
      dialogObj2: {
        visible: false,
        list: []
      },
      dialogObj3: {
        visible: false,
        list: []
      },
      meetingObj: {
        visible: false
      },
      meetingForm: {
        subject: '',
        time: '',
        place: '',
        moderator: '',
        recorder: '',
        departmentList: [
          {
            department: '中汇公司',
            value: ''
          }
        ],
        discussList: [
          {
            value: ''
          }
        ],
        otherList: [],
        tableList: []
      },
      rules: {
        subject: [
          { required: true, message: '此为必填项', trigger: 'blur' }
        ]
      },
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
      this.autoHeight1 = this.$el.parentNode.clientHeight - this.$refs['component-one'].$el.clientHeight - 100
      this.autoHeight3 = this.$root.$el.clientHeight - 380
      this.dialogObj.height = this.$root.$el.clientHeight - 280
      this.tabpaneHeight = this.$root.$el.clientHeight - 180

      window.onresize = () => {
        this.autoHeight1 = this.$el.parentNode.clientHeight - this.$refs['component-one'].$el.clientHeight - 100
        this.autoHeight3 = this.$root.$el.clientHeight - 380
        this.dialogObj.height = this.$root.$el.clientHeight - 280
        this.autoHeight2 = this.$el.parentNode.clientHeight - this.$refs['component-two'].$el.clientHeight - 160
        this.tabpaneHeight = this.$root.$el.clientHeight - 180
      }
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
      this.$nextTick(() => {
        this.autoHeight2 = this.$el.parentNode.clientHeight - this.$refs['component-two'].$el.clientHeight - 160
      })
    },
    // 显示会议记录dialog
    onToggleMeeting() {
      this.meetingObj.visible = !this.meetingObj.visible
    },
    // 新增会议记录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          console.log(this.weekReportList)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 会议记录部门与人员相关操作
     * @method onDepartmentOperate
     * @param {String} type add:新增;delete:删除
     * @param {Number} index 当前行索引
     * @return 无
     */
    onDepartmentOperate(type, index) {
      if (type === 'add') {
        this.meetingForm.departmentList.push({
          key: '',
          value: ''
        })
      } else if (type === 'delete') {
        this.meetingForm.departmentList.splice(index, 1)
      }
    },
    /**
     * 会议记录 会议讨论结果相关操作
     * @method onDiscussOperate
     * @param {String} type add:新增;delete:删除
     * @param {Number} index 当前行索引
     * @return 无
     */
    onDiscussOperate(type, index) {
      if (type === 'add') {
        this.meetingForm.discussList.push({
          value: ''
        })
      } else if (type === 'delete') {
        this.meetingForm.discussList.splice(index, 1)
      }
    },
    /**
     * 会议记录 会议遗留问题或工作相关操作
     * @method onOtherOperate
     * @param {String} type add:新增;delete:删除
     * @param {Number} index 当前行索引
     * @return 无
     */
    onOtherOperate(type, index) {
      if (type === 'add') {
        this.meetingForm.otherList.push({
          project: '',
          exhibitor: '',
          work: '',
          leader: ''
        })
      } else if (type === 'delete') {
        this.meetingForm.otherList.splice(index, 1)
      }
    },
    /**
     * 操作
     * @method onOperate
     * @param {String} type add:新增;edit:修改;detail:查看;tree:系统关系树状图
     * @param {Object} row 当前行数据
     * @return 无
     */
    onOperate(type, row) {
      if (type === 'add') {
        this.dialogObj.visible = true
      } else if (type === 'edit') {
        this.dialogObj.visible = true
        this.dialogObj.title = '修改'
      } else if (type === 'detail') {
        this.dialogObj2.visible = true
        this.dialogObj2.list = [
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
        //   this.dialogObj2.list = response.data
        // })
      } else if (type === 'tree') {
        this.dialogObj3.visible = true
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
    // 设置table行的class
    tableRowClassName({ row, rowIndex }) {
      if (row.status === '主系统') {
        return row.bgcolor
      }
      return ''
    },
    /**
     * 单个展开/收起
     * @method onChangeExpandAll
     * @param {Boolean} status false:收起;true:展开
     * @param {Object} row 当前行数据
     * @return 无
     */
    onChangeExpandOne(status, row) {
      console.log(status)
      console.log(row)
      // 获取当前主系统的index
      let currentIndex = 0
      this.weekReportList.some((e, i) => {
        if (e.id === row.id) {
          currentIndex = i
          return true
        }
        return false
      })
      // 把当前的expand反转过来
      this.weekReportList[currentIndex].expand = status
      if (status) {
        // 获取当前主系统下面的主系统
        const tempArr = []
        this.weekReportOriginList.some((e, i) => {
          if (i > row.index) {
            if (e.status !== '主系统') {
              tempArr.push(e)
              return false
            }
            return true
          }
          return false
        })
        console.log(tempArr)
        this.weekReportList.splice(currentIndex + 1, 0, ...tempArr)
        console.log(this.weekReportList)
      } else {
        // 获取当前主系统下的子系统个数
        let childLength = 0
        this.weekReportList.some((e, i) => {
          if (i > currentIndex) {
            if (e.status !== '主系统') {
              childLength++
              return false
            }
            return true
          }
          return false
        })
        this.weekReportList.splice(currentIndex + 1, childLength)
      }
    },
    /**
     * 全部展开/收起
     * @method onChangeExpandAll
     * @param {Boolean} type false:收起;true:展开
     * @return 无
     */
    onChangeExpandAll(type) {
      console.log(type)
      const weekReportOriginList = JSON.parse(JSON.stringify(this.weekReportOriginList))
      if (type) {
        this.weekReportList = weekReportOriginList
      } else {
        this.weekReportList = weekReportOriginList.filter(e => {
          return e.status === '主系统'
        })
      }
      // 能展开的行expand变化
      this.weekReportList.map(e => {
        if (e.isExpand) {
          e.expand = type
        }
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
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getWeekReportList().then(response => {
        console.log(response.data.items)
        this.weekReportOriginList = response.data.items
        // 设置能展开的行
        this.weekReportOriginList.forEach((e, i) => {
          if (e.status !== '主系统') {
            if (this.weekReportOriginList[i - 1].status === '主系统') {
              this.weekReportOriginList[i - 1].isExpand = true
            }
          }
        })
        // this.weekReportList = response.data.items
        this.weekReportList = this.weekReportOriginList.filter(e => {
          return e.status === '主系统'
        })
        this.listLoading = false
      })
      getTestList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
      this.meetingForm.tableList = [
        {
          index: 1,
          date: '2019-07-11',
          mainSys: 'main1',
          projectName: 'pri1',
          type: '正常',
          num: 0,
          progress: '',
          opinion: '已完成模拟测试，按计划上线'
        },
        {
          index: 2,
          date: '2019-07-15',
          mainSys: 'main2',
          projectName: 'pri2',
          type: '快捷',
          num: 1,
          progress: '10月17日完成模拟测试',
          opinion: '按快速变更流程，测完则上线'
        },
        {
          index: 3,
          date: '2019-08-22',
          mainSys: 'main3',
          projectName: 'pri3',
          type: '正常',
          num: 0,
          progress: '10月05日完成模拟测试',
          opinion: '若周三测试完成，按计划上线'
        }
      ]
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
