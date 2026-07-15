pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t playwright-demo .'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat '''
                docker run --rm ^
                  -v "%cd%:/app" ^
                  -w /app ^
                  playwright-demo
                '''
            }
        }
    }
}