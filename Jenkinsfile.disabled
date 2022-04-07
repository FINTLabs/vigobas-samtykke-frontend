pipeline {
    parameters {
        string(name: 'IMAGE_NAME', defaultValue: 'vigobas-samtykke-frontend', description: 'The name of the docker image to build/use')
        string(name: 'MAIN_ACR', defaultValue: 'fintlabsacr.azurecr.io', description: 'The AZR to connect to.')
    }
    agent { label 'docker' }
    stages {
        stage('Build') { 
            steps {
                //withDockerRegistry([credentialsId: "${MAIN_ACR}", url: "https://${MAIN_ACR}"]) {
                withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
                    sh "docker build --tag ${GIT_COMMIT} ."
                }
            }
        }
        stage('Publish') {
            when {
                branch 'main'
            }
            steps {
                // Tagging the specific version
                // sh "docker tag ${GIT_COMMIT} ${MAIN_ACR}/${IMAGE_NAME}:build.${BUILD_NUMBER}"
                sh "docker tag ${GIT_COMMIT} ${MAIN_ACR}/${IMAGE_NAME}:build.${BUILD_NUMBER}_${GIT_COMMIT}"
                //withDockerRegistry([credentialsId: "${MAIN_ACR}", url: "https://${MAIN_ACR}"]) {
                withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
                  sh "docker push ${MAIN_ACR}/${IMAGE_NAME}:build.${BUILD_NUMBER}_${GIT_COMMIT}"
                  sh "docker tag ${GIT_COMMIT} ${MAIN_ACR}/${IMAGE_NAME}:latest"
                  sh "docker push ${MAIN_ACR}/${IMAGE_NAME}:latest"
                }
            }
        }
        stage('Publish PR') {
            when { 
              changeRequest() 
            }
            steps {
                sh 'echo "Hello world. Triggered from PR"'
            }
        }
        stage('Publish Version') {
            when {
                tag pattern: "v\\d+\\.\\d+\\.\\d+(-\\w+-\\d+)?", comparator: "REGEXP"
            }
            steps {
                sh 'echo "Hello world. Triggered from Publish Version."'
            }
        }
    }
}
