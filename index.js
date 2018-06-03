#!/usr/bin/env node

// Array.uniq
if (Array.prototype.uniq === undefined) {
  Array.prototype.uniq = function(predicate) {
    return this.filter(function(value, index, self) {
      if (typeof predicate === 'function') {
        return self.findIndex(item => predicate(item) === predicate(value)) === index
      } else {
        return self.indexOf(value) === index
      }
    })
  }
}

const $ = require('cheerio')
const axios = require('axios')

const converters = [
  {
    match: year => year >= 1934 && year <= 1936,
    season: year => `${year}`,
    url: season => `https://pl.wikipedia.org/wiki/Liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      points: $(row).find('td').eq(3).text(),
      goals: {
        scored: $(row).find('td').eq(4).text().split('-')[0],
        conceded: $(row).find('td').eq(4).text().split('-')[1],
      },
    })
  }, {
    match: year => year >= 1937 && year <= 1938,
    season: year => `${year}`,
    url: season => `https://pl.wikipedia.org/wiki/Liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(7).text(),
      goals: {
        scored: $(row).find('td').eq(6).text().split('-')[0],
        conceded: $(row).find('td').eq(6).text().split('-')[1],
      },
    })
  }, {
    match: year => year >= 1939 && year <= 1939,
    season: year => `${year}`,
    url: season => `https://pl.wikipedia.org/wiki/Liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(4).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(9).text(),
      goals: {
        scored: $(row).find('td').eq(6).text(),
        conceded: $(row).find('td').eq(7).text(),
      },
    })
  }, {
    match: year => year >= 1948 && year <= 1948,
    season: year => `${year}`,
    url: season => `https://pl.wikipedia.org/wiki/Liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      points: $(row).find('td').eq(3).text(),
      goals: {
        scored: $(row).find('td').eq(4).text().split('-')[0],
        conceded: $(row).find('td').eq(4).text().split('-')[1],
      },
    })
  }, {
    match: year => year >= 1949 && year <= 1949,
    season: year => `${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(5).text(),
      draws: $(row).find('td').eq(6).text(),
      losses: $(row).find('td').eq(7).text(),
      points: $(row).find('td').eq(3).text(),
      goals: {
        scored: $(row).find('td').eq(4).text().split('–')[0],
        conceded: $(row).find('td').eq(4).text().split('–')[1],
      },
    })
  }, {
    match: year => year >= 1950 && year <= 1950,
    season: year => `${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      points: $(row).find('td').eq(3).text(),
      wins: $(row).find('td').eq(5).text().split('-')[0],
      draws: $(row).find('td').eq(5).text().split('-')[1],
      losses: $(row).find('td').eq(5).text().split('-')[2],
      goals: {
        scored: $(row).find('td').eq(4).text().split('-')[0],
        conceded: $(row).find('td').eq(4).text().split('-')[1],
      },
    })
  }, {
    match: year => year >= 1951 && year <= 1951,
    season: year => `${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      points: $(row).find('td').eq(3).text(),
      goals: {
        scored: $(row).find('td').eq(4).text().split('-')[0],
        conceded: $(row).find('td').eq(4).text().split('-')[1],
      },
    })
  }, {
    match: year => year >= 1953 && year <= 1961,
    season: year => `${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      points: $(row).find('td').eq(3).text(),
      goals: {
        scored: $(row).find('td').eq(4).text().split('-')[0],
        conceded: $(row).find('td').eq(4).text().split('-')[1],
      },
    })
  }, {
    match: year => year >= 1963 && year <= 1963,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      points: $(row).find('td').eq(3).text(),
      wins: $(row).find('td').eq(4).text(),
      draws: $(row).find('td').eq(5).text(),
      losses: $(row).find('td').eq(6).text(),
      goals: {
        scored: $(row).find('td').eq(7).text().split('–')[0],
        conceded: $(row).find('td').eq(7).text().split('–')[1],
      },
    })
  }, {
    match: year => year >= 1964 && year <= 1966,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(3).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      points: $(row).find('td').eq(3).text(),
      wins: $(row).find('td').eq(4).text(),
      draws: $(row).find('td').eq(5).text(),
      losses: $(row).find('td').eq(6).text(),
      goals: {
        scored: $(row).find('td').eq(7).text().split('-')[0],
        conceded: $(row).find('td').eq(7).text().split('-')[1],
      },
    })
  }, {
    match: year => year == 1970 || year == 1972,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(4).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(7).text(),
      goals: {
        scored: $(row).find('td').eq(6).text().split('–')[0],
        conceded: $(row).find('td').eq(6).text().split('–')[1],
      },
    })
  }, {
    match: year => year == 1973 || year == 1974 || year == 1975,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(4).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(9).text(),
      goals: {
        scored: $(row).find('td').eq(6).text(),
        conceded: $(row).find('td').eq(7).text(),
      },
    })
  }, {
    match: year => year == 1976,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(5).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(9).text(),
      goals: {
        scored: $(row).find('td').eq(6).text(),
        conceded: $(row).find('td').eq(7).text(),
      },
    })
  }, {
    match: year => year == 1977,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(5).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(7).text(),
      goals: {
        scored: $(row).find('td').eq(6).text().split('-')[0],
        conceded: $(row).find('td').eq(6).text().split('-')[1],
      },
    })
  }, {
    match: year => year == 1978,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(4).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(7).text(),
      goals: {
        scored: $(row).find('td').eq(6).text().split('–')[0],
        conceded: $(row).find('td').eq(6).text().split('–')[1],
      },
    })
  }, {
    match: year => year == 1979 || year == 1980 || year == 1983 || year == 1984 || year == 1985 || year == 1986 || year == 1988 || year == 1989 || year == 1990 || year == 1991 || year == 1992 || year == 1995,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(5).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(7).text(),
      goals: {
        scored: $(row).find('td').eq(6).text().split('–')[0],
        conceded: $(row).find('td').eq(6).text().split('–')[1],
      },
    })
  }, {
    match: year => year == 1981 || year == 1982 || year == 1987 || year == 1993 || year == 1994 || year == 1996,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(5).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(7).text(),
      goals: {
        scored: $(row).find('td').eq(6).text().split('-')[0],
        conceded: $(row).find('td').eq(6).text().split('-')[1],
      },
    })
  }, {
    match: year => year == 1997 || year == 1998 || year == 1999 || year == 2000 || year == 2001 || year == 2003 || year == 2005 || year == 2007 || year == 2008,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(4).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(9).text(),
      goals: {
        scored: $(row).find('td').eq(6).text(),
        conceded: $(row).find('td').eq(7).text(),
      },
    })
  }, {
    match: year => year == 2004 || year == 2006,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/I_liga_polska_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(5).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(9).text(),
      goals: {
        scored: $(row).find('td').eq(6).text(),
        conceded: $(row).find('td').eq(7).text(),
      },
    })
  }, {
    match: year => year == 2009 || year == 2010 || year == 2011 || year == 2012 || year == 2013,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/Ekstraklasa_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(4).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(9).text(),
      goals: {
        scored: $(row).find('td').eq(6).text(),
        conceded: $(row).find('td').eq(7).text(),
      },
    })
  }, {
    match: year => year == 2014 || year == 2015,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/Ekstraklasa_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(9).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(9).text(),
      goals: {
        scored: $(row).find('td').eq(6).text(),
        conceded: $(row).find('td').eq(7).text(),
      },
    })
  }, {
    match: year => year == 2016 || year == 2017 || year == 2018,
    season: year => `${year-1}/${year}`,
    url: season => `https://pl.wikipedia.org/wiki/Ekstraklasa_w_pi%C5%82ce_no%C5%BCnej_(${season})`,
    locate: document => document('#mw-content-text .mw-parser-output table').eq(8).find('tbody tr').slice(1),
    extract: (index, row) => ({
      place: $(row).find('td').eq(0).text(),
      name: $(row).find('td').eq(1).text(),
      matches: $(row).find('td').eq(2).text(),
      wins: $(row).find('td').eq(3).text(),
      draws: $(row).find('td').eq(4).text(),
      losses: $(row).find('td').eq(5).text(),
      points: $(row).find('td').eq(9).text(),
      goals: {
        scored: $(row).find('td').eq(6).text(),
        conceded: $(row).find('td').eq(7).text(),
      },
    })
  }
]

