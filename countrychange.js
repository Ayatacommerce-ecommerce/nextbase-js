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
               localStorage.setItem('seller_type', 'R');
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