/* Cinque Frati — en-tête, pied de page, catalogue et panier de démonstration */
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
  var MENTION_ALCOOL = L("L’abus d’alcool est dangereux pour la santé, à consommer avec modération.", "Alcohol abuse is dangerous for your health. Please drink responsibly.");
  var PANIER_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';

  /* ---------- Utilitaires ---------- */
  function euros(n) { return n.toLocaleString(EN ? "en-GB" : "fr-FR", { style: "currency", currency: "EUR" }); }
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function echappe(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function produit(id) { for (var i = 0; i < PRODUITS.length; i++) if (PRODUITS[i].id === id) return PRODUITS[i]; return null; }
  function categorie(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i]; return null; }

  /* ---------- En-tête et pied ---------- */
  var liens = [
    ["boutique.html", L("La boutique", "Shop"), "boutique"],
    ["degustation.html", L("Déguster", "Taste"), "degustation"],
    ["maison.html", L("La maison", "Our story"), "maison"],
    ["lieu.html", L("Le lieu", "The space"), "lieu"],
    ["index.html#visite", L("Nous trouver", "Visit us"), "visite"]
  ];
  var fichier = location.pathname.split("/").pop() || "index.html";
  var autreLangue = (EN ? "../" : "en/") + fichier + location.hash;
  var nav = liens.map(function (l) {
    return '<a href="' + l[0] + '"' + (page === l[2] ? ' aria-current="page"' : "") + ">" + l[1] + "</a>";
  }).join("");

  document.body.insertBefore(el('<div class="bandeau-fictif">' + L("Projet fictif réalisé dans le cadre d’un portfolio d’architecture d’intérieur. Aucune vente réelle.", "A fictional project created for an interior architecture portfolio. Nothing is actually sold.") + '</div>'), document.body.firstChild);
  document.body.insertBefore(el(
    '<header class="entete"><div class="conteneur entete__barre">' +
      '<a class="marque" href="index.html" aria-label="' + L("Cinque Frati, accueil", "Cinque Frati, home") + '"><img src="' + BASE + 'assets/img/logo.png" alt=""><span>Cinque Frati</span></a>' +
      '<nav class="nav" id="nav" aria-label="' + L("Navigation principale", "Main navigation") + '">' + nav + "</nav>" +
      '<div class="actions"><a class="langue" href="' + autreLangue + '" hreflang="' + L("en", "fr") + '" lang="' + L("en", "fr") + '" aria-label="' + L("English version", "Version française") + '">' + L("EN", "FR") + "</a>" +
        '<button class="bouton-panier" type="button" data-ouvrir-panier aria-label="' + L("Ouvrir le panier", "Open basket") + '">' + PANIER_SVG + '<span class="libelle">' + L("Panier", "Basket") + "</span>" + '<span class="pastille" data-compteur>0</span></button>' +
        '<button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="Menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>' +
      "</div></div></header>"
  ), document.body.children[1]);

  document.body.appendChild(el(
    '<footer class="pied"><div class="conteneur">' +
      '<div class="pied__grille">' +
        '<div><a class="marque" href="index.html"><img src="' + BASE + 'assets/img/logo.png" alt=""><span>Cinque Frati</span></a>' +
          '<p style="margin-top:16px;max-width:34ch">' + L("Épicerie fine corse et comptoir de dégustation aux Halles de Lyon Paul Bocuse.", "Corsican delicatessen and tasting counter at Les Halles de Lyon Paul Bocuse.") + "</p>" + '' +
          '<form class="lettre" data-lettre><label class="visuellement-cache" for="courriel">' + L("Votre e-mail", "Your email") + '</label><input id="courriel" type="email" placeholder="' + L("Votre e-mail", "Your email") + '" required><button class="bouton" type="submit">' + L("S’inscrire", "Sign up") + "</button></form></div>" + '' +
        "<div><h4>" + L("Boutique", "Shop") + "</h4>" + CATS.map(function (c) { return '<a href="boutique.html#' + c.id + '">' + T(c, "nom") + "</a>"; }).join("") + "</div>" +
        "<div><h4>" + L("La maison", "Cinque Frati") + '</h4><a href="maison.html">' + L("Notre histoire", "Our story") + '</a><a href="lieu.html">' + L("Le lieu", "The space") + '</a><a href="degustation.html">' + L("Le comptoir", "The counter") + '</a><a href="degustation.html#ateliers">' + L("Ateliers", "Workshops") + '</a><a href="degustation.html#club">' + L("Le Club", "The Club") + "</a></div>" +
        "<div><h4>" + L("Nous trouver", "Visit us") + "</h4><p>Halles de Lyon Paul Bocuse<br>102 cours Lafayette<br>69003 Lyon</p><p>" + L("Mar.–sam. 7 h–19 h<br>Dim. 7 h–13 h · fermé lundi", "Tue–Sat 7am–7pm<br>Sun 7am–1pm · closed Monday") + '</p><a href="https://www.instagram.com/" rel="noopener">Instagram</a></div>' +
      "</div>" +
      '<div class="pied__bas"><span>© ' + new Date().getFullYear() + " Cinque Frati</span>" +
        "<span>" + L("Conception Baptiste Linet, projet APD 2025. Projet fictif, aucune vente réelle.", "Designed by Baptiste Linet, 2025 design project. Fictional project, nothing is sold.") + "</span><span>" + MENTION_ALCOOL + "</span></div>" +
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

  var burger = document.querySelector(".burger");
  var navEl = document.getElementById("nav");
  burger.addEventListener("click", function () {
    var ouvert = navEl.classList.toggle("ouvert");
    burger.setAttribute("aria-expanded", ouvert);
  });
  document.querySelector(".langue").addEventListener("click", function () { this.href = (EN ? "../" : "en/") + fichier + location.hash; });
  navEl.addEventListener("click", function (e) { if (e.target.tagName === "A") navEl.classList.remove("ouvert"); });

  var toastEl = document.querySelector(".toast"), toastMinuteur;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("visible");
    clearTimeout(toastMinuteur); toastMinuteur = setTimeout(function () { toastEl.classList.remove("visible"); }, 2600);
  }

  document.querySelector("[data-lettre]").addEventListener("submit", function (e) {
    e.preventDefault(); e.target.reset(); toast(L("Merci ! (démonstration : aucune inscription enregistrée)", "Thank you! (demo: nothing was saved)"));
  });

  /* ---------- Panier (stocké dans le navigateur) ---------- */
  var CLE = "cinque-frati-panier";
  var panier = {};
  try { panier = JSON.parse(localStorage.getItem(CLE)) || {}; } catch (e) { panier = {}; }
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(panier)); } catch (e) {} }

  var tiroir = document.querySelector(".tiroir"), voile = document.querySelector(".voile");
  function ouvrirPanier() { tiroir.classList.add("ouvert"); voile.classList.add("ouvert"); tiroir.setAttribute("aria-hidden", "false"); }
  function fermerPanier() { tiroir.classList.remove("ouvert"); voile.classList.remove("ouvert"); tiroir.setAttribute("aria-hidden", "true"); }

  function rendrePanier() {
    var ids = Object.keys(panier).filter(function (id) { return produit(id) && panier[id] > 0; });
    var nb = 0, total = 0;
    var lignes = ids.map(function (id) {
      var p = produit(id), q = panier[id];
      nb += q; total += q * p.prix;
      return '<div class="ligne-panier"><span class="nom">' + echappe(T(p, "nom")) + '</span><span class="unite">' + echappe(T(p, "unite")) + " · " + euros(p.prix) + "</span>" +
        '<span class="quantite"><button type="button" data-moins="' + id + '" aria-label="' + L("Retirer un", "Remove one") + '">−</button><span>' + q + '</span><button type="button" data-plus="' + id + '" aria-label="' + L("Ajouter un", "Add one") + '">+</button></span>' +
        '<span class="montant">' + euros(q * p.prix) + "</span></div>";
    }).join("");
    document.querySelector("[data-lignes]").innerHTML = lignes || L('<p class="panier-vide">Votre panier est vide.<br><a href="boutique.html">Découvrir la boutique</a></p>', '<p class="panier-vide">Your basket is empty.<br><a href="boutique.html">Browse the shop</a></p>');
    document.querySelector("[data-total]").textContent = euros(total);
    var c = document.querySelector("[data-compteur]");
    c.textContent = nb; if (nb) c.removeAttribute("data-vide"); else c.setAttribute("data-vide", "");
  }

  function ajouter(id, bouton) {
    panier[id] = (panier[id] || 0) + 1; sauver(); rendrePanier();
    toast(T(produit(id), "nom") + L(" ajouté au panier", " added to your basket"));
    if (bouton) { var avant = bouton.textContent; bouton.classList.add("ok"); bouton.textContent = L("Ajouté ✓", "Added ✓"); setTimeout(function () { bouton.classList.remove("ok"); bouton.textContent = avant; }, 1400); }
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-ouvrir-panier],[data-fermer-panier],[data-plus],[data-moins],[data-ajouter],[data-commander],[data-fiche]");
    if (!t) return;
    if (t.hasAttribute("data-ouvrir-panier")) ouvrirPanier();
    else if (t.hasAttribute("data-fermer-panier")) fermerPanier();
    else if (t.dataset.plus) { panier[t.dataset.plus]++; sauver(); rendrePanier(); }
    else if (t.dataset.moins) { panier[t.dataset.moins]--; if (panier[t.dataset.moins] <= 0) delete panier[t.dataset.moins]; sauver(); rendrePanier(); }
    else if (t.dataset.ajouter) ajouter(t.dataset.ajouter, t);
    else if (t.hasAttribute("data-commander")) {
      if (!Object.keys(panier).length) { toast(L("Votre panier est vide", "Your basket is empty")); return; }
      panier = {}; sauver(); rendrePanier(); fermerPanier();
      toast(L("Merci ! Commande fictive : rien n’a été débité.", "Thank you! Demo order: nothing was charged."));
    } else if (t.dataset.fiche) ouvrirFiche(t.dataset.fiche);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fermerPanier(); });
  rendrePanier();

  /* ---------- Cartes produits ---------- */
  function visuel(p) {
    if (p.image) return '<img src="' + BASE + echappe(p.image) + '" alt="' + echappe(T(p, "nom")) + '" loading="lazy">';
    return '<span class="produit__illus" style="background:' + (TEINTES[p.categorie] || "#c05839") + '">' + (ICONES[p.categorie] || "") + "</span>";
  }
  function prixAffiche(p) { return T(p, "prixTexte") || euros(p.prix); }
  var BADGES_EN = { "De saison": "In season", "Coup de cœur": "Staff pick", "Nouveau": "New" };
  function pastilles(p) {
    return (p.badges || []).map(function (b) { return '<span class="badge' + (b === "AOP" || b === "AOC" ? " badge--aop" : "") + '">' + echappe(EN && BADGES_EN[b] ? BADGES_EN[b] : b) + "</span>"; }).join("");
  }
  function carte(p) {
    return '<article class="produit revele">' +
      '<button class="produit__visuel" type="button" data-fiche="' + p.id + '" aria-label="' + L("Voir la fiche ", "View ") + echappe(T(p, "nom")) + '">' + visuel(p) + '<span class="produit__badges">' + pastilles(p) + "</span></button>" +
      '<div class="produit__corps"><h3>' + echappe(T(p, "nom")) + '</h3><span class="produit__unite">' + echappe(T(p, "unite")) + "</span>" +
      '<div class="produit__pied"><span class="prix">' + echappe(prixAffiche(p)) + '</span><button class="ajouter" type="button" data-ajouter="' + p.id + '">' + L("Ajouter", "Add") + "</button></div></div></article>";
  }

  var dialogue;
  function ouvrirFiche(id) {
    var p = produit(id); if (!p) return;
    if (!dialogue) { dialogue = el('<dialog class="fiche"></dialog>'); document.body.appendChild(dialogue); dialogue.addEventListener("click", function (e) { if (e.target === dialogue || e.target.closest(".fermer")) dialogue.close(); }); }
    var c = categorie(p.categorie);
    dialogue.innerHTML = '<button class="fermer" type="button" aria-label="' + L("Fermer", "Close") + '">×</button><div class="fiche__grille">' +
      '<div class="produit__visuel">' + visuel(p) + '<span class="produit__badges">' + pastilles(p) + "</span></div>" +
      '<div class="fiche__texte"><span class="surtitre">' + echappe(c ? c.nomCorse + " · " + T(c, "nom") : "") + "</span><h2>" + echappe(T(p, "nom")) + "</h2>" +
      '<span class="produit__unite">' + echappe(T(p, "unite")) + (T(p, "unite") ? " · " : "") + L("réf. ", "ref. ") + echappe(p.ref) + "</span><p>" + echappe(T(p, "description")) + "</p>" +
      '<p class="produit__unite">' + L("Goûtez-le au comptoir, aux Halles de Lyon Paul Bocuse.", "Taste it at our counter, at Les Halles de Lyon Paul Bocuse.") + "</p>" +
      '<div class="produit__pied"><span class="prix">' + echappe(prixAffiche(p)) + '</span><button class="bouton" type="button" data-ajouter="' + p.id + '">' + L("Ajouter au panier", "Add to basket") + "</button></div>" +
      (p.alcool ? '<p class="mention-alcool">' + MENTION_ALCOOL + "</p>" : "") + "</div></div>";
    if (dialogue.showModal) dialogue.showModal(); else dialogue.setAttribute("open", "");
  }

  /* Cartes du comptoir et du salon (page Déguster) */
  var CARTES = window.CARTES || {};
  [].forEach.call(document.querySelectorAll("[data-carte]"), function (zone) {
    var bloc = CARTES[zone.dataset.carte]; if (!bloc) return;
    zone.innerHTML = bloc.produits.map(function (p) {
      return '<li class="menu__ligne"><div><strong>' + echappe(T(p, "nom")) + "</strong>" + (T(p, "unite") ? ' <span class="produit__unite">· ' + echappe(T(p, "unite")) + "</span>" : "") +
        "<p>" + echappe(T(p, "description")) + '</p></div><span class="prix">' + echappe(T(p, "prixTexte")) + "</span></li>";
    }).join("");
  });

  /* Catégories en arches (accueil) */
  var arches = document.querySelector("[data-arches]");
  if (arches) arches.innerHTML = CATS.map(function (c) {
    return '<a class="arche-carte revele" href="boutique.html#' + c.id + '">' + (ICONES[c.id] || "") + "<h3>" + echappe(T(c, "nom")) + "</h3></a>";
  }).join("");

  /* Produits vedettes (accueil) */
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
    function afficher() {
      var q = (recherche.value || "").trim().toLowerCase();
      [].forEach.call(filtres.children, function (b) { b.setAttribute("aria-pressed", b.dataset.cat === courante); });
      var c = categorie(courante);
      intro.textContent = c ? T(c, "accroche") : PRODUITS.length + L(" produits sélectionnés chez les producteurs de l’île.", " products chosen from the island’s producers.");
      var liste = PRODUITS.filter(function (p) {
        return (!courante || p.categorie === courante) &&
          (!q || (p.nom + " " + p.description + " " + T(p, "nom") + " " + T(p, "description") + " " + p.badges.join(" ")).toLowerCase().indexOf(q) !== -1);
      });
      grille.innerHTML = liste.length ? liste.map(carte).join("") : '<p class="panier-vide">' + L("Aucun produit ne correspond à votre recherche.", "No product matches your search.") + "</p>";
      observer();
    }
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

  /* ---------- Apparition au défilement ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entrees) {
    entrees.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("vu"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;
  function observer() {
    [].forEach.call(document.querySelectorAll(".revele:not(.vu)"), function (n) { if (io) io.observe(n); else n.classList.add("vu"); });
  }
  observer();

  /* Formulaires de réservation (démo) */
  [].forEach.call(document.querySelectorAll("[data-demo]"), function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); toast(b.dataset.demo); });
  });
})();
