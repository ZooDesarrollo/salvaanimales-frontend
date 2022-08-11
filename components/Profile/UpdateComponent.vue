<template>
  <v-dialog :value="value" class="mb-6">
    <v-card>
      <v-toolbar class="elevation-0">
        <v-toolbar-title class="primary--text font-weight-bold">
          Tu perfil
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dense class="ml-2" fab @click="$emit('input',false)" x-small depressed>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-12">
            <drag-and-drop-photo-card v-model="profile_picture"></drag-and-drop-photo-card>
          </v-col>
          <v-col class="col-12">
            <v-text-field flat filled class="rounded-lg" required label="Nombre de usuario" type="text"
              v-model="user.username">
            </v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field flat filled class="rounded-lg" required label="Email" type="email" v-model="user.email">
            </v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field flat filled class="rounded-lg" required label="Telefono" type="number" v-model="user.phone">
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded class="primary font-weight-bold" @click="saveProfile()">
          Editar perfil
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="showSnackbar" timeout="1000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-dialog>

</template>

<script>
  import DragAndDropPhotoCard from '~/components/DragAndDropPhotoCard.vue'

  export default {
    components: {
      DragAndDropPhotoCard
    },
    data() {
      return {
        profile_picture: null,
        user: {},
        showSnackbar: false,
        snackbarMessage: '',

      }
    },
    props: {
      value: Boolean
    },
    created() {
      this.user = JSON.parse(JSON.stringify(this.$auth.user))
    },
    methods: {
      async saveProfile() {

        const uploadFile = (img, userID) => {
          const profilePicture = new FormData()
          profilePicture.append('field', 'profile_picture')
          profilePicture.append('files', img)
          profilePicture.append('source', 'users-permissions');
          profilePicture.append('ref', 'user')
          profilePicture.append('refId', userID)
          return this.$axios.post(`/upload`, profilePicture)
        }

        this.$axios.put(`/users/${this.user.id}`, this.user).then(async () => {
          if(this.profile_picture!=null)
            await uploadFile(this.profile_picture, this.user.id)
          await this.$auth.fetchUser()
          this.closeModal('Exito al editar')
        }).catch((error) => {
          return this.closeModal(error.message)
        })



      },
      closeModal(message) {
        this.snackbarMessage = message
        this.showSnackbar = true
        setTimeout(() => {
          this.$emit('input', false)
        }, 3000);
      }
    }
  }

</script>
