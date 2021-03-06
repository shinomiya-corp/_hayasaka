export const disableCommandsMutation = `
mutation disableCommands {
  disableCommands(id: "a", commands: ["ping", "pong"]) {
    id
    customPrefix
    disabledCommands {
      name
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
          "name": "ping"
        },
        {
          "name": "pong"
        }
      ]
    }
  }
}
`);
