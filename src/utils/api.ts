import { Binding as BaseBinding, BindingOptions } from 'graphql-binding'
import { GraphQLResolveInfo } from 'graphql'

export interface ReservationCreate {
  arrivalDate: Int
  departureDate: Int
  hotelName: String
  name: String
}

export interface ReservationWhere {
  id: String
}

export interface Reservation {
  arrivalDate: Int
  departureDate: Int
  hotelName: String
  id: String
  name: String
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export interface Schema {
  query: Query
  mutation: Mutation
}

export type Query = {
  reservations: (args: {}, context: { [key: string]: any }, info?: GraphQLResolveInfo | string) => Promise<Reservation[]>
  reservation: (args: { where: ReservationWhere }, context: { [key: string]: any }, info?: GraphQLResolveInfo | string) => Promise<Reservation | null>
}

export type Mutation = {
  createReservation: (args: { data: ReservationCreate }, context: { [key: string]: any }, info?: GraphQLResolveInfo | string) => Promise<Reservation | null>
}

export class Binding extends BaseBinding {
  
  constructor({ schema, fragmentReplacements }: BindingOptions) {
    super({ schema, fragmentReplacements });
  }
  
  query: Query = {
    reservations: (args, context, info): Promise<Reservation[]> => super.delegate('query', 'reservations', args, context, info),
    reservation: (args, context, info): Promise<Reservation | null> => super.delegate('query', 'reservation', args, context, info)
  }

  mutation: Mutation = {
    createReservation: (args, context, info): Promise<Reservation | null> => super.delegate('mutation', 'createReservation', args, context, info)
  }
}