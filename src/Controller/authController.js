const authModel = require("../Model/authModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { comparePassword, expireTokenTime } = require("../Utils/utils");

exports.register = async (request, response) => {
  try {
    const body = request.body;
    const userData = {
      name: body.name,
      email: body.email,
      password: body.password,
    };

    const dbRes = await authModel.create(userData);
    if (dbRes) {
      return response.status(201).json({
        status: "success",
        message: "register successfully",
        data: dbRes,
      });
    }
  } catch {
    return response.status(400).json({
      status: "failed",
      message: "register failed",
    });
  }
};

exports.login = async (request, response) => {
  try {
    const body = request.body;
    const query = {
      email: body.email,
    };
    const dbRes = await authModel.findOne(query);
    if (dbRes) {
      if (comparePassword(body.password, dbRes.password)) {
        const secretKey = process.env.SECRETKEY;
        const payLoad = {
          name: dbRes.name,
          email: dbRes.email,
          _id: dbRes._id,
          time: Date(),
        };
        const token = jwt.sign(payLoad, secretKey, expireTokenTime());
        return response.status(200).json({
          status: "success",
          message: "login successfully",
          token: token,
        });
      } else {
        return response.status(400).json({
          status: "failed",
          message: "email and password is Incorrect",
        });
      }
    } else {
      return response.status(400).json({
        status: "failed",
        message: "email and password is Incorrect",
      });
    }
  } catch {
    return response.status(400).json({
      status: "failed",
      message: "login failed",
    });
  }
};
