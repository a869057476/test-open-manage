<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row :gutter="20" class="dashboard-row">
      <el-col :span="10" class="dashboard-row-col">
        <div class="dashboard-row-col-item">
          <div class="dashboard-row-col-item-title">消息看板</div>
          <div class="dashboard-row-col-item-main msg-contain">
            <div v-for="item in messageList" :key="item.id" class="msg-contain-item"><span class="msg-contain-item-type">{{ item.type }}</span>{{ item.msg }}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="14" class="dashboard-row-col">
        <div class="dashboard-row-col-item">
          <div class="dashboard-row-col-item-title">工作日历</div>
          <div class="dashboard-row-col-item-main calendar-contain">
            <el-row>
              <el-col :span="14" style="padding: 0 10px;">
                <date-pick v-model="date" :has-input-element="false"></date-pick>
              </el-col>
              <el-col :span="10">
                <div class="progress-row">
                  <div class="progress-row-col">
                    <el-progress type="circle" :percentage="0" :width="100"></el-progress>
                    <div>xx计划</div>
                  </div>
                  <div class="progress-row-col">
                    <el-progress type="circle" :percentage="25" :width="100"></el-progress>
                    <div>xx计划</div>
                  </div>
                </div>
                <div class="progress-row">
                  <div class="progress-row-col">
                    <el-progress type="circle" :percentage="50" :width="100"></el-progress>
                    <div>xx计划</div>
                  </div>
                  <div class="progress-row-col">
                    <el-progress type="circle" :percentage="100" :width="100"></el-progress>
                    <div>xx计划</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="dashboard-row mt20">
      <el-col :span="14" class="dashboard-row-col">
        <div class="dashboard-row-col-item">
          <div class="dashboard-row-col-item-title">个人任务</div>
          <div class="dashboard-row-col-item-main calendar-contain">
            <el-form :inline="true" :model="formSearch">
              <el-form-item label="任务状态" label-width="80px">
                <el-select v-model="formSearch.region" placeholder="请选择" clearable style="width: 110px;">
                  <el-option label="close-submit" value="0"></el-option>
                  <el-option label="release-open" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务分类">
                <el-select v-model="formSearch.region" placeholder="请选择" clearable style="width: 110px;">
                  <el-option label="close-submit" value="0"></el-option>
                  <el-option label="release-open" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Release时间">
                <el-date-picker v-model="formSearch.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 280px;">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="onSearch">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table ref="personalTask" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit stripe highlight-current-row :max-height="autoHeight">
              <el-table-column label="任务时间" min-width="120" align="center">
                <template slot-scope="scope">
                  {{ scope.$index }}
                </template>
              </el-table-column>
              <el-table-column label="项目名称" min-width="120" align="center">
                <template slot-scope="scope">
                  {{ scope.row.title }}
                </template>
              </el-table-column>
              <el-table-column label="任务分类" min-width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.author }}</span>
                </template>
              </el-table-column>
              <el-table-column label="工作内容" min-width="180" align="center">
                <template slot-scope="scope">
                  {{ scope.row.pageviews }}
                </template>
              </el-table-column>
              <el-table-column label="工作状态" min-width="120" align="center">
                <template slot-scope="scope">
                  {{ scope.row.pageviews }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="10" class="dashboard-row-col">
        <div class="dashboard-row-col-item">
          <div class="dashboard-row-col-item-title">必知必会</div>
          <div class="dashboard-row-col-item-main know-contain">
            <p>需求疑问要早提，业务答疑留痕迹。</p>
            <p>缺陷回归定范围，影响评估是依据。</p>
            <p>交叉互补是良习，既提质量又消疲。</p>
            <p>接口数据须留底，有头有绪有意义。</p>
            <p>如有问题录 CQ ，不让缺陷悄溜走。</p>
            <p>严重程度定等级，缺陷指南讲道理。</p>
            <p>若有争议怎么办？邀请各方来评议。</p>
            <p>模拟测试遇问题，等同生产来处理。</p>
            <p>报告信息要正确，缺陷风险不遗弃。</p>
            <p>独立自主有原则，提高效率靠科技。</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTestList } from '@/api/local'
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'

export default {
  name: 'Dashboard',
  components: { DatePick },
  data() {
    return {
      autoHeight: 200,
      formSearch: {
        date: '',
        region: ''
      },
      list: [],
      listLoading: true,
      date: '2019-02-12',
      messageList: [
        {
          id: 0,
          type: '公告',
          msg: '35号楼模拟环境使用规范'
        },
        {
          id: 1,
          type: '公告',
          msg: '35号楼模拟环境使用规范'
        },
        {
          id: 2,
          type: '通知',
          msg: '35号楼模拟环境使用规范'
        },
        {
          id: 3,
          type: '公告',
          msg: '35号楼模拟环境使用规范'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    date: val => {
      console.log(val)
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$el)
      this.autoHeight = this.$refs.personalTask.$el.parentNode.clientHeight - this.$refs.personalTask.$el.parentNode.childNodes[0].clientHeight - 10

      window.onresize = () => {
        this.autoHeight = this.$refs.personalTask.$el.parentNode.clientHeight - this.$refs.personalTask.$el.parentNode.childNodes[0].clientHeight - 10
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

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 20px 0 40px 20px;
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-row {
    width: 100%;
    height: 50%;
    &-col {
      height: 100%;
      &-item {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        box-shadow: 0px 0px 8px 4px #e5ecff;
        &-title {
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
          font-size: 16px;
          color: #5b94ff;
        }
        &-main {
          height: calc(100% - 50px);
          overflow: auto;
        }
        & .msg-contain {
          &-item {
            margin: 0 0 10px 20px;
            &-type {
              width: auto;
              height: 24px;
              line-height: 24px;
              text-align: center;
              color: #5b94ff;
              border: 1px solid #5b94ff;
              border-radius: 5px;
              display: inline-block;
              padding: 0 5px;
              margin-right: 10px;
            }
          }
        }
        & .know-contain {
          text-align: center;
          font-size: 14px;
          &>p {
            text-align: center;
          }
        }
      }
    }
  }
}
.progress-row {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  &-col {
    text-align: center;
    margin-right: 25px;
  }
}
</style>
