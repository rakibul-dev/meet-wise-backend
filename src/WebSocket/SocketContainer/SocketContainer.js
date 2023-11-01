let io

const CreateSocketServerInstance = (IoInstance) => {
  io = IoInstance
}

const GetSocketSeverInstance = () => {
  return io
}

module.exports = {
  CreateSocketServerInstance,
  GetSocketSeverInstance,
}
