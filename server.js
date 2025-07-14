// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function generateQuirkyCaption(mood, style) {
  const captions = {
    Romantic: [
      "For when you want to be poetry in motion 💕",
      "Main character in a rom-com energy ✨",
      "Soft girl aesthetic but make it fashion 🌸",
      "Love letter to feminine elegance 💌",
      "Dreamy vibes for your inner hopeless romantic 🌹",
    ],
    Edgy: [
      "For days when you're the villain in someone else's story 🖤",
      "Dark academia meets street style queen 💀",
      "When you need to serve looks and attitude 🔥",
      "Rebel with a cause (the cause is looking incredible) ⚡",
      "Main character energy meets gothic goddess 🌙",
    ],
    Minimalist: [
      "Less is more, but make it iconic ✨",
      "Clean girl aesthetic with main character energy 🤍",
      "Effortlessly chic because you're that girl 💫",
      "Simple sophistication that speaks volumes 🕊️",
      "The art of doing more with less 🎨",
    ],
    Bohemian: [
      "Free spirit with expensive taste 🌙",
      "Coachella vibes but make it everyday ✨",
      "Wanderlust meets wardrobe goals 🦋",
      "Desert flower meets city sophistication 🌵",
      "Nomadic chic for the modern goddess 🌸",
    ],
    Classic: [
      "Timeless elegance never goes out of style 👑",
      "Old money aesthetic on any budget 💎",
      "Grace Kelly would approve ✨",
      "Investment piece energy ⭐",
      "Heritage luxury meets modern sensibility 🏛️",
    ],
    Sporty: [
      "Athleisure but make it fashion week 💪",
      "Gym to brunch to world domination 🏃‍♀️",
      "Active lifestyle, iconic style ⚡",
      "Performance meets runway perfection 🎯",
      "Comfort meets couture 🌟",
    ],
    Futuristic: [
      "Y2K princess meets space age queen 🚀",
      "Living in 3023 while everyone's in 2024 ✨",
      "Cyberpunk chic with a touch of magic 🌟",
      "Tomorrow's fashion icon today 🛸",
      "Neo-Tokyo meets Silicon Valley vibes 💫",
    ],
    Vintage: [
      "Old soul with impeccable taste 📸",
      "Thrifted treasures and vintage dreams ✨",
      "Bringing back the golden age of fashion 💫",
      "Timeless pieces for the modern vintage lover 🕰️",
      "Retro revival with contemporary twist 🌺",
    ],
  };

  const moodCaptions = captions[mood] || ["Serving looks and living dreams ✨"];
  return moodCaptions[Math.floor(Math.random() * moodCaptions.length)];
}

function generateAdvancedStylingTips(style, fabric, season, mood, colorTheme) {
  const seasonalTips = {
    Spring: [
      `Perfect ${season.toLowerCase()} transition piece - layer with lightweight cardigans`,
      `Embrace the renewal energy of spring with fresh ${colorTheme.toLowerCase()} tones`,
      `Ideal for those unpredictable spring days - versatile and adaptable`,
    ],
    Summer: [
      `${fabric} is your best friend in summer heat - breathable yet stylish`,
      `Perfect for vacation wardrobes and endless summer adventures`,
      `Sun-kissed elegance meets practical summer styling`,
    ],
    Fall: [
      `Autumn elegance at its finest - perfect for cozy coffee dates`,
      `Layer with textured pieces for that perfect fall aesthetic`,
      `Embrace the golden hour vibes with warm ${colorTheme.toLowerCase()} hues`,
    ],
    Winter: [
      `Winter sophistication meets comfort - layer with luxe outerwear`,
      `Perfect for holiday parties and intimate gatherings`,
      `Cozy meets chic in this winter-ready ensemble`,
    ],
  };

  const fabricTips = {
    Cotton: "Breathable, versatile, and perfect for everyday elegance",
    Silk: "Luxurious drape creates an effortlessly sophisticated silhouette",
    Wool: "Timeless warmth with structured elegance",
    Linen: "Effortless summer sophistication with relaxed charm",
    Denim: "Classic Americana meets modern style sensibilities",
    Leather: "Edgy luxury that ages beautifully with wear",
    Chiffon: "Ethereal movement perfect for romantic occasions",
    Velvet: "Opulent texture that commands attention",
  };

  const moodStyling = {
    Romantic:
      "Pair with delicate jewelry and soft, flowing hair for maximum dreamy vibes",
    Edgy: "Complete with statement boots and bold makeup for that perfect rebel aesthetic",
    Minimalist:
      "Less is more - let the clean lines speak with minimal, quality accessories",
    Bohemian:
      "Layer with textured accessories and embrace natural, tousled styling",
    Classic:
      "Timeless accessories and polished styling create effortless sophistication",
    Sporty:
      "Mix with sleek sneakers and modern accessories for elevated athleticism",
    Futuristic:
      "Metallic accents and geometric accessories complete this forward-thinking look",
    Vintage: "Period-appropriate accessories transport this look through time",
  };

  const tips = seasonalTips[season] || [
    `Perfect for ${season.toLowerCase()} styling`,
  ];
  const fabricTip =
    fabricTips[fabric] ||
    "Quality fabric choice enhances the overall aesthetic";
  const moodTip =
    moodStyling[mood] || "Style according to your personal aesthetic";

  return {
    seasonal: tips[Math.floor(Math.random() * tips.length)],
    fabric: fabricTip,
    mood: moodTip,
  };
}

