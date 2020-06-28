<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="手机充值" name="first">
        <el-table
          v-loading="listLoading"
          :data="temp.phone"
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
          <el-table-column align="center" label="价格" width="95">
            <template slot-scope="scope">
              {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="容量" width="95">
            <template slot-scope="scope">
              {{ scope.row.volume }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="95">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="editHandle(scope.row)">
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="流量充值" name="second">
        <el-table
          v-loading="listLoading"
          :data="temp.flux"
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
          <el-table-column align="center" label="价格" width="95">
            <template slot-scope="scope">
              {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="容量" width="95">
            <template slot-scope="scope">
              {{ scope.row.volume }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="95">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="editHandle(scope.row)">
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!--    修改 start-->
    <!--    修改 end-->
    <el-dialog title="价格" :visible.sync="topUpFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="价格">
          <el-input-number v-model="editTemp.price" :min="1" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="edit()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created() {
    this.$store.dispatch('rechargeCards/getRechargeCardList').then(resolve => {
      const temp = Object.assign({}, this.rechargeCardList)
      this.temp = temp
      this.listLoading = false
    })
  },
  computed: {
    ...mapGetters(['rechargeCardList'])
  },
  data() {
    return {
      activeName: 'second',
      temp: {
        phone: [],
        flux: []
      },
      listLoading: true,
      editTemp: {
        id: undefined,
        price: undefined
      },
      topUpFormVisible: false
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    editHandle(row) {
      this.editTemp.id = row.id
      this.editTemp.price = row.price
      this.topUpFormVisible = true
    },
    edit() {
      this.$store.dispatch('rechargeCards/rechargeCardUpdate', this.editTemp).then(resolve => {
        this.topUpFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
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
