const pluralRules = new Intl.PluralRules("en-US", {
  type: "ordinal",
});
const suffixes = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
};

const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const convertToOrdinal = (number) =>
  `${number}${suffixes[pluralRules.select(number)]}`;

const extractValueAndCustomizeDayOfMonth = (part) => {
  if (part.type === "day") {
    return convertToOrdinal(part.value);
  }
  return part.value;
};

export const formatDate = (date) => {
  return longEnUSFormatter
    .formatToParts(date)
    .map(extractValueAndCustomizeDayOfMonth)
    .join("");
};

export const formatDateFirst = (date) => {
  var d = new Date(date.seconds * 1000);
  return longEnUSFormatter
    .formatToParts(d)
    .map(extractValueAndCustomizeDayOfMonth)
    .join("");
};
