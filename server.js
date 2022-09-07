const request = require("request");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const API_END_POINT = "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

// app.use(
//   cors({
//     origin: `${location.protocol}//${location.hostname}:3000`,
//   })
// );
app.use(express.json());

app.listen(PORT, () => {
  console.log(`
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃   Server listening on port: ${PORT}    ┃
    ┃     http://localhost:${PORT}/          ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `);
});

app.get("/api/products", cors(), (req, res) => {
  request(
    { url: `${API_END_POINT}/products`, method: "GET", json: true },
    (error, response, body) => {
      if (error) res.status(204).send(err);
      res.send(body);
    }
  );
});

app.get("/api/products/:productId", cors(), (req, res) => {
  request(
    { url: `${API_END_POINT}/products/${req.params.productId}`, method: "GET", json: true },
    (error, response, body) => {
      if (error) res.status(204).send(err);
      res.send(body);
    }
  );
});
