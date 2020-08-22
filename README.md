# jsonshed API

> Jsonshed is a RESTful API containing sample data for testing and prototyping. It&#39;s built in Node.JS, TypeScript and hosted on Google Firebase.

## Table of Contents

- [Usage](#Usage)
- [Features](#features)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

## Usage

```javascript
fetch("api.jsonshed.com/users/1")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## Features

#### api/users

```json
{
  "id": "1",
  "firstName": "Claudia",
  "lastName": "Murazik",
  "email": "Arno53@yahoo.com",
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/overra/128.jpg",
  "address": {
    "street": "Hilll Forks",
    "city": "West Aylinton",
    "zipCode": "68999-7839",
    "country": "Isle of Man"
  },
  "jobTitle": "Lead Accountability Specialist"
}
```

#### api/todos

```json
{
  "userId": "7",
  "id": "1",
  "title": "quo provident culpa",
  "completed": true
}
```

#### api/posts

```json
{
  "userId": "2",
  "id": "1",
  "title": "et deleniti sit",
  "body": "Consequuntur tenetur est omnis aut dolorum cupiditate id et. Et dolores eveniet ratione commodi blanditiis ut qui. Sunt dolores qui rerum sit."
}
```

## Contributing

### Step 1

- **Option 1**

  - 🍴 Fork this repo!

- **Option 2**
  - 👊 Clone this repo to your local machine using `https://github.com/FranciscoMCG/jsonshed-api-firebase.git`

### Step 2

- 🔨 Write code you feel is going to add something to the project

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/FranciscoMCG/jsonshed-api-firebase/compare" target="_blank">`https://github.com/FranciscoMCG/jsonshed-api-firebase/compare`</a>.

## Documentation

<a href="https://www.jsonshed.com" target="_blank">`https://www.jsonshed.com`</a>

## License

- Copyright 2020 © <a href="https://github.com/FranciscoMCG" target="_blank">Francisco Gomes</a>
