import React, { useState, useEffect} from 'react';
import {
  AppLayout,
  BreadcrumbGroup,
  Header,
  Container,
  ContentLayout,
  Link,
  SideNavigation,
  Flashbar,
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import Scoreboard from './Scoreboard';

const LOCALE = 'en';


  export default function MyComponent() {

    const [players, setPlayers] = useState([])
    const [items, setItems] = React.useState([
      {
        type: "success",
        dismissible: true,
        dismissLabel: "Dismiss message",
        onDismiss: () => setItems([]),
        content: (
          < >
            This is an info flash message. It contains{" "}
            <Link color="inverted">
              a link to another page
            </Link>
            .
          </>
        ),
        id: "message_1"
      }
    ]);

    useEffect(() => {
        const getPlayers = async () => {
            let res = await fetch('http://localhost:5000/api')
            let data = await res.json()
            setPlayers(data)
        }

        getPlayers()
    }, [])

  console.log(players)

  const arr = players.map((_, idx) => {
      return ( 
          {
          type: 'link', text: players[idx].name, info: players[idx].points
          }
      )
  })

  console.log(arr)


  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <AppLayout
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Home', href: '#' },
              { type: 'link', text: 'Tennis Table League Scoresheet' }
            ]}
          />
        }
        navigationOpen={true}
        navigation={
          <SideNavigation
            header={{
              href: '#',
              text: 'Players',
            }}
            items={arr}
          />
        }
        notifications={
          <Flashbar
            items={items}
          />
        }
        content={
          <ContentLayout
        
          >
            <Container
              header={
                <Header variant="h2">
                  <Scoreboard /> 
                </Header>
              }
            >
            </Container>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}
