#!/usr/bin/env python3
"""Assemble les pages du site à partir de sources/.

sources/fr/*.html -> racine du site ; sources/en/*.html -> en/
Chaque source commence par <!--TITRE: ...--> et <!--DESC: ...-->, puis le <body>.
Usage (depuis la racine du dépôt) : python3 outils/construire_pages.py
"""
import re, pathlib

RACINE = pathlib.Path(__file__).resolve().parent.parent
TETE = (RACINE / "sources" / "tete.html").read_text(encoding="utf-8")
LANGUES = {"fr": ("", RACINE, "", "en/"), "en": ("../", RACINE / "en", "../", "")}

for langue, (base, sortie, vers_fr, vers_en) in LANGUES.items():
    sortie.mkdir(exist_ok=True)
    for src in sorted((RACINE / "sources" / langue).glob("*.html")):
        s = src.read_text(encoding="utf-8")
        titre = re.search(r"<!--TITRE: (.*?)-->", s).group(1)
        desc = re.search(r"<!--DESC: (.*?)-->", s).group(1).replace('"', "&quot;")
        corps = re.sub(r"<!--(TITRE|DESC): .*?-->\n", "", s)
        if base:
            corps = re.sub(r'(src|href)="assets/', r'\1="' + base + "assets/", corps)
        tete = (TETE.replace("__LANG__", langue).replace("__TITRE__", titre).replace("__DESC__", desc)
                .replace("__BASE__", base).replace("__VERS_FR__", vers_fr).replace("__VERS_EN__", vers_en)
                .replace("__FICHIER__", src.name))
        (sortie / src.name).write_text(tete + corps, encoding="utf-8")
        print(langue, src.name)
