const htmlmin = require('html-minifier-terser');
const Image = require('@11ty/eleventy-img');

const imageShortcode = async (src, alt, pathPrefix = '', widths = [400]) => {
   let metadata = await Image(src, {
      widths: widths,
      formats: ["webp", "jpeg"],
      outputDir: 'public/images',
      urlPath: `${pathPrefix}images/`,
      cacheOptions: {
         duration: '1d',
      },
      sharpWebpOptions: {
         quality: 50,
      },
      sharpJpegOptions: {
         quality: 70,
      }
   });

   return Image.generateHTML(metadata, {
      alt,
      sizes: '100vw',
      loading: 'lazy',
      decoding: 'async',
   });
}

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

   // images
   eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

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
