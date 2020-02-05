const emit=(socket)=> {
  console.log("entro");
  socket.emit('news', { hello: 'world' });
};
module.exports={emit};