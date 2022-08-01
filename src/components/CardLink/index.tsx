import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function CardLink() {
    const [link, setLink] = useState("");
    useEffect(() => {
        api.get("/characters")
            .then((response) => {
                setLink(response.data.data.results.urls.url);
            })
            .catch((err) => console.log(err));
    }, []);

    console.log(link);

    return <a href={link} target='_blank' rel='noreferrer'></a>;
}
