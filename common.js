
var common_home_slider =  (title,tokken) => {
        country_code = localStorage.getItem('Country_code')
        var country_sku = localStorage.getItem('Country_sku')
        seller_type = localStorage.getItem('seller_type')
        if (country_code) {
            var pagetitles = "{{toLowerCase page.title}}"
            if(pagetitles.includes('home') || pagetitles.includes('main'))
                {
            $('.featerdproduct').each(async function(i, item) {
                var sku = $(item).data('sku');
                var prid = $(item).data('product-id');
                var prstatus = await getproducstock(prid)
//                var full_sku = sku +'-'+country_sku
                var full_sku = sku
                if (seller_type === 'S') {
                    if(prstatus.isPurchasable === 'No')
                    {
                         $('.prbuttons',this).remove()
                    }
                    if(prstatus.stock === 'Yes')
                        {
                    prstatus.mpn === "No" ? $('.prbuttons',this).html(`<button data-product-id="${prid}" data-entity-id="${prid}" onclick="clickaddtobag('${prid}');" class="popupaddtobag add-to-cart-btn backorder_btn">Backorder</button>`) : $('.prbuttons',this).html(`<button data-product-id="${prid}" data-entity-id="${prid}" onclick="clickaddtobag('${prid}');" class="popupaddtobag add-to-cart-btn">Add to Bag</button>`)
//                    $('.prbuttons',this).html(`<button data-product-id="${prid}" onclick="clickaddtobag('${prid}');" class="popupaddtobag add-to-cart-btn">Add to Bag</button>`);
                        }
                    else
                    {
                          $('.prbuttons',this).html(`<button data-product-id="${prid}"  class="popupaddtobag add-to-cart-btn disabledbuttonhome" disabled>Out of Stock</button>`);
                    }
                    
                }
                else if(seller_type === 'N')
                    {
                        console.log("canada country")
                    }
                else
                    {
//                        $('.prbuttons',this).html(`<a href="#myModal" data-reveal-id="myModal" class="addtocart_zeno">How To Buy</a>`)
                        console.log("country retailer-select")
                    }
            })
                }
            else
            {
             
              $('.featerdproduct').each(async function(i, item) {
                var sku = $(item).data('sku');
                var path = $(item).data('path');
                var prid = $(item).data('product-id');
                var prstatus = await getproducstock(prid)
//                var full_sku = sku +'-'+country_sku
                var full_sku = sku 
                if (seller_type === 'S') {
                    //for checking lowstock
                    if(prstatus.isPurchasable === 'Yes')
                    {
                         
                    if(prstatus.stock === 'Yes')
                        {
                            if(prstatus.mpn === "No")
                            {
                            $('.prbuttons',this).html(`<div class="zn-product-cart-button zen_add_to_bag showbutton" data-product-id="${prid}" data-sku="${sku}"><a data-element-animation="" data-scroll-animation="" class="addtocart_zeno backorder_btn">Backorder</a> <span class="zn-cart-message" style="display: none; flex-direction: row;align-content: center;align-items: center;justify-content: center;margin-top: 10px;color: #2196f3;">Added To cart</span></div>`);
                            }
                            else
                            {
                           $('.prbuttons',this).html(`<div class="zn-product-cart-button zen_add_to_bag showbutton" data-product-id="${prid}" data-sku="${sku}"><a data-element-animation="" data-scroll-animation="" class="addtocart_zeno">Add to Bag</a> <span class="zn-cart-message" style="display: none; flex-direction: row;align-content: center;align-items: center;justify-content: center;margin-top: 10px;color: #2196f3;">Added To cart</span></div>`); 
                            }
                        }
                        else
                            {
                                $('.prbuttons',this).html(`<button data-product-id="${prid}"  class="popupaddtobag add-to-cart-btn disabledbuttonhome" disabled>Out of Stock</button>`);
                            }
                    
                    }
                    
                    
                }
                else if(seller_type === 'R')
                      {
                          $('.prbuttons',this).html(`<a href="${getcarturl(path)}" class="zn-product-cart-button add-to-cart-btn showbutton-inline"> View Product</a> `);
                      }
  
            })
             
            }
            
//          
        }
        else{
            $('.featerdproduct').each(function(i, item) {
                 $('.zn-product-cart-button',item).show();
                var sku = $(item).data('sku');
//                var full_sku = sku +'-UK'
                var full_sku = sku 
                
                $('.prbuttons',this).html(`<a href="/cart.php?action=add&sku=${full_sku}" class="addtocart_zeno">Add to Bag</a>`)
            })
            
        }
    }
