const htmlmin = require('html-minifier-terser');

const minifyHtmlTransform = (content, outputPath) => {
   if(outputPath && outputPath.endsWith('.html')) {
      return htmlmin.minify(content,  {
         // オプション参考: https://github.com/terser/html-minifier-terser#options-quick-reference
         useShortDoctype: true,
         removeComments: true,
         collapseWhitespace: true,
         minifyCSS: true,
         minifyJS: true,
         maxLineLength: 1000
      });
   }

   return content;
}

module.exports = function(eleventyConfig) {
   // static assets
   eleventyConfig.addPassthroughCopy('src/images');

   // minify
   eleventyConfig.addTransform('minify html', minifyHtmlTransform);

   return {
      dir: {
         input: "src",
         output: "public",
      },
      htmlTemplateEngine: "njk",
   }
};
