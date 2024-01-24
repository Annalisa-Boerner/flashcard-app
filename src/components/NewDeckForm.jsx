import React, { useState } from "react";
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

    return <div>NewDeckForm</div>;
}
