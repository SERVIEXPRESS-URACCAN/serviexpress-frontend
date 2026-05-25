export interface ConflictError {
  message: string;
  canRestore: boolean;
  id: number;
}

export class CategoryConflictException extends Error {
  constructor(public data: ConflictError) {
    super(data.message);
  }
}