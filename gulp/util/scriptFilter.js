'use strict';

import path from 'path';

module.exports = (name) => {
 return /(\.(js)$)/i.test(path.extname(name));
}