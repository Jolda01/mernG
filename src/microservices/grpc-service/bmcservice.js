const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = "./bmc.proto";

 function bmcgrpc(call, callback) {
    const height = call.request.height;
    const weight = call.request.weight;
  
    if (!height && !weight) {
      try {
        const bmc= weight / (height * height);
        callback(null, { bmc });
      } catch (error) {
        console.error('Error:', error.message);
        callback(new Error('server error'), null); 
      }
    } else {
      callback(new Error('Error'), null);
    }
  }
  
  const startServer = () => {
    const server = new grpc.Server();
  
  
    var serviceDef = protoLoader.loadSync(PROTO_PATH);
    var Handler = grpc.loadPackageDefinition(serviceDef).grpc;
  
    server.addService(Handler.bmc.service, { bmcgrpc : bmcgrpc });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
        server.start();
    });
  }
  startServer();