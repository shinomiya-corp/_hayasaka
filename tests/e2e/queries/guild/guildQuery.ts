export const guildQuery = `
query guild {
	guild(id: "a") {
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
    "guild": {
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
