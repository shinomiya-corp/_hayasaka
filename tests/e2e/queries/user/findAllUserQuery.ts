export const findAllUserQuery = `
query findAll {
  users {
    id
    tag
    ribbons
  }
}
`;

export const findAllUserQueryResult = JSON.parse(`
{
  "data": {
    "users": [
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
