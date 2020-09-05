export type Il2CppThread = NativePointer;
export type Il2CppDomain = NativePointer;
export type Il2CppAssembly = NativePointer;
export type Il2CppImage = NativePointer;
export type Il2CppClass = NativePointer;
export type Il2CppObject = NativePointer;
export type Il2CppType = NativePointer;
export type FieldInfo = NativePointer;
export type MethodInfo = NativePointer;

// https://git.kpi.fei.tuke.sk/tg206vc/liveitprojects/blob/283bff797d9dc1cf3ae0b5bc12830233b3c19250/Il2CppOutputProject/IL2CPP/libil2cpp/il2cpp-api.cpp
export class Il2Cpp {

    private _il2cpp_thread_current: NativeFunction;
    private _il2cpp_thread_attach: NativeFunction;
    private _il2cpp_thread_detach: NativeFunction;
    private _il2cpp_domain_get: NativeFunction;
    private _il2cpp_domain_get_assemblies: NativeFunction;
    private _il2cpp_assembly_get_image: NativeFunction;
    private _il2cpp_image_get_name: NativeFunction;
    private _il2cpp_image_get_class_count: NativeFunction;
    private _il2cpp_image_get_class: NativeFunction;
    private _il2cpp_class_get_name: NativeFunction;
    private _il2cpp_class_get_namespace: NativeFunction;
    private _il2cpp_class_get_fields: NativeFunction;
    private _il2cpp_class_get_methods: NativeFunction;
    private _il2cpp_type_get_name: NativeFunction;
    private _il2cpp_field_get_name: NativeFunction;
    private _il2cpp_field_get_type: NativeFunction;
    private _il2cpp_field_get_value: NativeFunction;
    private _il2cpp_field_static_get_value: NativeFunction;
    private _il2cpp_object_get_class: NativeFunction;
    private _il2cpp_object_unbox: NativeFunction;
    private _il2cpp_method_get_name: NativeFunction;
    private _il2cpp_runtime_invoke: NativeFunction;

