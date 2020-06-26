<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="goodsList"
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
      <el-table-column align="center" label="标题" width="95">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="70">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.thumb"
            :preview-src-list="[scope.row.thumb]"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存" width="70">
        <template slot-scope="scope">
          {{ scope.row.total }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="产出(GOB/小时)" width="140">
        <template slot-scope="scope">
          {{ scope.row.output }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="算力" width="70">
        <template slot-scope="scope">
          {{ scope.row.computing }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="限购量" width="70">
        <template slot-scope="scope">
          {{ scope.row.limit_sales }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="售价" width="70">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="运行时长(小时)" width="140">
        <template slot-scope="scope">
          {{ scope.row.time_limit }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="success" size="mini" plain @click="editHandle(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    编辑 start-->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="标题">
          <thumb :thumb-info="temp.thumbInfo" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input-number v-model="temp.total" :min="1" />
        </el-form-item>
        <el-form-item label="产出">
          <el-input-number v-model="temp.output" :min="0" />
        </el-form-item>
        <el-form-item label="限购量">
          <el-input-number v-model="temp.limit_sales" :min="1" />
        </el-form-item>
        <el-form-item label="售价">
          <el-input-number v-model="temp.price" :min="1" />
        </el-form-item>
        <el-form-item label="运行时长">
          <el-input-number v-model="temp.time_limit" :min="1" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer el-dialog--center">
        <el-button type="primary" @click="edit()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <!--    编辑 end-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Thumb from '@/components/Upload/Thumb'

export default {
  components: {
    Thumb
  },
  provide() {
    return {
      elMiner: this
    }
  },
  created() {
    this.$store.dispatch('goods/getGoodsList')
  },
  computed: {
    ...mapGetters(['goodsList'])
  },
  data() {
    return {
      listLoading: false,
      editFormVisible: false,
      temp: {
        computing: undefined,
        created_at: undefined,
        id: undefined,
        limit_sales: undefined,
        thumb: undefined,
        output: undefined,
        price: undefined,
        thumb_id: undefined,
        time_limit: undefined,
        title: undefined,
        total: undefined,
        thumbInfo: undefined
      }
    }
  },
  methods: {
    editHandle(row) {
      this.temp = Object.assign({}, row)
      this.temp.thumbInfo = [{
        thumbId: this.temp.thumb_id,
        name: this.temp.thumb.split('/').pop(),
        url: this.temp.thumb
      }]
      this.editFormVisible = true
    },
    edit() {
      this.$store.dispatch('goods/update', this.temp).then(() => {
        this.editFormVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    thumbChange(val) {
      this.temp.thumb_id = val.thumb_id
      this.temp.thumb = val.url
    }
  }
}
</script>

<style scoped>

</style>
