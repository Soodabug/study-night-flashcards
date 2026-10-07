import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", ".parcel-cache"]),
  {
    files: ["**/*.{js,mjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    // unit tests run in Node with Mocha
    files: ["test/**/*.js"],
    languageOptions: { globals: { ...globals.node, ...globals.mocha } },
  },
  {
    // end-to-end tests: Cypress brings Mocha's describe/it plus its own cy
    files: ["cypress/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
      },
    },
  },
  {
    files: ["gulpfile.js", "cypress.config.js", "eslint.config.mjs"],
    languageOptions: { globals: globals.node },
  },
]);
