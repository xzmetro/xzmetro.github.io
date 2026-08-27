const indexI18n = {
    en: {
        title: "Simple City",
        siteName: "Simple City",
        navHome: "Home",
        navDownload: "Download",
        langSwitch: "简体中文",
        heroTitle: "Simple City",
        heroSubtitle: "A Minecraft Subway Facility Expansion Mod",
        heroDesc: "A very ordinary and simple subway facility expansion mod. It is recommended to add the Minecraft Transit Railway mod for better utilization.",
        heroDownload: "Download",
        featuresTitle: "Features",
        blocksTitle: "Building Blocks",
        blocksList: [
            "<strong>All color wool blocks</strong> (Slabs, Stairs, Vertical Slabs)",
            "<strong>All color concrete blocks</strong> (Slabs, Stairs, Vertical Slabs)",
            "<em>Ported from Minecraft 26.3</em>"
        ],
        metroTitle: "Metro Facilities",
        metroList: [
            "Station Signs (Low / High)",
            "Fire Extinguisher & Cabinet",
            "APG Railing (Platform Screen Doors)",
            "Train Departure Bell",
            "Wuzhou Metro Logo",
            "Tactile Paving"
        ],
        roadTitle: "Road Facilities",
        roadList: [
            "Parking Barrier (Left / Middle / Right / Bracket)",
            "Road Signs",
            "Construction Barriers",
        ],
        reqTitle: "Requirements",
        reqDep: "Dependency",
        reqVer: "Version",
        installTitle: "Installation",
        installStep1: "Install Fabric Loader",
        installStep2: "Place the mod .jar file into your mods/ folder",
        installStep3: "(Optional) Install MTR Mod for a better experience",
        licenseTitle: "License",
        licenseDesc: "This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.",
        licenseMaynot: "You may NOT:",
        licenseList: [
            "Use this mod for commercial purposes",
            "Modify or distribute modified versions",
            "Redistribute this mod without permission"
        ],
        footerAuthors: "Authors:",
        footerSoon: "This mod is under active development. More features coming soon!"
    },
    zh: {
        title: "简单城建",
        siteName: "简单城建",
        navHome: "主页",
        navDownload: "下载",
        langSwitch: "English",
        heroTitle: "小钟的Metro",
        heroSubtitle: "Minecraft 地铁设施扩展模组",
        heroDesc: "一个普通普通简单简单的地铁设施扩展模组。建议配合 Minecraft Transit Railway 模组使用以获得更好的体验。",
        heroDownload: "下载",
        featuresTitle: "功能特性",
        blocksTitle: "建筑方块",
        blocksList: [
            "<strong>全色羊毛方块</strong>（台阶、楼梯、竖半砖）",
            "<strong>全色混凝土方块</strong>（台阶、楼梯、竖半砖）",
            "<em>移植Minecraft 26.3 </em>"
        ],
        metroTitle: "地铁设施",
        metroList: [
            "车站标识（低 / 高）",
            "灭火器及灭火器箱",
            "低站台屏蔽门栏杆",
            "列车发车铃",
            "梧州地铁标志",
            "盲道砖"
        ],
        roadTitle: "道路设施",
        roadList: [
            "停车挡杆（左 / 中 / 右 / 支架）",
            "道路标志",
            "施工围挡",
        ],
        reqTitle: "运行要求",
        reqDep: "依赖项",
        reqVer: "版本",
        installTitle: "安装方法",
        installStep1: "安装 Fabric Loader",
        installStep2: "将模组 .jar 文件放入 mods/ 文件夹",
        installStep3: "（可选）安装 MTR 模组以获得更好体验",
        licenseTitle: "许可协议",
        licenseDesc: "本项目采用知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议。",
        licenseMaynot: "您不得：",
        licenseList: [
            "将此模组用于商业目的",
            "修改或分发修改后的版本",
            "未经许可重新分发此模组"
        ],
        footerAuthors: "作者：",
        footerSoon: "本模组正在积极开发中，更多功能即将推出！"
    }
};

function setIndexLang(lang) {
    const data = indexI18n[lang] || indexI18n.en;

    // 标题
    document.getElementById('page-title').textContent = data.title;
    document.getElementById('site-name').textContent = data.siteName;

    // 导航
    document.getElementById('nav-home').textContent = data.navHome;
    document.getElementById('nav-download').textContent = data.navDownload;

    // Hero
    document.getElementById('hero-title').textContent = data.heroTitle;
    document.getElementById('hero-subtitle').textContent = data.heroSubtitle;
    document.getElementById('hero-desc').innerHTML = data.heroDesc.replace(
        'Minecraft Transit Railway',
        '<a href="https://modrinth.com/mod/minecraft-transit-railway">Minecraft Transit Railway</a>'
    );
    document.getElementById('hero-download').textContent = data.heroDownload;

    // Features
    document.getElementById('features-title').textContent = data.featuresTitle;
    document.getElementById('blocks-title').textContent = data.blocksTitle;
    document.getElementById('blocks-list').innerHTML = data.blocksList.map(item => `<li>${item}</li>`).join('');

    document.getElementById('metro-title').textContent = data.metroTitle;
    document.getElementById('metro-list').innerHTML = data.metroList.map(item => `<li>${item}</li>`).join('');

    document.getElementById('road-title').textContent = data.roadTitle;
    document.getElementById('road-list').innerHTML = data.roadList.map(item => `<li>${item}</li>`).join('');

    // Requirements
    document.getElementById('req-title').textContent = data.reqTitle;
    document.getElementById('req-dep').textContent = data.reqDep;
    document.getElementById('req-ver').textContent = data.reqVer;

    // Installation
    document.getElementById('install-title').textContent = data.installTitle;
    document.getElementById('install-step1').innerHTML = data.installStep1.replace(
        'Fabric Loader',
        '<a href="https://fabricmc.net/use/">Fabric Loader</a>'
    );
    document.getElementById('install-step2').innerHTML = data.installStep2;
    document.getElementById('install-step3').innerHTML = data.installStep3.replace(
        'MTR Mod',
        '<a href="https://modrinth.com/mod/minecraft-transit-railway">MTR Mod</a>'
    );

    // License
    document.getElementById('license-title').textContent = data.licenseTitle;
    document.getElementById('license-desc').innerHTML = data.licenseDesc;
    document.getElementById('license-maynot').innerHTML = `<strong>${data.licenseMaynot}</strong>`;
    document.getElementById('license-list').innerHTML = data.licenseList.map(item => `<li>${item}</li>`).join('');

    // Footer
    document.getElementById('footer-authors').textContent = data.footerAuthors;
    document.getElementById('footer-soon').textContent = data.footerSoon;
    document.getElementById('license-file').textContent = data.footerSoon;

    // 语言切换链接
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
        langSwitch.textContent = data.langSwitch;
        const params = new URLSearchParams(window.location.search);
        params.set('lang', lang === 'zh' ? 'en' : 'zh');
        langSwitch.href = `?${params.toString()}`;
    }

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    setIndexLang(getLang());
});