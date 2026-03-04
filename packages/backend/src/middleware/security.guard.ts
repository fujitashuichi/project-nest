import { Request, Response } from "express";

const removeControlChars = (str: string) => {
  return str.replace(/[\u0000-\u001F\u007F]/g, "");
}

export const securityGuard = (req: Request, res: Response): boolean => {
  const dto = req.body;

  for (const key in dto) {
    if (typeof dto[key] === "string") {
      const cleaned = removeControlChars(dto[key]);

      // 異常値検査結果: booleanを逆にしないように注意
      const hasControlChars = cleaned !== dto[key];
      const hasScriptTag = /<\s*script\b/i.test(dto[key]);

      if (hasControlChars || hasScriptTag) {
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
