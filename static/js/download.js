const MAVEN_BASE_URL = 'https://xzmetro.github.io/maven/org/simplecity/simple_city';

async function fetchText(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
}

async function fetchHead(url) {
    const response = await fetch(url, { method: 'HEAD' });
    return {
        size: response.headers.get('content-length'),
        lastModified: response.headers.get('last-modified')
    };
}

async function fetchHashes(version) {
    const baseUrl = `${MAVEN_BASE_URL}/${version}/simple_city-${version}.jar`;
    const hashes = {};
    const hashTypes = [
        { ext: 'md5', name: 'MD5' },
        { ext: 'sha1', name: 'SHA1' },
        { ext: 'sha256', name: 'SHA256' },
        { ext: 'sha512', name: 'SHA512' }
    ];

    for (const { ext, name } of hashTypes) {
        try {
            const text = await fetchText(`${baseUrl}.${ext}`);
            hashes[name] = text.trim();
        } catch {
            hashes[name] = null;
        }
    }
    return hashes;
}

function formatDate(dateStr, lang) {
    if (!dateStr) return lang === 'zh' ? '未知' : 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

function formatBytes(bytes) {
    if (!bytes || bytes === '0') return '0 B';
    let size = parseInt(bytes);
    const units = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
}

async function fetchVersions() {
    try {
        const text = await fetchText(`${MAVEN_BASE_URL}/maven-metadata.xml`);
        const xml = new DOMParser().parseFromString(text, 'application/xml');
        return Array.from(xml.querySelectorAll('versioning versions version'))
            .map(v => v.textContent).reverse();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

async function fetchFileInfo(version) {
    const filename = `xzmetro-mod-${version}.jar`;
    const jarUrl = `${MAVEN_BASE_URL}/${version}/${filename}`;
    try {
        const [head, hashes] = await Promise.all([fetchHead(jarUrl), fetchHashes(version)]);
        return { version, filename, url: jarUrl, size: formatBytes(head.size), lastModified: head.lastModified, hashes };
    } catch {
        return { version, filename, url: jarUrl, size: 'Unknown', lastModified: null, hashes: {} };
    }
}

async function populateVersions() {
    const select = document.getElementById('version-select');
    const versions = await fetchVersions();
    select.innerHTML = '';

    if (versions.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'Failed to load';
        option.value = '';
        select.appendChild(option);
        return;
    }

    versions.forEach(ver => {
        const option = document.createElement('option');
        option.value = ver;
        option.textContent = ver;
        select.appendChild(option);
    });

    const params = new URLSearchParams(window.location.search);
    const presetVer = params.get('ver');
    select.value = (presetVer && versions.includes(presetVer)) ? presetVer : versions[0];
    await updateDownloadInfo(select.value);
}

async function updateDownloadInfo(version) {
    if (!version) return;
    const info = await fetchFileInfo(version);
    const lang = getLang();

    const labels = {
        file: lang === 'zh' ? '文件' : 'File',
        size: lang === 'zh' ? '大小' : 'Size',
        updated: lang === 'zh' ? '更新时间' : 'Updated',
        hash: lang === 'zh' ? '校验值' : 'Checksums',
        copy: lang === 'zh' ? '复制' : 'Copy',
        copied: lang === 'zh' ? '已复制' : 'Copied'
    };

    let hashesHtml = '';
    const hashOrder = ['MD5', 'SHA1', 'SHA256', 'SHA512'];
    for (const type of hashOrder) {
        const value = info.hashes[type];
        if (value) {
            hashesHtml += `
                <div class="hash-row">
                    <span class="hash-type">${type}</span>
                    <code class="hash-value" id="hash-${type}">${value}</code>
                    <button class="copy-btn" onclick="copyHash('${type}')" data-copy="${labels.copy}" data-copied="${labels.copied}">
                        ${labels.copy}
                    </button>
                </div>
            `;
        }
    }

    document.getElementById('version-info').innerHTML = `
        <div class="file-info">
            <div class="info-row">
                <span class="info-label">${labels.file}</span>
                <span class="info-value filename">${info.filename}</span>
            </div>
            <div class="info-row">
                <span class="info-label">${labels.size}</span>
                <span class="info-value">${info.size}</span>
            </div>
            <div class="info-row">
                <span class="info-label">${labels.updated}</span>
                <span class="info-value">${formatDate(info.lastModified, lang)}</span>
            </div>
            ${hashesHtml ? `
                <div class="hashes-section">
                    <div class="hashes-title">${labels.hash}</div>
                    ${hashesHtml}
                </div>
            ` : ''}
        </div>
    `;
    document.getElementById('version-info').dataset.updated = 'true';

    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.href = info.url;
    downloadBtn.style.display = 'inline-block';
    document.getElementById('download-btn-text').textContent = lang === 'zh' ? '下载' : 'Download';
}

async function copyHash(type) {
    const element = document.getElementById(`hash-${type}`);
    if (!element) return;
    try {
        await navigator.clipboard.writeText(element.textContent);
        const btn = element.nextElementSibling;
        btn.textContent = btn.dataset.copied;
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = btn.dataset.copy;
            btn.classList.remove('copied');
        }, 1500);
    } catch (err) {
        console.error('Copy failed:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateVersions();
    document.getElementById('version-select').addEventListener('change', async (e) => {
        const version = e.target.value;
        await updateDownloadInfo(version);
        const params = new URLSearchParams(window.location.search);
        params.set('ver', version);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    });
});