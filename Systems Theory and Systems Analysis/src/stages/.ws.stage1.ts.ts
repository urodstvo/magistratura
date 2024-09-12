
/**
 * GENERATED FILE FROM THE TYPESCRIPT-WORKSHEET EXTENSION
*/

import * as __fs from 'node:fs';
import os from 'node:os';
const dataFile: any[] = [];

async function __tsrun() {
try {

const num_table =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: 'num_table',  called: () => ([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 5, 15, 17, 51, 85, 255, 257, 771],
    [1, 1, 7, 11, 13, 61, 67, 79, 465, 721],
    [1, 3, 7, 5, 7, 43, 49, 147, 439, 1011],
    [1, 1, 5, 3, 15, 51, 125, 141, 177, 759],
    [1, 3, 1, 1, 9, 59, 25, 89, 321, 835],
    [1, 1, 3, 7, 31, 47, 109, 173, 181, 949],
    [1, 3, 3, 9, 9, 57, 43, 43, 225, 113],
    [1, 3, 7, 13, 3, 35, 89, 9, 235, 929],
    [1, 1, 5, 11, 27, 53, 69, 25, 103, 615],
]), line: 3});

} catch(error) {

  
}
}

__tsrun().then()

let ___done_ts_worksheet = "";
___done_ts_worksheet = "asdf";


function stringify(obj: any) {
  let cache: any = [];
  let str = JSON.stringify(obj, function(key, value) {
    if(typeof value === 'function') {
      const fn = __tsGetFn(value.toString()) ?? __tsGetArrowFn(value.toString());
      return fn;
    }
    if(value === undefined) {
      return '__TS_WORKSHEET_UNDEFINED__'
    }
    if (typeof value === "object" && value !== null) {
      if(value?.then) {
        return 'Promise';
      }
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
      return value === undefined ? '__TS_WORKSHEET_UNDEFINED__' : value;
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}



function __tsGetFn(str: string) {
  const noSpaces = str.replaceAll(' ', '');
  const __tsFnWithArgs = /(function.*\(.*\))/
  const result = __tsFnWithArgs.exec(noSpaces);
  if(result?.length) {
    
    const fn = result.at(-1);
    const afterKey = fn.substring('function'.length);
    return 'function ' + afterKey;
  }
  return undefined;
}

function __tsGetArrowFn(str: string) {
  const noSpaces = str.replaceAll(' ', '');
  const __tsArrowWithArgs= /(\({0,1}[A-Za-z]{1}[A-Za-z0-9_,]*\){0,1})=>/;
const __tsArrorWithoutArgs = /\(\){1}=>/;
  const arrowWithArgsResult = __tsArrowWithArgs.exec(noSpaces);
  if(arrowWithArgsResult?.length) {
    const args =  arrowWithArgsResult.at(-1);
    return 'arrow fn(' + args + ')';
  }
  const arrowWithoutArgsResult = __tsArrorWithoutArgs.exec(noSpaces);
  if(arrowWithoutArgsResult?.length) {
    return 'arrow fn()';
  }
  return undefined;
}

function tryToStringify(value: any) {
    let res = '';
    try {
        switch(typeof value) {
            case 'object':
                res = stringify(value);
                break;
            case 'function':
                res = __tsGetFn(value.toString()) ?? __tsGetArrowFn(value.toString());
                break;
            case 'bigint':
                res = value?.toString();
                break;    
            default: 
                // isNaN
                if(value !== value) {
                  res = value?.toString();
                } else {
                  res = value === undefined ? '__TS_WORKSHEET_UNDEFINED__' : value;
                }
        }
    } catch(err: any) {
        return err?.message.startsWith('Convert') ? 'Non displayable' : err?.message;
    }
    return res?.length > 2000 ? res?.substring(0, 2000) : res;
}

function __onError(error: any, dataValue: any) {
  const fixedError = error?.stack ?? error;
  const stringError = JSON.stringify(fixedError, Object.getOwnPropertyNames(fixedError));

  dataValue.type = 'error';
  dataValue.called = [error.message , stringError];
}
function save(hide: boolean, dataValue?: any) {
  if(hide) {
    return;
  }
  const isIpcCompatible = !false && typeof Bun === 'undefined' && !globalThis?.Deno && !os.platform().startsWith('win');
  if(dataValue) {
    dataFile.push(dataValue);
  }

  if(isIpcCompatible) {
    process.send(dataValue);
  }

  if(!dataValue && !isIpcCompatible) {
    __fs.writeFileSync('d:\\SCHOOL\\magistratura\\Systems Theory and Systems Analysis\\src\\stages\\.ws.data.json', JSON.stringify(dataFile));  
  }
}

function tsWorksheetWatch(data: {stringed: string, hide?: boolean, type: string, variable?: string, called: () => any, line: number }) {
  const dataValue = {...data, called: 'Failed Promise. Please use a .catch to display it'};
  let called: any;
  try {
      called = data.called();
  } catch(error) {
      __onError(error, dataValue);
      save(data.hide, dataValue);
      throw error;
  }

  if(data.type === 'throw') {
      __onError(called, dataValue);
      save(data.hide, dataValue);
      throw called;
  }

  if(called?.then) {
     data.called = called.then((r: any) => {
      dataValue.prefix = 'Resolved Promise: ';
        dataValue.called = tryToStringify(r);
         save(data.hide, dataValue);
         return r;
     }).catch((err: any) => {
      dataValue.prefix = 'Rejected Promise: ';
      dataValue.called = tryToStringify(err);
      dataValue.type = 'error';
      save(data.hide, dataValue);
      throw err;
     });
  } else {
      dataValue.called = tryToStringify(called);
      save(data.hide, dataValue);
  }

  return called;
}

function mylog(logFn: any, data: {type: string, called: any[], line: number }) {
    logFn(...data.called);
    data.called = data.called.map(entry => tryToStringify(entry)); 
    save(false, data);
}

if (globalThis?.Deno) {

  addEventListener("error", (event) => {
    event.preventDefault();
  });
  
  addEventListener("unhandledrejection", (e) => {
    e.preventDefault();
  });
  
  addEventListener("unload", () => {
    save(false);
  });
  }
  process?.on('uncaughtException', (error: Error) => {   
  });
  
  process?.on('unhandledRejection', () => {})
  
  process?.on('beforeExit', e => {
    if(typeof Bun !== 'undefined' && dataFile.some(e => e.type === 'error')) {
      process.exit(0);
    }
  })
  
  process?.on('exit', function() {
    save(false);
  });
      
    