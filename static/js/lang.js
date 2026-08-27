const i18n = {
    en: {
        title: "Simple City - Home",
        dlTitle: "Simple City - Download",
        siteName: "Simple City",
        navHome: "Home",
        navDownload: "Download",
        navIssues: "Issues",
        langSwitch: "简体中文",
        downloadTitle: "Download Mod",
        versionLabel: "Version: ",
        versionLoading: "Loading...",
        versionInfo: "Select a version to download",
        downloadBtn: "Download",
    },
    zh: {
        title: "简单城建 - 主页",
        dlTitle: "简单城建 - 下载",
        siteName: "简单城建",
        navHome: "主页",
        navDownload: "下载",
        navIssues: "报告",
        langSwitch: "English",
        downloadTitle: "下载模组",
        versionLabel: "版本：",
        versionLoading: "加载中...",
        versionInfo: "选择版本下载",
        downloadBtn: "下载",
    }
};

function setLang(lang) {
    const data = i18n[lang] || i18n.en;

    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = data.title;

    const dlPageTitle = document.getElementById('dl-page-title');
    if (dlPageTitle) dlPageTitle.textContent = data.dlTitle;

    const siteName = document.getElementById('site-name');
    if (siteName) siteName.textContent = data.siteName;

    const navHome = document.getElementById('nav-home');
    if (navHome) navHome.textContent = data.navHome;

    const navDownload = document.getElementById('nav-download');
    if (navDownload) navDownload.textContent = data.navDownload;

    const navIssues = document.getElementById('nav-issues');
    if (navIssues) navIssues.textContent = data.navIssues;

    const navWiki = document.getElementById('nav-wiki');
    if (navWiki) navWiki.textContent = data.navWiki;

    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
        langSwitch.textContent = data.langSwitch;
        const params = new URLSearchParams(window.location.search);
        params.set('lang', lang === 'zh' ? 'en' : 'zh');
        langSwitch.href = `?${params.toString()}`;
    }

    const downloadTitle = document.getElementById('download-title');
    if (downloadTitle) downloadTitle.textContent = data.downloadTitle;

    const versionLabel = document.getElementById('version-label');
    if (versionLabel) versionLabel.textContent = data.versionLabel;

    const versionLoading = document.getElementById('version-loading');
    if (versionLoading) versionLoading.textContent = data.versionLoading;

    const versionInfo = document.getElementById('version-info');
    if (versionInfo && !versionInfo.dataset.updated) {
        versionInfo.textContent = data.versionInfo;
    }

    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) downloadBtn.textContent = data.downloadBtn;

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

function getLang() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en';
}

// 保留语言参数到所有内部链接
function preserveLang() {
    const lang = getLang();
    if (!lang || lang === 'en') return;

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript')) {
            return;
        }
        if (link.id === 'lang-switch') return;

        const url = new URL(href, window.location.href);
        url.searchParams.set('lang', lang);
        link.href = url.toString();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    preserveLang();
});

setLang(getLang());
// preserveLang();