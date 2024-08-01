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

const shortEnUSFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
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

export const formatDateShort = (date) => {
  return shortEnUSFormatter
    .formatToParts(date)
    .map(extractValueAndCustomizeDayOfMonth)
    .join("");
};

export const formatDateFirst = (date) => {
  const d = new Date(date.seconds * 1000);
  return longEnUSFormatter
    .formatToParts(d)
    .map(extractValueAndCustomizeDayOfMonth)
    .join("");
};

export const formattedDate = (date) => {
  const d = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return d;
};