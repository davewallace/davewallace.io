const DEFAULT = [
  {
    title: '1. Lorem ipsum dolor sit amet, consectetur',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
    tags: [
      {id: 'user-experience', value: 'User Experience'}
    ],
    gallery: [
      {
        'url': 'bnz-low-budget-angled-design-ie8compat_0.png',
        'alt': 'BNZ image 0'
      },
      {
        'url': 'bnz-low-budget-angled-design-ie8compat_1.png',
        'alt': 'BNZ image 1'
      },
      {
        'url': 'bnz-low-budget-angled-design-ie8compat_2.png',
        'alt': 'BNZ image 2'
      }
    ],
    date: "2018",
    selected: false
  },
  {
    title: '2. Convallis dictum faucibus sed',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
    tags: [
      {id: 'accessibility', value: 'Accessibility'}
    ],
    date: "2017",
    selected: false
  },
  {
    title: '3. Duis libero mi, tempor nec tempor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
    tags: [
      {id: 'user-experience', value: 'User Experience'}
    ],
    date: "2017",
    selected: false
  },
  {
    title: '4. Ministry of Foreign Affairs & Trade',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
    tags: [
      {id: 'user-experience', value: 'User Experience'},
      {id: 'user-interface-design', value: 'User Interface Design'},
      {id: 'front-end-development', value: 'Front End Development'},
      {id: 'production-management', value: 'Production Management'},
      {id: 'technical-consultation', value: 'Technical Consultation'}
    ],
    date: "2017",
    selected: false
  },
  {
    title: '5. Sed rutrum purus eros, eu pretium',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {id: 'user-interface-design', value: 'User Interface Design'},
      {id: 'front-end-development', value: 'Front End Development'}
    ],
    date: "2016",
    selected: false
  },
  {
    title: '6. Suspendisse sit amet libero vitae dolor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {id: 'front-end-development', value: 'Front End Development'}
    ],
    date: "2015",
    selected: false
  },
  {
    title: '7. Sit amet libero Suspendisse vitae dolor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {id: 'production-management', value: 'Production Management'}
    ],
    date: "2014",
    selected: false
  },
  {
    title: '8. Praesent elit mauris libero vitae dolor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {id: 'technical-consultation', value: 'Technical Consultation'},
      {id: 'user-interface-design', value: 'User Interface Design'},
      {id: 'production-management', value: 'Production Management'}
    ],
    date: "2013",
    selected: false
  },
  {
    title: '9. Bibendum et ex eget, sodales tincidunt leo',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {id: 'user-experience', value: 'User Experience'},
      {id: 'front-end-development', value: 'Front End Development'}
    ],
    date: "2018",
    selected: false
  },
  {
    title: '10. Suspendisse sit amet libero vitae dolor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {id: 'team-leadership', value: 'Team Leadership'},
      {id: 'production-management', value: 'Production Management'}
    ],
    date: "2015",
    selected: false
  }
]

// Value is replaced by output from `npm run harvest_wiki_data`
//const imported = [{"title":"Ministry of Foreign Affairs and Trade","blurb":"Digital Specialist with a focus on learning and user experience.","body":"I was shoulder-tapped for this role to take a seat in a high visibility programme team within MFAT to drive business change. We installed a new investment decision-making framework for delivering NZ Aid around the globe.\n\nMy deliverables involved architecting and producing a cohesive set of business tools and learning materials to enable staff.\n\n#### Responsibilities\nThe list is long but here's a summary:\n\n* understanding detailed, complex business requirements\n* functional and usability analysis of available technology systems\n* design, build and iterative user testing of 4 web portals\n* functional and usability review of 5 online learning modules\n* drafting and art direction of 6 visual operating model diagrams\n* conducted numerous user interviews, including offshore sessions\n* managed 5 vendors who co-produced some of our products\n* installation oversight and privacy and security analysis of a Salesforce CRM\n\n> Nice work Dave. You are my favourite, again&hellip;\n\n> Nathan Blewitt, Programme Manager","tags":[{"id":"front-end-development","value":"Front End Development"},{"id":"user-experience","value":"User Experience"},{"id":"user-interface-design","value":"User Interface Design"},{"id":"production-management","value":"Production Management"},{"id":"team-leadership","value":"Team Leadership"},{"id":"art-direction","value":"Art Direction"},{"id":"business-analysis","value":"Business Analysis"}],"date":"2019"},{"title":"Totara Learning Solutions","blurb":"Front-end engineer improving and maintaining two enterprise learning platforms.","body":"I took my experience with development, design, user and learning experience and business strategy as a vendor in the digital learning space and applied that as a core member of the design team.\n\nI collaborated with our teams in NZ, UK and US to improve current features, add new ones and drive the usability of our platforms forward. Later in my role I was the front-end lead for the creation of our social learning platform.\n\n#### Responsibilities\nWith this role I was looking to keep my technical skills sharp, this included:\n\n* convert partner-network and end user problems into fit-for-purpose solutions\n* innovate with my knowledge of competitor enterprise platforms (SAP, Saba, etc)\n* connect with our partner network devs to gather data which informed our design decisions\n* produce an MVP component design system using [Pattern Lab](https://patternlab.io)\n* crush countless user and partner-network reported bugs within agreed SLAs\n* refactor major legacy JS/CSS into a JS/SCSS+BEM component architecture, allowing for custom themeing\n* refactor major legacy form-heavy HTML into accessible, semantic prose\n* contribute within complex PHP continuous integration ecosystems\n\n> Dave collaborated well and introduced many improvements to our products.\n\n> Anonymous (true, I promise)","tags":[{"id":"front-end-development","value":"Front End Development"},{"id":"user-experience","value":"User Experience"},{"id":"user-interface-design","value":"User Interface Design"}],"date":"2018"}]
const imported = []

export default (imported.length) ? imported : DEFAULT
