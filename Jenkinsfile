pipeline {
    agent any 
    
    environment {
        PATH = "/opt/homebrew/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Pulling code from git"
                checkout scm 
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies"
                sh 'npm ci'
            }
        }

        stage('Unit Tests') {
            steps {
                echo 'Running unit tests'
                sh 'npm test'
            }
        }

        stage('Package Artifact') {
            steps {
                echo "Packaging build artifact"
                sh 'tar -czf app.tar.gz .'
                archiveArtifacts artifacts: 'app.tar.gz'
            }
        }

        stage('Deploy to Local environment') {
            steps {
                echo 'Deploying applications'
                sh '''
                    rm -rf /tmp/node-app-prod
                    mkdir -p /tmp/node-app-prod
                    tar -xzf app.tar.gz -C /tmp/node-app-prod
                '''
            }
        }

        stage('Smoke test') {
            steps {
                echo 'Smoke testing app'
                sh '''
                    cd /tmp/node-app-prod
                    node app.js & 
                    sleep 3
                    curl -f http://localhost:3000
                '''
            }
        }
    }

    post {
        success {
            echo 'CI PASSED: Code is safe'
        }
        failure {
            echo 'CI FAILED: Do not deploy'
        }
    } 
}