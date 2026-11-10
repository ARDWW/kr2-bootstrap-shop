"""Переключает проект на локальный Bootstrap (без CDN).
Запуск из папки проекта:  python use_local.py
Скрипт скачает bootstrap.min.css и bootstrap.bundle.min.js в vendor/bootstrap/ и заменит ссылки во всех html.
"""
import glob, os, urllib.request

VER = "5.3.8"
BASE = "https://cdn.jsdelivr.net/npm/bootstrap@" + VER + "/dist/"
FILES = {"css/bootstrap.min.css": "vendor/bootstrap/css/bootstrap.min.css",
         "js/bootstrap.bundle.min.js": "vendor/bootstrap/js/bootstrap.bundle.min.js"}

for remote, local in FILES.items():
    os.makedirs(os.path.dirname(local), exist_ok=True)
    urllib.request.urlretrieve(BASE + remote, local)
    print("скачан", local)

for page in glob.glob("*.html"):
    text = open(page, encoding="utf-8").read()
    for remote, local in FILES.items():
        text = text.replace(BASE + remote, local)
    open(page, "w", encoding="utf-8").write(text)
    print("обновлён", page)
print("Готово. Не забудьте поменять в README способ подключения на «локально».")
