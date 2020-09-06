# frida-il2cpp

An helper library for those that want to play around with Unity il2cpp games. 

Tested on Windows but should easily work for Android / iOS too. I think only the `Process.findModuleByName("GameAssembly.dll")!;` in `il2cpp.ts` needs to be changed. 

## Example class

```ts
import { Il2CppClassWrapper } from "../../frida-il2cpp/lib/il2cpp_class";
import { il2cpp } from "../../frida-il2cpp/lib/il2cpp_globals";
import { Il2CppObject } from "../../frida-il2cpp/lib/il2cpp";

export class CS_List<T> extends Il2CppClassWrapper {

    private _handle: Il2CppObject;
    private _type: (new (instance: Il2CppObject) => T);

    constructor (handle: Il2CppObject, type: (new (instance: Il2CppObject) => T)) {
        super("System.Collections.Generic", "List`1", il2cpp.il2cpp_object_get_class(handle));
        this._handle = handle;
        this._type = type;
    }

    public size(): number {
        return this.get_instance_value(this._handle, "_size").toInt32();
    }

    public count(): number {
        return this.invoke_instance_method(this._handle, "get_Count", "int");
    }

    public item(index: number): T {
        const addrIndex = Memory.alloc(4);

        addrIndex.writeS32(index);
        
        const result = this.invoke_instance_method(this._handle, "get_Item", "object", [
            addrIndex
        ]);

        return new this._type(result);
    }

}
```

### Usage

```ts
let players: CS_List<AO_PlayerInfo> = gameData.allPlayers();

for (let index = 0; index < players.count(); index++) {
    const element: AO_PlayerInfo = players.item(index);

    console.log(element.playerName());
}
```