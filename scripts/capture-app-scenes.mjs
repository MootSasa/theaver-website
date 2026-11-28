#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const websiteRoot = path.resolve(__dirname, '..');
const frontendRoot = path.resolve(websiteRoot, '..', 'frontend');
const publicScreenshotsDir = path.join(websiteRoot, 'public', 'screenshots');
const rawExportDir = process.env.EXPORT_SCENES_DIR || '/tmp/theaver_raw_scenes';

const SCENES = {
  'hero-desktop': { width: 1200, height: 750 },
  'hero-pane-chats': { width: 320, height: 750 },
  'hero-pane-dialog': { width: 580, height: 750 },
  'hero-pane-inspector': { width: 300, height: 750 },
  'chats-mobile': { width: 390, height: 780 },
  'calls-stream': { width: 880, height: 550 },
  'bots-miniapp': { width: 880, height: 550 },
  'theme-glass': { width: 880, height: 550 },
  'theme-classic': { width: 880, height: 550 },
};

const ROOT_COMPAT_SCENES = ['hero-desktop', 'chats-mobile', 'calls-stream'];
const LOCALES = ['en', 'ru'];
const THEMES = ['light', 'dark'];

async function assertEncodedFile(filePath, expectedWidth, expectedHeight) {
  const stat = await fs.stat(filePath);
  if (stat.size <= 1024) {
    throw new Error(`Encoded file too small (${stat.size} bytes): ${filePath}`);
  }
  const meta = await sharp(filePath).metadata();
  if (meta.width !== expectedWidth || meta.height !== expectedHeight) {
    throw new Error(
      `Dimension mismatch for ${filePath}: got ${meta.width}x${meta.height}, expected ${expectedWidth}x${expectedHeight}`,
    );
  }
}

async function main() {
  const skipFlutter = process.argv.includes('--skip-flutter');

  if (!skipFlutter) {
    console.log(`Rendering raw @2x scenes from Flutter into ${rawExportDir}...`);
    const res = spawnSync(
      'flutter',
      ['test', '--no-pub', 'test/tools/export_marketing_scenes_test.dart'],
      {
        cwd: frontendRoot,
        stdio: 'inherit',
        env: {
          ...process.env,
          EXPORT_SCENES_DIR: rawExportDir,
        },
      },
    );
    if (res.status !== 0) {
      throw new Error(`Flutter scene export failed with exit code ${res.status}`);
    }
  }

  let validatedCount = 0;

  for (const locale of LOCALES) {
    const outDir = path.join(publicScreenshotsDir, locale);
    await fs.mkdir(outDir, { recursive: true });

    for (const theme of THEMES) {
      for (const [sceneName, dims] of Object.entries(SCENES)) {
        const srcPng = path.join(rawExportDir, locale, `${sceneName}-${theme}@2x.png`);
        const baseName = `${sceneName}-${theme}`;

        const out2xWebp = path.join(outDir, `${baseName}@2x.webp`);
        const out2xAvif = path.join(outDir, `${baseName}@2x.avif`);
        const out1xWebp = path.join(outDir, `${baseName}.webp`);
        const out1xAvif = path.join(outDir, `${baseName}.avif`);

        await sharp(srcPng).webp({ quality: 88 }).toFile(out2xWebp);
        await sharp(srcPng).avif({ quality: 65, effort: 4 }).toFile(out2xAvif);

        await sharp(srcPng)
          .resize(dims.width, dims.height, {
            fit: 'fill',
            kernel: sharp.kernel.lanczos3,
          })
          .webp({ quality: 88 })
          .toFile(out1xWebp);

        await sharp(srcPng)
          .resize(dims.width, dims.height, {
            fit: 'fill',
            kernel: sharp.kernel.lanczos3,
          })
          .avif({ quality: 68, effort: 4 })
          .toFile(out1xAvif);

        await assertEncodedFile(out2xWebp, dims.width * 2, dims.height * 2);
        await assertEncodedFile(out2xAvif, dims.width * 2, dims.height * 2);
        await assertEncodedFile(out1xWebp, dims.width, dims.height);
        await assertEncodedFile(out1xAvif, dims.width, dims.height);
        validatedCount += 4;

        if (locale === 'en' && ROOT_COMPAT_SCENES.includes(sceneName)) {
          for (const [src, suffix, w, h] of [
            [out2xWebp, '@2x.webp', dims.width * 2, dims.height * 2],
            [out2xAvif, '@2x.avif', dims.width * 2, dims.height * 2],
            [out1xWebp, '.webp', dims.width, dims.height],
            [out1xAvif, '.avif', dims.width, dims.height],
          ]) {
            const compatPath = path.join(publicScreenshotsDir, `${baseName}${suffix}`);
            await fs.copyFile(src, compatPath);
            await assertEncodedFile(compatPath, w, h);
            validatedCount += 1;
          }
        }
      }
    }
  }

  console.log(
    `[OK] Generated and verified ${validatedCount} screenshot assets (144 localized + 24 root compat).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
