import { useCallback, useEffect, useState } from "react";
import useDebouncedEffect from "use-debounced-effect";
import { FilledInput, FormControl, InputAdornment, InputLabel } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../services/api";
import { ButtonMore, Cabecalho, Card, CardList, Container, Link } from "./styles";
import "./styles.css";
import Copyright from "../../components/Copyright";


type SearchData = {
    id: string;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    urls: {
        url: string;
    }[];
    comics: {
        available: number;
    };
    stories: {
        available: number;
    };
    events: {
        available: number;
    };
    series: {
        available: number;
    };
}

type TipoTotal = {    
        offset: number;
        limit: number;        
        total: number;
        count: number;
        results: SearchData[];        
}


export default function Characters() {
    const [value, setValue] = useState("");
    const [searchValue, setSearchValue] = useState<SearchData[]>([]);
    const [characters, setCharacters] = useState<SearchData[]>([]);
    const [quantidade, setQuantidade] = useState<TipoTotal[]>([]);

    useDebouncedEffect(
        () => {
            if (value.length > 0) {                
                api.get("/characters", {
                    params: {
                        nameStartsWith: value,
                    },
                })
                    .then((response) => {
                        setSearchValue(response.data.data.results);
                        searchValue.find((item) => {
                            return item.name === value;
                        });
                        setValue(value);
                    })
                    .catch((err) => console.log(err));
                return;
            } else {
                console.log("No search terms, showing all characters in alphabetical order");
            }
        },
        500,
        [value]
    );
        

    useEffect(() => {
        api.get("/characters")
            .then((response) => {
                setCharacters(response.data.data.results);
                setQuantidade(response.data.data);
            })
            
            .catch((err) => console.log(err));
    }, []);

    const handleMore = useCallback(async () => {
        try {
            const offset = characters.length;
            const response = await api.get("characters", {
                params: {
                    offset,
                },
            });
            setCharacters([...characters, ...response.data.data.results]);            
        } catch (err) {
            console.log(err);
        }
    }, [characters]);  

    return (
        <Container>
            <Cabecalho>
                <img src="https://i.ibb.co/DtV35KS/marvel-512x512.png" alt="marvel" height="64px"/>                
                <h3>CHARACTER SEARCH</h3>
                <FormControl
                    sx={{
                        m: 1,
                        width: "25ch",
                        background: "#fff5",
                        borderRadius: "5px",
                    }}
                    variant='filled'>
                    <InputLabel id='label' htmlFor='input'>
                        Search
                    </InputLabel>
                    <FilledInput
                        color='error'
                        id='input'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        endAdornment={
                            <InputAdornment position='end'>
                                <SearchIcon sx={{ color: "#fff" }} />
                            </InputAdornment>
                        }
                    />
                </FormControl>            
            </Cabecalho>
            {value.length > 0 && (
                <CardList>
                    {searchValue.map((item) => {
                        return (
                            <Card key={item.id} thumbnail={item.thumbnail}>
                                <div id='img' />
                                <Link
                                    href={item.urls[0].url}
                                    target='_blank'
                                    rel='noreferrer'>
                                    <h2>{item.name}</h2>
                                    <p>
                                        {item.description.length >= 2
                                            ? `${item.description}`
                                            : "No description available."}
                                    </p>
                                    <p>Comics: {item.comics.available}</p>
                                    <p>Stories: {item.stories.available}</p>
                                    <p>Events: {item.events.available}</p>
                                    <p>Series: {item.series.available}</p>
                                </Link>
                            </Card>
                        );
                    })}
                </CardList>
            )}
            {value.length === 0 && (
                <CardList>
                    {characters.map((character) => {
                        return (
                            <Card
                                key={character.id}
                                thumbnail={character.thumbnail}>
                                <div id='img' />
                                <Link
                                    href={character.urls[0].url}
                                    target='_blank'
                                    rel='noreferrer'>
                                    <h2>{character.name}</h2>
                                    <p>
                                        {character.description.length >= 1
                                            ? `${character.description}`
                                            : "No description available."}
                                    </p>
                                    <p>Comics: {character.comics.available}</p>
                                    <p>
                                        Stories: {character.stories.available}
                                    </p>
                                    <p>Events: {character.events.available}</p>
                                    <p>Series: {character.series.available}</p>
                                </Link>
                            </Card>
                        );
                    })}
                </CardList>
            )}
            {quantidade.total > characters.length ?  (
            <ButtonMore onClick={handleMore}>
                <KeyboardDoubleArrowDownIcon />
                Ver mais
                <KeyboardDoubleArrowDownIcon />
            </ButtonMore>
            ): null}
            <Copyright />
        </Container>
    );
}
