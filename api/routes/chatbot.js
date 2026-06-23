import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

router.post('/ask', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API Key is not configured. Please add GEMINI_API_KEY to your .env file.' });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Define the persona for Agri Pay Bot Assistant
    const systemPrompt = `You are Agri Pay Bot Assistant, a super smart and friendly AI assistant for "AgriPay". 
    You talk to farmers exactly like a helpful friend. 
    You must always reply in simple "Hinglish" (Hindi written in English alphabets) and use emojis. 
    Be energetic, polite, and explain things clearly. 
    - If asked about loans, tell them they can apply for up to ₹5,00,000 instantly if their KYC is done.
    - If asked about EMI, say they can pay securely via Razorpay from the Dashboard.
    - Do NOT use markdown bold/italics excessively, keep it plain text friendly.`;

    let responseText = "";
    try {
      const result = await model.generateContent({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + "\n\nUser Question: " + message }] }
        ]
      });
      responseText = result.response.text();
    } catch (apiError) {
      console.error('Gemini API Error:', apiError.message);
      // Fallback friendly response if Google's API fails due to quota or 503
      responseText = "Arre bhai! 😅 Lagta hai abhi Google ka API server thoda busy hai ya limit khatam ho gayi hai. Par tension mat lo, main (Antigravity) yahan hoon! Aap AgriPay par Dashboard se ₹5,00,000 tak ka instant loan le sakte hain. Kya main is baare mein aur bataun?";
    }

    res.json({ reply: responseText });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Failed: ' + error.message });
  }
});

export default router;
