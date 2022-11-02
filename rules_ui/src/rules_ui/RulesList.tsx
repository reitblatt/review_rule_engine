import { FragmentType, useFragment } from '../gql/fragment-masking'
import { graphql } from '../gql'

export const ReviewRuleFragment = graphql(/* GraphQL */ `
  fragment ReviewRuleItem on ReviewRule {
    id
    trigger {
        triggerName
    }
    condition {
        property
        value
    }
    effect {
        name
    }
  }
`)

const ReviewRule = (props: {
    rule: FragmentType<typeof ReviewRuleFragment>
}) => {
    const rule = useFragment(ReviewRuleFragment, props.rule)
    return (
        <div>
            <h3>{rule.id}</h3>
        </div>
    )
}

export default ReviewRule
