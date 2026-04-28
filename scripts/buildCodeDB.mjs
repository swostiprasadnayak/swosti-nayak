import fs from 'fs';
import path from 'path';

// Recursively fetch all files in a directory
const walkSync = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
        } else {
            // Only grab TSX, TS, and CSS files
            if (filepath.endsWith('.tsx') || filepath.endsWith('.ts') || filepath.endsWith('.css')) {
                filelist.push(filepath);
            }
        }
    }
    return filelist;
};

// Start scanning from the src folder
const srcPath = path.join(process.cwd(), 'src');
const files = walkSync(srcPath);
const db = {};

// Read content and store it with the relative path as the key
files.forEach(f => {
    const relativePath = path.relative(srcPath, f);
    db[relativePath] = fs.readFileSync(f, 'utf8');
});

// Save to a JSON file
const dataDir = path.join(srcPath, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
fs.writeFileSync(path.join(dataDir, 'codeDB.json'), JSON.stringify(db, null, 2));
console.log('✅ Code database successfully generated at src/data/codeDB.json');
