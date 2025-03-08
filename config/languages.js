export const languages = {
    Hungarian: {
        commands: {
            rps: {
                usage: 'Használat: !rps <kő/papír/olló>',
                draw: 'Döntetlen! 🤝',
                win: 'Nyertél! 🎉',
                loss: 'Vesztettél! 😎',
                choices: ['kő', 'papír', 'olló'],
                you: 'Te',
                me: 'Én',
                stats: {
                    title: '🎮 RPS Statisztika',
                    wins: 'Nyert',
                    draws: 'Döntetlen',
                    losses: 'Vesztett',
                    winRate: 'Nyerési arány'
                },
                noGames: 'Még nem játszottál RPS-t. Próbáld ki: `!rps <kő/papír/olló>`',
                leaderboard: {
                    title: 'RPS Ranglista',
                    noData: 'Még senki nem játszott RPS-t a szerveren.'
                }
            },
            numberGame: {
                start: 'Gondoltam egy számra 1 és 10 között. Találd ki, melyik az! Tippelni a !tipp utasítás után tudsz. (pl: !tipp 9) Hajrá!',
                enterNumber: 'Kérlek adj meg egy számot!',
                victory: 'Gratulálok! Kitaláltad a számot! Jutalmad egy képzeletbeli vállonveregetés!',
                higher: 'Ennél nagyobb számra gondoltam.',
                lower: 'Ennél kisebb számra gondoltam.'
            },
            gif: {
                noResults: 'Nem találtam GIF-et a megadott kulcsszóra.',
                error: 'Hiba történt a GIF lekérése közben.'
            },
            voting: {
                channelError: 'Nem találom a szavazó csatornát!',
                error: 'Hiba történt a szavazás létrehozása közben.',
                defaultQuestion: 'Ez egy próba?',
                format: 'IGEN: :white_check_mark: , NEM: :x:'
            },
            general: {
                unknown: 'Fogalmam sincs!'
            }
        }
    },
    English: {
        commands: {
            rps: {
                usage: 'Usage: !rps <rock/paper/scissors>',
                draw: "It's a draw! 🤝",
                win: 'You won! 🎉',
                loss: 'You lost! 😎',
                choices: ['rock', 'paper', 'scissors'],
                you: 'You',
                me: 'Me',
                stats: {
                    title: '🎮 RPS Statistics',
                    wins: 'Wins',
                    draws: 'Draws',
                    losses: 'Losses',
                    winRate: 'Win Rate'
                },
                noGames: 'You haven\'t played RPS yet. Try it with: `!rps <rock/paper/scissors>`',
                leaderboard: {
                    title: 'RPS Leaderboard',
                    noData: 'No one has played RPS on the server yet.'
                }
            },
            numberGame: {
                start: 'I thought of a number between 1 and 10. Guess which one! Use !tipp to guess. (e.g., !tipp 9) Good luck!',
                enterNumber: 'Please enter a number!',
                victory: 'Congratulations! You guessed the number! Your reward is an imaginary pat on the back!',
                higher: 'I thought of a higher number.',
                lower: 'I thought of a lower number.'
            },
            gif: {
                noResults: 'No GIFs found for the given keyword.',
                error: 'Error occurred while fetching the GIF.'
            },
            voting: {
                channelError: 'Cannot find the voting channel!',
                error: 'Error occurred while creating the vote.',
                defaultQuestion: 'Is this a test?',
                format: 'YES: :white_check_mark: , NO: :x:'
            },
            general: {
                unknown: 'No idea!'
            }
        }
    }
};