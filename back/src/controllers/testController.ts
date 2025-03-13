import { TestUseCase } from "logic";
import { Request, Response } from "express";

export const testLogic = (req: Request, res: Response) => {
  console.log("testLogic a été appelé !");
  const result = TestUseCase.run();

  res.send({ message: result });
};
