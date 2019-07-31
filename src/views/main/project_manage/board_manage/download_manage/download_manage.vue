<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :max-height="autoHeight">
      <el-table-column label="文件名" min-width="500" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template>
          <a href="http://192.168.8.14:8000/get_all_download/?path=./BPM_information/doc/质量开放管理平台使用手册.docx&amp;name=质量开放管理平台使用手册.docx">下载</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTestList } from '@/api/local'

export default {
  data() {
    return {
      autoHeight: 200,
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$el.parentNode.clientHeight - 40

      window.onresize = () => {
        this.autoHeight = this.$el.parentNode.clientHeight - 40
      }
    })
  },
  methods: {
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