function generateColorPsychology(colorTheme, mainColor) {
  const colorMeanings = {
    red: "Power, passion, and confidence - this color commands attention and exudes strength",
    blue: "Calm sophistication and trustworthiness - perfect for professional elegance",
    green:
      "Growth, harmony, and natural beauty - connects with nature and renewal",
    pink: "Feminine grace and playful sophistication - romantic yet empowering",
    purple:
      "Luxury, creativity, and mystique - artistic expression meets regal elegance",
    yellow:
      "Joy, optimism, and creative energy - brings sunshine to any outfit",
    orange: "Warmth, enthusiasm, and boldness - perfect for making a statement",
    black:
      "Timeless elegance and sophisticated power - the ultimate in chic versatility",
    white:
      "Purity, minimalism, and fresh sophistication - clean and contemporary",
    grey: "Modern neutrality and understated luxury - effortlessly sophisticated",
    brown: "Earthy warmth and natural elegance - grounded sophistication",
    navy: "Classic authority and refined elegance - professional yet approachable",
  };

  const thememeanings = {
    Monochromatic: "Creates visual harmony and sophisticated cohesion",
    Complementary: "Bold contrast that creates dynamic visual interest",
    Analogous: "Harmonious blend that feels naturally elegant",
    Triadic: "Balanced vibrancy with sophisticated color play",
    Neutral: "Timeless sophistication that never goes out of style",
    Warm: "Inviting and energetic palette that radiates confidence",
    Cool: "Calming and elegant tones that exude serene sophistication",
  };

  const mainColorLower = mainColor?.toLowerCase() || "neutral";
  const colorPsych =
    colorMeanings[mainColorLower] ||
    "A carefully chosen color that enhances your natural radiance";
  const themePsych =
    thememeanings[colorTheme] || "A thoughtfully curated palette";

  return {
    mainColor: colorPsych,
    theme: themePsych,
  };
}

