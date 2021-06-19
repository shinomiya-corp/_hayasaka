export const findAllUserQuery = `
query findUsers {
  findUsers {
    id
    tag
    ribbons
  }
}
`;

export const findAllUserQueryResult = JSON.parse(`
{
  "data": {
    "findUsers": [
      {
        "id": "2",
        "tag": "doraemon#2",
        "ribbons": 2
      },
      {
        "id": "1",
        "tag": "saber#1",
        "ribbons": 1
      }
    ]
  }
}
`);

export const findUsersRibbonsAscQuery = `
query {
  findUsers(findUsersInput: { take: 10, sort: { by: ribbons, in: ASC } }) {
    tag
    ribbons
  }
}
`;

export const findUsersRibbonsAscQueryResult = JSON.parse(`
{
  "data": {
    "findUsers": [
      {
        "tag": "saber#1",
        "ribbons": 1
      },
      {
        "tag": "doraemon#2",
        "ribbons": 2
      }
    ]
  }
}
`);

export const findUsersRibbonsDescQuery = `
query {
  findUsers(findUsersInput: { take: 10, sort: { by: ribbons, in: DESC } }) {
    tag
    ribbons
  } 
}
`;

export const findUsersRibbonsDescQueryResult = JSON.parse(`
{
  "data": {
    "findUsers": [
      {
        "tag": "doraemon#2",
        "ribbons": 2
      },
      {
        "tag": "saber#1",
        "ribbons": 1
      }
    ]
  }
}
`);
