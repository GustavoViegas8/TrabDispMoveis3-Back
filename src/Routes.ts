const Comments = require("./controllers/Comments")
const Upload = require("./middlewares/Upload")
const Movies = require("./controllers/Movies")
const Users = require("./controllers/Users")
const Login = require("./services/Login")
const Jwt = require("./middlewares/Jwt")
const Express = require("express");
const cors = require("cors");
const Route = Express.Router()

Route.use(cors())

Route
 .get("/User/:Id", Jwt, Users.SearchUserById)
 .post("/User", Upload.single('Image'), Users.CreateUser)

Route
 .post("/Login", Login.post)

Route
 .get("/Movies", Movies.GetAllMovies)
 .get("/MoviesCommenteds", Movies.GetMoviesWithComments)
 .post("/Movies/:UserId", Jwt, Movies.AddMovie)

Route
 .get("/Comments", Comments.getComments)
 .post("/Comments/:UserId/:MovieId", Jwt, Comments.AddComment)
module.exports = Route