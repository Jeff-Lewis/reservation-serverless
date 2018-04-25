import test from 'ava'
import { endpoint } from '../../src/graphql'
import * as sinon from 'sinon'

test('should be a valid endpoint', async t => {
  const cb = sinon.spy()

  // Eventually a mock util
  const result = await endpoint({}, {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'test',
    functionVersion: '1.x',
    invokedFunctionArn: '123',
    memoryLimitInMB: 1024,
    awsRequestId: '123',
    logGroupName: 'test',
    logStreamName: 'test',
    getRemainingTimeInMillis: () => 30000,
    done: cb,
    fail: cb,
    succeed: cb
  }, cb)

  t.is(cb.callCount, 1)
})
