import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Case studies are prose-heavy; ' and " render correctly in JSX text and
      // escaping them (&apos;, &quot;) only makes the copy harder to edit. Keep
      // the rule for > and }, which are genuine JSX typos.
      "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
