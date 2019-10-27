<template>
  <div class="app-container">
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ParentPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.AuthName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template slot-scope="scope">
          {{ scope.row.IdCard }}
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img v-for="(item,index) in scope.row.IdCardImg" :key="index" v-image-preview style="width:100px;height:80px;" :src="item">
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.AuthState == 1">待审核</span>
          <span v-else-if="scope.row.AuthState == 2">已通过</span>
          <span v-else-if="scope.row.AuthState == 3">未通过</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.AuthAddTime == 0" />
          <span v-else>{{ _date(scope.row.AuthAddTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.HandleAuthTime == 0" />
          <span v-else>{{ _date(scope.row.HandleAuthTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.AuthState == 1">
            <span v-permission="['/auth/pass']">
              <el-button size="small" type="primary" @click="AuthPass(scope.row.Id)">通过</el-button>
            </span>
            <span v-permission="['/auth/reject']">
              <el-button size="small" type="primary" @click="AuthReject(scope.row.Id)">驳回</el-button>
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
  membersAuthList,
  AuthReject,
  AuthPass
} from '@/api/members'

import waves from '@/directive/waves'
import {
  parseTime
} from '@/utils'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
import {
  dateHandle
} from '@/api/dateHandle'

export default {
  components: {
    Pagination
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
        page: 1,
        limit: 10,
        IsBan: ''
      },
      AuthDetailVisible: false,
      AuthDetailData: [],
      AuthImgs: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    AuthDetail(index) {
      this.AuthDetailData = this.list[index]
      this.AuthDetailVisible = true
    },
    AuthReject(Id) {
      AuthReject({ Id: Id }).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '已驳回该实名认证',
            type: 'success'
          })
          this.getList()
          this.AuthDetailVisible = false
        }
      })
    },
    AuthPass(Id) {
      AuthPass({ Id: Id }).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '已通过该实名认证',
            type: 'success'
          })
          this.getList()
          this.AuthDetailVisible = false
        }
      })
    },
    _date(t) {
      return dateHandle('Y-m-d H:i:s', t)
    },
    getList() {
      this.listLoading = true
      membersAuthList(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    }

  }
}
</script>
