export const fakeBody = {
  firstName: 'Claudia',
  lastName: 'Murazik',
  email: 'Arno53@yahoo.com',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/overra/128.jpg',
  address: {
    street: 'Hilll Forks',
    city: 'West Aylinton',
    zipCode: '68999-7839',
    country: 'Isle of Man',
  },
  jobTitle: 'Lead Accountability Specialist',
};

export const fakeBodyWithId = {
  ...fakeBody,
  id: '1',
};

export const fakeBodyIncomplete = {
  firstName: 'Cla',
};
