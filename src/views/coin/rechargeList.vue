<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input v-model="listQuery.keywords" placeholder="用户名" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="协议" align="center">
        <template slot-scope="scope">
          <span v-for="(item,index) in protocolList" v-if="item.id == scope.row.Protocol" :key="index">{{ item.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.Phone }}
        </template>
      </el-table-column>
      <el-table-column label="转入币种" align="center">
        <template slot-scope="scope">
          {{ scope.row.EnName }}
        </template>
      </el-table-column>
      <el-table-column label="转入地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.Address }}
        </template>
      </el-table-column>
      <el-table-column label="转入数量" align="center">
        <template slot-scope="scope">
          {{ parseFloat(scope.row.Money) }}
        </template>
      </el-table-column>
      <el-table-column label="Hash" align="center">
        <template slot-scope="scope">
          {{ scope.row.Hash }}
        </template>
      </el-table-column>
      <el-table-column label="转入时间" align="center">
        <template slot-scope="scope">
          {{ _date(scope.row.AddTime) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.Status == 0">未到账</span>
          <span v-if="scope.row.Status == 1">到账</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
  import {
    rechargeList,
    coinAdd,
    getProtocol,
    getCoin,
    coinUpdate
  } from '@/api/coin.js'
  import waves from '@/directive/waves'
  import {
    parseTime
  } from '@/utils'
  import Pagination from '@/components/Pagination'
  import permission from '@/directive/permission/index.js'
  import Upload from '@/components/Upload/SingleImage3'
  import {
    dateHandle,
    qiniuToken
  } from '@/api/dateHandle';
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
          limit: 10,
          keywords: ''
        },
        protocolList: null

      }
    },
    created() {
      this.getList()
      this.getProtocolList()
    },
    methods: {
      _date(t) {
        return dateHandle('Y-m-d H:i:s', t);
      },
      getList() {
        rechargeList(this.listQuery).then(res => {
          if (res.code == 20000) {
            console.log(res)
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
      }

    }
  }
</script>
