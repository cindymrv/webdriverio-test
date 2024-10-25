#!/bin/bash

ALLURE_RESULTS_DIRECTORY='allure-results'
PROJECT_ID='default'
ALLURE_SERVER='http://localhost:5051'

echo "Iniciando generación de reporte Allure..."

# Verificar si hay archivos para enviar
if [ ! -d "$ALLURE_RESULTS_DIRECTORY" ] || [ -z "$(ls -A $ALLURE_RESULTS_DIRECTORY)" ]; then
    echo "❌ No hay resultados en $ALLURE_RESULTS_DIRECTORY"
    exit 1
fi

# Mostrar archivos encontrados
echo "Archivos encontrados en $ALLURE_RESULTS_DIRECTORY:"
ls -la $ALLURE_RESULTS_DIRECTORY

# Preparar archivos para envío
FILES=""
for FILE in $ALLURE_RESULTS_DIRECTORY/*; do
    if [ -f "$FILE" ]; then
        FILES="$FILES -F files[]=@$FILE"
    fi
done

# Enviar resultados
echo "Enviando resultados a Allure..."
RESPONSE=$(curl -X POST "$ALLURE_SERVER/allure-docker-service/send-results?project_id=$PROJECT_ID" \
     -H "Content-Type: multipart/form-data" \
     $FILES -s)

if [[ $RESPONSE == *"successfully"* ]]; then
    echo "✅ Resultados enviados exitosamente"

    # Generar reporte
    echo "Generando reporte..."
    GENERATE_RESPONSE=$(curl -X GET "$ALLURE_SERVER/allure-docker-service/generate-report?project_id=$PROJECT_ID")

    sleep 3

    echo "✅ Reporte generado exitosamente"
    echo "📊 Ver reporte en: http://localhost:5253/allure-docker-service-ui/"
else
    echo "❌ Error al generar el reporte"
    echo "Respuesta del servidor: $RESPONSE"
    exit 1
fi