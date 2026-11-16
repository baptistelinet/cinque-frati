# Cinque Frati · La Corse, à table.

Version 2 : direction artistique « La Corse en épure » (Chillax, Inter, Instrument Serif ; arches ; grandes images, animations au défilement).

Site vitrine et boutique de démonstration de **Cinque Frati**, épicerie fine corse et comptoir de dégustation aux Halles de Lyon Paul Bocuse.

> Projet **fictif** réalisé par Baptiste Linet dans le cadre d'un portfolio d'architecture d'intérieur (phase APD, 29/04/2025). Aucune vente réelle : le panier et les formulaires sont simulés.

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : manifeste, rayons, sélection du moment, comptoir, ateliers, infos pratiques |
| `boutique.html` | Catalogue filtrable (64 produits, 7 rayons), fiches produits, panier de démonstration |
| `degustation.html` | Carte du comptoir, salon premium et ateliers, Club, réservation (démo) |
| `maison.html` | Histoire, le nom, engagements |
| `lieu.html` | L'architecture du stand : rendus, plan, zoning, matériaux |

Version anglaise dans `en/` (mêmes pages), avec un sélecteur FR/EN dans l'en-tête.

## Modifier les textes des pages

Les pages sont générées : modifier `sources/fr/<page>.html` ou `sources/en/<page>.html` (et `sources/tete.html` pour l'en-tête HTML commun), puis lancer `python3 outils/construire_pages.py`.

## Mettre à jour le catalogue

1. Modifier `donnees/catalogue.json` (français) et `donnees/catalogue-en.json` (anglais, par référence `CF-xxx`).
2. Lancer `python3 outils/generer_catalogue.py` (régénère `assets/js/catalogue.js`).
3. Pour ajouter une photo produit : déposer `assets/img/produits/<slug>.jpg` (format 4:5) puis relancer le script.
4. Pour illustrer un rayon de l'accueil : déposer `assets/img/rayons/<id-du-rayon>.jpg` (ex. `charcuterie.jpg`, format 3:4) puis relancer le script.

## Images

Rendus et photos générés dans Gemini (16/11/2026), redimensionnés depuis `/mnt/project-files/v2/images/rendus-gemini/` et `illustrations/gemini/`. Le pied de page le signale. Photos de rayon dans `assets/img/rayons/<id>.jpg`, photos produit dans `assets/img/produits/<slug>.jpg`.

## Pictogrammes et motifs

- `assets/img/pictos.svg` : sprite des 25 pictogrammes (symboles `picto-NOM`). Usage : `<svg class="picto"><use href="assets/img/pictos.svg#picto-vins"/></svg>`. Couleur du trait via `color`, détail d'accent via `--picto-accent`, épaisseur via `--picto-trait`. Source : `/mnt/project-files/v2/images/pictos/`.
- `assets/img/motifs/` : tuiles d'arches (fond de la box A Scatula, frise du pied de page) et sceaux.

## Identité

Terracotta `#c05839` (RAL 2001) · Vert maquis `#8a9082` (RAL 7033) · Grège `#ddd6cc` (RAL 9002) · police Chillax (Fontshare).

Site statique (HTML, CSS, JavaScript), publié avec GitHub Pages.
