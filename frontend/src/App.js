import React, { useState } from 'react';
import axios from 'axios';
import DocumentGenerator from './components/DocumentGenerator';
import SuperAgents from './components/SuperAgents';
import CoverLetter from './components/CoverLetter';

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [score, setScore] = useState(null);
  const [optimized, setOptimized] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDesc);

    try {
      const res = await axios.post('http://localhost:5000/api/upload-resume', formData);
      setScore(res.data.atsScore);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-bold mb-8 text-center">ProATS</h1>
      <div className="max-w-4xl mx-auto">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full mb-6" />
        <textarea 
          placeholder="Paste Job Description here..." 
          value={jobDesc} 
          onChange={(e) => setJobDesc(e.target.value)}
          className="w-full h-40 p-6 bg-gray-800 rounded-xl mb-6"
        />
        <button 
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-full text-lg font-semibold w-full"
        >
          {loading ? 'Processing...' : 'Upload Resume & Get ATS Score'}
        </button>

        {score !== null && (
          <div className="mt-10 p-8 bg-green-900/50 rounded-2xl">
            <h2 className="text-3xl">ATS Score: {score}/100</h2>
            <SuperAgents content="Sample content" jobDesc={jobDesc} onOptimized={setOptimized} />
            <CoverLetter resumeContent={optimized} jobDesc={jobDesc} />
            <DocumentGenerator resumeContent={optimized || "Optimized content"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
