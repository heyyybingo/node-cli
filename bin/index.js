#!/usr/bin/env node
const program = require("commander");
const inquirer = require("inquirer");
const downloadTemplate = require("./template");
const fs = require("fs");
const symbols = require("log-symbols");
const chalk = require("chalk");
const handlebars = require("handlebars");

function startCreatePkg(meta) {
  console.log(meta);
  const fileName = `${meta.name}/package.json`;

  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(fileName, result);
  }
}
function startChooseTemplate() {
  return inquirer
    .prompt([
      {
        name: "type",
        message: "请选择项目类型",
        type: "list",
        choices: ["koa", "nestjs"],
      },
      {
        name: "name",
        message: "请输入项目名称",
        default: "project-name",
      },
      {
        name: "author",
        message: "请输入作者",
        default: "",
      },
      {
        name: "description",
        message: "请输入描述",
        default: "",
      },
    ])
    .then((answers) => {
      return downloadTemplate(answers.type, answers.name).then(() => {
        return startCreatePkg({
          name: answers.name,
          description: answers.description,
          author: answers.author,
        });
      });
    });
}

program
  .version("1.0.0", "-v, --version")
  .command("init")
  .action(() => {
    startChooseTemplate().then(() => {
      console.log(symbols.success, chalk.green("项目初始化完成"));
    });
  });
program.parse(process.argv);
