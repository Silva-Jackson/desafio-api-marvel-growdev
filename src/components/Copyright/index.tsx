import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Footer, Link } from "./styles";

export default function Copyright() {
    const [copyright, setCopyright] = useState("");
    useEffect(() => {
        api.get("/characters")
            .then((response) => {
                setCopyright(response.data.attributionText);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Footer>
            <Link href='https://marvel.com/' target='_blank' rel='noreferrer'>
                {copyright}
            </Link>
        </Footer>
    );
}
