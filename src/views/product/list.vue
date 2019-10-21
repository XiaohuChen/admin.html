<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves v-permission="['/product/add']" class="filter-item" type="primary" @click="add()">
        <i class="el-icon-plus" />&nbsp;&nbsp;添加产品
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border>
      <el-table-column prop="Id" label="ID" align="center" width="100" />
      <el-table-column prop="Name" align="center" label="产品名称" />
      <el-table-column prop="Number" align="center" label="投资数量" />
      <el-table-column prop="NeedLevel" align="center" label="预约等级" />
      <el-table-column prop="Ratio" align="center" label="收益比例" />
      <el-table-column label="是否开启" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.IsClose > 0">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>

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

    <el-dialog title="编辑产品" :visible.sync="editProductVisible">
      <el-form>
        <el-form-item label="产品名称" label-width="70px">
          <el-input v-model="editForm.Name" />
        </el-form-item>
        <el-form-item label="投资金额" label-width="70px">
          <el-input v-model="editForm.Number" type="number" />
        </el-form-item>
        <el-form-item label="日收益比例" label-width="85px">
          <el-input v-model="editForm.Ratio" type="number" />
        </el-form-item>

        <el-form-item label="预约等级">
          <el-select v-model="editForm.NeedLevel" placeholder="预约等级">
            <el-option v-for="(item, index) in planList" :key="index" :label="item.Level" :value="item.Level" />
          </el-select>
        </el-form-item>
        <el-form-item label="开启状态">
          <el-select v-model="editForm.IsClose" placeholder="开启状态">
            <el-option label="开启" :value="0" />
            <el-option label="关闭" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" label-width="70px">
          <el-input v-model="editForm.Sort" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加产品" :visible.sync="addProductVisible">
      <el-form>
        <el-form-item label="产品名称" label-width="70px">
          <el-input v-model="addForm.Name" />
        </el-form-item>
        <el-form-item label="投资金额" label-width="70px">
          <el-input v-model="addForm.Number" type="number" />
        </el-form-item>
        <el-form-item label="日收益比例" label-width="85px">
          <el-input v-model="addForm.Ratio" type="number" />
        </el-form-item>

        <el-form-item label="预约等级">
          <el-select v-model="addForm.NeedLevel" placeholder="预约等级">
            <el-option v-for="(item, index) in planList" :key="index" :label="item.Level" :value="item.Level" />
          </el-select>
        </el-form-item>
        <el-form-item label="开启状态">
          <el-select v-model="addForm.IsClose" placeholder="开启状态">
            <el-option label="开启" :value="0" />
            <el-option label="关闭" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" label-width="70px">
          <el-input v-model="addForm.Sort" type="number" />
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
} from '@/api/product'
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
        Name: '',
        Number: '',
        NeedLevel: 0,
        Ratio: '',
        IsClose: '',
        Sort: ''
      },
      addForm: {
        Name: '',
        Number: '',
        NeedLevel: 0,
        Ratio: '',
        IsClose: 0,
        Sort: ''
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
