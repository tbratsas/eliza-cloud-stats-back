const bcrypt = require('bcryptjs');

(async () => {
  const password = 'test123'; // or any password you want
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);
})();
