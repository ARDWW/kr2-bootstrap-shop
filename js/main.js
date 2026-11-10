// общий скрипт для всех страниц: корзина, toast и форма в модальном окне
(function () {
  'use strict';
  var KEY = 'hk_cart_count';

  function getCount() {
    try { return parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) { return 0; }
  }
  function setCount(n) {
    try { localStorage.setItem(KEY, String(n)); } catch (e) { /* хранилище недоступно */ }
    document.querySelectorAll('#cartCount, #cartCount2').forEach(function (el) { el.textContent = n; });
  }
  setCount(getCount());

  // кнопки "В корзину"
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.js-add');
    if (!btn) return;
    var qtyInput = document.getElementById('qty');
    var qty = btn.id === 'pAdd' && qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
    setCount(getCount() + qty);
    document.getElementById('cartToastText').textContent = btn.dataset.title + ' добавлена в корзину (' + qty + ' шт.)';
    bootstrap.Toast.getOrCreateInstance(document.getElementById('cartToast'), { delay: 2500 }).show();
  });

  // форма "Задать вопрос" в модальном окне
  var askForm = document.getElementById('askForm');
  var askOk = document.getElementById('askOk');
  askForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!askForm.checkValidity()) { askForm.classList.add('was-validated'); return; }
    askOk.classList.remove('d-none');
    askForm.reset();
    askForm.classList.remove('was-validated');
  });
  document.getElementById('askModal').addEventListener('hidden.bs.modal', function () {
    askOk.classList.add('d-none');
    askForm.classList.remove('was-validated');
  });
})();
