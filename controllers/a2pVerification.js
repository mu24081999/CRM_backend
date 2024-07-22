const helper = require("../helper/helper");
const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const twilio = require("twilio");

exports.createA2PVerification = catchAsyncFunc(async (req, res, next) => {
  const { accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);

  try {
    // Create Customer Profile
    const twilio = require('twilio');
    const client =  twilio(accountSid,authToken);
    // Step 1: Create a Business Profile
    client.trusthub.v1.customerProfiles.create({
      friendlyName: 'My Business Profile',
      email: 'business@example.com',
      businessName: 'My Business',
      ein: 'YOUR_EIN',
      address: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'US'
      }
    }).then(profile => {
      console.log('Business Profile Created:', profile.sid);
      
      // Step 2: Register Your Brand
      return client.trusthub.v1.trustProducts.create({
        customerProfileSid: profile.sid,
        friendlyName: 'My Brand',
        ein: 'YOUR_EIN'
      });
    }).then(brand => {
      console.log('Brand Registered:', brand.sid);
      
      // Step 3: Create a Messaging Service
      return client.messaging.v1.services.create({
        friendlyName: 'My Messaging Service'
      });
    }).then(service => {
      console.log('Messaging Service Created:', service.sid);
      
      // Step 4: Register Your Campaign
      return client.messaging.v1.services(service.sid).campaigns.create({
        useCase: 'marketing',
        description: 'Marketing Campaign'
      });
    }).then(campaign => {
      console.log('Campaign Registered:', campaign.sid);
      
      // Step 5: Associate Phone Numbers
      return client.messaging.v1.services(service.sid).phoneNumbers.create({
        phoneNumberSid: 'PN700e8bb4c9814ba867033cf101d221ce'
      });
    }).then(phoneNumber => {
      console.log('Phone Number Associated:', phoneNumber.sid);
    }).catch(error => {
      console.error('Error:', error);
    });
    
});
