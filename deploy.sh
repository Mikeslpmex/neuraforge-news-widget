#!/bin/bash

echo "=================================================="
echo "🚀 INICIANDO DESPLIEGUE UNIFICADO - NEURAFORGE"
echo "=================================================="

# 1. Limpieza de archivos basura o redundantes
echo "🧹 Limpiando archivos temporales o innecesarios..."
rm -rf requirements.txt requeriments.txt

# 2. Verificación de entorno local Git
if [ ! -d ".git" ]; then
    echo "⚙️ Inicializando repositorio Git..."
    git init
    git remote add origin https://github.com/Mikeslpmex/neuraforge-news-widget.git
fi

# 3. Verificación de credenciales y conexión con Telegram (Opcional pero recomendada)
echo "🔍 Verificando configuración y estado de archivos..."
if [ -f "actualizar.js" ] && [ -f "widget.js" ] && [ -f "noticias.json" ]; then
    echo "✅ Archivos principales localizados correctamente."
else
    echo "⚠️ Advertencia: Falta algún archivo esencial (actualizar.js, widget.js o noticias.json)."
fi

# 4. Sincronización con Git / GitHub
echo "📦 Agregando cambios al control de versiones..."
git add -A

# Preguntar mensaje de commit opcional o usar uno predeterminado
COMMIT_MSG=${1:-"Actualización automática y unificada de NeuraForge Widget"}
git commit -m "$COMMIT_MSG"

echo "📤 Subiendo cambios a GitHub (Rama main)..."
git branch -M main
git push -u origin main

echo "=================================================="
echo "🎉 ¡Sincronización completada con éxito!"
echo "👉 Verifica tus acciones en GitHub Actions para comprobar la ejecución de Gemini y Telegram."
echo "=================================================="

