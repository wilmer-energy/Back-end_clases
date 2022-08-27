const { response } = require("express");
const express = require("express");
const app = express();

const { Sequelize, DataTypes } = require("sequelize"); // --> importar desde sequelize, inslatar (npm i sequelize pg pg-hstore)

const db = new Sequelize({
  //--> Establecer la conexión entre Node y Postgres usando sequelize
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "cUCUTA@12345",
  port: 5432,
  database: "HelloWorld",
});

const user = db.define("users", {
  //--> Crear una nueva tabla (modelo) en Postgres
  id: {
    type: DataTypes.INTEGER, // --> DataTypes sirve como un traductor en el caso de que queramos usar otro motor distinto a Postgres
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, //--> No permite poner un nombre vacio
  },
  email: {
    type: DataTypes.STRING,
    unique: true, //--> No permite repeticiones
  },
  password: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active", //--> si no se nos pasa el dato, el sistema tomara este
  },
});

db.authenticate() //--> Finalizar con la conexión de la base de datos
  .then(() => {
    console.log("Conetion done");
  })
  .catch(()=>{console.log("Unable to conect to the data base")});

db.sync()
  .then(() => {
    console.log("Data base synced");
  })
  .catch(() => {
    console.log("error trying to sync the data base");
  });

app.listen(4000, () => {}); //--> poner a escuchar el servidor

app.use(express.json()); //habilidar la base de datos para recevir JSON

app.get("/users", async (req, res) => {
  try {
    const users = await user.findAll();
    res.status(200).json({
      status: "success to download",
      data: { users },
    });
  } catch {
    console.log("Unable to download the users");
  }

  res.end();
});

app.post("/newUser", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    console.log(name);
    const newUser = await user.create({ name, email, password });
    res.status(202).json({
      status: `user ${name} created`,
      data: { newUser },
    });
  } catch {
    console.log("error trying to create the new user");
  }
  res.end();
});

app.all("*", (req, res) => {
  console.log("Hola error");
  res.status(404).json({
    status: "error",
    data: `we are unable to find the ${req.url} in the method ${req.method}`,
  });
  res.end();
});
