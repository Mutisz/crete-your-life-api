import Fixer from "fixer-node";

const createCurrencyService = config => new Fixer(config.FIXER_ACCESS_KEY);

export default createCurrencyService;
