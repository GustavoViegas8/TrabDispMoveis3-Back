const Mysql = require("../database/DatabaseConfig");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async post(
    req: { body: { Email: string; Password: string } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { error: boolean; msg?: any; Token?: string; Id?: string }): void;
          new (): any;
        };
      };
    }
  ) {
    const { Email, Password } = req.body;
    try {
      const Data = await Mysql("Users").where({ Email });
      console.log(Data)
      if (Data.lenght) {
        res.status(400).json({ error: true, msg: "USER_NOT_FOUND" });
        return;
      }
      if (bcrypt.compareSync(Password, Data[0].Password)) {
        const Token = JWT.sign(
          {
            User_Id: Data[0].Id,
            User_Name: Data[0].Name,
          },
          process.env.JWT_KEY,
          { expiresIn: "6h" }
        );
        res.status(200).json({ error: false, Token: Token, Id: Data[0].Id });
      } else {
        res.status(400).json({ error: true, msg: "INCORRECT_PASSWORD" });
      }
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  },
};
