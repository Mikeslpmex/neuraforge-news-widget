const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

const RSS_URL = 'https://cointelegraph.com/rss';
const AI_API_KEY = process.env.AI_API_KEY;

async function generarNoticias() {
    try {
        console.log('Obteniendo noticias RSS...');
        const feed = await parser.parseURL(RSS_URL);
        const ultimas = feed.items.slice(0, 3);
        const noticiasProcesadas = [];

        for (const item of ultimas) {
            console.log(`Procesando: ${item.title}`);
            
            // Texto limpio de respaldo por si la IA no responde o no hay key configurada
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
                    const textoRespuesta = data.candidates[0].content.parts[0].text;
                    const jsonLimpio = textoRespuesta.replace(/```json/g, '').replace(/```/g, '').trim();
                    const parsed = JSON.parse(jsonLimpio);
                    
                    tituloFinal = parsed.titulo;
                    resumenFinal = parsed.resumen;
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
    } catch (error) {
        console.error('❌ Error en la automatización:', error);
        process.exit(1);
    }
}

generarNoticias();
