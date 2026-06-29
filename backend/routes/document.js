const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs');
const path = require('path');
const { generateModernResume, generateCorporateResume } = require('../templates/pdfTemplates');

router.post('/generate-pdf', (req, res) => {
  const { content, template = 'modern', filename = 'optimized-resume.pdf' } = req.body;
  const doc = new PDFDocument({ margin: 50 });
  const outputPath = path.join(__dirname, '../uploads', filename);
  const stream = fs.createWriteStream(outputPath);
  
  doc.pipe(stream);

  if (template === 'modern') generateModernResume(doc, content);
  else if (template === 'corporate') generateCorporateResume(doc, content);
  else doc.text(content);

  doc.end();

  stream.on('finish', () => res.download(outputPath));
});

router.post('/generate-docx', async (req, res) => {
  const { content, filename = 'resume.docx' } = req.body;
  const doc = new Document({
    sections: [{ children: [new Paragraph({ children: [new TextRun(content)] })] }]
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(__dirname, '../uploads', filename), buffer);
  res.download(path.join(__dirname, '../uploads', filename));
});

module.exports = router;
