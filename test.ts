import dotenv from 'dotenv';
import path from 'path';
import process from 'process';

const t = dotenv.config({ path: path.join(process.cwd(), '/bin/.env') });
console.log(t.parsed);
