import React, { useState, useEffect } from 'react';
import Autosuggest from "@cloudscape-design/components/autosuggest";
import ApiFetch from '../APIFetch';
import { Link } from 'react-router-dom';
import {Button } from '@cloudscape-design/components';

function Scoreboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [winnerName, setWinnerName] = useState('');
    const [loserName, setLoserName] = useState('');
    const [winnerScore, setWinnerScore] = useState('');
    const [loserScore, setLoserScore] = useState('');
    const [matchDate, setMatchDate] = useState('');
    // const [value, setValue] = useState("");
    const [players, setPlayers] = useState([]);

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

    useEffect(() => {
        const getPlayers = async () => {
            let res = await fetch('http://localhost:5000/api')
            let data = await res.json()
            setPlayers(data)
        }

        getPlayers()
    }, [])

    console.log(players);

    const arr = players.map((_, idx) => {
        return (
            {
            value: players[idx].name
            }
        )
    })

    let pts 
    let dubs
    let loss
    const findPoints = players.map((_, idx) => {
        if (winnerName==players[idx].name) {
            pts = players[idx].points; 
            dubs = players[idx].wins; 
        }

        if (loserName == players[idx].name) {
            loss = players[idx].loses
        }
    })



    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !winnerName || !loserName || !winnerScore || !loserScore || !matchDate
        ){
            return alert="Cant Record Empty Fileds!";
        }
        ApiFetch('http://localhost:5000/put', "PUT", { 
            "wName": winnerName,
            "lName": loserName,
            "newPoints": pts + 2,
            "newLoses": loss + 1,
            "newWins": dubs + 1,
            })


        ApiFetch('http://localhost:5000/recordMatch', "POST", { 
        "winner": winnerName,
        "loser": loserName,
        "winnerScore": winnerScore,
        "loserScore": loserScore,
        "date": matchDate
        })
        
    };

    
    return (
        <div>
            <Button><Link to="/">Go Home</Link></Button>
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
                    options={arr}
                    placeholder="Winner"
                    required={true}
            />
                <Autosuggest
                    onChange={({ detail }) => setLoserName(detail.value)}
                    value={loserName}
                    options={arr}
                    placeholder="Loser"
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
                <Button type="submit">Record Match</Button>
            </form>
        </div>
    );
}

export default Scoreboard;
