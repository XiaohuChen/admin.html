<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" placeholder="用户名" style="width: 200px;" class="filter-item" />
      <el-select v-model="listQuery.status" style="width: 140px" class="filter-item">
        <el-option v-for="(item,index) in status" :key="item" :label="index" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="MultiplePass">批量通过</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="MultipleReject">批量驳回</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="ID" prop="Id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户id" align="center">
        <template slot-scope="scope">
          {{ scope.row.MemberId }}
        </template>
      </el-table-column>
      <el-table-column label="用户手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.Phone }}
        </template>
      </el-table-column>
      <el-table-column label="转出币种" align="center">
        <template slot-scope="scope">
          {{ scope.row.EnName }}
        </template>
      </el-table-column>
      <el-table-column label="转出地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.Address }}
        </template>
      </el-table-column>
      <el-table-column label="转出数量" align="center">
        <template slot-scope="scope">
          {{ parseFloat(scope.row.Money) }}
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center">
        <template slot-scope="scope">
          {{ parseFloat(scope.row.Fee) }}
        </template>
      </el-table-column>
      <el-table-column label="Hash" align="center">
        <template slot-scope="scope">
          {{ scope.row.Hash }}
        </template>
      </el-table-column>
      <el-table-column label="交易备注码" align="center">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>
      <el-table-column label="转出时间" align="center">
        <template slot-scope="scope">
          {{ _date(scope.row.AddTime) }}
        </template>
      </el-table-column>
      <el-table-column label="审核时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.ProcessTime > 0">{{ _date(scope.row.ProcessTime) }}</span>
          <span v-else>未审核</span>

        </template>
      </el-table-column>
      <el-table-column v-permission="['/coin/waitProcess']" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.Status == '-1'">驳回</span>
          <span v-if="scope.row.Status == '0'">
            <span v-permission="['/coin/waitProcess']">
              <el-button size="small" type="primary" @click="showWaitProcess(scope.row)">待处理</el-button>
            </span>
          </span>
          <span v-if="scope.row.Status == '1'">处理中</span>
          <span v-if="scope.row.Status == '2'">已处理</span>
          <span v-if="scope.row.Status == '3'">失败</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="待处理记录" :visible.sync="processVisible">
      <el-form>
        <el-form-item label="收款地址" label-width="70px">
          <el-input v-model="process.Address" :disabled="true" />
        </el-form-item>
        <!--        <el-form-item label="转出账户" label-width="70px">
          <el-input v-model="process.RPCUser" :disabled="true" />
        </el-form-item> -->
        <el-form-item label="转出时间" label-width="70px">
          <el-input :value="_date(process.AddTime)" :disabled="true" />
        </el-form-item>
        <el-form-item label="转出币种" label-width="70px">
          <el-input v-model="process.CoinName" :disabled="true" />
        </el-form-item>
        <el-form-item label="转出数量" label-width="70px">
          <el-input v-model="process.Money" :disabled="true" />
        </el-form-item>
        <el-form-item label="手续费" label-width="70px">
          <el-input v-model="process.Fee" :disabled="true" />
        </el-form-item>
        <el-form-item label="预计到账" label-width="70px">
          <el-input v-model="process.Real" :disabled="true" />
        </el-form-item>
        <el-form-item label="验证码" label-width="70px">
          <el-input v-model="process.Remark" :disabled="true" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button type="primary" @click="handleProcess(1)">提交</el-button> -->
        <el-button type="primary" @click="handleProcess(2)">驳回</el-button>
        <el-button type="primary" @click="handleProcess(3)">直接处理</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量通过" :visible.sync="MultiplePassView">
      <el-form>
        <el-form-item label="Hash" label-width="70px">
          <el-input v-model.trim="Hash" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="HandleMultiplePass">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量驳回" :visible.sync="MultipleRejectView">
      <el-form>
        <el-form-item label="理由" label-width="70px">
          <el-input v-model.trim="Remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="HandleMultipleReject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  withdrawList,
  getProtocol,
  getWithdrawCoin,
  waitProcess,
  MultiplePass,
  MultipleReject
} from '@/api/coin.js'
import {
  dateHandle
} from '@/api/dateHandle.js'
import waves from '@/directive/waves'
import {
  parseTime
} from '@/utils'
import Pagination from '@/components/Pagination2'
import permission from '@/directive/permission/index.js'
import Upload from '@/components/Upload/SingleImage3'

