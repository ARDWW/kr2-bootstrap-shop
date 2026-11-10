// фильтр, поиск и постраничный вывод каталога
(function () {
  'use strict';
  var PER_PAGE = 6;
  var cols = Array.prototype.slice.call(document.querySelectorAll('.product-col'));
  var search = document.getElementById('fSearch');
  var cat = document.getElementById('fCat');
  var max = document.getElementById('fMax');
  var pager = document.getElementById('pager');
  var empty = document.getElementById('emptyAlert');
  var counter = document.getElementById('resultCount');
  var page = 1;

  function filtered() {
    var q = search.value.trim().toLowerCase();
    var limit = parseInt(max.value, 10);
    return cols.filter(function (c) {
      var okName = !q || c.dataset.name.indexOf(q) !== -1;
      var okCat = !cat.value || c.dataset.cat === cat.value;
      var okPrice = isNaN(limit) || parseInt(c.dataset.price, 10) <= limit;
      return okName && okCat && okPrice;
    });
  }

  function render() {
    var list = filtered();
    var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (page > pages) page = pages;
    cols.forEach(function (c) { c.classList.add('d-none'); });
    list.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(function (c) { c.classList.remove('d-none'); });
    empty.classList.toggle('d-none', list.length > 0);
    counter.textContent = 'Найдено игр: ' + list.length;

    pager.innerHTML = '';
    pager.classList.toggle('d-none', pages === 1);
    for (var i = 1; i <= pages; i++) {
      var li = document.createElement('li');
      li.className = 'page-item' + (i === page ? ' active' : '');
      var a = document.createElement('button');
      a.type = 'button';
      a.className = 'page-link';
      a.textContent = i;
      if (i === page) a.setAttribute('aria-current', 'page');
      a.addEventListener('click', (function (n) { return function () { page = n; render(); }; })(i));
      li.appendChild(a);
      pager.appendChild(li);
    }
  }

  ['input', 'change'].forEach(function (ev) {
    document.getElementById('filters').addEventListener(ev, function () { page = 1; render(); });
  });
  document.getElementById('filters').addEventListener('reset', function () { setTimeout(function () { page = 1; render(); }, 0); });
  render();
})();
