<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.Phone" placeholder="手机号" type="number" class="filter-item" style="width: 200px;" />
      <el-select v-model="listQuery.Type" style="width: 140px" placeholder="放行状态" class="filter-item" @change="init">
        <el-option label="全部" value="" />
        <el-option label="静态奖励" :value="1" />
        <el-option label="邀请奖励" :value="2" />
        <el-option label="社区奖励" :value="3" />
        <el-option label="封号清空收益" :value="4" />
        <el-option label="平级奖励" :value="5" />
        <el-option label="全球分红" :value="6" />
        <el-option label="收益余额提现" :value="7" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="init">搜索</el-button>
    </div>
    <div class="filter-container" style="text-align:center;">
      <span>总收益: {{ SumReward }}</span>
    </div>

    <el-table v-loading="listLoading" :data="list" style="width: 100%" border>
      <el-table-column prop="Id" label="ID" align="center" width="100" />
      <el-table-column prop="NickName" align="center" label="用户名" />
      <el-table-column prop="Phone" align="center" label="手机号" />
      <el-table-column label="收益类型" sortable="custom" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.Type == 1">静态收益</span>
          <span v-if="scope.row.Type == 2">邀请奖励</span>
          <span v-if="scope.row.Type == 3">社区奖励</span>
          <span v-if="scope.row.Type == 4">封号清空收益</span>
          <span v-if="scope.row.Type == 5">平级奖励</span>
          <span v-if="scope.row.Type == 6">全球分红</span>
          <span v-if="scope.row.Type == 7">收益余额提现</span>
          <span v-else />
        </template>
      </el-table-column>
      <el-table-column prop="Coin" align="center" label="奖励币种" />
      <el-table-column prop="Number" align="center" label="金额" />
      <el-table-column label="时间" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ _date(scope.row.AddTime) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="init" />
  </div>
</template>

<script>
import '@/assets/css/global.css'
import '@/assets/css/base.css'
import {
  list
} from '@/api/output'
import waves from '@/directive/waves'
import permission from '@/directive/permission/index.js'
import Pagination from '@/components/Pagination'
import {
  dateHandle
} from '@/api/dateHandle'

export default {
  name: 'OutputList',
  components: {
    Pagination
  },
  directives: {
    waves,
    permission
  },
  data() {
    return {
      list: [],
      total: 0,
      SumReward: 0,
      listLoading: true,
      listQuery: {
        Type: '',
        Phone: '',
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listLoading = true
      list(this.listQuery).then((res) => {
        this.list = res.data.list
        this.total = res.data.total
        this.SumReward = res.data.SumReward
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    _date(t) {
      return dateHandle('Y-m-d H:i:s', t)
    }
  }
}
</script>
