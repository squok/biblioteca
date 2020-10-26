require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

//Servidor de Express
const app = express();

//Config Cors
app.use(cors());

//lectura del Body
app.use(express.json());

//Bbdd
dbConnection();

//Rutas
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/course", require("./routes/course.routes"));
app.use("/api/student", require("./routes/student.routes"));
//Correr Servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo" + process.env.PORT);
});
