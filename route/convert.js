const express = require('express');
const multer = require('multer');
const { docToPdf, imageToPdf, pdfToText } = require('../utils/fileHelpers');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/doc-to-pdf', upload.single('file'), async (req, res) => {
  const inPath = req.file.path;
  try {
    const outPath = await docToPdf(inPath); // returns path to pdf
    res.download(outPath);
  } catch (err) {
    console.error(err);
    res.status(500).send('Conversion failed');
  }
});

router.post('/image-to-pdf', upload.array('images'), async (req, res) => {
  const paths = req.files.map(f => f.path);
  const out = await imageToPdf(paths);
  res.download(out);
});

router.post('/pdf-to-text', upload.single('file'), async (req, res) => {
  const text = await pdfToText(req.file.path);
  res.json({ text });
});

module.exports = router;
