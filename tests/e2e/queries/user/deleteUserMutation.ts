export const deleteUserMutation = `
mutation deleteUser {
  deleteUser(id: "1") {
    id
    tag
    ribbons
  }
}
`;

export const deleteUserMutationResult = JSON.parse(`
{
  "data": {
    "deleteUser": {
      "id": "1",
      "tag": "saber#1",
      "ribbons": 1
    }
  }
}
`);

export const deleteNotExistsUserMutation = `
mutation deleteUser {
  deleteUser(id: "does-not-exist") {
    id
    tag
    ribbons
  }
}
`;
