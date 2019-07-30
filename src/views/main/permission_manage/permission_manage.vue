<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="系统权限" name="component-one">
        <el-form ref="component-one" :model="formSystemPermission" label-width="100px" :style="{ height: autoHeight + 'px', overflow: 'auto' }">
          <el-form-item label="系统名称">
            <el-select v-model="formSystemPermission.region" placeholder="请选择" filterable @change="onChangeSys">
              <el-option v-for="item in formSystemPermission.regionList" :key="item.SYSID" :label="item.SYSNAME" :value="item.SYSID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级">
            <el-select v-model="formSystemPermission.level" placeholder="请选择" @change="onChangeLevel">
              <el-option v-for="item in formSystemPermission.levelList" :key="item.LVID" :label="item.LVNAME" :value="item.LVID"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="快速复制权限">
            <el-select v-model="formSystemPermission.copyPerson" filterable :filter-method="copyFilter" placeholder="请选择" clearable>
              <el-option v-for="item in formSystemPermission.copyPersonList" :key="item.USERID" :label="item.USERNAMEZH" :value="item.USERID"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="选择人员">
            <el-transfer v-model="formSystemPermission.personnelSelectedList" :titles="['未选择的人员', '已选择的人员']" :props="{ key: 'USERID', label: 'USERNAMEZH' }" :data="formSystemPermission.personnelAllList" filterable :filter-method="chosedFilter"></el-transfer>
          </el-form-item>
          <el-form-item>
            <!-- <el-button size="small" @click="onSearch">取消</el-button> -->
            <el-button type="primary" size="small" @click="onSubmitSys">确定</el-button>
            <!-- <el-button type="warning" size="small" @click="onSearch">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="userInfo.staffId === '1'" label="页面权限" name="component-two">
        <el-form ref="component-two" :model="formPagePermission" label-width="100px" :style="{ height: autoHeight + 'px', overflow: 'auto' }">
          <el-row>
            <el-col :span="6">
              <el-form-item label="一级名称">
                <el-input v-model="formPagePermission.menu" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label-width="30px">
                <el-button type="primary" @click="onAddLevelOne('1')">添加目录</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label-width="10px">
                <el-button type="primary" @click="onAddLevelOne('2')">添加页面</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="页面">
            <el-tree ref="tree" :data="menuTree" node-key="id" :expand-on-click-node="false" :default-checked-keys="[]" :render-content="renderContent" :props="{ label: 'name', children: 'childrenList' }" default-expand-all show-checkbox>
            </el-tree>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="userInfo.staffId === '1'" label="人员权限" name="component-three">
        <el-form ref="component-three" :model="formStaffPermission" label-width="100px" :style="{ height: autoHeight + 'px', overflow: 'auto' }">
          <!-- <el-form-item label="人员">
            <el-transfer v-model="formStaffPermission.personnelSelectedList" :titles="['未选择的人员', '已选择的人员']" :props="{ key: 'USERID', label: 'USERNAMEZH' }" :data="formStaffPermission.personnelAllList" filterable :filter-method="chosedFilter"></el-transfer>
          </el-form-item> -->
          <el-form-item label="人员">
            <el-select v-model="formStaffPermission.personnelSelectedList" filterable :filter-method="personFilter" placeholder="请选择" @change="onChangePerson">
              <el-option v-for="(item, index) in formStaffPermission.personnelAllList" :key="item.USERID + index" :label="item.USERNAMEZH" :value="item.USERID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="页面">
            <el-tree ref="setTree" :data="setTree" node-key="id" :expand-on-click-node="false" :default-checked-keys="formStaffPermission.checkedList" :props="{ label: 'name', children: 'childrenList' }" default-expand-all show-checkbox>
            </el-tree>
          </el-form-item>
          <el-form-item>
            <!-- <el-button size="small" @click="onSearch">取消</el-button> -->
            <el-button type="primary" size="small" @click="onSubmitPerson">确定</el-button>
            <!-- <el-button type="warning" size="small" @click="onSearch">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="nodeDialogObj.title" :visible.sync="nodeDialogObj.visible" width="800px">
      <el-form :inline="true" :model="nodeDialogObj.form" label-width="100px">
        <template v-if="nodeDialogObj.title !== '权限'">
          <el-form-item label="名称">
            <el-input v-model="nodeDialogObj.form.name" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </template>
        <template v-if="nodeDialogObj.title === '权限'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="读">
                <el-radio-group v-model="nodeDialogObj.form.read">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                  <el-radio label="null">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="写">
                <el-radio-group v-model="nodeDialogObj.form.write">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                  <el-radio label="null">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="nodeDialogObj.title === '添加'">
          <el-button @click="nodeDialogObj.visible = false">取消</el-button>
          <el-button v-if="nodeDialogObj.flag === '1'" type="primary" @click="addNode('1')">添加目录</el-button>
          <el-button v-if="nodeDialogObj.flag === '1'" type="primary" @click="addNode('2')">添加页面</el-button>
          <el-button v-if="nodeDialogObj.flag !== '3'" type="primary" @click="addNode('3')">添加元素</el-button>
        </template>
        <template v-if="nodeDialogObj.title === '修改'">
          <el-button @click="nodeDialogObj.visible = false">取消</el-button>
          <el-button type="primary" @click="updateNode()">确认</el-button>
        </template>
        <template v-if="nodeDialogObj.title === '权限'">
          <el-button @click="nodeDialogObj.visible = false">取消</el-button>
          <el-button type="primary" @click="setPermissionNode()">确认</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getStaffSysLvs, setStaffSysLvs, addMenu, getMenuModules } from '@/api/permission_manage'
