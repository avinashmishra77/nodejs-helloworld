pipeline {
    agent {
        docker {
            image 'node:14-alpine'            
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}