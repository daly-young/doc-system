<template>
  <el-container class="login">
    <el-header>fe-document</el-header>
    <el-form :model="infos" :rules="rules" label-width="100px" inline-message>
      <el-form-item label="用户名" prop="user_name">
        <el-input
          placeholder="请输入用户名"
          v-model="infos.user_name"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="infos.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" v-if="!loginFirst">
        <el-input
            placeholder="请输入邮箱"
            v-model="infos.email"
            clearable>
          </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doLoginOrReg">{{loginFirst?'登录':'注册'}}</el-button>
        <el-link type="primary" @click="switchFn">{{loginFirst?'注册':'登录'}}</el-link>
      </el-form-item>
    </el-form>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<script>
import { userLogin, userReg } from '@/assets/js/api'
import { mapMutations } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      infos: {
        user_name: '',
        password: '',
        email: '',
      },
      rules: {
        user_name: [
          { 
            required: true, 
            message: '请输入名称', 
            trigger: 'blur',
            // validator: (rule,value,callback) =>{
            //   let canPass =  /^[a-zA-Z]$/.test(value)
            //   if(!canPass)callback(new Error('请输入名称'));
            // }
          },
        ],
        password:[{
          required: true, 
          message: '请输入密码', 
          trigger: 'blur',
        },{ 
          min: 6, 
          max: 12, 
          message: '长度在 6 到 12 个字符', 
          trigger: 'blur' 
        }],
        email: [{
          required: true, 
          // message: '请输入邮箱', 
          trigger: 'blur',
          validator: (rule,value,callback) =>{
              let canPass =  /^[a-zA-Z0-9][\w.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z.]*[a-zA-Z]$/.test(value)
              if(!canPass)callback(new Error('请输入正确的邮箱'));
            }
        }]
      },
      loginFirst: true,
      user_name:'',
      password: '',
      email: '',
      backUrl: this.$route.query.backUrl?decodeURI(this.$route.query.backUrl):''
    }
  },
  methods:{
    ...mapMutations([
      'updateData',
    ]),
    switchFn() {
      this.loginFirst = !this.loginFirst
    },
    doLoginOrReg() {
      if(this.loginFirst) {
        this.doLogin()
      }else {
        this.doReg()
      }
    },
    doLogin() {
      let {user_name, password} = this.infos
      userLogin({
        user_name,
        password
      }).then(({success, msg})=>{
        if(success) {
          if(this.backUrl) {
            // console.log(this.backUrl,'=====')
            window.location.href = this.backUrl
          }else {
            this.$router.push('/')
          }
          this.updateData({
            isLogin: true
          })
        } else {
          this.$message.error(msg);
        }
      })
    },
    doReg() {
      let {user_name, password, email} = this.infos
      userReg({
        user_name,
        password,
        email
      }).then(({success, msg})=>{
        if(success) {
          if(this.backUrl) {
            window.location.href = this.backUrl
          }else {
            this.$router.push('/')
          }
          this.updateData({
            isLogin: true
          })
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

.el-button {
  display: block;
  width: 500px;
  margin-bottom: 10px;
}

.login {
  padding-top: 0;
}
.el-link {
  display: block;
  width: 100px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
}
.el-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 600px;
}
</style>