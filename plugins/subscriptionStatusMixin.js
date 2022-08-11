import Vue from 'vue';
//create a vue.js mixin
Vue.mixin({
    methods: {
        setSubscriptionStatus(subscription) {
            let date = new Date()
            let dateNow = date.getTime()
            let dateSubscription = new Date(subscription.end).getTime()
            let diff = dateNow - dateSubscription
            let diffDays = Math.round(diff / (1000 * 60 * 60 * 24))
            if(diffDays > 30 || subscription.status == 'Rejected') {
                return 'Expirada'
            } else {
                return 'Activa'
            }
        },
        async getSubscription() {
            return  await this.$axios.get('/subscriptions/getUserSubscription')
              .then((data) => {
                return data.data
              })
          },
    }
});
