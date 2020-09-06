import { FieldInfo, Il2CppObject, Il2CppClass, MethodInfo, IlTypes } from "./il2cpp";
import { il2cpp, il2cppUtils } from "./il2cpp_globals";

export class Il2CppClassWrapper {

    protected _namespace: string;
    protected _className: string;
    protected _fields: Map<string, FieldInfo>
    protected _methods: Map<string, MethodInfo>

    constructor (namespace: string, className: string, classType: Il2CppClass | null = null) {
        this._namespace = namespace;
        this._className = className;
        this._fields = il2cppUtils.getAllClassFields(this._namespace, this._className, classType);
        this._methods = il2cppUtils.getAllClassMethods(this._namespace, this._className, classType);
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

    protected invoke_instance_method(obj: Il2CppObject, methodName: string, returnType: IlTypes, params: NativePointer[] = []): any {
        const method = this._methods.get(methodName);
        if (method === undefined) {
            throw new Error(`Method ${methodName} does not exist for class ${this._className}.`);
        }

        return this.unbox(il2cpp.il2cpp_runtime_invoke(method!, obj, params), returnType);
    }

    protected unbox(obj: Il2CppObject, type: IlTypes): any {
        switch (type) {
            case "bool":
                return obj.toInt32() == 1;
            case "uint":
                return il2cpp.il2cpp_object_unbox(obj).readU32();
            case "int":
                return il2cpp.il2cpp_object_unbox(obj).readS32();
            case "string":
                return il2cpp.il2cpp_object_unbox(obj).add(4).readUtf16String();
            default:
                break;
        }

        return obj;
    }

    public dump_fields() {
        console.log(`[-] ${this._className} Fields:`);

        for (let [key, value] of this._fields) {
            const fieldType = il2cpp.il2cpp_field_get_type(value);
            const fieldTypeName = il2cpp.il2cpp_type_get_name(fieldType);

            console.log(`[-] - ${fieldTypeName} ${key}`);
        }
    }

    public dump_methods() {
        console.log(`[-] ${this._className} Methods:`);

        for (let [key, value] of this._methods) {
            const returnType = il2cpp.il2cpp_method_get_return_type(value);
            const returnTypeName = il2cpp.il2cpp_type_get_name(returnType);

            console.log(`[-] - ${returnTypeName} ${key}`);
        }
    }

}