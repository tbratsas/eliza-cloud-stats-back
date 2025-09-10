const bcrypt = require('bcryptjs');

const hash = '$10$HvtEDnEkVp3.JN7.TVbF3.fwkl2YMQ7JgLmOW1XbBqgqCDQMexGOq';
const password = 'your_test_password';

bcrypt.compare(password, hash).then(result => {
  console.log('Match:', result);
});
