<template>
  <div class="app-container">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="充值统计" name="first">
        <el-table
          :data="tableData.recharge"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="today"
            label="今日"
            width="180"
          />
          <el-table-column
            prop="yesterday"
            label="昨日"
            width="180"
          />
          <el-table-column
            prop="count"
            label="总计"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="体现统计" name="second">
        <el-table
          :data="tableData.withdraw"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="today"
            label="今日"
            width="180"
          />
          <el-table-column
            prop="yesterday"
            label="昨日"
            width="180"
          />
          <el-table-column
            prop="count"
            label="总计"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="会员统计" name="third">
        <el-table
          :data="tableData.members"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="today"
            label="今日"
            width="180"
          />
          <el-table-column
            prop="yesterday"
            label="昨日"
            width="180"
          />
          <el-table-column
            prop="count"
            label="总计"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { statistics } from '@/api/user.js'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
import Upload from '@/components/Upload/SingleImage3'

export default {
  components: { Pagination, Upload },
  directives: { waves, permission },
  data() {
    return {
      activeName: 'first',
      list: null,
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },

    getList() {
      this.listLoading = true
      statistics().then(res => {
        if (res.code == 20000) {
          this.tableData = res.data
          // console.log(res)
          setTimeout(() => {
            this.listLoading = false
          }, 0.3 * 1000)
        } else {
          this.listLoading = true
        }
      })
    }
  }
}
</script>

