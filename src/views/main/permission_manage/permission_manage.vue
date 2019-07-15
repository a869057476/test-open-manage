<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="系统权限" name="component-one">
        <el-form ref="component-one" :model="formSystemPermission" label-width="100px">
          <el-form-item label="系统名称">
            <el-select v-model="formSystemPermission.region" placeholder="请选择" clearable>
              <el-option label="债券基础信息系统" value="0"></el-option>
              <el-option label="交易后处理系统" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员">
            <el-transfer v-model="formSystemPermission.personnel" :titles="['未选择的人员', '已选择的人员']" :props="{ key: 'value', label: 'desc' }" :data="data3" filterable></el-transfer>
          </el-form-item>
          <el-form-item label="等级">
            <el-select v-model="formSystemPermission.level" placeholder="请选择" clearable>
              <el-option label="一级" value="0"></el-option>
              <el-option label="二级" value="1"></el-option>
              <el-option label="三级" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <el-button size="small" @click="onSearch">取消</el-button> -->
            <el-button type="primary" size="small" @click="onSearch">确定</el-button>
            <el-button type="warning" size="small" @click="onSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="页面权限" name="component-two">
        <el-form ref="component-one" :model="formPagePermission" label-width="100px">
          <el-form-item label="人员">
            <el-transfer v-model="formPagePermission.personnel" :titles="['未选择的人员', '已选择的人员']" :props="{ key: 'value', label: 'desc' }" :data="data3" filterable></el-transfer>
          </el-form-item>
          <el-form-item label="页面">
            <el-tree :data="dataTree" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]">
            </el-tree>
          </el-form-item>
          <el-form-item>
            <!-- <el-button size="small" @click="onSearch">取消</el-button> -->
            <el-button type="primary" size="small" @click="onSearch">确定</el-button>
            <el-button type="warning" size="small" @click="onSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getTestList } from '@/api/local'

export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 30; i++) {
        data.push({
          value: i,
          desc: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data3: generateData(),
      dataTree: [
        {
          id: 1,
          label: '一级 2',
          children: [
            {
              id: 3,
              label: '二级 2-1',
              children: [
                {
                  id: 4,
                  label: '三级 3-1-1'
                },
                {
                  id: 5,
                  label: '三级 3-1-2',
                  disabled: true
                }
              ]
            },
            {
              id: 2,
              label: '二级 2-2',
              disabled: true,
              children: [
                {
                  id: 6,
                  label: '三级 3-2-1'
                },
                {
                  id: 7,
                  label: '三级 3-2-2',
                  disabled: true
                }
              ]
            }
          ]
        }
      ],
      activeName: 'component-one',
      autoHeight: 200,
      formSystemPermission: {
        region: '',
        personnel: [],
        level: ''
      },
      formPagePermission: {
        personnel: [],
        tree: ''
      },
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100

      window.onresize = () => {
        this.autoHeight = this.$el.parentNode.clientHeight - this.$el.childNodes[0].clientHeight - 100
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