    constructor () {
        let module = Process.findModuleByName("GameAssembly.dll")!;

        this._il2cpp_thread_current = new NativeFunction(module.findExportByName("il2cpp_thread_current")!, 'pointer', []);
        this._il2cpp_thread_attach = new NativeFunction(module.findExportByName("il2cpp_thread_attach")!, 'pointer', ['pointer']);
        this._il2cpp_thread_detach = new NativeFunction(module.findExportByName("il2cpp_thread_detach")!, 'void', ['pointer']);
        this._il2cpp_domain_get = new NativeFunction(module.findExportByName("il2cpp_domain_get")!, 'pointer', []);
        this._il2cpp_domain_get_assemblies = new NativeFunction(module.findExportByName("il2cpp_domain_get_assemblies")!, 'pointer', ['pointer', 'pointer']);
        this._il2cpp_assembly_get_image = new NativeFunction(module.findExportByName("il2cpp_assembly_get_image")!, 'pointer', ['pointer']);
        this._il2cpp_image_get_name = new NativeFunction(module.findExportByName("il2cpp_assembly_get_image")!, 'pointer', ['pointer']);
        this._il2cpp_image_get_class_count = new NativeFunction(module.findExportByName("il2cpp_image_get_class_count")!, 'long', ['pointer']);
        this._il2cpp_image_get_class = new NativeFunction(module.findExportByName("il2cpp_image_get_class")!, 'pointer', ['pointer', 'long']);
        this._il2cpp_class_get_name = new NativeFunction(module.findExportByName("il2cpp_class_get_name")!, 'pointer', ['pointer']);
        this._il2cpp_class_get_namespace = new NativeFunction(module.findExportByName("il2cpp_class_get_namespace")!, 'pointer', ['pointer']);
        this._il2cpp_class_get_fields = new NativeFunction(module.findExportByName("il2cpp_class_get_fields")!, 'pointer', ['pointer', 'pointer']);
        this._il2cpp_class_get_methods = new NativeFunction(module.findExportByName("il2cpp_class_get_methods")!, 'pointer', ['pointer', 'pointer']);
        this._il2cpp_type_get_name = new NativeFunction(module.findExportByName("il2cpp_type_get_name")!, 'pointer', ['pointer']);
        this._il2cpp_field_get_name = new NativeFunction(module.findExportByName("il2cpp_field_get_name")!, 'pointer', ['pointer']);
        this._il2cpp_field_get_type = new NativeFunction(module.findExportByName("il2cpp_field_get_type")!, 'pointer', ['pointer']);
        this._il2cpp_field_get_value = new NativeFunction(module.findExportByName("il2cpp_field_get_value")!, 'pointer', ['pointer', 'pointer', 'pointer']);
        this._il2cpp_field_static_get_value = new NativeFunction(module.findExportByName("il2cpp_field_static_get_value")!, 'pointer', ['pointer', 'pointer']);
        this._il2cpp_object_get_class = new NativeFunction(module.findExportByName("il2cpp_object_get_class")!, 'pointer', ['pointer']);
        this._il2cpp_object_unbox = new NativeFunction(module.findExportByName("il2cpp_object_unbox")!, 'pointer', ['pointer']);
        this._il2cpp_method_get_name = new NativeFunction(module.findExportByName("il2cpp_method_get_name")!, 'pointer', ['pointer']);
        this._il2cpp_runtime_invoke = new NativeFunction(module.findExportByName("il2cpp_runtime_invoke")!, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']);
    }

    // Il2CppThread *il2cpp_thread_current()
    public il2cpp_thread_current(): Il2CppThread {
        return this._il2cpp_thread_current() as Il2CppThread;
    }

    // Il2CppThread *il2cpp_thread_attach(Il2CppDomain *domain)
    public il2cpp_thread_attach(domain: Il2CppDomain): Il2CppThread {
        return this._il2cpp_thread_attach(domain) as Il2CppThread;
    }

    // void il2cpp_thread_detach(Il2CppThread *thread)
    public il2cpp_thread_detach(thread: Il2CppThread): void {
        this._il2cpp_thread_detach(thread);
    }

    // Il2CppDomain* il2cpp_domain_get()
    public il2cpp_domain_get(): Il2CppDomain {
        return this._il2cpp_domain_get() as Il2CppDomain;
    }

    // const Il2CppAssembly** il2cpp_domain_get_assemblies(const Il2CppDomain* domain, size_t* size)
    public il2cpp_domain_get_assemblies(domain: Il2CppDomain, size_t_out: NativePointer): Il2CppAssembly {
        return this._il2cpp_domain_get_assemblies(domain, size_t_out) as Il2CppAssembly;
    }

    // const Il2CppImage* il2cpp_assembly_get_image(const Il2CppAssembly *assembly)
    public il2cpp_assembly_get_image(assembly: Il2CppAssembly): Il2CppImage {
        return this._il2cpp_assembly_get_image(assembly) as Il2CppImage;
    }

    // const char* il2cpp_image_get_name(const Il2CppImage *image)
    public il2cpp_image_get_name(image: Il2CppImage): string | null {
        return (this._il2cpp_image_get_name(image) as NativePointer).readCString();
    }

    // size_t il2cpp_image_get_class_count(const Il2CppImage * image)
    public il2cpp_image_get_class_count(image: Il2CppImage): number {
        return this._il2cpp_image_get_class_count(image) as number;
    }

    // const Il2CppClass* il2cpp_image_get_class(const Il2CppImage * image, size_t index)
    public il2cpp_image_get_class(image: Il2CppImage, index: number): Il2CppClass {
        return this._il2cpp_image_get_class(image, index) as Il2CppClass;
    }

    // const char* il2cpp_class_get_name(Il2CppClass *klass)
    public il2cpp_class_get_name(clazz: Il2CppClass): string | null {
        return (this._il2cpp_class_get_name(clazz) as NativePointer).readCString();
    }

    // const char* il2cpp_class_get_namespace(Il2CppClass *klass)
    public il2cpp_class_get_namespace(clazz: Il2CppClass): string | null {
        return (this._il2cpp_class_get_namespace(clazz) as NativePointer).readCString();
    }

    // FieldInfo* il2cpp_class_get_fields(Il2CppClass *klass, void* *iter)
    public il2cpp_class_get_fields(clazz: Il2CppClass, iter: NativePointer): FieldInfo {
        return this._il2cpp_class_get_fields(clazz, iter) as FieldInfo;
    }

    // const MethodInfo* il2cpp_class_get_methods(Il2CppClass *klass, void* *iter)
    public il2cpp_class_get_methods(clazz: Il2CppClass, iter: NativePointer): MethodInfo {
        return this._il2cpp_class_get_methods(clazz, iter) as MethodInfo;
    }

    // char* il2cpp_type_get_name(const Il2CppType *type)
    public il2cpp_type_get_name(type: Il2CppType): string | null {
        return (this._il2cpp_type_get_name(type) as NativePointer).readCString();
    }

    // const char* il2cpp_field_get_name(FieldInfo *field)
    public il2cpp_field_get_name(field: FieldInfo): string | null {
        return (this._il2cpp_field_get_name(field) as NativePointer).readCString();
    }

    // const Il2CppType* il2cpp_field_get_type(FieldInfo *field)
    public il2cpp_field_get_type(field: FieldInfo): Il2CppType {
        return this._il2cpp_field_get_type(field) as Il2CppType;
    }

    // void il2cpp_field_get_value(Il2CppObject *obj, FieldInfo *field, void *value)
    public il2cpp_field_get_value(obj: Il2CppObject, field: FieldInfo): NativePointer {
        const addrOut = Memory.alloc(Process.pointerSize);
        this._il2cpp_field_get_value(obj, field, addrOut);
        return addrOut.readPointer();
    }

    // void il2cpp_field_static_get_value(FieldInfo *field, void *value)
    public il2cpp_field_static_get_value(field: FieldInfo): NativePointer {
        const addrOut = Memory.alloc(Process.pointerSize);
        this._il2cpp_field_static_get_value(field, addrOut);
        return addrOut.readPointer();
    }

    // Il2CppClass* il2cpp_object_get_class(Il2CppObject* obj)
    public il2cpp_object_get_class(obj: Il2CppObject): Il2CppClass {
        return this._il2cpp_object_get_class(obj) as Il2CppClass;
    }

    // void* il2cpp_object_unbox(Il2CppObject* obj)
    public il2cpp_object_unbox(obj: Il2CppObject): Il2CppClass {
        return this._il2cpp_object_unbox(obj) as Il2CppClass;
    }

    // const char* il2cpp_method_get_name(const MethodInfo *method)
    public il2cpp_method_get_name(method: MethodInfo): string | null {
        return (this._il2cpp_method_get_name(method) as NativePointer).readCString();
    }

    // Il2CppObject* il2cpp_runtime_invoke(const MethodInfo *method, void *obj, void **params, Il2CppException **exc)
    public il2cpp_runtime_invoke(method: MethodInfo, obj: NativePointer, params: NativePointer[]): Il2CppObject {
        let paramsData = Memory.alloc(params.length + 1);
        let exception = Memory.alloc(Process.pointerSize);
    
        for (let index = 0; index < params.length; index++) {
            paramsData.add(index * Process.pointerSize).writePointer(params[index]);
        }

        console.log(method, obj, paramsData, exception);

        return this._il2cpp_runtime_invoke(method, obj, paramsData, exception) as Il2CppObject;
    }

}