export default class HttpRequest {
  static async hitApi(url, options) {
    try {
      let response = await fetch(url, options);
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
