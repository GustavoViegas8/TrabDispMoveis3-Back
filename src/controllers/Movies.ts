const Mysql = require("../database/DatabaseConfig");
import { GenerateRandonId } from "../../utils/Utils";

module.exports = {
  async GetAllMovies(
    req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { error: boolean; msg: any; Data?: any[] }): void;
          new (): any;
        };
      };
    }
  ) {
    try {
      const Movies: Array<any> = await Mysql.select("*").from("Movies");

      res.status(200).json({ error: false, msg: "SUCCESS", Data: Movies });
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  },
  async AddMovie(req: any, res: any) {
    const UserId = req.params.UserId;
    const Id = GenerateRandonId();
    const { ImgName, Synopsis, Genre, Title, DayMonthYear } = req.body;
    try {
      await Mysql("Movies").insert({
        UserId,
        Id,
        ImgName,
        Synopsis,
        Genre,
        Title,
        DayMonthYear,
      });
      res.status(200).json({ error: false, msg: "SUCCESS", Id: Id });
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  },
  async GetMoviesWithComments(req: any, res: any) {
    try {
      const Movies = await Mysql.select().from("Movies");
      const Comments = await Mysql.select().from("Comments");
      const Data: Array<any> = [];
      Movies.forEach((Movie: { Id: string }) => {
        const CommentsData = Comments.filter((Comment: { MovieId: string }) => {
          if (Movie.Id == Comment.MovieId) return Comment
        });
        const MovieData = {
          ...Movie,
          CommentsData,
        };
        Data.push(MovieData);
      });

      res.status(200).json({ error: false, msg: "SUCCESS", Data: Data });
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  },
};
