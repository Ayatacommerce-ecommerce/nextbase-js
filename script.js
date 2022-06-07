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
   var country_change =  () => { 
       //change country
       if(localStorage.getItem('Country'))
       {
           console.log('has country ')
           if(localStorage.getItem('Country_code') != 'US' )
               {
                   localStorage.setItem('Country', 'USA');
                   localStorage.setItem('Country_code', "USD");
                   localStorage.setItem('Country_sku', 'UK');
                   localStorage.setItem('Country_img', '//cdn11.bigcommerce.com/s-jpkc0tnv4j/product_images/uploaded_images/usa.png');
                   localStorage.setItem('seller_type', 'S');
                   localStorage.setItem('language', "en");
                   localStorage.setItem('navigation_type', "Type A");
                   $('.countryimg').html(`<img src="//cdn11.bigcommerce.com/s-jpkc0tnv4j/product_images/uploaded_images/usa.png" width="24px">`);
               }
           
       }
   else
       {
            //changecountry('United Kingdom','UK','GBP','//cdn11.bigcommerce.com/s-jpkc0tnv4j/product_images/uploaded_images/uk.png','S','en','Type A')
           localStorage.setItem('Country', 'USA');
           localStorage.setItem('Country_code', "USD");
           localStorage.setItem('Country_sku', 'US');
           localStorage.setItem('Country_img', '//cdn11.bigcommerce.com/s-jpkc0tnv4j/product_images/uploaded_images/usa.png');
           localStorage.setItem('seller_type', 'S');
           localStorage.setItem('language', "en");
           localStorage.setItem('navigation_type', "Type A");
           $('.countryimg').html(`<img src="//cdn11.bigcommerce.com/s-jpkc0tnv4j/product_images/uploaded_images/usa.png" width="24px">`);
       }
   
   
   if (localStorage.getItem('Country_img')) {
       country_img = localStorage.getItem('Country_img')
       $('.countryimg').html(`<img src="${country_img}" width="18px">`);
   }

  // function showcountry() {
      // $('.countrydropdown').toggle()
   //};

   function changecountry(country, sku, code, img, selltype, language, type, link) {
      //if(sku === 'US' )
//            {
//        
//        var languages = language ? language : "en"
//        localStorage.setItem('Country', country);
//        localStorage.setItem('Country_code', code);
//        localStorage.setItem('Country_sku', sku);
//        localStorage.setItem('Country_img', img);
//        localStorage.setItem('seller_type', selltype);
//        localStorage.setItem('language', languages);
//        localStorage.setItem('navigation_type', type);
//        $('.countryimg').html(`<img src="${img}" width="24px">`);
//        //console.log('countrycode click ')
//        //$('[data-cart-currency-switch-url]').click();
//         
//             $('#navPages-currency ul li a').each(async function(i, item) {
//                     var countrycode = $(this).data('currency-code')
//                     if(countrycode === code)
//                         {
//
//                             var countryurl = $(this).data('cart-currency-switch-url')
//                             var seturl = $(this).attr('href')
//                             var currencyid = getParameterByName('setCurrencyId',seturl);
//                             var mainurl = document.location.origin + '?setCurrencyId=' + currencyid
//                             console.log('currencyid click', mainurl)
//                             //console.log('countrycode url ', seturl)
//                             var skumain = sku  === 'UK' ? 'gb' : sku
//                             var redirect = `/${languages.toLowerCase()}-${skumain.toLowerCase()}/`
//                             await changeCurrency1(mainurl,countrycode, redirect)
//                         }
//                 })
//        
//                var settings = {
//                  "async": true,
//                  "crossDomain": true,
//                  "url": "https://portable-multimedia-limited.mybigcommerce.com/api/storefront/carts",
//                  "method": "GET",
//                  "headers": {}
//                }
//                
//                $.ajax(settings).done(function (response) {
//                    if(response && response.length > 0)
//                        {
//                  console.log("cart id footer",response);
//                  var cart=response;
//                  var cartid=cart[0].id
//                  console.log("cart ",cart);
//                  console.log("cart id",cartid);
//                  var settings = {
//                  "async": true,
//                  "crossDomain": true,
//                  "url": "https://portable-multimedia-limited.mybigcommerce.com/api/storefront/carts/" +`${cartid}`,
//                  "method": "DELETE",
//                  "headers": {}
//                }
//                
//                $.ajax(settings).done(function (response) {
//                  console.log("cart response",response);
//                });
//                        }
//                });
//                 //window.location.replace();
//         
//    }
       if(link != "-")
                   {
                window.location.replace(link);
                   }
               else
                   {
                       console.log("no redirection")
                   }
   }
   
  function changeCurrency1(url, currencyCode, redirect) {
      console.log("error in country selection", url)
       $.ajax({
           url,
           contentType: 'application/json',
           method: 'GET',
           //data: JSON.stringify({ currencyCode }),
       }).done(() => {
           window.location.replace(`${redirect}`);
//            window.location.reload();
       }).fail((e) => {
           console.log("error in country selection")
           //window.location.reload();
       });
   }
   
function getParameterByName( name,href )
{
 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec( href );
 if( results == null )
   return "";
 else
   return decodeURIComponent(results[1].replace(/\+/g, " "));
}
   setTimeout(function () {
       $('.css-10z1g2q').show()
         }, 10500);
}