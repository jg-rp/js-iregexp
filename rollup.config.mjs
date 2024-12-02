import { readFileSync } from "fs";
import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" with { type: "json" };
import commonjs from "@rollup/plugin-commonjs";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const name = "iregexp_check";
const license = readFileSync("./LICENSE", { encoding: "utf8" });

const banner = `/*
 * iregexp-check version ${pkg.version}
 * https://github.com/jg-rp/js-iregexp
 * 
 * ${license.split("\n").join("\n * ")}
 */`;

const replaceVersionNumber = {
  delimiters: ["", ""],
  include: "./src/index.ts",
  preventAssignment: true,
  __VERSION__: pkg.version,
};

const nodeBundles = {
  input: "./src/index.ts",
  external: [],
  plugins: [
    replace(replaceVersionNumber),
    // Convert CommonJS modules to ES6
    commonjs(),
    // Allows node_modules resolution
    resolve({ extensions }),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
  ],

  output: [
    {
      file: pkg.main,
      format: "cjs",
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      banner,
    },
  ],
};

const browserBundles = {
  input: "./src/index.ts",
  external: [],
  plugins: [
    replace(replaceVersionNumber),
    // Convert CommonJS modules to ES6
    commonjs(),
    // Allows node_modules resolution
    resolve({ extensions }),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
  ],

  output: [
    {
      file: pkg.browser,
      format: "iife",
      name,
      banner,
    },
    {
      file: pkg["browser-min"],
      format: "iife",
      name,
      plugins: [terser()],
      sourcemap: true,
      banner,
    },
  ],
};

export default [nodeBundles, browserBundles];
