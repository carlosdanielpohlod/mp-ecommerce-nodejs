var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();
 

function pay(res){
    let preference = {
        "back_urls": {
            "success": "https://https://www.success.com/",
            "failure": "https://www.failure.com/",
            "pending": "https://www.pending.com/"
        },
        "auto_return": "approved",
        
        "payment_methods": {
            "excluded_payment_methods": [
                {
                    "id": "amex"
                }
            ],
            "installments": 6
        },
        "notification_url": "https://webhook.site/962b5b8b-cdd5-44e5-9ee4-2377cdfedf39",
        "statement_descriptor": "Tienda e-commerce",
        "external_reference": "carlospohlod@gmail.com",
        "items": [
            {
                "ID": 1234,
                "title": "Dummy Item",
                "description": "Celular de Tienda e-commerce",
                "quantity": 1,
                "unit_price": 10.0
            }
        ],
        "payer": {
            "id":"725762927",
            "name": "Lalo",
            "surname": "Landa",
            "email":"test_user_92801501@testuser.com",
            "identification": {
                "type": "CPF",
                "number": ""
            },
            "address": {
                "street_name": "Insurgentes Sur",
                "house_number":"1602",
                "zip_code": " 78134-190"
            }
        }
    }

    const mercadopago = require ('mercadopago');
    mercadopago.configure({
        access_token: 'APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327',
        public_key:'APP_USR-6096a634-0b35-452c-94c9-a18adb8ffb15',
        
    });

    mercadopago.preferences.create(preference)
        .then(function(response){
            console.log(response)
            res.redirect(response.body.sandbox_init_point)
        // Este valor substituirá a string "<%= global.id %>" no seu HTML
        global.id = response.body.id;
        }).catch(function(error){
            console.log(error);
        });
}




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});
app.get('/pay', (req, res)=>{
    pay(res)
    // res.status(200).send()
})
app.listen(port);