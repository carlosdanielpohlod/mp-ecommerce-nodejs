var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();
 

function pay(req,res){
    let preference = {
        "back_urls": {
            "success": "https://carlosdanielpohlod.herokuapp.com/success",
            "failure": "https://carlosdanielpohlod.herokuapp.com/failure",
            "pending": "https://carlosdanielpohlod.herokuapp.com/pending"
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
        "notification_url": "https://beeceptor.com/console/mercadopagoteste",
        "statement_descriptor": "Tienda e-commerce",
        "external_reference": "carlospohlod@gmail.com",
        "items": [
            {
                "ID": 1234,
                "title": req.query.title,
                "description": "Celular de Tienda e-commerce",
                "quantity": 1,
                "unit_price": parseFloat(req.query.price)
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
            
            req.query['init_point'] = response.body.init_point
            req.query['preference_id'] = response.body.id
            res.render('detail', req.query);
        }).catch(function(error){
            console.log(error);
        });
    return global
}




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/success', (req, res)=>{
    res.render('success', req.query)
})
app.get('/pending', (req, res) => {
    res.render('pending')
})
app.get('/failure', (req, res) => {
    res.render('failure')
})
app.get('/detail', function (req, res) {
    global = pay(req,res)
    
    
});

app.listen(port);