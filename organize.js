const mm = require('music-metadata');
const fs = require('fs-extra');
const path = require('path');
const { globby } = require('globby');


const MEDIA_DIR = path.join(__dirname, 'media'); // or change this to any directory you want

async function organizeMediaFiles() {
  const extensions = ['mp3', 'flac', 'mp4'];
  const files = await globby(extensions.map(ext => `${MEDIA_DIR}/**/*.${ext}`));

  for (const filePath of files) {
    try {
      const metadata = await mm.parseFile(filePath, { duration: false });
      const albumArtist = metadata.common.albumartist || metadata.common.artist || 'Unknown Artist';
      const album = metadata.common.album || 'Unknown Album';

      const targetDir = path.join(MEDIA_DIR, sanitize(albumArtist), sanitize(album));
      await fs.ensureDir(targetDir);

      const fileName = path.basename(filePath);
      const newPath = path.join(targetDir, fileName);

      await fs.move(filePath, newPath, { overwrite: false });

      console.log(`Moved: ${fileName} ➝ ${targetDir}`);
    } catch (err) {
      console.warn(`Failed to process "${filePath}": ${err.message}`);
    }
  }

  console.log('Media organization complete.');
}

function sanitize(name) {
  return name.replace(/[<>:"/\\|?*]+/g, '').trim();
}

organizeMediaFiles();
