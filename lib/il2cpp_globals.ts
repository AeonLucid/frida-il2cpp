import { Il2Cpp } from "./il2cpp";
import { Il2CppUtils } from "./il2cpp_utils";

let il2cpp = new Il2Cpp();
let il2cppUtils = new Il2CppUtils(il2cpp);

export {
    il2cpp,
    il2cppUtils
}