import Ajv from "ajv";

export const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" },
  },
  required: ["foo"],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);

const data = {
  foo: 1,
  bar: "abc",
};

const valid = validate(data);
if (!valid) console.log(validate.errors);
