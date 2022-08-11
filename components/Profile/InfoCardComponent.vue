<template>
          <v-card color="primary" class="first-info-profile rounded-xl" dense>
          <v-card-text v-if="user.likes != undefined">
            <v-row no-gutters>
              <v-col class="white--text text-center font-weight-medium">
                <span class="font-weight-black">{{user.likes}}</span>
                <br>
                <span class="font-weight-bold">Me gusta</span>
                <br>
                <span>
                  <v-icon color="white">ion-ios-thumbs-up</v-icon>
                </span>
              </v-col>
              <v-col class="white--text text-center  font-weight-medium ml-4 mr-4"
                @click="showModalSeguidoresSeguidos = true">
                <span class="font-weight-black">{{user.followers}}</span>
                <br>
                <span class="font-weight-bold">Seguidores</span>
                <br>
                <span>
                  <v-icon color="white">ion-ios-person</v-icon>
                </span>

              </v-col>
              <v-col class="white--text text-center  font-weight-medium" @click="showModalSeguidoresSeguidos = true">
                <span class="font-weight-black">{{user.followings}}</span>
                <br>
                <span class="font-weight-bold">Siguiendo</span>
                <br>
                <span>
                  <v-icon color="white">ion-ios-people</v-icon>
                </span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text v-else>
            <v-row no-gutters>
              <v-col class="white--text d-flex flex-column align-center">
                <v-skeleton-loader width="20" height="20" type="text"></v-skeleton-loader>
                <span class="font-weight-bold">Me gusta</span>
                <span>
                  <v-icon color="white">ion-ios-thumbs-up</v-icon>
                </span>
              </v-col>
              <v-col class="white--text d-flex flex-column align-center ml-5 mr-5">
                <v-skeleton-loader width="20" height="20" type="text"></v-skeleton-loader>
                <span class="font-weight-bold">Siguiendo</span>
                <span>
                  <v-icon color="white">ion-ios-person</v-icon>
                </span>
              </v-col>
              <v-col class="white--text d-flex flex-column align-center">
                <v-skeleton-loader width="20" height="20" type="text"></v-skeleton-loader>
                <span class="font-weight-bold">Siguiendo</span>
                <span>
                  <v-icon color="white">ion-ios-people</v-icon>
                </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

</template>

<script>
export default {
    props:{
        user:Object
    }
}
</script>

<style>

</style>