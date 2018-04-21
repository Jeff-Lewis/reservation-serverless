import db from '../utils/dynamoose'
import * as moment from 'moment'

export const ReservationSchema = new db.Schema({
  id: {
    type: String,
    hashKey: true
  },
  // In a non-exercise environment I would make this a range (partition) key on Dynamo to efficiently divide our
  // table for faster querying and insertion
  hotelName: {
    type: String
  },
  name: {
    type: String
  },
  arrivalDate: {
    type: Number,
    validate: (value) => {
      return (moment.unix(value).isSameOrAfter(moment().unix(), 'day'))
    }
  },
  departureDate: {
    type: Number,
    validate: (value) => {
      return (moment.unix(value).isAfter(moment().unix(), 'day'))
    }
  }
})

export default db.model('reservations', ReservationSchema)
