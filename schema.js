const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const axios = require('axios');

// Rocket type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: {
      type: GraphQLString,
    },
    rocket_name: {
      type: GraphQLString,
    },
    rocket_type: {
      type: GraphQLString,
    },
  }),
});

// Launch type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: {
      type: GraphQLInt,
    },
    mission_name: {
      type: GraphQLString,
    },
    launch_year: {
      type: GraphQLString,
    },
    launch_date_local: {
      type: GraphQLString,
    },
    success: {
      type: GraphQLBoolean,
    },
    rocket: {
      type: RocketType,
    },
  }),
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: GraphQLList(LaunchType),
      async resolve(parent, args) {
        // Inside here is where we actually get the data
        const { data } = await axios.get(
          'https://api.spacexdata.com/v3/launches'
        );
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
