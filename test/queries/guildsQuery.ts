export const guildsQuery = `
query guilds {
  guilds {
    id
    customPrefix
		disabledCommands {
			name
		}
  }
}
`;

export const guildsQueryResult = JSON.parse(`
{
  "data": {
    "guilds": [
      {
        "id": "a",
        "customPrefix": "!",
        "disabledCommands": [
          {
            "name": "ping"
          }
        ]
      },
      {
        "id": "b",
        "customPrefix": ";",
        "disabledCommands": [
          {
            "name": "pong"
          }
        ]
      }
    ]
  }
}
`);
