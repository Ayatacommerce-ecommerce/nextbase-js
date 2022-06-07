console.log("skutokken  {{ settings.storefront_api.token }}")

// price change all zeno button 
var pricechange_zeno =  (Country_code,tokken) => { 
    console.log('pricechange_zeno', Country_code)
//price change zenobuilder
$('.zn-product').each( async function (i, item) {
    var productid = $(this).data('product-id-ins');
     if(productid)
     {
         console.log('productid ', productid)
     }
     else
     {
         productid = $('.zn-product-cart-button',item).attr('data-product-id');
         console.log('productid ', productid)
     }
    var img = $(this).find('.zn-product-image img').attr("src");
      if(img) {
    var segments = img.split( '/' );
    var action = segments[5];
     var mainprice;
     if(action)
         {
    mainprice =  await getprice(action)
         }
     else if(productid)
         {
             mainprice =  await getprice(productid)
         }
     var price = mainprice.price
     var baseprice = mainprice.mainprice ? mainprice.mainprice : ''
    // console.log('price', price)
    // console.log('main price', baseprice)
     $('.zn-price',this).text(price);
     if(baseprice)
         {
     $('.zn-ori-price',this).text(baseprice).css({"display":"flex","padding-right":"5px"});
         }
         else{
              $('.zn-ori-price',this).hide()
          }
           $('.zn-product-price').css({"visibility":"visible"})
          }
});




async function getprice(productid){
   var main;

var data11 = await fetch('/graphql', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokken}`
        },
        body: JSON.stringify({
            query: `
       query productById{
site {
product(entityId: ${productid}) {
  id
  entityId
  name
     prices(includeTax:true) {
    price {
      ...MoneyFields
    }
      basePrice
    {
      ...MoneyFields
    }
    salePrice {
      ...MoneyFields
    }
    retailPrice {
      ...MoneyFields
    }
    saved {
      ...MoneyFields
    }
  
  }
}
currency(currencyCode: ${Country_code})
{
  display
  {
    symbol
  }
}
} 
}

fragment MoneyFields on Money {
value
currencyCode
}
`
    }),
    })
    .then(res => res.json())
    .then(data11 => {
        console.log("productprice",data11)
            var price_code = data11.data.site.product.prices.price.value
            var base_code = data11.data.site.product.prices.basePrice.value != price_code  ? data11.data.site.product.prices.basePrice.value : ''
            var curency_code = data11.data.site.product.prices.price.currencyCode
            var curency_symbol = data11.data.site.currency.display.symbol
           // var price =  new Intl.NumberFormat('ja-JP', { style: 'currency', currency: curency_code }).format(price_code);
            if(base_code)
                {
                    var price = curency_symbol + "" + (price_code).toFixed(2);
                    var base_price = curency_symbol + "" + (base_code).toFixed(2);
                    main = {"price":price,"mainprice":base_price}
                }
            else
                {
                    var price = curency_symbol + "" + (price_code).toFixed(2);
                    main = {"price":price}
                }
            //$('[data-product-id-ins="136"] .zn-price').text(price);
       return main;
    })
    console.log("retuern", data11)
     return  data11;
}
}


//  product page zeno button change 
var pricechange_zeno_product =  (Country_code,tokken,product_id) => { 
    $('.zn-product-cart-button').each( async function (i, item) {
           var productid = $(this).data('product-id');
             console.log('mainproduct id', product_id)   
               if(productid === product_id)
                   {
            var mainprice;
            if(productid)
                {
           mainprice =  await getprice(productid)
                }
            var price = mainprice.price
            var baseprice = mainprice.mainprice ? mainprice.mainprice : ''
            console.log('productprice id', productid)
               console.log('productprice s', mainprice)
            $('.sticky_footer .zn-price').text(price);
            $('.sticky_footer .zn-ori-price').text(baseprice).show();  
            $('.zn-product-price').css({"visibility":"visible"}) 
                       
                       
           // get 3 / productid
                       
            var Country_code = localStorage.getItem("Country_code");
       var data11 = await fetch('/graphql', {
               method: 'POST',
               mode: 'cors',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${tokken}`
               },
               body: JSON.stringify({
                   query: `
              query productById{
    site {
       product(entityId: ${productid}) {
         id
         entityId
         name
            prices {
           price {
             ...MoneyFields
           }
         
           salePrice {
             ...MoneyFields
           }
           retailPrice {
             ...MoneyFields
           }
           saved {
             ...MoneyFields
           }
         
         }
     }
   currency(currencyCode: ${Country_code})
       {
         display
         {
           symbol
         }
       }
   } 
   }
   
   fragment MoneyFields on Money {
     value
     currencyCode
   }
   `
           }),
           })
           .then(res => res.json())
           .then(data11 => {
               var price_code = data11.data.site.product.prices.price.value/3
                   var curency_code = data11.data.site.product.prices.price.currencyCode
                   var curency_symbol = data11.data.site.currency.display.symbol
                   var price = curency_symbol + "" + (price_code).toFixed(2);
               console.log('price_code',price_code)
                $('.sticky_footer .zn-product .zn-text').text(`or 3 payments of ${price}`);
               
           })
                   }
       });
       
   
   }


   //----------------------------------------------------------------------------
