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

const stats = require('./stats.json')

stats.seasons
  .map(season => season.table.map(team => team.name))
  .reduce((acc, item) => acc.concat(item), [])
  .map(team => team
    .replace('Amica Wronki1', 'Amica Wronki')
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
    .replace('Śląsk Wrocław1', 'Śląsk Wrocław')
  )
  .uniq()
  .sort((s1, s2) => s1.localeCompare(s2))
  .map((team, index) => ({
    id: index + 1,
    name: team,
    seasons: stats.seasons.filter(season => season.table.findIndex(t => t.name == team) != -1).map(season => season.id),
    total: {
      points: stats.seasons
        .map(season => {
          const index = season.table.findIndex(t => t.name == team)
          return index != -1 ? season.table[index].points : 0
        })
        .reduce((acc, val) => acc + val),
      goals: {
        scored: stats.seasons
          .map(season => {
            const index = season.table.findIndex(t => t.name == team)
            return index != -1 && season.table[index].goals ? season.table[index].goals.scored : 0
          })
          .reduce((acc, val) => acc + val),
        conceded: stats.seasons
          .map(season => {
            const index = season.table.findIndex(t => t.name == team)
            return index != -1 && season.table[index].goals ? season.table[index].goals.conceded : 0
          })
          .reduce((acc, val) => acc + val),
        },
      wins: stats.seasons
        .map(season => {
          const index = season.table.findIndex(t => t.name == team)
          return index != -1 && season.table[index].wins ? season.table[index].wins : 0
        })
        .reduce((acc, val) => acc + val),
      draws: stats.seasons
        .map(season => {
          const index = season.table.findIndex(t => t.name == team)
          return index != -1 && season.table[index].draws ? season.table[index].draws : 0
        })
        .reduce((acc, val) => acc + val),
      losses: stats.seasons
        .map(season => {
          const index = season.table.findIndex(t => t.name == team)
          return index != -1 && season.table[index].losses ? season.table[index].losses : 0
        })
        .reduce((acc, val) => acc + val),
      beniamin: stats.seasons
        .map(season => {
          const index = season.table.findIndex(t => t.name == team)
          return index != -1 && index == 0 ? 1 : 0
        })
        .reduce((acc, val) => acc + val),
      winner: stats.seasons
        .map(season => {
          const index = season.table.findIndex(t => t.name == team)
          return index != -1 && index == 0 ? 1 : 0
        })
        .reduce((acc, val) => acc + val),
      downfall: stats.seasons
        .map(season => {
          const index = season.table.findIndex(t => t.name == team)
          return index != -1 && season.table[index].dawnfall == 0 ? 1 : 0
        })
        .reduce((acc, val) => acc + val),
    },
  }))
  .forEach(team => { console.log(JSON.stringify(team, null, 2)) })
