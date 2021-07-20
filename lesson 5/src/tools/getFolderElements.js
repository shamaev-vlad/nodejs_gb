const { getSplitPath } = require('./pathSplit')
const { checkAccessError } = require('./accessCheck')
const { isRootFolder } = require('../tools')
const { getPathOption } = require('../tools')
const { getFolderList } = require('../tools')
const { pathValidator } = require('../tools')

const getFolderElements = async (path) => {
  const paths = [];
  const [base, current] = getSplitPath(path);
  const accessError = await checkAccessError(path);
  const error = pathValidator(path);
  if (error || accessError) {
    return {
      paths: getFolderList("/").map((folderOption) =>
        getPathOption(`/${folderOption}`, folderOption)
      ),
      error: error || accessError,
    };
  }

  if (!isRootFolder(path)) {
    paths.push(
      getPathOption(
        `/${isRootFolder(base) ? "" : base}`,
        `.. ${getSplitPath(base)[1] || "/"}`
      )
    );
  }
  const folderOptions = getFolderList(path).map((folderItem) =>
    getPathOption(`${path}${current ? "/" : ""}${folderItem}`, folderItem)
  );

  return {
    paths: [...paths, ...folderOptions],
  };
};

module.exports = {
  getFolderElements
}