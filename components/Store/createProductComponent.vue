<template>
    <div>
      <v-dialog :value="value">
        <v-card>
          <v-toolbar class="elevation-0">
            <v-toolbar-title class="primary--text font-weight-bold">
              Subir producto
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dense class="ml-2" fab @click="$emit('input',false)" x-small depressed>
              <v-icon color="grey">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pt-3">
            <v-text-field class="rounded-lg" label="Titulo" height="50" v-model="publicacion.name"
              background-color="grey lighten-3"></v-text-field>
              <v-text-field class="rounded-lg" label="Precio" height="50" v-model="publicacion.price"
              background-color="grey lighten-3"></v-text-field>
            <v-textarea class="rounded-lg" v-model="publicacion.description" filled label="Descripcion del producto">
            </v-textarea>
          </v-card-text>
          <v-card-text>
            <v-card color="rounded-lg" outlined>
              <v-toolbar color="red accent-2 elevation-0">
                <v-toolbar-title class="font-weight-black white--text">Fotos</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <DragAndDropPhotoCard v-model="publicacion.pictures" multiple></DragAndDropPhotoCard>
              </v-card-text>
              <v-card-text>
                <div class="d-flex full-width overflow mb-3">
                  <v-card v-for="(picture,index) in publicacion.pictures" width="70vw" class="rounded-md mr-3" :key="index">
                    <v-img :src="previewImg(picture)" height="25vh">
                      <v-btn @click="deleteImg(index)" x-small depressed absolute top right fab color="white"
                        class="mt-5 mr-n3">
                        <v-icon color="grey">mdi-close</v-icon>
                      </v-btn>
                    </v-img>
                  </v-card>
                </div>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-text v-if="sendingForm" class="d-flex justify-center">
            <v-progress-circular indeterminate size="100" color="primary"></v-progress-circular>
          </v-card-text>


          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" rounded :disabled="sendingForm" class="primary font-weight-bold" @click="createPublication()">
              AGREGAR producto
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <modalSuccess :action="()=>{
        successDialog = false
      }" v-model="successDialog">
        <template v-slot:icon>
          mdi-check
        </template>
  
        <template v-slot:title>
          Producto agregado con exito!
        </template>
      </modalSuccess>
  
    </div>
  </template>
  
  
  <script>
    import titleToolbars from '~/components/General/titleToolbars.vue'
    export default {
      components: {
        titleToolbars
      },
      props: {
        value: Boolean
      },
      data() {
        return {
          successDialog: false,
          sendingForm: false,
          publicacion: {
            pictures:[],
            contenido: ''
          }
        }
      },
      methods: {
        selectPhoto() {
          uploadFile.click()
        },
        previewImg(file) {
          console.log(file)
          return URL.createObjectURL(file)
        },
        deleteImg(index) {
          this.$delete(this.lostDog.pictures, index)
        },
        onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files
          if (!files.length)
            return
          this.publicacion.main_picture = files[0]
          previewImg.src = URL.createObjectURL(files[0])
          previewImg.style = "max-height: 100%;max-width: 100%"
          this.$forceUpdate()
  
        },
        createPublication() {
  
  
          const data = new FormData()
          this.publicacion.user = this.$auth.user.id
  
          for (let index in this.publicacion.pictures) {
            let picture = this.publicacion.pictures[index]
            data.append(`files.pictures`, picture, picture.name)
          }
          this.sendingForm = true
          this.$delete(this.publicacion, 'pictures')
          data.append('data', JSON.stringify(this.publicacion))

          this.$axios.post('/productos/', data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((data) => {
              this.sendingForm = false
              this.publicacion = {}
              this.$emit('input', false)
              this.successDialog = true
            })
        }
      }
    }
  
  </script>
  
  <style scoped>
    .dotted-border {
      border: 1px dotted black;
    }
  
  </style>
  
