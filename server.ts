import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";

import { authenticateUser, changePassword, bulkUploadUsers, getAllCredentials } from "./src/data/db";

async function startServer() {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Shared API Router for all Monorepo Web Apps
  const apiRouter = express.Router();
  apiRouter.use(express.json());

  apiRouter.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      system: "BIET Academic OS Monorepo Engine",
      institution: "Bhimavaram Institute of Engineering & Technology (BIET)",
      location: "Pennada, Bhimavaram, AP",
      aiConfigured: !!apiKey,
      activeApps: [
        { name: "Portal Gateway", port: 3000, url: "http://localhost:3000" },
        { name: "Student Web App", port: 3001, url: "http://localhost:3001" },
        { name: "Faculty Web App", port: 3002, url: "http://localhost:3002" },
        { name: "Principal Web App", port: 3003, url: "http://localhost:3003" },
        { name: "Exam Cell Web App", port: 3004, url: "http://localhost:3004" },
        { name: "Placement Web App", port: 3005, url: "http://localhost:3005" },
        { name: "Parent Web App", port: 3006, url: "http://localhost:3006" },
      ]
    });
  });

  // Authentication & Database Credential APIs
  apiRouter.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username/ID and password are required." });
    }
    const result = authenticateUser(username, password);
    if (!result.success) {
      return res.status(401).json({ error: result.error });
    }
    return res.json(result);
  });

  apiRouter.post("/auth/change-password", (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "Username, temporary password, and new password are required." });
    }
    const result = changePassword(username, oldPassword, newPassword);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.json(result);
  });

  apiRouter.get("/admin/users", (_req, res) => {
    res.json(getAllCredentials());
  });

  apiRouter.post("/admin/users/upload", (req, res) => {
    const { users } = req.body;
    if (!users || !Array.isArray(users)) {
      return res.status(400).json({ error: "Valid users array is required." });
    }
    const result = bulkUploadUsers(users);
    res.json(result);
  });

  // 1. BIET Cortex AI API
  apiRouter.post("/ai/cortex", async (req, res) => {
    try {
      const { message, agentId, contextData } = req.body;
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ error: "Message query must be at least 1 character." });
      }
      if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });

      const systemInstruction = `You are BIET Cortex AI, the autonomous academic intelligence agent for Bhimavaram Institute of Engineering & Technology (BIET), Pennada, Bhimavaram, Andhra Pradesh (Affiliated to JNTUK Kakinada, Approved by AICTE).
Active Agent Profile: ${agentId || 'General BIET Cortex'}.
Institutional Context: JNTUK R20 & R23 Regulations, 75% Mandatory Attendance Rule, CBCS Credit System, NBA & NAAC Accreditation standards, Jagananna Vidya Deevena (JVD) AP Govt Scholarship.
Context Data: ${JSON.stringify(contextData || {})}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: message.trim(),
        config: { systemInstruction, temperature: 0.7 },
      });

      res.json({
        text: response.text || "No output generated from BIET Cortex AI.",
        agentId: agentId || 'cortex_core',
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("Cortex AI Error:", error);
      res.status(500).json({ error: "Failed to process query", details: error?.message });
    }
  });

  // 2. JNTUK Mid-Exam Question Paper Generator
  apiRouter.post("/ai/exam-paper", async (req, res) => {
    try {
      const { courseName, courseCode, regulation, midType, units } = req.body;
      if (!courseName || !courseCode || courseName.trim() === '' || courseCode.trim() === '') {
        return res.status(400).json({ error: "Course name and course code required." });
      }

      const prompt = `Generate an official JNTUK Kakinada standard Mid-Exam Question Paper for Bhimavaram Institute of Engineering & Technology (BIET).
