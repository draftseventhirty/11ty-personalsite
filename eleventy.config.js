import * as sass from "npm:sass";

export default function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      return async () => {
        const result = sass.compileString(inputContent, {
          loadPaths: [inputPath.split("/").slice(0, -1).join("/") || "."],
        });
        return result.css;
      };
    },
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
  };
};
