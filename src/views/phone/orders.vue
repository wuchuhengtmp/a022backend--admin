<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="rechargeCardOrderList"
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
      <el-table-column align="center" label="标题" width="150">
        <template slot-scope="scope">
          {{ scope.row.volume }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" width="150">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机" width="150">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="95">
        <template slot-scope="scope">
          {{ scope.row.status | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain @click="open(scope.row)">
            确认
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  filters: {
    statusFilter: val => {
      switch (val) {
        case 0:
          return '待充值'
        case 1:
          return '已充值'
      }
    }
  },
  computed: {
    ...mapGetters(['rechargeCardOrderList'])
  },
  created() {
    this.$store.dispatch('rechargeCardOrders/getRechargeCardOrders').then(resolve => {
      this.listLoading = false
    })
  },
  data() {
    return {
      listLoading: true
    }
  },
  methods: {
    open(row) {
      this.$confirm('此操作将标记订单为已充值, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const temp = {
          id: row.id,
          status: 1
        }
        this.$store.dispatch('rechargeCardOrders/updasteRecargeCardOrder', temp).then((resolve) => {
          this.$message({
            type: 'success',
            message: '成功!'
          })
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>

</style>
