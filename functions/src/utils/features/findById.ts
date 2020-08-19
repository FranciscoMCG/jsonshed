import { Controller } from '../../../declarations/api';

export const findById = (controller: Controller[], id: string) =>
  controller.find((c: Controller) => c?.id.toString() === id);
