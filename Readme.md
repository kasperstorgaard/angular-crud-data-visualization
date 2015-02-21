#Angular CRUD data visualization
_Note: currently reworking this entire project in branch "rework",_
_merging back to "master" some time next week_

Install:
- (if on Windows): install Python 2.7.9
- run "npm install"
- run "bower install"

Dev:
- run "npm run watch"

Build:
- run "npm run build"

Local production server (needs build first):
- run "node app.js"

server for both Dev and Build is localhost:3000

Troubleshooting: 
If you get EACCES error for localhost:8080 (websocket port, happened on my Windows work computer), 
then change the port to a free port in websocket-server.js and the two services which use it and rebuild.