function generateBodyTypeAndOccasion(style, fabric, mood, length) {
  const bodyTypeSuggestions = {
    "A-Line":
      "Flattering for all body types - creates beautiful silhouette balance",
    Bodycon: "Celebrates curves - perfect for hourglass and athletic figures",
    Flowing: "Universally flattering - creates graceful movement",
    Structured: "Creates definition - ideal for straight and athletic builds",
    Oversized:
      "Comfortable elegance - perfect for any body type seeking relaxed sophistication",
  };

  const occasionSuggestions = {
    Cocktail: [
      "Evening parties",
      "Date nights",
      "Gallery openings",
      "Cocktail events",
    ],
    Casual: [
      "Weekend brunches",
      "Coffee dates",
      "Shopping trips",
      "Casual meetups",
    ],
    Business: [
      "Office meetings",
      "Professional events",
      "Networking",
      "Conferences",
    ],
    Formal: ["Galas", "Weddings", "Award ceremonies", "Formal dinners"],
    Travel: ["Vacation", "City exploration", "Travel days", "Sightseeing"],
    Party: ["Celebrations", "Night out", "Dancing", "Social events"],
  };

  // Determine style category based on style, mood, and fabric
  let styleCategory = "Casual";
  if (style.includes("Formal") || mood === "Classic") styleCategory = "Formal";
  else if (style.includes("Business") || fabric === "Wool")
    styleCategory = "Business";
  else if (mood === "Edgy" || style.includes("Night")) styleCategory = "Party";
  else if (mood === "Romantic" || style.includes("Date"))
    styleCategory = "Cocktail";

  const bodyType =
    bodyTypeSuggestions[style] ||
    "Flattering for all body types with thoughtful styling";
  const occasions = occasionSuggestions[styleCategory] || [
    "Various occasions",
    "Versatile wear",
  ];

  return {
    bodyType,
    occasions: occasions.slice(0, 3), // Limit to 3 occasions
  };
}

function generateImageSpecs() {
  const ratios = [
    {
      ratio: "1:1",
      description: "Perfect square - ideal for social media posts",
    },
    {
      ratio: "4:5",
      description: "Portrait orientation - great for fashion photography",
    },
    { ratio: "3:4", description: "Classic portrait - perfect for lookbooks" },
    {
      ratio: "16:9",
      description: "Landscape format - ideal for presentations",
    },
  ];

  return ratios[Math.floor(Math.random() * ratios.length)];
}

// Add download image endpoint
app.post("/api/download-image", async (req, res) => {
  try {
    const { imageUrl, filename } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const imageBuffer = await response.buffer();
    const finalFilename = filename || `fashion-design-${Date.now()}.jpg`;

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${finalFilename}"`,
    );
    res.setHeader("Content-Length", imageBuffer.length);

    res.send(imageBuffer);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
});

