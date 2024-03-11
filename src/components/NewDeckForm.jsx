import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../common/UserContext";
import BackendApi from "../api";

export default function NewDeckForm() {
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);

    //Initial state of form
    const INITIAL_STATE = {
        deckname: "",
        cardRows: [{ cardfront: "", cardback: "" }],
        username: currentUser.username,
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);

    //handleChange that takes into account the addition/deletion of rows
    function handleChange(e, rowIndex) {
        const { name, value } = e.target;
        const updatedCardRows = [...formData.cardRows];
        updatedCardRows[rowIndex] = {
            ...updatedCardRows[rowIndex],
            [name]: value,
        };
        setFormData({
            ...formData,
            cardRows: updatedCardRows,
        });
    }

    //Submitting to database
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            //Create the destination deck
            const deckData = {
                name: formData.deckname,
                username: formData.username,
            };
            const addDeckRes = await BackendApi.addDeck(deckData);

            const promises = formData.cardRows.map(async (card) => {
                const cardData = {
                    cardfront: card.cardfront,
                    cardback: card.cardback,
                    deckname: formData.deckname,
                    username: formData.username,
                };

                const addCardRes = await BackendApi.addCard(cardData);
                return addDeckRes, addCardRes;
            });

            const addCardResponses = await Promise.all(promises);

            // Check if any of the requests failed
            const failedResponses = addCardResponses.filter((res) => !res);
            if (failedResponses.length > 0) {
                // Handle failed responses
                console.error(
                    "Some card addition requests failed:",
                    failedResponses
                );
                // You might want to handle these errors or retry failed requests
            } else {
                // All requests were successful
                console.log("All cards added successfully");
                // Redirect or perform other actions as needed
            }
        } catch (error) {
            console.error("Error adding cards:", error);
            // Handle error as needed
        }
    }

    function addRow() {
        setFormData({
            ...formData,
            cardRows: [...formData.cardRows, { cardfront: "", cardback: "" }],
        });
    }

    function removeRow(rowIndex) {
        const updatedCardRows = formData.cardRows.filter(
            (_, index) => index !== rowIndex
        );
        setFormData({
            ...formData,
            cardRows: updatedCardRows,
        });
    }

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
                            name="deckname"
                            value={formData.deckname}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    deckname: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className="form-rows">
                        {formData.cardRows.map((row, rowIndex) => (
                            <div key={rowIndex}>
                                <label
                                    htmlFor={`cardfront-${rowIndex}`}
                                    className="form-label"
                                >
                                    Card Front:
                                </label>
                                <input
                                    type="text"
                                    id={`cardfront-${rowIndex}`}
                                    name="cardfront"
                                    value={row.cardfront}
                                    onChange={(e) => handleChange(e, rowIndex)}
                                    className="form-control"
                                    required
                                />
                                <label
                                    htmlFor={`cardback-${rowIndex}`}
                                    className="form-label"
                                >
                                    Card Back:
                                </label>
                                <input
                                    type="text"
                                    id={`cardback-${rowIndex}`}
                                    name="cardback"
                                    value={row.cardback}
                                    onChange={(e) => handleChange(e, rowIndex)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeRow(rowIndex)}
                                >
                                    Remove Row
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addRow}>
                            Add Row
                        </button>
                    </div>
                    <button type="submit">Submit new deck</button>
                </form>
            </div>
        </div>
    );
}

// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import useFields from "../hooks/useFields";
// import UserContext from "../common/UserContext";
// import BackendApi from "../api";

// export default function NewDeckForm() {
//     console.log('addCard:', BackendApi.addCard)

//     //addCard can be imported from an Api.jsx component; pass in as props in MainSectiion
//     const navigate = useNavigate();

//     const currentUser = useContext(UserContext);

//     const INITIAL_STATE = {
//         side_1: "",
//         side_2: "",
//         deck: "",
//         username: currentUser.username,
//     };

//     const [formData, handleChange] = useFields(INITIAL_STATE);
//     const [errors, setErrors] = useState([]);

//     async function handleSubmit(e) {
//         console.log('formData:', formData);

//         e.preventDefault();

//         const addDeckRes = await BackendApi.addCard(formData);
//         if (addDeckRes) {
//             // navigate("/decklist");
//         } else {
//             setErrors(addDeckRes.errors);
//         }
//     }

//     //Creating dynamic numbers of rows
//     // const [formRows, setFormRows] = useState([{ id: 1 }]);

//     // useEffect(() => {
//     //     console.log("formRows:", formRows);
//     // });

//     return (
//         <div className="new-deck-form">
//             <div className="form-container">
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="deck-name" className="form-title">
//                             Deck Name:
//                         </label>
//                         <input
//                             type="text"
//                             id="deckname"
//                             value={formData.deckname}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-rows">
//                         {formRows.map((row) => (
//                             <div key={row.id}>
//                                 <label
//                                     htmlFor="side_1"
//                                     className="form-label"
//                                 >
//                                     Card Front:
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="side_1"
//                                     value={formData.side_1}
//                                     onChange={handleChange}
//                                     className="form-control"
//                                     required
//                                 />
//                                 <label
//                                     htmlFor="cardback"
//                                     className="form-label"
//                                 >
//                                     Card Back:
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="cardback"
//                                     value={formData.cardback}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <button
//                                     onClick={() =>
//                                         setFormRows(
//                                             formRows.filter(
//                                                 (fr) => fr.id !== row.id
//                                             )
//                                         )
//                                     }
//                                 >
//                                     Remove Row
//                                 </button>
//                             </div>
//                         ))}
//                         <button
//                             onClick={() =>
//                                 setFormRows([
//                                     ...formRows,
//                                     { id: formRows.length + 1 },
//                                 ])
//                             }
//                         >
//                             Add Row
//                         </button>
//                     </div>
//                     <button type="submit">
//                         Submit new deck
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
