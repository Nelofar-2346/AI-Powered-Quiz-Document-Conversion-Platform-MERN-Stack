const { execFile } = require('child_process');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const pdfParse = require('pdf-parse');

async function docToPdf(inputPath){
  // requires libreoffice installed on server: `libreoffice --headless --convert-to pdf --outdir out input.docx`
  const outDir = 'converted';
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  return new Promise((resolve, reject) => {
    execFile('libreoffice', ['--headless', '--convert-to','pdf', '--outdir', outDir, inputPath], (err, stdout, stderr) => {
      if(err) return reject(err);
      // find exported file name
      const base = path.basename(inputPath).replace(path.extname(inputPath), '.pdf');
      resolve(path.join(outDir, base));
    });
  });
}

async function imageToPdf(imagePaths){
  const out = `converted/image-${Date.now()}.pdf`;
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(out));
  for(const p of imagePaths){
    const size = doc.page;
    doc.addPage();
    doc.image(p, { fit: [500, 700], align: 'center', valign: 'center' });
  }
  doc.end();
  return out;
}

async function pdfToText(pdfPath){
  const data = fs.readFileSync(pdfPath);
  const parsed = await pdfParse(data);
  return parsed.text;
}

module.exports = { docToPdf, imageToPdf, pdfToText };
