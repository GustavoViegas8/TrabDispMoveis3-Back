const Mysql = require("../database/DatabaseConfig");
const bcrypt = require("bcrypt");

import { GenerateRandonId } from "../../utils/Utils";

module.exports = {
  async SearchUserById(
    req: { params: { Id: string } },
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
    const Id = req.params.Id;
    try {
      const User = await Mysql.select("*")
        .from("Users")
        .where({ "Users.Id": Id });

      const Message = User[0] ? "USER_FOUNDED" : "USER_NOT_FOUND";
      res.status(200).json({ error: false, msg: Message, Data: User });
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  },
  async CreateUser(
    req: { body: { Name: string; Email: string; Password: string }; file: any },
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
    const { Name, Email, Password } = req.body;
    const Image = req.file.filename;
    const Hash = bcrypt.hashSync(Password, 5);
    try {
      await Mysql("Users").insert({
        Id,
        Name,
        Email,
        Password: Hash,
        Image,
      });
      res.status(200).json({ error: false, msg: "SUCCESS", Id: Id });
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  },
};
