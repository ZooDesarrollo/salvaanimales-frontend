<template>
  <div class="d-flex justify-center py-3">
    <v-sheet color="indigo lighten-4" width="50%" height="150"
      class="pa-2 rounded d-flex justify-center align-center dotted-border p-relative" @click="selectPhoto">
      <v-btn @click.stop.prevent="deleteImg()" v-show="showPreview" icon depressed absolute top right fab
        class="mt-5 mr-n7">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-icon size="80" v-show="!showPreview">mdi-camera-plus-outline</v-icon>
      <img :src="previewImg()" style="max-height: 100%;max-width: 100%" v-show="showPreview">
    </v-sheet>
    <input type="file" style="display:none;" id="uploadFile" @change="selectUploadType" accept="image/*">
  </div>
</template>

<script>
  export default {
    name: 'DragAndDropPhotoCard',
    props: {
      value: null,
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showPreview: false
      }
    },
    mounted() {},
    methods: {
      previewImg() {
        if (!this.multiple) {
          if (this.value != null && this.value.url) {
            return this.$axios.defaults.baseURL + this.value.url
          } else if (this.value != null) {
            return URL.createObjectURL(this.value)
          }
        }
      },
      selectPhoto(event) {
        uploadFile.click()
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        console.log(e)
        if (!files.length)
          return
        this.showPreview = true
        this.$emit('input', files[0])
        this.$forceUpdate()
      },
      onFileChangeMultiple(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length)
          return
        this.$emit('input', [...this.value, ...files])
      },
      selectUploadType(e) {
        if (this.multiple) {
          this.onFileChangeMultiple(e)
        } else {
          this.onFileChange(e)
        }
      },
      deleteImg() {
        this.showPreview = false
        this.$emit('input', {})
      },
    }
  }

</script>

<style scoped>
  .dotted-border {
    border: 1px solid;
    border-style: dotted;
  }

</style>
