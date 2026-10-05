#!/bin/bash
echo "📦 Bundle Integrity Check"
echo "=========================="

# Verificar que index.html referencia os assets corretos
echo ""
echo "1. Checking index.html contains correct asset references:"
if grep -q "index-.*\.js" dist/index.html; then
  echo "   ✅ JavaScript bundle referenced"
else
  echo "   ❌ JavaScript bundle NOT found in index.html"
fi

if grep -q "index-.*\.css" dist/index.html; then
  echo "   ✅ CSS bundle referenced"
else
  echo "   ❌ CSS bundle NOT found in index.html"
fi

# Verificar tamanhos
echo ""
echo "2. Asset sizes (should be reasonable for production):"
main_js=$(ls -lh dist/assets/index-*.js 2>/dev/null | awk '{print $5, $NF}')
main_css=$(ls -lh dist/assets/index-*.css 2>/dev/null | awk '{print $5, $NF}')
echo "   Main JS:  $main_js"
echo "   Main CSS: $main_css"

# Verificar service worker
echo ""
echo "3. Service Worker (PWA offline support):"
if [ -f "dist/sw.js" ] && grep -q "workbox" dist/sw.js; then
  echo "   ✅ Service Worker configured"
  cache_count=$(grep -o '".*"' dist/sw.js | wc -l)
  echo "   ✅ Cached files: ~$cache_count items"
else
  echo "   ⚠️  Service Worker not found"
fi

# Verificar manifest
echo ""
echo "4. PWA Manifest:"
if [ -f "dist/manifest.webmanifest" ]; then
  echo "   ✅ manifest.webmanifest present"
  app_name=$(grep "name" dist/manifest.webmanifest | head -1 | grep -o '".*"' | tr -d '"')
  echo "   ✅ App name: $app_name"
else
  echo "   ⚠️  manifest.webmanifest NOT found"
fi

# Verificar HTML entry point
echo ""
echo "5. Entry point (index.html):"
if grep -q "<title>LUMI</title>" dist/index.html; then
  echo "   ✅ Correct title found"
else
  echo "   ⚠️  Title may be incorrect"
fi

if grep -q "<div id=\"app\"" dist/index.html; then
  echo "   ✅ React root element found"
else
  echo "   ❌ React root element NOT found"
fi

echo ""
echo "=========================="
echo "✅ Bundle verification complete"
echo "=========================="