export default {
  components: {
    Pagination,
    Upload
  },
  directives: {
    waves,
    permission
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        status: '',
        keywords: ''
      },
      protocolList: null,

      processVisible: false,
      status: {
        '驳回': -1,
        '待处理': 0,
        '已处理': 2,
        '全部': ''
      },
      process: {
        Address: '',
        RPCUser: '',
        AddTime: '',
        CoinName: '',
        Money: '',
        Fee: '',
        Real: '',
        verifycode: '',
        Remark: '',
        id: 0
      },
      handleTimeOut: false,
      SelectIds: [],
      Hash: '',
      MultiplePassView: false,
      MultipleRejectView: false,
      Remark: ''
    }
  },
  created() {
    this.getList()
    this.getProtocolList()
  },
  methods: {
    MultiplePass() {
      if (this.SelectIds.length <= 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要处理的记录'
        })
        return
      }
      this.MultiplePassView = true
    },
    HandleMultiplePass() {
      if (this.Hash.length <= 0) {
        this.$message({
          type: 'warning',
          message: '请填写hash'
        })
        return
      }
      MultiplePass({ Ids: this.SelectIds, Hash: this.Hash }).then(res => {
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: '已批量通过'
          })
          this.getList()
          this.MultiplePassView = false
        }
      })
    },
    MultipleReject() {
      if (this.SelectIds.length <= 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要处理的记录'
        })
        return
      }
      this.MultipleRejectView = true
    },
    HandleMultipleReject() {
      if (this.Remark.length <= 0) {
        this.$message({
          type: 'warning',
          message: '请填写驳回理由'
        })
        return
      }
      MultipleReject({ Ids: this.SelectIds, Remark: this.Remark }).then(res => {
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: '已批量通过'
          })
          this.getList()
          this.MultipleRejectView = false
        }
      })
    },
    handleSelectionChange(rows) {
      this.SelectIds = []
      var _this = this
      rows.forEach(row => {
        _this.SelectIds.push(row.Id)
      })
    },
    _date(t) {
      return dateHandle('Y-m-d H:i:s', t)
    },
    getList() {
      withdrawList(this.listQuery).then(res => {
        if (res.code == 20000) {
          this.list = res.data.data
          this.total = res.data.total
          this.listLoading = false
        }
      })
      this.listLoading = true
    },

    // 获取币种类型
    getProtocolList() {
      getProtocol().then(res => {
        if (res.code == 20000) {
          this.protocolList = res.data
        }
      })
    },

    // 待处理显示页面
    showWaitProcess(row) {
      getWithdrawCoin({
        id: row.Id
      }).then(res => {
        if (res.code == 20000) {
          this.process.Address = res.data.Address
          this.process.RPCUser = res.data.RPCUser
          this.process.AddTime = res.data.AddTime
          this.process.CoinName = res.data.CoinName
          this.process.Money = res.data.Money
          this.process.Fee = res.data.Fee
          this.process.Real = res.data.Real
          this.process.verifycode = res.data.verifycode
          this.process.Remark = res.data.Remark
          this.process.id = res.data.Id
        }
      })
      this.processVisible = true
    },

    // 待处理逻辑
    handleProcess(type) {
      if (this.handleTimeOut) return
      this.handleTimeOut = true

      setTimeout(() => {
        this.handleTimeOut = false
      }, 2500)

      console.log(this.process)
      console.log('待处理')
      const param = {
        id: Number(this.process.id),
        type: Number(type)
      }
      waitProcess(param).then(res => {
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
        }
      })
    }
  }
}
</script>
