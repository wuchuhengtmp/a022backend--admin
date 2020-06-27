<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="certificationList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="90">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="130">
        <template slot-scope="scope">
          {{ scope.row.real_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付宝" width="150">
        <template slot-scope="scope">
          {{ scope.row.alipay }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="银行卡号" width="150">
        <template slot-scope="scope">
          {{ scope.row.bank }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份号" width="190">
        <template slot-scope="scope">
          {{ scope.row.id_car }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="认证图片" width="90">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.certificationThumb"
            :preview-src-list="[scope.row.certificationThumb]"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="认证图片" width="90">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" plain @click="open(scope.row)">
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Certification',
  computed: {
    ...mapGetters([
      'certificationList',
      'certificationTotal'
    ])
  },
  created() {
    this.getPage()
  },
  data() {
    return {
      listLoading: true
    }
  },
  methods: {
    getPage() {
      this.listLoading = true
      this.$store.dispatch('certification/getCertificationList').then(resolve => {
        this.listLoading = false
      })
    },
    // 删除
    open(row) {
      const queryList = {}
      queryList.id = row.id
      this.$confirm('此操作将立即生效, 是否继续?', '警告', {
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        type: 'warning',
        center: true
      }).then(() => {
        queryList.certification_status = 2
        this.$store.dispatch('certification/updateCertification', queryList).then((resolve) => {
          this.$message({
            type: 'success',
            message: '审核通过!'
          })
        })
      }).catch(() => {
        queryList.certification_status = 0
        this.$store.dispatch('certification/updateCertification', queryList).then((resolve) => {
          this.$message({
            type: 'info',
            message: '审核不通过!'
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
