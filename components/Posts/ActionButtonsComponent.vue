<template>
  <v-row class="mb-2">
    <v-col class="col-6 col-md-6">
      <v-btn rounded @click.native="$emit('input','publication')" :outlined="!value" block class="font-weight-black"
        :depressed="value">
        PUBLICACIONES
      </v-btn>
    </v-col>
    <v-col class="col-6 col-md-6 text-right">
      <v-btn rounded @click.native="$emit('input','video')" :outlined="value" block class="font-weight-black"
        :depressed="!value" >
        VIDEOS
      </v-btn>
    </v-col>
    <!--
    <v-col class="col-12 col-md-12 text-right">
      <v-btn rounded to="/lostdogs"  block class="lost-dogs-button white--text font-weight-black" >
        PERROS PERDIDOS&nbsp;<v-icon>mdi-paw</v-icon>
      </v-btn>
    </v-col>
    -->
  </v-row>

</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean
      }
    },
    data() {
      return{
        lostDogs: false
      }
    },
    mounted() {
      this.$on('checkFollowers', () => {
        this.lostDogs = false
        this.$emit('lostDogs', false)
      })
    },
    methods: {
      getLostDogs() {
        this.lostDogs = !this.lostDogs
        this.$emit('lostDogs', this.lostDogs)
        this.$emit('followersPublications', !this.lostDogs)
      }
    }

  }

</script>

<style>
  .lost-dogs-button{
    background: linear-gradient( #E53935, #c11410);
  }
</style>
