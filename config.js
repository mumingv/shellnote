var CONFIG = {
  // your website's title
  document_title: "Linux Shell 编程入门",

  // index page
  index: "README.md",

  // sidebar file
  sidebar_file: "sidebar.md",

  // where the docs are actually stored on github - so you can edit
  //base_url: "https://github.com/mumingv/shelltutorial/edit/gh-pages",
  base_url: "https://github.com/mumingv/shelltutorial/blob/master",
};

// **************************
// DON'T EDIT FOLLOWING CODES
// **************************

addConfig(ditto, CONFIG);

function addConfig(obj, conf) {
  Object.keys(conf).forEach(function (key) {
    obj[key] = conf[key];
  });
}

