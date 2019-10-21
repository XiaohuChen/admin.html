<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="回购比例" label-width="70px">
        <el-input v-model="form.BackRatio" />
      </el-form-item>
      <el-form-item label="全球分红比例" label-width="70px">
        <el-input v-model="form.WorldRatio" />
      </el-form-item>

      <el-form-item label="" label-width="70px">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { world, editWorld } from '@/api/setting.js'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      form: {
        BackRatio: '',
        WorldRatio: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      world({}).then(res => {
        this.form = res.data
      })
    },
    handleEdit() {
      editWorld(this.form).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '全球分红和回购比例已更新',
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
