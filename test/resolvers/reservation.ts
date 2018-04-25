import test from 'ava'
import ReservationsResolver from '../../src/resolvers/reservation'
import * as sinon from 'sinon'
import { FindOneArgs } from '../../src/utils/types'
import { ReservationWhere } from '../../src/utils/api'

test.beforeEach(t => {
  sinon.spy(ReservationsResolver.Query, 'reservation')
})

test.afterEach.always(t => {
  (ReservationsResolver.Query.reservation as sinon.SinonSpy).restore()
})

test.serial('#reservation should call for a specific reservation', async t => {
  const where: FindOneArgs<ReservationWhere> = {
    where: {
      id: ''
    }
  }

  await ReservationsResolver.Query.reservation(null, where, null, null)

  t.is((ReservationsResolver.Query.reservation as sinon.SinonSpy).callCount, 1)
  t.is((ReservationsResolver.Query.reservation as sinon.SinonSpy).firstCall.args[1], where)
})

test.serial('#reservation fails on invalid request data', async t => {
  const result = await t.throws(ReservationsResolver.Query.reservation(null, {} as any, null, null))

  t.is(result.message, 'Key required to get item')
})
