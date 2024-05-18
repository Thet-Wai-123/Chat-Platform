const bcrypt = require('bcrypt');

async function generateHash(PlaintextPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(PlaintextPassword, salt);
    return hash;
  } catch (err) {
    throw err;
  }
}

async function compareHash(PlaintextPassword, hash){
    const result = await bcrypt.compare(PlaintextPassword, hash); 
    return result;
}

// async function test(){
// const hashed = await generateHash("Password");
// console.log(await compareHash("Password", hashed))}

// test();

module.exports = {generateHash, compareHash};

