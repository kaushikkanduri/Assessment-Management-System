

const { mapData } = require("../config/dataMapper.mjs");
const AssessmentReport = require('../components/AssessmentReport'); 
const puppeteer = require('puppeteer');
const path = require('path');
const React = require('react');
const { renderToString } = require('react-dom/server');
const fs = require("fs");

// Your custom component


const reportDashboard = async(req,res)=>{
  const user = req.user;
  res.render('../views/generateReport.ejs',{user});
}


const generatePdfFromSession = async (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    res.statusCode = 400;
    return next(new Error("Session ID required"));
  }

  try {
    const reportData = mapData(sessionId); // must return { record, classifications, cards, notes }
    //res.json(reportData);
    
    const html = renderToString(
      React.createElement(AssessmentReport, { data: reportData })
    );

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              margin: 30mm;
              size: A4;
            }
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              padding: 0;
              margin: 0;
              background: white;
              font-family: system-ui, sans-serif;
            }
            .section {
              page-break-inside: avoid;
              margin-bottom: 30px;
            }
            .exercise-card {
              page-break-inside: avoid;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    const reportsDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1240,
      height: 1754,
      deviceScaleFactor: 2, // For print quality
    });

    await page.setContent(fullHtml, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const pdfPath = path.join(reportsDir, `${sessionId}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '30mm',
        bottom: '30mm',
        left: '30mm',
        right: '30mm',
      },
      displayHeaderFooter: true,
      headerTemplate: `
          <div style="font-size:12px; width:100%; padding: 20px 0; border-bottom: 2px solid #ccc; font-family: 'Arial', sans-serif; background-color: #f1f8ff; color: #333;">
            <!-- Company Name Section -->
            <div style="text-align: center; color: #2E86C1; font-size: 20px; font-weight: bold; letter-spacing: 1px;">
              <span class="company-name">AllyCare</span>
            </div>
            
            <!-- Report Title Section -->
            <div style="text-align: center; color: #555; font-size: 16px; margin-top: 5px; font-weight: 500;">
              AllyCare Assessment Report
            </div>
            
            <!-- User Info and Date Section -->
            <div style="margin-top: 15px; display: flex; justify-content: space-between; color: #777; font-size: 14px; padding: 0 30px;">
              <div style="font-size: 14px;">
                <strong>Name:</strong> <span class="user-name">${req.user.username}</span><br/>
              </div>
              
              <div style="text-align: right;">
                <strong>Date:</strong> <span class="current-date">${new Date().toLocaleDateString()}</span><br/>
              </div>
            </div>
          </div>
        `,

      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 50px;">
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
      scale: 0.9,
    });

    await browser.close();

    res.download(pdfPath, `${reportData.assessmentName}_${sessionId}.pdf`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        return res.status(500).json({ error: 'Error sending PDF file' });
      }
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { 
  reportDashboard,
  generatePdfFromSession
};