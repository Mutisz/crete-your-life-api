import Fixer from "fixer-node";

import IConfig from "../types/IConfig";

const createCurrencyService = ({ FIXER_ACCESS_KEY }: IConfig) =>
  new Fixer(FIXER_ACCESS_KEY);

export default createCurrencyService;