app.post("/api/generate", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key missing" });

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
    accessories,
    targetAudience,
    occasion,
    graphicPrint,
    pattern,
    upperWear,
    lowerWear,
    shoes,
    headAccessories,
    hairstyle,
  } = req.body;

  // Format arrays for prompt
  const accessoryText =
    accessories && accessories.length > 0 ? accessories.join(", ") : "";
  const upperWearText =
    upperWear && upperWear.length > 0 ? upperWear.join(", ") : "";
  const lowerWearText =
    lowerWear && lowerWear.length > 0 ? lowerWear.join(", ") : "";
  const shoesText = shoes && shoes.length > 0 ? shoes.join(", ") : "";
  const headAccessoriesText =
    headAccessories && headAccessories.length > 0
      ? headAccessories.join(", ")
      : "";

  const fullPrompt = `
    Fashion design: ${prompt}
    Style: ${style || "versatile"}, Fabric: ${fabric || "comfortable"}, Color Theme: ${colorTheme || "harmonious"}, Main Color: ${mainColor},
    Model Size: ${modelSize || "M"}, Length: ${length || "appropriate"}, Mood: ${mood || "stylish"}, Season: ${season || "all-season"},
    Target Audience: ${targetAudience || "general"}, Occasion: ${occasion || "versatile"},
    Graphic Print: ${graphicPrint || "none"}, Pattern: ${pattern || "solid"},
    Accessories: ${accessoryText || "minimal"}, 
    Upper Wear: ${upperWearText || "stylish top"}, Lower Wear: ${lowerWearText || "matching bottom"},
    Shoes: ${shoesText || "appropriate footwear"}, Head Accessories: ${headAccessoriesText || "none"},
    Hairstyle: ${hairstyle || "complementary style"}.
    Create a high-fashion, professional fashion illustration showing a model wearing this outfit. 
    The image should be clean, well-lit, and suitable for a fashion magazine or runway presentation.
    Focus on the clothing design details, fabric texture, and overall aesthetic.
  `;

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
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
          style: "vivid",
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return res
        .status(500)
        .json({ error: "OpenAI API error", details: errorText });
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      return res.status(500).json({ error: "No image generated" });
    }

    // Generate comprehensive details
    const quirkyCaption = generateQuirkyCaption(mood, style);
    const stylingTips = generateAdvancedStylingTips(
      style,
      fabric,
      season,
      mood,
      colorTheme,
    );
    const colorPsychology = generateColorPsychology(colorTheme, mainColor);
    const bodyTypeOccasion = generateBodyTypeAndOccasion(
      style,
      fabric,
      mood,
      length,
    );
    const imageSpecs = generateImageSpecs();

    // Enhanced detailed breakdown
    const detailedBreakdown = {
      upperWear:
        upperWearText || "Stylish top piece with thoughtful design details",
      lowerWear:
        lowerWearText ||
        "Coordinating bottom that complements the overall aesthetic",
      shoes:
        shoesText || "Footwear that completes the look with style and comfort",
      accessories:
        accessoryText ||
        "Carefully curated accessories that enhance the outfit",
      headAccessories:
        headAccessoriesText || "None - letting the outfit speak for itself",
      hairstyle:
        hairstyle || "Natural styling that complements the overall aesthetic",
      colorPalette: `${colorTheme} theme featuring ${mainColor} as the primary color. ${colorPsychology.theme}`,
      fabricDetails: `${fabric} chosen for its ${stylingTips.fabric}`,
      occasionFit: `Perfect for ${bodyTypeOccasion.occasions.join(", ")}`,
      bodyTypeNotes: bodyTypeOccasion.bodyType,
      seasonalContext: stylingTips.seasonal,
      moodStyling: stylingTips.mood,
      colorPsychology: colorPsychology.mainColor,
      imageRatio: `${imageSpecs.ratio} - ${imageSpecs.description}`,
      textureNotes:
        graphicPrint !== "none"
          ? `Features ${graphicPrint} graphic elements`
          : pattern !== "solid"
            ? `${pattern} pattern adds visual interest`
            : "Clean, solid design focuses on silhouette and form",
    };

    const specs = {
      style,
      fabric,
      colorTheme,
      mainColor,
      modelSize,
      length,
      mood,
      season,
      accessories,
      upperWear,
      lowerWear,
      shoes,
      headAccessories,
      hairstyle,
      targetAudience,
      occasion,
      graphicPrint,
      pattern,
      detailedBreakdown,
      description: `A ${mood || "stylish"} ${style || "design"} in ${fabric || "quality fabric"} with a ${colorTheme || "beautiful"} theme, ${length || "perfect"} length for size ${modelSize || "M"}${targetAudience ? ` designed for ${targetAudience.toLowerCase()}` : ""}${occasion ? ` perfect for ${occasion.toLowerCase()} occasions` : ""}${accessoryText ? `, accessorized with ${accessoryText.toLowerCase()}` : ""}${upperWearText ? `. Features ${upperWearText.toLowerCase()} as upper wear` : ""}${lowerWearText ? ` with ${lowerWearText.toLowerCase()} as lower wear` : ""}${shoesText ? `, paired with ${shoesText.toLowerCase()}` : ""}${hairstyle ? ` and styled with ${hairstyle.toLowerCase()} hair` : ""}.`,
      story:
        "Generated by AI based on your prompt and selections. Each piece is thoughtfully designed to create a cohesive, fashionable look that reflects your personal style preferences.",
      stylingTip: stylingTips.seasonal,
      quirkyCaption,
      advancedStyling: {
        fabricTip: stylingTips.fabric,
        moodTip: stylingTips.mood,
        colorPsychology: colorPsychology.mainColor,
        occasionGuide: bodyTypeOccasion.occasions.join(", "),
        bodyTypeNotes: bodyTypeOccasion.bodyType,
      },
    };

    return res.status(200).json({
      suggestions: [{ imageUrl, specs }],
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key missing" });

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
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
          {
            role: "system",
            content:
              "You are a quirky, fashionable AI stylist that gives helpful and fun responses.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await chatRes.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) return res.status(500).json({ error: "No reply from OpenAI" });

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate chat reply" });
  }
});

// Serve Vite static files
app.use(express.static(path.join(__dirname, "dist")));

// Fallback to index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`),
);
