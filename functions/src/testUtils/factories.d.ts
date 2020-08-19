import { Mock } from 'jest';
import { Controller } from '../api/controllers/users/index.d';

//TODO type properly
interface BuildRes {
  send?: jest.Mock<any>;
  status?: jest.Mock<any>;
}

interface BuildReq {
  controller: Controller;
  body: unknown;
  params: unknown;
  overridesReq: unknown;
}
