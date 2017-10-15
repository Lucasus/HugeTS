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

range(10)
  .map(n => new Module(`test${n}`))
  .forEach(module => fs.writeFileSync(`build/${module.name}.ts`, module.emit()));
