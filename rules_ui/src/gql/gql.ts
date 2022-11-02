/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query ReviewRuleList {\n  rules {\n    ...ReviewRuleListItem\n  }\n}\n\nfragment ReviewRuleListItem on ReviewRule {\n  id\n  trigger {\n    triggerName\n  }\n  condition {\n    property\n    value\n  }\n  effect {\n    name\n  }\n}": types.ReviewRuleListDocument,
};

export function graphql(source: "query ReviewRuleList {\n  rules {\n    ...ReviewRuleListItem\n  }\n}\n\nfragment ReviewRuleListItem on ReviewRule {\n  id\n  trigger {\n    triggerName\n  }\n  condition {\n    property\n    value\n  }\n  effect {\n    name\n  }\n}"): (typeof documents)["query ReviewRuleList {\n  rules {\n    ...ReviewRuleListItem\n  }\n}\n\nfragment ReviewRuleListItem on ReviewRule {\n  id\n  trigger {\n    triggerName\n  }\n  condition {\n    property\n    value\n  }\n  effect {\n    name\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;