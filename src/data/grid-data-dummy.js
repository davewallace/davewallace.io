const DEFAULT = [
    {
      title: '1. Lorem ipsum dolor sit amet, consectetur',
      blurb: 'Quisque orci nisi, bibendum et ex eget...',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis dui egestas, auctor erat at, aliquam massa. Integer libero ex, sollicitudin at leo euismod, semper fringilla purus. Ut tincidunt ex sit amet dictum pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim lorem ornare, fringilla arcu eget, commodo diam. Nunc mauris ante, condimentum et pellentesque ac, faucibus vitae magna. Ut laoreet aliquet massa a tristique. Quisque ullamcorper porttitor tortor, sit amet accumsan erat porta sit amet. Nam eu libero in diam laoreet luctus. Vestibulum vitae felis consectetur, imperdiet purus quis, cursus lorem. Praesent pharetra magna id quam tempus sagittis.

Phasellus ullamcorper, urna in gravida condimentum, erat nunc laoreet odio, non congue libero libero quis tortor. Vivamus eget porttitor mi, at lacinia lectus. Sed vehicula vulputate placerat. Etiam ut mauris non orci fringilla facilisis ac sit amet sem. Nullam id elit ac erat dignissim hendrerit. Aenean sollicitudin vel leo eu vestibulum. Pellentesque consequat ante id sapien elementum ullamcorper. Sed a laoreet dolor, vel rutrum nisl. Vestibulum tincidunt posuere nisi, non mollis ligula volutpat posuere. Sed a odio ex. Mauris tempor facilisis tempus.

Donec vel est ac orci convallis pharetra et sed ipsum. Maecenas suscipit volutpat ligula ac tempor. Cras efficitur, arcu quis euismod tristique, nulla lectus feugiat metus, vel ultrices tortor mauris non erat. Curabitur posuere at felis nec ultricies. Nulla eu dignissim diam, eu ultrices quam. Duis iaculis posuere erat, non maximus arcu congue eget. Donec egestas dictum augue id feugiat. Ut sed elit nec sapien euismod luctus. Pellentesque hendrerit sed metus ut suscipit. Nunc vitae scelerisque ante, vel varius ipsum. Etiam tempus enim id nulla ullamcorper, id finibus lacus tempor. Proin in justo magna. Aliquam ultricies lacus a diam rutrum convallis.

Vivamus gravida consectetur ipsum. Praesent porta ac diam quis accumsan. Quisque vel volutpat mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet sapien in tincidunt faucibus. Quisque venenatis neque sed quam rhoncus bibendum. Etiam id nisi blandit ligula blandit hendrerit. Nunc faucibus metus non mauris posuere, ut pharetra augue fermentum.`,
      tags: [
        {id: 'user-experience', value: 'UX'}
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
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis dui egestas, auctor erat at, aliquam massa. Integer libero ex, sollicitudin at leo euismod, semper fringilla purus. Ut tincidunt ex sit amet dictum pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim lorem ornare, fringilla arcu eget, commodo diam. Nunc mauris ante, condimentum et pellentesque ac, faucibus vitae magna. Ut laoreet aliquet massa a tristique. Quisque ullamcorper porttitor tortor, sit amet accumsan erat porta sit amet. Nam eu libero in diam laoreet luctus. Vestibulum vitae felis consectetur, imperdiet purus quis, cursus lorem. Praesent pharetra magna id quam tempus sagittis.

Phasellus ullamcorper, urna in gravida condimentum, erat nunc laoreet odio, non congue libero libero quis tortor. Vivamus eget porttitor mi, at lacinia lectus. Sed vehicula vulputate placerat. Etiam ut mauris non orci fringilla facilisis ac sit amet sem. Nullam id elit ac erat dignissim hendrerit. Aenean sollicitudin vel leo eu vestibulum. Pellentesque consequat ante id sapien elementum ullamcorper. Sed a laoreet dolor, vel rutrum nisl. Vestibulum tincidunt posuere nisi, non mollis ligula volutpat posuere. Sed a odio ex. Mauris tempor facilisis tempus.

Donec vel est ac orci convallis pharetra et sed ipsum. Maecenas suscipit volutpat ligula ac tempor. Cras efficitur, arcu quis euismod tristique, nulla lectus feugiat metus, vel ultrices tortor mauris non erat. Curabitur posuere at felis nec ultricies. Nulla eu dignissim diam, eu ultrices quam. Duis iaculis posuere erat, non maximus arcu congue eget. Donec egestas dictum augue id feugiat. Ut sed elit nec sapien euismod luctus. Pellentesque hendrerit sed metus ut suscipit. Nunc vitae scelerisque ante, vel varius ipsum. Etiam tempus enim id nulla ullamcorper, id finibus lacus tempor. Proin in justo magna. Aliquam ultricies lacus a diam rutrum convallis.

Vivamus gravida consectetur ipsum. Praesent porta ac diam quis accumsan. Quisque vel volutpat mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet sapien in tincidunt faucibus. Quisque venenatis neque sed quam rhoncus bibendum. Etiam id nisi blandit ligula blandit hendrerit. Nunc faucibus metus non mauris posuere, ut pharetra augue fermentum.`,
      tags: [
        {id: 'accessibility', value: 'Accessibility'}
      ],
      date: "2017",
      selected: false
    },
    {
      title: '3. Duis libero mi, tempor nec tempor',
      blurb: 'Quisque orci nisi, bibendum et ex eget...',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis dui egestas, auctor erat at, aliquam massa. Integer libero ex, sollicitudin at leo euismod, semper fringilla purus. Ut tincidunt ex sit amet dictum pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim lorem ornare, fringilla arcu eget, commodo diam. Nunc mauris ante, condimentum et pellentesque ac, faucibus vitae magna. Ut laoreet aliquet massa a tristique. Quisque ullamcorper porttitor tortor, sit amet accumsan erat porta sit amet. Nam eu libero in diam laoreet luctus. Vestibulum vitae felis consectetur, imperdiet purus quis, cursus lorem. Praesent pharetra magna id quam tempus sagittis.

Phasellus ullamcorper, urna in gravida condimentum, erat nunc laoreet odio, non congue libero libero quis tortor. Vivamus eget porttitor mi, at lacinia lectus. Sed vehicula vulputate placerat. Etiam ut mauris non orci fringilla facilisis ac sit amet sem. Nullam id elit ac erat dignissim hendrerit. Aenean sollicitudin vel leo eu vestibulum. Pellentesque consequat ante id sapien elementum ullamcorper. Sed a laoreet dolor, vel rutrum nisl. Vestibulum tincidunt posuere nisi, non mollis ligula volutpat posuere. Sed a odio ex. Mauris tempor facilisis tempus.

Donec vel est ac orci convallis pharetra et sed ipsum. Maecenas suscipit volutpat ligula ac tempor. Cras efficitur, arcu quis euismod tristique, nulla lectus feugiat metus, vel ultrices tortor mauris non erat. Curabitur posuere at felis nec ultricies. Nulla eu dignissim diam, eu ultrices quam. Duis iaculis posuere erat, non maximus arcu congue eget. Donec egestas dictum augue id feugiat. Ut sed elit nec sapien euismod luctus. Pellentesque hendrerit sed metus ut suscipit. Nunc vitae scelerisque ante, vel varius ipsum. Etiam tempus enim id nulla ullamcorper, id finibus lacus tempor. Proin in justo magna. Aliquam ultricies lacus a diam rutrum convallis.

Vivamus gravida consectetur ipsum. Praesent porta ac diam quis accumsan. Quisque vel volutpat mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet sapien in tincidunt faucibus. Quisque venenatis neque sed quam rhoncus bibendum. Etiam id nisi blandit ligula blandit hendrerit. Nunc faucibus metus non mauris posuere, ut pharetra augue fermentum.`,
      tags: [
        {id: 'user-experience', value: 'UX'}
      ],
      date: "2017",
      selected: false
    },
    {
      title: '4. Ministry of Foreign Affairs & Trade',
      blurb: 'Quisque orci nisi, bibendum et ex eget...',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis dui egestas, auctor erat at, aliquam massa. Integer libero ex, sollicitudin at leo euismod, semper fringilla purus. Ut tincidunt ex sit amet dictum pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim lorem ornare, fringilla arcu eget, commodo diam. Nunc mauris ante, condimentum et pellentesque ac, faucibus vitae magna. Ut laoreet aliquet massa a tristique. Quisque ullamcorper porttitor tortor, sit amet accumsan erat porta sit amet. Nam eu libero in diam laoreet luctus. Vestibulum vitae felis consectetur, imperdiet purus quis, cursus lorem. Praesent pharetra magna id quam tempus sagittis.

Phasellus ullamcorper, urna in gravida condimentum, erat nunc laoreet odio, non congue libero libero quis tortor. Vivamus eget porttitor mi, at lacinia lectus. Sed vehicula vulputate placerat. Etiam ut mauris non orci fringilla facilisis ac sit amet sem. Nullam id elit ac erat dignissim hendrerit. Aenean sollicitudin vel leo eu vestibulum. Pellentesque consequat ante id sapien elementum ullamcorper. Sed a laoreet dolor, vel rutrum nisl. Vestibulum tincidunt posuere nisi, non mollis ligula volutpat posuere. Sed a odio ex. Mauris tempor facilisis tempus.

Donec vel est ac orci convallis pharetra et sed ipsum. Maecenas suscipit volutpat ligula ac tempor. Cras efficitur, arcu quis euismod tristique, nulla lectus feugiat metus, vel ultrices tortor mauris non erat. Curabitur posuere at felis nec ultricies. Nulla eu dignissim diam, eu ultrices quam. Duis iaculis posuere erat, non maximus arcu congue eget. Donec egestas dictum augue id feugiat. Ut sed elit nec sapien euismod luctus. Pellentesque hendrerit sed metus ut suscipit. Nunc vitae scelerisque ante, vel varius ipsum. Etiam tempus enim id nulla ullamcorper, id finibus lacus tempor. Proin in justo magna. Aliquam ultricies lacus a diam rutrum convallis.

Vivamus gravida consectetur ipsum. Praesent porta ac diam quis accumsan. Quisque vel volutpat mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet sapien in tincidunt faucibus. Quisque venenatis neque sed quam rhoncus bibendum. Etiam id nisi blandit ligula blandit hendrerit. Nunc faucibus metus non mauris posuere, ut pharetra augue fermentum.`,
      tags: [
        {id: 'user-experience', value: 'UX'},
        {id: 'user-interface-design', value: 'UI Design'},
        {id: 'front-end-development', value: 'Front-end Dev'},
        {id: 'production-management', value: 'Production Management'},
        {id: 'technical-consultation', value: 'Tech Consultation'}
      ],
      date: "2017",
      selected: false
    },
    {
      title: '5. Sed rutrum purus eros, eu pretium',
      blurb: 'Quisque orci nisi, bibendum et ex eget...',
      body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
      tags: [
        {id: 'user-interface-design', value: 'UI Design'},
        {id: 'front-end-development', value: 'Front-end Dev'}
      ],
      date: "2016",
      selected: false
    },
    {
      title: '6. Suspendisse sit amet libero vitae dolor',
      blurb: 'Quisque orci nisi, bibendum et ex eget...',
      body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
      tags: [
        {id: 'front-end-development', value: 'Front-end Dev'}
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
        {id: 'technical-consultation', value: 'Tech Consultation'},
        {id: 'user-interface-design', value: 'UI Design'},
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
        {id: 'user-experience', value: 'UX'},
        {id: 'front-end-development', value: 'Front-end Dev'}
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
  export default DEFAULT
