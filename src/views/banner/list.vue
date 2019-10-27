<template>
  <div class="app-container">


    <div class="filter-container">
      <el-input v-model="listQuery.keywords" placeholder="关键字" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="add()">
        <i class="el-icon-plus" />&nbsp;&nbsp;添加banner图
      </el-button>
    </div>



    <el-table :key="tableKey" v-loading="listLoading" :data="bannerlist" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.Title" />
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.Image">
            <img :src="qiniu.Domain + scope.row.Image" width="50px">
          </span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.Sort" />
        </template>
      </el-table-column>

      <el-table-column v-permission="['/bannerNotice/bannerUpdate','/bannerNotice/bannerDelete']" label="操作" width="200"
        align="center">
        <template slot-scope="scope">
          <div>
            <span v-permission="['/bannerNotice/bannerUpdate']">
              <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
            </span>
            <span v-permission="['/bannerNotice/bannerDelete']">
              <el-button size="small" type="primary" @click="confirmDelete(scope.row)">删除</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />


    <el-dialog title="添加/编辑banner图" :visible.sync="show">
      <el-form>
        <el-form-item label="标题" label-width="70px">
          <el-input v-model="item.Title" />
        </el-form-item>

        <el-form-item label="图片" label-width="100px">
          <el-upload class="avatar-uploader" action="https://up-z2.qiniup.com" :show-file-list="false" :on-success="handleAvatarSuccess"
            :data="{ token: qiniu.Token }">
            点击更换
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="排序" label-width="70px">
          <el-input v-model="item.Sort" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle()">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {
    bannerList,
    bannerAdd,
    bannerUpdate,
    getBanner,
    bannerDelete
  } from '@/api/bannerNotice.js'
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
        bannerlist: null,
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          keywords: ''
        },
        qiniu: {},
        imageUrl: '',
        item: {},
        show: false,
      }
    },
    created() {
      this.qiniuGet();
      this.getList();
    },
    methods: {
      qiniuGet() {
        qiniuToken().then(res => {
          this.qiniu = res.data;
          console.log(res.data);
        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.item.Image = res.key;
      },
      getList() {
        this.listLoading = true
        bannerList(this.listQuery).then(res => {
          if (res.code == 20000) {
            this.bannerlist = res.data.data
            this.total = res.data.total
            setTimeout(() => {
              this.listLoading = false
            }, 0.3 * 1000)
          } else {
            this.listLoading = true
          }
        })
      },

      edit(item) {
        this.item = item;
        this.imageUrl = this.qiniu.Domain + item.Image;
        this.show = true;
      },

      add() {
        this.imageUrl = '';
        this.item = {};
        this.show = true;
      },

      handle() {
        bannerUpdate(this.item).then(res => {
          if (res.code == 20000) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.show = false;
            this.getList();
          }
        })
      },

      // 删除分类
      confirmDelete(row) {
        this.$confirm('确认删除该分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bannerDelete(row.Id).then(res => {
            this.getList()
            this.$message({
              message: 'banner图删除成功',
              type: 'success'
            })
          })
        }).catch(() => {

        })
      }

    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    margin-left: 20px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
    height: 250px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 198px;
    height: 198px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 190px;
    height: 190px;
    display: block;
  }
</style>
