require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);