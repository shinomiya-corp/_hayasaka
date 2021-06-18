export const updateUserMutation = `
mutation updateUser {
  updateUser(updateUserInput: { id: "1", ribbons: 420 }) {
    id
    tag
    ribbons
  }
}
`;

export const updateUserMutationResult = JSON.parse(`
{
  "data": {
    "updateUser": {
      "id": "1",
      "tag": "saber#1",
      "ribbons": 420
    }
  }
}
`);

export const updateNotExistsUserMutation = `
mutation updateUser {
  updateUser(updateUserInput: { id: "agoodlife", ribbons: 420 }) {
    id
    tag
    ribbons
  }
}
`;

export const updateUserNegativeRibbonsMutation = `
mutation updateUser {
  updateUser(updateUserInput: { id: "1", ribbons: -420 }) {
    id
    tag
    ribbons
  }
}
`;
