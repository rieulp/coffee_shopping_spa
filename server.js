const request = require("request");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const API_END_POINT = "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

app.use(express.json());
app.use(express.static("dist"));

app.listen(PORT, () => {
  console.log(`
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃   Server listening on port: ${PORT}    ┃
    ┃     http://localhost:${PORT}/          ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `);
});

app.get("/api/products", (req, res) => {
  request(
    { url: `${API_END_POINT}/products`, method: "GET", json: true },
    (error, response, body) => {
      if (error) res.status(204).send(err);
      res.send(body);
    }
  );
});

app.get("/api/products/:productId", (req, res) => {
  request(
    { url: `${API_END_POINT}/products/${req.params.productId}`, method: "GET", json: true },
    (error, response, body) => {
      if (error) res.status(204).send(err);
      res.send(body);
    }
  );
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
