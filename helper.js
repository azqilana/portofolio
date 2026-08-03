import getelemen from "./system/observer.js";
import { registerPage } from "./system/registry.js";

class Helper {
    getElement(selector) {
        return getelemen.el(selector);
    }
    register(name, intFunc) {
        return registerPage(name, intFunc);
    }
}
const helper = new Helper();
export default helper;
