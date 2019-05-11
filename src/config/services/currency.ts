import Fixer from "fixer-node";

import { Config } from "../../@types/crete-your-life/Config";

const createCurrencyService = ({ FIXER_ACCESS_KEY }: Config) =>
  new Fixer(FIXER_ACCESS_KEY);

export default createCurrencyService;
