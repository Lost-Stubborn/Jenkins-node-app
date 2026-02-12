pipeline {
    agent any 
    
    environment {
        PATH = "/opt/homebrew/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm 
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --this-does-not-exist'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        success {
            echo 'Build Successful'
        }
        failure {
            echo 'Build failed'
        }
    } 
}