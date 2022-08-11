<template>
  <v-card v-bind="$attrs" :color="category.color" height="120" class="p-relative rounded-lg d-flex justify-center align-center">
    <span
      class="p-absolute text-shadow white--text text-subtitle-2 font-weight-black">{{capitalize(category.title)}}</span>
    <v-img class="filter-card" :src="`/categories/${category.title}.png`" position="bottom right" height="120" contain>
    </v-img>
  </v-card>
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      category: {
        type: Object,
        required: true
      }
    },
    methods: {
      capitalize(string) {
        return string.toUpperCase()
      }
    }
  }

</script>

<style>
  .filter-card {
    filter: blur(1px);
  }

</style>
