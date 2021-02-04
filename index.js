const repl = require("repl");
const fs = require("fs");

const replReader = () => {
  repl.start('> ').defineCommand('generate')
}

class CompFileCfg {
  constructor(name, filename, type, hooks, otherDeps, props) {
    this.name = name
    this.filename = filename,
    this.type = type,
    this.hooks = hooks,
    this.otherDeps = otherDeps,
    this.props = props
  }
};

const cfile = 
  new CompFileCfg(
    'MyComponent', 
    `${__dirname}/components/${this.name}.js`,
    'function',
    ['useState'],
    [],
    true
  )

const compFileConfig = {
  //get this from the repl user
  name: 'MyComponent',
  filename: `${__dirname}/components/${this.name}.js`,
  type: "function", //function || class
  hooks: ["useState", "useEffect"], //if functional component, array of react hooks
  otherDeps: [],
  props: true
};

const configureComponent = (config) => {
  let importData = {};
  let { type, hooks, otherDeps, props } = config;

  //check if the hooks are valid react hooks
  if (hooks) {
    hooks.map((el) => {
      if (el.includes("use")) {
        return true;
      } else {
        return console.error("an invalid hook was found");
      }
    });
  }
  //check if the type was entered
  if (!type) {
    return console.error("cannot create a component")
  }
  //if type exists, set importData['type'] to name in config
  if(type == 'function') {
    importData['fileData']= `import React from 'react';
    
    export const MyComponent = (${props ? 'props' : ''}) => {
    return <div> </div>
    };`
  }

  return importData.fileData;
};

let data = configureComponent(compFileConfig);

const componentGenerator = (configComp) => {
  let componentDirExists = fs.existsSync(`${__dirname}/components`);

  if (componentDirExists) {
    return fs.writeFile('MyComponent', configComp, (err) => {
      if (err) console.log(err);
    });
  }
};

componentGenerator(data);

