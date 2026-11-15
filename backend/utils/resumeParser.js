const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extracts plain text from an uploaded resume buffer (PDF or DOCX)
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {string} originalName - Original filename
 * @param {string} mimetype - File mimetype
 * @returns {Promise<string>} Extracted text
 */
async function extractTextFromResume(buffer, originalName = '', mimetype = '') {
  const lowerName = originalName.toLowerCase();

  if (mimetype === 'application/pdf' || lowerName.endsWith('.pdf')) {
    try {
      const data = await pdfParse(buffer);
      if (!data || !data.text || data.text.trim().length === 0) {
        throw new Error('PDF file appears to be empty or contains only scanned images without extractable text.');
      }
      return data.text.trim();
    } catch (err) {
      throw new Error(`Failed to extract text from PDF: ${err.message}`);
    }
  }

  if (
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'application/msword' ||
    lowerName.endsWith('.docx') ||
    lowerName.endsWith('.doc')
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      if (!result || !result.value || result.value.trim().length === 0) {
        throw new Error('Word document appears to be empty or contains no extractable text.');
      }
      return result.value.trim();
    } catch (err) {
      throw new Error(`Failed to extract text from Word document: ${err.message}`);
    }
  }

  throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
}

module.exports = {
  extractTextFromResume
};
