<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" :style="{ height: autoHeight + 'px', overflow: 'auto'}" @tab-click="handleClick">
      <el-tab-pane label="测试轮次红黑榜" name="component-one">
        <component-one v-if="activeName === 'component-one'"></component-one>
      </el-tab-pane>
      <el-tab-pane label="缺陷数据统计表" name="component-two">
        <component-two v-if="activeName === 'component-two'"></component-two>
      </el-tab-pane>
      <el-tab-pane label="月报数据统计" name="component-three">
        <component-three v-if="activeName === 'component-three'"></component-three>
      </el-tab-pane>
      <el-tab-pane label="平台功能使用统计" name="component-four">
        <component-four v-if="activeName === 'component-four'"></component-four>
      </el-tab-pane>
      <el-tab-pane label="平台功能使用统计" name="component-five">
        <component-five v-if="activeName === 'component-five'"></component-five>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import { getTestList } from '@/api/local'
import componentOne from './components/component-one'
import componentTwo from './components/component-two'
import componentThree from './components/component-three'
import componentFour from './components/component-four'
import componentFive from './components/component-five'

export default {
  components: {
    componentOne,
    componentTwo,
    componentThree,
    componentFour,
    componentFive
  },
  data() {
    return {
      autoHeight: 200,
      activeName: 'component-one'
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = this.$el.parentNode.clientHeight - 40
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
