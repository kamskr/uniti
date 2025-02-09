export abstract class LivekitRepositoryFailure extends Error {
  constructor(protected error: unknown) {
    super();
    this.name = "LivekitRepositoryFailure";
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
    this.name = "GenerateAccessTokenFailure";
  }
}

export class CreateRoomFailure extends LivekitRepositoryFailure {
  constructor(error: unknown) {
    super(error);
    this.name = "CreateRoomFailure";
  }
}
