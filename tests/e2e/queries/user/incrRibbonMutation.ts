export const incrRibbonMutation = `
mutation incrRibbon {
  incrRibbon(incrRibbonInput: { id: "1", tag: "saber#1", increment: 1 }) {
    id
    tag
    ribbons
  }
}
`;

export const incrRibbonMutationResult = JSON.parse(`
{
  "data": {
    "incrRibbon": {
      "id": "1",
      "tag": "saber#1",
      "ribbons": 2
    }
  }
}
`);

export const incrRibbonNewUserMutation = `
mutation incrRibbon {
  incrRibbon(incrRibbonInput: { id: "3", tag: "pepe#3", increment: 1 }) {
    id
    tag
    ribbons
  }
}
`;

export const incrRibbonNewUserMutationResult = JSON.parse(`
{
  "data": {
    "incrRibbon": {
      "id": "3",
      "tag": "pepe#3",
      "ribbons": 1
    }
  }
}
`);
