import * as React from 'react'
import Section from "../../components/section"

class RoomScreen extends React.PureComponent {
    render() {
      return (
          <Section
            flexDirection="column"
            style={{
              padding: "30px"
            }}
            alignItems="center"
          >
          HELLO ROOM!
            
          </Section>
      )
    }
  }

  export default RoomScreen