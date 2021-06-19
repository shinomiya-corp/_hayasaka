export const guildsQuery = `
query findGuilds {
  findGuilds {
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
    "findGuilds": [
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
