const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serve frontend

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/lyrics", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-5.3",
      messages: [
        {
          role: "system",
          content: "You are a professional Christian rap songwriter. Write authentic, non-cliché lyrics with strong rhyme structure, modern flow, and emotional depth."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.9
    });

    res.json({
      text: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));