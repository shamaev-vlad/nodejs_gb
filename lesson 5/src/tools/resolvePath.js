const { getMainTemplate } = require('../template/main')
const { isFile, isDirectory, pathValidator } = require('./')
const { fileReader } = require('./fileReader')

const resolvePath = async (url, res) => {
  const error = await pathValidator(url);
  const newUrl = error ? '/' : url;
  if (isDirectory(newUrl)) {
    await getMainTemplate(url, res);
    return;
  }
  if (isFile(url)) {
    fileReader(url, res);
    return;
  }

  throw new Error("Unhandled error: Unrecognized path type");
};

module.exports = {
  resolvePath
}