export const enableCommandsMutation = `
mutation enableCommands {
  enableCommands(id: "a", commands: ["ping", "pong"]) {
    id
    customPrefix
    disabledCommands {
      name
    }
  }
}
`;

export const enableCommandsMutationResults = JSON.parse(`
{
  "data": {
    "enableCommands": {
      "id": "a",
      "customPrefix": "!",
      "disabledCommands": []
    }
  }
}
`);
