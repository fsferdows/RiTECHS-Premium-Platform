import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client on server securely using env secrets
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Secure API proxy for the premium client-side widgets
  app.post("/api/gemini/analyze", async (req, res) => {
    try {
      const { prompt, type, extra } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Missing paper abstract or prompt" });
      }

      // High-grade system instruction for professional formatting & advisory feedback
      let systemInstruction = "You are the RiTECHS Academic Copilot, an elite AI advisor representing the Research, Innovation, Technology, and Education Scholarly Elite ecosystem consisting of global professors and top journal editors. Provide expert feedback. Avoid generic opening sentences. Avoid generic AI framing lines. Output high-impact scholarly insights immediately in clean, beautiful Markdown.";

      if (type === "abstract") {
        systemInstruction += ` Perform an extremely rigorous critique of this research abstract tailored for formatting and alignment to the ${extra || "target research template"}. Output your feedback in these exact 4 structured categories:
1. **Rigor & Technical Depth Audit**: Assess scientific merit, grammar, and methodology clarity.
2. **Structural Formatting Assessment**: Suggest precise adjustments to follow the strict formatting conventions of ${extra || "selected publisher"}.
3. **Aligned Target Keywords**: List 4 highly structured keyword tags suited for digital indexers.
4. **Optimized Active-Voice Draft**: Provide a polished, high-density academic version of the abstract suitable for immediate peer verification.`;
      } else if (type === "matchmaker") {
        systemInstruction += " You are matching research themes to upcoming conferences. Recommend active tracks from our featured academic list (like AIoT-RSE: IoT for Renewable Energy, post-quantum cryptography, sustainable grid systems). Tell the scholar why their study aligns perfectly and suggest 2 actionable steps.";
      } else {
        systemInstruction += " Provide precise, short scholastic advice for writing peer-reviewed papers, communicate with reviewers, correct LaTeX indexing errors, or resolve grammatical details.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ result: response.text });
    } catch (err: any) {
      console.error("Gemini pipeline error:", err);
      let errorMessage = "The Gemini mainframe failed to compile the response.";
      const errorStr = typeof err === 'object' ? JSON.stringify(err) : String(err);
      
      if (errorStr.includes("leaked") || errorStr.includes("leak")) {
        errorMessage = "Your Gemini API Key has been flagged as leaked by Google security protocols. To restore your elite Academic Copilot services, please generate a new API key in Google AI Studio, open the Secrets / Settings panel in the user interface, and save the updated GEMINI_API_KEY.";
      } else if (errorStr.includes("API key not valid") || errorStr.includes("INVALID_ARGUMENT") || errorStr.includes("API_KEY_INVALID")) {
        errorMessage = "Authentication failed: The configured GEMINI_API_KEY environment variable is invalid. Please visit Google AI Studio Settings -> Secrets to verify your credentials.";
      } else if (err.message) {
        errorMessage = `Academic mainframe response error: ${err.message}`;
      }
      
      res.status(500).json({ error: errorMessage });
    }
  });

  // Serve custom user-uploaded premium assets directly from the workspace root
  const customAssets = [
    "logo.png",
    "video 1.mp4",
    "video 2.mp4",
    "banner 1.png",
    "banner 1.0.png",
    "banner 3.png",
    "banner 4.png",
    "banner 5.png"
  ];

  customAssets.forEach(file => {
    app.get(`/${file}`, (req, res) => {
      res.sendFile(path.join(process.cwd(), file), (err) => {
        if (err) {
          res.status(404).end();
        }
      });
    });
    app.get(`/${encodeURIComponent(file)}`, (req, res) => {
      res.sendFile(path.join(process.cwd(), file), (err) => {
        if (err) {
          res.status(404).end();
        }
      });
    });
  });

  // Mount Vite development middlewares or serve static compiled files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Serve all workspace root assets natively and robustly (but after Vite middleware, to avoid intercepting uncompiled template assets in dev mode)
  app.use(express.static(process.cwd()));

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[RITECHS SERVER] Registered and listening on host 0.0.0.0 and port ${PORT}`);
  });
}

startServer();
