const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const natural = require('natural');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/proatsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const upload = multer({ dest: 'uploads/' });

// Resume Schema
const resumeSchema = new mongoose.Schema({
  filename: String,
  content: String,
  atsScore: Number,
  keywords: [String],
  createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);

// ATS Scoring
async function calculateATSScore(text, jobDescription) {
  const tokenizer = new natural.WordTokenizer();
  const resumeTokens = tokenizer.tokenize(text.toLowerCase());
  const jobTokens = tokenizer.tokenize((jobDescription || '').toLowerCase());
  const matches = resumeTokens.filter(token => jobTokens.includes(token));
  return Math.min(100, Math.round((matches.length / (jobTokens.length || 1)) * 100));
}

// Upload Resume
app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    const dataBuffer = require('fs').readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    const text = data.text;
    const jobDesc = req.body.jobDescription || '';
    const score = await calculateATSScore(text, jobDesc);

    const resume = new Resume({
      filename: req.file.originalname,
      content: text,
      atsScore: score,
      keywords: [...new Set(text.toLowerCase().match(/\b\w+\b/g))]
    });
    await resume.save();

    res.json({ message: 'Resume processed', atsScore: score, id: resume._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes
const documentRoutes = require('./routes/document');
app.use('/api/documents', documentRoutes);

const agentRoutes = require('./routes/agents');
app.use('/api/agents', agentRoutes);

const coverRoutes = require('./routes/coverLetter');
app.use('/api/cover', coverRoutes);

const interviewRoutes = require('./routes/interview');
app.use('/api/interview', interviewRoutes);

const tutorRoutes = require('./routes/tutor');
app.use('/api/tutor', tutorRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

const analyticsRoutes = require('./analytics/dashboard');
app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => console.log(`ProATS Server running on port ${PORT}`));
