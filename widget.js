(function() {
    const container = document.getElementById('neuraforge-news-widget');
    if (!container) return;

    const partnerId = container.getAttribute('data-partner') || 'organico';
    const cdnUrl = 'https://neuraforge-news-widget.onrender.com/noticias.json';

    fetch(cdnUrl)
        .then(response => response.json())
        .then(noticias => {
            let html = `<div style="max-width:650px;margin:auto;font-family:sans-serif;border:1px solid #27272a;border-radius:12px;background:#09090b;color:#f4f4f5;padding:20px;box-sizing:border-box;">
                <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #27272a;padding-bottom:12px;margin-bottom:16px;">
                    <h3 style="margin:0;font-size:18px;color:#10b981;font-weight:700;">Noticias & Tendencias Web3</h3>
                    <span style="font-size:11px;color:#a1a1aa;">Patrocinado &bull; pub-9493850506792206</span>
                </div>
                <div id="news-container">`;

            noticias.forEach(item => {
                const urlMonetizada = `https://go.botcaza.ai/noticias/${item.slug}?utm_source=${partnerId}`;
                html += `
                    <div style="margin-bottom:16px;padding:12px;background:#18181b;border-radius:8px;">
                        <h4 style="margin:0 0 8px 0;font-size:15px;color:#ffffff;">${item.titulo}</h4>
                        <p style="margin:0 0 12px 0;font-size:13px;color:#a1a1aa;line-height:1.4;">${item.resumen}</p>
                        <a href="${urlMonetizada}" target="_blank" rel="noopener noreferrer" onclick="neuraforgeTrackClick('${item.slug}')" style="display:inline-block;background:#10b981;color:#000;text-decoration:none;padding:8px 16px;border-radius:6px;font-weight:bold;font-size:13px;"> Leer Noticia Completa &rarr; </a>
                    </div>`;
            });

            html += `</div></div>`;
            container.innerHTML = html;
        })
        .catch(err => console.error('Error cargando widget NeuraForge:', err));
})();

function neuraforgeTrackClick(articleId) {
    if (typeof gtag === 'function') {
        gtag('event', 'news_click', {
            'publisher_id': 'pub-9493850506792206',
            'article_id': articleId,
            'measurement_id': 'G-24Q6GBQN75'
        });
    }
}
