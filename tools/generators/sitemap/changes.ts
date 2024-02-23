import { readFileSync } from 'fs';
import * as minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const newFilePath = argv['newFilePath'] || './sitemap2.xml';
const oldFilePath = argv['oldFilePath'] || './sitemap.xml';

const getSitemapLinks = async (filePath: string) => {
  const fileContent = await readFileSync(filePath);
  const lines = fileContent.toString().split('\n');
  const links = lines
    .filter((line) => line.includes('<loc>'))
    .map((line) => {
      const startIndex = line.indexOf('<loc>') + '<loc>'.length;
      const endIndex = line.indexOf('</loc>');
      return line.substring(startIndex, endIndex);
    });
  return links;
};

const main = async () => {
  const oldFileLinks = await getSitemapLinks(oldFilePath);
  const newFileLinks = await getSitemapLinks(newFilePath);

  console.log('Deleted Links:');
  console.log(
    oldFileLinks.filter((item) => !newFileLinks.includes(item)).join('\n')
  );

  console.log('\nAdded Links:');
  console.log(
    newFileLinks.filter((item) => !oldFileLinks.includes(item)).join('\n')
  );
};

main().catch((e) => console.error(e));
