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
    launch_success: {
      type: GraphQLBoolean,
    },
    rocket: {
      type: RocketType,
    },
  }),
});

const launchUrl = 'https://api.spacexdata.com/v3/launches';
const rocketUrl = 'https://api.spacexdata.com/v3/rockets';

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: GraphQLList(LaunchType),
      async resolve(parent, args) {
        // Inside here is where we actually get the data
        const { data } = await axios.get(launchUrl);
        return data;
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        const { data } = await axios.get(launchUrl + `/${args.flight_number}`);
        return data;
      },
    },
    rockets: {
      type: GraphQLList(RocketType),
      async resolve(parent, args) {
        const { data } = await axios.get(rocketUrl);
        return data;
      },
    },
    rocket: {
      type: RocketType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const { data } = await axios.get(rocketUrl + `/${args.id}`);
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
