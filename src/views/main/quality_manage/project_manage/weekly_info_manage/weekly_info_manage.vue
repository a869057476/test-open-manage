<template>
  <div class="app-container">
    <el-button class="add" type="info" size="small" @click="onOperate('add')">新增</el-button>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="联测主系统列表" name="component-one">
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
            <el-button type="success" size="small" @click="onSearch">添加会议记录</el-button>
            <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
          </el-form-item>
        </el-form>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight1">
          <el-table-column label="上线日期" min-width="120" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="onOperate('tree', scope.row)">{{ scope.row.title }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更类型" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
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
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="onOperate('edit', scope.row)">修改</el-button>
              <el-button size="mini" type="primary" plain @click="onOperate('detail', scope.row)">查看需求条目</el-button>
            </template>
          </el-table-column>
        </el-table>
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
          <el-form-item label="生产上线日期">
            <el-select v-model="formSearch.region" placeholder="请选择" clearable>
              <el-option label="今天" value="0"></el-option>
              <el-option label="过去7天" value="1"></el-option>
              <el-option label="本月" value="0"></el-option>
              <el-option label="今年" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="formSearch.user" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <div class="mb20">
            <el-button type="primary" size="small" @click="onSearch">查询</el-button>
            <el-button type="success" size="small" @click="onSearch">重置</el-button>
            <el-button type="warning" size="small" @click="onSearch">导出Excel</el-button>
            <el-button type="danger" size="small" @click="onSearch">删除</el-button>
          </div>
        </el-form>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight2">
          <el-table-column label="系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="版本号" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主系统名称" min-width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
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
              <el-input type="textarea" v-model="dialogObj.form.user" :rows="6" :style="{ width: '600px'}"></el-input>
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
      <div id="myChart2" :style="{width: '100%', height: '400px'}"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getTestList } from '@/api/local'
import { Calendar } from '@/utils'
import echarts from 'echarts'

