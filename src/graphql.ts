import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'
import { importSchema } from 'graphql-import'
import { GraphQLServerLambda } from 'graphql-yoga'

import reservationResolver from './resolvers/reservation'

const typeDefs = importSchema('./src/graphql/api.graphql')

export const endpoint: Handler = async (evt: APIGatewayEvent, ctx: Context, cb: Callback) => {
  try {
    const cbFilter = (err: any, out: any) => {
      out.headers['Access-Control-Allow-Origin'] = '*'
      cb(err, out)
    }

    const handler = new GraphQLServerLambda({
      typeDefs,
      resolvers: reservationResolver
    })

    return handler.graphqlHandler(evt, ctx, cbFilter)
  } catch (e) {
    throw e
  }
}
