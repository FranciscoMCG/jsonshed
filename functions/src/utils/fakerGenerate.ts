const faker = require('faker');
const fs = require('fs');

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomBoolean = () => {
  const random = randomInt(1, 10);
  if (random >= 5) {
    return true;
  } else {
    return false;
  }
};

function generateUsers() {
  let users = [];

  for (let id = 1; id <= 10; id++) {
    users.push({
      id: id.toString(),
      title: faker.name.title(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
      },
      jobTitle: faker.name.jobTitle(),
    });
  }

  let todos = [];

  for (let id = 1; id <= 50; id++) {
    todos.push({
      userId: randomInt(1, 10).toString(),
      id: id.toString(),
      title: faker.lorem.words(),
      completed: randomBoolean(),
    });
  }

  let posts = [];

  for (let id = 1; id <= 50; id++) {
    posts.push({
      userId: randomInt(1, 10).toString(),
      id: id.toString(),
      title: faker.lorem.words(),
      body: faker.lorem.paragraph(),
    });
  }

  let comments = [];

  for (let id = 1; id <= 100; id++) {
    comments.push({
      postId: randomInt(1, 50).toString(),
      id: id.toString(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      body: faker.lorem.paragraph(),
    });
  }

  return { data: { comments } };
}

const dataObj = generateUsers();

fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));
