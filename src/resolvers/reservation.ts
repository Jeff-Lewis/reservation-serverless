import * as moment from 'moment'
import { v4 } from 'uuid'

import { ReservationCreate, ReservationWhere } from '../utils/api'
import { CreateArgs, FindOneArgs } from '../utils/types'
import ReservationModel from '../models/reservation'

export default {
  Query: {
    async reservation (_doc, args: FindOneArgs<ReservationWhere>, _ctx, _info) {
      try {
        const createdModel = await ReservationModel.get(args.where)
        return createdModel
      } catch (e) {
        throw new Error(e.message)
      }
    },

    async reservations (_doc, _args, _ctx, _info) {
      try {
        const reservations = await ReservationModel.scan().all().exec()
        return reservations
      } catch (e) {
        throw new Error(e.message)
      }
    }
  },

  Mutation: {
    async createReservation (_doc, args: CreateArgs<ReservationCreate>, _ctx, _info) {
      try {
        const { data } = args
        const id = v4()

        // Just a check for the REST side of things. GraphQL wouldn't allow this to be passed.
        if ((data as any).id) {
          delete (data as any).id
        }

        // Date validation - Remember the basic validation is covered by the model. This is just to make sure departure
        // is after arrival.
        if (!moment.unix(data.departureDate).isAfter(moment.unix(data.arrivalDate), 'day')) {
          throw new Error(`Departure date must come after arrival date`)
        }

        await new ReservationModel({
          ...data,
          id
        }).save()

        const createdModel = await ReservationModel.get(id)
        return createdModel
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
}
