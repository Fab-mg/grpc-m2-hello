// src/utils/protoLoader.ts

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

export function loadProto(path: string) {
  const packageDefinition = protoLoader.loadSync(path, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  return grpc.loadPackageDefinition(packageDefinition);
}
