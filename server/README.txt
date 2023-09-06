


1. Информация о ссылке.
    структура 

2.












[nodemon] restarting due to changes...
[nodemon] starting `ts-node src/main.ts`
C:\Users\Dimka\Documents\NodeProject\pet16_file_sharing_service\server\node_modules\mongodb\src\sdam\topology.ts:567
        const timeoutError = new MongoServerSelectionError(
                             ^
MongoServerSelectionError: connect ETIMEDOUT 18.195.235.221:27017
    at Timeout._onTimeout (C:\Users\Dimka\Documents\NodeProject\pet16_file_sharing_service\server\node_modules\mongodb\src\sdam\topology.ts:567:30)
    at listOnTimeout (node:internal/timers:564:17)
    at processTimers (node:internal/timers:507:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-orqibt3-shard-00-00.plhi6ct.mongodb.net:27017' => [ServerDescription],
      'ac-orqibt3-shard-00-02.plhi6ct.mongodb.net:27017' => [ServerDescription],
      'ac-orqibt3-shard-00-01.plhi6ct.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-106tp2-shard-0',
    maxElectionId: null,
    maxSetVersion: null,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: 30
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {}
}
[nodemon] app crashed - waiting for file changes before starting...