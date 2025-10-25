export {};

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			isHost?: boolean;
		};
	}
}
