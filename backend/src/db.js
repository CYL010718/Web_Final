
const authors = [
  { id: "1a4cbbeb-4ab7-4663-9b98-c996d5007da1", 
    email: 'CYL010718@gmail.com', 
    password: '123456', 
    name: 'Mario', 
    group: ['1','2']
  },
  { id: "c82d90d7-0e0c-4700-8ece-b90e1c3014e1",
    email: 'SmallDick@gmail.com', 
    password: '123456', 
    name: 'Robert', 
    group: ['1','2']
  },
  { id: "0a65e730-ec48-448f-a362-dfe36659879b", 
    email: 'poopoo@gmail.com', 
    password: '123456', 
    name: 'MikeWangtc', 
    group: ['1','2','3']
  },
];

const events = [
  { id: "f536ec8e-50fd-4bf9-aab3-38944aaa3acd", 
    authorID: authors[0].id, 
    title: 'Watch Pornhub',
    body: 'At the dorm.', 
    start: new Date(2019, 5, 13, 0, 0).toString(),
    end: new Date(2019, 5, 13, 2, 0).toString(),
  },
  { id: "798385d0-6654-44a8-81a3-73eb81456ea0", 
    authorID: authors[0].id, 
    title: 'Eat Breakfast',
    body: '', 
    start: new Date(2019, 5, 8, 6, 0).toString(),
    end: new Date(2019, 5, 8, 7, 0).toString(),
  },
  { id: "da8ca60e-02ce-41e1-9667-e61058f73ba5", 
    authorID: authors[0].id, 
    title: 'Go Dating',
    body: 'HaHa, a joke', 
    start: new Date(2019, 5, 17, 0, 0).toString(),
    end: new Date(2019, 5, 17, 2, 0).toString(),
  },
  {
    id: "0",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 25, 0, 0).toString(),
    end: new Date(2019, 5, 25, 2, 0).toString(),
  },
  {
    id: "1",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 25, 3, 0).toString(),
    end: new Date(2019, 5, 25, 5, 0).toString(),
  },
  {
    id: "2",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 24, 6, 0).toString(),
    end: new Date(2019, 5, 26, 9, 0).toString(),
  },
  {
    id: "3",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 25, 9, 0).toString(),
    end: new Date(2019, 5, 25, 11, 0).toString(),
  },
  {
    id: "4",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 26, 9, 0).toString(),
    end: new Date(2019, 5, 27, 11, 0).toString(),
  },
  {
    id: "5",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 25, 3, 0).toString(),
    end: new Date(2019, 5, 25, 6, 0).toString(),
  },
  {
    id: "6",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 25, 3, 0).toString(),
    end: new Date(2019, 5, 25, 7, 0).toString(),
  },
  {
    id: "7",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 25, 8, 0).toString(),
    end: new Date(2019, 5, 25, 9, 0).toString(),
  },
  {
    id: "8",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 25, 3, 0).toString(),
    end: new Date(2019, 5, 25, 4, 0).toString(),
  },
  {
    id: "9",
    title: 'All Day Event very long title',
    start: new Date(2019, 3, 25, 3, 0).toString(),
    end: new Date(2019, 3, 25, 4, 0).toString(),
  },
  {
    id: "10",
    title: 'All Day Event very long title',
    start: new Date(2019, 4, 29, 3, 0).toString(),
    end: new Date(2019, 4, 30, 4, 0).toString(),
  },
  {
    id: "11",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 1, 3, 0).toString(),
    end: new Date(2019, 6, 1, 4, 0).toString(),
  },
  {
    id: "12",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 1, 3, 0).toString(),
    end: new Date(2019, 5, 7, 8, 0).toString(),
  },
  {
    id: "13",
    title: 'All Day Event very long title',
    start: new Date(2019, 5, 3, 3, 0).toString(),
    end: new Date(2019, 5, 3, 3, 10).toString(),
  },
  {
    id: "14",
    title: 'All Day Event very long title',
    start: new Date(2019, 5,19, 3, 0).toString(),
    end: new Date(2019, 5, 20, 4, 0).toString(),
  },
  {
    id: "15",
    title: 'All Day Event very long title',
    start: new Date(2019, 5,1, 3, 0).toString(),
    end: new Date(2019, 5, 2, 4, 0).toString(),
  },
  {
    id: "16",
    title: 'All Day Event very long title',
    start: new Date(2019, 5,1, 3, 0).toString(),
    end: new Date(2019, 5, 2, 4, 0).toString(),
  },
  {
    id: "17",
    title: 'All Day Event very long title',
    start: new Date(2019, 5,1, 3, 0).toString(),
    end: new Date(2019, 5, 2, 4, 0).toString(),
  },

  // { id: v4(), authorId: authors[2].id, title: 'Launchpad is Cool', body: 'This is another body3.',votes: 7 },
  ];

  const groups = [
    { id: '1',  
      password: '123456', 
      users: ["1a4cbbeb-4ab7-4663-9b98-c996d5007da1","c82d90d7-0e0c-4700-8ece-b90e1c3014e1"],
      events: ["798385d0-6654-44a8-81a3-73eb81456ea0","da8ca60e-02ce-41e1-9667-e61058f73ba5","0","1","4","7","11"],
      name: "Group1", 
      manager:  "c82d90d7-0e0c-4700-8ece-b90e1c3014e1" 
    },
    { id: '2', 
      password: '123456', 
      users: ["1a4cbbeb-4ab7-4663-9b98-c996d5007da1","c82d90d7-0e0c-4700-8ece-b90e1c3014e1","0a65e730-ec48-448f-a362-dfe36659879b"],
      events: ["798385d0-6654-44a8-81a3-73eb81456ea0","da8ca60e-02ce-41e1-9667-e61058f73ba5","f536ec8e-50fd-4bf9-aab3-38944aaa3acd"],
      name: 'Group2',
      manager: "1a4cbbeb-4ab7-4663-9b98-c996d5007da1"
    },
    { id: '3', 
      password: '123456',
      users: ["1a4cbbeb-4ab7-4663-9b98-c996d5007da1"], 
      events: ["f536ec8e-50fd-4bf9-aab3-38944aaa3acd","da8ca60e-02ce-41e1-9667-e61058f73ba5"],
      name: 'Group3',
      manager: "c82d90d7-0e0c-4700-8ece-b90e1c3014e1" 
    },
  ];
const db = {
  authors,
  events,
  groups
}

export { db as default }