STAIC_SERVER

This static server is only suitable for GET requests
The goal is to use it for format validation
The data fiels need to be named the last part of the api call url with a json extention
The data format should match what you get back from Postman

Make sure that you do not have any other server LIstening on PORT 3000.

.env: ( optional, the server will default to PORT=3000 )

  PORT_STATIC=4000

package.json script

  "server-static": "npx nodemon --watch server  server_static/index.js"


Folder structure
server_static
  data

files in data should be:
  products.json
  styles.json
  related.json
  reviews.json
  meta.json
  questions.json
  answers.json
  cart.json
