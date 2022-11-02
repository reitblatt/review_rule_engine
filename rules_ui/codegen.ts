
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  documents: ["src/**/*.tsx", "src/*.tsx"],
  generates: {
    "src/gql/": {
      config: {
        useIndexSignature: true,
        dedupeFragments: true,
        addUnderscoreToArgsType: true
      },
      preset: "client",
      plugins: [],
    }
  }
};

export default config;
