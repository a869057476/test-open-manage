<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="系统权限" name="component-one">
        <el-form ref="component-one" :model="formSystemPermission" label-width="100px" :style="{ height: autoHeight + 'px', overflow: 'auto' }">
          <el-form-item label="系统名称">
            <el-select v-model="formSystemPermission.region" placeholder="请选择" clearable @change="onChangeSys">
              <el-option v-for="item in formSystemPermission.regionList" :key="item.SYSID" :label="item.SYSNAME" :value="item.SYSID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级">
            <el-select v-model="formSystemPermission.level" placeholder="请选择" clearable @change="onChangeLevel">
              <el-option v-for="item in formSystemPermission.levelList" :key="item.LVID" :label="item.LVNAME" :value="item.LVID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员">
            <el-transfer v-model="formSystemPermission.personnelSelectedList" :titles="['未选择的人员', '已选择的人员']" :props="{ key: 'USERID', label: 'USERNAMEZH' }" :data="formSystemPermission.personnelAllList" filterable></el-transfer>
          </el-form-item>
          <el-form-item>
            <!-- <el-button size="small" @click="onSearch">取消</el-button> -->
            <el-button type="primary" size="small" @click="onSubmitSys">确定</el-button>
            <!-- <el-button type="warning" size="small" @click="onSearch">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="页面权限" name="component-two">
        <el-form ref="component-one" :model="formPagePermission" label-width="100px" :style="{ height: autoHeight + 'px', overflow: 'auto' }">
          <el-form-item label="人员">
            <el-transfer v-model="formPagePermission.personnelSelectedList" :titles="['未选择的人员', '已选择的人员']" :props="{ key: 'value', label: 'desc' }" :data="formPagePermission.personnelAllList" filterable></el-transfer>
          </el-form-item>
          <el-row>
            <el-col :span="6">
              <el-form-item label="添加一级目录">
                <el-input v-model="formPagePermission.menu" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label-width="10px">
                <el-button type="primary" @click="onSubmitSys">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-form-item label="页面">
            <el-tree :data="dataTree" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]">
            </el-tree>
          </el-form-item>
          <el-form-item>
            <!-- <el-button size="small" @click="onSearch">取消</el-button> -->
            <el-button type="primary" size="small" @click="onSubmitSys">确定</el-button>
            <!-- <el-button type="warning" size="small" @click="onSearch">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getStaffSysLvs, setStaffSysLvs } from '@/api/permission_manage'

export default {
  data() {
    return {
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
        regionList: [],
        personnelSelectedList: [],
        personnelAllList: [],
        level: '',
        levelList: []
      },
      formPagePermission: {
        personnelSelectedList: [],
        personnelAllList: [],
        menu: '',
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
      this.autoHeight = this.$root.$el.clientHeight - 200

      window.onresize = () => {
        this.autoHeight = this.$root.$el.clientHeight - 200
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
    /**
     * 切换系统
     * @method onChangeSys
     * @param {String} value 目前的选中值
     * @return 无
     */
    onChangeSys(value) {
      getStaffSysLvs(null, value, null).then(response => {
        if (response.data.length > 0) {
          this.formSystemPermission.level = response.data[0].LVID
          this.formSystemPermission.levelList = response.data
          this.onChangeLevel(this.formSystemPermission.level)
        }
      })
    },
    /**
     * 切换等级
     * @method onChangeLevel
     * @param {String} value 目前的选中值
     * @return 无
     */
    onChangeLevel(value) {
      getStaffSysLvs(null, this.formSystemPermission.region, value).then(response => {
        if (response.data) {
          this.formSystemPermission.personnelSelectedList = response.data.hasLv.map(e => {
            return e.USERID
          })
          this.formSystemPermission.personnelAllList = response.data.noLv
          console.log(this.formSystemPermission.personnelSelectedList)
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
    // 提交系统权限
    onSubmitSys() {
      const params = {
        lvId: this.formSystemPermission.level,
        staffList: this.formSystemPermission.personnelSelectedList,
        sysId: this.formSystemPermission.region
      }
      setStaffSysLvs(params).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        }
      })
    },
    fetchData() {
      getStaffSysLvs(null, null, null).then(response => {
        console.log(response)
        if (response.data.length > 0) {
          this.formSystemPermission.region = response.data[0].SYSID
          this.formSystemPermission.regionList = response.data
          this.onChangeSys(this.formSystemPermission.region)
        }
      })
    }
  }
}
</script>
