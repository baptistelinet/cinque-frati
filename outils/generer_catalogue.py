#!/usr/bin/env python3
"""Génère assets/js/catalogue.js à partir de donnees/catalogue.json.

Usage (depuis la racine du dépôt) : python3 outils/generer_catalogue.py
Les images produits sont prises automatiquement si un fichier
assets/img/produits/<slug>.jpg (ou .webp / .png) existe.
"""
import json, re, pathlib

RACINE = pathlib.Path(__file__).resolve().parent.parent
SOURCE = RACINE / "donnees" / "catalogue.json"
CIBLE = RACINE / "assets" / "js" / "catalogue.js"
IMAGES = RACINE / "assets" / "img" / "produits"

ACCROCHES = {
    "charcuterie": "Porc nustrale élevé en liberté, châtaignes et glands, séché à l'air des montagnes. La charcuterie corse ne se presse pas.",
    "fromages": "Lait cru de brebis et de chèvre, bergeries de montagne, caves naturelles. Des fromages qui ont du caractère, comme ceux qui les font.",
    "vins-spiritueux": "Neuf AOC, des cépages qu'on ne trouve nulle part ailleurs : niellucciu, sciaccarellu, vermentinu.",
    "huiles-miels-epicerie": "Olives tombées au filet, miels AOP de six saisons, châtaigne moulue à la meule : le garde-manger d'une maison corse.",
    "epices-herbes-du-maquis": "Le maquis se respire avant de se goûter : myrte, nepita, immortelle, cueillis à la main.",
    "douceurs": "Canistrelli, fiadone du matin, nougat au miel : la Corse côté goûter.",
    "box-coffrets": "À offrir ou à s'offrir. Livraison à vélo dans Lyon, offerte dès 60 €.",
}
VEDETTES = {"CF-104", "CF-201", "CF-301", "CF-704"}
DE_SAISON = {"CF-104", "CF-201", "CF-202", "CF-606", "CF-704"}
RARES = {"CF-305", "CF-406", "CF-204"}
COUPS_DE_COEUR = {"CF-109", "CF-205", "CF-403", "CF-604", "CF-702"}
NOUVEAU = {"CF-311", "CF-707"}
BOUTIQUE = ["charcuterie", "fromages", "vins-spiritueux", "huiles-miels-epicerie", "epices-herbes-du-maquis", "douceurs", "box-coffrets"]


def prix_nombre(texte):
    m = re.search(r"(\d+(?:,\d+)?)", texte)
    return float(m.group(1).replace(",", ".")) if m else 0.0


def badges(p):
    b = []
    if re.search(r"\bAO[PC]\b", p["nom"]):
        b.append("AOP" if "AOP" in p["nom"] else "AOC")
    for ens, nom in ((DE_SAISON, "De saison"), (RARES, "Rare"), (COUPS_DE_COEUR, "Coup de cœur"), (NOUVEAU, "Nouveau")):
        if p["ref"] in ens:
            b.append(nom)
    return b


def image(slug):
    for ext in ("webp", "jpg", "png"):
        if (IMAGES / f"{slug}.{ext}").exists():
            return f"assets/img/produits/{slug}.{ext}"
    return ""


def main():
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    cats, produits, extra = [], [], {}
    for c in data:
        if c["slug"] in BOUTIQUE:
            cats.append({"id": c["slug"], "nom": c["categorie"], "nomCorse": c["nom_corse"], "accroche": ACCROCHES.get(c["slug"], "")})
        items = []
        for p in c["produits"]:
            items.append({
                "id": p["slug"], "ref": p["ref"], "categorie": c["slug"], "nom": p["nom"],
                "description": p["description"], "unite": p.get("format", ""),
                "prix": prix_nombre(p["prix"]), "prixTexte": p["prix"],
                "badges": badges(p), "vedette": p["ref"] in VEDETTES,
                "alcool": c["slug"] == "vins-spiritueux" and p["ref"] not in ("CF-312",),
                "image": image(p["slug"]),
            })
        if c["slug"] in BOUTIQUE:
            produits += items
        else:
            extra[c["slug"]] = {"nom": c["categorie"], "nomCorse": c["nom_corse"], "produits": items}
    js = ("/* Fichier généré par outils/generer_catalogue.py à partir de donnees/catalogue.json. Ne pas modifier à la main. */\n"
          f"window.CATEGORIES = {json.dumps(cats, ensure_ascii=False, indent=1)};\n"
          f"window.CATALOGUE = {json.dumps(produits, ensure_ascii=False, indent=1)};\n"
          f"window.CARTES = {json.dumps(extra, ensure_ascii=False, indent=1)};\n")
    CIBLE.write_text(js, encoding="utf-8")
    print(f"{len(produits)} produits boutique, {sum(len(v['produits']) for v in extra.values())} formules comptoir/salon -> {CIBLE.relative_to(RACINE)}")


if __name__ == "__main__":
    main()
