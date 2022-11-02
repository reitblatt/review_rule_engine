/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  rules: Array<ReviewRule>;
};

/** Condition(id, property, value) */
export type ReviewCondition = {
  __typename?: 'ReviewCondition';
  id: Scalars['ID'];
  property: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

/** Effect(id, name) */
export type ReviewEffect = {
  __typename?: 'ReviewEffect';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** ReviewRule(id, trigger, condition, effect, success_count, failure_count) */
export type ReviewRule = {
  __typename?: 'ReviewRule';
  condition: ReviewCondition;
  effect: ReviewEffect;
  failureCount: Scalars['Int'];
  id: Scalars['ID'];
  successCount: Scalars['Int'];
  trigger: ReviewTrigger;
};

/** Trigger(id, trigger_name, sender) */
export type ReviewTrigger = {
  __typename?: 'ReviewTrigger';
  id: Scalars['ID'];
  triggerName: Scalars['String'];
};

export type AllReviewRulesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllReviewRulesQueryQuery = { __typename?: 'Query', rules: Array<(
    { __typename?: 'ReviewRule', id: string, trigger: { __typename?: 'ReviewTrigger', triggerName: string } }
    & { ' $fragmentRefs'?: { 'ReviewRuleItemFragment': ReviewRuleItemFragment } }
  )> };

export type ReviewRuleItemFragment = { __typename?: 'ReviewRule', id: string, trigger: { __typename?: 'ReviewTrigger', triggerName: string }, condition: { __typename?: 'ReviewCondition', property: string, value?: string | null }, effect: { __typename?: 'ReviewEffect', name: string } } & { ' $fragmentName'?: 'ReviewRuleItemFragment' };

export const ReviewRuleItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReviewRuleItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewRule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trigger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triggerName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"condition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"property"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effect"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ReviewRuleItemFragment, unknown>;
export const AllReviewRulesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allReviewRulesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trigger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triggerName"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReviewRuleItem"}}]}}]}},...ReviewRuleItemFragmentDoc.definitions]} as unknown as DocumentNode<AllReviewRulesQueryQuery, AllReviewRulesQueryQueryVariables>;