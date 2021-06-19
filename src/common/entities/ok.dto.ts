import { GraphQLScalarType } from 'graphql';

export const Ok = new GraphQLScalarType({
  name: 'Ok',
  description: "Nothing of interest, but everything's alright.",
  serialize() {
    return null;
  },
  parseValue() {
    return null;
  },
  parseLiteral() {
    return null;
  },
});
