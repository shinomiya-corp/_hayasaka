export const createGuildMutation = `
mutation createGuild {
  createGuild(
    createGuildInput: {
      id: "420"
      customPrefix: ";"
      disabledCommands: ["ping"]
    }
  ) {
    id
    customPrefix
    disabledCommands {
      name
    }
  }
}
`;

export const createGuildMutationResult = JSON.parse(`
{
  "data": {
    "createGuild": {
      "id": "420",
      "customPrefix": ";",
      "disabledCommands": [
        {
          "name": "ping"
        }
      ]
    }
  }
}
`);
