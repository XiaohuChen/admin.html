<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keywords"
        placeholder="关键字"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.IsBan" placeholder="是否锁定" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item, index) in {0:'未锁定',1:'被锁定',100:'全部'}" :key="index" :label="item" :value="index" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.NickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.IsBan == 0" style="color: green;">启用</span>
          <span v-else style="color: red;">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ParentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ParentPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邀请码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.InviteCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="{ row }">
          {{ _date(row.RegisterTime) }}
        </template>
      </el-table-column>

      <el-table-column
        v-permission="['/members/membersStatus', '/members/subList', '/members/holdCoin']"
        label="操作"
        width="320"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <span v-permission="['/members/membersStatus']">
              <el-button
                size="small"
                :class="[scope.row.Status == 1 ? 'el-button--danger' : 'el-button--primary']"
                @click="getSetStatus(scope.row,0)"
              >
                <span v-if="scope.row.IsBan == 0">禁用</span>
                <span v-else>启用</span>
              </el-button>
            </span>
            <span v-permission="['/members/subList']">
              <el-button size="small" type="primary" @click="front_sublist(scope.row)">下级</el-button>
            </span>
            <span v-permission="['/members/holdCoin']">
              <el-button size="small" type="primary" @click="holdcoin(scope.row)">持币</el-button>
            </span>
            <span v-permission="['/members/memberRemark']">
              <el-button size="small" type="primary" @click="showRemark(scope.row)">备注</el-button>
            </span>

          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="我的下级会员" :visible.sync="subListVisible">
      <el-table :key="tableKey" v-loading="listLoading" :data="sublist" border fit highlight-current-row style="width: 100%;">
        <el-table-column label="ID" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.NickName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.Status == 1">正常</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="{ row }">
            {{ _date(row.RegisterTime) }}
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="subtotal"
        :page.sync="sublistQuery.page"
        :limit.sync="sublistQuery.limit"
        @pagination="asyc_subList"
      />
    </el-dialog>

    <el-dialog title="会员持币信息" :visible.sync="coinVisible">
      <el-select v-model="addCoinParams" placeholder="添加持币信息" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item, index) in coinList" :key="index" :label="item.EnName" :value="item.Id" />
      </el-select>
      <el-button size="small" type="primary" @click="addCoinHandle()">添加一个持币信息</el-button>
      <el-table :key="tableKey" v-loading="listLoading" :data="holdCoinlist" border fit highlight-current-row style="width: 100%;">
        <el-table-column label="币种ID" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="币种名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="余额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="锁定余额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.LockMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            <span>{{ _date(scope.row.Address) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-permission="['/members/memberCoinUpdate', '/members/memberCoinLockMoney']"
          label="修改操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <span v-permission="['/members/memberCoinUpdate']">
                <el-button size="small" type="primary" @click="coinMoney(scope.row)">余额</el-button>
              </span>
              <span v-if="scope.row.CoinName !== 'IA'" v-permission="['/members/memberCoinLockMoney']">
                <el-button size="small" type="primary" @click="coinLockMoney(scope.row)">锁定</el-button>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="subtotal"
        :page.sync="sublistQuery.page"
        :limit.sync="sublistQuery.limit"
        @pagination="asyc_subList(mid)"
      />
    </el-dialog>

    <el-dialog title="修改金额" :visible.sync="moneyVisible">
      <el-form>
        <el-form-item :label="oldmoneyname" label-width="100px">
          <el-input v-model="oldmoney" :placeholder="oldmoney" :disabled="true" />
        </el-form-item>

        <el-form-item :label="newmoneyname" label-width="100px">
          <el-input v-model="newmoney" :placeholder="newmoney" />
        </el-form-item>
        <el-alert title="注：直接输入数字表示在相应的金额上面相加，如果是减直接输入减(-)。如：100则加上100,-100则在原来的金额上面-100" type="error" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改备注" :visible.sync="showRemark_show">
      <el-form>
        <el-form-item label="输入交易备注码" label-width="150px">
          <el-input v-model="showRemark_item.Remark" placeholder="请输入交易备注码" />
        </el-form-item>
        <el-alert title="注：该交易备注码在发起转账时调用" type="error" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="remarkHandle()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  membersList,
  membersStatus,
  memberAddressList,
  holdCoin,
  getCoinId,
  memberCoinUpdate,
  memberCoinLockMoney,
  memberVip,
  addCoin,
  subList,
  memberRemark
} from '@/api/members'
import {
  coinList
} from '@/api/coin'

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
      coinList: {},

      subListVisible: false,
      mid: 0,
      sublist: null,
      subtotal: 0,
      sublistQuery: {
        page: 1,
        limit: 6
      },

      coinVisible: false,
      holdCoinlist: null,
      holdCointotal: 0,
      coinQuery: {
        page: 1,
        limit: 6
      },

      moneyVisible: false,
      oldmoneyname: '余额',
      newmoneyname: '修改余额',
      oldmoney: 0,
      newmoney: 0,
      mcid: 0,
      flag: 1,
      addCoinParams: '',
      showRemark_show: false,
      showRemark_item: {}
    }
  },
  created() {
    this.getCoinList()
    this.getList()
  },
  methods: {
    remarkHandle() {
      memberRemark({
        Id: this.showRemark_item.Id,
        Remark: this.showRemark_item.Remark
      }).then(res => {
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
          this.showRemark_show = false
        }
      })
    },
    showRemark(item) {
      this.showRemark_item = item
      this.showRemark_show = true
    },
    getCoinList() {
      coinList().then(res => {
        this.coinList = res.data.data
        console.log(this.coinList)
      })
    },

    _date(t) {
      return dateHandle('Y-m-d H:i:s', t)
    },
    getList() {
      this.listLoading = true
      membersList(this.listQuery).then(res => {
        this.list = res.data.data
        this.total = res.data.total

        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    getSetStatus(row) {
      this.listLoading = true
      membersStatus({
        id: row.Id
      }).then(res => {
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
          this.listLoading = false
        }
      })
    },

    // 我的下级
    front_sublist(row) {
      this.subListVisible = true
      this.mid = row.Id
      this.asyc_subList(this.mid)
    },
    asyc_subList(mid) {
      this.listLoading = true
      this.sublistQuery.ParentId = this.mid
      subList(this.sublistQuery).then(res => {
        this.sublist = res.data.data
        this.subtotal = res.data.total
        if (res.code == 20000) {
          this.listLoading = false
        }
      })
    },

    // 我的持币
    holdcoin(row) {
      this.coinVisible = true
      this.mid = row.Id
      this.asyc_holdCoin(this.mid)
    },
    asyc_holdCoin(mid) {
      this.listLoading = true
      holdCoin(mid).then(res => {
        this.holdCoinlist = res.data.data
        this.holdCointotal = res.data.total
        if (res.code == 20000) {
          this.listLoading = false
        }
      })
    },

    // 修改余额
    coinMoney(row) {
      this.oldmoneyname = '余额'
      this.newmoneyname = '修改余额'
      this.moneyVisible = true
      this.newmoney = 1
      this.asyc_memberCoinUpdate(row)
      this.mcid = row.Id
      this.flag = 1
    },

    // 修改锁定余额
    coinLockMoney(row) {
      this.oldmoneyname = '锁定余额'
      this.newmoneyname = '修改锁定余额'
      this.moneyVisible = true
      this.newmoney = 1
      this.asyc_memberCoinUpdate(row)
      this.mcid = row.Id
      this.flag = 2
    },

    // 修改冻结余额
    coinForzenMoney(row) {
      this.oldmoneyname = '冻结余额'
      this.newmoneyname = '修改冻结余额'
      this.moneyVisible = true
      this.newmoney = 1
      this.asyc_memberCoinUpdate(row)
      this.mcid = row.Id
      this.flag = 3
    },

    // 获取我的币中的一条记录，用于更新页面
    asyc_memberCoinUpdate(row) {
      getCoinId(row.Id).then(res => {
        if (res.code == 20000) {
          this.oldmoney = res.data.Money
        }
      })
    },

    // 提交数据
    handleEdit() {
      const param = {
        mcid: this.mcid,
        money: this.newmoney
      }
      if (this.flag == 1) {
        memberCoinUpdate(param).then(res => {
          console.log(res)
          if (res.code == 20000) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.asyc_holdCoin(this.mid)
            this.moneyVisible = false
          }
        })
      }
      if (this.flag == 2) {
        memberCoinLockMoney(param).then(res => {
          console.log(res)
          if (res.code == 20000) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.asyc_holdCoin(this.mid)
            this.moneyVisible = false
          }
        })
      }
      if (this.flag == 3) {}
    },
    addCoinHandle() {
      addCoin({
        MemberId: this.mid,
        CoinId: this.addCoinParams
      }).then(res => {
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.asyc_holdCoin(this.mid)
        }
      })
    }

  }
}
</script>
