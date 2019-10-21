<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input v-model="listQuery.keywords" placeholder="关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
    </div>

    <!-- <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="btnHelpAdd()">
        <i class="el-icon-plus" />&nbsp;&nbsp;添加问答
      </el-button>
    </div> -->

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="问题" align="center">
        <template slot-scope="scope">
          {{ scope.row.Question }}
        </template>
      </el-table-column>
      <el-table-column label="答案" align="center">
        <template slot-scope="scope">
          {{ scope.row.Answer }}
        </template>
      </el-table-column>
      <el-table-column label="提问时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.AskTimeName }}
        </template>
      </el-table-column>
      <el-table-column label="回答时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.AnswerTimeName }}
        </template>
      </el-table-column>

      <el-table-column v-permission="['/help/helpUpdate','/help/helpDelete']" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <div>
            <span v-permission="['/help/helpUpdate']">
              <el-button size="small" type="primary" @click="helpUpdateHandle(scope.row)">编辑</el-button>
            </span>
            <span v-permission="['/help/helpDelete']">
              <el-button size="small" type="primary" @click="confirmDelete(scope.row)">删除</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="添加问答" :visible.sync="HelpAddVisible">
      <el-form>
        <el-form-item label="问题" label-width="70px">
          <el-input v-model="submitdata.question" />
        </el-form-item>

        <el-form-item label="答案" label-width="70px">
          <el-input v-model="submitdata.answer" type="textarea" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改问答" :visible.sync="HelpEditVisible">
      <el-form>
        <el-form-item label="问题" label-width="70px">
          <el-input v-model="updateData.question" />
        </el-form-item>

        <el-form-item label="答案" label-width="70px">
          <el-input v-model="updateData.answer" type="textarea" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { memberHelpList, getMemberHelp, memberHelpUpdate, memberHelpDelete } from '@/api/help.js'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
import Upload from '@/components/Upload/SingleImage3'

export default {
  components: { Pagination, Upload },
  directives: { waves, permission },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },

      HelpAddVisible: false,
      submitdata: {
        question: '',
        answer: ''
      },

      HelpEditVisible: false,
      updateData: {
        question: '',
        answer: '',
        id: 0
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      memberHelpList(this.listQuery).then(res => {
        if (res.code == 20000) {
          this.list = res.data.data
          this.total = res.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 0.3 * 1000)
        } else {
          this.listLoading = true
        }
      })
    },

    // 显示会员添加界面
    btnHelpAdd() {
      this.submitdata.question = ''
      this.submitdata.answer = ''
      this.HelpAddVisible = true
    },

    // 上传数据
    handleAdd() {
      helpAdd(this.submitdata).then(res => {
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
          this.submitdata.question = ''
          this.submitdata.answer = ''
          this.HelpAddVisible = false
        }
      })
    },

    // 修改banner页面
    helpUpdateHandle(row) {
      this.HelpEditVisible = true
      this.updateData.id = row.Id
      getMemberHelp(row.Id).then(res => {
        if (res.code == 20000) {
          this.updateData.question = res.data.Question
          this.updateData.answer = res.data.Answer
        } else {
          this.updateData.image = row.Image
          this.updateData.sort = row.Sort
        }
      })
    },

    // 修改编辑
    handleEdit() {
      console.log(this.updateData)
      memberHelpUpdate(this.updateData).then(res => {
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.HelpEditVisible = false
          this.getList()
        }
      })
    },

    // 删除问答
    confirmDelete(row) {
      this.$confirm('确认删除该问答?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        memberHelpDelete(row.Id).then(res => {
          this.getList()
          this.$message({
            message: '问答删除成功',
            type: 'success'
          })
        })
      }).catch(() => {

      })
    }

  }
}
</script>

