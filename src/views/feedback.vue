<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="feedbackList"
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
      <el-table-column align="center" label="姓名" width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机" width="195">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容" width="195">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" width="190">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'feedbackList',
      'feedbackTotal'
    ])
  },
  created() {
    this.$store.dispatch('feedback/getFeedbackList').then(resolve => {
      this.listLoading = false
    })
  },
  data() {
    return {
      listLoading: true
    }
  },
}
</script>

<style scoped>

</style>
