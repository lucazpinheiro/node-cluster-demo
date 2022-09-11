process.env.UV_THREADPOOL_SIZE = 1
import cluster from 'cluster'
import startApp from './app.js'

/**
 * Na primeira execução desse arquivo, a propriedade 'isPrimary' será true e delegara
 * o processamento das requisições para o server para um processo filho (children)
 */
if (cluster.isPrimary) {
  // Executa server.js novamente, mas no mode filho (child).

  console.log('Primary process')
  cluster.fork()
  cluster.fork()
} else {
  // Por rodar no modo filho, essa instância se comportara como um server normal.

  console.log('Child process')
  startApp()
}