export default {
  data() {
    return {
      autoHeight1: 200,
      autoHeight2: 200,
      autoHeight3: 200,
      currentPage: 1,
      activeName: 'component-one',
      formSearch: {
        date: '',
        user: '',
        region: '',
        type: '当月采购详情'
      },
      list: [],
      listLoading: true,
      dialogObj: {
        title: '新增',
        visible: false,
        height: 200,
        form: {
          date: '',
          user: '',
          region: '',
          checked: false
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
              const start = calendar.getNextWeek().startDate
              const end = calendar.getNextWeek().endDate
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '下两周',
            onClick(picker) {
              const calendar = new Calendar()
              const start = calendar.getNextTwoWeek().startDate
              const end = calendar.getNextTwoWeek().endDate
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
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight1 = this.$el.parentNode.clientHeight - this.$refs['component-one'].$el.clientHeight - 100
      this.autoHeight3 = this.$root.$el.clientHeight - 380
      this.dialogObj.height = this.$root.$el.clientHeight - 280
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
      this.$nextTick(() => {
        this.autoHeight2 = this.$el.parentNode.clientHeight - this.$refs['component-two'].$el.clientHeight - 160
      })
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
        this.dialogObj2.list = [{"item_req_list_id": "XQTM1808270068", "item_req_title": "\u57fa\u51c6\u7cfb\u7edf\u65b0\u589e\u4e00\u4e2a\u680f\u76ee\u201c\u56fd\u9645\u8d27\u5e01\u7ecf\u7eaa\u5916\u6c47\u671f\u6743\u5b9e\u65f6\u62a5\u4ef7\u201d", "flag": 1}, {"item_req_list_id": "XQTM1808270069", "item_req_title": "\u57fa\u51c6\u901a\u8fc7DEP\u8ba2\u9605\u8d27\u5e01\u7ecf\u7eaa\u5916\u6c47\u671f\u6743\u5b9e\u65f6\u62a5\u4ef7", "flag": 1}, {"item_req_list_id": "XQTM1808270072", "item_req_title": "\u5916\u6c47\u671f\u6743\u6210\u4ea4\u660e\u7ec6\u4e2d\u589e\u52a0\u4fee\u6b63\u6ce2\u52a8\u7387\u7b49\u5b57\u6bb5", "flag": 1}, {"item_req_list_id": "XQTM1808270073", "item_req_title": "\u65b0\u589e\u6210\u4ea4\u4ef7\u548c\u8d27\u5e01\u7ecf\u7eaa\u62a5\u4ef7\u6837\u672c", "flag": 1}, {"item_req_list_id": "XQTM1808270074", "item_req_title": "\u5c55\u793a\u9875\u9762\u65b0\u589e\u6570\u636e\u6e90\u5b57\u6bb5", "flag": 1}, {"item_req_list_id": "XQTM1808270075", "item_req_title": "\u5c55\u793a\u9875\u9762\u5c06\u201c\u6ce2\u52a8\u7387\uff08Mid\uff09%\u201d\u6539\u4e3a\u201c\u6ce2\u52a8\u7387%\u201d", "flag": 1}, {"item_req_list_id": "XQTM1808270076", "item_req_title": "\u6ce2\u52a8\u7387\u6a21\u578b\u53c2\u6570\u67e5\u8be2\u5c06MID\u8c03\u6574\u4e3a\u6ce2\u52a8\u7387\u53c2\u6570", "flag": 1}, {"item_req_list_id": "XQTM1808270077", "item_req_title": "\u6807\u51c6\u671f\u9650\u6ce2\u52a8\u7387\u6570\u636e\u4e2d\u5c06\u201c\u6ce2\u52a8\u7387\uff08Mid\uff09\u201d\u6539\u4e3a\u201c\u6ce2\u52a8\u7387\u201d", "flag": 1}, {"item_req_list_id": "XQTM1808270078", "item_req_title": "\u8c03\u6574\u5916\u6c47\u671f\u6743\u9690\u542b\u6ce2\u52a8\u7387\u66f2\u7ebf\u5e94\u6025\u6a21\u677f", "flag": 1}, {"item_req_list_id": "XQTM1808270079", "item_req_title": "\u5916\u6c47\u671f\u6743\u9690\u542b\u6ce2\u52a8\u7387\u66f2\u7ebf\u65b0\u589e\u90e8\u5206\u53c2\u6570", "flag": 1}, {"item_req_list_id": "XQTM1808270080", "item_req_title": "\u5916\u6c47\u6389\u671f\u66f2\u7ebf\u5e94\u6025\u8ba1\u7b97\u65f6\u523b\u7531\u4e0b\u62c9\u6846\u6539\u4e3a\u7a7a\u767d\uff0c\u53ef\u4ee5\u8f93\u5165\u66f2\u7ebf\u4efb\u610f\u65f6\u523b\u3002", "flag": 1}, {"item_req_list_id": "XQTM1808270081", "item_req_title": "\u5916\u5e01\u9690\u542b\u5229\u7387\u66f2\u7ebf\u680f\u76eeON\u6807\u8bc6\u7edf\u4e00\u8c03\u6574\u4e3a1D\uff0c\u5bf9\u5916\u53d1\u6d88\u606f\u4e5f\u7531ON\u8c03\u6574\u4e3a1D", "flag": 1}, {"item_req_list_id": "XQTM1808270084", "item_req_title": "\u4eceDEP\u8ba2\u9605\u5916\u6c47\u6389\u671f\u3001\u8d27\u5e01\u6389\u671f\u3001\u5916\u6c47\u671f\u6743\u51b2\u9500\u4fe1\u606f", "flag": 1}, {"item_req_list_id": "XQTM1808270085", "item_req_title": "\u76f8\u5173\u5408\u7ea6\u5b58\u91cf\u4f30\u503c\u8ba1\u7b97\u65f6\u4e0d\u8ba1\u7b97\u5df2\u7ecf\u51b2\u9500\u6389\u7684\u5408\u7ea6", "flag": 1}, {"item_req_list_id": "XQTM1810180011", "item_req_title": "\u65b0\u589e\u5916\u6c47\u671f\u6743\u4f30\u503c\u5f15\u64ce", "flag": 1}, {"item_req_list_id": "XQTM1810180012", "item_req_title": "\u65b0\u589e\u201c\u5916\u6c47\u671f\u6743\u4f30\u503c\u5f15\u64ce\u201d\u4e8c\u7ea7\u5b50\u83dc\u5355\uff0c\u5176\u4e2d\u5305\u62ec\u201c\u5916\u6c47\u671f\u6743\u5408\u7ea6\u5bfc\u5165\u548c\u8ba1\u7b97\u201d", "flag": 1}, {"item_req_list_id": "XQTM1810180013", "item_req_title": "\u754c\u9762\u65b0\u589e\u201c\u6307\u5b9aMDE\u65e5\u671f\u201d\u7684\u65e5\u671f\u63a7\u4ef6\u3001\u201c\u8d34\u73b0\u66f2\u7ebf\u201d\u6309\u94ae\u3001\u201c\u6ce2\u52a8\u7387\u63d2\u503c\u201d\u6309\u94ae\u3001\u201c\u5373\u671f\u6c47\u7387\u201d\u6309\u94ae\uff08\u7f6e\u7070\uff09\u3001\u201c\u51b2\u9500\u4f30\u503c\u5bfc\u5165\u201d\u6309\u94ae\u3001\u201c\u4e0b\u8f7d\u201d\u6309\u94ae\u3001\u201c\u8ba1\u7b97\u201d\u6309\u94ae\u53ca\u4e0b\u65b9\u6570\u636e\u8868", "flag": 1}, {"item_req_list_id": "XQTM1810180014", "item_req_title": "\u65b0\u589e\u201c\u5916\u6c47\u671f\u6743\u5b58\u91cf\u5408\u7ea6\u4f30\u503c\u67e5\u8be2\u201d\u4e09\u7ea7\u5b50\u83dc\u5355\uff0c\n\u5e76\u5728\u6b64\u4e09\u7ea7\u5b50\u83dc\u5355\u4e0b\u589e\u52a0\u201c\u5168\u5e02\u573a\u5916\u6c47\u671f\u6743\u5b58\u91cf\u5408\u7ea6\u4f30\u503c\u201d\u548c\u201c\u5355\u673a\u6784\u5916\u6c47\u671f\u6743\u5b58\u91cf\u5408\u7ea6\u4f30\u503c\u201d\u4e24\u4e2a\u56db\u7ea7\u5b50\u83dc\u5355\uff0c\u6839\u636e\u5168\u5e02\u573a\u4f30\u503c\u7ed3\u679c\u5c55\u793a\uff0c\u5e76\u65b0\u589e\u76f8\u5e94\u7684\u7cfb\u7edf\u529f\u80fd\u548c\u903b\u8f91\u3002", "flag": 1}, {"item_req_list_id": "XQTM1810180016", "item_req_title": "\u5b8c\u5584\u5916\u6c47\u671f\u6743Delta\u53c2\u6570\u8ba1\u7b97\u529f\u80fd\uff0c\u57fa\u51c6\u7cfb\u7edf\u4e0d\u518d\u8ba1\u7b97delta\u53c2\u6570\uff0c\u4ece\u5b9a\u4ef7\u5de5\u5177\u83b7\u53d6\uff0c\u65b0\u589edelta\u503c\u548c\u8d27\u5e01\u5bf9\uff0c\u5e76\u4fee\u6539\u5c55\u793a\u754c\u9762", "flag": 1}, {"item_req_list_id": "XQTM1810180017", "item_req_title": "\u5b8c\u5584\u5916\u6c47\u671f\u6743Delta\u8ba1\u91cf\u53c2\u6570\u65e5\u62a5\uff0c\u4fee\u6539\u8bf4\u660e\u6587\u6863\uff0c\u4fee\u6539\u76f8\u5e94\u7684\u6570\u636e\u5c55\u793a", "flag": 1}, {"item_req_list_id": "XQTM1810180025", "item_req_title": "\u65b0\u589eDEP\u670d\u52a1\uff0c\u5b58\u91cf\u5916\u6c47\u671f\u6743\u5408\u7ea6\u53d1\u9001\uff0c\u5b58\u91cf\u5916\u6c47\u671f\u6743\u5408\u7ea6\u4f30\u503c\u7ed3\u679c\uff0cdelta\u53c2\u6570\u670d\u52a1\uff0c\u5f85\u4f30\u503c\u5408\u7ea6\u670d\u52a1", "flag": 1}, {"item_req_list_id": "XQTM1810180027", "item_req_title": "\u8ba2\u9605DEP\u5916\u6c47\u671f\u6743\u6210\u4ea4\u660e\u7ec6\u670d\u52a1", "flag": 1}, {"item_req_list_id": "XQTM1905160041", "item_req_title": "\u5728\u73b0\u6709\u5206\u673a\u6784\u5916\u6c47\u6389\u671f\u5b58\u91cf\u5408\u7ea6\u4f30\u503c\u4e2d\u65b0\u589e\u201c\u6e05\u7b97\u65b9\u5f0f\u201d\u5b57\u6bb5\u7684\u8f93\u51fa", "flag": 1}, {"item_req_list_id": "XQTM1905160049", "item_req_title": "\u57fa\u51c6\u63d0\u4f9b\u5916\u6c47\u8282\u5047\u65e5\u7ed9\u671f\u6743\u5b9a\u4ef7\u5de5\u5177", "flag": 1}]
        // getRequirementEntryInfoReq().then(response => {
        //   this.dialogObj2.list = response.data
        // })
      }  else if (type === 'tree') {
        this.dialogObj3.visible = true
        this.$nextTick(() => {
          // 基于准备好的dom，初始化echarts实例
          const myChart = echarts.init(document.getElementById('myChart'))
          let data = {
            "name": "flare",
            "children": [
                {
                    "name": "data",
                    "children": [
                        {
                            "name": "converters",
                            "children": [
                              {"name": "Converters", "value": 721},
                              {"name": "DelimitedTextConverter", "value": 4294}
                            ]
                        },
                        {
                            "name": "DataUtil",
                            "value": 3322
                        }
                    ]
                },
                {
                    "name": "display",
                    "children": [
                        {"name": "DirtySprite", "value": 8833},
                        {"name": "LineSprite", "value": 1732},
                        {"name": "RectSprite", "value": 3623}
                  ]
                },
                {
                    "name": "flex",
                    "children": [
                        {"name": "FlareVis", "value": 4116}
                    ]
                }
            ]
          }
          myChart.setOption({
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            legend: {
              top: '2%',
              left: '3%',
              orient: 'vertical',
              borderColor: '#c23531'
            },
            series:[
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
            title: { text: '测试轮次红榜' },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            toolbox: {
              show: true,
              feature: {
                dataView: {
                  readOnly: false
                },
                magicType: {
                  type: ['line', 'bar', 'stack', 'tiled']
                },
                restore: {},
                saveAsImage: {}
              }
            },
            legend: {
              data: ['系统测试']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                formatter: function (value, index) {
                  let texts = []
                  switch(value) {
                    case 0:
                      texts.push('测试准备')
                      break
                    case 1:
                      texts.push('UAT1测试')
                      break
                    case 2:
                      texts.push('UAT1完成')
                      break
                    case 3:
                      texts.push('验收流程')
                      break
                    case 4:
                      texts.push('验收测试')
                      break
                    case 5:
                      texts.push('验收完成')
                      break
                    case 6:
                      texts.push('模拟流程')
                      break
                    case 7:
                      texts.push('模拟测试')
                      break
                    case 8:
                      texts.push('模拟完成')
                      break
                    case 9:
                      texts.push('已上线')
                      break
                    default:
                      texts.push('')
                  } 
                    return texts
                }
              }
            },
            yAxis: {
              show: false,
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
              {
                name: '系统测试',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [9, 9, 9, 8, 7, 6, 9]
              }
            ]
          })
        })
      }
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

<style lang="scss" scoped>
.add {
  position: absolute;
  right: 20px;
  z-index: 1;
}
.scrollDialog {
  height: 50%;
}
</style>
