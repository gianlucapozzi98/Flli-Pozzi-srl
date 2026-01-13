#!/bin/bash

# Script per avviare il server di sviluppo Next.js
# Termina automaticamente qualsiasi processo sulla porta 3000

PORT=3000

echo "🔍 Controllo porta $PORT..."

# Trova e termina processi sulla porta 3000
PID=$(lsof -ti:$PORT 2>/dev/null)

if [ ! -z "$PID" ]; then
  echo "⚠️  Trovato processo sulla porta $PORT (PID: $PID)"
  echo "🛑 Terminazione processo..."
  kill -9 $PID 2>/dev/null
  sleep 1
  echo "✅ Porta $PORT liberata"
else
  echo "✅ Porta $PORT già libera"
fi

echo "🚀 Avvio server Next.js sulla porta $PORT..."
next dev -p $PORT



