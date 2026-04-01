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
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional Christian rap songwriter. Write authentic, non-cliché lyrics with strong rhyme structure and modern flow."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    res.json({
      text: response.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    console.error(err);
    res.json({
      text: "AI error — check Render logs"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));