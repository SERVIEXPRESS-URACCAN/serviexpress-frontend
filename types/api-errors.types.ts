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

export class UserConflictException extends Error {
  data: { message: string; canRestore: boolean; id: number }

  constructor(data: { message: string; canRestore: boolean; id: number }) {
    super(data.message)
    this.name = 'UserConflictException'
    this.data = data
  }
}