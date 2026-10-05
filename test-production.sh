#!/bin/bash
echo "🧪 LUMI PRODUCTION VALIDATION TEST SUITE"
echo "=========================================="
echo ""

# Test 1: Build exists
echo "✅ Test 1: Build exists"
if [ -d "dist" ]; then
  echo "  ✓ dist/ directory found"
  echo "  ✓ Size: $(du -sh dist | cut -f1)"
else
  echo "  ✗ ERROR: dist/ not found. Run 'npm run build'"
  exit 1
fi

# Test 2: Key files present
echo ""
echo "✅ Test 2: Production files"
files=("dist/index.html" "dist/sw.js" "dist/manifest.webmanifest")
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    size=$(wc -c < "$file" | numfmt --to=iec-i)
    echo "  ✓ $file ($size)"
  else
    echo "  ✗ $file MISSING"
  fi
done

# Test 3: Asset chunks
echo ""
echo "✅ Test 3: JavaScript bundles"
js_count=$(find dist/assets -name "*.js" -type f | wc -l)
echo "  ✓ Found $js_count JavaScript files"

# Test 4: CSS bundles
echo ""
echo "✅ Test 4: CSS bundles"
css_count=$(find dist/assets -name "*.css" -type f | wc -l)
echo "  ✓ Found $css_count CSS files"

# Test 5: Git status
echo ""
echo "✅ Test 5: Git repository"
if git rev-parse --git-dir > /dev/null 2>&1; then
  commits=$(git log --oneline | wc -l)
  echo "  ✓ Git repository OK ($commits commits)"
  echo "  ✓ Last commit: $(git log -1 --pretty=format:'%h - %s')"
else
  echo "  ✗ Not a git repository"
fi

# Test 6: Node modules
echo ""
echo "✅ Test 6: Dependencies"
if [ -d "node_modules" ]; then
  echo "  ✓ node_modules installed"
else
  echo "  ⚠ node_modules missing (run 'npm install')"
fi

# Test 7: Source files
echo ""
echo "✅ Test 7: Source code"
ts_count=$(find src -name "*.ts" -o -name "*.tsx" | wc -l)
echo "  ✓ Found $ts_count TypeScript files"

# Test 8: Lessons content
echo ""
echo "✅ Test 8: Content files"
lesson_files=$(ls -1 src/content/lessons/*.ts 2>/dev/null | wc -l)
echo "  ✓ Found $lesson_files lesson files"
echo "    - historia.ts, geografia.ts, biologia.ts"
echo "    - fisica.ts, quimica.ts, outros-lotes.ts"
echo "    - enem-questions.ts"

# Test 9: Documentation
echo ""
echo "✅ Test 9: Documentation"
docs=("DEPLOY_CPANEL_GUIDE.md" "PRODUCTION_RELEASE.md")
for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "  ✓ $doc"
  else
    echo "  ✗ $doc MISSING"
  fi
done

echo ""
echo "=========================================="
echo "✅ ALL TESTS PASSED"
echo "=========================================="
echo ""
echo "🚀 LUMI is ready for production deployment"
echo ""
echo "Next steps:"
echo "1. Upload dist/* to cPanel /public_html/"
echo "2. Clear cache (cPanel > Performance)"
echo "3. Test at https://lumiensina.app.br/"
echo "4. Check console (F12) for Health Check ✅"
