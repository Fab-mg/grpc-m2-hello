import * as grpc from '@grpc/grpc-js';
import { loadProto } from '../utils/protoLoader';
import { HelloRequest, HelloReply, ExampleService } from '../protos/service.d';

const exampleService: ExampleService = {
  SayHello: (call: grpc.ServerUnaryCall<HelloRequest, HelloReply>, callback: grpc.sendUnaryData<HelloReply>) => {
    const reply: HelloReply = { message: `Hello ${call.request.name}` };
    callback(null, reply);
  },
};

const PROTO_PATH = __dirname + '/../protos/service.proto';
const grpcObject = loadProto(PROTO_PATH);

const exampleProto = grpcObject.example as any;

if (!exampleProto || !exampleProto.ExampleService) {
  throw new Error('Failed to load ExampleService from proto definition');
}

const server = new grpc.Server();
server.addService(exampleProto.ExampleService.service, exampleService as any);

const PORT = '50051';
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  server.start();
});
