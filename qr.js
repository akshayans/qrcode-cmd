(async () => {
var qrcode = require('qrcode')
const prompts = require("prompts")
const yesno = require("yesno")
const response = await prompts({
    type: 'text',
    name: 'data',
    message: 'What would you like to put in the QR Code?',
})
qrcode.toString(response.data,{type:'terminal'}, function (err, url) {
  console.log(url)
})
const saveimage = await yesno({
  question: 'Would you like to save the image? (y/n)',
  invalid: function ({ question, defaultValue, yesValues, noValues }) {
      console.log("Invalid answer.");
      return;
  }
});
if (saveimage === true) {
    qrcode.toFile('qrcode.png', response.data, {
      }, function(err) {
        if (err) throw err;
        console.log(`QR Code has been saved. It is named 'qrcode.png'.`);
      });
}
if (saveimage === false) {
  console.log(`Did not save. Exiting now...`)
  process.exit()
}
})(); 