<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in noticeList" :key="item.id" :label="item.note" :name="item.note">
        <Tinymce ref="editor" v-model="item.val" :height="400" v-if="item.id !== 14"/>
        <el-input v-model="item.val" :height="400" v-if="item.id === 14"/>
        <el-row>
          <div class="dialog-footer el-dialog--center">
            <el-button type="primary" @click="edit(item)">
              确认
            </el-button>
          </div>
        </el-row>
        <keep-alive />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  computed: {
    ...mapGetters(['noticeList'])
  },
  data() {
    return {
      activeName: '11',
      createdTimes: 0
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    this.$store.dispatch('notices/getNoticeList')
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    edit(row) {
      const temp = Object.assign({}, row)
      this.$store.dispatch('notices/updateAction', temp).then(resolve => {
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
  .tab-container {
    margin: 30px;
  }
</style>
