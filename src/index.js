/**
 * Cloudflare Worker - Routage Cloudflare Pages & Injection Matomo Tag Manager (MTM)
 * Réseau PBN Cloudflare Pages / Workers
 * Conformité RGPD stricte (100% Cookieless, sans CMP)
 */

// Mapping des domaines vers leurs conteneurs MTM respectifs
export const MTM_CONTAINERS = {
  "atmosphere-deco.com": "container_gcGOWgDS.js",
  "www.atmosphere-deco.com": "container_gcGOWgDS.js",
  "les4h.fr": "container_FH8y4MbO.js",
  "www.les4h.fr": "container_FH8y4MbO.js",
  "alubat971.com": "container_cuSJYKXJ.js",
  "www.alubat971.com": "container_cuSJYKXJ.js",
  "halo-life.com": "container_VsMm1Dxt.js",
  "www.halo-life.com": "container_VsMm1Dxt.js",
  "abordage.com": "container_VX6RUWvY.js",
  "www.abordage.com": "container_VX6RUWvY.js",
  "ossegua.com": "container_WNkepxa8.js",
  "www.ossegua.com": "container_WNkepxa8.js",
  "alubat973.com": "container_75Tpy3EO.js",
  "www.alubat973.com": "container_75Tpy3EO.js",
  "iris-fenetres.com": "container_zyyaUltr.js",
  "www.iris-fenetres.com": "container_zyyaUltr.js",
  "tecalu.com": "container_pNfRrYxf.js",
  "www.tecalu.com": "container_pNfRrYxf.js",
  "samiversxm.com": "container_bGEkUp2e.js",
  "www.samiversxm.com": "container_bGEkUp2e.js",
  "seacraftclassics.com": "container_Fe7mD6Zy.js",
  "www.seacraftclassics.com": "container_Fe7mD6Zy.js",
  "alubat972.com": "container_g6CogTOU.js",
  "www.alubat972.com": "container_g6CogTOU.js",
  "pulsatguadeloupe.com": "container_PeoBzSDk.js",
  "www.pulsatguadeloupe.com": "container_PeoBzSDk.js",
  "alubarth.com": "container_3wBwG5jV.js",
  "www.alubarth.com": "container_3wBwG5jV.js",
  "cash-affaires.fr": "container_yA72bwmw.js",
  "www.cash-affaires.fr": "container_yA72bwmw.js",
  "samibarth.com": "container_6fOiKAzR.js",
  "www.samibarth.com": "container_6fOiKAzR.js",
  "promotion.iris-fenetre.com": "container_88xkP3bH.js",
  "www.promotion.iris-fenetre.com": "container_88xkP3bH.js",
  "gallery.abordage.com": "container_Dj80pig4.js",
  "www.gallery.abordage.com": "container_Dj80pig4.js",
  "soprover.fr": "container_CvG43B1G.js",
  "www.soprover.fr": "container_CvG43B1G.js",
  "esperance-coaching.fr": "container_CKfBrNcS.js",
  "www.esperance-coaching.fr": "container_CKfBrNcS.js",
  "menuiseries-smt.com": "container_TzE5tp76.js",
  "www.menuiseries-smt.com": "container_TzE5tp76.js",
  "ibaia.immo": "container_zXkR9rBZ.js",
  "www.ibaia.immo": "container_zXkR9rBZ.js",
  "ibaia-immobilier.com": "container_v1PXdglE.js",
  "www.ibaia-immobilier.com": "container_v1PXdglE.js",
  "assistance.ibaia-immobilier.com": "container_TXYkkWJn.js",
  "www.assistance.ibaia-immobilier.com": "container_TXYkkWJn.js",
  "villasbellesrives.com": "container_4KfVX1cz.js",
  "www.villasbellesrives.com": "container_4KfVX1cz.js",
  "bellesrives-immobilier.com": "container_xhFz2WVl.js",
  "www.bellesrives-immobilier.com": "container_xhFz2WVl.js",
  "artguadeloupe.com": "container_yk8eKRjk.js",
  "www.artguadeloupe.com": "container_yk8eKRjk.js",
  "caraibes-evasion.com": "container_ylbWmynX.js",
  "www.caraibes-evasion.com": "container_ylbWmynX.js",
  "caroline.immo": "container_pJxL8BLk.js",
  "www.caroline.immo": "container_pJxL8BLk.js",
  "challengeimmo.com": "container_Hx1AEp9v.js",
  "www.challengeimmo.com": "container_Hx1AEp9v.js",
  "club-voyages.com": "container_hplUF4Ch.js",
  "www.club-voyages.com": "container_hplUF4Ch.js",
  "decouvrirlaguadeloupe.com": "container_rzEEcHAG.js",
  "www.decouvrirlaguadeloupe.com": "container_rzEEcHAG.js",
  "guadeloupe-immo.com": "container_E3TMr4M8.js",
  "www.guadeloupe-immo.com": "container_E3TMr4M8.js",
  "gwadacom.com": "container_ukFTYEKl.js",
  "www.gwadacom.com": "container_ukFTYEKl.js",
  "hebergement-guadeloupe-location.com": "container_OK8dU06g.js",
  "www.hebergement-guadeloupe-location.com": "container_OK8dU06g.js",
  "stbarthlife.com": "container_JAt2DtIU.js",
  "www.stbarthlife.com": "container_JAt2DtIU.js",
  "itineraire-martinique.com": "container_CusBI7uj.js",
  "www.itineraire-martinique.com": "container_CusBI7uj.js",
  "parisfenetres.com": "container_cJnAXfBX.js",
  "www.parisfenetres.com": "container_cJnAXfBX.js",
  "piscine-guadeloupe.com": "container_wHJCFubK.js",
  "www.piscine-guadeloupe.com": "container_wHJCFubK.js",
  "realestatestbarthelemy.com": "container_jb4xU5OC.js",
  "www.realestatestbarthelemy.com": "container_jb4xU5OC.js",
  "surf-guadeloupe.com": "container_sFLW3TKn.js",
  "www.surf-guadeloupe.com": "container_sFLW3TKn.js",
  "sxm-immo.com": "container_uZgVErGZ.js",
  "www.sxm-immo.com": "container_uZgVErGZ.js",
  "thesintmaarten.com": "container_n8EJLIvZ.js",
  "www.thesintmaarten.com": "container_n8EJLIvZ.js",
  "unmondesaintbarth.com": "container_LWOCa1b0.js",
  "www.unmondesaintbarth.com": "container_LWOCa1b0.js",
  "villa-location-guadeloupe.com": "container_llraLz6i.js",
  "www.villa-location-guadeloupe.com": "container_llraLz6i.js",
  "villas-prestige.com": "container_8axjP4sR.js",
  "www.villas-prestige.com": "container_8axjP4sR.js",
  "kdiscount.fr": "container_yjKJf80B.js",
  "www.kdiscount.fr": "container_yjKJf80B.js",
  "vrms.les4h.fr": "container_2V3FOEJz.js",
  "www.vrms.les4h.fr": "container_2V3FOEJz.js",
  "blog.ibaia-immobilier.com": "container_bphoFYBU.js",
  "www.blog.ibaia-immobilier.com": "container_bphoFYBU.js",
  "vacancesenguadeloupe.com": "container_Xf3XAcvC.js",
  "www.vacancesenguadeloupe.com": "container_Xf3XAcvC.js",
  "123alu.com": "container_2wODFgZY.js",
  "www.123alu.com": "container_2wODFgZY.js",
  "123fenetre.fr": "container_F8nhI3vW.js",
  "www.123fenetre.fr": "container_F8nhI3vW.js",
  "ambiance-decoration.com": "container_RXdkYyk6.js",
  "www.ambiance-decoration.com": "container_RXdkYyk6.js",
  "greenlodgeguadeloupe.com": "container_tGrOKoWE.js",
  "www.greenlodgeguadeloupe.com": "container_tGrOKoWE.js",
  "oceanviewphoto.com": "container_t4wCCtfF.js",
  "www.oceanviewphoto.com": "container_t4wCCtfF.js",
  "tous-avec-chloe.fr": "container_N6FZBpgt.js",
  "www.tous-avec-chloe.fr": "container_N6FZBpgt.js",
  "bestsubcaribbean.com": "container_wbuaXM7b.js",
  "www.bestsubcaribbean.com": "container_wbuaXM7b.js",
  "visiteguadeloupe.com": "container_JIreD3rg.js",
  "www.visiteguadeloupe.com": "container_JIreD3rg.js",
  "confidencescoiffure.com": "container_uXLW00s3.js",
  "www.confidencescoiffure.com": "container_uXLW00s3.js",
  "gissac.caroline.immo": "container_IOE7ewd1.js",
  "www.gissac.caroline.immo": "container_IOE7ewd1.js",
  "ozalee.caroline.immo": "container_osXdDx5N.js",
  "www.ozalee.caroline.immo": "container_osXdDx5N.js",
  "corail.caroline.immo": "container_XufIHaYT.js",
  "www.corail.caroline.immo": "container_XufIHaYT.js",
  "invest.les4h.fr": "container_BPruyWCh.js",
  "www.invest.les4h.fr": "container_BPruyWCh.js",
  "belcanto.caroline.immo": "container_MGZdoptT.js",
  "www.belcanto.caroline.immo": "container_MGZdoptT.js",
  "presence.les4h.fr": "container_ivShmuFI.js",
  "www.presence.les4h.fr": "container_ivShmuFI.js",
  "bootik.les4h.fr": "container_lL9koLt1.js",
  "www.bootik.les4h.fr": "container_lL9koLt1.js",
  "tarifspy.com": "container_Pdxm76FH.js",
  "www.tarifspy.com": "container_Pdxm76FH.js",
  "dronecaraibes.com": "container_VtjiBcm8.js",
  "www.dronecaraibes.com": "container_VtjiBcm8.js",
  "boatexchange.club": "container_9khDYGnr.js",
  "www.boatexchange.club": "container_9khDYGnr.js",
  "ia.les4h.fr": "container_owiewgrv.js",
  "www.ia.les4h.fr": "container_owiewgrv.js",
  "bleucaraibes.com": "container_Gv6UJyus.js",
  "www.bleucaraibes.com": "container_Gv6UJyus.js",
  "123bonheur.fr": "container_MzYz396d.js",
  "www.123bonheur.fr": "container_MzYz396d.js",
  "comparateur-conciergerie.com": "container_dkm3t4s9.js",
  "www.comparateur-conciergerie.com": "container_dkm3t4s9.js",
  "dacaluf.com": "container_8t7vffbu.js",
  "www.dacaluf.com": "container_8t7vffbu.js",
  "eco-antilles.com": "container_1504SCnt.js",
  "www.eco-antilles.com": "container_1504SCnt.js",
  "estimer-ma-villa.com": "container_mMunnISx.js",
  "www.estimer-ma-villa.com": "container_mMunnISx.js",
  "leguideguadeloupe.com": "container_3Jk5GcF6.js",
  "www.leguideguadeloupe.com": "container_3Jk5GcF6.js",
  "leguidemartinique.com": "container_YYjvMVvd.js",
  "www.leguidemartinique.com": "container_YYjvMVvd.js",
  "noteimmo.com": "container_OBWwBLzL.js",
  "www.noteimmo.com": "container_OBWwBLzL.js",
  "sargasse.com": "container_X7a6ujV3.js",
  "www.sargasse.com": "container_X7a6ujV3.js",
  "vendreoulouer.com": "container_tTcIeZGX.js",
  "www.vendreoulouer.com": "container_tTcIeZGX.js",
  "villa-prestige-stbarth.com": "container_dHcfAvF3.js",
  "www.villa-prestige-stbarth.com": "container_dHcfAvF3.js",
  "caraibes-evasion.pages.dev": "container_ylbWmynX.js",
  "bleucaraibes.pages.dev": "container_Gv6UJyus.js",
  "artguadeloupe.pages.dev": "container_yk8eKRjk.js",
  "decouvrirlaguadeloupe.pages.dev": "container_rzEEcHAG.js",
  "itineraire-martinique.pages.dev": "container_CusBI7uj.js",
  "club-voyages.pages.dev": "container_hplUF4Ch.js",
  "stbarthlife.pages.dev": "container_JAt2DtIU.js",
  "surf-guadeloupe.pages.dev": "container_sFLW3TKn.js",
  "sargasse.pages.dev": "container_X7a6ujV3.js",
  "leguideguadeloupe.pages.dev": "container_3Jk5GcF6.js",
  "leguidemartinique.pages.dev": "container_YYjvMVvd.js",
  "vacancesenguadeloupe.pages.dev": "container_Xf3XAcvC.js",
  "hebergement-guadeloupe-location.pages.dev": "container_OK8dU06g.js",
  "123fenetre.pages.dev": "container_F8nhI3vW.js",
  "123alu.pages.dev": "container_2wODFgZY.js",
  "ambiance-decoration.pages.dev": "container_RXdkYyk6.js",
  "challengeimmo.pages.dev": "container_Hx1AEp9v.js",
  "comparateur-conciergerie.pages.dev": "container_dkm3t4s9.js",
  "eco-antilles.pages.dev": "container_1504SCnt.js",
  "estimer-ma-villa.pages.dev": "container_mMunnISx.js",
  "guadeloupe-immo.pages.dev": "container_E3TMr4M8.js",
  "noteimmo.pages.dev": "container_OBWwBLzL.js",
  "parisfenetres.pages.dev": "container_cJnAXfBX.js",
  "piscine-guadeloupe.pages.dev": "container_wHJCFubK.js",
  "realestatestbarthelemy.pages.dev": "container_jb4xU5OC.js"
};

