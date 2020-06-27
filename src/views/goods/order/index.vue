<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="orderList"
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
      <el-table-column align="center" label="编号" width="130">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员" width="130">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="130">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="已收益" width="130">
        <template slot-scope="scope">
          {{ scope.row.coint }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="130">
        <template slot-scope="scope">
          {{ scope.row.pirce }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="130">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.limited_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="orderTotal > 0" :total="orderTotal" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPage" />

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Order',
  components: { Pagination },
  computed: {
    ...mapGetters([
      'orderList',
      'orderTotal'
    ])
  },
  created() {
    this.getPage()
  },
  data() {
    return {
      listLoading: true,
      listQuery: {
        limit: 10,
        page: 1
      }
    }
  },
  methods: {
    getPage() {
      this.listLoading = true
      this.$store.dispatch('order/getOrderList', this.listQuery).then(resolve => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