import permissionApi from '@/api/permission_manage'
import { getUserInfo } from '@/utils/auth'

export default {
  data() {
    return {
      userInfo: {},
      menuTree: [],
      setTree: [],
      activeName: 'component-one',
      autoHeight: 200,
      formSystemPermission: {
        region: '',
        regionList: [],
        personList: [],
        copyPerson: '',
        copyPersonList: [],
        personnelSelectedList: [],
        personnelAllList: [],
        level: '',
        levelList: []
      },
      formPagePermission: {
        menu: ''
      },
      formStaffPermission: {
        personList: [],
        personnelSelectedList: [],
        personnelAllList: [],
        checkedList: [],
        tree: ''
      },
      nodeDialogObj: {
        title: '',
        visible: false,
        flag: '1',
        form: {
          name: '',
          read: null,
          write: null
        },
        node: {},
        data: {}
      },
      list: [],
      listLoading: true,
      chosedFilter(query, item) {
        return item.USEREN.indexOf(query) >= 0 || item.USERNAMEZH.indexOf(query) >= 0
      }
    }
  },
  created() {
    new Promise((resolve, reject) => {
      this.userInfo = JSON.parse(getUserInfo())
      // console.log(this.userInfo)
      resolve(this.userInfo)
    }).then(value => {
      this.fetchData()
    }).catch(error => {
      this.$notify({
        title: '错误',
        message: error,
        type: 'error'
      })
    })
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
    // 树节点的内容区的渲染 Function
    renderContent(h, { node, data, store }) {
      return (
        <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
          <span>
            <i style={ data.flag === '1' ? 'display: inline; ' : 'display: none;'} type='text' class='el-icon-menu'></i>
            <i style={ data.flag === '2' ? 'display: inline; ' : 'display: none;'} type='text' class='el-icon-document'></i>
            <i style={ data.flag === '3' ? 'display: inline; ' : 'display: none;'} type='text' class='el-icon-goods'></i>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style='font-size: 12px;' type='text' icon='el-icon-sort-up' on-click={ () => this.sortUp(node, data) }></el-button>
            <el-button style='font-size: 12px;' type='text' icon='el-icon-sort-down' on-click={ () => this.sortDown(node, data) }></el-button>
            <el-button style='font-size: 12px;' type='text' on-click={ () => this.showUpdate(node, data) }>修改</el-button>
            { data.flag !== '3' ? <el-button style='font-size: 12px;' type='text' on-click={ () => this.showAdd(node, data) }>添加</el-button> : <el-button type='text' style='font-size: 12px;visibility: hidden;'>添加</el-button> }
            { node.isLeaf ? <el-button style='font-size: 12px;' type='text' on-click={ () => this.remove(node, data) }>删除</el-button> : <el-button type='text' style='font-size: 12px;visibility: hidden;'>删除</el-button> }
          </span>
        </span>)
      // return (
      // <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
      //   <span>
      //     <i style={ data.flag === '1' ? 'display: inline; ' : 'display: none;'} type='text' class='el-icon-menu'></i>
      //     <i style={ data.flag === '2' ? 'display: inline; ' : 'display: none;'} type='text' class='el-icon-document'></i>
      //     <i style={ data.flag === '3' ? 'display: inline; ' : 'display: none;'} type='text' class='el-icon-goods'></i>
      //     <span>{node.label}</span>
      //     <el-tag class='ml10' size='mini' style={ data.read !== null ? 'display: inline-block; ' : 'display: none;'}><i class={ data.read === '1' ? 'el-icon-success' : 'el-icon-error'}></i> 读</el-tag>
      //     <el-tag class='ml10' size='mini' style={ data.write !== null ? 'display: inline-block; ' : 'display: none;'}><i class={ data.write === '1' ? 'el-icon-success' : 'el-icon-error'}></i> 写</el-tag>
      //   </span>
      //   <span>
      //     <el-button style='font-size: 12px;' type='text' icon='el-icon-sort-up' on-click={ () => this.sortUp(node, data) }></el-button>
      //     <el-button style='font-size: 12px;' type='text' icon='el-icon-sort-down' on-click={ () => this.sortDown(node, data) }></el-button>
      //     <el-button style='font-size: 12px;' type='text' on-click={ () => this.showPermission(node, data) }>权限</el-button>
      //     <el-button style='font-size: 12px;' type='text' on-click={ () => this.showUpdate(node, data) }>修改</el-button>
      //     { data.flag !== '3' ? <el-button style='font-size: 12px;' type='text' on-click={ () => this.showAdd(node, data) }>添加</el-button> : <el-button type='text' style='font-size: 12px;visibility: hidden;'>添加</el-button> }
      //     { node.isLeaf ? <el-button style='font-size: 12px;' type='text' on-click={ () => this.remove(node, data) }>删除</el-button> : <el-button type='text' style='font-size: 12px;visibility: hidden;'>删除</el-button> }
      //   </span>
      // </span>)
    },
    copyFilter(val) {
      this.formSystemPermission.copyPersonList = this.formSystemPermission.personList.filter(e => {
        return e.USEREN.indexOf(val) >= 0 || e.USERNAMEZH.indexOf(val) >= 0
      })
    },
    personFilter(val) {
      this.formStaffPermission.personnelAllList = this.formStaffPermission.personList.filter(e => {
        return e.USEREN.indexOf(val) >= 0 || e.USERNAMEZH.indexOf(val) >= 0
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
      if (tab.name === 'component-two') {
        this.getMenuModules(0)
      } else if (tab.name === 'component-three') {
        this.onSearchStaffAll()
        this.getMenuModules(0)
      }
      // this.$nextTick(() => {
      //   this.autoHeight2 = this.$el.parentNode.clientHeight - this.$refs['component-two'].$el.clientHeight - 160
      // })
    },
    // 查询系统权限
    onSearchSys() {
      permissionApi.getStaffSysLvs(null, null, null).then(response => {
        if (response.data.length > 0) {
          this.formSystemPermission.region = response.data[0].SYSID
          this.formSystemPermission.regionList = response.data
          this.onChangeSys(this.formSystemPermission.region)
        }
      })
    },
    /**
     * 切换系统
     * @method onChangeSys
     * @param {String} value 目前的选中值
     * @return 无
     */
    onChangeSys(value) {
      permissionApi.getStaffSysLvs(null, value, null).then(response => {
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
      permissionApi.getStaffSysLvs(null, this.formSystemPermission.region, value).then(response => {
        if (response.data) {
          this.formSystemPermission.personnelSelectedList = response.data.hasLv.map(e => {
            return e.USERID
          })
          this.formSystemPermission.personnelAllList = response.data.noLv
          this.formSystemPermission.copyPersonList = response.data.noLv
          this.formSystemPermission.personList = response.data.noLv
          // console.log(this.formSystemPermission.personnelSelectedList)
        }
      })
    },
    // 查询全部人员
    onSearchStaffAll() {
      permissionApi.getStaffAll().then(response => {
        if (response.data.length > 0) {
          this.formStaffPermission.personnelAllList = response.data
          this.formStaffPermission.personList = response.data
          this.formStaffPermission.personnelSelectedList = response.data[0].USERID
        }
      }).then(() => {
        this.onSearchStaffPermission()
      })
    },
    // 查询当前人员的权限
    onSearchStaffPermission() {
      permissionApi.getStaffMenuModule(this.formStaffPermission.personnelSelectedList).then(response => {
        this.formStaffPermission.checkedList = []
        this.setTree = JSON.parse(JSON.stringify(this.menuTree))
        if (response.data) {
          const setTree = JSON.parse(response.data.menuModuleMap)
          console.log(setTree)
          this.getQueryList(setTree)
        }
      })
    },
    // 递归取值
    getQueryList(arr) {
      arr.map(e => {
        if (e.value === true) {
          this.formStaffPermission.checkedList.push(e.id)
        }
        if (e.childrenList.length > 0) {
          this.getQueryList(e.childrenList)
        }
      })
    },
    // 人员选择触发
    onChangePerson(value) {
      this.formStaffPermission.personnelSelectedList = value
      this.onSearchStaffPermission()
    },
    // 删除节点
    remove(node, data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          uuid: data.id,
          parentId: data.parentId
        }
        permissionApi.delMenu(params).then(response => {
          if (response.success) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this.getMenuModules(0)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 升序
    sortUp(node, data) {
      console.log(node)
      console.log(data)
      const parent = node.parent
      const children = parent.data.childrenList || parent.data
      const index = children.findIndex(d => d.id === data.id)
      if (index === 0) {
        this.$message({
          type: 'info',
          message: '已经在最顶层了'
        })
      } else {
        const lastNode = children[index - 1]
        const params1 = {
          flag: data.flag,
          uuid: data.id,
          name: data.name,
          order: lastNode.order,
          parentId: data.parentId,
          read: data.read,
          write: data.write
        }
        permissionApi.updateMenu(params1).then(response1 => {
          const params2 = {
            flag: lastNode.flag,
            uuid: lastNode.id,
            name: lastNode.name,
            order: data.order,
            parentId: data.parentId,
            read: lastNode.read,
            write: lastNode.write
          }
          permissionApi.updateMenu(params2).then(response2 => {
            if (response2.success) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              })
              this.getMenuModules(0)
            }
          })
        })
      }
      // children[index - 1] = children.splice(index, 1, children[index - 1])[0]
      // this.$refs.tree.updateKeyChildren(parent.data.id, JSON.parse(JSON.stringify(children)))
    },
    // 降序
    sortDown(node, data) {
      console.log(node)
      console.log(data)
      const parent = node.parent
      const children = parent.data.childrenList || parent.data
      const index = children.findIndex(d => d.id === data.id)
      if (index === children.length - 1) {
        this.$message({
          type: 'info',
          message: '已经在最底层了'
        })
      } else {
        const nextNode = children[index + 1]
        const params1 = {
          flag: data.flag,
          uuid: data.id,
          name: data.name,
          order: nextNode.order,
          parentId: data.parentId
        }
        permissionApi.updateMenu(params1).then(response1 => {
          const params2 = {
            flag: nextNode.flag,
            uuid: nextNode.id,
            name: nextNode.name,
            order: data.order,
            parentId: data.parentId
          }
          permissionApi.updateMenu(params2).then(response2 => {
            if (response2.success) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              })
              this.getMenuModules(0)
            }
          })
        }).catch(err => {
          this.$notify({
            title: '失败',
            message: err,
            type: 'error'
          })
        })
      }
      // children[index - 1] = children.splice(index, 1, children[index - 1])[0]
      // this.$refs.tree.updateKeyChildren(parent.data.id, JSON.parse(JSON.stringify(children)))
    },
    /**
     * 添加一级目录/页面
     * @method onChangeSys
     * @param {String} flag '1':目录;'2':页面
     * @return 无
     */
    onAddLevelOne(flag) {
      const params = {
        flag: flag,
        name: this.formPagePermission.menu,
        order: this.menuTree.length === 0 ? 1 : parseInt(this.menuTree[this.menuTree.length - 1].order) + 1,
        parentId: 0
      }
      permissionApi.addMenu(params).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
          this.getMenuModules(0)
        }
      })
    },
    /**
     * 添加目录/页面/元素
     * @method addNode
     * @param {String} flag '1':目录;'2':页面;'3':元素
     * @return 无
     */
    addNode(flag) {
      // const node = this.nodeDialogObj.node
      const data = this.nodeDialogObj.data
      const children = data.childrenList
      const params = {
        flag: flag,
        name: this.nodeDialogObj.form.name,
        order: children.length === 0 ? 1 : parseInt(children[children.length - 1].order) + 1,
        parentId: data.id
      }
      permissionApi.addMenu(params).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          })
          this.nodeDialogObj.visible = false
          this.getMenuModules(0)
        }
      })
    },
    // 修改目录/页面/元素
    updateNode() {
      // const node = this.nodeDialogObj.node
      const data = this.nodeDialogObj.data
      const params = {
        flag: data.flag,
        uuid: data.id,
        name: this.nodeDialogObj.form.name,
        order: data.order,
        parentId: data.parentId,
        read: data.read,
        write: data.write
      }
      permissionApi.updateMenu(params).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
          this.nodeDialogObj.visible = false
          this.getMenuModules(0)
        }
      })
    },
    // 设置权限
    setPermissionNode() {
      // const node = this.nodeDialogObj.node
      const data = this.nodeDialogObj.data
      const params = {
        flag: data.flag,
        uuid: data.id,
        name: data.name,
        order: data.order,
        parentId: data.parentId,
        read: this.nodeDialogObj.form.read === 'null' ? null : this.nodeDialogObj.form.read,
        write: this.nodeDialogObj.form.write === 'null' ? null : this.nodeDialogObj.form.write
      }
      permissionApi.updateMenu(params).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
          this.nodeDialogObj.visible = false
          this.getMenuModules(0)
        }
      })
    },
    // 显示添加dialog
    showAdd(node, data) {
      this.nodeDialogObj.title = '添加'
      this.nodeDialogObj.visible = true
      this.nodeDialogObj.flag = data.flag
      this.nodeDialogObj.node = node
      this.nodeDialogObj.data = data
      this.nodeDialogObj.form.name = ''
    },
    // 显示修改dialog
    showUpdate(node, data) {
      this.nodeDialogObj.title = '修改'
      this.nodeDialogObj.visible = true
      this.nodeDialogObj.flag = data.flag
      this.nodeDialogObj.node = node
      this.nodeDialogObj.data = data
      this.nodeDialogObj.form.name = data.name
    },
    // 显示权限dialog
    showPermission(node, data) {
      this.nodeDialogObj.title = '权限'
      this.nodeDialogObj.visible = true
      this.nodeDialogObj.flag = data.flag
      this.nodeDialogObj.node = node
      this.nodeDialogObj.data = data
      this.nodeDialogObj.form.read = data.read === null ? 'null' : data.read
      this.nodeDialogObj.form.write = data.write === null ? 'null' : data.write
    },
    // 获取目录tree
    getMenuModules(menuParentId) {
      permissionApi.getMenuModules(menuParentId).then(response => {
        this.menuTree = response.data
        this.setTree = response.data
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
      permissionApi.setStaffSysLvs(params).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        }
      })
    },
    // 提交人员权限
    onSubmitPerson() {
      console.log(this.setTree)
      console.log(this.$refs.setTree.getCheckedKeys())
      console.log(this.$refs.setTree.getCheckedNodes())
      this.setQueryList(this.setTree)
      console.log(this.setTree)
      const params = {
        menuModuleMap: JSON.stringify(this.setTree),
        staffId: this.formStaffPermission.personnelSelectedList
      }
      permissionApi.updateStaffMenuModule(params).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        }
      })
    },
    // 递归塞值
    setQueryList(arr) {
      arr.map(e => {
        e.value = false
        if (this.$refs.setTree.getCheckedKeys().includes(e.id)) {
          e.value = true
        }
        if (e.childrenList.length > 0) {
          this.setQueryList(e.childrenList)
        }
      })
    },
    fetchData() {
      this.onSearchSys()
    }
  }
}
</script>
