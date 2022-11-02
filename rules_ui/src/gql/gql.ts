/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query allReviewRulesQuery {\n    rules {\n      id\n      trigger {\n        triggerName\n      }      \n      ...ReviewRuleItem  \n    }\n  }\n": types.AllReviewRulesQueryDocument,
    "\n  fragment ReviewRuleItem on ReviewRule {\n    id\n    trigger {\n        triggerName\n    }\n    condition {\n        property\n        value\n    }\n    effect {\n        name\n    }\n  }\n": types.ReviewRuleItemFragmentDoc,
};

export function graphql(source: "\n  query allReviewRulesQuery {\n    rules {\n      id\n      trigger {\n        triggerName\n      }      \n      ...ReviewRuleItem  \n    }\n  }\n"): (typeof documents)["\n  query allReviewRulesQuery {\n    rules {\n      id\n      trigger {\n        triggerName\n      }      \n      ...ReviewRuleItem  \n    }\n  }\n"];
export function graphql(source: "\n  fragment ReviewRuleItem on ReviewRule {\n    id\n    trigger {\n        triggerName\n    }\n    condition {\n        property\n        value\n    }\n    effect {\n        name\n    }\n  }\n"): (typeof documents)["\n  fragment ReviewRuleItem on ReviewRule {\n    id\n    trigger {\n        triggerName\n    }\n    condition {\n        property\n        value\n    }\n    effect {\n        name\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;