import * as grpc from '@grpc/grpc-js';

export interface HelloRequest {
  name: string;
}

export interface HelloReply {
  message: string;
}

export interface ExampleService {
  SayHello: grpc.handleUnaryCall<HelloRequest, HelloReply>;
}
