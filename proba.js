const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const vgmUrl= 'http://www.bolyaigimnazium.elte.hu/index.php/szuloknek/program3/month.calendar';

got(vgmUrl).then(response => {
  const dom = new JSDOM(response.body);
  let datumok = dom.window.document.querySelectorAll('.mod_events_latest_first .mod_events_latest_date');
  datumok.forEach(n => {
      console.log(n.textContent);
  });
  let esemeny = dom.window.document.querySelectorAll('.mod_events_latest_first .mod_events_latest_content');
  esemeny.forEach(n => {
    console.log(n.textContent);
});
}).catch(err => {
  console.log(err);
});