// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


dotenv.config();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

function generateQuirkyCaption(mood, style) {
  const captions = {
    'Romantic': [
      "For when you want to be poetry in motion 💕",
      "Main character in a rom-com energy ✨",
      "Soft girl aesthetic but make it fashion 🌸"
    ],
    'Edgy': [
      "For days when you're the villain in someone else's story 🖤",
      "Dark academia meets street style queen 💀",
      "When you need to serve looks and attitude 🔥"
    ],
    'Minimalist': [
      "Less is more, but make it iconic ✨",
      "Clean girl aesthetic with main character energy 🤍",
      "Effortlessly chic because you're that girl 💫"
    ],
    'Bohemian': [
      "Free spirit with expensive taste 🌙",
      "Coachella vibes but make it everyday ✨",
      "Wanderlust meets wardrobe goals 🦋"
    ],
    'Classic': [
      "Timeless elegance never goes out of style 👑",
      "Old money aesthetic on any budget 💎",
      "Grace Kelly would approve ✨"
    ],
    'Sporty': [
      "Athleisure but make it fashion week 💪",
      "Gym to brunch to world domination 🏃‍♀️",
      "Active lifestyle, iconic style ⚡"
    ],
    'Futuristic': [
      "Y2K princess meets space age queen 🚀",
      "Living in 3023 while everyone's in 2024 ✨",
      "Cyberpunk chic with a touch of magic 🌟"
    ],
    'Vintage': [
      "Old soul with impeccable taste 📸",
      "Thrifted treasures and vintage dreams ✨",
      "Bringing back the golden age of fashion 💫"
    ]
  };

  const moodCaptions = captions[mood] || ["Serving looks and living dreams ✨"];
  return moodCaptions[Math.floor(Math.random() * moodCaptions.length)];
}

function generateStylingTip(style, fabric, season) {
  const tips = [
    `Perfect for ${season.toLowerCase()} - layer with a denim jacket for casual vibes`,
    `The ${fabric.toLowerCase()} fabric makes this perfect for both day and night looks`,
    `Pair with minimalist jewelry to let the ${style.toLowerCase()} speak for itself`,
    `Add a belt to accentuate your silhouette and elevate the look`,
    `Mix textures by adding a structured blazer for office-to-dinner versatility`,
    `Complete the look with statement accessories in complementary colors`,
    `Layer with a turtleneck underneath for a chic transitional season look`,
    `The perfect canvas for experimenting with bold makeup looks`
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key missing' });

  const {
    prompt,
    style,
    fabric,
    colorTheme,
    mainColor,
    modelSize,
    length,
    mood,
    season,
    accessory,
  } = req.body;

  const fullPrompt = `
    Fashion design: ${prompt}
    Style: ${style}, Fabric: ${fabric}, Color Theme: ${colorTheme}, Main Color: ${mainColor},
    Model Size: ${modelSize}, Length: ${length}, Mood: ${mood}, Season: ${season}, Accessory: ${accessory}.
    Create a high-fashion, professional fashion illustration showing a model wearing this outfit. 
    The image should be clean, well-lit, and suitable for a fashion magazine or runway presentation.
    Focus on the clothing design details, fabric texture, and overall aesthetic.
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3",
        quality: "standard",
        style: "vivid"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return res.status(500).json({ error: "OpenAI API error", details: errorText });
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      return res.status(500).json({ error: "No image generated" });
    }

    const quirkyCaption = generateQuirkyCaption(mood, style);
    const stylingTip = generateStylingTip(style, fabric, season);

    const specs = {
      style,
      fabric,
      colorTheme,
      mainColor,
      modelSize,
      length,
      mood,
      season,
      accessory,
      description: `A ${mood.toLowerCase()} ${style.toLowerCase()} in ${fabric.toLowerCase()} with a ${colorTheme.toLowerCase()} theme, ${length.toLowerCase()} length for size ${modelSize}${accessory ? `, accessorized with ${accessory.toLowerCase()}` : ''}.`,
      story: "Generated by AI based on your prompt and selections.",
      stylingTip,
      quirkyCaption
    };

    return res.status(200).json({
      suggestions: [{ imageUrl, specs }],
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key missing' });

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const chatRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a quirky, fashionable AI stylist that gives helpful and fun responses." },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await chatRes.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) return res.status(500).json({ error: 'No reply from OpenAI' });

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate chat reply" });
  }
});

// Serve Vite static files
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
// server.js



