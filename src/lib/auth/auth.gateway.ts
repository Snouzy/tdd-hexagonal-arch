export interface AuthGateway {
    getAuthUser(): string;
}

export class FakeAuthGateway implements AuthGateway {
    authUser!: string

    getAuthUser(): string {
        return this.authUser
    }
}

export const authGateway = new FakeAuthGateway();