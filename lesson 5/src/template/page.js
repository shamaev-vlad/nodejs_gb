  const getPageTemplate = (children) => {
    return `
      <html lang='en'>
        <head>
          <meta charset="UTF-8">
          <title>FileExplorer</title>
          <style>    
            form {
              margin: 0 auto;
            }  
            input {
              display: block;
            }
            ul {
              list-style-type: none;
            }
            li {
              font-size: 1.2rem;
            }
          </style>
        </head>
        <body>
          <div>
            ${children}
          </div>
        </body>    
      </html>
    `;
  };
  
  module.exports = {
    getPageTemplate
  }