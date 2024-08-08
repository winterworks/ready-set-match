import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  pluginReact.configs.flat.recommended,
  {
    ignores:  ["dist/", "node_modules/", "vite.config.ts", "**/*.js"]
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      }
    }
  },
  {
    settings: {
      "react": {
        "version": "detect"
      }
    }
  }
];