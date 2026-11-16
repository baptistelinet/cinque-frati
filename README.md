# Cinque Frati · La Corse, à table.

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
3. Pour ajouter une photo produit : déposer `assets/img/produits/<slug>.jpg` puis relancer le script.

## Identité

Terracotta `#c05839` (RAL 2001) · Vert maquis `#8a9082` (RAL 7033) · Grège `#ddd6cc` (RAL 9002) · police Chillax (Fontshare).

Site statique (HTML, CSS, JavaScript), publié avec GitHub Pages.
