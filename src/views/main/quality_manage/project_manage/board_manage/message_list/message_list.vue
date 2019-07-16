<template>
  <div class="app-container">
    <div class="mb20">
      <el-button type="primary" size="small" @click="onSearch">查询</el-button>
      <el-button class="add" type="info" size="small" @click="onShowDetail('add')">新增</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight">
      <el-table-column label="编号" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="消息标题" min-width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="生效时间" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="过期时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.messageStatus === '刪除'" type="danger" size="small">刪除</el-tag>
          <el-tag v-if="scope.row.messageStatus === '等待中'" type="info" size="small">等待中</el-tag>
          <el-tag v-if="scope.row.messageStatus === '永久有效'" type="success" size="small">永久有效</el-tag>
          <el-tag v-if="scope.row.messageStatus === '已过期'" type="warning" size="small">已过期</el-tag>
          <span v-if="scope.row.messageStatus === ''"></span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="onShowDetail('edit', scope.row)">修改</el-button>
          <el-button size="mini" type="primary" plain @click="onShowDetail('delete', scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogObj.title" :visible.sync="dialogObj.visible" top="5vh" width="800px">
      <el-form :model="dialogObj.form" label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="消息类型">
              <el-input v-model="dialogObj.form.type" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息编写人">
              <el-input v-model="dialogObj.form.user" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生效时间">
              <el-date-picker v-model="dialogObj.form.effectDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="过期时间">
              <el-date-picker v-model="dialogObj.form.expireDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="消息标题">
          <el-input v-model="dialogObj.form.title" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input v-model="dialogObj.form.content" type="textarea"></el-input>
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
  data() {
    return {
      autoHeight: 200,
      list: [],
      listLoading: true,
      dialogObj: {
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
      this.autoHeight = this.$el.parentNode.clientHeight - 100

      window.onresize = () => {
        this.autoHeight = this.$el.parentNode.clientHeight - 100
      }
    })
  },
  methods: {
    /**
     * 看板信息展示框
     * @method onShowDetail
     * @param {String} type add:新增;edit:修改;delete:删除
     * @param {Object} row 当前行数据
     * @return 无
     */
    onShowDetail(type, row) {
      console.log(row)
      if (type === 'delete') {
        console.log('delete')
      } else {
        this.dialogObj.title = `${type === 'add' ? '新增' : '修改'}看板信息`
        this.dialogObj.visible = true
      }
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
