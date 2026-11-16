/* Cinque Frati — v2 : en-tête, pied de page, catalogue, panier de démonstration et animations */
(function () {
  "use strict";

  var CATS = window.CATEGORIES || [];
  var PRODUITS = window.CATALOGUE || [];
  var page = document.body.dataset.page || "";

  /* ---------- Icônes ---------- */
  var ICONES = {
    charcuterie: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M24 4v6"/><ellipse cx="24" cy="27" rx="10" ry="17"/><path d="M17 20c2 1 4 0 5 2m4 4c2 1 4 0 5 2m-12 6c2 1 4 0 5 2"/></svg>',
    fromages: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6 32 40 14v20H6z"/><path d="M6 32 26 22l14-8"/><circle cx="18" cy="31" r="2"/><circle cx="30" cy="27" r="2.5"/></svg>',
    "vins-spiritueux": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M20 4h8v10c4 2 6 6 6 10v20H14V24c0-4 2-8 6-10z"/><path d="M14 28h20"/></svg>',
    "huiles-miels-epicerie": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 14h24v26a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z"/><path d="M14 8h20v6H14z"/><path d="M18 26c3-3 9-3 12 0-3 3-9 3-12 0z"/></svg>',
    douceurs: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M24 6c8 0 16 8 16 18S32 42 24 42 8 34 8 24 16 6 24 6z"/><path d="M24 6c-2 4-2 8 0 10"/><path d="M15 26c3 6 15 6 18 0"/></svg>',
    "box-coffrets": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M8 18h32v24H8z"/><path d="M6 12h36v6H6zM24 12v30"/><path d="M24 12c-4-6-12-6-10-1 1 2 6 1 10 1zm0 0c4-6 12-6 10-1-1 2-6 1-10 1z"/></svg>'
  };
  ICONES["epices-herbes-du-maquis"] = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M24 44V10"/><path d="M24 16c-6-1-9-5-9-9 5 0 8 3 9 9zm0 0c6-1 9-5 9-9-5 0-8 3-9 9zM24 28c-7-1-11-6-11-11 6 0 10 4 11 11zm0 0c7-1 11-6 11-11-6 0-10 4-11 11z"/></svg>';
  var TEINTES = { charcuterie: "#c05839", fromages: "#b89f7a", "vins-spiritueux": "#7d3b33", "huiles-miels-epicerie": "#8a9082", "epices-herbes-du-maquis": "#5f665a", douceurs: "#a8714a", "box-coffrets": "#2b2622" };
  var EN = document.documentElement.lang === "en";
  var BASE = EN ? "../" : "";
  function L(fr, en) { return EN ? en : fr; }
  function T(p, k) { return EN && p.en && k in p.en ? p.en[k] : p[k]; }
  var MENTION_ALCOOL = L("L’abus d’alcool est dangereux pour la santé, à consommer avec modération.", "Please drink responsibly.");
  var PANIER_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
  var MOUVEMENT_REDUIT = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilitaires ---------- */
  function euros(n) { return n.toLocaleString(EN ? "en-GB" : "fr-FR", { style: "currency", currency: "EUR" }); }
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function echappe(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function produit(id) { for (var i = 0; i < PRODUITS.length; i++) if (PRODUITS[i].id === id) return PRODUITS[i]; return null; }
  function categorie(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i]; return null; }
  function tous(sel, racine) { return [].slice.call((racine || document).querySelectorAll(sel)); }

  /* ---------- En-tête ---------- */
  var liens = [
    ["boutique.html", L("La boutique", "Shop"), "boutique"],
    ["degustation.html", L("Déguster", "Taste"), "degustation"],
    ["maison.html", L("La maison", "Our story"), "maison"],
    ["lieu.html", L("Le lieu", "The space"), "lieu"],
    ["index.html#visite", L("Nous trouver", "Visit us"), "visite"]
  ];
  var fichier = location.pathname.split("/").pop() || "index.html";
  var nav = liens.map(function (l, i) {
    return '<a href="' + l[0] + '"' + (page === l[2] ? ' aria-current="page"' : "") + '><span class="nav__numero">0' + (i + 1) + "</span>" + l[1] + "</a>";
  }).join("");

  document.body.insertBefore(el('<div class="progression" aria-hidden="true"></div>'), document.body.firstChild);
  document.body.insertBefore(el('<div class="bandeau-fictif">' + L("Projet fictif réalisé pour un portfolio d’architecture intérieure. Aucune vente réelle.", "Fictional project created for an interior architecture portfolio. No actual sales.") + "</div>"), document.body.children[1]);
  var entete = el(
    '<header class="entete"><div class="conteneur entete__barre">' +
      '<a class="marque" href="index.html" aria-label="' + L("Cinque Frati, accueil", "Cinque Frati, home") + '"><img src="' + BASE + 'assets/img/logo.png" alt=""><span>Cinque Frati</span></a>' +
      '<nav class="nav" id="nav" aria-label="' + L("Navigation principale", "Main navigation") + '">' + nav + "</nav>" +
      '<div class="actions"><a class="langue" href="' + (EN ? "../" : "en/") + fichier + '" hreflang="' + L("en", "fr") + '" lang="' + L("en", "fr") + '" aria-label="' + L("English version", "Version française") + '">' + L("EN", "FR") + "</a>" +
        '<button class="bouton-panier" type="button" data-ouvrir-panier aria-label="' + L("Ouvrir le panier", "Open basket") + '">' + PANIER_SVG + '<span class="libelle">' + L("Panier", "Basket") + '</span><span class="pastille" data-compteur>0</span></button>' +
        '<button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="Menu"><span></span><span></span></button>' +
      "</div></div></header>"
  );
  document.body.insertBefore(entete, document.body.children[2]);

  /* ---------- Pied de page ---------- */
  document.body.appendChild(el(
    '<footer class="pied"><div class="conteneur">' +
      '<div class="pied__appel"><div><h2>' + L("Le <em>figatellu</em> ne se commande pas. Il s’attend.", "You don’t order <em>figatellu</em>. You wait for it.") + '</h2><p style="margin:16px 0 0">' + L("Inscrivez-vous, on vous prévient le jour où il arrive.", "Sign up and we’ll tell you the day it lands.") + "</p></div>" +
        '<form class="lettre" data-lettre><label class="visuellement-cache" for="courriel">' + L("Votre e-mail", "Your email") + '</label><input id="courriel" type="email" placeholder="' + L("Votre e-mail", "Your email") + '" required><button class="bouton" type="submit">' + L("Me prévenir", "Notify me") + "</button></form></div>" +
      '<div class="pied__grille">' +
        "<div><h4>" + L("Boutique", "Shop") + "</h4>" + CATS.map(function (c) { return '<a href="boutique.html#' + c.id + '">' + T(c, "nom") + "</a>"; }).join("") + "</div>" +
        "<div><h4>Cinque Frati</h4>" + '<a href="maison.html">' + L("Notre histoire", "Our story") + '</a><a href="lieu.html">' + L("Le lieu", "The space") + '</a><a href="degustation.html">' + L("Le comptoir", "The counter") + '</a><a href="degustation.html#ateliers">' + L("Ateliers", "Workshops") + '</a><a href="degustation.html#club">' + L("Le Club", "The Club") + "</a></div>" +
        "<div><h4>" + L("Nous trouver", "Visit us") + "</h4><p>Halles de Lyon Paul Bocuse<br>102 cours Lafayette<br>69003 Lyon</p></div>" +
        "<div><h4>" + L("Horaires", "Hours") + "</h4><p>" + L("Mardi – samedi, 7 h – 19 h<br>Dimanche, 7 h – 13 h<br>Fermé le lundi", "Tuesday – Saturday, 7am – 7pm<br>Sunday, 7am – 1pm<br>Closed on Monday") + '</p><a href="https://www.instagram.com/" rel="noopener">Instagram ↗</a></div>' +
      "</div>" +
      '<p class="pied__geant" aria-hidden="true">Cinque Frati<span>.</span></p><p style="margin:18px 0 0;color:var(--creme)">Cinque Frati · ' + L("La Corse, à table.", "Corsica, at the table.") + "</p>" + '' +
      '<div class="pied__bas"><span>© ' + new Date().getFullYear() + " Cinque Frati · " + L("Conception Baptiste Linet · Projet APD, avril 2025", "Design by Baptiste Linet · Detailed design project, April 2025") + "</span><span>" + MENTION_ALCOOL + "</span></div>" +
    "</div></footer>"
  ));

  document.body.appendChild(el('<div class="voile" data-fermer-panier></div>'));
  document.body.appendChild(el(
    '<aside class="tiroir" aria-label="' + L("Panier", "Basket") + '" aria-hidden="true">' +
      '<div class="tiroir__tete"><h2>' + L("Votre panier", "Your basket") + '</h2><button class="fermer" type="button" data-fermer-panier aria-label="' + L("Fermer", "Close") + '">×</button></div>' +
      '<div class="tiroir__corps" data-lignes></div>' +
      '<div class="tiroir__pied"><div class="total"><span>Total</span><strong data-total>0 €</strong></div>' +
        '<p class="note-demo">' + L("Boutique de démonstration : aucune commande n’est réellement passée.", "Demo shop: no order is actually placed.") + "</p>" +
        '<button class="bouton" type="button" data-commander>' + L("Commander pour retrait aux Halles", "Order for pick-up at Les Halles") + "</button></div>" +
    "</aside>"
  ));
  document.body.appendChild(el('<div class="toast" role="status" aria-live="polite"></div>'));

  /* Menu mobile */
  var burger = entete.querySelector(".burger");
  var navEl = document.getElementById("nav");
  function menu(ouvrir) {
    navEl.classList.toggle("ouvert", ouvrir);
    document.body.classList.toggle("menu-ouvert", ouvrir);
    burger.setAttribute("aria-expanded", ouvrir);
  }
  burger.addEventListener("click", function () { menu(!navEl.classList.contains("ouvert")); });
  navEl.addEventListener("click", function (e) { if (e.target.closest("a")) menu(false); });
  entete.querySelector(".langue").addEventListener("click", function () { this.href = (EN ? "../" : "en/") + fichier + location.hash; });

  var toastEl = document.querySelector(".toast"), toastMinuteur;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("visible");
    clearTimeout(toastMinuteur); toastMinuteur = setTimeout(function () { toastEl.classList.remove("visible"); }, 2600);
  }
  window.cfToast = toast;
  document.querySelector("[data-lettre]").addEventListener("submit", function (e) {
    e.preventDefault(); e.target.reset(); toast(L("Merci ! (démonstration : aucune inscription enregistrée)", "Thank you! (demo: nothing was saved)"));
  });
  tous("[data-demo]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); toast(b.dataset.demo); }); });
  tous("[data-reservation]").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); f.reset(); toast(L("Merci ! Demande fictive : rien n’a été envoyé.", "Thank you! Demo request: nothing was sent.")); });
  });

  /* ---------- Visuels produits ---------- */
  function illus(cat) { return '<span class="produit__illus" style="background:' + (TEINTES[cat] || "#c05839") + '">' + (ICONES[cat] || "") + "</span>"; }
  function visuel(p) {
    if (p.image) return '<img src="' + BASE + echappe(p.image) + '" alt="' + echappe(T(p, "nom")) + '" loading="lazy">';
    return illus(p.categorie);
  }
  function prixAffiche(p) { return T(p, "prixTexte") || euros(p.prix); }
  var BADGES_EN = { "De saison": "In season", "Coup de cœur": "Staff pick", "Nouveau": "New" };
  function pastilles(p) {
    return (p.badges || []).map(function (b) { return '<span class="badge' + (b === "AOP" || b === "AOC" ? " badge--aop" : "") + '">' + echappe(EN && BADGES_EN[b] ? BADGES_EN[b] : b) + "</span>"; }).join("");
  }
  function carte(p, i) {
    return '<article class="produit revele' + (i ? " revele-retard-" + (i % 4) : "") + '">' +
      '<div class="produit__visuel"><button type="button" data-fiche="' + p.id + '" aria-label="' + L("Voir la fiche ", "View ") + echappe(T(p, "nom")) + '" style="all:unset;position:absolute;inset:0;cursor:pointer;display:grid;place-items:end center">' + visuel(p) + "</button>" +
        '<span class="produit__badges">' + pastilles(p) + "</span>" +
        '<button class="produit__ajout-rapide" type="button" data-ajouter="' + p.id + '" aria-label="' + L("Ajouter au panier : ", "Add to basket: ") + echappe(T(p, "nom")) + '">+</button></div>' +
      '<div class="produit__corps"><div class="produit__ligne"><h3>' + echappe(T(p, "nom")) + '</h3><span class="prix">' + echappe(prixAffiche(p)) + "</span></div>" +
        '<span class="produit__unite">' + echappe(T(p, "unite")) + "</span>" +
        '<button class="ajouter" type="button" data-ajouter="' + p.id + '">' + L("Ajouter", "Add") + "</button></div></article>";
  }

  /* ---------- Panier ---------- */
  var CLE = "cinque-frati-panier";
  var panier = {};
  try { panier = JSON.parse(localStorage.getItem(CLE)) || {}; } catch (e) { panier = {}; }
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(panier)); } catch (e) {} }
  var tiroir = document.querySelector(".tiroir"), voile = document.querySelector(".voile");
  function ouvrirPanier() { tiroir.classList.add("ouvert"); voile.classList.add("ouvert"); tiroir.setAttribute("aria-hidden", "false"); }
  function fermerPanier() { tiroir.classList.remove("ouvert"); voile.classList.remove("ouvert"); tiroir.setAttribute("aria-hidden", "true"); }

  function rendrePanier(saute) {
    var ids = Object.keys(panier).filter(function (id) { return produit(id) && panier[id] > 0; });
    var nb = 0, total = 0;
    var lignes = ids.map(function (id) {
      var p = produit(id), q = panier[id];
      nb += q; total += q * p.prix;
      return '<div class="ligne-panier"><span class="ligne-panier__visuel">' + visuel(p) + '</span><span class="nom">' + echappe(T(p, "nom")) + '</span><span class="unite">' + echappe(T(p, "unite")) + (T(p, "unite") ? " · " : "") + euros(p.prix) + "</span>" +
        '<span class="quantite"><button type="button" data-moins="' + id + '" aria-label="' + L("Retirer un", "Remove one") + '">−</button><span>' + q + '</span><button type="button" data-plus="' + id + '" aria-label="' + L("Ajouter un", "Add one") + '">+</button></span>' +
        '<span class="montant">' + euros(q * p.prix) + "</span></div>";
    }).join("");
    document.querySelector("[data-lignes]").innerHTML = lignes || L('<p class="panier-vide">Votre panier est vide.<br><a href="boutique.html">Découvrir la boutique</a></p>', '<p class="panier-vide">Your basket is empty.<br><a href="boutique.html">Browse the shop</a></p>');
    document.querySelector("[data-total]").textContent = euros(total);
    var c = document.querySelector("[data-compteur]");
    c.textContent = nb; if (nb) c.removeAttribute("data-vide"); else c.setAttribute("data-vide", "");
    if (saute) { c.classList.remove("saute"); void c.offsetWidth; c.classList.add("saute"); }
  }
  function ajouter(id, bouton) {
    panier[id] = (panier[id] || 0) + 1; sauver(); rendrePanier(true);
    toast(T(produit(id), "nom") + L(" ajouté au panier", " added to your basket"));
    if (bouton) {
      var avant = bouton.textContent; bouton.classList.add("ok");
      bouton.textContent = bouton.classList.contains("produit__ajout-rapide") ? "✓" : L("Ajouté ✓", "Added ✓");
      setTimeout(function () { bouton.classList.remove("ok"); bouton.textContent = avant; }, 1400);
    }
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-ouvrir-panier],[data-fermer-panier],[data-plus],[data-moins],[data-ajouter],[data-commander],[data-fiche]");
    if (!t) return;
    if (t.hasAttribute("data-ouvrir-panier")) ouvrirPanier();
    else if (t.hasAttribute("data-fermer-panier")) fermerPanier();
    else if (t.dataset.plus) { panier[t.dataset.plus]++; sauver(); rendrePanier(true); }
    else if (t.dataset.moins) { panier[t.dataset.moins]--; if (panier[t.dataset.moins] <= 0) delete panier[t.dataset.moins]; sauver(); rendrePanier(); }
    else if (t.dataset.ajouter) ajouter(t.dataset.ajouter, t);
    else if (t.hasAttribute("data-commander")) {
      if (!Object.keys(panier).length) { toast(L("Votre panier est vide", "Your basket is empty")); return; }
      panier = {}; sauver(); rendrePanier(); fermerPanier();
      toast(L("Merci ! Commande fictive : rien n’a été débité.", "Thank you! Demo order: nothing was charged."));
    } else if (t.dataset.fiche) ouvrirFiche(t.dataset.fiche);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { fermerPanier(); menu(false); } });
  rendrePanier();

  /* ---------- Fiche produit ---------- */
  var dialogue;
  function ouvrirFiche(id) {
    var p = produit(id); if (!p) return;
    if (!dialogue) { dialogue = el('<dialog class="fiche"></dialog>'); document.body.appendChild(dialogue); dialogue.addEventListener("click", function (e) { if (e.target === dialogue || e.target.closest(".fermer") || e.target.closest("[data-ajouter]")) { if (!e.target.closest("[data-ajouter]")) dialogue.close(); } }); }
    var c = categorie(p.categorie);
    dialogue.innerHTML = '<button class="fermer" type="button" aria-label="' + L("Fermer", "Close") + '">×</button><div class="fiche__grille">' +
      '<div class="produit__visuel">' + visuel(p) + '<span class="produit__badges">' + pastilles(p) + "</span></div>" +
      '<div class="fiche__texte"><span class="surtitre">' + echappe(c ? c.nomCorse + " · " + T(c, "nom") : "") + "</span><h2>" + echappe(T(p, "nom")) + "</h2>" +
      '<span class="produit__unite">' + echappe(T(p, "unite")) + (T(p, "unite") ? " · " : "") + L("réf. ", "ref. ") + echappe(p.ref) + '</span><p style="font-size:1.1rem">' + echappe(T(p, "description")) + "</p>" +
      '<p class="produit__unite">' + L("Goûtez-le au comptoir.", "Taste it at the counter.") + "</p>" +
      '<div class="produit__ligne"><span class="prix" style="font-size:1.4rem">' + echappe(prixAffiche(p)) + '</span><button class="bouton" type="button" data-ajouter="' + p.id + '">' + L("Ajouter au panier", "Add to basket") + "</button></div>" +
      (p.alcool ? '<p class="mention-alcool">' + MENTION_ALCOOL + "</p>" : "") + "</div></div>";
    if (dialogue.showModal) dialogue.showModal(); else dialogue.setAttribute("open", "");
  }

  /* ---------- Contenus générés ---------- */
  var CARTES = window.CARTES || {};
  tous("[data-carte]").forEach(function (zone) {
    var bloc = CARTES[zone.dataset.carte]; if (!bloc) return;
    zone.innerHTML = bloc.produits.map(function (p) {
      return '<li class="menu__ligne revele"><div><strong>' + echappe(T(p, "nom")) + "</strong>" + (T(p, "unite") ? ' <span class="produit__unite">· ' + echappe(T(p, "unite")) + "</span>" : "") +
        "<p>" + echappe(T(p, "description")) + '</p></div><span class="prix">' + echappe(T(p, "prixTexte")) + "</span></li>";
    }).join("");
  });

  /* Rayons (rail horizontal) : image assets/img/rayons/<id>.jpg si elle existe */
  tous("[data-rayons]").forEach(function (rail) {
    rail.innerHTML = CATS.map(function (c, i) {
      return '<a class="rayon revele revele-retard-' + (i % 4) + '" href="boutique.html#' + c.id + '" style="background:' + (TEINTES[c.id] || "#4f564b") + '">' +
        '<span class="rayon__illus">' + (ICONES[c.id] || "") + "</span>" +
        (c.image ? '<img src="' + BASE + c.image + '" alt="" loading="lazy">' : "") +
        '<span class="rayon__texte"><small>' + echappe(c.nomCorse) + "</small><h3>" + echappe(T(c, "nom")) + "</h3></span></a>";
    }).join("");
  });

  var vedettes = document.querySelector("[data-vedettes]");
  if (vedettes) vedettes.innerHTML = PRODUITS.filter(function (p) { return p.vedette; }).slice(0, 4).map(carte).join("");

  /* Boutique : filtres + recherche */
  var grille = document.querySelector("[data-boutique]");
  if (grille) {
    var filtres = document.querySelector("[data-filtres]");
    var intro = document.querySelector("[data-intro]");
    var recherche = document.querySelector("[data-recherche]");
    var courante = (location.hash || "").slice(1);
    if (!categorie(courante)) courante = "";
    filtres.innerHTML = '<button class="filtre" type="button" data-cat="">' + L("Tout", "All") + "</button>" + CATS.map(function (c) {
      return '<button class="filtre" type="button" data-cat="' + c.id + '">' + echappe(T(c, "nom")) + "</button>";
    }).join("");
    var afficher = function () {
      var q = (recherche.value || "").trim().toLowerCase();
      tous(".filtre", filtres).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.cat === courante); });
      var c = categorie(courante);
      var liste = PRODUITS.filter(function (p) {
        return (!courante || p.categorie === courante) &&
          (!q || (p.nom + " " + p.description + " " + T(p, "nom") + " " + T(p, "description") + " " + p.badges.join(" ")).toLowerCase().indexOf(q) !== -1);
      });
      intro.innerHTML = "<div><h2>" + echappe(c ? T(c, "nom") : L("Toute la boutique", "The whole shop")) + "</h2><p>" +
        echappe(c ? T(c, "accroche") : L("Des produits choisis un par un chez les producteurs de l’île.", "Products chosen one by one from the island’s producers.")) + '</p></div><span class="compte">' + liste.length + L(" produits", " products") + "</span>";
      grille.innerHTML = liste.length ? liste.map(carte).join("") : '<p class="panier-vide">' + L("Aucun produit ne correspond à votre recherche.", "No product matches your search.") + "</p>";
      observer();
    };
    filtres.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]"); if (!b) return;
      courante = b.dataset.cat;
      history.replaceState(null, "", courante ? "#" + courante : location.pathname);
      afficher();
    });
    recherche.addEventListener("input", afficher);
    window.addEventListener("hashchange", function () { var h = location.hash.slice(1); courante = categorie(h) ? h : ""; afficher(); });
    afficher();
  }

  /* ---------- Animations ---------- */
  /* Apparitions */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entrees) {
    entrees.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("vu"); io.unobserve(en.target);
      if (en.target.hasAttribute("data-compte")) compter(en.target);
    });
  }, { rootMargin: "0px 0px -10% 0px" }) : null;
  function observer() { tous(".revele:not(.vu), .devoile:not(.vu), [data-compte]:not(.vu)").forEach(function (n) { if (io && !MOUVEMENT_REDUIT) io.observe(n); else { n.classList.add("vu"); } }); }
  observer();

  /* Compteurs */
  function compter(n) {
    var fin = parseFloat(n.dataset.compte), suffixe = n.dataset.suffixe || "", t0 = null;
    function pas(t) { t0 = t0 || t; var k = Math.min(1, (t - t0) / 1600); k = 1 - Math.pow(1 - k, 3); n.textContent = Math.round(fin * k).toLocaleString(EN ? "en-GB" : "fr-FR") + suffixe; if (k < 1) requestAnimationFrame(pas); }
    requestAnimationFrame(pas);
  }

  /* Manifeste mot à mot */
  var manifestes = tous(".manifeste");
  manifestes.forEach(function (m) {
    m.innerHTML = m.textContent.trim().split(/\s+/).map(function (w) { return '<span class="mot">' + echappe(w) + "</span>"; }).join(" ");
  });

  /* Rails : glisser à la souris + flèches */
  tous(".rail").forEach(function (rail) {
    var x0, s0, bouge = false;
    rail.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; x0 = e.clientX; s0 = rail.scrollLeft; bouge = false; rail.classList.add("glisse"); });
    window.addEventListener("pointermove", function (e) { if (x0 == null) return; var d = e.clientX - x0; if (Math.abs(d) > 4) bouge = true; rail.scrollLeft = s0 - d; });
    window.addEventListener("pointerup", function () { x0 = null; rail.classList.remove("glisse"); });
    rail.addEventListener("click", function (e) { if (bouge) { e.preventDefault(); bouge = false; } }, true);
    rail.addEventListener("dragstart", function (e) { e.preventDefault(); });
    var outils = document.querySelector('[data-rail-pour="' + rail.id + '"]');
    if (outils) outils.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      rail.scrollBy({ left: (b.dataset.sens === "suiv" ? 1 : -1) * rail.clientWidth * .7, behavior: "smooth" });
    });
  });

  /* Aperçu d'image au survol des listes */
  var apercu = null;
  tous(".liste-index a[data-image]").forEach(function (a) {
    if (!apercu) { apercu = el('<div class="apercu" aria-hidden="true"><img alt=""></div>'); document.body.appendChild(apercu); }
    a.addEventListener("mouseenter", function () { apercu.querySelector("img").src = a.dataset.image; apercu.classList.add("visible"); });
    a.addEventListener("mouseleave", function () { apercu.classList.remove("visible"); });
    a.addEventListener("mousemove", function (e) { apercu.style.left = e.clientX + 30 + "px"; apercu.style.top = e.clientY + "px"; });
  });

  /* Défilement : en-tête, progression, parallaxe, manifeste */
  var heros = document.body.hasAttribute("data-heros");
  var barre = document.querySelector(".progression");
  var paralaxes = tous(".parallaxe img, .plein-cadre > .cadre-fond img");
  var dernierY = 0, prevu = false;
  function auDefilement() {
    prevu = false;
    var y = window.scrollY, h = window.innerHeight, total = document.documentElement.scrollHeight - h;
    barre.style.transform = "scaleX(" + (total > 0 ? y / total : 0) + ")";
    entete.classList.toggle("solide", !heros || y > h * .7);
    entete.classList.toggle("cache", y > dernierY && y > h && !navEl.classList.contains("ouvert"));
    dernierY = y;
    if (MOUVEMENT_REDUIT) return;
    paralaxes.forEach(function (img) {
      var r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > h) return;
      var k = (r.top + r.height / 2 - h / 2) / (h + r.height);
      img.style.transform = "translate3d(0," + (k * -16).toFixed(2) + "%,0)";
    });
    manifestes.forEach(function (m) {
      var r = m.getBoundingClientRect();
      var k = Math.min(1, Math.max(0, (h * .85 - r.top) / (r.height + h * .35)));
      var mots = m.children, n = Math.round(k * mots.length);
      for (var i = 0; i < mots.length; i++) mots[i].classList.toggle("allume", i < n);
    });
  }
  window.addEventListener("scroll", function () { if (!prevu) { prevu = true; requestAnimationFrame(auDefilement); } }, { passive: true });
  window.addEventListener("resize", auDefilement);
  auDefilement();
})();
