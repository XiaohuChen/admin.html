<template>
  <div class="app-container">
    <el-form>
      <el-form-item v-for="(item, index) in list" :key="index" :label="'第'+item.ProxyNumber+'代'" label-width="70px">
        <el-input v-model="item.Ratio" />
      </el-form-item>

      <el-form-item label="" label-width="70px">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { inviteList, editInvite } from '@/api/setting.js'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      qiniu: {
        domain: '',
        bucket: '',
        accesskey: '',
        secretkey: '',
        id: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      inviteList().then(res => {
        this.list = res.data
      })
    },
    handleEdit() {
      editInvite({ data: this.list }).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '邀请收益比例已更新',
            type: 'success'
          })
          this.init()
          this.ProductIds = []
          this.editLevelVisible = false
        }
      })
    }
  }
}
</script>
