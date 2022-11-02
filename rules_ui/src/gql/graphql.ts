/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
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

export type ReviewRuleListQueryVariables = Exact<{ [key: string]: never; }>;


export type ReviewRuleListQuery = { __typename?: 'Query', rules: Array<(
    { __typename?: 'ReviewRule' }
    & { ' $fragmentRefs'?: { 'ReviewRuleListItemFragment': ReviewRuleListItemFragment } }
  )> };

export type ReviewRuleListItemFragment = { __typename?: 'ReviewRule', id: string, trigger: { __typename?: 'ReviewTrigger', triggerName: string }, condition: { __typename?: 'ReviewCondition', property: string, value?: string | null }, effect: { __typename?: 'ReviewEffect', name: string } } & { ' $fragmentName'?: 'ReviewRuleListItemFragment' };

export const ReviewRuleListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReviewRuleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewRule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trigger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triggerName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"condition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"property"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effect"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ReviewRuleListItemFragment, unknown>;
export const ReviewRuleListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ReviewRuleList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReviewRuleListItem"}}]}}]}},...ReviewRuleListItemFragmentDoc.definitions]} as unknown as DocumentNode<ReviewRuleListQuery, ReviewRuleListQueryVariables>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ReviewCondition: ResolverTypeWrapper<ReviewCondition>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ReviewEffect: ResolverTypeWrapper<ReviewEffect>;
  ReviewRule: ResolverTypeWrapper<ReviewRule>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ReviewTrigger: ResolverTypeWrapper<ReviewTrigger>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ReviewCondition: ReviewCondition;
  ID: Scalars['ID'];
  String: Scalars['String'];
  ReviewEffect: ReviewEffect;
  ReviewRule: ReviewRule;
  Int: Scalars['Int'];
  ReviewTrigger: ReviewTrigger;
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  rules?: Resolver<Array<ResolversTypes['ReviewRule']>, ParentType, ContextType>;
};

export type ReviewConditionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewCondition'] = ResolversParentTypes['ReviewCondition']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  property?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewEffectResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewEffect'] = ResolversParentTypes['ReviewEffect']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewRule'] = ResolversParentTypes['ReviewRule']> = {
  condition?: Resolver<ResolversTypes['ReviewCondition'], ParentType, ContextType>;
  effect?: Resolver<ResolversTypes['ReviewEffect'], ParentType, ContextType>;
  failureCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  successCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trigger?: Resolver<ResolversTypes['ReviewTrigger'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewTriggerResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewTrigger'] = ResolversParentTypes['ReviewTrigger']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  triggerName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  ReviewCondition?: ReviewConditionResolvers<ContextType>;
  ReviewEffect?: ReviewEffectResolvers<ContextType>;
  ReviewRule?: ReviewRuleResolvers<ContextType>;
  ReviewTrigger?: ReviewTriggerResolvers<ContextType>;
};

