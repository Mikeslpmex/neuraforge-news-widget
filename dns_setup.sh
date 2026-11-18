#!/bin/bash
# Script para configurar y verificar DNS de go.botcaza.ai

CLOUDFLARE_API_TOKEN="TU_TOKEN_API"
ZONE_ID="TU_ZONE_ID"
DOMAIN="go.botcaza.ai"
TARGET="go-botcaza.ai-onrender.com"

echo "🚀 Configurando DNS para $DOMAIN en Cloudflare..."

# Crear registro CNAME para subdominio go
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{
       "type":"CNAME",
       "name":"go",
       "content":"'"$TARGET"'",
       "ttl":1,
       "proxied":true
     }'

# Verificar propagación DNS
echo "🔍 Verificando propagación DNS..."
sleep 10
dig +short go.botcaza.ai

# Validar respuesta
if dig +short go.botcaza ai. | grep -q "$TARGET"; then
  echo "✅ Dominio correctamente apuntado a Render."
else
  echo "⚠️ El dominio aún no apunta a Render. Espera unos minutos y vuelve a verificar."
fi
