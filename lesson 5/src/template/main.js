const { getOptionsListTemplate } = require('./navigation')
const { getFolderElements } = require('../tools/getFolderElements')
const { getErrorTemplate } = require('./error')
const { getPageTemplate } = require("./page");

const getMainTemplate = async (url, res) => {
  const { paths, error } = await getFolderElements(url);
  res.end(
    getPageTemplate(`
      <div style="display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #000;
      background-color: #e4e4e4;
      width: 50%;
      margin: 0 auto;">
        <h1>Проводник</h1>
        <p>Воспользуйтесь приведенным ниже списком, чтобы перейти к файлу или папке. Или введите адрес в адресной строке.</p>
        ${getErrorTemplate(error)} 
        ${getOptionsListTemplate(paths)}
      </div>
    `)
  );
};

module.exports = {
  getMainTemplate,
};