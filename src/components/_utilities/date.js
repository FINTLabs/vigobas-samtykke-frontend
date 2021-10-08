export const dateformatter = (datetime) => {
  if (datetime != null) {
    var date = new Date(datetime.toString());
    return date.toLocaleString("no-NO");
  }
  return "Ingen gyldig dato";
};
