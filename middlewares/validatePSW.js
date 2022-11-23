const validatePSW = (req= request, res, next) => {
  const { psw } = req.headers;

  if(!psw){
    return res.status(401).json({
      msg: "No autorizado | no psw"
    });
  }

  if(psw !== process.env.CLIENT_PSW) {
    return res.status(401).json({
      msg: "no autorizado | incorrect psw"
    })
  }

  next();
}

module.exports = validatePSW;