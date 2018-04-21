import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda'

// Since GraphQL resolvers are just standard objects we can use those as controllers so we don't duplicate functionality
import ReservationController from './resolvers/reservation'
import { CreateArgs, FindOneArgs } from './utils/types'
import { ReservationCreate, ReservationWhere } from './utils/api'

const throwBasicError = (cb, e) => {
  cb(null, { statusCode: 500, body: JSON.stringify({ error: e.message }) })
}

export const reservations: Handler = async (evt: APIGatewayEvent, ctx: Context, cb: Callback) => {
  try {
    // We can null out the graphql specific properties for the function
    const reservations = await ReservationController.Query.reservations(null, null, null, null)
    cb(null, { statusCode: 200, body: JSON.stringify(reservations) })
  } catch (e) {
    throwBasicError(cb, e)
  }
}

export const getReservation: Handler = async (evt: APIGatewayEvent, ctx: Context, cb: Callback) => {
  try {
    const reqInfo = {
      where: {
        id: (evt.pathParameters as any).id
      }
    } as FindOneArgs<ReservationWhere>
    // We can null out the graphql specific properties for the function we don't need, but we do need criteria for find
    const reservation = await ReservationController.Query.reservation(null, reqInfo, null, null)

    if (!reservation) {
      return cb(null, { statusCode: 404 })
    }

    cb(null, { statusCode: 200, body: JSON.stringify(reservation) })
  } catch (e) {
    throwBasicError(cb, e)
  }
}

export const createReservation: Handler = async (evt: APIGatewayEvent, ctx: Context, cb: Callback) => {
  try {
    if (!evt.body) {
      return throwBasicError(cb, new Error(`Please provide reservation data.`))
    }

    const reqInfo = { data: JSON.parse(evt.body) } as CreateArgs<ReservationCreate>
    const reservation = await ReservationController.Mutation.createReservation(null, reqInfo, null, null)

    cb(null, { statusCode: 200, body: JSON.stringify(reservation) })
  } catch (e) {
    throwBasicError(cb, e)
  }
}
