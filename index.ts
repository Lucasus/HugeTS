import * as fs from 'fs';

const range = (n: number) => Array.apply(null, Array(n)).map((_: number, i: number) => i) as number[];

class Module {
  public name: string;

  constructor(name: string) {
     this.name = name;
  }

  public emit() {
    const functionName = "sampleFunction";
    
    return `export function ${functionName}() { 
  console.log("${functionName}");
}`;
  }
}

const modules = range(5).map(n => new Module(`test${n}`));
modules.forEach(module => fs.writeFileSync(`build/${module.name}.ts`, module.emit()));

const indexModule = `
${modules.map(module => `import * as ${module.name} from './${module.name}'`).join("\n")}

export function writeAll() {
  ${modules.map(module => `  ${module.name}.sampleFunction()`).join("\n")}  
}

`

fs.writeFileSync(`build/index.ts`, indexModule);