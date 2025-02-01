export abstract class LivekitRepositoryFailure extends Error {
  constructor(protected error: unknown) {
    super();
  }

  equals(other: unknown): boolean {
    if (!(other instanceof LivekitRepositoryFailure)) {
      return false;
    }
    return this.error === other.error;
  }
}

export class GenerateAccessTokenFailure extends LivekitRepositoryFailure {
  constructor(error: unknown) {
    super(error);
  }
}

export class CreateRoomFailure extends LivekitRepositoryFailure {
  constructor(error: unknown) {
    super(error);
  }
}
