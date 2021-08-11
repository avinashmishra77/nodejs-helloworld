pipeline {
  agent {
    kubernetes {
      //cloud 'kubernetes'
      label 'mypod'
      yaml """
apiVersion: v1
kind: Pod
spec:
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
    stage('Run node') {
      steps {
        container('nodejs') {
          sh 'node --version'
        }
      }
    }
    stage('Build') {
      steps {
        container('nodejs'){
        sh 'npm install '         
        }
      }
    }
    stage('Build with Kaniko'){
        steps {
            container(name: 'kaniko', shell: '/busybox/sh'){
                sh '/kaniko/executor --context `pwd` --dockerfile Dockerfile --whitelist-var-run=true --destination=avinashmishra/nodejs-helloworld:$BUILD_NUMBER' 
            }
        }
    }
    stage('Deploy'){
        steps {
            container(name: 'kubectl'){
                sh 'kubectl -n default set image deployment/nodejs nodejs-helloworld=avinashmishra/nodejs-helloworld:$BUILD_NUMBER' 
            }
        }
    }    
  }
}