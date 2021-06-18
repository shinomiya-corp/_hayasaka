export const createUserMutation = `
mutation createUser {
  createUser(createUserInput: { id: "3", tag: "pepe#3", ribbons: 3 }) {
    id
    tag
    ribbons
  }
}
`;

export const createUserMutationResult = JSON.parse(`
{
  "data": {
    "createUser": {
      "id": "3",
      "tag": "pepe#3",
      "ribbons": 3
    }
  }
}
`);

export const createDupUserMutation = `
mutation createUser {
  createUser(createUserInput: { id: "1", tag: "saber#1", ribbons: 0 }) {
    id
    tag
    ribbons
  }
}
`;
