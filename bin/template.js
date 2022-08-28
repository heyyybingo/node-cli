const clone = require("git-clone/promise");
const ora = require("ora");
const spinner = ora("正在下载模版......");

function downloadKoa(projectname) {
  return clone("https://github.com/heyyybingo/koa-starter.git", projectname);
}

function downloadDefault() {
  return new Promise((resolve, reject) => {
    throw new Error("该类型暂未支持");
  });
}

module.exports = function downloadTemplate(type, projectname) {
  spinner.start();
  let p = null;

  switch (type) {
    case "koa":
      p = downloadKoa(projectname);
      break;
    default:
      p = downloadDefault();
  }

  return p
    .then(() => {
      spinner.succeed();
    })
    .catch((e) => {
      spinner.fail();
      console.log(e.message);
    });
};
