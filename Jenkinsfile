pipeline {
  agent {
    kubernetes {
      //cloud 'kubernetes'
      label 'mypod'
      yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccount: default
  containers:
  - name: nodejs
    image: node:14-alpine
    command: ['cat']
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true    
  - name: kaniko
    workingDir: /tmp/jenkins
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: Always
    command:
    - sleep
    args:
    - 9999999
    volumeMounts:
      - name: jenkins-docker-cfg
        mountPath: /kaniko/.docker
  volumes:
  - name: jenkins-docker-cfg
    projected:
      sources:
      - secret:
          name: kaniko-docker-credentials
          items:
            - key: .dockerconfigjson
              path: config.json    
"""
    }
  }
  stages {
    stage('Install package dependencies') {
      steps {
        container('nodejs'){
        //sh 'npm install '         
        sh 'npm ci '         
        }
      }
    }
    stage('Build and Push Docker image'){
        steps {
            container(name: 'kaniko', shell: '/busybox/sh'){
                sh '/kaniko/executor --context `pwd` --dockerfile Dockerfile --whitelist-var-run=true --destination=avinashmishra/nodejs-helloworld:$BUILD_NUMBER --destination=avinashmishra/nodejs-helloworld:latest' 
            }
        }
    }
    stage('Deploy Docker image'){
        steps {
            container(name: 'kubectl'){
                sh 'kubectl -n default set image deployment/nodejs nodejs-helloworld=avinashmishra/nodejs-helloworld:$BUILD_NUMBER' 
            }
        }
    }    
  }
}