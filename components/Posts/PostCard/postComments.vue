<template>
  <v-card-actions>
    <v-btn text x-small :class="`font-weight-black ${textColor}--text`" @click.stop.prevent="likeOrDislike">
      {{publication.likes}} &nbsp;
      <v-icon :color="textColor" left v-if="!publication.likeUser">mdi-thumb-up-outline</v-icon>
      <v-icon :color="textColor" left v-else>mdi-thumb-up</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text x-small :class="`font-weight-black ${textColor}--text`" @click="goToPublication()">
      {{publication.comentarios}}&nbsp;&nbsp;
      <v-icon dark left>ion-ios-text</v-icon>
    </v-btn>
  </v-card-actions>

</template>

<script>
  export default {
      props:{
          textColor:{
            default:'white',
            type:String
          },
          publication:Object,
          goToPublication:Function,
          likeOrDislike:Function
      }
  }

</script>

<style>

</style>
