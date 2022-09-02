<template>
  <div>
    <v-speed-dial v-model="configOptions" fixed right bottom direction="top"  v-show="$auth.user.is_admin" class="mr-4" transition="slide-y-reverse-transition">
      <template v-slot:activator>
        <v-btn v-model="configOptions" color="mb-12 primary" dark fab>
          <v-icon v-if="configOptions">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-btn  class="font-weight-black rounded-lg"  color="green lighten-1" @click="openCreatePost= true">
       nuevo <v-icon>mdi-post</v-icon>
      </v-btn>
      <v-btn class="font-weight-black rounded-lg"  color="#00b7b7" @click="openCreateDogs = true">
         nuevo <v-icon>mdi-paw</v-icon>
      </v-btn>
      <v-btn class="font-weight-black rounded-lg"  color="orange" @click="openCreateProduct = true">
         nuevo <v-icon>mdi-store</v-icon>
      </v-btn>

    </v-speed-dial>
    <PostsCreateComponent v-model="openCreatePost"></PostsCreateComponent>
    <AdopcionesCreateComponent v-model="openCreateDogs"></AdopcionesCreateComponent>
    <StoreCreateProductComponent v-model="openCreateProduct"></StoreCreateProductComponent>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        configOptions: false,
        openCreatePost: false,
        openCreateDogs: false,
        openCreateProduct: false
      }
    }
  }

</script>

<style>

</style>
