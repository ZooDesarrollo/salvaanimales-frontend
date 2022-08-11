console.log(document.getElementById('expiration-field'))

var dlocal = window.dlocal('d2694245-c35d-4b04-93c9-d1240201ee04');
var fields = dlocal.fields({
    locale: 'en',
    country: 'BR'
});
var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
  }
};

// Create an instance of the card Field.
var card = fields.create('card', {style: style});

// Add an instance of the card Field into the `card-field` <div>.
card.mount(document.getElementById('card-field'));

const expirationField = fields.create('expiration', {
    style: {
      base: {
        fontSize: "16px",
        fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
        lineHeight: '18px',
        fontSmoothing: 'antialiased',
        fontWeight: '500',
        color: "#666",
        '::placeholder': {
          color: "#c1c1c1"
        },
        iconColor: "#c1c1c1"
      },
      autofilled: {
        color: "#000000"
      }
    },
  });
  expirationField.mount(document.getElementById('expiration-field'));
  