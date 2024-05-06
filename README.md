# BlogNotFound

To set-up Elastic Search:

1. Download elastic search: https://www.elastic.co/downloads/elasticsearch
2. Open terminal at Folder
3. Go to /config
4. Edit elasticsearch.yml file and change security settings to 'false':
   - Under # Enable security features
   - set -> xpack.security.enabled: false
   - set -> xpack.security.enrollment.enabled: false
5. run this command on terminal ./bin/elasticsearch to start elasticsearch
6. If jdk does not open please use this command: xattr -d com.apple.quarantine /path/to/your/JDK/file
