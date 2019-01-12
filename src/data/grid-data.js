const DEFAULT = [
  {
    title: '1. Lorem ipsum dolor sit amet, consectetur',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
    tags: [
      {tag: 'user-experience', name: 'User Experience'}
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
      {tag: 'accessibility', name: 'Accessibility'}
    ],
    date: "2017",
    selected: false
  },
  {
    title: '3. Duis libero mi, tempor nec tempor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
    tags: [
      {tag: 'user-experience', name: 'User Experience'}
    ],
    date: "2017",
    selected: false
  },
  {
    title: '4. Ministry of Foreign Affairs & Trade',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
    tags: [
      {tag: 'user-experience', name: 'User Experience'},
      {tag: 'user-interface-design', name: 'User Interface Design'},
      {tag: 'front-end-development', name: 'Front End Development'},
      {tag: 'production-management', name: 'Production Management'},
      {tag: 'technical-consultation', name: 'Technical Consultation'}
    ],
    date: "2017",
    selected: false
  },
  {
    title: '5. Sed rutrum purus eros, eu pretium',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {tag: 'user-interface-design', name: 'User Interface Design'},
      {tag: 'front-end-development', name: 'Front End Development'}
    ],
    date: "2016",
    selected: false
  },
  {
    title: '6. Suspendisse sit amet libero vitae dolor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {tag: 'front-end-development', name: 'Front End Development'}
    ],
    date: "2015",
    selected: false
  },
  {
    title: '7. Sit amet libero Suspendisse vitae dolor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {tag: 'production-management', name: 'Production Management'}
    ],
    date: "2014",
    selected: false
  },
  {
    title: '8. Praesent elit mauris libero vitae dolor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {tag: 'technical-consultation', name: 'Technical Consultation'},
      {tag: 'user-interface-design', name: 'User Interface Design'},
      {tag: 'production-management', name: 'Production Management'}
    ],
    date: "2013",
    selected: false
  },
  {
    title: '9. Bibendum et ex eget, sodales tincidunt leo',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {tag: 'user-experience', name: 'User Experience'},
      {tag: 'front-end-development', name: 'Front End Development'}
    ],
    date: "2018",
    selected: false
  },
  {
    title: '10. Suspendisse sit amet libero vitae dolor',
    blurb: 'Quisque orci nisi, bibendum et ex eget...',
    body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
    tags: [
      {tag: 'team-leadership', name: 'Team Leadership'},
      {tag: 'production-management', name: 'Production Management'}
    ],
    date: "2015",
    selected: false
  }
]

// Value is replaced by output from `npm run harvest_wiki_data`
const imported = [{"title":"Ministry of Foreign Affairs and Trade","blurb":"Creating easy to use learning interfaces and tools to improve investment decisions.","body":"Testing a [link](google.com) now.\n\n### Also testing a level 3 heading\nWhat do we get under a heading?\n\n* one\n* two\n* three\n\n> Dave was well behaved and studiously completed his brief.","tags":[{"tag":"front-end-development","name":"Front End Development"},{"tag":"user-experience","name":"User Experience"},{"tag":"user-interface-design","name":"User Interface Design"},{"tag":"production-management","name":"Production Management"},{"tag":"art-direction","name":"Art Direction"}],"date":"2018"},{"title":"Totara Learning Solutions","blurb":"Improving and maintaining two enterprise Open Source learning platforms.","body":"![stdlib test image](https://vuejs.org/images/stdlib.png)\n\n### Also testing a level 3 heading\nWhat do we get under a heading?\n\n* one\n* two\n* three\n\n> Dave collaborated well and introduced many improvements to our products.","tags":[{"tag":"front-end-development","name":"Front End Development"},{"tag":"user-experience","name":"User Experience"},{"tag":"user-interface-design","name":"User Interface Design"}],"date":"2018"}]

export default (imported.length) ? imported : DEFAULT