const promises = []

for (let year = 1014; year <= 2018; year++) {
  const converter = converters.find(c => c.match(year))
  if (converter) {
    promises.push(axios
      // get page content
      .get(converter.url(converter.season(year)))
      .then(response => response.data)
      // parse html
      .then(html => $.load(html))
      // extract table with teams
      .then(document => converter.locate(document))
      // extract table data
      .then(rows => rows.map(converter.extract).get())
      // create season data entry
      .then(table => ({
        id: converter.season(year).replace('/', '-'),
        season: converter.season(year),
        year,
        table: table
          .filter(team => team.name !== '')
          .map(team => ({
            id: `${converter.season(year)}${parseInt(team.place)}`.replace('/', ''),
            name: team.name
              .replace('(M)', '').replace('(S)', '').replace('(B)', '').replace('(b)', '').trim()
              .replace('Amica Wronki1', 'Amica Wronki')
              .replace('Arka Gdynia2', 'Arka Gdynia')
              .replace('Bruk-Bet Termalica Nieciecza', 'Termalica Bruk-Bet Nieciecza')
              .replace('Dyskobolia Grodzisk Wielkopolski1', 'Dyskobolia Grodzisk Wielkopolski')
              .replace('Dyskobolia Grodzisk Wielkopolski2', 'Dyskobolia Grodzisk Wielkopolski')
              .replace('Jagiellonia Białystok1', 'Jagiellonia Białystok')
              .replace('Górnik Zabrze4', 'Górnik Zabrze')
              .replace('Górnik Łęczna3', 'Górnik Łęczna')
              .replace('Korona Kielce4', 'Korona Kielce')
              .replace('Lech Poznań1', 'Lech Poznań')
              .replace('Lech Poznań3', 'Lech Poznań')
              .replace('Lech Poznań4', 'Lech Poznań')
              .replace('Legia Warszawa1', 'Legia Warszawa')
              .replace('Petro Płock', 'Petrochemia Płock')
              .replace('Pogoń Szczecin5', 'Pogoń Szczecin')
              .replace('Polonia Warszawa2', 'Polonia Warszawa')
              .replace('Polonia Warszawa3', 'Polonia Warszawa')
              .replace('Ruch Chorzów2', 'Ruch Chorzów')
              .replace('Wisła Kraków1', 'Wisła Kraków')
              .replace('Wisła Płock1', 'Wisła Płock')
              .replace('Wisła Płock2', 'Wisła Płock')
              .replace('Zagłębie Lubin3', 'Zagłębie Lubin')
              .replace('Zagłębie Lubin4', 'Zagłębie Lubin')
              .replace('Zagłębie Sosnowiec5', 'Zagłębie Sosnowiec')
              .replace('Zawisza Bydgoszcz1', 'Zawisza Bydgoszcz')
              .replace('ŁKS Łódź2', 'ŁKS Łódź')
              .replace('Śląsk Wrocław1', 'Śląsk Wrocław'),
            place: parseInt(team.place),
            winner: team.name.indexOf('(M)') != -1,
            beniamin: team.name.indexOf('(B)') != -1 || team.name.indexOf('(b)') != -1,
            downfall: team.name.indexOf('(S)') != -1,
            matches: team.matches ? parseInt(team.matches) : undefined,
            points: team.points ? parseInt(team.points) : undefined,
            wins: team.wins ? parseInt(team.wins) : undefined,
            draws: team.draws ? parseInt(team.draws) : undefined,
            losses: team.losses ? parseInt(team.losses) : undefined,
            goals: team.goals ? { scored: parseInt(team.goals.scored), conceded: parseInt(team.goals.conceded) } : undefined,
          })),
      }))
    )
  }
}


