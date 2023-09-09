const { data_view, UTF8_DECODER, utf8_encode, utf8_encoded_len, throw_invalid_bool } = require('./intrinsics.js');
class Imports {
  addToImports(imports) {
  }
  
  async instantiate(module, imports) {
    imports = imports || {};
    this.addToImports(imports);
    
    if (module instanceof WebAssembly.Instance) {
      this.instance = module;
    } else if (module instanceof WebAssembly.Module) {
      this.instance = await WebAssembly.instantiate(module, imports);
    } else if (module instanceof ArrayBuffer || module instanceof Uint8Array) {
      const { instance } = await WebAssembly.instantiate(module, imports);
      this.instance = instance;
    } else {
      const { instance } = await WebAssembly.instantiateStreaming(module, imports);
      this.instance = instance;
    }
    this._exports = this.instance.exports;
  }
  getProp(arg0) {
    const memory = this._exports.memory;
    const realloc = this._exports["canonical_abi_realloc"];
    const free = this._exports["canonical_abi_free"];
    const ptr0 = utf8_encode(arg0, realloc, memory);
    const len0 = utf8_encoded_len();
    const ret = this._exports['get-prop'](ptr0, len0);
    
    let variant5;
    switch (data_view(memory).getUint8(ret + 0, true)) {
      case 0: {
        let variant3;
        switch (data_view(memory).getUint8(ret + 8, true)) {
          case 0: {
            const ptr1 = data_view(memory).getInt32(ret + 16, true);
            const len1 = data_view(memory).getInt32(ret + 20, true);
            const list1 = UTF8_DECODER.decode(new Uint8Array(memory.buffer, ptr1, len1));
            free(ptr1, len1, 1);
            variant3 = {
              tag: "strng",
              val: list1,
            };
            break;
          }
          case 1: {
            variant3 = {
              tag: "number",
              val: data_view(memory).getFloat64(ret + 16, true),
            };
            break;
          }
          case 2: {
            const bool2 = data_view(memory).getUint8(ret + 16, true);
            variant3 = {
              tag: "boolean",
              val: bool2 == 0 ? false : (bool2 == 1 ? true : throw_invalid_bool()),
            };
            break;
          }
          case 3: {
            variant3 = {
              tag: "unknown",
            };
            break;
          }
          default:
          throw new RangeError("invalid variant discriminant for Prop");
        }
        
        variant5 = { tag: "ok", val: variant3 };
        break;
      }
      case 1: {
        const ptr4 = data_view(memory).getInt32(ret + 8, true);
        const len4 = data_view(memory).getInt32(ret + 12, true);
        const list4 = UTF8_DECODER.decode(new Uint8Array(memory.buffer, ptr4, len4));
        free(ptr4, len4, 1);
        
        variant5 = { tag: "err", val: list4 };
        break;
      }
      default: {
        throw new RangeError("invalid variant discriminant for expected");
      }
    }
    return variant5;
  }
}

module.exports = { Imports };
