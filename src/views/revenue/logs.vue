<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryList.username" placeholder="用户名" style="width: 200px;" class="filter-item" />
      <el-select v-model="queryList.type" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in [{label: '全部', value: 0}, {label: '收入', value: 2}, {label: '支出', value: 1}]" :key="item.key" :label="item.label" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="revenueLogList"
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
      <el-table-column align="center" label="账号" width="130">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="130">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1" type="warining">支出</el-tag>
          <el-tag v-if="scope.row.type === 2" type="success">收入</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额" width="130">
        <template slot-scope="scope">
          {{ scope.row.coint }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" width="200">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="余额" width="130">
        <template slot-scope="scope">
          {{ scope.row.user_coint }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="revenueLogTotal > 0" :total="revenueLogTotal" :page.sync="queryList.page" :limit.sync="queryList.limit" @pagination="getPage" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  computed: {
    ...mapGetters([
      'revenueLogList',
      'revenueLogTotal'
    ])
  },
  created() {
    this.getPage()
  },
  data() {
    return {
      listLoading: true,
      queryList: {
        limit: 10,
        page: 1,
        username: '',
        type: 0
      }
    }
  },
  methods: {
    // 搜索
    handleFilter() {
      this.queryList.page = 1
      this.getPage()
    },
    getPage() {
      this.listLoading = true
      this.$store.dispatch('revenueLogs/getRevenueLogList', this.queryList).then(resolve => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
