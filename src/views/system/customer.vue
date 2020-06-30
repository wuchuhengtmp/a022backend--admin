<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="官方微信" name="first">
        <el-upload
          v-show="load"
          :action="uploadUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :limit="1"
          :file-list="files"
          name="image"
          :on-remove="handleRemove"
          :on-success="onSuccess"
          auto-upload
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="普通用户客服" name="second">
        <el-upload
          v-show="load"
          :action="uploadUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :limit="1"
          name="image"
          :file-list="files"
          :on-remove="handleRemove"
          :on-success="onSuccess"
          upload
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      activeName: 'first',
      uploadUrl: undefined,
      files: [],
      load: false
    }
  },
  created() {
    this.uploadUrl = process.env.VUE_APP_BASE_API + '/images'
    this.$store.dispatch('customer/getCustomerList').then(resolve => {
      this.files = [{
        id: this.customerList[0].id,
        name: this.customerList[0].name,
        url: this.customerList[0].thumb
      }]
      this.load = true
    })
  },
  computed: {
    ...mapGetters(['customerList'])
  }, methods: {
    handleRemove(file, fileList) {
      // this.files = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleClick(tab, event) {
      if (tab.name === 'first') {
        this.files = [{
          id: this.customerList[0].id,
          name: this.customerList[0].name,
          url: this.customerList[0].thumb
        }]
        this.load = true
      } else {
        this.files = [{
          id: this.customerList[1].id,
          name: this.customerList[1].name,
          url: this.customerList[1].thumb
        }]
        this.load = true
      }
    },
    onSuccess(response, file, fileList) {
      const { data } = response
      const queyrList = {
        val: data.thumb_id,
        url: data.url,
        id: this.files[0].id
      }
      this.$store.dispatch('customer/updateCustomer', queyrList).then(resolve => {
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
