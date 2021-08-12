# nodejs-helloworld

## Development environment setup (Laptop)

* Make sure you have Node.js intalled, else install using (On RHEL)

   ```bash
   sudo yum install nodejs
   ```

* Verify nodejs installation

   ```bash
   node --version
   npm --version
   ```

* Clone GitHub repository

   ```bash
   git clone https://github.com/avinashmishra77/nodejs-helloworld.git
   ```

* Build app and its dependencies

   ```bash
   npm install
   ```

* Test application (using Mocha to run our test)

```bash
./node_modules/.bin/mocha ./test/test.js
```

* Run application, view app on browser at (http://localhost:8080)

   ```bash
   node index.js
   ```

## NodeJS application

**index.js**

```nodejs
var express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
 
var app = express();

//Respond with "hello world" for requests that hit our root "/"
app.get('/', function (req, res) {
 res.send('hello world');
});//listen to port 3000 by default

app.listen(PORT, HOST);
module.exports = app;
console.log(`Running on http://${HOST}:${PORT}`);
```

**package.json**

```json
{
  "name": "node-app",
  "description": "hello jenkins test app",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "3.12.0"
  },
  "devDependencies": {
    "mocha": "1.20.1",
    "supertest": "0.13.0"
  }
}
```

* express: Node Framework
* mocha: Test framework for node (can use others like Jest, Tape, Jasmin, etc)
* supertest: Provider a high level abstraction for testing HTTP

**Dockerfile**

```Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied where available
COPY package*.json ./

RUN npm install
# If production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["node","index.js"]
```

## Configure Jenkins

If using Jenkins that installed as part of the eks-demo-cluster, a Multibranch pipeline called nodejs-hello-world should be automatically setup as part of the Jenkine Configuration as Code (JCasC), pointing to the GitHub repository hosting the [nodejs-helloworld](https://github.com/avinashmishra77/nodejs-helloworld.git) application.

If you need to configure Jenkins manually, create a **Multibranch Pipeline**. 

Under **Branch Sources**:

* GitHub
  * Project Repository: https://github.com/avinashmishra77/nodejs-helloworld
  * Credentials: Pick "github-creds"
    * If no credentials, you can create on under the **Manage Credentials** Section.
  * Behaviours
    * Strategy: All branches
  * Discover pull requests from forks
    * Strategy: Merging pull request with the current target branch revision
    * Trust: From users with Admin or Write permission
  * Property strategy: All branches get the same properties

Under **Build Configuration**:

* Mode: by Jenkinsfile
  * Script Path: Jenkinsfile

## Configure GitHub Webhook

To trigger builds everytime a developer pushes new code to the master branch. Goto the GitHub [nodejs-helloworld](https://github.com/avinashmishra77/nodejs-helloworld.git) app, click on **Settings** tab, select **Webhooks** from the left menu and click on **Add Webhooks** button. Enter your Jenkins webhook URL under **Payload URL**:

```bash
http://jenkins.eks-demo-cluster.clusters.shastra.net/github-webhook/
```

and select **Just the Push Event** option. Click on **Add webhook** button.

By default **Active** is checked, which means event details will be delivered when this hook is triggered.

**Note:**

Since using GitHub free account there might be Rate limiting to the number of API requests you can make, refer [Rate limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).

For unauthenticated requests, the rate limit allows for up to 60 requests/hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.

The returned HTTP headers of any API request show your current rate limit status:

```bash
curl -I https://api.github.com/users/avinashmishra77
```

## Configure Kubernetes

Create the following K8s resources to deployment of CI/CD pipeline

```bash
kubectl apply -f jenkins-role.yaml
kubectl apply -f nodejs-deployment.yaml
kubectl apply -f nodejs-svc.yaml
kubectl apply -f nodejs-ingress.yaml
```

### Reference sites

https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
https://medium.com/@mosheezderman/how-to-set-up-ci-cd-pipeline-for-a-node-js-app-with-jenkins-c51581cc783c