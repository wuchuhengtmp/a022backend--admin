<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="userList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" width="130">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="70">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.avatar"
            :preview-src-list="[scope.row.avatar]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户手机" width="130">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="余额" width="130">
        <template slot-scope="scope">
          {{ scope.row.coint }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上级id" width="50">
        <template slot-scope="scope">
          {{ scope.row.pid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付宝" width="150">
        <template slot-scope="scope">
          {{ scope.row.alipay }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="实名状态" width="100">
        <template slot-scope="scope" >
          {{ scope.row.certification_msg }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="信誉分" width="80">
        <template slot-scope="scope">
          {{ scope.row.credit }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户等级" width="100">
        <template slot-scope="scope">
          {{ scope.row.userlevel }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公会等级" width="100">
        <template slot-scope="scope">
          {{ scope.row.union_level }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column type="expand" label="更多" width="50">
        <template slot-scope="scope">
          <el-form  inline >
            <el-form-item label="真实姓名">
              <span>{{ scope.row.real_name }}</span>
            </el-form-item>
          </el-form>
          <el-form  inline >
            <el-form-item label="卡号">
              <span>{{ scope.row.bank }}</span>
            </el-form-item>
          </el-form>
          <el-form  inline >
            <el-form-item label="银行">
              <span>{{ scope.row.bank_name }}</span>
            </el-form-item>
          </el-form>
          <el-form  inline >
            <el-form-item label="真实姓名">
              <span>{{ scope.row.real_name }}</span>
            </el-form-item>
          </el-form>
          <el-form  inline >
            <el-form-item label="地址">
              <span>{{ scope.row.address }}</span>
            </el-form-item>
          </el-form>
          <el-form  inline >
            <el-form-item label="虚拟钱包">
              <span>{{ scope.row.virtual_purse }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="450">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="topUpHandle(scope.row)" plain>
            充值
          </el-button>
          <el-button type="success" size="mini" @click="editHandle(scope.row)" plain>
            编辑
          </el-button>
          <el-button type="info" size="mini" @click="userLevelUpgradeHandle(scope.row)" plain>
            会员升级
          </el-button>
          <el-button type="warning" size="mini" @click="unionLevelUpgradeHandle(scope.row)" plain>
            工会升级
          </el-button>
          <el-button type="danger" size="mini" @click="deleteHandle(scope.row)" plain>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="userListTotal > 0" :total="userListTotal" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--充值界面 start -->
    <el-dialog title="充值" :visible.sync="topUpFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="金额">
          <el-input-number v-model="temp.topUp" :min="1" ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="topUp()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <!--充值界面 end -->
    <!-- 删除弹框 start-->
    <el-dialog
        title="删除"
        :visible.sync="deleteDialogVisible"
        width="30%"
        center>
        <span>您正在执行删除数据操作，是否继续?</span>
        <span slot="footer" class="dialog-footer">
      <el-button @click="deleteDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteAction">确 定</el-button>
    </span>
    </el-dialog>
    <!-- 删除弹框 start-->
    <!--   编辑 start-->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="30%"
      center>
      <el-form
        :rules="rules"
        :model="temp"
        ref="userEditForm"
        label-position="left"
        label-width="70px" >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="支付宝">
          <el-input v-model="temp.alipay" />
        </el-form-item>
        <el-form-item label="信誉分">
          <el-input v-model="temp.credit" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="temp.address" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="edit">
          确认
        </el-button>
      </div>
    </el-dialog>
    <!--   编辑 end-->
    <!-- 会员升级 start -->
    <el-dialog
      :title="popupTitle"
      :visible.sync="upgradeLevelDialogVisible"
      width="30%"
      center>
      <el-form
        :rules="rules"
        :model="temp"
        ref="userEditForm"
        label-position="left"
        label-width="70px" >
        <el-form-item label="会员等级">
          <el-select v-model="temp.user_level_id"
                     placeholder="选择会员等级"
                     clearable class="filter-item"
                     @change="userLevelChange"
                     style="width: 130px">
            <el-option v-for="item in userLevelList" :label="item.level_name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="userLevelUpgrade">
          确认
        </el-button>
      </div>
    </el-dialog>
    <!-- 会员升级 end -->
    <!--- 工会升级 start -->
    <el-dialog
      title="工会升级"
      :visible.sync="upgradeUnionLevelDialogVisible"
      width="30%"
      center>
      <el-form
        :rules="rules"
        :model="temp"
        ref="userEditForm"
        label-position="left"
        label-width="70px" >
        <el-form-item label="工会等级">
          <el-select v-model="temp.union_level_id"
                     placeholder="选择会员等级"
                     clearable class="filter-item"
                     @change=unionLevelChange>
            <el-option v-for="item in uionLevelList" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="unionLevelUpgrad">
          确认
        </el-button>
      </div>
    </el-dialog>
    <!--- 工会升级 end -->
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  created() {
    this.getList()
  },
  data() {
    function checkPhone(rule, value, callback) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    }
    return {
      popupTitle: undefined,
      upgradeUnionLevelDialogVisible: false,
      upgradeLevelDialogVisible: false,
      listLoading: false,
      deleteDialogVisible: false,
      editDialogVisible: false,
      topUpFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        username: undefined,
        type: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        coint: undefined,
        topUp: 0,
        acitves: 0,
        address: undefined,
        alipay: undefined,
        bank: undefined,
        bank_name: undefined,
        certification_status: undefined,
        credit: undefined,
        union_level_id: undefined,
        user_level_id: undefined,
        username: undefined,
        virtual_purse: undefined
      },
      rules: {
        phone: [{ trigger: 'change', validator: checkPhone }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userList',
      'userListTotal',
      'uionLevelList',
      'userLevelList'
    ])
  },
  methods: {
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 获取用户列表
    getList() {
      this.loading = true
      this.$store.dispatch('unionLevel/getUionLevelList').then(() => {
        this.$store.dispatch('userLevel/getUserLevelList').then(() => {
          this.$store.dispatch('user/getUserList', this.listQuery).then(() => {
            this.loading = false
          })
        })
      })
    },
    topUpHandle(row) {
      this.temp.id = row.id
      this.topUpFormVisible = true
    },
    topUp() {
      const { id, topUp } = this.temp
      this.$store.dispatch('user/topUp', { id, topUp}).then(() => {
        this.topUpFormVisible = false
        this.$notify({
          title: '成功',
          message: '充值成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    deleteHandle(row) {
      this.temp.id = row.id
      this.deleteDialogVisible = true
    },
    deleteAction()
    {
      this.deleteDialogVisible = false
      this.$store.dispatch('user/delete', this.temp.id).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    editHandle(row) {
      this.temp = row
      this.editDialogVisible = true
    },
    edit() {
      this.$refs.userEditForm.validate(valid => {
        if (valid) {
          const { id, username, phone, alipay, credit, address } = this.temp
          this.$store.dispatch('user/update', { id, username, phone, alipay, credit, address }).then(() => {
            this.editDialogVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    userLevelUpgradeHandle(row) {
      this.popupTitle = '会员升级'
      this.temp.user_level_id = row.user_level_id
      this.temp.id = row.id
      if (this.userLevelList.length === 0 ) {
        this.$store.dispatch('userLevel/getUserLevelList').then(() => {
          this.upgradeLevelDialogVisible = true
        })
      } else {
        this.upgradeLevelDialogVisible = true
      }
    },
    userLevelChange(value) {
      this.temp.user_level_id = value
    },
    userLevelUpgrade() {
      const { id, user_level_id } = this.temp
      this.$store.dispatch('user/userLevelUpgrade', { id, user_level_id }).then(() => {
        const levelIndex = this.userLevelList.findIndex(v => v.id === this.temp.user_level_id)
        const levelname = this.userLevelList[levelIndex].level_name
        // 更新当条用户信息
        this.$store.dispatch('user/updateUserLevel', {id: this.temp.id, levelName: levelname, userLevelId: this.temp.user_level_id })
        this.upgradeLevelDialogVisible = false
      })
    },
    unionLevelUpgradeHandle(row) {
      this.temp.id = row.id
      this.temp.union_level_id = row.union_level_id
      if (this.uionLevelList.length === 0 ) {
        this.$store.dispatch('unionLevel/getUionLevelList').then(() => {
          this.upgradeUnionLevelDialogVisible = true
        })
      } else {
        this.upgradeUnionLevelDialogVisible = true
      }
    },
    unionLevelChange(value) {
      this.temp.union_level_id = value
    },
    unionLevelUpgrad() {
      const unionLevelIndex = this.uionLevelList.findIndex(v => v.id === this.temp.union_level_id)
      const unionLevelname = this.uionLevelList[unionLevelIndex].name
      const unionlevelInfo = {id: this.temp.id, unionLevelname : unionLevelname , unionLevelId: this.temp.union_level_id}
      this.$store.dispatch('user/uionLevelUpgrade', unionlevelInfo).then(() => {
        this.upgradeUnionLevelDialogVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>
