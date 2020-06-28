<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="uionLevelList"
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
      <el-table-column align="center" label="等级名称" width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="直推人数" width="95">
        <template slot-scope="scope">
          {{ scope.row.direct_extends }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户等级" width="95">
        <template slot-scope="scope">
          {{ levelId2Name(scope.row.user_level_id) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="3级内团队算力(G)" width="150">
        <template slot-scope="scope">
          {{ scope.row.group_computing_condition }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="活跃度" width="150">
        <template slot-scope="scope">
          {{ scope.row.actives }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="奖励品" width="95">
        <template slot-scope="scope">
          {{ goodsId2Title(scope.row.reward_goods_id) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量" width="95">
        <template slot-scope="scope">
          {{ scope.row.total }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分红" width="95">
        <template slot-scope="scope">
          {{ scope.row.bonus }} %
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="等级名称">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="直推人数">
          <el-input-number v-model="temp.direct_extends" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-select v-model="temp.user_level_id"
                     placeholder="用户等级"
                     clearable class="filter-item">
            <el-option v-for="item in userLevelList" :key="item.id" :label="item.level_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="团队算力(3级)">
          <el-input-number v-model="temp.group_computing_condition" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="活跃度">
          <el-input-number v-model="temp.actives" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="分红">
          <el-input-number v-model="temp.bonus" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="奖励商品">
          <el-select v-model="temp.reward_goods_id"
                     placeholder="选择奖励商品"
                     clearable class="filter-item">
            <el-option v-for="item in goodsList" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="奖励数量">
          <el-input-number v-model="temp.total" :min="0" ></el-input-number>
        </el-form-item>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="update()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "organization",
  computed: {
    ...mapGetters([
      'uionLevelList',
      'userLevelList',
      'goodsList'
    ])
  },
  filters: {
    levelNameFilter: function (value) {
      this.$store
      return 1
    }
  },
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      temp: {
        actives:0,
        direct_extends:1,
        goods_title:"体验矿机",
        group_computing_condition:1,
        id:1,
        name:"一级会长",
        reward_goods_id:1,
        total:1,
        user_level_id:1,
        bonus: undefined
      }
    }
  },
  created() {
    this.listLoading = true
      this.$store.dispatch('userLevel/getUserLevelList').then(() => {
        this.$store.dispatch('goods/getGoodsList').then(() => {
          this.$store.dispatch('unionLevel/getUionLevelList').then( () => {
          this.listLoading = false
        })
      })
    })
  },
  methods: {
    levelId2Name(userLevelId) {
      const index = this.userLevelList.findIndex(v => v.id === userLevelId)
      return this.userLevelList[index].level_name
    },
    goodsId2Title(goodsId) {
      const index = this.goodsList.findIndex(v => v.id === goodsId)
      return this.goodsList[index].title
    },
    handleUpdate(row) {
      this.temp = row
      this.dialogFormVisible = true
    },
    update()
    {
      this.$store.dispatch('unionLevel/uionLevelUpdate', this.temp).then(() => {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>
