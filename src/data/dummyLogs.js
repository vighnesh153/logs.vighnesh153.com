const dummyLogs = [
  {id: 1, requestId: '1', timestamp: new Date().toLocaleString(), level: 'error', message: '\n      ################################################\n      🛡️  Server listening on port: 3001 🛡️\n      ################################################\n  ', meta: JSON.stringify({a: 123}, null, 4)},
  {id: 2, requestId: '2', timestamp: Date.now(), level: 'warn', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
  {id: 3, requestId: '3', timestamp: Date.now(), level: 'info', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
  {id: 4, requestId: '4', timestamp: Date.now(), level: 'http', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
  {id: 5, requestId: '5', timestamp: Date.now(), level: 'verbose', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
  {id: 6, requestId: '6', timestamp: Date.now(), level: 'debug', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
  {id: 7, requestId: '7', timestamp: Date.now(), level: 'silly', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
];

export default dummyLogs;
