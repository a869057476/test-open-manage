<template>
  <div class="app-container">
    <el-button class="mb20" type="primary" size="small" @click="onShowGenerate">生成周报</el-button>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column label="开始时间" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="截至时间" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="生成时间" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作用户" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="onShowDetail(scope.row)">查看</el-button>
          <el-button size="mini" type="primary" plain @click="onShowImport(scope.row)">导入</el-button>
          <el-button size="mini" type="primary" plain @click="onShowDetail(scope.row)">下载</el-button>
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
    <el-dialog :title="dialogObj.title" width="1200px" :visible.sync="dialogObj.visible">
      <el-form ref="component-one" :inline="true" :model="formSearch">
        <el-form-item label="实际上线时间晚于">
          <el-date-picker v-model="formSearch.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="dialogObj.list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight2">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="系统名称" min-width="200" align="center">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="版本号" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="项目状态" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计划开始时间" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="实际开始时间" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="计划上线时间" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="实际上线时间" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogObj.visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="table" width="1200px" :visible.sync="isShowDialog">
      查看
    </el-dialog>
    <el-dialog :title="dialogObj2.title" width="800px" :visible.sync="dialogObj2.visible">
      <el-form>
        <el-form-item label="时间">
          <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-upload ref="upload" class="upload-demo" action="http://127.0.0.1:8888/QA/QA_upload_weekreport/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" accept=".xls,.xlsx">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getTestList } from '@/api/local'

export default {
  data() {
    return {
      isShowDialog: false,
      autoHeight: 200,
      autoHeight2: 200,
      currentPage: 1,
      formSearch: {
        date: '',
        user: '',
        region: ''
      },
      list: [],
      listLoading: true,
      dialogObj: {
        title: '生成已选项目的周报信息',
        visible: false,
        height: 200,
        list: []
      },
      dialogObj2: {
        title: '上传周报信息',
        visible: false,
        height: 200,
        form: {}
      },
      fileList: []
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
      this.autoHeight2 = this.$root.$el.clientHeight * 0.5 - 100
    })
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    onShowDetail(row) {
      console.log(row)
      this.isShowDialog = true
    },
    onShowImport(row) {
      this.dialogObj2.visible = true
    },
    onShowGenerate() {
      this.dialogObj.visible = true
      this.dialogObj.list = this.list.slice()
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
