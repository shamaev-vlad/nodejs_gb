const fs = require("fs");

const pathValidator = (input) =>
  fs.existsSync(input) ? "" : "Please check file path";
const isFile = (path) => fs.lstatSync(path).isFile();
const isDirectory = (path) => fs.lstatSync(path).isDirectory();
const getFolderList = (path) => fs.readdirSync(path);

const isRootFolder = (str) => str === "/";
const getPathOption = (path, label) => ({ path, label });

module.exports = {
  pathValidator,
  isFile,
  isDirectory,
  getFolderList,
  isRootFolder,
  getPathOption,
};