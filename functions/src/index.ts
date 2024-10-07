import {onRequest} from "firebase-functions/v2/https";

exports.tinymceApiKey = onRequest((request, response) => {
  const TINYMCE_APIKEY = process.env.FUNCTIONS_TINYMCE_API_KEY;
  if (!TINYMCE_APIKEY) {
    response.send("Api not set");
  } else {
    response.send({apiKey: TINYMCE_APIKEY});
  }
});
