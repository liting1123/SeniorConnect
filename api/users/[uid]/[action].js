import { handleRequestWithErrors } from '../../../server/index.mjs';

export default function handler(request, response) {
  handleRequestWithErrors(request, response);
}
