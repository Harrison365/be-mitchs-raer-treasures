const { makeRefObj } = require("./makeRefObj");

describe("makeRefObj", () => {
  test("returns an object when given empty array", () => {
    expect(makeRefObj([])).toEqual({});
  });
  test("returns an object with one property when given array of one object", () => {
    expect(
      makeRefObj([
        {
          shop_id: 1,
          shop_name: "Dibbert Inc",
          owner: "Aaliyah",
          slogan: "Implemented motivating customer loyalty",
        },
      ])
    ).toEqual({ "Dibbert Inc": 1 });
  });
  test("returns an object with one property when given array of 3 object", () => {
    expect(
      makeRefObj([
        {
          shop_id: 1,
          shop_name: "Dibbert Inc",
          owner: "Aaliyah",
          slogan: "Implemented motivating customer loyalty",
        },
        {
          shop_id: 2,
          shop_name: "Feeney Inc",
          owner: "Elta",
          slogan: "Function-based intermediate secured line",
        },
        {
          shop_id: 3,
          shop_name: "Kshlerin, Koch and Monahan",
          owner: "Daphney",
          slogan: "Persevering web-enabled hardware",
        },
      ])
    ).toEqual({
      "Dibbert Inc": 1,
      "Feeney Inc": 2,
      "Kshlerin, Koch and Monahan": 3,
    });
  });
});
