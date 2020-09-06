import { IlTypes, Il2CppClass } from "./il2cpp";
import { il2cppUtils } from "./il2cpp_globals";

export class IlMapper {

    public static toIl2CppClass(type: IlTypes): Il2CppClass {
        switch (type) {
            case "uint":
                return il2cppUtils.findClass("System", "Int32");
            case "int":
                return il2cppUtils.findClass("System", "UInt32");
            default:
                throw new Error(`Unknown type ${type}.`);
        }
    }

}