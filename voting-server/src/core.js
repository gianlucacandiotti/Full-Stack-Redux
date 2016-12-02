exports.INITIAL_STATE = {};

exports.setEntries = function setEntries(state, entries) {
  return Object.assign({}, state, {
    entries: entries,
  });
}

function getWinners(votes) {
  if (!votes) {
    return [];
  }

  var pair = votes.pair;

  pairKeys = Object.keys(pair);

  var a = pair[pairKeys[0]];
  var b = pair[pairKeys[1]];

  var hasTally = votes.hasOwnProperty('tally');

  var aVotes = 0;
  var bVotes = 0;

  if (hasTally) {
    aVotes = votes.tally.hasOwnProperty(a) ? votes.tally[a] : 0;
    bVotes = votes.tally.hasOwnProperty(b) ? votes.tally[b] : 0;
  }

  if (aVotes > bVotes) {
    return [a];
  } else if (aVotes < bVotes) {
    return [b];
  } else {
    return [a, b];
  }
}

exports.next = function next(state) {
  var entries = state.entries.concat(getWinners(state.votes));
  var _state = Object.assign({}, state);

  if(entries.length === 1) {
    delete _state.votes;
    delete _state.entries;
    _state.winner = entries[0];

    return _state;
  } else {
    var pair = entries.splice(0, 2);

    return Object.assign({}, {
      votes: {
        pair: pair,
      },
      entries: entries,
    });
  }
}

exports.vote = function vote(votes, entry) {
  var _votes = Object.assign({}, votes);

  var hasTally = _votes.hasOwnProperty('tally');

  if (!hasTally) {
    _votes.tally = {};
  }

  if (!_votes.tally.hasOwnProperty(entry)) {
    _votes.tally[entry] = 0;
  }

  _votes.tally[entry]++;

  return _votes;
}
