import { get } from "@llwwqq/utils";

export const fetchRandomData = get(() => {
  return {
    url: "https://fakerapi.it/api/v1/images?_width=380",
  };
});

export const fetchRandomData2 = get(() => {
  return {
    url: "https://fakerapi.it/api/v1/images?_width=480",
  };
});
