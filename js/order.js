// форма заявки: проверка и сообщение об успехе (сервера нет, данные никуда не уходят)
(function () {
  'use strict';
  var form = document.getElementById('orderForm');
  var ok = document.getElementById('orderOk');
  var select = document.getElementById('oProduct');

  // если пришли со страницы товара: order.html?product=3
  var pre = new URLSearchParams(location.search).get('product');
  if (pre && select.querySelector('option[value="' + pre + '"]')) select.value = pre;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      var firstBad = form.querySelector(':invalid');
      if (firstBad) firstBad.focus();
      return;
    }
    var name = document.getElementById('oName').value.trim();
    var title = select.options[select.selectedIndex].text.split(' - ')[0];
    ok.textContent = 'Спасибо, ' + name + '! Заявка на «' + title + '» принята, менеджер скоро позвонит.';
    ok.classList.remove('d-none');
    ok.focus();
    form.reset();
    form.classList.remove('was-validated');
    ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  form.addEventListener('reset', function () { form.classList.remove('was-validated'); });
})();
