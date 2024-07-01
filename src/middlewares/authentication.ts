import * as express from "express";
import * as jwt from "jsonwebtoken";
import logger from "./logger";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "api_key") {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }

    if (token === "abc123456") {
      return Promise.resolve({
        id: 1,
        name: "Ironman",
      });
    } else {
      return Promise.reject({});
    }
  }

  if (securityName === "jwt") {
    let token =
      request.body.token ||
      request.query.token ||
      request.headers["x-access-token"]
    
    token = token || (request.headers['authorization'] && request.headers['authorization'].substring("bearer ".length));
    console.log(token)
    logger.info(token)
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      jwt.verify(token, "secret", function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          // Check if JWT contains all required scopes
          if(scopes)
          for (let scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error("JWT does not contain required scope."));
            }
          }
          resolve(decoded);
        }
      });
    });
  } else {
    return Promise.reject();
  }
}