import * as React from 'react'
import Section from "../../components/section"

class MainScreen extends React.PureComponent {
    render() {
      return (
          <Section
            flexDirection="column"
            style={{
              padding: "30px"
            }}
            alignItems="center"
          >
          HELLO WORLD!
            
          </Section>
      )
    }
  }

  export default MainScreen