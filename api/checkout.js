module.exports = ()=>{
    function pay(){
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
            "notification_url": "https://webhook.site/#!/9f8c764d-a9e7-4df6-8f79-2ad889ec37e0/c87757ee-0c71-454b-9ef8-b3c2817f7bc3/1",
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
                "name": "Lalo",
                "surname": "Landa",
                "phone": {
                    "area_code": "55",
                    "number": "98529-8743"
                },
                "identification": {
                    "type": "CPF",
                    "number": ""
                },
                "address": {
                    "street_name": "Insurgentes Sur",
                    "street_number": "1602",
                    "zip_code": " 78134-190"
                }
            }
        }
    
        const mercadopago = require ('mercadopago');
        mercadopago.configure({
            access_token: 'APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327'
        });

        mercadopago.preferences.create(preference)
            .then(function(response){
            // Este valor substituirá a string "<%= global.id %>" no seu HTML
            global.id = response.body.id;
            }).catch(function(error){
                console.log(error);
            });
        
    
    }
    return {pay}
}