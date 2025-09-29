
     // Estado do carrinho
  const cart = [];

  // Elementos do DOM
  const cartCounter = document.getElementById('cart-counter');
  const cartItems = document.getElementById('cart-items');
  

  // Adiciona item ao carrinho
  function addItemToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();
  }

  // Remove item do carrinho pelo índice
  function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  }

  // Calcula o total do carrinho
  function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }

  // Atualiza a exibição do carrinho
  function updateCartDisplay() {
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} `;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.addEventListener('click', () => removeItemFromCart(index));

      li.appendChild(removeBtn);
      cartItems.appendChild(li);
    });

    cartCounter.textContent = `Carrinho: ${cart.length}`;
    if (cartTotal) cartTotal.textContent = calculateTotal().toFixed(2);
  }

  // Adiciona listener para todos os botões de adicionar ao carrinho
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const card = e.target.closest('.product-card');
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      addItemToCart(name, price);
    }
  });

const productSelect = document.getElementById('cProduct');
const quantityInput = document.getElementById('cQuantity');
const summaryProduct = document.getElementById('summaryProduct');
const summaryQuantity = document.getElementById('summaryQuantity');
const summaryPrice = document.getElementById('summaryPrice');
const finishOrder = document.getElementById('finishOrder');
const orderStatus = document.getElementById('orderStatus');

function updateSummary() {
  const product = productSelect.options[productSelect.selectedIndex].text;
  const price = productSelect.options[productSelect.selectedIndex].dataset.price || 0;
  const quantity = parseInt(quantityInput.value) || 1;
  summaryProduct.textContent = `Produto: ${product}`;
  summaryQuantity.textContent = `Quantidade: ${quantity}`;
  summaryPrice.textContent = `Preço total: R$${price * quantity}`;
}


productSelect.addEventListener('change', updateSummary);
quantityInput.addEventListener('input', updateSummary);

finishOrder.addEventListener('click', () => {
  orderStatus.textContent = 'Enviando pedido...';
  setTimeout(() => {
    orderStatus.textContent = 'Pedido enviado com sucesso! ✅';
  }, 1000);
});

// Inicializa resumo
updateSummary();

    // --- UTIL
    const $ = (sel, ctx=document) => ctx.querySelector(sel);
    const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
    const money = v => v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});

    // --- DADOS (Edite aqui seus produtos)
    const PRODUCTS = [
      // Periféricos
      {id:'p01', name:'Teclado Mecânico BL K550', category:'Periféricos', price:289.90, oldPrice:349.90, promo:true, tags:['Mecânico','ABNT2','RGB'], img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop'},
      {id:'p02', name:'Mouse Óptico 6 Botões 7200 DPI', category:'Periféricos', price:119.90, tags:['Ergonômico','USB'], img:'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'},
      {id:'p03', name:'Headset USB com Microfone', category:'Periféricos', price:199.90, tags:['Noise Cancel'], img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop'},
      {id:'p04', name:'Webcam 1080p 60fps', category:'Periféricos', price:239.90, tags:['Full HD'], img:'https://images.unsplash.com/photo-1587825140400-5fc38fd2415e?q=80&w=1200&auto=format&fit=crop'},
      {id:'p05', name:'Mousepad XL 90×40cm', category:'Periféricos', price:69.90, tags:['Antiderrapante'], img:'https://images.unsplash.com/photo-1583947215259-38e31be8757d?q=80&w=1200&auto=format&fit=crop'},
      {id:'p06', name:'Hub USB‑C 6‑em‑1', category:'Periféricos', price:169.90, tags:['USB‑C','HDMI'], img:'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1200&auto=format&fit=crop'},
      // Relógios
      {id:'w01', name:'Relógio BL Classic Couro', category:'Relógios', price:329.90, promo:true, oldPrice:399.90, tags:['Clássico','Masculino'], img:'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop'},
      {id:'w02', name:'Smartwatch Fitness 44mm', category:'Relógios', price:449.90, tags:['Bluetooth','Notificações'], img:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop'},
      {id:'w03', name:'Relógio Feminino Aço Rosé', category:'Relógios', price:379.90, tags:['Elegante'], img:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop'}
    ];

    const state = {
      q:'',
      category:'',
      sort:'pop',
      promoOnly:false,
      cart: JSON.parse(localStorage.getItem('cart_bl')||'[]')
    };

    // --- RENDER CATÁLOGO
    const renderCatalog = () => {
      const root = $('#catalog');
      root.innerHTML = '';
      let items = PRODUCTS.filter(p => (
        (!state.category || p.category===state.category) &&
        (!state.q || p.name.toLowerCase().includes(state.q)) &&
        (!state.promoOnly || p.promo)
      ));
      if(state.sort==='asc') items.sort((a,b)=>a.price-b.price);
      if(state.sort==='desc') items.sort((a,b)=>b.price-a.price);
      if(items.length===0){
        root.innerHTML = `<div class="panel">Nenhum produto encontrado.</div>`;
        return;
      }
      for(const p of items){
        const card = document.createElement('article');
        card.className = 'product';
        card.setAttribute('role','listitem');
        card.innerHTML = `
          <div class="thumb"><img loading="lazy" alt="${p.name}" src="${p.img}"></div>
          <div class="body">
            <strong>${p.name}</strong>
            <div class="price">
              <span class="now">${money(p.price)}</span>
              ${p.oldPrice?`<span class="old">${money(p.oldPrice)}</span>`:''}
            </div>
            <div class="tags">${(p.tags||[]).map(t=>`<span class='tag'>${t}</span>`).join('')}</div>
            <div class="add"><button class="btn primary" data-id="${p.id}">Adicionar</button></div>
          </div>
        `;
        root.appendChild(card);
      }
      // bind add buttons
      $$('#catalog .add .btn').forEach(btn=>btn.addEventListener('click',()=>{
        addToCart(btn.dataset.id);
      }));
    };
    

    const syncCartBadge = () => $('#cartCount').textContent = state.cart.reduce((acc,i)=>acc+i.qty,0);
    const saveCart = () => { localStorage.setItem('cart_bl', JSON.stringify(state.cart)); syncCartBadge(); renderCart(); };

    const addToCart = (id) => {
      const p = PRODUCTS.find(x=>x.id===id);
      const found = state.cart.find(x=>x.id===id);
      if(found){ found.qty++; } else { state.cart.push({id:p.id, name:p.name, price:p.price, img:p.img, qty:1}); }
      saveCart();
      openCart();
    };

    const removeFromCart = (id) => { state.cart = state.cart.filter(i=>i.id!==id); saveCart(); };

    const changeQty = (id,delta) => {
      const it = state.cart.find(i=>i.id===id);
      if(!it) return;
      it.qty += delta;
      if(it.qty<=0) removeFromCart(id); else saveCart();
    };

    const cartTotal = () => state.cart.reduce((acc,i)=>acc + i.price*i.qty, 0);

    const renderCart = () => {
      const list = $('#cartList');
      list.innerHTML = '';
      if(state.cart.length===0){
        list.innerHTML = `<p>Seu carrinho está vazio.</p>`;
        $('#checkout').classList.remove('open');
      } else {
        for(const it of state.cart){
          const row = document.createElement('div');
          row.className = 'item';
          row.innerHTML = `
            <img alt="${it.name}" src="${it.img}">
            <div>
              <div><strong>${it.name}</strong></div>
              <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
                <button class="btn" data-id="${it.id}" data-act="dec">−</button>
                <span>${it.qty}</span>
                <button class="btn" data-id="${it.id}" data-act="inc">+</button>
                <button class="btn" data-id="${it.id}" data-act="rm">Remover</button>
              </div>
            </div>
            <div><b>${money(it.price*it.qty)}</b></div>
          `;
          list.appendChild(row);
        }
        $('#cartList').addEventListener('click', (e)=>{
          const b = e.target.closest('button');
          if(!b) return;
          const id = b.dataset.id; const act = b.dataset.act;
          if(act==='inc') changeQty(id,+1);
          if(act==='dec') changeQty(id,-1);
          if(act==='rm') removeFromCart(id);
        });
        $('#checkout').classList.add('open');
      }
      $('#cartTotal').textContent = money(cartTotal());
    };
    

    // --- UI CART
    const cartPanel = $('#cartPanel');
    const openCart = () => { cartPanel.classList.add('open'); cartPanel.setAttribute('aria-hidden','false'); };
    const closeCart = () => { cartPanel.classList.remove('open'); cartPanel.setAttribute('aria-hidden','true'); };

    $('#openCart').addEventListener('click', openCart);
    $('#openCartFloating').addEventListener('click', openCart);
    $('#closeCart').addEventListener('click', closeCart);
    $('#cartCloseBtn').addEventListener('click', closeCart);

    $('#clearCart').addEventListener('click', ()=>{ state.cart=[]; saveCart(); });
    $('#goCheckout').addEventListener('click', ()=>{ $('#checkout').classList.add('open'); });

    // --- CHECKOUT (simples; envia resumo por e‑mail/whatsapp manualmente)
    $('#finishOrder').addEventListener('click', ()=>{
  const name=$('#cName').value.trim(), email=$('#cEmail').value.trim();
  if(!name || !email){
    $('#orderStatus').textContent='Preencha nome e e-mail para continuar.';
    $('#orderStatus').style.color='var(--warn)';
    return;
  }
  const pedido = {
    cliente: {
      nome:name,
      email,
      telefone: $('#cPhone').value.trim(),
      doc: $('#cDoc').value.trim(),
      endereco: $('#cAddress').value.trim()
    },
    itens: state.cart,
    total: cartTotal()
  };
  const resumo = encodeURIComponent('Pedido BL Solutions%0A'+JSON.stringify(pedido,null,2));
  $('#orderStatus').innerHTML = `Pedido pronto! Envie pelo <a target="_blank" rel="noopener" href="https://wa.me/5511977268599?text=${resumo}">WhatsApp</a>.`;
  $('#orderStatus').style.color='var(--ok)';
});

    // --- FILTROS
    $('#q').addEventListener('input', e=>{ state.q = e.target.value.toLowerCase(); renderCatalog(); });
    $('#category').addEventListener('change', e=>{ state.category = e.target.value; renderCatalog(); });
    $('#sort').addEventListener('change', e=>{ state.sort = e.target.value; renderCatalog(); });
    $('#promoOnly').addEventListener('change', e=>{ state.promoOnly = e.target.checked; renderCatalog(); });
    $('#clearFilters').addEventListener('click', ()=>{ state.q=''; state.category=''; state.sort='pop'; state.promoOnly=false; $('#q').value=''; $('#category').value=''; $('#sort').value='pop'; $('#promoOnly').checked=false; renderCatalog(); });

    // --- CONTATO (demo)
    $('#contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  $('#contactStatus').textContent = 'Recebemos sua mensagem! Responderemos em breve.';
  $('#contactStatus').style.color = 'var(--ok)';
  e.target.reset();
});

    // --- MENU MOBILE: clonar links para versão mobile e controlar submenu
   function enableMobileSubmenus(){
  document.querySelectorAll('.nav-item a').forEach(a=>{
    a.removeEventListener('click', mobileSubHandler);
    if(window.innerWidth <= 768){
      a.addEventListener('click', mobileSubHandler);
    }
  });
}

    // Enable submenu toggles on mobile
    function enableMobileSubmenus(){
      if(window.innerWidth <= 768){
        document.querySelectorAll('.nav-item').forEach(item=>{
          const btn = item.querySelector('a');
          btn.removeEventListener('click', mobileSubHandler);
          btn.addEventListener('click', mobileSubHandler);
        });
      } else {
        document.querySelectorAll('.nav-item a').forEach(a=>{
          a.removeEventListener('click', mobileSubHandler);
        });
      }
    }
    function mobileSubHandler(e){
      const parent = e.currentTarget.closest('.nav-item');
      const submenu = parent.querySelector('.submenu');
      if(submenu){
        e.preventDefault();
        submenu.classList.toggle('show');
      }
    }

    window.addEventListener('resize', enableMobileSubmenus);

    // --- INIT
    renderCatalog();
    renderCart();
    syncCartBadge();
    enableMobileSubmenus();
    document.getElementById('year').textContent = new Date().getFullYear();
  // Cookie consent
    if(localStorage.getItem('cookiesAccepted')){
      document.getElementById('cookieConsent').style.display='none';
    }
    document.getElementById('acceptCookies').addEventListener('click',()=>{
      localStorage.setItem('cookiesAccepted','yes');
      document.getElementById('cookieConsent').style.display='none';
    }); 


    
// MiniPerifericos//

  const checkPromocao = document.getElementById('promocao');
  const limparFiltrosBtn = document.getElementById('limparFiltros');

  checkPromocao.addEventListener('change', () => {
    filtrarProdutos();
  });

  limparFiltrosBtn.addEventListener('click', () => {
    document.getElementById('buscaNome').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('ordem').value = 'populares';
    checkPromocao.checked = false;
    filtrarProdutos();
  });

  function filtrarProdutos() {
    // Aqui você filtra os produtos no DOM
    // Exemplo básico:
    document.querySelectorAll('.produto').forEach(produto => {
      const emPromocao = produto.dataset.promocao === 'true';
      if (checkPromocao.checked && !emPromocao) {
        produto.style.display = 'none';
      } else {
        produto.style.display = 'block';
      }
    });
  }

