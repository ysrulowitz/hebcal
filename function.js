import { Location, Zmanim , Sedra} from "@hebcal/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

//Function to format time to HH:MM format
export function formatTime(date) {
  const timeAgo = new TimeAgo("en-US");

  if (date.getDate() === new Date().getDate()) {
    return timeAgo.format(date);
  }
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York"
  });
}

export function zemanim(date,rule) {
  let zmanim = new Zmanim(Location.lookup("New York"), date);

  if (rule === "Gra") {
    return {
      shma: zmanim.sofZmanShma(),
      tfilla: zmanim.sofZmanTfilla(),
    };
  }
  if (rule === "MGA") {
    return {
      shma: zmanim.sofZmanShmaMGA(),
      tfilla: zmanim.sofZmanTfillaMGA(),
    };
  }
  if (rule === "MGA 16.1") {
    return {
      shma: zmanim.sofZmanShmaMGA16Point1(),
      tfilla: zmanim.sofZmanTfillaMGA16Point1(),
    };
  }
}

export const ansi={
  color: (c)=> `\x1B[${c}m`,
  up: (r)=> `\x1B[${r}A`,
  down: (r)=> `\x1B[${r}B`,
  gray: `\x1B[100m`,
  underline: `\x1B[4m`,
  upperline: `\x1B[53m`,
  reset: `\x1B[0m`,
}

export function flipString(str) {
  return str.split('').reverse().join('');
}

export function weekday(today) {
  //const today = new HDate(); 
  const sedras = new Sedra(today.getFullYear(),false)
  const sedra = sedras.getString(today,"he-x-NoNikud")

  const yiddishWeekdays = [
      "זונטאג", // Sunday
      "מאנטאג", // Monday
      "דינסטאג", // Tuesday
      "מיטוואך", // Wednesday
      "דאנערשטאג", // Thursday
      "פרײטאג", // Friday
      "שבת" // Saturday
  ];

  const hWeekday = yiddishWeekdays[today.getDay()]
  const day = `${hWeekday} ${sedra}`

  const flippedDay = flipString(day)

   return flippedDay

}