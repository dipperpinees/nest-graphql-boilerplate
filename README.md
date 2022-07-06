<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.ibb.co/jLnn96z/B-2.png" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Blog API using <a href="https://nestjs.com/">NestJS</a>, <a href="https://www.apollographql.com/docs/apollo-server/">Apollo Server</a>, <a href="https://www.prisma.io/">Prisma</a></p>


## <a href="https://blogzzi.herokuapp.com/graphql">Demo</a>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## ENV variables
Fill env variables in `.env` file
```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
SECRET_KEY=
CLD_CLOUD_NAME=
CLD_API_KEY=
CLD_API_SECRET=
PORT=
TOKENEXPIRATION=
```
## Database
This project implements Prisma with PostgreSQL

Migration:
```bash
prisma migrate dev --name init
```

## Functionality overview

**General functionality:**
- Authenticate via JWT and HttpOnly cookie
- CRUD articles, paginate articles
- CRUD comments on articles
- Follow other users
- Upload image to <a href="https://cloudinary.com">Cloudinary storage</a>
- Search articles by Full-text search and filter articles by category, view, lastest,...

## Demo some queries and mutations
Visit https://www.hiepnguyen.site/graphql to demo this

### Sign up
```bash
  SignUp (signUpData: {
    email: "YOUR_EMAIL",
    name: "YOUR_NAME",
    password: "YOUR_PASSWORD
  }) {
    user {
      id
      name
      avatar
    }
    token
  }
```

### Sign in
```bash
  SignIn (signInData: {
    email: "YOUR_EMAIL",
    password: "YOUR_PASSWORD
  }) {
    user {
      id
      name
      avatar
    }
    token
  }
```

### Get article by id
```bash
  query {
    GetPostById(id: POST_ID) {
      id
      title
      content
      thumbnail
      description
      category
      createdAt
      updatedAt
    }
  }
```

### Search & filter articles
```bash
  query {
    FilterPost (filterData: {
      page: 1,
      limit: 10,
      createdAt: DESC or ASC,
      search: "keyword",
      views: DESC or ASC,
    }) {
    docs {
      id
      title
      content
      thumbnail
      description
      category
      createdAt
      updatedAt
    }
  }
}
```
