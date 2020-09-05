import { FieldInfo, Il2CppObject, Il2CppClass, MethodInfo } from "./il2cpp";
import { il2cpp, il2cppUtils } from "./il2cpp_globals";

export class Il2CppClassWrapper {

    protected _className: string;
    protected _fields: Map<string, FieldInfo>
    protected _methods: Map<string, MethodInfo>

    constructor (className: string, classType: Il2CppClass | null = null) {
        this._className = className;
        this._fields = il2cppUtils.getAllClassFields(this._className, classType);
        this._methods = il2cppUtils.getAllClassMethods(this._className, classType);
    }

    protected get_static_value(fieldName: string) {
        const field = this._fields.get(fieldName);
        if (field === undefined) {
            throw new Error(`Field ${fieldName} does not exist for class ${this._className}.`);
        }

        return il2cpp.il2cpp_field_static_get_value(field!);
    }

    protected get_instance_value(obj: Il2CppObject, fieldName: string) {
        const field = this._fields.get(fieldName);
        if (field === undefined) {
            throw new Error(`Field ${fieldName} does not exist for class ${this._className}.`);
        }

        return il2cpp.il2cpp_field_get_value(obj, field!);
    }

    protected invoke_instance_method(obj: Il2CppObject, methodName: string) {
        const method = this._methods.get(methodName);
        if (method === undefined) {
            throw new Error(`Method ${methodName} does not exist for class ${this._className}.`);
        }

        return il2cpp.il2cpp_runtime_invoke(method!, obj, []);
    }

    protected unbox(obj: Il2CppObject): NativePointer {
        return il2cpp.il2cpp_object_unbox(obj);
    }

    public dump_fields() {
        console.log(`[-] ${this._className} Fields:`);

        for (let [key, value] of this._fields) {
            console.log(`[-] - ${key}, type: ${il2cpp.il2cpp_type_get_name(il2cpp.il2cpp_field_get_type(value))}`);
        }
    }

    public dump_methods() {
        console.log(`[-] ${this._className} Methods:`);

        for (let [key, value] of this._methods) {
            console.log(`[-] - ${key}`);
        }
    }

}