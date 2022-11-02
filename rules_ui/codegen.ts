
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  documents: "src/**/*.gql",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: ['typescript', 'typescript-resolvers'],
    }
  }
};

export default config;
