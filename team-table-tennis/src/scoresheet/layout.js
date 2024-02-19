import React from 'react';
import {
  AppLayout,
  BreadcrumbGroup,
  Container,
  Link,
  SideNavigation,
 
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import ContentLayout from "@cloudscape-design/components/header";
import Header from "@cloudscape-design/components/header";
import Scoreboard from './Scoreboard';

const LOCALE = 'en';

export default function () {
  return (
    
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <AppLayout
        breadcrumbs={
          <BreadcrumbGroup
          
            items={[
              { text: 'Home', href: '#' },
              { text: 'Service', href: '#' },
              {type: 'link', text: 'Tennis Table League Scoresheet'}
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

            items={[
              { type: 'link', text: `Blaze`, info:8},
              { type: 'link', text: `Nicole`, info:3},
              { type: 'link', text: `Lunga`, info:2},
              { type: 'link', text: `Matthew`, info:6},
              { type: 'link', text: `Kenan`, info:5},
              { type: 'link', text: `Nomfundo`,info:8},
              { type: 'link', text: `Noluvuyo`,info:6},
              { type: 'link', text: `Bob`,info:12},
              { type: 'link', text: `Joshua`,info:6},
              { type: 'link', text: `Lekeiciah`,info:4},
              { type: 'link', text: `Ethan`,info:3},
              { type: 'link', text: `Jarrod`,info:3},
              { type: 'link', text: `Liam`,info:4},
              { type: 'link', text: `Cole`,info:5},
              { type: 'link', text: `Sivu`,info:5},
              { type: 'link', text: `Sam`, info:2},
              { type: 'link', text: `Sihle`,info:4},
              { type: 'link', text: `Karin`,info:6},
              { type: 'link', text: `Kurt`,info:2}
            ]}
          />
        }
      
      content={
          <ContentLayout
            header={
              <Header variant="h1" info={<Link variant="info">Info</Link>}>
                Page header
              </Header>
            }
          >
            <Container
              header={
                <Header variant="h2">
                  <Scoreboard />
                </Header>
              }
            >
              <div className="contentPlaceholder" />
            </Container>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}