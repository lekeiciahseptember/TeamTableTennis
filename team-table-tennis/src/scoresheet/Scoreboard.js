import React, { useState, useEffect } from 'react';

function Scoreboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [winnerName, setWinnerName] = useState('');
    const [loserName, setLoserName] = useState('');
    const [winnerScore, setWinnerScore] = useState('');
    const [loserScore, setLoserScore] = useState('');
    const [matchDate, setMatchDate] = useState('');

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = () => {
        fetch('/leaderboard')
            .then(response => response.json())
            .then(data => {
                setLeaderboard(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const matchData = {
            winner: winnerName,
            loser: loserName,
            winnerScore: parseInt(winnerScore, 10),
            loserScore: parseInt(loserScore, 10),
            date: matchDate
        };

        fetch('/recordMatch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(matchData)
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                fetchLeaderboard();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return React.createElement('div', null,
        React.createElement('h1', null, ''),
        React.createElement('div', { id: 'leaderboard' },
            React.createElement('ul', null,
                leaderboard.map(player => (
                    React.createElement('li', { key: player.name },
                        player.name + ': ' + player.points + ' points',
                        React.createElement('ul', null,
                            player.matches &&
                            player.matches.map(match => (
                                React.createElement('li', { key: match.date },
                                    match.date + ': ' + player.name + ' vs ' + match.opponent + ' - ' + match.score + ' (' + match.result + ')'
                                )
                            ))
                        )
                    )
                ))
            )
        ),
        React.createElement('h2', null, 'Record a Match'),
        React.createElement('form', { onSubmit: handleSubmit },
            React.createElement('input', { type: 'text', value: winnerName, onChange: e => setWinnerName(e.target.value), placeholder: 'Winner Name', required: true }),
            React.createElement('input', { type: 'text', value: loserName, onChange: e => setLoserName(e.target.value), placeholder: 'Loser Name', required: true }),
            React.createElement('input', { type: 'number', value: winnerScore, onChange: e => setWinnerScore(e.target.value), placeholder: 'Winner Score', required: true }),
            React.createElement('input', { type: 'number', value: loserScore, onChange: e => setLoserScore(e.target.value), placeholder: 'Loser Score', required: true }),
            React.createElement('input', { type: 'date', value: matchDate, onChange: e => setMatchDate(e.target.value), required: true }),
            React.createElement('button', { type: 'submit' }, 'Record Match')
        )
    );
}

export default Scoreboard;
