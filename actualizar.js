const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

const RSS_URL = 'https://cointelegraph.com/rss';
const AI_API_KEY = process.env.AI_API_KEY;
const TELEGRAM_BOT_TOKEN = cat << 'EOF' > actualizar.js
const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

const RSS_URL = 'https://cointelegraph.com/rss';
const AI_API_KEY = process.env.AI_API_KEY;
const TELEGRAM_BOT_TOKEN = 8969086757:AAHy7F_K87tPccdytzsNHUJa-lB2CiIv5vs
process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = 8936138118process.env.TELEGRAM_CHAT_ID;

async function difundirEnTelegram(noticiasNuevas) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('Aviso: Credenciales de Telegram no configuradas, omitiendo difusión.');
        return;
    }

    for (const item of noticiasNuevas) {
        const mensaje = `🔥 *Nueva Tendencia Web3*\n\n*${item.titulo}*\n\n${item.resumen}\n\n👉 [Leer completo y monetizado](https://go.botcaza.ai/noticias/${item.slug})`;
        
        try {
            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: mensaje,
                    parse_mode: 'Markdown'
                })
            });
            if (res.ok) {
                console.log(`📤 Noticia difundida en Telegram: ${item.titulo}`);
            } else {
                console.error('Error en Telegram:', await res.text());
            }
        } catch (err) {
            console.error('Error enviando difusión a Telegram:', err);
        }
    }
}

async function generarNoticias() {
    try {
        console.log('Obteniendo noticias RSS...');
        const feed = await parser.parseURL(RSS_URL);
        const ultimas = feed.items.slice(0, 3);
        const noticiasProcesadas = [];

        for (const item of ultimas) {
            console.log(`Procesando: ${item.title}`);
            
            let tituloFinal = item.title;
            let resumenFinal = item.contentSnippet ? item.contentSnippet.substring(0, 120) + '...' : 'Tendencia clave en el ecosistema Web3.';

            if (AI_API_KEY) {
                try {
                    const prompt = `Reescribe este titular y crea un resumen de máximo 120 caracteres en español para un widget Web3. Devuelve estrictamente un JSON válido con las claves "titulo" y "resumen". Noticia original: ${item.title}`;
                    
                    const respuestaIA = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + AI_API_KEY, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                    });
                    
                    const data = await respuestaIA.json();
                    if (data.candidates && data.candidates[0]) {
                        const textoRespuesta = data.candidates[0].content.parts[0].text;
                        const jsonLimpio = textoRespuesta.replace(/```json/g, '').replace(/```/g, '').trim();
                        const parsed = JSON.parse(jsonLimpio);
                        
                        tituloFinal = parsed.titulo;
                        resumenFinal = parsed.resumen;
                    }
                } catch (aiErr) {
                    console.warn('Aviso: Falló la IA, usando datos originales del RSS.', aiErr.message);
                }
            }

            const slug = item.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            noticiasProcesadas.push({
                titulo: tituloFinal,
                resumen: resumenFinal,
                slug: slug,
                fecha: new Date().toISOString()
            });
        }

        fs.writeFileSync('noticias.json', JSON.stringify(noticiasProcesadas, null, 2));
        console.log('✅ Archivo noticias.json actualizado correctamente.');

        // Ejecutar autodifusión en Telegram
        await difundirEnTelegram(noticiasProcesadas);

    } catch (error) {
        console.error('❌ Error en la automatización:', error);
        process.exit(1);
    }
}

generarNoticias();
EOF:AAHy7F_K87tPccdytzsNHUJa-lB2CiIv5vsID: 8936138118
process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function difundirEnTelegram(noticiasNuevas) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('Aviso: Credenciales de Telegram no configuradas, omitiendo difusión.');
        return;
    }

    for (const item of noticiasNuevas) {
        const mensaje = `🔥 *Nueva Tendencia Web3*\n\n*${item.titulo}*\n\n${item.resumen}\n\n👉 [Leer completo y monetizado](https://go.botcaza.ai/noticias/${item.slug})`;
        
        try {
            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: mensaje,
                    parse_mode: 'Markdown'
                })
            });
            if (res.ok) {
                console.log(`📤 Noticia difundida en Telegram: ${item.titulo}`);
            } else {
                console.error('Error en Telegram:', await res.text());
            }
        } catch (err) {
            console.error('Error enviando difusión a Telegram:', err);
        }
    }
}

async function generarNoticias() {
    try {
        console.log('Obteniendo noticias RSS...');
        const feed = await parser.parseURL(RSS_URL);
        const ultimas = feed.items.slice(0, 3);
        const noticiasProcesadas = [];

        for (const item of ultimas) {
            console.log(`Procesando: ${item.title}`);
            
            let tituloFinal = item.title;
            let resumenFinal = item.contentSnippet ? item.contentSnippet.substring(0, 120) + '...' : 'Tendencia clave en el ecosistema Web3.';

            if (AI_API_KEY) {
                try {
                    const prompt = `Reescribe este titular y crea un resumen de máximo 120 caracteres en español para un widget Web3. Devuelve estrictamente un JSON válido con las claves "titulo" y "resumen". Noticia original: ${item.title}`;
                    
                    const respuestaIA = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + AI_API_KEY, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                    });
                    
                    const data = await respuestaIA.json();
                    if (data.candidates && data.candidates[0]) {
                        const textoRespuesta = data.candidates[0].content.parts[0].text;
                        const jsonLimpio = textoRespuesta.replace(/```json/g, '').replace(/```/g, '').trim();
                        const parsed = JSON.parse(jsonLimpio);
                        
                        tituloFinal = parsed.titulo;
                        resumenFinal = parsed.resumen;
                    }
                } catch (aiErr) {
                    console.warn('Aviso: Falló la IA, usando datos originales del RSS.', aiErr.message);
                }
            }

            const slug = item.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            noticiasProcesadas.push({
                titulo: tituloFinal,
                resumen: resumenFinal,
                slug: slug,
                fecha: new Date().toISOString()
            });
        }

        fs.writeFileSync('noticias.json', JSON.stringify(noticiasProcesadas, null, 2));
        console.log('✅ Archivo noticias.json actualizado correctamente.');

        // Ejecutar autodifusión en Telegram
        await difundirEnTelegram(noticiasProcesadas);

    } catch (error) {
        console.error('❌ Error en la automatización:', error);
        process.exit(1);
    }
}

generarNoticias();
