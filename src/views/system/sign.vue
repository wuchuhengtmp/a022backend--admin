<template>
  <div class="app-container">
    <el-form label-position="left" label-width="200px" style="max-width: 600px">
      <el-form-item label="签到奖励">
        <el-input-number v-model="temp.sign_config" :min="0" :max="100" @change="edit" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['signConfig'])
  },
  created() {
    this.$store.dispatch('sign/getSignConfig').then(resolve => {
      const temp = Object.assign({}, this.signConfig)
      this.temp = temp
    })
  },
  data() {
    return {
      temp: {
        sign_config: undefined
      }
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('sign/updateAction', { val: this.temp.sign_config }).then(resolve => {
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
