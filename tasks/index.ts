import { Method } from 'axios'

import AppHelper from '../lib/app-helper'
import FileHelper from '../lib/file-helper'
import MongoInterface from '../lib/mongo-interface'

import { generateAuthToken } from './generateAuthToken'

const serverConfig = FileHelper.readJSONFile(
  './server/config/serverConfig.json'
)

const taskMap: any = {
  generateAuthToken: generateAuthToken,
}

async function init(): Promise<void> {
  const args = process.argv.slice(2)

  await runTask(args)
}

export async function connectToDatabase(): Promise<MongoInterface> {
  const dbName = AppHelper.getDbName()

  const mongoInterface = new MongoInterface()
  await mongoInterface.init(dbName)

  return mongoInterface
}

async function runTask(args: string[]): Promise<void> {
  const taskName = args[0]

  const taskMethod = taskMap[taskName]

  if (typeof taskMethod == 'undefined') throw new Error('unknown task')

  await taskMethod()

  console.log(`Task '${taskName}' complete.`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init()
