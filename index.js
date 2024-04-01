import { HDate} from "@hebcal/core";
import { formatTime, zemanim , weekday,ansi, flipString} from "./function.js";
import readline from "readline-sync";

function main() {
  const today = new HDate();
  const weekStart = today.onOrBefore(0).abs();
  const gimatria = today.renderGematriya(true).split(" ")
  const gimatriaLen = gimatria.length
  const gimatriaYear = flipString(gimatria[gimatriaLen-1])
  const month = flipString(gimatria.slice(1, gimatria.length -1).join(" "));
  const rules = ["Gra", "MGA", "MGA 16.1"];
  const rulesHebrew = [` אר"ג`, ` אג"מ`, `16.1 אג"מ`]; 
  const index = readline.keyInSelect(rules, "select your minhag");
  const rule = rules[index]
  const ruleHebrew = rulesHebrew[index]

  if (rule == undefined) return;

  const data = {};
  let todayShma = ""; 
  let todayTefilla = ""; 
  let dateLen = 0

  for (let i = weekStart; i < weekStart + 7; i++) {
    const hd = new HDate(i);
    const hdRander = weekday(hd)
    const zman = zemanim(hd, rule);

    if (hdRander.length > dateLen) dateLen = hdRander.length;

    data[hdRander] = {
      "עמש תעירק": formatTime(zman.shma),   
      "הליפת": formatTime(zman.tfilla),   
    };
    
    if (i === today.abs()) {
      todayShma = `| '${data[hdRander]["עמש תעירק"]}' |`
      todayTefilla = ` '${data[hdRander]["הליפת"]}' |`
    }

  }
  const row = 8 - today.getDay();
  const padding = ' '.repeat(dateLen - weekday(today).length)
  const hdranderPadding = `| ${weekday(today)}${padding} `

  console.log(`\n${ansi.underline}${ansi.upperline}${ansi.gray}     ${gimatriaYear} ${month}  ${ansi.reset}`);
  console.table(data);
  console.log(`${ansi.up(row)}${ansi.color(31)}${hdranderPadding}${todayShma}${todayTefilla}${ansi.reset}${ansi.down(row-1)}`);
  console.log(`${ansi.color(2)}${ruleHebrew} תטיש יפל\n${ansi.reset}`)
}
main();

