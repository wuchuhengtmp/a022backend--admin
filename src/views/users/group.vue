<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="userLevelList.items"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="会员组名称" width="110">
        <template slot-scope="scope">
          {{ scope.row.level_name }}
        </template>
      </el-table-column>
      <el-table-column label="直推人数" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.direct_extends }}</span>
        </template>
      </el-table-column>
      <el-table-column label="团队人数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.number_of_group }}
        </template>
      </el-table-column>
      <el-table-column label="算力" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.computing_condition }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="活跃度" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.number_of_activation}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="奖励的商品" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="奖励的数量" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.total}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="是否默认" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.is_default}}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="会员名称" prop="level_name">
          <el-input v-model="temp.level_name" />
        </el-form-item>
        <el-form-item label="直推人数" prop="direct_extends">
          <el-input-number v-model="temp.direct_extends" :min="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="团队人数" prop="number_of_group">
          <el-input-number v-model="temp.number_of_group" :min="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="算力" prop="computing_condition">
          <el-input-number v-model="temp.computing_condition" :min="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="活跃度" prop="number_of_activation">
          <el-input-number v-model="temp.number_of_activation" :min="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="奖励商品" prop="reward_goods_id">
          <el-select v-model="temp.reward_goods_id"
                     placeholder="选择商品"
                     clearable class="filter-item"
                     @change="changeGoods"
                     style="width: 130px">
            <el-option v-for="item in goodsList" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="奖励数量" prop="reward_goods_id">
          <el-input-number v-model="temp.total" :min="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="默认等级" prop="reward_goods_id">
          <el-switch
            v-model="temp.is_default == 1 ? true : false"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      temp: {
        computing_condition: undefined,
        direct_extends: undefined,
        goods_title: undefined,
        reward_goods_id: undefined,
        id: undefined,
        is_default: undefined,
        level_name: undefined,
        number_of_activation: undefined,
        number_of_group: undefined,
        total: undefined
      },
      goods_list: undefined,
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'goodsList',
      'userLevelList'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.$store.dispatch('userLevel/getUserLevelList').then(() => {
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      // const index = this.userLevelList.items.findIndex(v => v.id === row.id)
      this.temp = Object.assign({}, row) // copy obj
      this.$store.dispatch('goods/getGoodsList').then(() => {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    changeGoods(value) {
      const index = value - 1
      this.temp.goods_title = this.goodsList[index].title
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('userLevel/updateUserLevel', this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
