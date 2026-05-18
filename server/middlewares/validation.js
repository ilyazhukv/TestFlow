import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      if (req.body) schema.parse(req.body);
      if (req.query) schema.parse(req.query);
      if (req.params) schema.parse(req.params);
      next();
    } catch (error) {
      return res.status(400).json({ error: { server: ["Invalid input"] } });
    }
  };
};