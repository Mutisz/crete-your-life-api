import { GraphQLError } from "graphql";

class ValidationError extends GraphQLError {
  constructor(id: string) {
    super(`Validation with id '${id}' failed`);
  }
}

export default ValidationError;
