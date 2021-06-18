export const disableCommandsMutation = `
mutation disableCommands {
  disableCommands(id: "a", commands: ["ping", "pong"]) {
    id
    customPrefix
    disabledCommands {
      name
      description
    }
  }
}
`;

export const disableCommandsMutationResult = JSON.parse(`
{
  "data": {
    "disableCommands": {
      "id": "a",
      "customPrefix": "!",
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
