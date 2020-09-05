import { Il2Cpp, FieldInfo, Il2CppClass, Il2CppObject, MethodInfo } from "./il2cpp";

export class Il2CppUtils {

    public il2cpp: Il2Cpp;
    private _fieldCache: Map<string, FieldInfo>;

    constructor (il2cpp: Il2Cpp) {
        this.il2cpp = il2cpp;
        this._fieldCache = new Map();
    }

    public readStatic(className: string, fieldName: string): NativePointer {
        const field = this._findField(className, fieldName);
        if (field.isNull()) {
            return field;
        }

        return this.il2cpp.il2cpp_field_static_get_value(field);
    }

    public readInstance(className: string, fieldName: string, instance: Il2CppObject): NativePointer {
        const field = this._findField(className, fieldName);
        if (field.isNull()) {
            return field;
        }

        return this.il2cpp.il2cpp_field_get_value(instance, field);
    }

    public getAllClassFields(className: string, classAddr: Il2CppClass | null = null): Map<string, FieldInfo> {
        const result = new Map<string, FieldInfo>();

        // Find class.
        if (classAddr === null) {
            classAddr = this._findClass(className);
        
            if (classAddr.isNull()) {
                return result;
            }
        }

        // Find all fields.
        const iterAddr = Memory.alloc(Process.pointerSize);

        let fieldInfo: FieldInfo = ptr(0);
        let fieldName: string | null = null;

        while (true) {
            fieldInfo = this.il2cpp.il2cpp_class_get_fields(classAddr, iterAddr);

            if (fieldInfo.isNull()) {
                break;
            }

            fieldName = this.il2cpp.il2cpp_field_get_name(fieldInfo);

            if (fieldName === null) {
                console.log(`[!] Got a null fieldName in class ${className}.`);
                continue;
            }

            result.set(fieldName!, fieldInfo);
        }

        return result;
    }

    public getAllClassMethods(className: string, classAddr: Il2CppClass | null = null): Map<string, MethodInfo> {
        const result = new Map<string, MethodInfo>();

        // Find class.
        if (classAddr === null) {
            classAddr = this._findClass(className);
        
            if (classAddr.isNull()) {
                return result;
            }
        }

        // Find all fields.
        const iterAddr = Memory.alloc(Process.pointerSize);

        let methodInfo: MethodInfo = ptr(0);
        let methodName: string | null = null;

        while (true) {
            methodInfo = this.il2cpp.il2cpp_class_get_methods(classAddr, iterAddr);

            if (methodInfo.isNull()) {
                break;
            }

            methodName = this.il2cpp.il2cpp_method_get_name(methodInfo);

            if (methodName === null) {
                console.log(`[!] Got a null methodName in class ${className}.`);
                continue;
            }

            result.set(methodName!, methodInfo);
        }

        return result;
    }

    private _findField(searchClassName: string, searchFieldName: string): FieldInfo {
        // Check field cache.
        const fieldCacheKey = `${searchClassName}_${searchFieldName}`;

        if (this._fieldCache.has(fieldCacheKey)) {
            return this._fieldCache.get(fieldCacheKey) as FieldInfo;
        }

        // Find class.
        const classAddr = this._findClass(searchClassName);
        
        if (classAddr.isNull()) {
            return ptr(0);
        }

        // Find target field in class fields.
        const iterAddr = Memory.alloc(Process.pointerSize);

        let fieldInfo: FieldInfo = ptr(0);
        let fieldName: string | null = null;

        while (true) {
            fieldInfo = this.il2cpp.il2cpp_class_get_fields(classAddr, iterAddr);

            if (fieldInfo.isNull()) {
                break;
            }

            fieldName = this.il2cpp.il2cpp_field_get_name(fieldInfo);

            if (fieldName === searchFieldName) {
                // Add to cache.
                this._fieldCache.set(fieldCacheKey, fieldInfo);

                return fieldInfo;
            }
        }

        console.log(`[!] Failed to find field ${searchFieldName} in class ${searchClassName}.`);

        return ptr(0);
    }

    private _findClass(searchClassName: string): Il2CppClass {
        const domain = this.il2cpp.il2cpp_domain_get();
        const domainAssembliesSize = Memory.alloc(Process.pointerSize);
        const domainAssemblies = this.il2cpp.il2cpp_domain_get_assemblies(domain, domainAssembliesSize);

        for (let index = 0; index < domainAssembliesSize.readU32(); index++) {
            const assembly = domainAssemblies.add(Process.pointerSize * index).readPointer();
            const image = this.il2cpp.il2cpp_assembly_get_image(assembly);
            // const imageName = this.il2cpp.il2cpp_image_get_name(image);
            const classCount = this.il2cpp.il2cpp_image_get_class_count(image);

            for (let classIndex = 0; classIndex < classCount; classIndex++) {
                const classAddr = this.il2cpp.il2cpp_image_get_class(image, classIndex);
                const className = this.il2cpp.il2cpp_class_get_name(classAddr);

                if (className === searchClassName) {
                    return classAddr;
                }
            }
        }

        console.log(`[!] Failed to find class ${searchClassName}.`);

        return ptr(0);
    }

}