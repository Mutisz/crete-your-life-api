import { GraphQLError } from "graphql";

class ValidationError extends GraphQLError {
  public constructor(id: string) {
    super(`Validation with id '${id}' failed`);
  }
}

export default ValidationError;
