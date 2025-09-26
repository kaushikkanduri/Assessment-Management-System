/*
const { renderToString } = require('react-dom/server');
import React from 'react';
import AssessmentReport from './AssessmentReport';
const mapData = require("../config/dataMapper").default;
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require("fs");

const generateReport = async (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    const reportData = mapData(sessionId);
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
            }
            .page-break {
              page-break-before: always;
            }
            .no-break {
              page-break-inside: avoid;
            }
            .section {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .exercise-card {
              page-break-inside: avoid;
              margin-bottom: 15px;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    const reportsDir = path.join(__dirname, "../reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    await page.setViewport({
      width: 1240,
      height: 1754,
      deviceScaleFactor: 2, // Increased for better quality
    });

    await page.setContent(fullHtml, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    const pdfPath = path.join(reportsDir, `${sessionId}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: "30mm",
        bottom: "30mm",
        left: "30mm",
        right: "30mm"
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 50px;">
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
      scale: 0.9, // Slightly reduce content size for better fit
    });

    await browser.close();

    res.download(pdfPath, `${reportData.assessmentName}_${sessionId}.pdf`, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return res.status(500).json({ error: "Error sending PDF file" });
      }
    });

  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: error.message });
  }
};
*/
const reportDashboard = async(req,res)=>{
  const user = req.user;
  res.render('../views/generateReport.ejs',{user});
}
module.exports = { reportDashboard };