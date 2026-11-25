import fs from 'node:fs';
import path from 'node:path';

const CSV_URL = 'https://multi-motors.fr/data/moteurs.csv';
const LOGOS_URL = 'https://multi-motors.fr/data/logos.json';
const OUT_FILE = path.resolve(process.cwd(), 'public/data/multi-motors-catalogue.json');
const OUT_LOGOS_FILE = path.resolve(process.cwd(), 'public/data/multi-motors-logos.json');

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\r') {
      // ignore
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

async function main() {
  console.log(`Fetching ${CSV_URL}...`);
  const res = await fetch(CSV_URL, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} while fetching ${CSV_URL}`);
  }
  const csvText = await res.text();
  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    throw new Error('CSV appears empty');
  }

  const headers = rows[0].map((h) => h.trim().toUpperCase());
  const idx = (name) => headers.indexOf(name);

  const iId = idx('ID');
  const iRef = idx('REF');
  const iBrand = idx('MARQUE');
  const iModel = idx('NOM');
  const iVersion = idx('VERSION');
  const iClasse = idx('CLASSE');
  const iKv = idx('KV');
  const iPoids = idx('POIDS');
  const iLipo = idx('LIPO');
  const iShaft = idx('D SHAFT');
  const iImg = idx('IMG');

  const items = [];
  for (let r = 1; r < rows.length; r++) {
    const cols = rows[r];
    if (!cols || cols.length < 4) continue;

    const brand = (cols[iBrand] || '').trim();
    const model = (cols[iModel] || '').trim();
    if (!brand || !model) continue;

    const id = (cols[iId] || String(r)).trim();
    const ref = (cols[iRef] || '').trim();
    const version = (cols[iVersion] || '').trim();
    const classe = (cols[iClasse] || '').trim();
    const kv = (cols[iKv] || '').trim();
    const poidsRaw = (cols[iPoids] || '').trim();
    const poids = poidsRaw ? (poidsRaw.endsWith('g') ? poidsRaw : `${poidsRaw}g`) : '';
    const lipo = (cols[iLipo] || '').trim();
    const shaftRaw = (cols[iShaft] || '').trim();
    const shaft = shaftRaw ? (shaftRaw.includes('mm') ? shaftRaw : `Ø${shaftRaw}mm`) : '';
    const img = (cols[iImg] || '').trim();

    const gamme = version || classe || 'Standard';
    const fullName = `${brand} ${model}${kv ? ` ${kv}KV` : ''}${classe ? ` (${classe})` : ''}`;

    items.push({
      id,
      ref,
      brand,
      gamme,
      model,
      fullName,
      classe,
      kv,
      poids,
      lipo,
      shaft,
      img,
    });
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(items), 'utf-8');
  const brandsCount = new Set(items.map((x) => x.brand)).size;
  console.log(`Synced ${items.length} motors across ${brandsCount} brands -> ${OUT_FILE}`);

  // Sync logos mapping
  const logosMap = {
    'T-MOTOR': 'https://multi-motors.fr/assets/img/logo-t-motor.png',
  };
  try {
    console.log(`Fetching ${LOGOS_URL}...`);
    const logosRes = await fetch(LOGOS_URL, { cache: 'no-store' });
    if (logosRes.ok) {
      const rawLogos = await logosRes.json();
      for (const [brandKey, relPath] of Object.entries(rawLogos)) {
        if (typeof relPath === 'string' && relPath.trim()) {
          const clean = relPath.replace(/^\/+/, '');
          logosMap[brandKey.toUpperCase()] = `https://multi-motors.fr/assets/${clean}`;
        }
      }
    }
  } catch (err) {
    console.warn('Could not fetch logos.json:', err);
  }
  fs.writeFileSync(OUT_LOGOS_FILE, JSON.stringify(logosMap), 'utf-8');
  console.log(`Synced ${Object.keys(logosMap).length} brand logos -> ${OUT_LOGOS_FILE}`);
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
