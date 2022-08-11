<template>
<div>
  <v-bottom-navigation fixed app grow  class="white" height="48">
    <v-btn color="primary" to="/" icon min-width="50">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn value="cart" color="primary" to="/feed" icon min-width="50">
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>
    <v-btn value="tindog" color="primary" to="/tienda" icon min-width="40">
      <v-icon>mdi-store</v-icon>
    </v-btn>
    <v-btn value="tindog" color="primary" to="/adopciones" icon min-width="40">
      <v-icon>mdi-paw</v-icon>
    </v-btn>

    <v-btn value="profile" color="primary" to="/donaciones" icon min-width="50">
      <v-icon>mdi-currency-usd</v-icon>
    </v-btn>
    <v-btn value="profile" color="primary" @click="disconnect()" icon min-width="50">
      <v-icon>mdi-logout</v-icon>
    </v-btn>

  </v-bottom-navigation>
      <PostsCreateComponent v-model="openCreatePost"></PostsCreateComponent>
  </div>
</template>

<script>
  export default {
    name: 'BottomNavigationBar',
    data() {
      return {
        bottomNav: 'profile',
        petImg: '',
        openCreatePost: false,
      }
    },
    mounted() {
    },
    methods: {
      goToPets() {
        if (this.pets == 1) {
          return this.$router.push(`/myPets/gps/${pets[0].id}`)
        } else {
          return this.$router.push(`/myPets/`)
        }
      },
      disconnect() {
        this.$auth.logout()
      }
    },
    computed: {
      pets() {
        return this.$store.getters['myPets/pets']
      }
    }
  }

</script>

<style lang="scss">


</style>
