import FederationPlugin from "@graphile/federation";
import pgSimplifyInflector from '@graphile-contrib/pg-simplify-inflector'
import { mergeDeepRight } from 'ramda'

const dev = {
  options: {
    ownerConnectionString: `postgres://${process.env.PG_OWNER_USER}:${process.env.PG_OWNER_PASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
    graphiql: true,
    allowExplain(req) {
      return true;
    },
    jwtVerifyOptions: {
        ignoreExpiration: true
    },
    default_role: "",
    jwt_secret: "",
    jwt_token: "",
    watchPg: true,
    exportGqlSchemaPath: "schema.graphql"
  }
}

const prod = {
  options: {
    retryOnInitFail: true,
    extendedErrors: ["errcode"],
    graphiql: false,
    disableQueryLog: true,
    jwtVerifyOptions: {
        ignoreExpiration: false 
    },
    default_role: "",
    jwt_secret: "",
    jwt_token: "",
  }
}

const common = {
  schema: process.env.PGSCHEMA,
  host: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,
  options: {
    appendPlugins: [pgSimplifyInflector, FederationPlugin],
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    enableQueryBatching: true,
    legacyRelations: "omit",
    subscriptions: true,
  }
}

export default mergeDeepRight(
  common, 
  process.env.NODE_ENV === 'production' 
    ? prod 
    : dev
) 