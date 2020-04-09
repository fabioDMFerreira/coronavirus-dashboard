const crypto = require('crypto');

export default (value: string) => crypto.createHash('md5').update(value).digest('hex');
