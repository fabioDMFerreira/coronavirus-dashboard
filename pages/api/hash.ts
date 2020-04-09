import * as crypto from 'crypto';

export default (value: string) => crypto.createHash('md5').update(value).digest('hex');
