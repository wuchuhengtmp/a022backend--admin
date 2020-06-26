<template>
  <div>
    <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      name="image"
      :limit="1"
      :file-list="files"
      :auto-upload="true"
      :on-change="onSuccess"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
        >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Thumb',
  props: {
    thumbInfo: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      temp: [],
      files: [],
      uploadUrl: undefined
    }
  },
  watch: {
    thumbInfo: function(val) {
      this.files = this.thumbInfo
    }
    // files: function(val) {
    //   console.log(13131)
    //   this.elMiner.thumbChange(val)
    // }
  },
  inject: ['elMiner'],
  created() {
    this.uploadUrl = process.env.VUE_APP_BASE_API + '/images'
    this.files = this.thumbInfo
  },
  methods: {
    handleRemove(file) {
      const index = (this.files.indexOf(file))
      this.files.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    onSuccess(response, file, fileList) {
      if (response.hasOwnProperty('response')) {
        console.dir(file)
        this.elMiner.thumbChange(response.response.data)
      }
    }
  }
}
</script>

<style scoped>

</style>
