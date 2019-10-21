<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves v-permission="['/community/add']" class="filter-item" type="primary" @click="add()">
        <i class="el-icon-plus" />&nbsp;&nbsp;添加等级
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border>
      <el-table-column prop="Id" label="ID" align="center" width="100" />
      <el-table-column prop="Name" label="等级名称" align="center" width="100" />
      <el-table-column prop="InviteNumber" align="center" label="有效直推数量" />
      <el-table-column prop="Achive" align="center" label="伞下业绩" />
      <el-table-column prop="PlanLevel" align="center" label="预约等级" />
      <el-table-column prop="HasLevel" align="center" label="5代内出现社区等级" />
      <el-table-column prop="Ratio" align="center" label="社区收益比例" />
      <el-table-column label="全球分红" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.World > 0">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <div>
            <span v-permission="['/community/edit']">
              <el-button size="small" type="primary" @click="edit(scope.row.Id)">
                编辑
              </el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑等级" :visible.sync="editCommunityVisible">
      <el-form>
        <el-form-item label="等级" label-width="70px">
          <el-input v-model="editForm.Level" type="number" />
        </el-form-item>
        <el-form-item label="等级名称" label-width="70px">
          <el-input v-model="editForm.Name" />
        </el-form-item>
        <el-form-item label="有效直推数" label-width="85px">
          <el-input v-model="editForm.InviteNumber" type="number" />
        </el-form-item>
        <el-form-item label="伞下业绩" label-width="85px">
          <el-input v-model="editForm.Achive" type="number" />
        </el-form-item>
        <el-form-item label="五代内出现社区等级">
          <el-select v-model="editForm.HasLevel" placeholder="五代内出现社区等级">
            <el-option label="无" :value="0" />
            <el-option v-for="(item, index) in tableData" :key="index" :label="item.Name" :value="item.Level" />
          </el-select>
        </el-form-item>
        <el-form-item label="预约等级">
          <el-select v-model="editForm.PlanLevel" placeholder="预约等级">
            <el-option v-for="(item, index) in planList" :key="index" :label="item.Level" :value="item.Level" />
          </el-select>
        </el-form-item>
        <el-form-item label="全球分红">
          <el-select v-model="editForm.World" placeholder="预约等级">
            <el-option label="否" :value="0" />
            <el-option label="是" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="社区收益(1为100%)" label-width="85px">
          <el-input v-model="editForm.Ratio" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加等级" :visible.sync="addCommunityVisible">
      <el-form>
        <el-form-item label="等级" label-width="70px">
          <el-input v-model="addForm.Level" type="number" />
        </el-form-item>
        <el-form-item label="等级名称" label-width="70px">
          <el-input v-model="addForm.Name" />
        </el-form-item>
        <el-form-item label="有效直推数" label-width="85px">
          <el-input v-model="addForm.InviteNumber" type="number" />
        </el-form-item>
        <el-form-item label="伞下业绩" label-width="85px">
          <el-input v-model="addForm.Achive" type="number" />
        </el-form-item>
        <el-form-item label="五代内出现社区等级">
          <el-select v-model="addForm.HasLevel" placeholder="五代内出现社区等级">
            <el-option label="无" :value="0" />
            <el-option v-for="(item, index) in tableData" :key="index" :label="item.Name" :value="item.Level" />
          </el-select>
        </el-form-item>
        <el-form-item label="预约等级">
          <el-select v-model="addForm.PlanLevel" placeholder="预约等级">
            <el-option v-for="(item, index) in planList" :key="index" :label="item.Level" :value="item.Level" />
          </el-select>
        </el-form-item>
        <el-form-item label="全球分红">
          <el-select v-model="addForm.World" placeholder="预约等级">
            <el-option label="否" :value="0" />
            <el-option label="是" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="社区收益(1为100%)" label-width="85px">
          <el-input v-model="addForm.Ratio" type="number" />
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
  edit,
  getLevel,
  add
} from '@/api/community'
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
      listLoading: true,
      editCommunityVisible: false,
      addCommunityVisible: false,
      planList: [],
      editForm: {
        Level: '',
        Name: '',
        InviteNumber: '',
        Achive: '',
        HasLevel: '',
        PlanLevel: '',
        World: '',
        Ratio: ''
      },
      addForm: {
        Level: '',
        Name: '',
        InviteNumber: '',
        Achive: '',
        HasLevel: 0,
        PlanLevel: 0,
        World: 0,
        Ratio: ''
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
      getLevel({ Id: id }).then(res => {
        this.editForm = res.data
      })
      planList({}).then((res) => {
        this.planList = res.data
      })
      this.editForm.Id = id
      this.editCommunityVisible = true
    },
    handleEdit() {
      edit(this.editForm).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '社区等级已修改',
            type: 'success'
          })
          this.init()
          this.editCommunityVisible = false
        }
      })
    },
    add() {
      planList({}).then((res) => {
        this.planList = res.data
      })
      this.addCommunityVisible = true
    },
    handleAdd() {
      add(this.addForm).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '社区等级已添加',
            type: 'success'
          })
          this.init()
          this.addCommunityVisible = false
        }
      })
    }
  }
}
</script>
