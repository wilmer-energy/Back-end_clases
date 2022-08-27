const http = require("http");
let data = [
  { name: "Wilmer", age: 23 },
  { name: "Wilmer", age: 22 },
  { name: "Wilmer", age: 21 },
];
const posts = [
  { id: 1, title: "Post 1", content: "This is post 1" },
  { id: 2, title: "Post 2", content: "This is post 2" },
  { id: 3, title: "Post 3", content: "This is post 3" },
];

//Create the server
const server = http.createServer((request, response) => {
  const { method, url } = request;
  if (method === "GET" && url === "/post") {
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(posts));
    response.end();
  } else {
    response.write("This endpoint doesn't exists");
    response.end();
  }
  // * TASK: CREATE AN ENDPOINT THAT SENDS BACK THE LIST OF POSTS
  // * TASK: CREATE AN ELSE THAT CATCHES NON-EXISTING ENDPOINTS ON THE SERVER
  // * You can send a message to the user in a JSON { message: 'This endpoint doesn't exists' ... }
});

server.listen(4000); //Se ha creado un puerto para el servidor y se ha puesto a escuchar
