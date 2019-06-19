<template>
  <el-container class="login">
    <el-header>fe-document</el-header>
    <el-main v-if="isLogin">
      <div class="login__main">
        <p>
          <span>用户名：</span>
          <el-input
            placeholder="请输入用户名"
            v-model="user_name"
            clearable>
          </el-input>
        </p>
        <p>
          <span>密码：</span>
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </p>
        <el-button type="primary" @click="doLogin">登录</el-button>
        <el-link type="primary" @click="switchFn">注册</el-link>
      </div>
    </el-main>
    <el-main v-else>
      <div class="login__main">
        <p>
          <span>用户名：</span>
          <el-input
            placeholder="请输入用户名"
            v-model="user_name"
            clearable>
          </el-input>
        </p>
        <p>
          <span>密码：</span>
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </p>
        <p>
          <span>邮箱：</span>
          <el-input
            placeholder="请输入邮箱"
            v-model="email"
            clearable>
          </el-input>
        </p>
        <el-button type="primary" @click="doReg">注册</el-button>
        <el-link type="primary" @click="switchFn">登录</el-link>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
import { userLogin, userReg } from '@/assets/js/api'

export default {
  name: 'login',
  data() {
    return {
      isLogin: true,
      user_name:'',
      password: '',
      email: '',
      backUrl: decodeURI(this.$route.query.backUrl)
    }
  },
  created() {this.switchFn},
  methods:{
    switchFn() {
      this.isLogin = !this.isLogin
    },
    doLogin() {
      let {user_name, password} = this
      userLogin({
        user_name,
        password
      }).then(({success, msg})=>{
        if(success) {
          this.$router.push('/')
        } else {
          this.$message.error(msg);
        }
      })
    },
    doReg() {
      let {user_name, password, email} = this
      userReg({
        user_name,
        password,
        email
      }).then(({success, msg})=>{
        if(success) {
          if(this.backUrl) {
            window.location.href = this.backUrl
          }else {
            this.$router.push('/user')
          }
        } else {
          this.$message.error(msg);
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.el-header, .el-footer {
  background-color: #fff;
  color: #409EFF;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  font-weight: bold;
  font-size: 30px;
}

.el-main {
  color: #333;
}
.el-container {
  padding-top: 0;
}
.login {
  &__main {
    // background-color: #ddd;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    // height: 200px;
    padding: 20px;
    border-radius: 4px;
    p {
      margin-bottom: 40px;
    }
    span {
      display: inline-block;
      width: 100px;
      text-align-last: left;
    }
    .el-input {
      display: inline-block;
      width: 400px;
    }
    .el-button {
      display: block;
      width: 500px;
      margin-bottom: 10px;
    }
    .el-link {
      display: block;
      width: 100px;
      text-align: center;
      line-height: 30px;
      margin: 0 auto;
    }
  }
}
</style>