// Mapping des domaines vers leurs projets Cloudflare Pages respectifs
export const PAGES_ORIGINS = {
  "caraibes-evasion.com": "https://caraibes-evasion.pages.dev",
  "www.caraibes-evasion.com": "https://caraibes-evasion.pages.dev",
  "bleucaraibes.com": "https://bleucaraibes.pages.dev",
  "www.bleucaraibes.com": "https://bleucaraibes.pages.dev",
  "artguadeloupe.com": "https://artguadeloupe.pages.dev",
  "www.artguadeloupe.com": "https://artguadeloupe.pages.dev",
  "decouvrirlaguadeloupe.com": "https://decouvrirlaguadeloupe.pages.dev",
  "www.decouvrirlaguadeloupe.com": "https://decouvrirlaguadeloupe.pages.dev",
  "itineraire-martinique.com": "https://itineraire-martinique.pages.dev",
  "www.itineraire-martinique.com": "https://itineraire-martinique.pages.dev",
  "club-voyages.com": "https://club-voyages.pages.dev",
  "www.club-voyages.com": "https://club-voyages.pages.dev",
  "stbarthlife.com": "https://stbarthlife.pages.dev",
  "www.stbarthlife.com": "https://stbarthlife.pages.dev",
  "surf-guadeloupe.com": "https://surf-guadeloupe.pages.dev",
  "www.surf-guadeloupe.com": "https://surf-guadeloupe.pages.dev",
  "sargasse.com": "https://sargasse.pages.dev",
  "www.sargasse.com": "https://sargasse.pages.dev",
  "leguideguadeloupe.com": "https://leguideguadeloupe.pages.dev",
  "www.leguideguadeloupe.com": "https://leguideguadeloupe.pages.dev",
  "leguidemartinique.com": "https://leguidemartinique.pages.dev",
  "www.leguidemartinique.com": "https://leguidemartinique.pages.dev",
  "vacancesenguadeloupe.com": "https://vacancesenguadeloupe.pages.dev",
  "www.vacancesenguadeloupe.com": "https://vacancesenguadeloupe.pages.dev",
  "hebergement-guadeloupe-location.com": "https://hebergement-guadeloupe-location.pages.dev",
  "www.hebergement-guadeloupe-location.com": "https://hebergement-guadeloupe-location.pages.dev",
  "123fenetre.fr": "https://123fenetre.pages.dev",
  "www.123fenetre.fr": "https://123fenetre.pages.dev",
  "123alu.com": "https://123alu.pages.dev",
  "www.123alu.com": "https://123alu.pages.dev",
  "ambiance-decoration.com": "https://ambiance-decoration.pages.dev",
  "www.ambiance-decoration.com": "https://ambiance-decoration.pages.dev",
  "challengeimmo.com": "https://challengeimmo.pages.dev",
  "www.challengeimmo.com": "https://challengeimmo.pages.dev",
  "comparateur-conciergerie.com": "https://comparateur-conciergerie.pages.dev",
  "www.comparateur-conciergerie.com": "https://comparateur-conciergerie.pages.dev",
  "eco-antilles.com": "https://eco-antilles.pages.dev",
  "www.eco-antilles.com": "https://eco-antilles.pages.dev",
  "estimer-ma-villa.com": "https://estimer-ma-villa.pages.dev",
  "www.estimer-ma-villa.com": "https://estimer-ma-villa.pages.dev",
  "guadeloupe-immo.com": "https://guadeloupe-immo.pages.dev",
  "www.guadeloupe-immo.com": "https://guadeloupe-immo.pages.dev",
  "noteimmo.com": "https://noteimmo.pages.dev",
  "www.noteimmo.com": "https://noteimmo.pages.dev",
  "parisfenetres.com": "https://parisfenetres.pages.dev",
  "www.parisfenetres.com": "https://parisfenetres.pages.dev",
  "piscine-guadeloupe.com": "https://piscine-guadeloupe.pages.dev",
  "www.piscine-guadeloupe.com": "https://piscine-guadeloupe.pages.dev",
  "realestatestbarthelemy.com": "https://realestatestbarthelemy.pages.dev",
  "www.realestatestbarthelemy.com": "https://realestatestbarthelemy.pages.dev",
  "sxm-immo.com": "https://sxm-immo.pages.dev",
  "www.sxm-immo.com": "https://sxm-immo.pages.dev",
  "thesintmaarten.com": "https://thesintmaarten.pages.dev",
  "www.thesintmaarten.com": "https://thesintmaarten.pages.dev",
  "unmondesaintbarth.com": "https://unmondesaintbarth.pages.dev",
  "www.unmondesaintbarth.com": "https://unmondesaintbarth.pages.dev",
  "vendreoulouer.com": "https://vendreoulouer.pages.dev",
  "www.vendreoulouer.com": "https://vendreoulouer.pages.dev",
  "villa-location-guadeloupe.com": "https://villa-location-guadeloupe.pages.dev",
  "www.villa-location-guadeloupe.com": "https://villa-location-guadeloupe.pages.dev",
  "villa-prestige-stbarth.com": "https://villa-prestige-stbarth.pages.dev",
  "www.villa-prestige-stbarth.com": "https://villa-prestige-stbarth.pages.dev"
};

