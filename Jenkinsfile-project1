pipeline
{
    options {
        skipDefaultCheckout true
    }
    agent none;
    stages{
        stage("checkout from git and stash"){
            agent any
            steps{
                git branch: 'main', url: 'https://github.com/SuratSinghRawat/ansible-deployment.git'                
                stash(name: 'git-clone', includes: '**', allowEmpty: true)
            }
        }
        stage("Unstash on Ansible machine"){
            agent{label 'ansible'}
            steps{
                unstash(name: 'git-clone')
                sh 'ls'
            }
        }
        stage('Ansible playbook')
        {
            agent{label 'ansible'}
            steps{
                ansiblePlaybook become: true, becomeUser: 'surat', credentialsId: 'gcp-ansiblehost', disableHostKeyChecking: true, installation: 'ansible', inventory: 'dev.inv', playbook: 'playbook-1.yaml', vaultTmpPath: ''
            }
        }
    }
}
