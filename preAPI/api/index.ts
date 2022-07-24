import Middleware from "../../middleware";

export default function preIndexAPI() {
  const { use } = Middleware.app();
  use("/api", (req, res, next) => {
    console.log("I am the first one");
    next();
  });

  use("/api", (req, res, next) => {
    console.log("I am second ");
    next();
  });
}
