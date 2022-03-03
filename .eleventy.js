module.exports = function(eleventyConfig) {
   return {
      dir: {
         input: "src",
         output: "public",
      },
      templateFormats: ["html", "njk", "md", "11ty.js"],
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk",
   }
};
