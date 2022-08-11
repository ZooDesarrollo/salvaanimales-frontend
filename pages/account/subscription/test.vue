<template>
  <v-container fill-height>
      <v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
    components:{
    },
    layout:'simpleWithBackButton',
    data() {
        return {
            plans:[{
                name:'Basic',
                price:36,
                months:3    
            },{
                name:'Premium',
                price:72,    
                months:6    
            },{
                name:'Gold',
                price:144,    
                months:12    
            },]
        }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Tu subscripcion',
        color: 'secondary',
      })

    },
}
</script>

<style>

</style>