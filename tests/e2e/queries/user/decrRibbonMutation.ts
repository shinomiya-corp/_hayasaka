export const decrRibbonMutation = `
mutation decrRibbon {
  decrRibbon(decrRibbonInput: {id: "1", tag: "saber#1", decrement: 1}) {
    id
    tag
    ribbons
  }
}
`;

export const decrRibbonMutationResult = JSON.parse(`
{
  "data": {
    "decrRibbon": {
      "id": "1",
      "tag": "saber#1",
      "ribbons": 0
    }
  }
}
`);

export const decrRibbonNonUserMutation = `
mutation decrRibbon {
  decrRibbon(decrRibbonInput: {id: "3", tag: "pepe#3", decrement: 1}) {
    id
    tag
    ribbons
  }
}
`;
