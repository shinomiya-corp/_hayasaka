export const guildQuery = `
query {
	findGuild(id: "a") {
		id
		customPrefix
		disabledCommands {
			name
		}
	}
}
`;

export const guildQueryResult = JSON.parse(`
{
  "data": {
    "findGuild": {
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
