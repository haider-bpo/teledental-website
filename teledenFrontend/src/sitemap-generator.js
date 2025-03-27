// require("@babel/register")({
//   presets: ["@babel/preset-env", "@babel/preset-react"],
//   // ignore: [],
// });
require("babel-register")({
  presets: ["es2015", "react"],
  // ignore: [],
});

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://teledental.com/")
    .save("./public/sitemap.xml");
}

generateSitemap();
