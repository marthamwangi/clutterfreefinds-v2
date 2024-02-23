echo "Running Script"
# Emit JS for just the index.ts with the compiler defaults
tsc tools/generators/sitemap/index.ts --outDir tools/generators/sitemap/bin

node tools/generators/sitemap/bin/generators/sitemap/sitemap.js tools/generators/sitemap/sitemap.xml

cp tools/generators/sitemap/sitemap.xml apps/website/mfe/src/assets/sitemap.xml
rm tools/generators/sitemap/sitemap.xml
echo "Finished Running Script"