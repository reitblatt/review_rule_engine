import './App.css';
import ReviewRule from './rules_ui/RulesList';
import { useQuery } from '@apollo/client'
import { graphql } from '../src/gql'


const allReviewRulesQueryDocument = graphql(/* GraphQL */ `
  query allReviewRulesQuery {
    rules {
      id      
      ...ReviewRuleItem  
    }
  }
`)

function App() {
  const { data } = useQuery(allReviewRulesQueryDocument)
  return (
    <div className="App">
      {data && <ul>{data.rules?.map(e => e && <ReviewRule rule={e} key={e.id} />)}</ul>}
    </div>
  )
}

export default App;
