<template>
  <div>
    <slot></slot>
    <div class="d-flex flex-column justify-center align-center text-center" v-if="value.length == 0">
      <h2 class="blue-grey--text lighten-5 mt-10">No se encontraron publicaciones</h2>
    </div>
    <div v-if="value.data">
      <div v-for="(publication,index) in value.data" :key="publication.id">
        <post-card :publicProp="publication" :index="index"></post-card>
        <v-divider></v-divider>
      </div>
    </div>
    <div v-else>
      <div v-for="i in 8" :key="i">
        <v-row no-gutters class="d-flex align-center mb-2">
          <v-skeleton-loader type="avatar" class="mr-2"></v-skeleton-loader>
          <v-skeleton-loader width="250" type="heading"></v-skeleton-loader>
        </v-row>
        <v-skeleton-loader class="mb-5 rounded-lg" height="150" type="image"></v-skeleton-loader>
      </div>
    </div>
    <!----------------------->
  </div>
</template>

<script>
  import PostCard from "~/components/Posts/PostCard"

  export default {
    components: {
      PostCard
    },
    props: {
      value: {
        type: Object,
      },
      myPublications: {
        type: Boolean,
        default: false,
      },
      followersPublications: {
        type: Boolean
      }

    },
  }

</script>
