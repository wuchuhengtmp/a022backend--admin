<template>
  <div class="app-container">
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

      <el-table-column align="center" label="实名状态" width="130">
        <template slot-scope="scope" >
          {{ scope.row.certification_msg }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="信誉分" width="100">
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
      <el-table-column type="expand" label="更多">
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
      <el-table-column align="center" prop="created_at" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="topUpHandle(scope.row)" plain>
            充值
          </el-button>
          <el-button type="success" size="mini" @click="handleUpdate(scope.row)" plain>
            充值
          </el-button>
          <el-button type="danger" size="mini" @click="handleUpdate(scope.row)" plain>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      listLoading: false,
      topUpFormVisible: false,
      temp: {
        id: undefined,
        coint: undefined,
        topUp: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'userList',
      'userListTotal'
    ])
  },
  mounted() {
    this.$store.dispatch('user/getUserList').then(() => {
      this.loading = true
    })
  },
  methods: {
    handleUpdate(row) {
      debugger
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
    }
  }
}
</script>

<style scoped>

</style>
