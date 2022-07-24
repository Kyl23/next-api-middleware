import Middleware from "../../middleware";

export default function preIndexAPI() {
  const { use } = Middleware.app();
  use("/api", (req, res, progress) => {
    console.log("I am the first one");
    progress.next();
  });

  use("/api", (req, res, progress) => {
    console.log("I am the second");
    res.send("I kill the end");
  });
}
