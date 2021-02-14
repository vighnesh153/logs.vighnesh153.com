const dummyLogs = [
  {
    id: 1,
    requestId: '1',
    timestamp: new Date().toLocaleString(),
    level: 'info',
    message: '\n      ################################################\n      🛡️  Server listening on port: 3001 🛡️\n      ################################################\n  ',
    meta: JSON.stringify({}, null, 4)
  },
  {
    id: 2, requestId: '2', timestamp: Date.now(), level: 'info', message: 'Applying Filter', meta: JSON.stringify({
      time: "14/02/2021, 10:50:45",
      service: "api.vighnesh153.com",
      method: "GET",
      path: "/logs/",
      query: {
        filters: {
          "meta[dot]service": "api.vighnesh153.com",
          level: "info"
        },
        pagination: {
          skip: "20",
          limit: "20"
        }
      }
    }, null, 4)
  },
  {
    id: 3, requestId: '3', timestamp: Date.now(), level: 'info', message: 'Some message\nHello', meta: JSON.stringify({
      time: "14/02/2021, 11:48:38",
      service: "api.vighnesh153.com",
      cachedData: {
        key: "a245b155-8df6-4be5-a299-0b484a4c6437",
        value: {
          data: [
            "api.vighnesh153.com"
          ],
          status: 200,
          message: "Successfully fetched services."
        }
      },
      method: "GET",
      path: "/logs/services"
    }, null, 4)
  },
  {
    id: 4,
    requestId: '4',
    timestamp: new Date().toLocaleString(),
    level: 'warn',
    message: 'Bad CSRF Token',
    meta: JSON.stringify({}, null, 4)
  },
  {
    id: 5,
    requestId: '5',
    timestamp: new Date().toLocaleString(),
    level: 'error',
    message: 'Failed to fetch data.',
    meta: JSON.stringify({}, null, 4)
  },
  {
    id: 6,
    requestId: '6',
    timestamp: new Date().toLocaleString(),
    level: 'debug',
    message: 'Some message\nHello',
    meta: JSON.stringify({a: 123}, null, 4)
  },
  {
    id: 7,
    requestId: '7',
    timestamp: new Date().toLocaleString(),
    level: 'silly',
    message: 'Some message\nHello',
    meta: JSON.stringify({a: 123}, null, 4)
  },
];

export default dummyLogs;
