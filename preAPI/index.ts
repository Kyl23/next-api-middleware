import Middleware from "../middleware";
import preIndexAPI from "./api";

export let isInit = false;
export default function preAPI() {
  if (isInit) return;
  isInit = true;
  preIndexAPI();
}
