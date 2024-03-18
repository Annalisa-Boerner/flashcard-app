import {useState} from 'react'
import { Link } from 'react-router-dom'

export default function ViewDeckButton({deckname}) {
    //TODO: pass in props to view the correct deck
console.log("deckname in ViewDeckButton", deckname)

    return (
    <Link to={`/cards/${deckname}`}><button>View Deck {deckname}</button>
    </Link>)
}