Promise.all(promises).then(seasons => console.log(JSON.stringify({
  seasons,
  teams: seasons
    .map(season => season.table.map(team => team.name))
    .reduce((acc, item) => acc.concat(item), []).uniq()
    .sort((s1, s2) => s1.localeCompare(s2))
    .map((team, index) => ({
      id: index + 1,
      name: team,
      seasons: seasons
        .map(season => ({ id: season.id, place: season.table.findIndex(t => t.name == team) + 1 }))
        .filter(season => season.place > 0),
      total: {
        points: seasons
          .map(season => {
            const index = season.table.findIndex(t => t.name == team)
            return index != -1 ? season.table[index].points : 0
          })
          .reduce((acc, val) => acc + val),
        matches: seasons
          .map(season => {
            const index = season.table.findIndex(t => t.name == team)
            return index != -1 ? season.table[index].matches : 0
          })
          .reduce((acc, val) => acc + val),
        goals: {
          scored: seasons
            .map(season => {
              const index = season.table.findIndex(t => t.name == team)
              return index != -1 && season.table[index].goals ? season.table[index].goals.scored : 0
            })
            .reduce((acc, val) => acc + val),
          conceded: seasons
            .map(season => {
              const index = season.table.findIndex(t => t.name == team)
              return index != -1 && season.table[index].goals ? season.table[index].goals.conceded : 0
            })
            .reduce((acc, val) => acc + val),
          },
        wins: seasons
          .map(season => {
            const index = season.table.findIndex(t => t.name == team)
            return index != -1 && season.table[index].wins ? season.table[index].wins : 0
          })
          .reduce((acc, val) => acc + val),
        draws: seasons
          .map(season => {
            const index = season.table.findIndex(t => t.name == team)
            return index != -1 && season.table[index].draws ? season.table[index].draws : 0
          })
          .reduce((acc, val) => acc + val),
        losses: seasons
          .map(season => {
            const index = season.table.findIndex(t => t.name == team)
            return index != -1 && season.table[index].losses ? season.table[index].losses : 0
          })
          .reduce((acc, val) => acc + val),
      },
    })),
}, null, 2)))
