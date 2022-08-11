<template>
  <div>
    <v-dialog persistent :value="value">
      <v-card>
        <v-toolbar color="#00b7b7" class="elevation-0">
          <v-toolbar-title class="font-weight-black">AGREGAR MASCOTA</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('input', false)" fab depressed x-small>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-stepper v-model="adoptedDogSteps" flat>
          <v-stepper-header class="elevation-0">
            <v-stepper-step :complete="adoptedDogSteps > 1" step="1">
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="adoptedDogSteps > 2" step="2">
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card color="rounded-lg" outlined>
                <v-toolbar color="#00b7b7" class="elevation-0">
                  <v-toolbar-title class="font-weight-black black--text">Datos</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="infoForm">
                    <v-row>
                      <v-col class="col-12">
                        <v-text-field filled v-model="adoptedDog.name" class="rounded-lg" hide-details
                          :rules="rules.requerido" label="Nombre de la mascota">
                        </v-text-field>
                      </v-col>
                      <v-col class="col-12">
                        <v-text-field filled v-model="adoptedDog.location" class="rounded-lg" hide-details
                          :rules="rules.requerido" label="Ciudad">
                        </v-text-field>
                      </v-col>
                      <v-col class="col-12">
                        <v-text-field filled v-model="adoptedDog.years" class="rounded-lg" hide-details
                          :rules="rules.requerido" label="Anios">
                        </v-text-field>
                      </v-col>
                      <v-col class="col-12">
                        <v-select filled v-model="adoptedDog.type" class="rounded-lg" hide-details
                          :rules="rules.requerido" label="Tipo" :items="['Perro','Gato','Otro']">
                        </v-select>
                      </v-col>
                      <v-col class="col-12">
                        <v-textarea filled v-model="adoptedDog.info" class="rounded-lg" hide-details
                          label="Info adicional (Opcional)">
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>

            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card color="rounded-lg" outlined>
                <v-toolbar color="secondary elevation-0">
                  <v-toolbar-title class="font-weight-black white--text">Fotos de la mascota</v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                  <DragAndDropPhotoCard v-model="adoptedDog.pictures" multiple></DragAndDropPhotoCard>
                </v-card-text>
                <v-card-text>
                  <div class="d-flex full-width overflow mb-3">
                    <v-card v-for="(picture,index) in adoptedDog.pictures" width="70vw" class="rounded-md mr-3"
                      :key="index">
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
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-card-actions>
          <template v-if="adoptedDogSteps>1">
            <v-btn color="yellow darken-1" class="rounded-lg" width="10%" @click="adoptedDogSteps--">
              <v-icon class="white--text">mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </template>
          <v-btn :width="(adoptedDogSteps==1)?'100%':'80%'" color="success darken-2" class="white--text rounded-lg font-weight-black"
            @click="nextStep()">
            <template v-if="adoptedDogSteps == 2">
              AGREGAR
            </template>
            <template v-else>
              SIGUIENTE
            </template>
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
      Mascota agregada con exito!
    </template>
    </modalSuccess>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        adoptedDog: {
            pictures:[]
        },
        adoptedDogSteps: 1,
        successDialog: false,
        rules: {
          requerido: [value => !!value || "Requerido."],
        },

      }
    },
    props: {
      value: Boolean
    },

    methods: {
      previewImg(file) {
        console.log(file)
        return URL.createObjectURL(file)
      },
      deleteImg(index) {
        this.$delete(this.adoptedDog.pictures, index)
      },
      nextStep() {
        if (this.adoptedDogSteps == 2) {
          return this.createadoptedDog()
        }
        if (!this.$refs.infoForm.validate()) return
        this.adoptedDogSteps++
      },
      async createadoptedDog() {
        let formData = new FormData()

        for (let index in this.adoptedDog.pictures) {
          let picture = this.adoptedDog.pictures[index]
          formData.append(`files.pictures`, picture, picture.name)
        }
        this.$delete(this.adoptedDog, 'pictures')
        formData.append('data', JSON.stringify(this.adoptedDog))
        try {
          await this.$axios.post('/adopted-dogs', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.$emit('input', false)
          this.successDialog = true
        } catch (error) {

        }
      }
    }

  }

</script>

<style>

</style>
