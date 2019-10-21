<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="每日预约金额上限" label-width="130px">
        <el-input v-model="form.PlanNumber" />
      </el-form-item>
      <el-form-item label="每日放行数量" label-width="130px">
        <el-input v-model="form.PassNumber" />
      </el-form-item>

      <el-form-item label="" label-width="70px">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { plan, editPlan } from '@/api/setting.js'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      form: {
        PlanNumber: '',
        PassNumber: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      plan({}).then(res => {
        this.form = res.data
      })
    },
    handleEdit() {
      editPlan(this.form).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '预约设置已更新',
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
