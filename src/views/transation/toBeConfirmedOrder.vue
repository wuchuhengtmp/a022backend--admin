<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryList.username" placeholder="用户名" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="transactionPayingOrderList"
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
      <el-table-column align="center" label="买家" width="140">
        <template slot-scope="scope">
          {{ scope.row.buyername }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家等级" width="95">
        <template slot-scope="scope">
          {{ scope.row.buyer_user_level_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量" width="95">
        <template slot-scope="scope">
          {{ scope.row.total }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价" width="95">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手续费" width="95">
        <template slot-scope="scope">
          {{ scope.row.service_charges }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="总额" width="95">
        <template slot-scope="scope">
          {{ scope.row.total_price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="卖家" width="160">
        <template slot-scope="scope">
          {{ scope.row.payername }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="卖家等级" width="160">
        <template slot-scope="scope">
          {{ scope.row.payer_user_level_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付截图" width="160">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.thumb"
            :preview-src-list="[scope.row.thumb]"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.updated_at }}
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="transactionPayingOrderTotal > 0" :total="transactionPayingOrderTotal" :page.sync="queryList.page" :limit.sync="queryList.limit" @pagination="getPage" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  computed: {
    ...mapGetters([
      'transactionPayingOrderList',
      'transactionPayingOrderTotal'
    ])
  },
  created() {
    this.getPage()
  },
  data() {
    return {
      deleteDialogVisible: false,
      listLoading: true,
      queryList: {
        limit: 10,
        page: 1,
        type: 'beConfirm',
        username: undefined
      }
    }
  },
  methods: {
    handleFilter() {
      this.queryList.page = 1
      this.getPage()
    },
    getPage() {
      this.listLoading = true
      this.$store.dispatch('transaction/getTranSactionPayingOrderList', this.queryList).then((resolve) => {
        this.listLoading = false
      })
    },
    deleteHandle(row) {
      this.deleteDialogVisible = true
    },
    // 删除
    open(row) {
      this.$confirm('此操作将永久删除订单, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch('transaction/deleteAction', row.id).then((resolve) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
