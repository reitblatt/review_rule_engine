import { FragmentType, useFragment } from '../gql/fragment-masking'
import { graphql } from '../gql'
import Table from 'react-bootstrap/Table'
import { useQuery } from '@apollo/client'


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

// const ReviewRule = (props: {
//     rule: FragmentType<typeof ReviewRuleFragment>
// }) => {
//     const rule = useFragment(ReviewRuleFragment, props.rule)
//     return (
//         <div>
//             <h3>{rule.id}</h3>
//         </div>
//     )
// }

const allReviewRulesQueryDocument = graphql(/* GraphQL */ `
  query allReviewRulesQuery {
    rules {
      id
      trigger {
        triggerName
      }      
      ...ReviewRuleItem  
    }
  }
`)


const ReviewRuleTable = (props: {}) => {
    const { data } = useQuery(allReviewRulesQueryDocument)
    const rules = data?.rules;
    if (rules == null) {
        return <div>No rules found</div>;
    }
    return (<Table striped bordered hover>
        <thead>
            <tr>
                <th>ID</th>
                <th>Trigger</th>
            </tr>
        </thead>
        <tbody>
            {rules.map(e => e && <tr><td>{e.id}</td><td>{e.trigger.triggerName}</td></tr>)}
        </tbody>
    </Table>
    )
}

export default ReviewRuleTable
