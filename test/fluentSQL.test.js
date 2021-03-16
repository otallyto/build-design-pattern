import { expect, describe, test } from "@jest/globals";
import FluentSQLBuilder from "../src/fluentSQL";
const data = [
  {
    id: 0,
    name: "Bruno",
    category: "developer",
  },
  {
    id: 1,
    name: "Amaral",
    category: "developer",
  },
  {
    id: 2,
    name: "Caetano",
    category: "maneger",
  },
];
describe("Test Suite for FluentSQL Builder", () => {
  test("#for should return a FluentSQLBuilder instance", () => {
    const result = FluentSQLBuilder.for(data);
    const expected = new FluentSQLBuilder({ database: data });
    expect(expected).toStrictEqual(result);
  });

  test("#build should return the empty object instance", () => {
    const result = FluentSQLBuilder.for(data).build();
    const expected = data;
    expect(expected).toStrictEqual(result);
  });

  test("#limit given a collection it should limit results", () => {
    const result = FluentSQLBuilder.for(data).limit(1).build();
    const expected = [data[0]];
    expect(expected).toStrictEqual(result);
  });
  test("#where given a collection it shoud filter data", () => {
    const result = FluentSQLBuilder.for(data)
      .where({ category: /^dev/ })
      .build();
    const expected = data.filter(
      ({ category }) => category.slice(0, 3) === "dev"
    );
    expect(expected).toStrictEqual(result);
  });

  test("#select given a collection it should return only espefic data", () => {
    const result = FluentSQLBuilder.for(data)
      .select(["name", "category"])
      .build();
    const expected = data.map(({ name, category }) => ({ name, category }));
    expect(expected).toStrictEqual(result);
  });
  test("#orderBy given a collection it should order results by field", () => {
    const result = FluentSQLBuilder.for(data).orderBy("name").build();
    const expected = [
      {
        id: 1,
        name: "Amaral",
        category: "developer",
      },
      {
        id: 0,
        name: "Bruno",
        category: "developer",
      },      
      {
        id: 2,
        name: "Caetano",
        category: "maneger",
      },
    ];
    expect(expected).toStrictEqual(result);
  });
  test('pipeline', () => {
    const result = FluentSQLBuilder.for(data)
        .where({ category: "developer" })
        .where({ name: /m/ })
        .select(['name', 'category'])
        .orderBy('name')

        .build()

    const expected = data.filter(({ id }) => id === 1).map(({ name, category }) => ({ name, category }))
    expect(result).toStrictEqual(expected)
})
});
