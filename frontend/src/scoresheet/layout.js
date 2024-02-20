import React, { useState, useEffect } from 'react';
import Autosuggest from "@cloudscape-design/components/autosuggest";

function Scoreboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [winnerName, setWinnerName] = useState('');
    const [loserName, setLoserName] = useState('');
    const [winnerScore, setWinnerScore] = useState('');
    const [loserScore, setLoserScore] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [value, setValue] = useState("");


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


/* 
const [players, setPlayers] = useState('')

useEffect(() => {
    const fetchPlayers = async () {
        let res = await fetch('url')
        setPlayers(res)
    }

    fetchPlayers()
}, [])

console.log(players)

const arr = players.map((_, idx) {
    return ( 
        {
        value : {players[idx].name}
        }
    )
})

*/
    


    


    return (
        <div>
            <h1></h1>
            <div id="leaderboard">
                <ul>
                    {leaderboard.map(player => (
                        <li key={player.name}>
                            {player.name + ': ' + player.points + ' points'}
                            <ul>
                                {player.matches &&
                                    player.matches.map(match => (
                                        <li key={match.date}>
                                            {match.date + ': ' + player.name + ' vs ' + match.opponent + ' - ' + match.score + ' (' + match.result + ')'}
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <h2>Record a Match</h2>
            <form onSubmit={handleSubmit}>
                <Autosuggest
                    onChange={({ detail }) => setWinnerName(detail.value)}                    
                    value={winnerName}
                    options={[
                        { value: "Blaze" },
                        { value: "Noms" },
                        { value: "Lunga" },
                        { value: "Bob" }
                    ]}
                    placeholder="Player 1"
                    required={true}
            />
                <Autosuggest
                    onChange={({ detail }) => setLoserName(detail.value)}
                    value={loserName}
                    options={[
                        { value: "Blaze" },
                        { value: "Noms" },
                        { value: "Lunga" },
                        { value: "Bob" }
                    ]}
                    placeholder="Player 2"
                    required={true}
                />
                <input
                    type="number"
                    value={winnerScore}
                    onChange={e => setWinnerScore(e.target.value)}
                    placeholder="Winner Score"
                    required={true}
                />
                <input
                    type="number"
                    value={loserScore}
                    onChange={e => setLoserScore(e.target.value)}
                    placeholder="Loser Score"
                    required={true}
                />
                <input
                    type="date"
                    value={matchDate}
                    onChange={e => setMatchDate(e.target.value)}
                    required={true}
                />
                <button type="submit">Record Match</button>
            </form>
        </div>
    );
}

export default Scoreboard;