export const updateGuildMutation = `
mutation updateGuild {
  updateGuild(
    updateGuildInput: {
      id: "a"
      customPrefix: "!!"
      disabledCommands: ["pong"]
    }
  ) {
    id
    customPrefix
    disabledCommands {
      name
      description
    }
  }
}
`;

export const updateGuildMutationResults = JSON.parse(`
{
  "data": {
    "updateGuild": {
      "id": "a",
      "customPrefix": "!!",
      "disabledCommands": [
        {
          "name": "ping",
          "description": "Ping the bot."
        },
        {
          "name": "pong",
          "description": "Pong the bot."
        }
      ]
    }
  }
}
`);
