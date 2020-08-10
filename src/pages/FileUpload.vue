<template>
  <q-page padding>
    <div class="q-pa-md">
        <q-uploader
          ref="uploader"
          :multiple=false
          :factory="uploadMultipleFiles"
          style="max-width: 300px"
        />
    </div>
     <q-select standout @input="selectionAdded" v-model="model" :options="options" label="Standout" />
     <q-btn type="submit" @click="fildown" label="Nahraj" class="q-mt-md" color="teal" />
     <q-btn type="submit" @click="listfiles" label="List" class="q-mt-md" color="teal" />
     <q-img ref='mainimage' :src="imgsource" />
  </q-page>
</template>

<script>
// import fs from 'fs'

export default {
  name: 'FileUp',
  data () {
    return {
      model: null,
      options: [],
      Storage_Link: this.$Storage,
      imgsource: 'https://commons.wikimedia.org/wiki/File:Don%27t_let_go.jpg'
    }
  },
  methods: {
    setKeys (fileList) {
      var fileNames = []
      fileList.forEach(element => {
        fileNames.push(element.key)
      })
      this.options = fileNames
    },
    listfiles () {
      this.$Storage.list('').then(result => this.setKeys(result)).catch(err => console.log(err))
    },
    fildown () {
      this.$Storage.get('hearth.png').then(result => { this.$refs.mainimage.src = result }).catch(err => console.log(err))
    },
    factTst (files) {
      return new Promise((resolve, reject) => {
        // var myUploader = this.$refs.uploader[0]
        var file = files[0]
        var fileSrc
        var fileData

        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onerror = err => console.error(`Failed to read file: ${err}`)
        reader.onload = function () {
          fileSrc = reader.result
          fileData = fileSrc.substr(fileSrc.indexOf(',') + 1)
          return fileData
        }
      })
    },
    updateProgress (num) {
      this.up_progress = num
    },
    oneFileUpload (file, uploaderRef) {
      return this.$Storage.put(file.name, file, {
        headers: { contentType: 'application/octet-stream' },
        progressCallback (progress) {
          uploaderRef.uploadedSize = progress.loaded
          if (progress.total !== progress.loaded) {
            console.log('uploading', uploaderRef.uploadedSize)
            uploaderRef.__updateFile(file, 'uploading', uploaderRef.uploadedSize)
          } else {
            console.log('UPLOADED')
            uploaderRef.__updateFile(file, 'uploaded')
          }
          console.log('Uploaded', progress.loaded / progress.total)
        }
      }).then((values) => {
        console.log('Uploaded file')
      }).catch((err) => {
        console.log('ERROR:', err)
      })
    },
    uploadMultipleFiles (file) {
      const promises = []

      var uploaderRef = this.$refs.uploader

      file.forEach(fileX => {
        promises.push(this.oneFileUpload(fileX, uploaderRef))
      })

      return Promise.all(promises)
    },
    selectionAdded (details) {
      console.log(details)
      this.$Storage.get(details).then(result => { this.$refs.mainimage.src = result }).catch(err => console.log(err))
    }
  }
}
</script>
