# BlogNotFound

Blog Not Found : ( One of a Kind Blog Website )

# To start the Website

- start elastic search, by default it will start @ localhost:9200
- Go to /backend, run npm i to install dependencies
- Go to /frontend, run npm i to install dependencies
- To seed the database, go to /backend/utils, run node seeder.js
- Go /backend, run "npm start" to start Backend, the server will be available @ localhost:4000
- Go to /frontend, run "npm run dev", the server will be available @ localhost:3000

# To set-up Elastic Search:

1. Download elastic search: https://www.elastic.co/downloads/elasticsearch
2. Open terminal at Folder
3. Go to /config
4. Edit elasticsearch.yml file and change security settings to 'false':
   - Under # Enable security features
   - set -> xpack.security.enabled: false
   - set -> xpack.security.enrollment.enabled: false
5. run this command on terminal ./bin/elasticsearch to start elasticsearch
6. If jdk does not open please use this command: xattr -d com.apple.quarantine /path/to/your/JDK/file