Course: ${courseName} (${courseCode})
Regulation: ${regulation || 'R20'}
Exam: ${midType || 'Mid-1'}
Units Covered: ${units ? units.join(', ') : 'Units I, II and III'}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              courseName: { type: Type.STRING },
              courseCode: { type: Type.STRING },
              regulation: { type: Type.STRING },
              midType: { type: Type.STRING },
              maxMarks: { type: Type.INTEGER },
              durationMinutes: { type: Type.INTEGER },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    unit: { type: Type.INTEGER },
                    bloomLevel: { type: Type.STRING },
                    marks: { type: Type.INTEGER },
                    coMapping: { type: Type.STRING },
                    questionText: { type: Type.STRING },
                    orQuestionText: { type: Type.STRING },
                  },
                  required: ["unit", "bloomLevel", "marks", "coMapping", "questionText"]
                }
              }
            },
            required: ["courseName", "courseCode", "regulation", "midType", "maxMarks", "durationMinutes", "questions"]
          }
        }
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error("Exam Paper AI Error:", error);
      res.status(500).json({ error: "Failed to generate paper", details: error?.message });
    }
  });

  // 3. Attendance Shortage Predictor
  apiRouter.post("/ai/attendance-predict", async (req, res) => {
    try {
      const { studentName, htno, currentPercentage } = req.body;
      if (!studentName || !htno) {
        return res.status(400).json({ error: "Student name and HTNO required." });
      }
      const prompt = `Analyze JNTUK Attendance rules for BIET Student: ${studentName} (${htno}) with ${currentPercentage || 75}% attendance.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });
      res.json({ analysis: response.text });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to predict attendance", details: error?.message });
    }
  });

  // 4. Placement Coach API
  apiRouter.post("/ai/placement-coach", async (req, res) => {
    try {
      const { studentSkills, targetCompany, roleName } = req.body;
      const prompt = `Evaluate placement candidate for BIET Campus Recruitment at ${targetCompany || 'TCS'} for role ${roleName || 'Software Engineer'} with skills ${JSON.stringify(studentSkills || [])}.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
      });
      res.json({ feedback: response.text });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to generate feedback", details: error?.message });
    }
  });

  // 5. Text-to-SQL Analytics API
  apiRouter.post("/ai/text-to-sql", async (req, res) => {
    try {
      const { naturalQuery } = req.body;
      if (!naturalQuery || typeof naturalQuery !== 'string' || naturalQuery.trim() === '') {
        return res.status(400).json({ error: "Query parameter must be a non-empty string." });
      }
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `BIET Text-to-SQL query: "${naturalQuery.trim()}"`
      });
      res.json({ queryResult: response.text });
    } catch (error: any) {
      res.status(500).json({ error: "Failed Text-to-SQL", details: error?.message });
    }
  });

  // List of Standalone Web Apps to Run Concurrently in Monorepo
  const standaloneApps = [
    { name: "Portal Gateway", port: 3000, root: process.cwd() },
    { name: "Student Web App", port: 3001, root: path.join(process.cwd(), "apps/student-app") },
    { name: "Faculty Web App", port: 3002, root: path.join(process.cwd(), "apps/faculty-app") },
    { name: "Principal Web App", port: 3003, root: path.join(process.cwd(), "apps/principal-app") },
    { name: "Exam Cell Web App", port: 3004, root: path.join(process.cwd(), "apps/exam-cell-app") },
    { name: "Placement Web App", port: 3005, root: path.join(process.cwd(), "apps/placement-app") },
    { name: "Parent Web App", port: 3006, root: path.join(process.cwd(), "apps/parent-app") },
  ];

  for (const appConfig of standaloneApps) {
    const app = express();
    app.use(express.json());
    app.use("/api", apiRouter);

    const distPath = path.join(appConfig.root, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      // Direct SPA Static HTML fallback
      app.use(express.static(appConfig.root));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(appConfig.root, 'index.html'));
      });
    }

    app.listen(appConfig.port, "0.0.0.0", () => {
      console.log(`🟢 ${appConfig.name} running live on http://localhost:${appConfig.port}`);
    });
  }
}

startServer();