export const DEFAULT_CONTAINER = 'container_ylbWmynX.js';
export const MATOMO_HOST = 'https://analytics.les4h.fr';

// 1. Scrapers agressifs non-SEO à bloquer immédiatement (ImageBot / img2dataset)
const BLOCKED_BOT_REGEX = /ImageBot|img2dataset/i;

// 2. Anciens chemins WordPress inexistants à rejeter immédiatement en 404 sans toucher Pages
const LEGACY_DEAD_PATHS = /^\/(wp-content|wp-includes|wp-json|wp-admin|media\/posts|xmlrpc\.php|autodiscover|\.env|\.git)/i;

// 3. Extensions de fichiers statiques (images, styles, polices, scripts, médias)
const STATIC_ASSET_REGEX = /\.(png|jpe?g|webp|gif|svg|ico|css|js|woff2?|ttf|eot|mp4|webm|pdf|xml|txt)$/i;

/**
 * Handler HTMLRewriter pour insérer le conteneur MTM dans le <head>
 */
class MtmHeadInjector {
  constructor(containerUrl) {
    this.containerUrl = containerUrl;
  }

  element(element) {
    const snippet = `\n<!-- Matomo Tag Manager (Privacy-First / Cookieless) -->
<script>
  var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  (function() {
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='${this.containerUrl}'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Tag Manager -->\n`;

    element.prepend(snippet, { html: true });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname;
    const ua = request.headers.get('user-agent') || '';

    // 0. Bloquer immédiatement les scrapers d'images non autorisés
    if (BLOCKED_BOT_REGEX.test(ua)) {
      return new Response('Access Denied', {
        status: 403,
        headers: { 'Retry-After': '86400', 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    // 1. Rejeter immédiatement les anciens chemins WordPress inexistants (évite d'appeler Pages)
    if (LEGACY_DEAD_PATHS.test(pathname)) {
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      });
    }

    // 2. Diagnostics sur l'URL workers.dev directe
    if (hostname.endsWith('.workers.dev') && !url.searchParams.has('proxy')) {
      return new Response(JSON.stringify({
        service: "pbn-mtm-injector",
        status: "active (optimized)",
        compliance: "RGPD Cookieless / Sans CMP",
        matomoHost: MATOMO_HOST,
        pagesOrigins: PAGES_ORIGINS,
        configuredDomainsCount: Object.keys(MTM_CONTAINERS).length,
        defaultContainer: DEFAULT_CONTAINER,
        features: ["Edge Caching", "Anti-SPATrap 404", "Legacy WP Fast-404", "Scraper Protection"],
        usage: "Ce worker intercepte vos noms de domaine pour servir les sites Cloudflare Pages avec injection MTM cookieless."
      }, null, 2), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }

    // 3. Déterminer l'URL cible (Pages origin, test proxy ou requête directe)
    const pagesOrigin = PAGES_ORIGINS[hostname];
    let targetUrl;

    if (url.searchParams.has('proxy')) {
      targetUrl = url.searchParams.get('proxy');
    } else if (pagesOrigin) {
      targetUrl = `${pagesOrigin}${pathname}${url.search}`;
    } else {
      targetUrl = request.url;
    }

    const isStaticAsset = STATIC_ASSET_REGEX.test(pathname);

    // 4. Cache Edge pour requêtes GET (caches.default)
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    if (request.method === 'GET') {
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // 5. Préparer les en-têtes d'origine
    const originHeaders = new Headers(request.headers);
    if (pagesOrigin) {
      originHeaders.set('Host', new URL(pagesOrigin).hostname);
      originHeaders.set('X-Forwarded-Host', hostname);
      originHeaders.set('X-Forwarded-Proto', url.protocol.replace(':', ''));
    }

    const originRequest = new Request(targetUrl, {
      method: request.method,
      headers: originHeaders,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: 'manual',
      cf: isStaticAsset ? { cacheEverything: true, cacheTtl: 86400 } : undefined,
    });

    const response = await fetch(originRequest);

    // 6. Gérer les redirections 301, 302, 307, 308 (ex: /blog -> /blog/ ou slugs d'articles)
    if ([301, 302, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      if (location) {
        const newHeaders = new Headers(response.headers);
        if (pagesOrigin && location.includes(new URL(pagesOrigin).hostname)) {
          const fixedLocation = location.replace(new URL(pagesOrigin).origin, `${url.protocol}//${url.host}`);
          newHeaders.set('location', fixedLocation);
        }
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      }
      return response;
    }

    const contentType = response.headers.get('content-type') || '';

    // 7. Anti SPA-Trap : Si le client a demandé un asset statique (.png, .jpg, .css...) mais que Pages renvoie du HTML (fallback 200),
    // c'est un fichier inexistant ! On retourne immédiatement 404 pour stopper les bots.
    if (isStaticAsset && contentType.includes('text/html')) {
      const notFoundResponse = new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      });
      if (request.method === 'GET') {
        ctx.waitUntil(cache.put(cacheKey, notFoundResponse.clone()));
      }
      return notFoundResponse;
    }

    // 8. Fichiers statiques réels (images existantes, JS, CSS, JSON, 304...)
    if (response.status !== 200 || !contentType.includes('text/html')) {
      if (request.method === 'GET' && response.status === 200) {
        const assetResponse = new Response(response.body, response);
        assetResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        ctx.waitUntil(cache.put(cacheKey, assetResponse.clone()));
        return assetResponse;
      }
      return response;
    }

    // 9. Injection MTM dans le HTML
    const lookupHost = url.searchParams.has('proxy') 
      ? new URL(targetUrl).hostname.toLowerCase() 
      : hostname;
    const containerFilename = MTM_CONTAINERS[lookupHost] || env?.DEFAULT_CONTAINER || DEFAULT_CONTAINER;
    const containerUrl = `${MATOMO_HOST}/js/${containerFilename}`;

    const newHeaders = new Headers(response.headers);
    newHeaders.delete('content-length');
    // Mise en cache CDN edge pendant 5 minutes pour les pages HTML transformées
    newHeaders.set('Cache-Control', 'public, max-age=0, s-maxage=300');

    const rewriter = new HTMLRewriter().on('head', new MtmHeadInjector(containerUrl));
    const transformedResponse = rewriter.transform(
      new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      })
    );

    if (request.method === 'GET') {
      ctx.waitUntil(cache.put(cacheKey, transformedResponse.clone()));
    }

    return transformedResponse;
  },
};
