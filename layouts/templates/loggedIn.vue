<template>
  <v-app>
    <slot :titles="titles"></slot>
  </v-app>
</template>

<script>
  export default {
    middleware: "auth",
    created() {
      console.log('empleado')
    },
    computed: {
      titles() {
        return {
          text:this.$store.getters['titlePages/titlePage'],
          color:this.$store.getters['titlePages/titleColor']
        }
      },
    }
  }

</script>
