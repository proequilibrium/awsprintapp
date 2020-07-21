<template>
  <q-page padding>
    <div class="q-pa-md">
        {{ up_progress }}
        <q-uploader
          ref="uploader"
          :multiple=false
          :factory="factoryFn"
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
      imgsource: 'https://commons.wikimedia.org/wiki/File:Don%27t_let_go.jpg',
      up_progress: 0
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
    filup () {
      this.$Storage.put('textik_file.txt', 'Ty pico fakci to', {
        contentType: 'text/plain'
      })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    },
    fildown () {
      this.$Storage.get('srdce.png').then(result => { this.$refs.mainimage.src = result }).catch(err => console.log(err))
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
    factoryFn (file) {
      var fileA = file[0]
      var uploaderRef = this.$refs.uploader
      return this.$Storage.put(fileA.name, fileA, {
        headers: { contentType: 'application/octet-stream' },
        progressCallback (progress) {
          uploaderRef.uploadedSize = progress.loaded
          console.log('Uploaded', progress.loaded / progress.total)
        }
      })
    },
    selectionAdded (details) {
      console.log(details)
      this.$Storage.get(details).then(result => { this.$refs.mainimage.src = result }).catch(err => console.log(err))
    }
  }
}
</script>
