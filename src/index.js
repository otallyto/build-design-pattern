import data from "../database/data.json";
import FluentSQLBuilder from "./fluentSQL.js";

const result = FluentSQLBuilder.for(data)
  .where({ registered: /^(2020|2019)/ })
  .where({ category: /^(security|developer)$/ })
  .where({ phone: /\((852|890|810)\)/ })
  .select(["name", "company", "category", "registered"])
  .limit(2)
  .build();

console.table(result);
