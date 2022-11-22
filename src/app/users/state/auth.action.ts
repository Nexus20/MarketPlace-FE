export class Login {
  static readonly type = '[Authentication] Login';

  constructor(public payload: { email: string, password: string }) {}
}
