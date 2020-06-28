<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="ruleList"
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
      <el-table-column align="center" label="标题" width="180">
        <template slot-scope="scope">
          {{ scope.row.title }}
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

    <!--充值界面 start -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 800x; margin-left:50px;">
        <el-form-item label="标题">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="内容">
          <tinymce v-model="temp.content" height="200" />
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
import Tinymce from '@/components/Tinymce'

export default {
  components: {
    Tinymce
  },
  computed: {
    ...mapGetters([
      'ruleList'
    ])
  },
  created() {
    this.$store.dispatch('rules/getRuleList').then(resolve => {
      this.listLoading = false
    })
  },
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      temp: {
        id: undefined,
        title: undefined,
        content: undefined
      }
    }
  },
  methods: {
    editHandle(row) {
      const temp = Object.assign({}, row)
      this.temp = temp
      this.dialogFormVisible = true
    },
    edit() {
      this.$store.dispatch('rules/updateAction', this.temp).then(resolve => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
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
