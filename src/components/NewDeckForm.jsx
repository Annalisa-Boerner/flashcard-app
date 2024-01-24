import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";

export default function NewDeckForm({ addCard }) {
    //addCard can be imported from an Api.jsx component; pass in as props in MainSectiion
    const navigate = useNavigate();

    const INITIAL_STATE = {
        side_1: "",
        side_2: "",
        deck: "",
    };

    const [formData, handleChange] = useFields(INITIAL_STATE);
    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        const addDeckRes = await addCard(formData);
        if (addDeckRes) {
            navigate("/decklist");
        } else {
            setErrors(addDeckRes.errors);
        }
    }

    //Creating dynamic numbers of rows
    const [formRows, setFormRows] = useState([{ id: 1 }]);

    useEffect(() => {
        console.log("formRows:", formRows);
    });

    return (
        <div className="new-deck-form">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="deck-name" className="form-title">
                            Deck Name:
                        </label>
                        <input
                            type="text"
                            id="deckname"
                            value={formData.deckname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-rows">
                        {formRows.map((row) => (
                            <div key={row.id}>
                                <label
                                    htmlFor="cardfront"
                                    className="form-label"
                                >
                                    Card Front:
                                </label>
                                <input
                                    type="text"
                                    id="cardfront"
                                    value={formData.cardfront}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                                <label
                                    htmlFor="cardback"
                                    className="form-label"
                                >
                                    Card Back:
                                </label>
                                <input
                                    type="text"
                                    id="cardback"
                                    value={formData.cardback}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    onClick={() =>
                                        setFormRows(
                                            formRows.filter(
                                                (fr) => fr.id !== row.id
                                            )
                                        )
                                    }
                                >
                                    Remove Row
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() =>
                                setFormRows([
                                    ...formRows,
                                    { id: formRows.length + 1 },
                                ])
                            }
                        >
                            Add Row
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
