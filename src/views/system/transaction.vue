<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>交易设置</span>
      </div>
      <el-form ref="dataForm" label-position="left" label-width="200px" style="max-width: 600px">
        <el-form-item v-for="item in temp" v-show="!dataIsLoading" :key="item.index" :label="item.note">
          <el-input-number v-if="item.id === 4" v-model="item.val" :min="-100" :max="100" />
          <el-input-number v-if="item.id === 6 " v-model="item.val" :min="0" :max="100" />
          <el-input-number v-if="item.id === 20 " v-model="item.val" :min="0" :max="100" />
        </el-form-item>
        <el-row>
          <div class="dialog-footer el-dialog--center">
            <el-button type="primary" @click="edit()">
              确认
            </el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['configurationList'])
  },
  created() {
    this.$store.dispatch('transaction/getConfigurationList').then(resolve => {
      const temp = Object.assign({}, this.configurationList)
      this.temp = temp
      this.dataIsLoading = false
    })
  },
  data() {
    return {
      dataIsLoading: true,
      temp: []
    }
  },
  methods: {
    edit() {
      const temp = Object.assign({}, this.temp)
      this.$store.dispatch('transaction/configurationUpdate', temp).then(resolve => {
        this.$notify({
          title: '成功',
          message: '编辑成功',
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
