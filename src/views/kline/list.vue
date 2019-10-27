<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves v-permission="['/product/add']" class="filter-item" type="primary" @click="add()">
        <i class="el-icon-plus" />&nbsp;&nbsp;添加产品
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border>
      <el-table-column prop="Id" label="ID" align="center" width="100" />
      <el-table-column prop="Coin" align="center" label="币种" />
      <el-table-column prop="PriceCoin" align="center" label="计价币种" />
      <el-table-column prop="Price" align="center" label="价格" />
      <el-table-column prop="PriceCny" align="center" label="价格人民币" />

      <el-table-column v-permission="['/product/edit']" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <div>
            <span v-permission="['/product/edit']">
              <el-button size="small" type="primary" @click="edit(scope.row.Id)">
                编辑
              </el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑行情" :visible.sync="editProductVisible">
      <el-form>
        <el-form-item label="币种" label-width="70px">
          <el-input v-model="editForm.Coin" />
        </el-form-item>
        <el-form-item label="计价币种" label-width="70px">
          <el-input v-model="editForm.PriceCoin" type="number" />
        </el-form-item>
        <el-form-item label="价格" label-width="85px">
          <el-input v-model="editForm.Price" type="number" />
        </el-form-item>
        <el-form-item label="价格人民币" label-width="85px">
          <el-input v-model="editForm.PriceCny" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加行情" :visible.sync="addProductVisible">
      <el-form>
        <el-form-item label="币种" label-width="70px">
          <el-input v-model="addForm.Coin" />
        </el-form-item>
        <el-form-item label="计价币种" label-width="70px">
          <el-input v-model="addForm.PriceCoin" type="number" />
        </el-form-item>
        <el-form-item label="价格" label-width="85px">
          <el-input v-model="addForm.Price" type="number" />
        </el-form-item>
        <el-form-item label="价格人民币" label-width="85px">
          <el-input v-model="addForm.PriceCny" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/css/global.css'
import '@/assets/css/base.css'
import {
  list,
  getProduct,
  edit,
  add
} from '@/api/kline'
import {
  list as planList
} from '@/api/plan'
import waves from '@/directive/waves'
import permission from '@/directive/permission/index.js'

export default {
  name: 'RuleList',
  directives: {
    waves,
    permission
  },
  data() {
    return {
      tableData: [],
      planList: [],
      editProductVisible: false,
      addProductVisible: false,
      listLoading: true,
      editForm: {
        Id: 0,
        Coin: '',
        PriceCoin: '',
        Price: 0,
        PriceCny: ''
      },
      addForm: {
        Coin: '',
        PriceCoin: '',
        Price: 0,
        PriceCny: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listLoading = true
      list({}).then((res) => {
        this.tableData = res.data
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    edit(id) {
      getProduct({ Id: id }).then(res => {
        this.editForm = res.data
      })
      planList({}).then((res) => {
        this.planList = res.data
      })
      this.editForm.Id = id
      this.editProductVisible = true
    },
    handleEdit() {
      edit(this.editForm).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '产品已更新',
            type: 'success'
          })
          this.init()
          this.editProductVisible = false
        }
      })
    },
    add() {
      planList({}).then((res) => {
        this.planList = res.data
      })
      this.addProductVisible = true
    },
    handleAdd() {
      add(this.addForm).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '产品已添加',
            type: 'success'
          })
          this.init()
          this.addProductVisible = false
        }
      })
    }
  }
}
</script>
