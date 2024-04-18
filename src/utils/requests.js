import axios from 'axios';

const BASE_URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});