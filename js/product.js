// страница товара: подставляет данные по параметру ?id=
(function () {
  'use strict';
  var id = parseInt(new URLSearchParams(location.search).get('id'), 10) || 1;
  var p = PRODUCTS.filter(function (x) { return x.id === id; })[0] || PRODUCTS[0];
  var BADGE = { 'Хит': 'text-bg-warning', 'Новинка': 'text-bg-success', 'Скидка': 'text-bg-danger' };

  document.title = p.t + ' - Ход конём';
  document.getElementById('bcName').textContent = p.t;
  document.getElementById('pTitle').textContent = p.t;
  document.getElementById('pShort').textContent = p.s;
  document.getElementById('pDesc').textContent = p.d;
  document.getElementById('pPrice').textContent = p.price.toLocaleString('ru-RU') + ' ₽';
  var img = document.getElementById('pImg');
  img.src = 'images/p' + p.id + '.svg';
  img.alt = 'Коробка игры ' + p.t;

  var badges = document.getElementById('pBadges');
  badges.innerHTML = '';
  if (p.badge) {
    var b = document.createElement('span');
    b.className = 'badge ' + BADGE[p.badge] + ' me-1';
    b.textContent = p.badge;
    badges.appendChild(b);
  }
  var c = document.createElement('span');
  c.className = 'badge text-bg-light border';
  c.textContent = p.cat;
  badges.appendChild(c);

  var rows = [['Категория', p.cat], ['Игроков', p.pl], ['Время партии', p.time], ['Возраст', p.age]];
  var tbody = document.getElementById('pSpecs');
  tbody.innerHTML = '';
  rows.forEach(function (r) {
    var tr = document.createElement('tr');
    var th = document.createElement('th'); th.scope = 'row'; th.textContent = r[0];
    var td = document.createElement('td'); td.textContent = r[1];
    tr.appendChild(th); tr.appendChild(td); tbody.appendChild(tr);
  });

  var add = document.getElementById('pAdd');
  add.dataset.id = p.id;
  add.dataset.title = p.t;
  document.getElementById('pOrder').href = 'order.html?product=' + p.id;

  var qty = document.getElementById('qty');
  document.getElementById('qMinus').addEventListener('click', function () { qty.value = Math.max(1, (parseInt(qty.value, 10) || 1) - 1); });
  document.getElementById('qPlus').addEventListener('click', function () { qty.value = Math.min(10, (parseInt(qty.value, 10) || 1) + 1); });
})();
