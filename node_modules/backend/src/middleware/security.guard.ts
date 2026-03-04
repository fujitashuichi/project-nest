import { Request, Response } from "express";

const removeControlChars = (str: string) => {
  return str.replace(/[\u0000-\u001F\u007F]/g, "");
}

export const securityGuard = (req: Request, res: Response): boolean => {
  const dto = req.body;

  for (const key in dto) {
    if (typeof dto[key] === "string") {
      const cleaned = removeControlChars(dto[key]);
      if (cleaned !== dto[key]) {
        res.status(400).send({
          success: false,
          message: "Invalid Characters Detected"
        });

        return false;
      }
    }
  }

  return true;
}
