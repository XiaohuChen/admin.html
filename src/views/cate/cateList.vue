<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" placeholder="关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名字" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.IsDel == 1"></span>
          <span v-else>禁用</span>
        </template>
      </el-table-column> -->
      <el-table-column label="所属分类" align="center">
        <template slot-scope="{ row }">
          {{ row.CateName }}
        </template>
      </el-table-column>
      <el-table-column label="销量" align="center">
        <template slot-scope="{ row }">
          {{ row.Volume }}
        </template>
      </el-table-column>
      <el-table-column label="原价" align="center">
        <template slot-scope="{ row }">
          {{ row.PrimePrice }}
        </template>
      </el-table-column>
      <el-table-column label="最低售价" align="center">
        <template slot-scope="{ row }">
          {{ row.MinPrice }}
        </template>
      </el-table-column>
      <el-table-column label="最高售价" align="center">
        <template slot-scope="{ row }">
          {{ row.MaxPrice }}
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="{ row }">
          {{ _date(row.AddTime) }}
        </template>
      </el-table-column>

      <el-table-column v-permission="['/members/membersStatus', '/members/subList', '/members/holdCoin']" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <div>
            <span v-permission="['/members/membersStatus']">
              <el-button size="small" :class="[scope.row.Status == 1 ? 'el-button--danger' : 'el-button--primary']" @click="getSetStatus(scope.row)">
                <span v-if="scope.row.Status == 1">禁用</span>
                <span v-else>启用</span>
              </el-button>
            </span>
            <span v-permission="['/members/subList']"><el-button size="small" type="primary" @click="front_sublist(scope.row)">下级</el-button></span>
            <span v-permission="['/members/holdCoin']"><el-button size="small" type="primary" @click="holdcoin(scope.row)">持币</el-button></span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { cateList } from '@/api/product'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
import { dateHandle } from '@/api/dateHandle'

export default {
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    _date(t) {
      return dateHandle('Y-m-d H:i:s', t)
    },
    getList() {
      this.listLoading = true
      cateList(this.listQuery).then(res => {
        this.list = res.data.data
        this.total = res.data.total

        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    }
  }
}
</script>
