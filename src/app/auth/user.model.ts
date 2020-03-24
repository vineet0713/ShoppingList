export class User {
	constructor(
		public email: string,
		public id: string,
		private _token: string,
		private _tokenExpirationDate: Date
	) {}

	get token() {
		const currentDate = new Date();
		if (!this._tokenExpirationDate || currentDate > this._tokenExpirationDate) {
			// If the expiration date doesn't exist or has expired, then return null
			return null;
		}
		return this._token;
	}
}