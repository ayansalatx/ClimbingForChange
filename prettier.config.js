/** @type {import("prettier").Config} */
export default {
  semi: false,             // no semicolons
  singleQuote: true,       // use ' instead of "
  tabWidth: 2,             // 2-space indentation
  useTabs: false,          // use spaces instead of tabs
  trailingComma: 'es5',    // add trailing commas where valid in ES5 (objects, arrays, etc.)
  bracketSpacing: true,    // { foo: bar } instead of {foo: bar}
  arrowParens: 'always',   // always include parens in arrow functions
  endOfLine: 'lf',         // Unix-style line endings
}
