export const findOneUserQuery = `
query findOne {
  user(id: "1") {
    id
    tag
    ribbons
  }
}
`;

export const findOneUserQueryResult = JSON.parse(`
{
  "data": {
    "user": {
      "id": "1",
      "tag": "saber#1",
      "ribbons": 1
    }
  }
}
`);

export const findOneNotExistUserQuery = `
query findOne {
  user(id: "does-not-exist") {
    id
    tag
    ribbons
  }
}
`;
