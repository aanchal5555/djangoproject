

document.addEventListener("DOMContentLoaded", function() {
    

    if (localStorage.getItem('cart') == null) {
        var cart = {};
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart(cart);
    }
    // If the add to cart button is clicked, add/increment the item
    //$('.cart').click(function() {
    $('.divpr').on('click', 'button.cart', function() {
        var idstr = this.id.toString();
        console.log(idstr);
        if (cart[idstr] != undefined) {
            qty = cart[idstr][0] + 1;
            
        } else {
            qty = 1;
            name = document.getElementById('name'+idstr).innerHTML
            price = document.getElementById('price'+idstr).innerHTML
            cart[idstr] = [qty, name,parseInt(price)];
    
        }
        updateCart(cart);
    });
    
    //Add Popover to cart
    $('#popcart').popover();
    updatePopover(cart);
    
    function updatePopover(cart) {
        console.log('We are inside updatePopover');
        var popStr = "";
        popStr = popStr + "<h5> Cart for your items in my shopping cart </h5><div class='mx-2 my-2'>";
        var i = 1;
        for (var item in cart) {
            popStr = popStr + "<b>" + i + "</b>. ";
            popStr = popStr + document.getElementById('name' + item).innerHTML.slice(0, 19) + "... Qty: " + cart[item] + '<br>';
            i = i + 1;
        }
        popStr = popStr + "</div> <a href='/checkout'class='btn btn-primary' id='checkout'>Checkout</a>   <a href='' id='clearcart' class='btn btn-primary'>Clear Cart</a>";
    
        
        console.log(popStr);
        document.getElementById('popcart').setAttribute('data-content', popStr);
        
        $('#popcart').popover('show');
    
        document.getElementById('clearcart').addEventListener('click', function(event) {
            event.preventDefault();
            clearCart();
          });
    }
    
    function clearCart() {
        cart = JSON.parse(localStorage.getItem('cart'));
        for (var item in cart) {
            document.getElementById('div' + item).innerHTML = '<button id="'+item+'" class="btn-action cart""><ion-icon name="bag-add-outline"></ion-icon></button>'
                                                                
        }
        localStorage.clear();
        cart = {};
        updateCart(cart);
    }
    
    function updateCart(cart) {
        var sum = 0;
        for (var item in cart) {
            sum = sum + cart[item][0];
            document.getElementById('div' + item).innerHTML = "<button id='minus" + item + "' class='btn btn-primary minus'>-</button> <span id='val" + item + "''>" + cart[item][0] + "</span> <button id='plus" + item + "' class='btn btn-primary plus'> + </button>";
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart').innerHTML = sum;
        console.log(cart);
        updatePopover(cart);
    }
    // If plus or minus button is clicked, change the cart as well as the display value
    $('.divpr').on("click", "button.minus", function() {
        a = this.id.slice(7, );
        cart['pr' + a][0] = cart['pr' + a][0] - 1;
        cart['pr' + a][0] = Math.max(0, cart['pr' + a][0]);
        document.getElementById('valpr' + a).innerHTML = cart['pr' + a][0];
        updateCart(cart);
    });
    $('.divpr').on("click", "button.plus", function() {
        a = this.id.slice(6, );
        cart['pr' + a][0] = cart['pr' + a][0] + 1;
        document.getElementById('valpr' + a).innerHTML = cart['pr' + a][0];
        updateCart(cart);
    });

    
});