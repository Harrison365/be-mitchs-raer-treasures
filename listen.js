const app = require("./app");

//OPTIONAL vvv - Add this then run node listen.js - You can then make requests to this server on insomnia.
//Install nodemon and add this script to package.json "dev": "nodemon listen.js", then run npm run dev

app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("express listnening to port 8080");
  }
});
