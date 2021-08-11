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
        steps 
        container('nodejs') {
            sh 'npm install ' 
            sh './script/test' 
        }
    }
  }
}