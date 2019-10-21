<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves v-permission="['/plan/add']" class="filter-item" type="primary" @click="add()">
        <i class="el-icon-plus" />&nbsp;&nbsp;添加等级
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border>
      <el-table-column prop="Id" label="ID" align="center" width="100" />
      <el-table-column prop="Level" align="center" label="等级" />
      <el-table-column prop="Name" align="center" label="等级名称" />
      <el-table-column prop="ContinueTime" align="center" label="连续购买轮数" />
      <el-table-column prop="Products" align="center" label="连续购买产品" />

      <el-table-column v-permission="['/plan/edit']" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <div>
            <span v-permission="['/plan/edit']">
              <el-button size="small" type="primary" @click="edit(scope.row.Id, scope.row.ProductId)">
                编辑
              </el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑等级" :visible.sync="editLevelVisible">
      <el-form>
        <el-form-item label="等级名称" label-width="70px">
          <el-input v-model="editForm.Name" />
        </el-form-item>
        <el-form-item label="连续购买轮数" label-width="70px">
          <el-input v-model="editForm.ContinueTime" type="number" />
        </el-form-item>
        <el-form-item label="连续购买商品列表">
          <el-select v-model="ProductIds" multiple placeholder="请选择">
            <el-option
              v-for="item in ProductList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加等级" :visible.sync="addLevelVisible">
      <el-form>
        <el-form-item label="等级名称" label-width="70px">
          <el-input v-model="addForm.Name" />
        </el-form-item>
        <el-form-item label="连续购买轮数" label-width="70px">
          <el-input v-model="addForm.ContinueTime" type="number" />
        </el-form-item>
        <el-form-item label="连续购买商品列表">
          <el-select v-model="ProductIds" multiple placeholder="请选择">
            <el-option
              v-for="item in ProductList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
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
  detail,
  edit,
  add
} from '@/api/plan'
import {
  list as productList
} from '@/api/product'
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
      editLevelVisible: false,
      addLevelVisible: false,
      listLoading: true,
      ProductList: [],
      editForm: {
        Id: '',
        Name: '',
        ContinueTime: ''
      },
      addForm: {
        ContinueTime: '',
        Name: ''
      },
      ProductIds: []
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
    edit(id, pids) {
      detail({ Id: id }).then(res => {
        this.editForm = res.data
      })
      productList({}).then(res => {
        this.ProductList = res.data
      })
      this.ProductIds = JSON.parse(pids)
      this.editForm.Id = id
      this.editLevelVisible = true
    },
    handleEdit() {
      const ProductIds = JSON.stringify(this.ProductIds)
      this.editForm.ProductIds = ProductIds
      edit(this.editForm).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '预约等级已更新',
            type: 'success'
          })
          this.init()
          this.ProductIds = []
          this.editLevelVisible = false
        }
      })
    },
    add() {
      productList({}).then(res => {
        this.ProductList = res.data
      })
      this.addLevelVisible = true
    },
    handleAdd() {
      const ProductIds = JSON.stringify(this.ProductIds)
      this.addForm.ProductIds = ProductIds
      console.log(this.addForm)
      add(this.addForm).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '产品已添加',
            type: 'success'
          })
          this.init()
          this.ProductIds = []
          this.addLevelVisible = false
        }
      })
    }
  }
}
</script>
