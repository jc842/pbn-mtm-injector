/**
 * Cloudflare Worker - Passerelle Edge & Reverse Proxy Haute Performance
 * Réseau PBN Cloudflare Pages / Workers
 * Note : Le conteneur MTM est désormais injecté nativement et statiquement dans le HTML Astro.
 * Le Worker assure la protection anti-scraping, le cache edge global et la réécriture transparente des redirections.
 */

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

// 1. Scrapers agressifs non-SEO à bloquer immédiatement (ImageBot / img2dataset)
const BLOCKED_BOT_REGEX = /ImageBot|img2dataset/i;

// 2. Anciens chemins WordPress inexistants à rejeter immédiatement en 404 sans toucher Pages
const LEGACY_DEAD_PATHS = /^\/(wp-content|wp-includes|wp-json|wp-admin|media\/posts|xmlrpc\.php|autodiscover|\.env|\.git)/i;

// 3. Extensions de fichiers statiques (images, styles, polices, scripts, médias)
const STATIC_ASSET_REGEX = /\.(png|jpe?g|webp|gif|svg|ico|css|js|woff2?|ttf|eot|mp4|webm|pdf|xml|txt)$/i;

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
        }
      });
    }

    // 2. Vérifier si la réponse est déjà en cache Cloudflare Edge (évite une invocation sous-jacente)
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    if (request.method === 'GET') {
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // 3. Déterminer l'origine Pages cible
    let pagesOrigin = PAGES_ORIGINS[hostname];
    if (!pagesOrigin && url.searchParams.has('proxy')) {
      pagesOrigin = url.searchParams.get('proxy');
    }

    let targetUrl = request.url;
    if (pagesOrigin) {
      const targetOriginUrl = new URL(pagesOrigin);
      targetUrl = `${targetOriginUrl.protocol}//${targetOriginUrl.host}${url.pathname}${url.search}`;
    }

    const isStaticAsset = STATIC_ASSET_REGEX.test(pathname);

    // 4. Préparer les en-têtes d'origine
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

    // 5. Gérer les redirections 301, 302, 307, 308 (réécriture vers le domaine personnalisé)
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

    // 6. Anti SPA-Trap : Si asset statique (.png, .jpg...) mais renvoie du HTML (fallback 200), fichier inexistant -> 404
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

    // 7. Fichiers statiques réels (images existantes, JS, CSS, JSON, 304...)
    if (response.status !== 200 || !contentType.includes('text/html')) {
      if (request.method === 'GET' && response.status === 200) {
        const assetResponse = new Response(response.body, response);
        assetResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        ctx.waitUntil(cache.put(cacheKey, assetResponse.clone()));
        return assetResponse;
      }
      return response;
    }

    // 8. Pages HTML (le MTM est déjà présent nativement et statiquement dans le HTML Astro)
    const newHeaders = new Headers(response.headers);
    // Cache Edge CDN 10 minutes pour le HTML
    newHeaders.set('Cache-Control', 'public, max-age=0, s-maxage=600');

    const htmlResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });

    if (request.method === 'GET') {
      ctx.waitUntil(cache.put(cacheKey, htmlResponse.clone()));
    }

    return htmlResponse;
  },
};
