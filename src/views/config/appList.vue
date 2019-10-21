<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="安卓下载地址" label-width="100px">
        <el-input v-model="app.android" />
      </el-form-item>
      <el-form-item label="苹果下载地址" label-width="100px">
        <el-input v-model="app.IOS" />
      </el-form-item>
      <el-form-item label="App更新内容" label-width="100px">
        <el-input type="textarea" v-model="app.tip"></el-input>
      </el-form-item>
      <el-form-item label="App版本号" label-width="100px">
        <el-input v-model="app.ver" />
      </el-form-item>
      <el-form-item label="需要安装" label-width="100px">
        <el-radio v-model="app.needInstall" :label="1">是</el-radio>
        <el-radio v-model="app.needInstall" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="强制更新" label-width="100px">
        <el-radio-group v-model="app.mustUpdate">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" label-width="100px">
        <el-button type="primary" @click="handleApp">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    appList,
    updateAddAppVersion
  } from '@/api/config.js'
  import waves from '@/directive/waves'
  import {
    parseTime
  } from '@/utils'
  export default {
    data() {
      return {
        listLoading: true,
        app: {
          ver: '',
          needInstall: '',
          mustUpdate: '',
          IOS: '',
          android: '',
          tip: '',
          id: 0
        },
        options: null,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        appList().then(res => {
          if (res.code == 20000) {
            this.app.id = res.data.Id
            this.app.ver = res.data.ver
            this.app.needInstall = res.data.NeedInstall
            this.app.mustUpdate = res.data.MustUpdate
            this.app.IOS = res.data.IOS
            this.app.android = res.data.Android
            this.app.tip = res.data.Tip
            setTimeout(() => {
              this.listLoading = false
            }, 0.3 * 1000)

            console.log(this.app);
          } else {
            this.listLoading = true
          }
        })
      },
      handleApp() {
        this.listLoading = true
        updateAddAppVersion(this.app).then(res => {
          if (res.code == 20000) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            setTimeout(() => {
              this.listLoading = false
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      },
    }
  }
</script>
