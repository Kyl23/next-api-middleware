import { NextApiRequest, NextApiResponse } from "next";
import Middleware from "../../middleware";

const { throwIn } = Middleware.app();

export default async function HomePage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  throwIn(req, res)?.then((req, res) => {
    res.send("Ending");
  });
}
