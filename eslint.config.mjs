import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx,mjs,cjs}"],
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                window: true,
                document: true,
                localStorage: true,
                console: true,
                setTimeout: true,
                clearInterval: true,
                setInterval: true,
                fetch: true
            }
        },
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off"
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    }
];