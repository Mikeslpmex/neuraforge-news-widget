// Función para autodifusión en Telegram
async function difundirEnTelegram(noticiasNuevas) {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Puede ser un canal, grupo o chat

    if (!BOT_TOKEN || !CHAT_ID) {
        console.log('Aviso: Credenciales de Telegram no configuradas, omitiendo difusión.');
        return;
    }

    for (const item of noticiasNuevas) {
        const mensaje = `🔥 *Nueva Tendencia Web3* \n\n*${item.titulo}*\n\n${item.resumen}\n\n👉 [Leer completo y monetizado](https://go.botcaza.ai/noticias/${item.slug})`;
        
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: mensaje,
                    parse_mode: 'Markdown'
                })
            });
            console.log(`📤 Noticia difundida en Telegram: ${item.titulo}`);
        } catch (err) {
            console.error('Error enviando difusión a Telegram:', err);
        }
    }
}
