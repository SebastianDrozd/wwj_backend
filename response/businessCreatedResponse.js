class BusinessCreatedResponse {
  constructor(business) {
    this.business = business;
    this.statusCode = 201;
    this.message = "Business created successfully";
  }
}
module.exports = BusinessCreatedResponse;