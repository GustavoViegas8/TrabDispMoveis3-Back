const Mysql = require("../database/DatabaseConfig");
import { GenerateRandonId } from "../../utils/Utils";

module.exports = {
  async getComments(
    req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { error: boolean; msg: any; Data?: any }): void;
          new (): any;
        };
      };
    }
  ) {
    try {
      const Data = await Mysql.select().from("Comments");
      res.status(200).json({ error: false, msg: "SUCCESS", Data: Data });
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  },
  async AddComment(
    req: {
      params: { UserId: any; MovieId: any };
      body: { Comment: any; Note: any };
    },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { error: boolean; msg: any; Id?: string }): void;
          new (): any;
        };
      };
    }
  ) {
    const Id = GenerateRandonId();
    const UserId = req.params.UserId;
    const MovieId = req.params.MovieId;
    const { Comment, Note } = req.body;
    console.log(Comment, Note)
    try {
      await Mysql("Comments").insert({
        Id,
        UserId,
        MovieId,
        Comment,
        Note,
      });
      res.status(200).json({ error: false, msg: "SUCCESS", Id: Id });
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  },
};
