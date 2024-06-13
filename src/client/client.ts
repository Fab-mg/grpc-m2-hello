import * as grpc from '@grpc/grpc-js';
import { loadProto } from '../utils/protoLoader';
import { HelloRequest, HelloReply } from '../protos/service.d';

const PROTO_PATH = __dirname + '/../protos/service.proto';
const grpcObject = loadProto(PROTO_PATH);

const exampleProto = grpcObject.example as any;

if (!exampleProto || !exampleProto.ExampleService) {
  throw new Error('Failed to load ExampleService from proto definition');
}

const client = new exampleProto.ExampleService('localhost:50051', grpc.credentials.createInsecure());

const request: HelloRequest = { name: 'World' };

client.SayHello(request, (error: grpc.ServiceError | null, response: HelloReply) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Greeting:', response.message);
  }
});
