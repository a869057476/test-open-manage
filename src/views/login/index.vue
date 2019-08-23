<template>
  <div class="login-container">
    <div class="login-container-row">
      <div class="login-container-row-left">
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
      <div class="login-container-row-right">
        <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
          <h1 class="login-form-title">质量开放管理平台</h1>
          <el-form-item>
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-button class="login-form-btn" :loading="loading" type="primary" @click.native.prevent="handleLogin">Login</el-button>
          <a class="login-form-a" href="#">测试周报超链接></a>
        </el-form>
        <div class="login-tips">
          <p>使用过程中，如遇到问题，联系方式如：</p>
          <p>邮箱地址：cs_support@chinamoney.com.cn</p>
          <p>联系方式：5364,3289</p>
          <p>请尽量<a class="login-tips-a" href="https://www.google.cn/chrome/" target="_blank">下载Google chrome浏览器</a>访问网站，以免在使用中出现问题</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$message({
              type: 'error',
              message: error
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      color: #000;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #c0c0c0;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: linear-gradient(90deg, rgba(92, 130, 255, 1), rgba(87, 190, 255, 1));
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &-row {
    width: 1100px;
    display: flex;
    border-radius: 5px;
    &-left {
      line-height: 0;
      background: #2f5acb;
      width: 520px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      border-radius: 10px 0 0 10px;
    }
    &-right {
      background: #fff;
      width: 580px;
      border-radius: 0 10px 10px 0;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login-form {
  width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  &-title {
    margin: 30px 0 50px;
    text-align: center
  }
  &-btn {
    width: 100%;
    background: linear-gradient(90deg, rgba(34, 141, 235, 1), rgba(33, 225, 228, 1));
  }
  &-a {
    text-align: right;
    margin-top: 10px;
  }
}
.login-tips {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 0;
  margin: 30px 0;
  &-a {
    text-decoration: underline;
  }
}
</style>
