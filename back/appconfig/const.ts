import {Modules} from './modules';

export const port = process.env.port || Modules.get().args.port || '8118';
export const root = Modules.get().path.normalize(__dirname + '/../../');
export const apiVersion = '/api/v1/';
export let  env;
export const sha256  = {
  secret : process.env.ENCODEDHASH || '12345',
  updateString : process.env.ENCODEDHASHSTRING || '54321'
}
