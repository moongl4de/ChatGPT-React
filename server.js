const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/chat", async (req, res) => {
  console.log("req.body", req.body);
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt + " in less than 50 words",
    max_tokens: 1000,
  });

  console.log(completion.data.choices[0].text);
  res.send(completion.data.choices[0].text);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
