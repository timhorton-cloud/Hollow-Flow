const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serve frontend

app.post("/lyrics", async (req, res) => {
  // MOCK (replace with OpenAI later)
  res.json({ text: "Sample Christian rap lyrics... (connect AI next)" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
