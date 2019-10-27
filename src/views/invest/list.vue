<template>
  <div class="app-container">
    <div class="filter-container">
      <span style="font-size:14px;vertical-align:middle;color:#606266;">放行状态: </span>&nbsp;
      <el-select v-model="listQuery.State" style="width: 140px" placeholder="放行状态" class="filter-item" @change="getList">
        <el-option label="全部" :value="-1" />
        <el-option label="已放行" :value="3" />
        <el-option label="已违约" :value="4" />
        <el-option label="未放行" :value="0" />
        <el-option label="已出局" :value="2" />
      </el-select>
      <span style="font-size:14px;vertical-align:middle;color:#606266;">预约时间: </span>&nbsp;
      <datePicker v-model="listQuery.PlanDate" class="filter-item" />
      <br>
      <span style="font-size:14px;vertical-align:middle;color:#606266;">放行时间: </span>&nbsp;
      <datePicker v-model="listQuery.PassDate" class="filter-item" />
      <el-input
        v-model="listQuery.Phone"
        placeholder="手机号"
        type="number"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.NickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ _date(scope.row.AddTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约金额(USDT)" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" sortable="custom" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.State == 0">排队</span>
          <span v-else-if="scope.row.State == 3">放行</span>
          <span v-else-if="scope.row.State == 1">报单</span>
          <span v-else-if="scope.row.State == 2">出局</span>
          <span v-else-if="scope.row.State == 4">违约</span>
        </template>
      </el-table-column>
      <el-table-column label="放行时间" sortable="custom" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.PassTime > 0">{{ _date(scope.row.PassTime) }}</span>
          <span v-else />
        </template>
      </el-table-column>
      <el-table-column label="报单时间" sortable="custom" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.PayTime > 0">{{ _date(scope.row.PayTime) }}</span>
          <span v-else />
        </template>
      </el-table-column>
      <el-table-column label="锁仓数量(EVC)" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.NumberEvc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="放行人" sortable="custom" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.PassAdminUser == 0 && scope.row.State != 0 && scope.row.State != 4">系统</span>
          <span v-else-if="scope.row.State == 0 || scope.row.State == 4" />
          <span v-else>{{ scope.row.PassUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否违约" sortable="custom" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.State == 4">是</span>
          <span v-else>不是</span>
        </template>
      </el-table-column>
      <el-table-column v-permission="['/invest/pass']" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.State == 0" v-permission="['/invest/pass']">
              <el-button size="small" type="success" @click="pass(scope.row.Id)">
                放行
              </el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import {
  list,
  pass
} from '@/api/invest'

import waves from '@/directive/waves'

import Pagination from '@/components/Pagination'
import datePicker from '@/components/Upload/datePicker'
import permission from '@/directive/permission/index.js'

import {
  dateHandle
} from '@/api/dateHandle'

export default {
  components: {
    Pagination,
    datePicker
  },
  directives: {
    waves,
    permission
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        State: -1,
        PlanDate: [],
        PassDate: [],
        Phone: '',
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    pass(id) {
      this.$confirm('确认放行此预约单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pass({ Id: id }).then(res => {
          if (res.code == 20000) {
            this.$message({
              message: '该预约单已放行',
              type: 'success'
            })
            this.getList()
          }
        })
      }).catch(() => {

      })
    },
    _date(t) {
      return dateHandle('Y-m-d H:i:s', t)
    }
  }
}
</script>
