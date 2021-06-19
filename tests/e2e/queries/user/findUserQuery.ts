export const findOneUserQuery = `
query findUser {
  findUser(id: "1") {
    id
    tag
    ribbons
  }
}
`;

export const findOneUserQueryResult = JSON.parse(`
{
  "data": {
    "findUser": {
      "id": "1",
      "tag": "saber#1",
      "ribbons": 1
    }
  }
}
`);

export const findOneNotExistUserQuery = `
query findOne {
  findUser(id: "does-not-exist") {
    id
    tag
    ribbons
  }
}
`;
