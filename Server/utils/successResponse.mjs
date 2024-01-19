export class SuccessResponse {
  constructor(data = null, code = 200, message = "") {
    this.data = data;
    this.code = code;
    this.message = message;
  }
}
