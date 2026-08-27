function getLang() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en';
}

function preserveLang() {
    const lang = getLang();
    if (!lang || lang === 'en') return;
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript')) return;
        if (link.id === 'lang-switch') return;
        const url = new URL(href, window.location.href);
        url.searchParams.set('lang', lang);
        link.href = url.toString();
    });
}

const _i18n = { en: {}, zh: {} };

function register(data) {
    for (const lang in data) {
        if (!_i18n[lang]) _i18n[lang] = {};
        Object.assign(_i18n[lang], data[lang]);
    }
}

function t(key) {
    const lang = getLang();
    return _i18n[lang]?.[key] ?? _i18n['en']?.[key] ?? key;
}

function apply(map) {
    for (const [id, cfg] of Object.entries(map)) {
        const el = document.getElementById(id);
        if (!el) continue;
        const key = typeof cfg === 'string' ? cfg : cfg.key;
        const mode = typeof cfg === 'string' ? 'text' : (cfg.mode || 'text');
        const val = t(key);

        if (mode === 'html') el.innerHTML = val;
        else if (mode === 'list') el.innerHTML = (Array.isArray(val) ? val : []).map(v => `<li>${v}</li>`).join('');
        else el.textContent = val;
    }
}

function initI18n(pageMap) {
    if (pageMap) apply(pageMap);

    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
        langSwitch.textContent = t('langSwitch');
        const params = new URLSearchParams(window.location.search);
        params.set('lang', getLang() === 'zh' ? 'en' : 'zh');
        langSwitch.href = `?${params.toString()}`;
    }

    preserveLang();
    document.documentElement.lang = getLang() === 'zh' ? 'zh-CN' : 'en';
}