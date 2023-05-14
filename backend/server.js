const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors()); // 追加: CORS設定を有効にする

// startgg用コード
const { GraphQLClient } = require('graphql-request');

const endpoint = 'https://api.start.gg/gql/alpha';

const client = new GraphQLClient(endpoint, {
  headers: {
    //トークン設定
    authorization: `Bearer `,
  },
});

const query = `
query getTournamentInfoList($gameId1: ID!, $perPage: Int!, $cCode: String!, $startDate: Timestamp!, $endDate: Timestamp!) {
  tournaments(query: {
    perPage: $perPage
    sortBy: "startAt asc"
    filter: {
      afterDate: $startDate
      beforeDate: $endDate
      videogameIds: [$gameId1]
      countryCode: $cCode
    }
  }) {
    nodes {
      id 
      name
      countryCode
      startAt
      endAt
      url(relative: false)
      addrState
      numAttendees
      events {
        numEntrants
        startAt
      }
      images {
        url
        height
        width
      }
    }
  }
}`;

const variables = {
    "cCode": "JP",
    "perPage": 30,
    "startDate": 1682899200,
    "endDate":1685591200,
    "gameId1" : 1386
  }

  async function fetchData() {
    const data = await client.request(query, variables);    
    console.log(data);
    return data;
  }
  
  app.get('/api/data', async (req, res) => {
    const data = await fetchData();
    res.json(data);
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

/*
const data = client.request(query, variables);

// APIエンドポイントの定義
app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/
