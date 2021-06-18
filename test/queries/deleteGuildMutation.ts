export const deleteGuildMutation = `
mutation delete {
  deleteGuild(id: "a") {
    id
    customPrefix
    disabledCommands {
      name
    }
  }
}
`;

export const deleteGuildMutationResult = JSON.parse(`
{
  "data": {
    "deleteGuild": {
      "id": "a",
      "customPrefix": "!",
      "disabledCommands": [
        {
          "name": "ping"
        }
      ]
    }
  }
}
`);
